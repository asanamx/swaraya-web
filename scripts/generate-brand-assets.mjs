/**
 * Genera assets de alta resolución del logo Swaraya para LinkedIn / branding.
 * Salidas en /app/public/brand/
 */
import sharp from 'sharp';
import { mkdir, writeFile } from 'node:fs/promises';

const OUT_DIR = '/app/public/brand';
await mkdir(OUT_DIR, { recursive: true });

// SVG fuente — versión dark (fondo #0E0F11, marca #F5F2EC)
const svgDark = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" fill="none">
  <rect width="64" height="64" rx="14" fill="#0E0F11"/>
  <circle cx="20" cy="16" r="3.6" fill="#F5F2EC"/>
  <line x1="20" y1="7" x2="20" y2="11" stroke="#F5F2EC" stroke-width="2.4" stroke-linecap="round"/>
  <line x1="11" y1="16" x2="14.5" y2="16" stroke="#F5F2EC" stroke-width="2.4" stroke-linecap="round"/>
  <line x1="25.5" y1="16" x2="29" y2="16" stroke="#F5F2EC" stroke-width="2.4" stroke-linecap="round"/>
  <text x="32" y="52" text-anchor="middle"
        font-family="'Author','Inter',system-ui,sans-serif"
        font-weight="600"
        font-size="28"
        letter-spacing="-2"
        fill="#F5F2EC">sw</text>
</svg>`;

// Versión cream invertida
const svgCream = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" fill="none">
  <rect width="64" height="64" rx="14" fill="#F5F2EC"/>
  <circle cx="20" cy="16" r="3.6" fill="#0E0F11"/>
  <line x1="20" y1="7" x2="20" y2="11" stroke="#0E0F11" stroke-width="2.4" stroke-linecap="round"/>
  <line x1="11" y1="16" x2="14.5" y2="16" stroke="#0E0F11" stroke-width="2.4" stroke-linecap="round"/>
  <line x1="25.5" y1="16" x2="29" y2="16" stroke="#0E0F11" stroke-width="2.4" stroke-linecap="round"/>
  <text x="32" y="52" text-anchor="middle"
        font-family="'Author','Inter',system-ui,sans-serif"
        font-weight="600"
        font-size="28"
        letter-spacing="-2"
        fill="#0E0F11">sw</text>
</svg>`;

// Versión transparente (solo marca, sobre transparente, color crema)
const svgTransparentLight = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" fill="none">
  <circle cx="20" cy="16" r="3.6" fill="#F5F2EC"/>
  <line x1="20" y1="7" x2="20" y2="11" stroke="#F5F2EC" stroke-width="2.4" stroke-linecap="round"/>
  <line x1="11" y1="16" x2="14.5" y2="16" stroke="#F5F2EC" stroke-width="2.4" stroke-linecap="round"/>
  <line x1="25.5" y1="16" x2="29" y2="16" stroke="#F5F2EC" stroke-width="2.4" stroke-linecap="round"/>
  <text x="32" y="52" text-anchor="middle"
        font-family="'Author','Inter',system-ui,sans-serif"
        font-weight="600"
        font-size="28"
        letter-spacing="-2"
        fill="#F5F2EC">sw</text>
</svg>`;

const svgTransparentDark = svgTransparentLight.replaceAll('#F5F2EC', '#0E0F11');

const variants = [
  { name: 'swaraya-logo-dark-1080.png',         svg: svgDark,             size: 1080 },
  { name: 'swaraya-logo-dark-400.png',          svg: svgDark,             size: 400  },
  { name: 'swaraya-logo-cream-1080.png',        svg: svgCream,            size: 1080 },
  { name: 'swaraya-logo-cream-400.png',         svg: svgCream,            size: 400  },
  { name: 'swaraya-logo-mark-light-1080.png',   svg: svgTransparentLight, size: 1080 },
  { name: 'swaraya-logo-mark-dark-1080.png',    svg: svgTransparentDark,  size: 1080 },
];

for (const v of variants) {
  const buf = await sharp(Buffer.from(v.svg))
    .resize(v.size, v.size)
    .png({ compressionLevel: 9 })
    .toBuffer();
  await writeFile(`${OUT_DIR}/${v.name}`, buf);
  console.log(`✅ ${v.name} (${(buf.length / 1024).toFixed(1)} KB)`);
}

// Guardamos también las SVGs como assets descargables
await writeFile(`${OUT_DIR}/swaraya-logo-dark.svg`, svgDark);
await writeFile(`${OUT_DIR}/swaraya-logo-cream.svg`, svgCream);
console.log('✨ Done.');
