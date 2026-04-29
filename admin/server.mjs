import { createServer } from 'node:http';
import { readFile, writeFile } from 'node:fs/promises';
import { createReadStream, existsSync, readFileSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');
const adminDir = __dirname;
const credentialsFile = path.join(adminDir, 'credentials.local.json');

const loadCredentials = () => {
  if (!existsSync(credentialsFile)) {
    throw new Error(
      'Missing admin/credentials.local.json. Copy admin/credentials.example.json and set a local password.'
    );
  }

  const raw = JSON.parse(readFileSync(credentialsFile, 'utf8'));
  if (typeof raw.username !== 'string' || typeof raw.password !== 'string' || !raw.username || !raw.password) {
    throw new Error('Invalid admin credentials file.');
  }

  return raw;
};

const credentials = loadCredentials();

const collections = {
  publications: path.join(rootDir, 'src/data/content/publications.json'),
  news: path.join(rootDir, 'src/data/content/news.json'),
  people: path.join(rootDir, 'src/data/content/people.json'),
  honors: path.join(rootDir, 'src/data/content/honors.json'),
  conference: path.join(rootDir, 'src/data/content/conference.json'),
  patents: path.join(rootDir, 'src/data/content/patents.json'),
  software: path.join(rootDir, 'src/data/content/software.json'),
  standards: path.join(rootDir, 'src/data/content/standards.json'),
  'site-profile': path.join(rootDir, 'src/data/content/site-profile.json')
};

const mimeTypes = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.ico': 'image/x-icon'
};

const parseCookies = (header = '') =>
  header
    .split(';')
    .map((part) => part.trim())
    .filter(Boolean)
    .reduce((acc, part) => {
      const index = part.indexOf('=');
      if (index === -1) return acc;
      const key = part.slice(0, index).trim();
      const value = decodeURIComponent(part.slice(index + 1).trim());
      acc[key] = value;
      return acc;
    }, {});

const unauthorized = (res) => {
  res.writeHead(401, {
    'Content-Type': 'text/plain; charset=utf-8',
    'WWW-Authenticate': 'Basic realm="MetaWeb Admin", charset="UTF-8"'
  });
  res.end('Authentication required.');
};

const isAuthorized = (req) => {
  const cookieToken = parseCookies(req.headers.cookie).metaweb_admin;
  if (cookieToken === `${credentials.username}:${credentials.password}`) {
    return true;
  }

  const auth = req.headers.authorization;
  if (!auth?.startsWith('Basic ')) return false;

  const decoded = Buffer.from(auth.slice(6), 'base64').toString('utf8');
  const separator = decoded.indexOf(':');
  if (separator === -1) return false;

  const username = decoded.slice(0, separator);
  const password = decoded.slice(separator + 1);
  return username === credentials.username && password === credentials.password;
};

const sendJson = (res, statusCode, payload) => {
  res.writeHead(statusCode, {
    'Content-Type': 'application/json; charset=utf-8',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, PUT, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type'
  });
  res.end(JSON.stringify(payload, null, 2));
};

const readBody = (req) =>
  new Promise((resolve, reject) => {
    let raw = '';
    req.on('data', (chunk) => {
      raw += chunk;
    });
    req.on('end', () => resolve(raw));
    req.on('error', reject);
  });

const validateCollectionPayload = (collection, data) => {
  if (!Array.isArray(data)) {
    throw new Error(`${collection} payload must be an array.`);
  }

  if (collection === 'publications') {
    for (const item of data) {
      if (
        typeof item.title !== 'string' ||
        typeof item.authors !== 'string' ||
        typeof item.year !== 'number' ||
        typeof item.venue !== 'string' ||
        !Array.isArray(item.tags)
      ) {
        throw new Error('Each publication must include title, authors, year, venue, and tags.');
      }
    }
  }

  if (collection === 'news') {
    for (const item of data) {
      if (typeof item.date !== 'string' || typeof item.text !== 'string') {
        throw new Error('Each news item must include date and text.');
      }
    }
  }

  if (collection === 'people') {
    for (const item of data) {
      if (typeof item.name !== 'string' || typeof item.role !== 'string' || typeof item.start !== 'string') {
        throw new Error('Each person must include name, role, and start.');
      }
    }
  }

  if (collection === 'honors') {
    for (const item of data) {
      if (typeof item.year !== 'number' || typeof item.title !== 'string' || typeof item.description !== 'string') {
        throw new Error('Each honor must include year, title, and description.');
      }
    }
  }

  if (collection === 'conference') {
    for (const item of data) {
      if (
        typeof item.kind !== 'string' ||
        typeof item.title !== 'string' ||
        typeof item.contributors !== 'string' ||
        typeof item.venue !== 'string' ||
        typeof item.location !== 'string' ||
        typeof item.date !== 'string'
      ) {
        throw new Error('Each conference record must include kind, title, contributors, venue, location, and date.');
      }
    }
  }

  if (collection === 'patents') {
    for (const item of data) {
      if (typeof item.year !== 'number' || typeof item.inventors !== 'string' || typeof item.title !== 'string' || typeof item.type !== 'string') {
        throw new Error('Each patent must include year, inventors, title, and type.');
      }
    }
  }

  if (collection === 'software') {
    for (const item of data) {
      if (typeof item.year !== 'number' || typeof item.holders !== 'string' || typeof item.title !== 'string' || typeof item.authority !== 'string') {
        throw new Error('Each software record must include year, holders, title, and authority.');
      }
    }
  }

  if (collection === 'standards') {
    for (const item of data) {
      if (typeof item.year !== 'number' || typeof item.title !== 'string' || typeof item.authority !== 'string' || typeof item.code !== 'string') {
        throw new Error('Each standard must include year, title, authority, and code.');
      }
    }
  }

  if (collection === 'site-profile') {
    if (data.length !== 1) {
      throw new Error('Site profile must contain exactly one record.');
    }

    const [item] = data;
    if (
      typeof item.name !== 'string' ||
      typeof item.title !== 'string' ||
      typeof item.description !== 'string' ||
      typeof item.url !== 'string' ||
      typeof item.leader !== 'string' ||
      typeof item.leaderChinese !== 'string' ||
      typeof item.affiliation !== 'string' ||
      typeof item.address !== 'string' ||
      typeof item.email !== 'string' ||
      typeof item.scholarUrl !== 'string' ||
      typeof item.researchGateUrl !== 'string' ||
      !Array.isArray(item.biography) ||
      !Array.isArray(item.professionalActivities)
    ) {
      throw new Error('Site profile is missing required fields.');
    }
  }
};

const serveFile = (res, filepath) => {
  const ext = path.extname(filepath).toLowerCase();
  const contentType = mimeTypes[ext] ?? 'application/octet-stream';
  res.writeHead(200, { 'Content-Type': contentType });
  createReadStream(filepath).pipe(res);
};

const server = createServer(async (req, res) => {
  const url = new URL(req.url ?? '/', 'http://127.0.0.1');

  if (!isAuthorized(req)) {
    unauthorized(res);
    return;
  }

  if (req.method === 'OPTIONS') {
    res.writeHead(204, {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, PUT, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type'
    });
    res.end();
    return;
  }

  if (url.pathname === '/api/collections' && req.method === 'GET') {
    res.setHeader(
      'Set-Cookie',
      `metaweb_admin=${encodeURIComponent(`${credentials.username}:${credentials.password}`)}; Path=/; HttpOnly; SameSite=Strict`
    );
    sendJson(res, 200, { collections: Object.keys(collections) });
    return;
  }

  if (url.pathname.startsWith('/api/')) {
    const collection = url.pathname.replace('/api/', '');
    const filepath = collections[collection];

    if (!filepath) {
      sendJson(res, 404, { error: 'Unknown collection.' });
      return;
    }

    if (req.method === 'GET') {
      const raw = await readFile(filepath, 'utf8');
      sendJson(res, 200, JSON.parse(raw));
      return;
    }

    if (req.method === 'PUT') {
      try {
        const rawBody = await readBody(req);
        const parsed = JSON.parse(rawBody);
        validateCollectionPayload(collection, parsed);
        await writeFile(filepath, `${JSON.stringify(parsed, null, 2)}\n`, 'utf8');
        sendJson(res, 200, { ok: true });
      } catch (error) {
        sendJson(res, 400, { error: error instanceof Error ? error.message : 'Invalid payload.' });
      }
      return;
    }

    sendJson(res, 405, { error: 'Method not allowed.' });
    return;
  }

  const requestedPath = url.pathname === '/' ? '/index.html' : url.pathname;
  const safePath = path.normalize(requestedPath).replace(/^(\.\.[/\\])+/, '');
  const filepath = path.join(adminDir, safePath);

  if (!filepath.startsWith(adminDir) || !existsSync(filepath)) {
    res.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' });
    res.end('Not found.');
    return;
  }

  serveFile(res, filepath);
});

const port = 4325;
server.listen(port, '127.0.0.1', () => {
  console.log(`MetaWeb admin is running at http://127.0.0.1:${port}`);
});
