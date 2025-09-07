# PHPMailer Setup Instructions

## Option 1: Download PHPMailer manually
1. Go to https://github.com/PHPMailer/PHPMailer/releases
2. Download the latest release
3. Extract and upload the 'src' folder to your server as 'PHPMailer'

## Option 2: Use Composer (if available on Spaceship)
```bash
composer require phpmailer/phpmailer
```

## File Structure on Server:
```
public_html/
├── contact-smtp.php
├── PHPMailer/
│   ├── src/
│   │   ├── PHPMailer.php
│   │   ├── SMTP.php
│   │   └── Exception.php
└── (other files...)
```

## Update contact-smtp.php
Replace 'YOUR_APP_PASSWORD_HERE' with your actual Gmail app password.

## Test the new script
Update your React app to call '/contact-smtp.php' instead of '/contact-test.php'
