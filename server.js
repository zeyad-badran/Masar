const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = process.env.PORT || 3000;
const ROOT = __dirname;

const MIME_TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'application/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.gif': 'image/gif',
  '.svg': 'image/svg+xml',
  '.webp': 'image/webp',
  '.ico': 'image/x-icon',
  '.woff': 'font/woff',
  '.woff2': 'font/woff2',
  '.ttf': 'font/ttf',
  '.otf': 'font/otf'
};

const server = http.createServer((req, res) => {

  let parsedUrl;
  try {
    parsedUrl = new URL(req.url, `http://${req.headers.host || 'localhost'}`);
  } catch (e) {
    res.writeHead(400, { 'Content-Type': 'text/plain; charset=utf-8' });
    return res.end('Bad Request');
  }

  let pathname = decodeURIComponent(parsedUrl.pathname);

  if (req.method === 'POST' && pathname === '/api/chat') {
    let body = '';
    req.on('data', chunk => body += chunk);
    req.on('end', async () => {
      try {
        const { prompt, userName, points, lang } = JSON.parse(body || '{}');
        const apiKey = process.env.GEMINI_API_KEY || '';

        if (apiKey) {
          const https = require('https');
          const isEn = lang === 'en';
          const systemPrompt = isEn
            ? `You are "Rashid", the friendly AI travel companion and explorer of Jordan in the "Masar" app. User: ${userName || 'Traveler'}. Points balance: ${points || '640'} points. Answer any tourism, cultural, or travel question in warm, concise, and helpful English with Jordanian hospitality.`
            : `أنت "راشد" رفيق المسار ومستكشف الأردن في تطبيق "مسار" (Masar). المستخدم: ${userName || 'كمال'}. رصيد نقاطه: ${points || '640'} نقطة. أجب عن أي سؤال بلهجة أردنية ودودة ومختصرة ومفيدة.`;

          const payload = JSON.stringify({
            contents: [{ parts: [{ text: `${systemPrompt}\n\nالسؤال: ${prompt}` }] }]
          });

          const geminiReq = https.request(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', 'Content-Length': Buffer.byteLength(payload) }
          }, (geminiRes) => {
            let resBody = '';
            geminiRes.on('data', c => resBody += c);
            geminiRes.on('end', () => {
              try {
                const json = JSON.parse(resBody);
                const reply = json?.candidates?.[0]?.content?.parts?.[0]?.text;
                if (reply) {
                  res.writeHead(200, { 'Content-Type': 'application/json; charset=utf-8' });
                  return res.end(JSON.stringify({ success: true, reply: reply.trim(), text: reply.trim() }));
                }
              } catch (err) {}
              res.writeHead(200, { 'Content-Type': 'application/json; charset=utf-8' });
              res.end(JSON.stringify({ success: false }));
            });
          });

          geminiReq.on('error', () => {
            res.writeHead(200, { 'Content-Type': 'application/json; charset=utf-8' });
            res.end(JSON.stringify({ success: false }));
          });
          geminiReq.write(payload);
          return geminiReq.end();
        }

        res.writeHead(200, { 'Content-Type': 'application/json; charset=utf-8' });
        res.end(JSON.stringify({ success: false, reason: 'no_api_key' }));
      } catch (err) {
        res.writeHead(500, { 'Content-Type': 'application/json; charset=utf-8' });
        res.end(JSON.stringify({ error: err.message }));
      }
    });
    return;
  }

  if (pathname === '/' || pathname === '') {
    pathname = '/index.html';
  }

  const safePath = path.normalize(path.join(ROOT, pathname));
  if (!safePath.startsWith(ROOT)) {
    res.writeHead(403, { 'Content-Type': 'text/plain; charset=utf-8' });
    return res.end('Forbidden');
  }

  fs.stat(safePath, (err, stats) => {
    if (err) {
      res.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' });
      return res.end('404 Not Found');
    }

    let filePath = safePath;
    if (stats.isDirectory()) {
      filePath = path.join(safePath, 'index.html');
    }

    const ext = path.extname(filePath).toLowerCase();
    const contentType = MIME_TYPES[ext] || 'application/octet-stream';

    fs.readFile(filePath, (readErr, content) => {
      if (readErr) {
        res.writeHead(500, { 'Content-Type': 'text/plain; charset=utf-8' });
        return res.end('500 Internal Server Error');
      }

      res.writeHead(200, {
        'Content-Type': contentType,
        'Cache-Control': 'no-cache, no-store, must-revalidate'
      });
      res.end(content);
    });
  });
});

server.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});

server.on('error', (err) => {
  if (err.code === 'EADDRINUSE') {
    const fallbackPort = Number(PORT) + 1;
    console.log(`Port ${PORT} in use, trying ${fallbackPort}...`);
    server.listen(fallbackPort, () => {
      console.log(`Server is running at http://localhost:${fallbackPort}`);
    });
  } else {
    console.error('Server error:', err);
  }
});
