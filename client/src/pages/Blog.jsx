import React from 'react'
import { SimpleEditor } from '@/components/tiptap-templates/simple/simple-editor'

const Blog = () => {
  return (
    // Full screen with white background
    <div className="h-[100vh] w-[100vw] bg-white flex justify-center items-center overflow-auto">
      
      {/* Center editor container with max width */}
      <div className="w-full max-w-[1200px] px-4">
        <SimpleEditor />
      </div>
    </div>
  )
}

export default Blog
