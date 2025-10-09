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
  const [description, setDescription] = useState('')
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

      if (!title || !subTitle || !description) {
        toast.error('Title, Sub Title, and Description are required')
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
      formData.append('description', description)
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
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-sm sm:text-md lg:text-lg md:xl xl:text-2xl font-bold text-slate-900">Create New Blog Post</h1>
              <p className="text-[0.75rem] sm:text-[0.85rem] lg:text-[0.9rem] md:text-[0.9rem]  text-slate-600 mt-1">Share your thoughts with the world</p>
            </div>
            <button
              onClick={() => navigate('/')}
              className="px-4 py-2 text-[0.75rem] sm:text-[0.85rem] lg:text-[0.9rem] font-semibold text-slate-600 hover:text-slate-900 transition-colors"
            >
              ← Back to Home
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Form Section */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 sticky top-8">
              <h2 className="text-lg font-semibold text-slate-900 mb-6">Post Details</h2>
              
              <div className="space-y-6">
                {/* Title */}
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Title <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-slate-50 focus:bg-white"
                    placeholder="Enter your blog title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                  />
                </div>

                {/* Sub Title */}
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Subtitle <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-slate-50 focus:bg-white"
                    placeholder="Enter subtitle"
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
                    className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-slate-50 focus:bg-white resize-none"
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
                      className="w-full px-4 py-3 border border-slate-300 rounded-lg text-left focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-slate-50 hover:bg-white flex items-center justify-between"
                      onClick={() => setIsCategoryOpen((o) => !o)}
                    >
                      <span className={selectedCategories.length > 0 ? 'text-slate-900' : 'text-slate-500'}>
                        {selectedCategories.length > 0
                          ? `${selectedCategories.length} selected`
                          : 'Select categories'}
                      </span>
                      <svg 
                        className={`w-5 h-5 text-slate-400 transition-transform duration-200 ${isCategoryOpen ? 'rotate-180' : ''}`}
                        fill="none" 
                        stroke="currentColor" 
                        viewBox="0 0 24 24"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </button>
                    
                    {isCategoryOpen && (
                      <div className="absolute z-20 mt-2 w-full bg-white border border-slate-200 rounded-lg shadow-lg max-h-60 overflow-auto">
                        {categoryOptions.map((opt) => {
                          const active = selectedCategories.includes(opt)
                          return (
                            <div
                              key={opt}
                              onClick={() => toggleCategory(opt)}
                              className={`px-4 py-3 cursor-pointer hover:bg-slate-50 transition-colors duration-150 flex items-center gap-3 ${
                                active ? 'bg-blue-50 border-l-4 border-blue-500' : ''
                              }`}
                            >
                              <div className={`w-4 h-4 border-2 rounded flex items-center justify-center ${
                                active ? 'border-blue-500 bg-blue-500' : 'border-slate-300'
                              }`}>
                                {active && (
                                  <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                  </svg>
                                )}
                              </div>
                              <span className={`text-sm font-medium ${active ? 'text-blue-900' : 'text-slate-700'}`}>
                                {opt}
                              </span>
                            </div>
                          )
                        })}
                      </div>
                    )}
                  </div>

                  {/* Selected Categories */}
                  {selectedCategories.length > 0 && (
                    <div className="flex flex-wrap gap-2 mt-3">
                      {selectedCategories.map((cat) => (
                        <span 
                          key={cat} 
                          className="inline-flex items-center gap-2 bg-blue-100 text-blue-800 px-3 py-1.5 rounded-full text-sm font-medium"
                        >
                          {cat}
                          <button
                            type="button"
                            aria-label={`Remove ${cat}`}
                            className="text-blue-600 hover:text-blue-800 transition-colors duration-150"
                            onClick={() => removeCategory(cat)}
                          >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                          </button>
                        </span>
                      ))}
                    </div>
                  )}
                </div>

                {/* Main Image */}
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Featured Image <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <input
                      type="file"
                      accept="image/*"
                      className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-slate-50 hover:bg-white file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-medium file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                      onChange={(e) => setMainImageFile(e.target.files?.[0] || null)}
                    />
                  </div>
                  {mainImageFile && (
                    <div className="mt-3 p-3 bg-green-50 border border-green-200 rounded-lg">
                      <div className="flex items-center gap-2 text-green-800">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        <span className="text-sm font-medium">Image selected: {mainImageFile.name}</span>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Editor Section */}
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
                disabled={isCreating}
                className="px-8 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 shadow-sm hover:shadow-md flex items-center gap-2"
              >
                {isCreating ? (
                  <>
                    <svg className="animate-spin w-5 h-5" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Publishing...
                  </>
                ) : (
                  <>
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                    </svg>
                    Publish Post
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

export default Blog
