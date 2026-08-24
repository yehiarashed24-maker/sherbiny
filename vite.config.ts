import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [
    react(),
    {
      name: 'local-api-endpoints',
      configureServer(server) {
        server.middlewares.use(async (req, res, next) => {
          if (req.url === '/api/chat' && req.method === 'POST') {
            let body = '';
            req.on('data', chunk => { body += chunk; });
            req.on('end', async () => {
              try {
                const parsed = JSON.parse(body || '{}');
                const handler = (await import('./api/chat.ts')).default;
                const webReq = new Request('http://localhost:5173/api/chat', {
                  method: 'POST',
                  headers: { 'Content-Type': 'application/json' },
                  body: JSON.stringify(parsed)
                });
                const webRes = await handler(webReq);
                const resData = await webRes.text();
                res.setHeader('Content-Type', 'application/json');
                res.writeHead(webRes.status);
                res.end(resData);
              } catch (e: any) {
                res.writeHead(500);
                res.end(JSON.stringify({ error: e.message }));
              }
            });
            return;
          }

          if (req.url === '/api/contact' && req.method === 'POST') {
            let body = '';
            req.on('data', chunk => { body += chunk; });
            req.on('end', async () => {
              try {
                const parsed = JSON.parse(body || '{}');
                const handler = (await import('./api/contact.ts')).default;
                const webReq = new Request('http://localhost:5173/api/contact', {
                  method: 'POST',
                  headers: { 'Content-Type': 'application/json' },
                  body: JSON.stringify(parsed)
                });
                const webRes = await handler(webReq);
                const resData = await webRes.text();
                res.setHeader('Content-Type', 'application/json');
                res.writeHead(webRes.status);
                res.end(resData);
              } catch (e: any) {
                res.writeHead(500);
                res.end(JSON.stringify({ error: e.message }));
              }
            });
            return;
          }

          next();
        });
      }
    }
  ],
  build: {
    sourcemap: false, // Prevents any source code or sourcemaps from leaking in browser DevTools
    minify: true
  }
});
