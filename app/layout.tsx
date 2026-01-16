import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "salliview - PDF Viewer",
  description: "Simple Google Drive PDF viewer",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="antialiased">{children}</body>
    </html>
  );
}

