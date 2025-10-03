import { Image } from "@tiptap/extension-image"
import { Plugin, PluginKey } from "@tiptap/pm/state"
import { handleImageUpload } from "@//lib/tiptap-utils"

export const CloudinaryImage = Image.extend({
  name: "cloudinaryImage",

  addOptions() {
    return {
      ...this.parent?.(),
      inline: false,
      allowBase64: false,
      HTMLAttributes: {},
    }
  },

  addAttributes() {
    return {
      ...this.parent?.(),
      src: {
        default: null,
        parseHTML: element => element.getAttribute("src"),
        renderHTML: attributes => {
          if (!attributes.src) {
            return {}
          }
          return {
            src: attributes.src,
          }
        },
      },
      alt: {
        default: null,
        parseHTML: element => element.getAttribute("alt"),
        renderHTML: attributes => {
          if (!attributes.alt) {
            return {}
          }
          return {
            alt: attributes.alt,
          }
        },
      },
      title: {
        default: null,
        parseHTML: element => element.getAttribute("title"),
        renderHTML: attributes => {
          if (!attributes.title) {
            return {}
          }
          return {
            title: attributes.title,
          }
        },
      },
    }
  },

  addCommands() {
    return {
      ...this.parent?.(),
      setCloudinaryImage: (options) => ({ commands }) => {
        return commands.insertContent({
          type: this.name,
          attrs: options,
        })
      },
    }
  },

  addProseMirrorPlugins() {
    return [
      ...this.parent?.() || [],
      // Plugin to handle paste events
      new Plugin({
        key: new PluginKey("cloudinaryImagePaste"),
        props: {
          handlePaste: (view, event, slice) => {
            const items = Array.from(event.clipboardData?.items || [])
            
            for (const item of items) {
              if (item.type.indexOf("image") === 0) {
                event.preventDefault()
                
                const file = item.getAsFile()
                if (file) {
                  // Upload to Cloudinary
                  handleImageUpload(file)
                    .then(url => {
                      const { state, dispatch } = view
                      const { selection } = state
                      
                      const imageNode = view.state.schema.nodes.cloudinaryImage.create({
                        src: url,
                        alt: file.name,
                        title: file.name,
                      })
                      
                      const transaction = state.tr.replaceSelectionWith(imageNode)
                      dispatch(transaction)
                    })
                    .catch(error => {
                      console.error("Failed to upload image:", error)
                    })
                }
                return true
              }
            }
            return false
          },
          
          handleDrop: (view, event, slice, moved) => {
            if (!moved && event.dataTransfer && event.dataTransfer.files) {
              const files = Array.from(event.dataTransfer.files)
              
              for (const file of files) {
                if (file.type.indexOf("image") === 0) {
                  event.preventDefault()
                  
                  // Upload to Cloudinary
                  handleImageUpload(file)
                    .then(url => {
                      const { state, dispatch } = view
                      const { selection } = state
                      
                      const imageNode = view.state.schema.nodes.cloudinaryImage.create({
                        src: url,
                        alt: file.name,
                        title: file.name,
                      })
                      
                      const transaction = state.tr.replaceSelectionWith(imageNode)
                      dispatch(transaction)
                    })
                    .catch(error => {
                      console.error("Failed to upload image:", error)
                    })
                }
              }
              return true
            }
            return false
          },
        },
      }),
    ]
  },
})

export default CloudinaryImage
