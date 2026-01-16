"use client";

import { useParams, notFound } from "next/navigation";
import { useEffect } from "react";
import Link from "next/link";
import FlipbookViewer from "./FlipbookViewer";

/**
 * Validates Google Drive file ID format
 * IDs are typically 25-44 characters, alphanumeric with underscores and hyphens
 */
function isValidFileId(id: string | null | undefined): id is string {
  if (!id || typeof id !== "string") return false;
  if (id.length < 10 || id.length > 100) return false;
  // Allow alphanumeric, underscores, hyphens
  return /^[a-zA-Z0-9_-]+$/.test(id);
}

export default function PreviewPage() {
  const params = useParams();
  const fileId = params?.id as string | undefined;

  // Defensive validation
  useEffect(() => {
    if (!isValidFileId(fileId)) {
      notFound();
    }
  }, [fileId]);

  // Invalid ID check (should not reach here due to useEffect, but defensive)
  if (!isValidFileId(fileId)) {
    notFound();
    return null;
  }

  return (
    <div className="h-screen w-screen flex flex-col bg-slate-50">
      {/* Header */}
      <header className="bg-white border-b border-slate-200 shadow-sm">
        <div className="flex items-center justify-between px-6 py-4">
          <div className="flex items-center space-x-4">
            <Link
              href="/"
              className="text-slate-600 hover:text-slate-800 transition-colors"
              aria-label="Go home"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M10 19l-7-7m0 0l7-7m-7 7h18"
                />
              </svg>
            </Link>
            <div>
              <h1 className="text-xl font-semibold text-slate-800">
                salliview
              </h1>
            </div>
          </div>
          <div className="flex items-center space-x-2 text-sm text-slate-500">
            <span className="hidden sm:inline">Read-only</span>
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path
                fillRule="evenodd"
                d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
                clipRule="evenodd"
              />
            </svg>
          </div>
        </div>
      </header>

      {/* PDF Viewer */}
      <div className="flex-1 overflow-hidden">
        <FlipbookViewer fileId={fileId} />
      </div>
    </div>
  );
}

