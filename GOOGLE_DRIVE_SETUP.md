# How to Make Your Google Drive File Public for salliview

## Quick Steps

1. **Open your PDF in Google Drive**
   - Go to [drive.google.com](https://drive.google.com)
   - Find your PDF file

2. **Click the Share button**
   - Right-click the file → "Share"
   - OR click the file and click "Share" in the top right

3. **Change sharing settings**
   - Click "Change to anyone with the link"
   - Set permissions to **"Viewer"**
   - Click "Done"

4. **Get the File ID**
   - Click "Copy link" 
   - The link looks like: `https://drive.google.com/file/d/1abc123xyz456/view`
   - The File ID is the middle part: `1abc123xyz456`

5. **Use in salliview**
   - Navigate to: `http://localhost:3000/preview/1abc123xyz456`
   - Replace `1abc123xyz456` with your actual File ID

## Example

### Google Drive Link:
```
https://drive.google.com/file/d/1a2b3c4d5e6f7g8h9i0j/view?usp=sharing
```

### File ID:
```
1a2b3c4d5e6f7g8h9i0j
```

### salliview URL:
```
http://localhost:3000/preview/1a2b3c4d5e6f7g8h9i0j
```

## Troubleshooting

### ❌ "Unable to Load Document" Error

**Problem:** File won't display in salliview

**Solutions:**

1. **Check file is public**
   - Go back to Google Drive
   - Right-click file → Share
   - Make sure it says "Anyone with the link"
   - Permission should be "Viewer"

2. **Verify the File ID**
   - Copy the link again from Google Drive
   - Make sure you copied the complete ID
   - File IDs are usually 30-40 characters long
   - Contains letters, numbers, and sometimes hyphens/underscores

3. **Check file format**
   - salliview works best with PDF files
   - Other formats may not display correctly

4. **Test in Google Drive first**
   - Open the share link in an incognito/private browser window
   - If it doesn't open there, it won't work in salliview

5. **Wait a moment**
   - Sometimes Google Drive takes a few seconds to update permissions
   - Try refreshing after 10-15 seconds

## Privacy Note

⚠️ **Important:** When you set a file to "Anyone with the link", anyone who has the link can view the document. Don't share sensitive information this way unless you're comfortable with public access.

## Alternative: Restricted Access

If you need restricted access:
- Keep file private in Google Drive
- Share only with specific email addresses
- Note: salliview won't work with private files (it's designed for public document viewing)

## Support

If you're still having issues:
1. Verify the file opens in Google Drive's web viewer
2. Check browser console for errors (F12 → Console tab)
3. Try with a different PDF file to isolate the issue

