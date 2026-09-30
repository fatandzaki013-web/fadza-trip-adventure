// Simple zero-dependency HTTP server for FADZA TRIP ADVENTURE
import http from 'http';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PORT = process.env.PORT || 3000;
const DIST_DIR = path.join(__dirname, 'dist');

const PUBLIC_DIR = path.join(__dirname, 'public');

const MIME_TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.json': 'application/json',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.webp': 'image/webp',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon',
  '.mp4': 'video/mp4',
  '.webm': 'video/webm',
  '.mp3': 'audio/mpeg'
};

const server = http.createServer((req, res) => {
  let reqPath = req.url.split('?')[0];

  // Secure Backend API Route: POST /api/chat
  if (req.method === 'POST' && reqPath === '/api/chat') {
    let body = '';
    req.on('data', chunk => { body += chunk; });
    req.on('end', async () => {
      try {
        const payload = JSON.parse(body || '{}');
        const { generateTravelResponse } = await import('./src/services/aiService.js');
        const aiResponse = await generateTravelResponse({
          message: payload.message,
          history: payload.history || [],
          currentPackage: payload.currentPackage || null
        });
        res.writeHead(200, {
          'Content-Type': 'application/json',
          'Cache-Control': 'no-cache'
        });
        res.end(JSON.stringify({ success: true, data: aiResponse }));
      } catch (err) {
        console.error('Chat API Error:', err);
        res.writeHead(500, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ success: false, error: 'Internal Server Error' }));
      }
    });
    return;
  }

  // Normalize path if /fadza-trip-adventure prefix is present
  if (reqPath.startsWith('/fadza-trip-adventure/')) {
    reqPath = reqPath.slice('/fadza-trip-adventure'.length);
  } else if (reqPath === '/fadza-trip-adventure') {
    reqPath = '/';
  }

  if (reqPath === '/') reqPath = '/index.html';

  let filePath = path.join(DIST_DIR, reqPath);
  if (!fs.existsSync(filePath) && fs.existsSync(path.join(PUBLIC_DIR, reqPath))) {
    filePath = path.join(PUBLIC_DIR, reqPath);
  }

  // Security check: must reside inside DIST_DIR or PUBLIC_DIR
  if (!filePath.startsWith(DIST_DIR) && !filePath.startsWith(PUBLIC_DIR)) {
    res.writeHead(403);
    res.end('Forbidden');
    return;
  }

  fs.stat(filePath, (err, stats) => {
    if (err || !stats.isFile()) {
      // Don't fallback to HTML for asset files (js, css, images) - return 404
      const fileExt = path.extname(reqPath).toLowerCase();
      if (['.js', '.css', '.png', '.jpg', '.jpeg', '.webp', '.svg', '.json', '.mp4'].includes(fileExt)) {
        res.writeHead(404, { 'Content-Type': 'text/plain' });
        res.end('Asset Not Found');
        return;
      }
      // SPA Fallback: serve index.html
      filePath = path.join(DIST_DIR, 'index.html');
    }

    const ext = path.extname(filePath).toLowerCase();
    const contentType = MIME_TYPES[ext] || 'application/octet-stream';

    // Handle Video / Audio Streaming with HTTP 206 Partial Content (Range requests)
    if (ext === '.mp4' || ext === '.webm' || ext === '.mp3') {
      const range = req.headers.range;
      const fileSize = stats ? stats.size : fs.statSync(filePath).size;

      if (range) {
        const parts = range.replace(/bytes=/, "").split("-");
        const start = parseInt(parts[0], 10);
        const end = parts[1] ? parseInt(parts[1], 10) : fileSize - 1;
        const chunksize = (end - start) + 1;
        const fileStream = fs.createReadStream(filePath, { start, end });
        const head = {
          'Content-Range': `bytes ${start}-${end}/${fileSize}`,
          'Accept-Ranges': 'bytes',
          'Content-Length': chunksize,
          'Content-Type': contentType,
          'Cache-Control': 'public, max-age=31536000, immutable'
        };
        res.writeHead(206, head);
        fileStream.pipe(res);
        return;
      } else {
        const head = {
          'Content-Length': fileSize,
          'Content-Type': contentType,
          'Accept-Ranges': 'bytes',
          'Cache-Control': 'public, max-age=31536000, immutable'
        };
        res.writeHead(200, head);
        fs.createReadStream(filePath).pipe(res);
        return;
      }
    }

    fs.readFile(filePath, (readErr, content) => {
      if (readErr) {
        res.writeHead(500);
        res.end('Error reading file');
        return;
      }
      res.writeHead(200, {
        'Content-Type': contentType,
        'Cache-Control': ext === '.html' ? 'no-cache' : 'public, max-age=31536000, immutable'
      });
      res.end(content);
    });
  });
});

server.listen(PORT, '0.0.0.0', () => {
  console.log(`FADZA TRIP ADVENTURE production server running at http://localhost:${PORT}`);
});
