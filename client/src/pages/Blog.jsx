import React, { useRef } from 'react'
import { SimpleEditor } from '@/components/tiptap-templates/simple/simple-editor'

const Blog = () => {
  const editorRef = useRef(null)

  const handleSave = () => {
    if (editorRef.current) {
      // Get the editor data in TipTap's JSON format
      const editorData = editorRef.current.getJSON()
      console.log('Editor Data (JSON):', editorData)
      
      // Also get the HTML format if needed
      const editorHTML = editorRef.current.getHTML()
      console.log('Editor Data (HTML):', editorHTML)
    } else {
      console.log('Editor not ready yet')
    }
  }

  return (
    // Full screen with white background
    <div className="h-[100vh] w-[100vw]  flex justify-center items-center overflow-auto">
      
      {/* Center editor container with max width */}
      <div className="w-full px-4">
        <SimpleEditor handleSave={handleSave} editorRef={editorRef} />
      </div>
    </div>
  )
}

export default Blog
