# salliview - Google Drive PDF Viewer

A simple, clean Next.js application for viewing public Google Drive PDFs.

## Features

✅ **Simple URL-based access**: `/preview/[FILE_ID]`  
✅ **Read-only viewing**: No authentication required  
✅ **Fast loading**: 3-second timeout with skip option  
✅ **Responsive design**: Works on all devices  
✅ **Zero configuration**: No API keys needed  
✅ **Production-ready**: Built with Next.js 14 and TypeScript

## 🚀 Deployed on Vercel

Your app is ready to deploy! See **DEPLOY_NOW.md** for step-by-step instructions.

**Quick Deploy**: Visit https://vercel.com → Import `Akin125/salliveiw` → Click Deploy

## Quick Start

### Installation

```bash
npm install
```

### Development

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

### Production

```bash
npm run build
npm start
```

## Usage

### Making a Google Drive File Public

1. Open the file in Google Drive
2. Click **Share** (top right)
3. Click "Change to anyone with the link"
4. Set permission to **Viewer**
5. Copy the file ID from the URL

Example URL: `https://drive.google.com/file/d/1BxiMVs0XRA5nFMdKvBdBZjgmUUqptlbs/view`  
File ID: `1BxiMVs0XRA5nFMdKvBdBZjgmUUqptlbs`

### Viewing a Document

Navigate to:
```
http://localhost:3000/preview/[FILE_ID]
```

Example:
```
http://localhost:3000/preview/1BxiMVs0XRA5nFMdKvBdBZjgmUUqptlbs
```

## Architecture

### Tech Stack
- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript (strict mode)
- **Styling**: Tailwind CSS
- **Rendering**: Client-side only

### File Structure
```
app/
├── preview/[id]/
│   ├── page.tsx          # Preview component with validation
│   ├── error.tsx         # Route-level error boundary
│   └── not-found.tsx     # Invalid file ID handler
├── layout.tsx            # Root layout
├── page.tsx              # Home page with instructions
├── error.tsx             # Global error boundary
├── not-found.tsx         # 404 handler
└── globals.css           # Global styles
```

### Error Boundaries

This application implements comprehensive error handling:

1. **Route-Level Errors** (`preview/[id]/error.tsx`)
   - Component crashes
   - Rendering failures
   - Unexpected runtime errors

2. **Invalid File IDs** (`preview/[id]/not-found.tsx`)
   - Missing file ID
   - Invalid format
   - Malformed URLs

3. **Document Load Errors** (in `page.tsx`)
   - Private/restricted files
   - Deleted files
   - Network failures

4. **Global Errors** (`app/error.tsx`)
   - Application-level failures
   - Unhandled exceptions

### Security

- No authentication required
- No API keys or tokens
- No cookies or local storage
- Sandboxed iframe for document rendering
- Client-side validation of file IDs
- Read-only by design

## Deployment

### Vercel (Recommended)

```bash
npm install -g vercel
vercel
```

Or connect your GitHub repository to Vercel for automatic deployments.

### Other Platforms

See [DEPLOYMENT.md](./DEPLOYMENT.md) for detailed instructions on deploying to:
- Netlify
- Docker
- Custom servers

## Design Principles

This application follows these core principles:

1. **Minimal**: Only essential features, no bloat
2. **Predictable**: Clear error messages, consistent behavior
3. **Safe**: No data collection, read-only access
4. **Shareable**: Simple URLs that work everywhere

## Limitations

- Requires JavaScript enabled
- Depends on Google Drive availability
- Only works with publicly accessible files
- Limited to formats Google Drive can preview
- No offline support

## Troubleshooting

### Document Won't Load

**Common causes:**
- File is not set to public
- File ID is incorrect
- File has been deleted
- File format not supported

**Solution:**
1. Verify file is publicly accessible in Google Drive
2. Double-check the file ID
3. Ensure the file still exists
4. Try opening the Google Drive URL directly

### Invalid File ID Error

**Common causes:**
- File ID missing from URL
- Invalid characters in file ID
- Typo in URL

**Solution:**
- Use format: `/preview/[FILE_ID]`
- File IDs are 10-100 characters (letters, numbers, `-`, `_`)

### Page Not Found

**Common causes:**
- Incorrect URL path
- Extra/missing slashes

**Solution:**
- Ensure URL matches: `/preview/[FILE_ID]`
- Check for typos

## Browser Support

- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)
- Mobile browsers

## Contributing

This is a minimal, focused application. Changes should maintain:
- Simplicity
- Zero configuration
- Production-readiness
- Comprehensive error handling

## License

MIT

## Support

For detailed deployment instructions and troubleshooting, see [DEPLOYMENT.md](./DEPLOYMENT.md).

