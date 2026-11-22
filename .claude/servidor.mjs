// Servidor estático local do portfólio (fora do deploy). Uso: node portfolio/.claude/servidor.mjs [porta]
import http from 'node:http';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const raiz = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const porta = Number(process.argv[2] || 5520);
const tipos = {
  '.html': 'text/html; charset=utf-8', '.css': 'text/css; charset=utf-8', '.js': 'text/javascript; charset=utf-8',
  '.mjs': 'text/javascript; charset=utf-8', '.json': 'application/json; charset=utf-8', '.svg': 'image/svg+xml',
  '.png': 'image/png', '.apng': 'image/apng', '.jpg': 'image/jpeg', '.jpeg': 'image/jpeg', '.webp': 'image/webp',
  '.avif': 'image/avif', '.ico': 'image/x-icon', '.mp4': 'video/mp4', '.webm': 'video/webm',
  '.otf': 'font/otf', '.ttf': 'font/ttf', '.woff': 'font/woff', '.woff2': 'font/woff2', '.txt': 'text/plain; charset=utf-8'
};

// Imita o Vercel: aplica os cabeçalhos de segurança do vercel.json (CSP etc.).
// Em http://localhost tira só o que exige https (upgrade-insecure-requests e HSTS).
let cabecalhos = {};
try {
  const cfg = JSON.parse(fs.readFileSync(path.join(raiz, 'vercel.json'), 'utf8'));
  for (const h of cfg.headers?.find((b) => b.source === '/(.*)')?.headers || []) {
    if (h.key === 'Strict-Transport-Security') continue;
    cabecalhos[h.key] = h.key === 'Content-Security-Policy' ? h.value.replace(/;\s*upgrade-insecure-requests/, '') : h.value;
  }
} catch { cabecalhos = {}; }

http.createServer((req, res) => {
  for (const [k, v] of Object.entries(cabecalhos)) res.setHeader(k, v);
  let rel = decodeURIComponent(new URL(req.url, 'http://x').pathname);
  let arq = path.join(raiz, rel);
  if (!arq.startsWith(raiz)) { res.writeHead(403); return res.end(); }
  if (fs.existsSync(arq) && fs.statSync(arq).isDirectory()) arq = path.join(arq, 'index.html');
  if (!fs.existsSync(arq)) { res.writeHead(404, { 'content-type': tipos['.html'] }); return fs.createReadStream(path.join(raiz, '404.html')).pipe(res); }
  const tam = fs.statSync(arq).size;
  const tipo = tipos[path.extname(arq).toLowerCase()] || 'application/octet-stream';
  const faixa = req.headers.range && /bytes=(\d*)-(\d*)/.exec(req.headers.range);
  if (faixa) {
    const ini = faixa[1] ? Number(faixa[1]) : 0;
    const fim = faixa[2] ? Number(faixa[2]) : tam - 1;
    res.writeHead(206, { 'content-type': tipo, 'content-range': `bytes ${ini}-${fim}/${tam}`, 'accept-ranges': 'bytes', 'content-length': fim - ini + 1, 'cache-control': 'no-store' });
    return fs.createReadStream(arq, { start: ini, end: fim }).pipe(res);
  }
  res.writeHead(200, { 'content-type': tipo, 'content-length': tam, 'accept-ranges': 'bytes', 'cache-control': 'no-store' });
  fs.createReadStream(arq).pipe(res);
}).listen(porta, () => console.log(`portfolio em http://localhost:${porta}/`));
