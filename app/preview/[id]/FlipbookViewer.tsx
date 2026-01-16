"use client";

import { useState, useEffect, useRef } from "react";

interface PDFViewerProps {
  fileId: string;
}

export default function PDFViewer({ fileId }: PDFViewerProps) {
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const loadingTimeoutRef = useRef<NodeJS.Timeout>();

  const previewUrl = `https://drive.google.com/file/d/${fileId}/preview`;

  useEffect(() => {
    // Auto-dismiss loading after 3 seconds
    loadingTimeoutRef.current = setTimeout(() => {
      if (isLoading) {
        setIsLoading(false);
      }
    }, 3000);

    return () => {
      if (loadingTimeoutRef.current) {
        clearTimeout(loadingTimeoutRef.current);
      }
    };
  }, [isLoading]);

  const handleLoad = () => {
    if (loadingTimeoutRef.current) {
      clearTimeout(loadingTimeoutRef.current);
    }
    setIsLoading(false);
    setHasError(false);
  };

  const handleError = () => {
    if (loadingTimeoutRef.current) {
      clearTimeout(loadingTimeoutRef.current);
    }
    setIsLoading(false);
    setHasError(true);
  };



  if (hasError) {
    return (
      <div className="flex items-center justify-center h-full p-8">
        <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-8 text-center space-y-6">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-red-100 rounded-full">
            <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
          </div>
          <div className="space-y-2">
            <h2 className="text-2xl font-bold text-slate-800">Unable to Load Document</h2>
            <p className="text-slate-600">Please ensure:</p>
          </div>
          <ul className="text-left text-sm text-slate-600 space-y-1 bg-slate-50 rounded-lg p-4">
            <li>• The file is <strong>public</strong> (Anyone with the link)</li>
            <li>• File ID: <code className="bg-white px-1 rounded font-mono text-xs">{fileId}</code></li>
            <li>• The file is a PDF</li>
          </ul>
          <div className="space-y-2">
            <button
              onClick={() => window.location.reload()}
              className="w-full bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors"
            >
              Try Again
            </button>
            <a
              href={`https://drive.google.com/file/d/${fileId}/view`}
              target="_blank"
              rel="noopener noreferrer"
              className="block text-blue-600 hover:text-blue-800 text-sm font-medium"
            >
              Open in Google Drive →
            </a>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="relative w-full h-full">
      {/* Loading Overlay */}
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-slate-100 z-50">
          <div className="text-center space-y-4">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-slate-200 border-t-blue-600"></div>
            <p className="text-slate-600 font-medium">Loading document...</p>
            <button
              onClick={() => setIsLoading(false)}
              className="text-blue-600 hover:text-blue-800 text-sm font-medium underline"
            >
              Skip
            </button>
          </div>
        </div>
      )}

      {/* PDF Viewer */}
      <iframe
        ref={iframeRef}
        src={previewUrl}
        onLoad={handleLoad}
        onError={handleError}
        className="w-full h-full border-0"
        title="PDF Viewer"
        sandbox="allow-scripts allow-same-origin allow-popups allow-popups-to-escape-sandbox"
        allow="fullscreen"
      />
    </div>
  );
}

