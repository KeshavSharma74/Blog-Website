import React, { useEffect, useRef } from 'react';

const CodeBlockHandler = ({ htmlContent }) => {
  const contentRef = useRef(null);

  useEffect(() => {
    if (!contentRef.current || !htmlContent) return;

    // A small delay can help ensure all DOM elements are ready.
    const timer = setTimeout(() => {
      const codeBlocks = contentRef.current.querySelectorAll('pre');

      codeBlocks.forEach((pre) => {
        // Prevent adding a button if the wrapper already exists
        if (pre.parentElement?.classList.contains('code-wrapper-custom')) {
          return;
        }

        // --- THE FIX IS HERE ---
        const wrapper = document.createElement('div');
        wrapper.className = 'code-wrapper-custom';
        wrapper.style.cssText = `
          position: relative;
          margin: 2rem 0; 
        `; // Removed padding-top: 3rem

        pre.parentNode.insertBefore(wrapper, pre);
        wrapper.appendChild(pre);

        // Reset pre margin since the wrapper now handles it
        pre.style.margin = '0';

        const buttonContainer = document.createElement('div');
        buttonContainer.style.cssText = `
          position: absolute;
          top: 0;
          right: 0;
          padding: 0.75rem; /* Increased padding slightly for better spacing */
        `;

        const button = document.createElement('button');
        button.className = 'copy-btn-custom';
        button.type = 'button';
        button.setAttribute('aria-label', 'Copy code');
        
        button.style.cssText = `
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 0.5rem;
          padding: 0.5rem 1rem;
          background-color: #3b82f6; /* Tailwind's blue-500 */
          color: white;
          border: none;
          border-radius: 6px;
          cursor: pointer;
          font-size: 0.875rem;
          font-weight: 500;
          box-shadow: 0 2px 4px rgba(0,0,0,0.1);
          transition: all 0.2s;
        `;
        
        button.innerHTML = `
          <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
            <path d="M4 1.5H3a2 2 0 0 0-2 2V14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V3.5a2 2 0 0 0-2-2h-1v1h1a1 1 0 0 1 1 1V14a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V3.5a1 1 0 0 1 1-1h1v-1z"/>
            <path d="M9.5 1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-3a.5.5 0 0 1-.5-.5v-1a.5.5 0 0 1 .5-.5h3zm-3-1A1.5 1.5 0 0 0 5 1.5v1A1.5 1.5 0 0 0 6.5 4h3A1.5 1.5 0 0 0 11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3z"/>
          </svg>
          <span>Copy Code</span>
        `;

        button.addEventListener('mouseenter', function() {
          this.style.backgroundColor = '#2563eb'; // blue-600
          this.style.transform = 'translateY(-1px)';
          this.style.boxShadow = '0 4px 6px rgba(0,0,0,0.15)';
        });
        
        button.addEventListener('mouseleave', function() {
          this.style.backgroundColor = '#3b82f6';
          this.style.transform = 'translateY(0)';
          this.style.boxShadow = '0 2px 4px rgba(0,0,0,0.1)';
        });

        buttonContainer.appendChild(button);
        // Insert the button container into the wrapper
        wrapper.appendChild(buttonContainer);

        button.addEventListener('click', async function(e) {
          e.preventDefault();
          e.stopPropagation();
          
          const codeElement = pre.querySelector('code');
          const textToCopy = codeElement ? codeElement.innerText : pre.innerText;
          
          try {
            await navigator.clipboard.writeText(textToCopy);
            
            this.style.backgroundColor = '#10b981'; // green-500
            this.innerHTML = `
              <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                <path d="M12.736 3.97a.733.733 0 0 1 1.047 0c.286.289.29.756.01 1.05L7.88 12.01a.733.733 0 0 1-1.065.02L3.217 8.384a.757.757 0 0 1 0-1.06.733.733 0 0 1 1.047 0l3.052 3.093 5.4-6.425a.247.247 0 0 1 .02-.022z"/>
              </svg>
              <span>Copied!</span>
            `;
            
            setTimeout(() => {
              this.style.backgroundColor = '#3b82f6';
              this.innerHTML = `
                <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                  <path d="M4 1.5H3a2 2 0 0 0-2 2V14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V3.5a2 2 0 0 0-2-2h-1v1h1a1 1 0 0 1 1 1V14a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V3.5a1 1 0 0 1 1-1h1v-1z"/>
                  <path d="M9.5 1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-3a.5.5 0 0 1-.5-.5v-1a.5.5 0 0 1 .5-.5h3zm-3-1A1.5 1.5 0 0 0 5 1.5v1A1.5 1.5 0 0 0 6.5 4h3A1.5 1.5 0 0 0 11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3z"/>
                </svg>
                <span>Copy Code</span>
              `;
            }, 2000);
          } catch (err) {
            console.error('Failed to copy:', err);
          }
        });
      });
    }, 100); // Reduced delay slightly

    return () => clearTimeout(timer);
  }, [htmlContent]);

  return (
    <div
      ref={contentRef}
      className="prose prose-lg prose-blue max-w-none dark:prose-invert"
      dangerouslySetInnerHTML={{ __html: htmlContent }}
    />
  );
};

export default CodeBlockHandler;