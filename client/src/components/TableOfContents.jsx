import React, { useEffect, useState } from 'react';
import { IoChevronUp, IoChevronDown } from 'react-icons/io5';

const TableOfContents = ({ htmlContent, onContentUpdate }) => {
  const [headings, setHeadings] = useState([]);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (!htmlContent) return;

    // Create a temporary DOM element to parse the HTML
    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = htmlContent;

    // Extract all h2 and h3 tags
    const headingElements = tempDiv.querySelectorAll('h2, h3');
    
    const extractedHeadings = Array.from(headingElements).map((heading, index) => {
      const text = heading.textContent.trim();
      const level = heading.tagName.toLowerCase();
      const id = `heading-${index}`;
      
      // Add ID to the heading element
      heading.id = id;
      
      return {
        text,
        level,
        id
      };
    });

    setHeadings(extractedHeadings);

    // Update the HTML content with IDs added to headings
    const updatedHtml = tempDiv.innerHTML;
    if (onContentUpdate) {
      onContentUpdate(updatedHtml);
    }

    // Add scroll margin to headings after DOM is rendered
    const timer = setTimeout(() => {
      const actualHeadings = document.querySelectorAll('h2[id], h3[id]');
      actualHeadings.forEach((heading) => {
        heading.style.scrollMarginTop = '120px'; // Offset for fixed header
      });
    }, 100);

    return () => clearTimeout(timer);
  }, [htmlContent, onContentUpdate]);

  const scrollToHeading = (id) => {
    const element = document.getElementById(id);
    if (element) {
      // Use scrollIntoView for better browser compatibility
      element.scrollIntoView({ 
        behavior: 'smooth', 
        block: 'start',
        inline: 'nearest'
      });
    }
  };

  if (headings.length === 0) {
    return null;
  }

  return (
    <div className="bg-white border mb-10 border-gray-200 rounded-lg p-6">
      <div 
        className="flex justify-between items-center cursor-pointer mb-4"
        onClick={() => setIsOpen(!isOpen)}
      >
        <h3 className="text-sm font-bold uppercase text-gray-500 tracking-wider">
          Table of Contents
        </h3>
        {isOpen ? (
          <IoChevronUp className="w-5 h-5 text-gray-500" />
        ) : (
          <IoChevronDown className="w-5 h-5 text-gray-500" />
        )}
      </div>

      {isOpen && (
        <div className="flex flex-col divide-y divide-gray-200">
          {headings.map((heading, index) => (
            <button
              key={index}
              onClick={() => scrollToHeading(heading.id)}
              className={`py-3 text-left text-gray-800 hover:cursor-pointer hover:text-blue-600 transition-colors duration-200 ${
                heading.level === 'h3' ? 'pl-4' : ''
              }`}
            >
              {heading.text}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default TableOfContents;