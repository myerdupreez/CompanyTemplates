# Spacemail Setup Guide

## Step 1: Create Spacemail Mailbox
1. Open Spacemail Manager in your Spaceship control panel
2. Select gotravelcapetown.com
3. Click "+ Create Mailbox"
4. Create: info@gotravelcapetown.com
5. **SAVE THE GENERATED PASSWORD** - you'll need this for the PHP script

## Step 2: Download PHPMailer
1. Go to: https://github.com/PHPMailer/PHPMailer/releases
2. Download the latest release (zip file)
3. Extract the 'src' folder
4. Rename it to 'PHPMailer'
5. Upload to your public_html directory

## Step 3: Update contact-spacemail.php
Replace `YOUR_SPACEMAIL_PASSWORD` with the actual password from Step 1

## Step 4: Upload Files
Upload these to your public_html:
- contact-spacemail.php
- PHPMailer/ folder (with src files inside)

## Step 5: Update Website
1. Build new version with updated contact script
2. Upload new index.html and JS files

## File Structure Should Look Like:
```
public_html/
├── index.html
├── contact-spacemail.php
├── PHPMailer/
│   ├── src/
│   │   ├── PHPMailer.php
│   │   ├── SMTP.php
│   │   └── Exception.php
├── assets/
└── images/
```

## Test
After setup, test the contact form - emails should arrive at info@gotravelcapetown.com
