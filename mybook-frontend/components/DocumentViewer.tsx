'use client';

import { useState } from 'react';

interface DocumentViewerProps {
  activePage?: number | null;
}

export default function DocumentViewer({ activePage }: DocumentViewerProps) {
  const [fileUrl, setFileUrl] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Reset state and show loading
    setIsUploading(true);
    setError(null);

    // Create a local object URL to display the PDF immediately after indexing safely
    const objectUrl = URL.createObjectURL(file);
    
    // Prepare FormData
    const formData = new FormData();
    formData.append('file', file);

    try {
      // Send to Next.js API route which proxies to FastAPI
      const res = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });

      if (!res.ok) {
        const errorData = await res.json().catch(() => null);
        throw new Error(errorData?.error || 'Failed to index document via server.');
      }

      // If successfully indexed in the backend, set the file URL to render the PDF
      setFileUrl(objectUrl);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unknown error occurred');
      URL.revokeObjectURL(objectUrl);
    } finally {
      setIsUploading(false);
    }
  };

  // Append #page hash to navigate directly to the citation page
  const dataUrl = fileUrl ? `${fileUrl}${activePage ? `#page=${activePage}` : ''}` : '';

  return (
    <div className="flex-1 w-full h-full flex flex-col items-center justify-center bg-white rounded-xl shadow-inner border max-h-full overflow-hidden">
      {!fileUrl ? (
        <div className="w-full h-full border-2 border-dashed border-gray-300 flex flex-col items-center justify-center p-6 text-center">
          <svg className="w-12 h-12 text-gray-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
          </svg>
          <p className="text-gray-500 font-medium mb-4">Upload a PDF to view and chat with it</p>
          
          <label className={`cursor-pointer text-white px-6 py-3 rounded-lg transition font-medium ${isUploading ? 'bg-blue-400 cursor-wait' : 'bg-blue-600 hover:bg-blue-700'}`}>
            {isUploading ? 'Uploading & Indexing...' : 'Select PDF Document'}
            <input 
              type="file" 
              accept=".pdf" 
              className="hidden" 
              onChange={handleFileUpload} 
              disabled={isUploading}
            />
          </label>
          
          {error && <p className="text-red-500 mt-4 text-sm font-medium">{error}</p>}
        </div>
      ) : (
        <div className="w-full h-full relative group">
          <object 
            key={dataUrl} // Force re-render when page changes
            data={dataUrl} 
            type="application/pdf"
            className="w-full h-full rounded-xl"
          >
            <p>Your browser does not support PDFs. <a href={dataUrl}>Download the PDF</a>.</p>
          </object>
          <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
             <label className={`cursor-pointer bg-white text-gray-800 shadow-md border px-4 py-2 rounded-lg hover:bg-gray-50 transition text-sm font-medium ${isUploading ? 'opacity-50 cursor-wait' : ''}`}>
                {isUploading ? 'Indexing...' : 'Upload New File'}
                <input 
                  type="file" 
                  accept=".pdf" 
                  className="hidden" 
                  onChange={handleFileUpload} 
                  disabled={isUploading}
                />
             </label>
          </div>
        </div>
      )}
    </div>
  );
}
