// ============================================================================
// سكريبت أتمتة البراندنج
// ============================================================================
// بيقرأ src/config/brand.json وبيحقن القيم في:
//   - index.html (title, theme-color, favicon, apple-touch-icon)
//   - public/manifest.json (name, icons.src = logoPath)
//   - public/sw.js (اسم الكاش، اسم التطبيق، مسار الشعار)
// ============================================================================

import { readFileSync, writeFileSync } from 'fs';
import { fileURLToPath } from 'url';
import path from 'path';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, '..');

const brand = JSON.parse(
  readFileSync(path.join(root, 'src/config/brand.json'), 'utf-8')
);

const cacheSlug = String(brand.shortName || brand.appName || 'app')
  .toLowerCase()
  .replace(/[^a-z0-9\u0600-\u06ff]+/gi, '-')
  .replace(/^-+|-+$/g, '')
  .slice(0, 40) || 'app';

const logoPath = brand.logoPath || '/icon.svg';

// 1) index.html
const indexPath = path.join(root, 'index.html');
let html = readFileSync(indexPath, 'utf-8');

html = html.replace(
  /(<meta name="theme-color" content=")[^"]*(")/,
  `$1${brand.themeColor}$2`
);
html = html.replace(
  /(<meta name="apple-mobile-web-app-title" content=")[^"]*(")/,
  `$1${brand.shortName}$2`
);
html = html.replace(
  /(<link rel="manifest" href=")[^"]*(")/,
  `$1/manifest.json$2`
);
html = html.replace(
  /<title>[^<]*<\/title>/,
  `<title>${brand.appName} - ${brand.doctorName}</title>`
);
html = html.replace(
  /(<meta name="description" content=")[^"]*(")/,
  `$1${brand.description}$2`
);

if (/<link rel="icon"[^>]*>/.test(html)) {
  html = html.replace(
    /<link rel="icon"[^>]*>/,
    `<link rel="icon" href="${logoPath}" />`
  );
} else {
  html = html.replace(
    '<link rel="manifest"',
    `<link rel="icon" href="${logoPath}" />\n    <link rel="manifest"`
  );
}

html = html.replace(
  /(<link rel="apple-touch-icon"[^>]*href=")[^"]*(")/,
  `$1${logoPath}$2`
);
if (!html.includes('apple-touch-icon')) {
  html = html.replace(
    '<link rel="manifest"',
    `<link rel="apple-touch-icon" href="${logoPath}" />\n    <link rel="manifest"`
  );
}

writeFileSync(indexPath, html, 'utf-8');

// 2) public/manifest.json — logoPath يُستخدم فعليًا كأيقونة PWA
const manifestPath = path.join(root, 'public/manifest.json');
const manifest = JSON.parse(readFileSync(manifestPath, 'utf-8'));

manifest.name = `${brand.appName} - ${brand.doctorName}`;
manifest.short_name = brand.shortName;
manifest.description = brand.description;
manifest.background_color = brand.backgroundColor;
manifest.theme_color = brand.themeColor;
const isSvg = /\.svg(\?|$)/i.test(logoPath);
manifest.icons = [
  {
    src: logoPath,
    sizes: isSvg ? '192x192 512x512' : '192x192',
    type: isSvg ? 'image/svg+xml' : 'image/png',
    purpose: 'any',
  },
  {
    src: logoPath,
    sizes: isSvg ? '512x512' : '512x512',
    type: isSvg ? 'image/svg+xml' : 'image/png',
    purpose: 'maskable',
  },
];

writeFileSync(manifestPath, JSON.stringify(manifest, null, 2) + '\n', 'utf-8');

// 3) public/sw.js — بدون اسم الأخصائي في الإشعار
const swPath = path.join(root, 'public/sw.js');
let sw = readFileSync(swPath, 'utf-8');

const swInject = `// BRAND_INJECT_START
const CACHE_NAME = ${JSON.stringify(`nutrition-${cacheSlug}-v4`)};
const BRAND_APP_NAME = ${JSON.stringify(brand.appName)};
const BRAND_SHORT_NAME = ${JSON.stringify(brand.shortName)};
const BRAND_LOGO_PATH = ${JSON.stringify(logoPath)};
// BRAND_INJECT_END`;

if (!sw.includes('BRAND_INJECT_START') || !sw.includes('BRAND_INJECT_END')) {
  throw new Error(
    'public/sw.js لازم يحتوي على بلوك BRAND_INJECT_START ... BRAND_INJECT_END'
  );
}

sw = sw.replace(
  /\/\/ BRAND_INJECT_START[\s\S]*?\/\/ BRAND_INJECT_END/,
  swInject
);

writeFileSync(swPath, sw, 'utf-8');

console.log(
  `✅ تم تطبيق براند "${brand.appName}" — logoPath=${logoPath} على index.html و manifest.json و sw.js`
);
