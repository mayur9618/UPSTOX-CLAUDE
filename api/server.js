// Simple local development server for testing
// Run: node api/server.js

const http = require('http');
const fs = require('fs');
const path = require('path');
const url = require('url');

require('dotenv').config();

const PORT = process.env.PORT || 3000;

// Import API handlers
const authHandler = require('./auth');
const portfolioHandler = require('./portfolio');
const analyzeHandler = require('./analyze');
const placeOrderHandler = require('./place-order');

const server = http.createServer(async (req, res) => {
  const parsedUrl = url.parse(req.url, true);
  const pathname = parsedUrl.pathname;

  // CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  if (req.method === 'OPTIONS') {
    res.writeHead(200);
    res.end();
    return;
  }

  // API Routes
  if (pathname.startsWith('/api/')) {
    if (pathname === '/api/auth') {
      return authHandler(req, res);
    }
    if (pathname === '/api/portfolio') {
      return portfolioHandler(req, res);
    }
    if (pathname === '/api/analyze') {
      return analyzeHandler(req, res);
    }
    if (pathname === '/api/place-order') {
      return placeOrderHandler(req, res);
    }
    
    res.writeHead(404, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ error: 'API endpoint not found' }));
    return;
  }

  // Serve static files
  let filePath = path.join(__dirname, '..', 'public', pathname === '/' ? 'index.html' : pathname);
  
  const extname = path.extname(filePath);
  const contentType = {
    '.html': 'text/html',
    '.css': 'text/css',
    '.js': 'text/javascript',
    '.json': 'application/json',
    '.png': 'image/png',
    '.jpg': 'image/jpeg',
    '.svg': 'image/svg+xml'
  }[extname] || 'text/plain';

  fs.readFile(filePath, (err, content) => {
    if (err) {
      if (err.code === 'ENOENT') {
        res.writeHead(404, { 'Content-Type': 'text/html' });
        res.end('<h1>404 - File Not Found</h1>');
      } else {
        res.writeHead(500);
        res.end(`Server Error: ${err.code}`);
      }
    } else {
      res.writeHead(200, { 'Content-Type': contentType });
      res.end(content, 'utf-8');
    }
  });
});

server.listen(PORT, () => {
  console.log('🚀 Upstox Trading Assistant - Development Server');
  console.log('==============================================');
  console.log(`✅ Server running at http://localhost:${PORT}`);
  console.log('');
  console.log('📋 Environment Variables Status:');
  console.log(`   UPSTOX_API_KEY: ${process.env.UPSTOX_API_KEY ? '✅ Set' : '❌ Missing'}`);
  console.log(`   UPSTOX_API_SECRET: ${process.env.UPSTOX_API_SECRET ? '✅ Set' : '❌ Missing'}`);
  console.log(`   UPSTOX_REDIRECT_URI: ${process.env.UPSTOX_REDIRECT_URI ? '✅ Set' : '❌ Missing'}`);
  console.log(`   ANTHROPIC_API_KEY: ${process.env.ANTHROPIC_API_KEY ? '✅ Set' : '❌ Missing'}`);
  console.log('');
  console.log('⚠️  Note: This is for local testing only. Use Vercel for production.');
  console.log('');
});
