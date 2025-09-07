const http = require('http');
const fs = require('fs');
const path = require('path');
const url = require('url');

// Simple email simulation (for testing)
function simulateEmail(data) {
  console.log('\n📧 EMAIL WOULD BE SENT:');
  console.log('=======================');
  console.log(`To: dupreezmyer@gmail.com`);
  console.log(`From: info@gotravelcapetown.com`);
  console.log(`Subject: New Contact Form Submission from ${data.name}`);
  console.log(`\nMessage:`);
  console.log(`Name: ${data.name}`);
  console.log(`Email: ${data.email}`);
  console.log(`Message: ${data.message}`);
  console.log('=======================\n');
  
  return true; // Simulate successful send
}

const server = http.createServer((req, res) => {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  res.setHeader('Content-Type', 'application/json');

  // Handle preflight OPTIONS request
  if (req.method === 'OPTIONS') {
    res.writeHead(200);
    res.end();
    return;
  }

  // Only handle POST to /contact.php
  if (req.method === 'POST' && req.url === '/contact.php') {
    let body = '';
    
    req.on('data', chunk => {
      body += chunk.toString();
    });
    
    req.on('end', () => {
      try {
        const data = JSON.parse(body);
        
        // Validate input
        if (!data.name || !data.email || !data.message) {
          res.writeHead(400);
          res.end(JSON.stringify({ error: 'Missing required fields' }));
          return;
        }
        
        // Validate email
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(data.email)) {
          res.writeHead(400);
          res.end(JSON.stringify({ error: 'Invalid email address' }));
          return;
        }
        
        // Simulate sending email
        const emailSent = simulateEmail(data);
        
        if (emailSent) {
          res.writeHead(200);
          res.end(JSON.stringify({ success: true }));
        } else {
          res.writeHead(500);
          res.end(JSON.stringify({ error: 'Failed to send email' }));
        }
        
      } catch (error) {
        res.writeHead(400);
        res.end(JSON.stringify({ error: 'Invalid JSON' }));
      }
    });
    
  } else {
    // Serve static files from dist folder
    const parsedUrl = url.parse(req.url);
    let pathname = parsedUrl.pathname;
    
    if (pathname === '/') {
      pathname = '/index.html';
    }
    
    const filePath = path.join(__dirname, 'dist', pathname);
    
    fs.readFile(filePath, (err, data) => {
      if (err) {
        res.writeHead(404);
        res.end('Not Found');
        return;
      }
      
      // Set correct content type
      const ext = path.extname(filePath);
      const contentTypes = {
        '.html': 'text/html',
        '.js': 'application/javascript',
        '.css': 'text/css',
        '.png': 'image/png',
        '.jpg': 'image/jpeg',
        '.jpeg': 'image/jpeg',
        '.gif': 'image/gif',
        '.svg': 'image/svg+xml',
        '.avif': 'image/avif',
        '.webp': 'image/webp'
      };
      
      const contentType = contentTypes[ext] || 'application/octet-stream';
      res.setHeader('Content-Type', contentType);
      
      res.writeHead(200);
      res.end(data);
    });
  }
});

const PORT = 3000;
server.listen(PORT, () => {
  console.log(`🚀 Test server running at http://localhost:${PORT}`);
  console.log(`📧 Email simulation enabled - check console for email logs`);
  console.log(`📁 Serving files from dist folder`);
});
