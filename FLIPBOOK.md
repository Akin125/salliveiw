# salliview - Flipbook Document Viewer

An interactive flipbook viewer for Google Drive PDF documents built with Next.js 14 and React.

## Features

- 📖 **Flipbook Interface**: Interactive page-turning experience with realistic page flip animations
- 🎨 **Modern UI**: Clean, gradient design with Tailwind CSS
- 📱 **Responsive**: Works on desktop and mobile devices
- 🔄 **Page Navigation**: Use buttons or click/swipe to navigate pages
- 📊 **Page Counter**: Always know which page you're on
- 🔒 **Read-only**: Safe viewing without edit permissions
- ⚡ **Fast Loading**: Optimized PDF rendering with PDF.js

## Technology Stack

- **Next.js 14** - React framework with App Router
- **TypeScript** - Type-safe development
- **Tailwind CSS** - Utility-first styling
- **react-pageflip** - Flipbook animations
- **PDF.js** - PDF rendering and parsing
- **React 18** - Latest React features

## How to Use

1. Visit the home page at `/`
2. Navigate to `/preview/[FILE_ID]` where `[FILE_ID]` is your Google Drive file ID
3. Enjoy the flipbook experience!

### Example URL
```
http://localhost:3000/preview/1a2b3c4d5e
```

## Getting the File ID

To get a Google Drive file ID:

1. Open the file in Google Drive
2. Click "Share" (top right)
3. Set to "Anyone with the link can view"
4. The URL will look like: `https://drive.google.com/file/d/[FILE_ID]/view`
5. Copy the `[FILE_ID]` portion

**Important**: The file must be publicly accessible for the viewer to work!

## Installation

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

## Project Structure

```
salliview/
├── app/
│   ├── layout.tsx              # Root layout with metadata
│   ├── page.tsx                # Home page with instructions
│   ├── globals.css             # Global styles including flipbook CSS
│   └── preview/
│       └── [id]/
│           ├── page.tsx        # Preview page wrapper
│           ├── FlipbookViewer.tsx  # Flipbook component
│           ├── error.tsx       # Error boundary
│           └── not-found.tsx   # 404 page
├── package.json
└── README.md
```

## Flipbook Controls

- **Click/Tap**: Click on page edges to flip
- **Arrow Buttons**: Use the navigation buttons below the flipbook
- **Swipe**: Swipe left/right on mobile devices
- **Keyboard**: Use arrow keys (left/right) for navigation

## Configuration

The flipbook can be customized in `FlipbookViewer.tsx`:

```typescript
<HTMLFlipBook
  width={550}          // Page width
  height={733}         // Page height
  size="stretch"       // Sizing mode
  minWidth={315}       // Minimum width
  maxWidth={1000}      // Maximum width
  minHeight={420}      // Minimum height
  maxHeight={1350}     // Maximum height
  maxShadowOpacity={0.5}  // Shadow intensity
  showCover={true}     // Show cover page
  flippingTime={1000}  // Animation duration (ms)
  // ... more options
/>
```

## Browser Support

- Chrome/Edge (recommended)
- Firefox
- Safari
- Mobile browsers (iOS Safari, Chrome Mobile)

## Troubleshooting

### Document Won't Load
- Verify the file is set to public in Google Drive
- Check that the file ID is correct
- Ensure the file is a PDF format

### Flipbook Not Animating
- Check browser console for errors
- Ensure JavaScript is enabled
- Try refreshing the page

### Performance Issues
- Large PDFs may take time to render
- Consider reducing the PDF scale in `FlipbookViewer.tsx`
- Try on a device with better performance

## Development

```bash
# Install dependencies
npm install

# Run in development mode with hot reload
npm run dev

# Check for TypeScript errors
npx tsc --noEmit

# Lint code
npm run lint
```

## License

Private project - All rights reserved

## Credits

Built with ❤️ using Next.js, React, and the power of modern web technologies.

