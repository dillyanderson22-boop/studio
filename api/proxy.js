export default async function handler(req, res) {
res.setHeader('Access-Control-Allow-Origin', '*');
res.setHeader('Cache-Control', 'public, max-age=300');
const url = req.query && req.query.url;
if (!url || !/^https?:\/\//i.test(url)) {
res.status(400).send('Pass a url parameter.');
return;
}
try {
const r = await fetch(url, { headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36', 'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8' } });
const txt = await r.text();
res.setHeader('Content-Type', 'text/plain; charset=utf-8');
res.status(r.status).send(txt);
} catch (e) {
res.status(502).send('proxy error: ' + (e && e.message ? e.message : 'failed'));
}
}
