# Setup Instructions

## Project Overview
This is a production-ready Next.js application for previewing public Google Drive PDFs in read-only mode. It features comprehensive error handling, TypeScript, and Tailwind CSS.

## Installation

### 1. Install Dependencies
```bash
npm install
```

This will install:
- Next.js 14 (App Router)
- React 18
- TypeScript 5
- Tailwind CSS 3
- All necessary development dependencies

### 2. Development Mode
```bash
npm run dev
```

The application will start at [http://localhost:3000](http://localhost:3000)

### 3. Production Build
```bash
npm run build
npm start
```

## Making a Google Drive File Public

Before you can preview a file, it must be publicly accessible:

1. **Open your file in Google Drive**
2. **Click "Share"** (top-right corner)
3. **Click "Change to anyone with the link"**
4. **Set permission to "Viewer"**
5. **Copy the link**

### Extract the File ID

From a Google Drive URL like:
```
https://drive.google.com/file/d/1BxiMVs0XRA5nFMdKvBdBZjgmUUqptlbs/view
```

The file ID is: `1BxiMVs0XRA5nFMdKvBdBZjgmUUqptlbs`

## Usage

### Preview a Document

Navigate to:
```
http://localhost:3000/preview/[FILE_ID]
```

**Example:**
```
http://localhost:3000/preview/1BxiMVs0XRA5nFMdKvBdBZjgmUUqptlbs
```

### Home Page

Visit `http://localhost:3000` for instructions and examples.

## Project Structure

```
salliveiw/
├── app/
│   ├── preview/
│   │   └── [id]/
│   │       ├── page.tsx          # Main preview component
│   │       ├── error.tsx         # Route-level error boundary
│   │       └── not-found.tsx     # Invalid file ID handler
│   ├── layout.tsx                # Root layout with metadata
│   ├── page.tsx                  # Home page with instructions
│   ├── error.tsx                 # Global error boundary
│   ├── not-found.tsx             # 404 page
│   └── globals.css               # Global styles + Tailwind
├── package.json                  # Dependencies and scripts
├── tsconfig.json                 # TypeScript configuration
├── tailwind.config.ts            # Tailwind CSS configuration
├── postcss.config.js             # PostCSS configuration
├── next.config.js                # Next.js configuration
├── README.md                     # Main documentation
├── DEPLOYMENT.md                 # Deployment guide
└── .gitignore                    # Git ignore rules
```

## Key Features Implemented

### 1. Error Boundaries (Production-Grade)

**Four-layer error handling system:**

- **Global Error Boundary** (`app/error.tsx`)
  - Catches application-level failures
  - User-friendly error messages
  - Reset functionality

- **Route Error Boundary** (`app/preview/[id]/error.tsx`)
  - Handles preview-specific errors
  - Component crash recovery
  - Clean error UI

- **Not Found Handler** (`app/preview/[id]/not-found.tsx`)
  - Invalid file ID detection
  - Format validation
  - Clear guidance for correct usage

- **Runtime Validation** (in `page.tsx`)
  - File ID format validation
  - Loading states
  - Document load error handling

### 2. File ID Validation

The application validates file IDs defensively:

```typescript
function isValidFileId(id: string | null | undefined): id is string {
  if (!id || typeof id !== "string") return false;
  if (id.length < 10 || id.length > 100) return false;
  return /^[a-zA-Z0-9_-]+$/.test(id);
}
```

Ensures:
- ID exists and is a string
- Length is reasonable (10-100 characters)
- Only alphanumeric characters, underscores, and hyphens

### 3. Responsive UI with Tailwind CSS

- **Clean, distraction-free design**
- **Mobile-responsive layout**
- **Loading states with spinners**
- **Error states with helpful messages**
- **Accessibility considerations**

### 4. Security

**Iframe Sandboxing:**
```typescript
sandbox="allow-scripts allow-same-origin allow-popups allow-popups-to-escape-sandbox"
```

**No Authentication Required:**
- No API keys
- No OAuth tokens
- No cookies
- No local storage
- Read-only by design

### 5. TypeScript (Strict Mode)

All components are fully typed with:
- Strict type checking enabled
- No implicit any
- Proper prop types
- Type guards for validation

## Development Tips

### Running Locally
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000)

### Building for Production
```bash
npm run build
```

### Starting Production Server
```bash
npm start
```

### Type Checking
TypeScript will automatically check types during development and build.

### Linting
```bash
npm run lint
```

## Deployment

### Vercel (Recommended)

**Option 1: Vercel CLI**
```bash
npm install -g vercel
vercel
```

**Option 2: GitHub Integration**
1. Push code to GitHub
2. Connect repository to Vercel
3. Automatic deployments on push

### Other Platforms

See [DEPLOYMENT.md](./DEPLOYMENT.md) for detailed instructions for:
- Netlify
- Docker
- Custom Node.js servers

## Testing the Application

### Test with Example File ID

1. Make a test PDF public in Google Drive
2. Copy the file ID
3. Navigate to: `http://localhost:3000/preview/[YOUR_FILE_ID]`

### Test Error Boundaries

**Invalid File ID:**
```
http://localhost:3000/preview/invalid@id
```

**Missing File ID:**
```
http://localhost:3000/preview/
```

**Non-existent Route:**
```
http://localhost:3000/nonexistent
```

## Troubleshooting

### "npm install" fails
- Ensure Node.js 18+ is installed
- Delete `node_modules` and `package-lock.json`, then retry
- Check internet connection

### Build fails
- Run `npm install` first
- Check for TypeScript errors
- Verify all files are present

### Preview doesn't load
- Ensure file is set to public in Google Drive
- Verify file ID is correct
- Check browser console for errors
- Try opening the Google Drive URL directly

### Port 3000 already in use
```bash
# Use a different port
npm run dev -- -p 3001
```

## Architecture Explanation

### Why Next.js App Router?
- Modern, file-based routing
- Built-in error boundaries
- Server and client components
- Optimized production builds
- Zero configuration

### Why Client-Side Only?
- No backend required
- Simpler deployment
- Direct iframe to Google Drive
- No API rate limits
- Reduced complexity

### Why Tailwind CSS?
- Utility-first styling
- Consistent design system
- Small production bundle
- Fast development
- Responsive by default

### Design Philosophy

**Minimal:** Only essential features, no bloat  
**Predictable:** Clear error messages, consistent behavior  
**Safe:** No data collection, read-only access  
**Shareable:** Simple URLs that work everywhere  
**Robust:** Comprehensive error handling at every level

## Browser Requirements

- **Chrome/Edge:** Latest version
- **Firefox:** Latest version
- **Safari:** Latest version
- **Mobile:** iOS Safari, Chrome Mobile

JavaScript must be enabled.

## Security Considerations

### Trust Model
- Application trusts Google Drive for rendering
- No user data is collected or stored
- All rendering happens client-side
- Iframe is sandboxed appropriately

### Public Files Only
- This application is designed for public documents
- Private files will fail to load (by design)
- No authentication mechanism provided

### CORS and CSP
Google Drive handles all CORS policies. The iframe approach bypasses typical CORS issues.

## Performance

### Build Optimization
- Static page generation where possible
- Minimal JavaScript bundle (~97 kB First Load JS)
- CSS bundled and purged by Tailwind
- No external dependencies beyond Next.js core

### Loading Strategy
- Eager iframe loading
- Loading spinner for better UX
- Error handling for failed loads

## Contributing

This is a focused, minimal application. Contributions should:
- Maintain simplicity
- Improve error handling
- Enhance accessibility
- Fix bugs
- Improve documentation

**Do not add:**
- Authentication systems
- File upload capabilities
- Backend APIs
- Complex state management
- Unnecessary dependencies

## Support

### Documentation
- [README.md](./README.md) - Overview and quick start
- [DEPLOYMENT.md](./DEPLOYMENT.md) - Deployment instructions
- [SETUP.md](./SETUP.md) - This file (detailed setup)

### Common Issues
See the Troubleshooting section above and DEPLOYMENT.md.

## License

MIT License - See project root for details.

---

**Built with production discipline:**
✓ TypeScript strict mode  
✓ Comprehensive error boundaries  
✓ Defensive programming  
✓ Clear documentation  
✓ Zero configuration  
✓ Ready to deploy

