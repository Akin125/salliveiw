# Deployment Guide

## Overview
This Next.js application provides a read-only preview interface for public Google Drive PDFs. No authentication, backend, or API keys are required.

## Prerequisites

### Making a Google Drive File Public
1. Open the file in Google Drive
2. Click **Share** (top right corner)
3. Click **Change to anyone with the link**
4. Set permission to **Viewer**
5. Click **Copy link**
6. Extract the file ID from the URL:
   ```
   https://drive.google.com/file/d/[THIS_IS_THE_FILE_ID]/view
   ```

## Local Development

### Installation
```bash
npm install
```

### Running Locally
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Testing the Preview
Navigate to: `http://localhost:3000/preview/[YOUR_FILE_ID]`

Example: `http://localhost:3000/preview/1BxiMVs0XRA5nFMdKvBdBZjgmUUqptlbs`

## Production Build

### Build for Production
```bash
npm run build
```

### Run Production Server
```bash
npm start
```

## Deployment on Vercel

### Option 1: Deploy via Vercel CLI
```bash
npm install -g vercel
vercel
```

### Option 2: Deploy via Vercel Dashboard
1. Push your code to GitHub
2. Go to [vercel.com](https://vercel.com)
3. Click **Import Project**
4. Select your repository
5. Click **Deploy**

### Configuration
No environment variables or build configuration needed. Vercel auto-detects Next.js projects.

### Custom Domain (Optional)
1. Go to your project settings in Vercel
2. Click **Domains**
3. Add your custom domain
4. Follow DNS configuration instructions

## Deployment on Other Platforms

### Netlify
```bash
npm run build
```
Deploy the `.next` folder or connect your Git repository.

### Docker
```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY . .
RUN npm run build
EXPOSE 3000
CMD ["npm", "start"]
```

Build and run:
```bash
docker build -t drive-preview .
docker run -p 3000:3000 drive-preview
```

## Usage

### URL Structure
```
/preview/[FILE_ID]
```

### Example URLs
- `/preview/1BxiMVs0XRA5nFMdKvBdBZjgmUUqptlbs`
- `/preview/abc123def456`

### Sharing
Share the full URL with users:
```
https://yourdomain.com/preview/[FILE_ID]
```

## Troubleshooting

### "Unable to Load Document" Error
**Causes:**
- File is not set to public
- File ID is incorrect
- File has been deleted or moved
- File format is not supported by Google Drive preview

**Solution:**
1. Verify the file is publicly accessible
2. Check the file ID is correct
3. Ensure the file is a supported format (PDF, Docs, etc.)

### Invalid File ID Error
**Causes:**
- File ID is missing from URL
- File ID contains invalid characters
- URL is malformed

**Solution:**
- Use the correct URL format: `/preview/[FILE_ID]`
- File IDs should be 10-100 characters (letters, numbers, hyphens, underscores)

### Loading Forever
**Causes:**
- Network connectivity issues
- Google Drive service temporarily unavailable
- Browser blocking iframe

**Solution:**
1. Check internet connection
2. Refresh the page
3. Try a different browser
4. Check browser console for errors

## Security Notes

### Sandbox Attributes
The iframe uses the following sandbox attributes:
- `allow-scripts`: Required for Google Drive preview
- `allow-same-origin`: Required for preview functionality
- `allow-popups`: Allows opening in new tab
- `allow-popups-to-escape-sandbox`: Required for navigation

### No Authentication
This app does not require or store:
- User credentials
- OAuth tokens
- API keys
- Cookies
- Local storage

### Trust Model
The app relies on Google Drive's preview service for rendering. Only use with trusted, public documents.

## Architecture

### Tech Stack
- **Framework:** Next.js 14 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **Rendering:** Client-side only

### Error Boundaries
1. **Global Error Boundary** (`app/error.tsx`) - Catches application-level errors
2. **Route Error Boundary** (`app/preview/[id]/error.tsx`) - Catches preview-specific errors
3. **Not Found Pages** - Handles invalid routes and file IDs
4. **Runtime Validation** - Validates file IDs before rendering

### File Structure
```
/app
  /preview
    /[id]
      page.tsx          # Preview component
      error.tsx         # Route error boundary
      not-found.tsx     # Invalid file ID handler
  layout.tsx            # Root layout
  page.tsx              # Home page
  error.tsx             # Global error boundary
  not-found.tsx         # 404 handler
  globals.css           # Global styles
```

## Performance

### Optimization
- Static generation where possible
- Minimal JavaScript bundle
- No external dependencies beyond Next.js
- CSS bundled and optimized by Tailwind

### Loading States
- Spinner shown while iframe loads
- Graceful error handling if load fails
- No flash of unstyled content

## Browser Support
- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## Limitations
- Requires JavaScript enabled
- Depends on Google Drive availability
- Only works with publicly accessible files
- Limited to formats Google Drive can preview
- No offline support

## Support
For issues related to:
- **Document not loading:** Check file permissions in Google Drive
- **Application errors:** Check browser console for details
- **Deployment issues:** Refer to platform-specific documentation

