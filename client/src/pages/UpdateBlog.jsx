import React, { useRef, useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams, useNavigate } from 'react-router-dom'
import { SimpleEditor } from '@/components/tiptap-templates/simple/simple-editor'
import { updatePost, getPostBySlug } from '@/features/postSlice'
import toast from 'react-hot-toast'

const UpdateBlog = () => {
  const editorRef = useRef(null)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { slug } = useParams()
  const { currentPost, isUpdating, isFetching } = useSelector((state) => state.post)

  const [title, setTitle] = useState('')
  const [subTitle, setSubTitle] = useState('')
  const [description, setDescription] = useState('')
  const [selectedCategories, setSelectedCategories] = useState([])
  const [isCategoryOpen, setIsCategoryOpen] = useState(false)
  const [mainImageFile, setMainImageFile] = useState(null)

  // Define available category options
  const categoryOptions = [
    'AI',
    'Computer',
    'Tech',
    'Science',
    'Other',
  ]

  // Fetch post data when component mounts
  useEffect(() => {
    if (slug) {
      dispatch(getPostBySlug(slug))
    }
  }, [dispatch, slug])

  // Populate form when post data is loaded
  useEffect(() => {
    if (currentPost) {
      setTitle(currentPost.title || '')
      setSubTitle(currentPost.subTitle || '')
      setDescription(currentPost.description || '')
      setSelectedCategories(currentPost.category || [])
      
      // Set editor content after a short delay to ensure editor is ready
      if (editorRef.current && currentPost.content) {
        setTimeout(() => {
          editorRef.current.commands.setContent(currentPost.content)
        }, 100)
      }
    }
  }, [currentPost])

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

      if (!title || !subTitle || !description) {
        toast.error('Title, Sub Title, and Description are required')
        return
      }
      if (selectedCategories.length === 0) {
        toast.error('Please select at least one category')
        return
      }

      const formData = new FormData()
      formData.append('title', title)
      formData.append('subTitle', subTitle)
      formData.append('description', description)
      formData.append('category', JSON.stringify(selectedCategories))
      formData.append('content', JSON.stringify(editorData))
      formData.append('contentHTML', editorHTML)
      if (mainImageFile) {
        formData.append('mainImage', mainImageFile)
      }

      try {
        await dispatch(updatePost({ id: currentPost._id, formData })).unwrap()
        toast.success('Post updated successfully')
        navigate('/blog')
      } catch (err) {
        toast.error(typeof err === 'string' ? err : 'Failed to update post')
      }
    } else {
      console.log('Editor not ready yet')
    }
  }

  if (isFetching) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading post...</p>
        </div>
      </div>
    )
  }

  if (!currentPost) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Post not found</h2>
          <p className="text-gray-600">The post you're trying to edit does not exist.</p>
        </div>
      </div>
    )
  }

  return (
    <div className="h-[100vh] w-[100vw] flex justify-center items-start overflow-auto">
      <div className="w-full max-w-5xl px-4 py-6 space-y-4">
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Update Post</h1>
          <p className="text-gray-600">Edit your blog post below</p>
        </div>

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
            <label className="block text-sm font-medium mb-1">Description</label>
            <textarea
              className="w-full border rounded px-3 py-2"
              placeholder="Enter description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={3}
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
            <label className="block text-sm font-medium mb-1">Main Image (Optional - leave empty to keep current)</label>
            <input
              type="file"
              accept="image/*"
              className="w-full border rounded px-3 py-2"
              onChange={(e) => setMainImageFile(e.target.files?.[0] || null)}
            />
            {currentPost.mainImage && (
              <div className="mt-2">
                <p className="text-sm text-gray-600 mb-2">Current image:</p>
                <img src={currentPost.mainImage} alt="Current" className="w-32 h-20 object-cover rounded" />
              </div>
            )}
          </div>
        </div>

        {/* Editor */}
        <SimpleEditor handleSave={handleSave} editorRef={editorRef} />

        {/* Save button under editor */}
        <div className="flex justify-end">
          <button
            onClick={handleSave}
            disabled={isUpdating}
            className="px-4 py-2 rounded bg-blue-600 text-white disabled:opacity-60"
          >
            {isUpdating ? 'Updating...' : 'Update Post'}
          </button>
        </div>
      </div>
    </div>
  )
}

export default UpdateBlog
