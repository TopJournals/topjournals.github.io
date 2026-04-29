## Sharing This Website

Two release packages are prepared for sharing:

1. `release/MetaWeb-site.zip`
   - Full static website build.
   - Open `index.html` after unzipping, or deploy the contents to any static host.

2. `release/ThinHomogenization-page.zip`
   - Standalone paper companion page.
   - Keep `ThinHomogenization.html` and `ThinHomogenization_files/` in the same folder after unzipping.

## Important

- Sending a single `.html` file usually does **not** include images unless the images are embedded as base64.
- This project currently uses normal relative image files, which is better for maintenance.
- So when sharing by email, WeChat, or cloud drive, send the `.zip` package rather than only the `.html` file.

## Deployment

The full website is already built in `dist/`.
You can deploy the contents of `dist/` to GitHub Pages, Netlify, Vercel static output, or any ordinary web server.
