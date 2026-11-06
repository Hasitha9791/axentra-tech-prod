const http = require('http');
const fs = require('fs');
const path = require('path');
const zlib = require('zlib');
const { execSync } = require('child_process');

const ROOT = __dirname;
const LOG_FILE = path.join(ROOT, 'sync.log');
const brainDir = 'C:\\Users\\DELL 7420\\.gemini\\antigravity\\brain\\06069ad5-2116-43d0-b386-66565edc85df';

function logSync(msg) {
  const line = `[${new Date().toISOString()}] ${msg}\n`;
  console.log(msg);
  try {
    fs.appendFileSync(LOG_FILE, line, 'utf8');
  } catch (e) {}
}

// ============================================================
// 1. RUN HERO BANNER FIX, HALLOWEEN ASSETS & TEAM PROFILE CLEANUP
// ============================================================
try {
  require('./fix-hero.js');
  require('./remove-didula.js');
  require('./copy-halloween-assets.js');
} catch (err) {
  logSync("Notice running cleanup scripts: " + err.message);
}

// ============================================================
// 2. HTTP HIGH-PERFORMANCE STATIC FILE SERVER (GZIP & ETAG CACHING)
// ============================================================
let PORT = parseInt(process.env.PORT, 10) || 8080;

const MIME_TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.webp': 'image/webp',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon',
  '.webmanifest': 'application/manifest+json',
  '.xml': 'application/xml',
  '.txt': 'text/plain; charset=utf-8',
  '.woff': 'font/woff',
  '.woff2': 'font/woff2',
  '.ttf': 'font/ttf',
  '.eot': 'application/vnd.ms-fontobject'
};

const COMPRESSIBLE = new Set([
  'text/html; charset=utf-8',
  'text/css; charset=utf-8',
  'text/javascript; charset=utf-8',
  'application/json; charset=utf-8',
  'image/svg+xml',
  'application/manifest+json',
  'application/xml',
  'text/plain; charset=utf-8'
]);

const server = http.createServer((req, res) => {
  let reqPath = decodeURI(req.url.split('?')[0]);
  if (reqPath === '/' || reqPath === '') {
    reqPath = '/index.html';
  }

  const safePath = path.normalize(reqPath).replace(/^(\.\.[\/\\])+/, '');
  let filePath = path.join(ROOT, safePath);

  // Fallback for newly generated assets in brain dir
  if (!fs.existsSync(filePath) && safePath.startsWith('assets' + path.sep)) {
    const baseName = path.basename(safePath, path.extname(safePath));
    if (fs.existsSync(brainDir)) {
      try {
        const brainFiles = fs.readdirSync(brainDir);
        const match = brainFiles.find(f => f.startsWith(baseName) || (baseName === 'halloween_template_showcase' && f.includes('template_showcase')));
        if (match) {
          const brainPath = path.join(brainDir, match);
          try {
            fs.copyFileSync(brainPath, filePath);
          } catch(e) {}
          filePath = brainPath;
        }
      } catch (e) {}
    }
  }

  fs.stat(filePath, (err, stats) => {
    if (err) {
      res.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' });
      res.end('404 Not Found');
      return;
    }

    if (stats.isDirectory()) {
      filePath = path.join(filePath, 'index.html');
    }

    const ext = path.extname(filePath).toLowerCase();
    const contentType = MIME_TYPES[ext] || 'application/octet-stream';

    // Fast ETag Generation (mtime + size)
    const etag = `W/"${stats.size.toString(16)}-${Math.floor(stats.mtimeMs).toString(16)}"`;
    if (req.headers['if-none-match'] === etag) {
      res.writeHead(304, {
        'ETag': etag,
        'Cache-Control': ext === '.html' ? 'no-cache' : 'public, max-age=604800, stale-while-revalidate=86400'
      });
      res.end();
      return;
    }

    fs.readFile(filePath, (readErr, content) => {
      if (readErr) {
        res.writeHead(500, { 'Content-Type': 'text/plain; charset=utf-8' });
        res.end('500 Internal Server Error');
        return;
      }

      // Cache Control determination
      let cacheControl;
      if (ext === '.html') {
        cacheControl = 'no-cache, must-revalidate';
      } else if (['.jpg', '.jpeg', '.png', '.webp', '.svg', '.ico', '.woff', '.woff2', '.ttf'].includes(ext)) {
        cacheControl = 'public, max-age=604800, immutable';
      } else {
        cacheControl = 'public, max-age=86400, stale-while-revalidate=604800';
      }

      const headers = {
        'Content-Type': contentType,
        'Access-Control-Allow-Origin': '*',
        'Cache-Control': cacheControl,
        'ETag': etag,
        'Vary': 'Accept-Encoding'
      };

      // Gzip Compression for Compressible Types
      const acceptEncoding = req.headers['accept-encoding'] || '';
      if (COMPRESSIBLE.has(contentType) && acceptEncoding.includes('gzip')) {
        try {
          const compressed = zlib.gzipSync(content, { level: 6 });
          headers['Content-Encoding'] = 'gzip';
          headers['Content-Length'] = compressed.length;
          res.writeHead(200, headers);
          res.end(compressed);
          return;
        } catch (compErr) {
          // Fallback to uncompressed
        }
      }

      headers['Content-Length'] = content.length;
      res.writeHead(200, headers);
      res.end(content);
    });
  });
});

function startServer(portToTry) {
  server.listen(portToTry, '0.0.0.0', () => {
    logSync(`\n=============================================================`);
    logSync(` Axentra Local Server is ACTIVE with Halloween Festive Theme!`);
    logSync(` Local URL : http://localhost:${portToTry}/`);
    logSync(` IPv4 URL  : http://127.0.0.1:${portToTry}/`);
    logSync(`=============================================================\n`);
    logSync(`(Keep this window open while browsing your website.)\n`);
  });

  server.on('error', (err) => {
    if (err.code === 'EADDRINUSE') {
      logSync(`Port ${portToTry} in use, trying port ${portToTry + 1}...`);
      startServer(portToTry + 1);
    } else {
      logSync(`Server error: ${err.message}`);
    }
  });
}

startServer(PORT);
