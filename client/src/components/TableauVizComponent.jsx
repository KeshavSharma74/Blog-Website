import React, { useEffect, useRef } from 'react';

const TableauVizComponent = ({ url, options = {} }) => {
  const containerRef = useRef(null);

  useEffect(() => {
    if (!containerRef.current || !url) return;

    // Default options
    const defaultOptions = {
      hideTabs: true,
      toolbar: "bottom",
      width: "100%",
      height: "600px",
    };

    // Merge provided options with defaults
    const finalOptions = { ...defaultOptions, ...options };

    // Create the Tableau viz element
    const vizElement = document.createElement('tableau-viz');
    vizElement.setAttribute('id', 'tableau-viz');
    vizElement.setAttribute('src', url);
    
    // Set attributes based on options
    if (finalOptions.hideTabs) {
      vizElement.setAttribute('hide-tabs', '');
    }
    if (finalOptions.toolbar) {
      vizElement.setAttribute('toolbar', finalOptions.toolbar);
    }
    if (finalOptions.width) {
      vizElement.setAttribute('width', finalOptions.width);
    }
    if (finalOptions.height) {
      vizElement.setAttribute('height', finalOptions.height);
    }

    // Clear the container and add the viz element
    containerRef.current.innerHTML = '';
    containerRef.current.appendChild(vizElement);

    // Cleanup function
    return () => {
      if (containerRef.current) {
        containerRef.current.innerHTML = '';
      }
    };
  }, [url, options]);

  return (
    <div className="my-6 w-full">
      <div className="bg-white rounded-lg shadow-md p-4 border">
        <div ref={containerRef} className="w-full"></div>
      </div>
    </div>
  );
};

export default TableauVizComponent;
