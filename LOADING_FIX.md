# Loading Issue - Troubleshooting Guide

## Problem: "It just keeps loading"

The loading screen appears but never goes away, showing the spinning animation indefinitely.

## What I Fixed

### 1. Added Automatic Timeout (5 seconds)
The app will now automatically stop loading after 5 seconds, even if the iframe doesn't fire the load event.

### 2. Added Manual Skip Button
A button appears on the loading screen: **"Click here if document is already visible"**

If the PDF is actually loaded but the loading screen won't go away, you can manually dismiss it.

### 3. Better Error Detection
The app now properly detects when the iframe fails to load and shows the error screen with helpful instructions.

## How to Use Now

### Option 1: Wait 5 Seconds
- The loading screen will automatically disappear after 5 seconds
- The PDF should be visible underneath

### Option 2: Click Skip Button
- If you see the loading screen but suspect the PDF is loaded
- Click "Click here if document is already visible"
- The loading overlay will disappear immediately

### Option 3: Check the File
If neither option works, the file may not be properly shared:

1. **Verify the file is PUBLIC**
   ```
   ✅ Right-click file in Google Drive
   ✅ Click "Share"
   ✅ Click "Change to anyone with the link"
   ✅ Set to "Viewer"
   ✅ Click "Done"
   ```

2. **Test the Google Drive link directly**
   - Open: `https://drive.google.com/file/d/[YOUR_FILE_ID]/view`
   - Replace `[YOUR_FILE_ID]` with your actual ID
   - If it doesn't open in Drive, it won't work in salliview

3. **Check File ID is correct**
   - File IDs are usually 30-40 characters
   - Contains letters, numbers, hyphens, underscores
   - No spaces or special characters

## Why This Happens

### Iframe Load Events Are Unreliable
- Google Drive's embed viewer doesn't always fire the `onLoad` event
- This is a known browser limitation with cross-origin iframes
- The PDF may load successfully, but the app doesn't know it

### Solution Implemented
- **Timeout**: Assumes success after 5 seconds
- **Manual skip**: User can dismiss if they see the content
- **Both approaches**: Cover different scenarios

## Testing Steps

1. **Start the dev server**
   ```bash
   npm run dev
   ```

2. **Navigate to preview page**
   ```
   http://localhost:3000/preview/[FILE_ID]
   ```

3. **Wait for one of these:**
   - ✅ Loading automatically stops after 5 seconds
   - ✅ Click skip button if PDF appears earlier
   - ❌ Error screen appears (file not accessible)

4. **If you see the PDF behind the loading screen**
   - This is the iframe event issue
   - Click "Click here if document is already visible"
   - The overlay will disappear

## Alternative: Direct Embed

If issues persist, you can use the direct Google Drive embed URL:

```
https://drive.google.com/file/d/[FILE_ID]/preview
```

Open this in your browser to test if the file is accessible.

## Common Scenarios

### Scenario 1: Loading stops after 5 seconds, PDF visible ✅
**Result**: Success! The timeout worked.
**Action**: Nothing - just use the app normally.

### Scenario 2: Loading stops, but no PDF visible ❌
**Result**: File is not accessible.
**Action**: Check file permissions in Google Drive.

### Scenario 3: Can see PDF behind loading screen 🔄
**Result**: Iframe event didn't fire.
**Action**: Click skip button.

### Scenario 4: Error message appears ❌
**Result**: File definitely can't load.
**Action**: 
1. Check file is public
2. Verify File ID is correct
3. Test direct Google Drive link

## Technical Details

### What Changed in Code

```typescript
// Added timeout
useEffect(() => {
  loadingTimeoutRef.current = setTimeout(() => {
    if (isLoading) {
      setIsLoading(false);
    }
  }, 5000); // Auto-dismiss after 5 seconds
}, [isLoading]);

// Added skip button
<button onClick={() => setIsLoading(false)}>
  Click here if document is already visible
</button>
```

### Why 5 Seconds?
- Google Drive usually loads PDFs in 2-4 seconds
- 5 seconds is long enough for slow connections
- Short enough to not frustrate users
- Can be manually skipped if needed

## Still Having Issues?

1. **Check browser console** (F12 → Console)
   - Look for errors related to iframe
   - CORS errors indicate file isn't public

2. **Try different browser**
   - Chrome/Edge (recommended)
   - Firefox
   - Safari

3. **Test with different PDF**
   - Upload a small test PDF to Google Drive
   - Make it public
   - Try viewing in salliview

4. **Clear browser cache**
   - Hard refresh: `Ctrl + Shift + R` (Windows)
   - Or: `Cmd + Shift + R` (Mac)

## Next Steps

The app should now work reliably with the combination of:
- ✅ 5-second auto-timeout
- ✅ Manual skip button
- ✅ Proper error handling
- ✅ Helpful error messages

Try it now with: `npm run dev`

