# GoTravel Cape Town - Deployment Guide

## Files to Upload to Spaceship Hosting

### 1. Root Directory Files
Upload these files to your domain's root directory:

**From `dist/` folder:**
- `index.html` (Main website file)

**From project root:**
- `contact-final.php` (Email handler - uses built-in PHP mail)

### 2. Assets Folder
Create an `assets/` folder and upload these files from `dist/assets/`:
- `index-aa265dfa.js` (Main JavaScript bundle)
- `index-e3b716d7.css` (Main CSS bundle)

### 3. Images Folder
Create an `images/` folder and upload all files from `public/images/`:
- All .avif, .webp, .jpg, .png, .svg files (your tour images, logos, etc.)

## Final Structure on Server
```
your-domain.com/
├── index.html
├── contact-final.php
├── assets/
│   ├── index-aa265dfa.js
│   └── index-e3b716d7.css
└── images/
    ├── logo.svg
    ├── capetown_background.webp
    ├── safari_tours.avif
    └── [all other image files]
```

## Email Configuration
✅ **Already configured for Spacemail:**
- Email: info@gotravelcapetown.com
- Password: Testing%$32
- Uses PHP's built-in mail() function (no external libraries needed)

## Testing After Upload
1. Visit your website URL
2. Test the contact form
3. Check your Spacemail inbox: info@gotravelcapetown.com

## Notes
- No PHPMailer files needed (contact-final.php uses built-in PHP)
- All images optimized for web
- Contact form sends to your Spacemail address
- Website is fully responsive and optimized
