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
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-slate-900">Update Blog Post</h1>
              <p className="text-sm text-slate-600 mt-1">Edit your existing blog post</p>
            </div>
            <button
              onClick={() => navigate('/')}
              className="px-4 py-2 text-sm font-medium text-slate-600 hover:text-slate-900 transition-colors"
            >
              ← Back to Home
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Left Column: Form Fields */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-sm border border-slate-200">
              <div className="px-4 sm:px-6 py-4 border-b border-slate-200 bg-slate-50">
                <h2 className="text-lg font-semibold text-slate-900">Post Details</h2>
                <p className="text-sm text-slate-600 mt-1">Basic information about your post</p>
              </div>
              <div className="px-4 sm:px-6 py-6 space-y-6">
                
                {/* Title */}
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Title <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                    placeholder="Enter your blog title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                  />
                </div>

                {/* Sub Title */}
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Sub Title <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                    placeholder="Enter a subtitle"
                    value={subTitle}
                    onChange={(e) => setSubTitle(e.target.value)}
                  />
                </div>

                {/* Description */}
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Description <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors resize-none"
                    placeholder="Brief description of your post"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    rows={4}
                  />
                </div>

                {/* Categories */}
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Categories <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <button
                      type="button"
                      className="w-full px-3 py-2 border border-slate-300 rounded-lg text-left focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors bg-white"
                      onClick={() => setIsCategoryOpen((o) => !o)}
                    >
                      {selectedCategories.length > 0
                        ? `${selectedCategories.length} selected`
                        : 'Select categories'}
                    </button>
                    {isCategoryOpen && (
                      <div className="absolute z-10 mt-1 w-full max-h-56 overflow-auto border border-slate-300 bg-white rounded-lg shadow-lg">
                        {categoryOptions.map((opt) => {
                          const active = selectedCategories.includes(opt)
                          return (
                            <div
                              key={opt}
                              onClick={() => toggleCategory(opt)}
                              className={`px-3 py-2 cursor-pointer hover:bg-slate-50 transition-colors ${active ? 'bg-blue-50' : ''}`}
                            >
                              <div className="flex items-center gap-2">
                                <input type="checkbox" checked={active} readOnly className="text-blue-600" />
                                <span className="text-slate-700">{opt}</span>
                              </div>
                            </div>
                          )
                        })}
                      </div>
                    )}
                  </div>

                  {/* Selected chips */}
                  {selectedCategories.length > 0 && (
                    <div className="flex flex-wrap gap-2 mt-3">
                      {selectedCategories.map((cat) => (
                        <span key={cat} className="inline-flex items-center gap-1 bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
                          {cat}
                          <button
                            type="button"
                            aria-label={`Remove ${cat}`}
                            className="text-blue-600 hover:text-red-600 transition-colors"
                            onClick={() => removeCategory(cat)}
                          >
                            ×
                          </button>
                        </span>
                      ))}
                    </div>
                  )}
                </div>

                {/* Main Image */}
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Main Image
                  </label>
                  <div className="space-y-3">
                    <input
                      type="file"
                      accept="image/*"
                      className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                      onChange={(e) => setMainImageFile(e.target.files?.[0] || null)}
                    />
                    {currentPost.mainImage && (
                      <div className="mt-3">
                        <p className="text-sm text-slate-600 mb-2">Current image:</p>
                        <img 
                          src={currentPost.mainImage} 
                          alt="Current" 
                          className="w-full h-32 object-cover rounded-lg border border-slate-200" 
                        />
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Editor */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl shadow-sm border border-slate-200">
              <div className="px-4 sm:px-6 py-4 border-b border-slate-200 bg-slate-50">
                <h2 className="text-lg font-semibold text-slate-900">Content Editor</h2>
                <p className="text-sm text-slate-600 mt-1">Write your blog post content below</p>
              </div>
              <div className="w-full">
                <SimpleEditor handleSave={handleSave} editorRef={editorRef} />
              </div>
            </div>

            {/* Save Button */}
            <div className="mt-6 flex justify-end">
              <button
                onClick={handleSave}
                disabled={isUpdating}
                className="px-8 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 shadow-sm hover:shadow-md flex items-center gap-2"
              >
                {isUpdating ? (
                  <>
                    <svg className="animate-spin w-5 h-5" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Updating...
                  </>
                ) : (
                  <>
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
                    </svg>
                    Update Post
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default UpdateBlog
