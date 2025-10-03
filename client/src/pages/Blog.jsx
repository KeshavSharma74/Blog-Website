import React, { useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { SimpleEditor } from '@/components/tiptap-templates/simple/simple-editor'
import { createPost } from '@/features/postSlice'
import { useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'

const Blog = () => {
  const editorRef = useRef(null)
  const dispatch = useDispatch()
  const { isCreating } = useSelector((state) => state.post)
  const navigate = useNavigate()

  const [title, setTitle] = useState('')
  const [subTitle, setSubTitle] = useState('')
  const [selectedCategories, setSelectedCategories] = useState([])
  const [isCategoryOpen, setIsCategoryOpen] = useState(false)
  const [mainImageFile, setMainImageFile] = useState(null)

  // Define available category options (adjust as needed)
  const categoryOptions = [
    'AI',
    'Computer',
    'Tech',
    'Science',
    'Other',
  ]

  const toggleCategory = (category) => {
    setSelectedCategories((prev) =>
      prev.includes(category)
        ? prev.filter((c) => c !== category)
        : [...prev, category]
    )
  }

  const removeCategory = (category) => {
    setSelectedCategories((prev) => prev.filter((c) => c !== category))
  }

  const handleSave = async () => {
    if (editorRef.current) {
      // Get the editor data in TipTap's JSON format
      const editorData = editorRef.current.getJSON()
      const editorHTML = editorRef.current.getHTML()

      if (!title || !subTitle) {
        toast.error('Title and Sub Title are required')
        return
      }
      if (selectedCategories.length === 0) {
        toast.error('Please select at least one category')
        return
      }
      if (!mainImageFile) {
        toast.error('Main image is required')
        return
      }

      const formData = new FormData()
      formData.append('title', title)
      formData.append('subTitle', subTitle)
      // Backend expects JSON string array
      formData.append('category', JSON.stringify(selectedCategories))
      formData.append('content', JSON.stringify(editorData))
      formData.append('contentHTML', editorHTML)
      if (mainImageFile) {
        formData.append('mainImage', mainImageFile)
      }

      try {
        await dispatch(createPost(formData)).unwrap()
        toast.success('Post created successfully')
        navigate('/')
      } catch (err) {
        toast.error(typeof err === 'string' ? err : 'Failed to create post')
      }
    } else {
      console.log('Editor not ready yet')
    }
  }

  return (
    // Full screen with white background
    <div className="h-[100vh] w-[100vw] flex justify-center items-start overflow-auto">
      <div className="w-full max-w-5xl px-4 py-6 space-y-4">
        {/* Form fields above editor */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1">Title</label>
            <input
              type="text"
              className="w-full border rounded px-3 py-2"
              placeholder="Enter title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Sub Title</label>
            <input
              type="text"
              className="w-full border rounded px-3 py-2"
              placeholder="Enter sub title"
              value={subTitle}
              onChange={(e) => setSubTitle(e.target.value)}
            />
          </div>
          <div className="md:col-span-2">
            <label className="block text-sm font-medium mb-1">Category</label>
            <div className="relative">
              <button
                type="button"
                className="w-full border rounded px-3 py-2 text-left"
                onClick={() => setIsCategoryOpen((o) => !o)}
              >
                {selectedCategories.length > 0
                  ? `${selectedCategories.length} selected`
                  : 'Select categories'}
              </button>
              {isCategoryOpen && (
                <div className="absolute z-10 mt-1 w-full max-h-56 overflow-auto border bg-white rounded shadow">
                  {categoryOptions.map((opt) => {
                    const active = selectedCategories.includes(opt)
                    return (
                      <div
                        key={opt}
                        onClick={() => toggleCategory(opt)}
                        className={`px-3 py-2 cursor-pointer hover:bg-gray-100 ${active ? 'bg-blue-50' : ''}`}
                      >
                        <div className="flex items-center gap-2">
                          <input type="checkbox" checked={active} readOnly />
                          <span>{opt}</span>
                        </div>
                      </div>
                    )
                  })}
                </div>
              )}
            </div>

            {/* Selected chips */}
            {selectedCategories.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-2">
                {selectedCategories.map((cat) => (
                  <span key={cat} className="inline-flex items-center gap-1 bg-blue-100 text-blue-800 px-2 py-1 rounded text-sm">
                    {cat}
                    <button
                      type="button"
                      aria-label={`Remove ${cat}`}
                      className="text-blue-900 hover:text-red-600"
                      onClick={() => removeCategory(cat)}
                    >
                      x
                    </button>
                  </span>
                ))}
              </div>
            )}
          </div>
          <div className="md:col-span-2">
            <label className="block text-sm font-medium mb-1">Main Image</label>
            <input
              type="file"
              accept="image/*"
              className="w-full border rounded px-3 py-2"
              onChange={(e) => setMainImageFile(e.target.files?.[0] || null)}
            />
          </div>
        </div>

        {/* Editor */}
        <SimpleEditor handleSave={handleSave} editorRef={editorRef} />

        {/* Save button under editor */}
        <div className="flex justify-end">
          <button
            onClick={handleSave}
            disabled={isCreating}
            className="px-4 py-2 rounded bg-blue-600 text-white disabled:opacity-60"
          >
            {isCreating ? 'Saving...' : 'Save'}
          </button>
        </div>
      </div>
    </div>
  )
}

export default Blog
