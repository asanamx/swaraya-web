/**
 * REFRESH-COVERS-ROUND2 — Sustituye 5 portadas más con metáforas semánticas.
 *
 * Reemplaza imágenes con humanos, robots, manos, circuit boards genéricos.
 *
 * 1. Data Mesh           → cubos geométricos descentralizados
 * 2. NLP Aplicado        → manuscrito vintage (lenguaje, texto)
 * 3. Computer Vision     → vista aérea de contenedores (supply chain)
 * 4. Agentes Autónomos   → murmuración de pájaros (enjambre)
 * 5. Futuro Trabajo IA   → tinta en agua (transformación, emergencia)
 */
import 'dotenv/config';
import { writeFileSync } from 'node:fs';

const PID = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || '9slaxsvf';
const DS = process.env.NEXT_PUBLIC_SANITY_DATASET || 'production';
const VER = process.env.NEXT_PUBLIC_SANITY_API_VERSION || '2024-01-01';
const TOKEN = process.env.SANITY_WRITE_TOKEN;
if (!TOKEN) throw new Error('Missing SANITY_WRITE_TOKEN');

const TARGETS = [
  {
    postId: '4fdf8304-f8a4-429e-aa19-89bb4bcdac23',
    slug: 'data-mesh-arquitectura-datos',
    filename: 'data-mesh-decentralized-nodes.jpg',
    url: 'https://images.unsplash.com/photo-1639322537228-f710d846310a?w=1920&q=85&auto=format&fit=crop',
    meta: 'cubos geométricos — red descentralizada',
  },
  {
    postId: '2db7a284-89dc-4c2e-ba0c-ea0bff9c469a',
    slug: 'nlp-aplicado-casos-practicos',
    filename: 'nlp-vintage-manuscript.jpg',
    url: 'https://images.unsplash.com/photo-1546199881-3454b82b832b?w=1920&q=85&auto=format&fit=crop',
    meta: 'manuscrito vintage — lenguaje, texto',
  },
  {
    postId: 'b605cacd-c9bc-443b-b804-eec45303f9c0',
    slug: 'computer-vision-cadena-suministro',
    filename: 'computer-vision-aerial-containers.jpg',
    url: 'https://images.unsplash.com/photo-1565627680455-83e57619e4a8?w=1920&q=85&auto=format&fit=crop',
    meta: 'vista aérea contenedores — supply chain',
  },
  {
    postId: 'd386b751-1b4b-470a-9ca0-285ab7198050',
    slug: 'agentes-autonomos-ia-empresarial',
    filename: 'autonomous-agents-murmuration.jpg',
    url: 'https://images.unsplash.com/photo-1565392812859-e793ff1cb57d?w=1920&q=85&auto=format&fit=crop',
    meta: 'murmuración aves — enjambre, autonomía',
  },
  {
    postId: 'f6276856-70bf-4a42-a63f-796c4d370f94',
    slug: 'futuro-trabajo-ia-generativa',
    filename: 'futuro-trabajo-ink-water.jpg',
    // ink in water — transformación, emergencia, creatividad generativa
    url: 'https://images.unsplash.com/photo-1605721911519-3dfeb3be25e7?w=1920&q=85&auto=format&fit=crop',
    meta: 'tinta en agua — transformación, emergencia',
  },
];

async function uploadAsset(url, filename) {
  console.log(`  ↓ ${filename}…`);
  const res = await fetch(url);
  if (!res.ok) throw new Error(`Download failed: ${res.status} for ${url}`);
  const buf = await res.arrayBuffer();
  console.log(`    ${(buf.byteLength / 1024).toFixed(0)} KB`);

  const up = await fetch(
    `https://${PID}.api.sanity.io/v${VER}/assets/images/${DS}?filename=${encodeURIComponent(filename)}`,
    {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${TOKEN}`,
        'Content-Type': 'image/jpeg',
      },
      body: buf,
    },
  );
  const text = await up.text();
  if (!up.ok) throw new Error(`Upload failed: ${up.status} ${text}`);
  return JSON.parse(text).document._id;
}

async function patchCover(postId, assetId) {
  const res = await fetch(
    `https://${PID}.api.sanity.io/v${VER}/data/mutate/${DS}`,
    {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${TOKEN}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        mutations: [
          {
            patch: {
              id: postId,
              set: {
                coverImage: {
                  _type: 'image',
                  asset: { _type: 'reference', _ref: assetId },
                },
              },
            },
          },
        ],
      }),
    },
  );
  const text = await res.text();
  if (!res.ok) throw new Error(`Patch failed: ${res.status} ${text}`);
}

console.log('--- Refresh covers (round 2) ---\n');
const audit = [];
for (const t of TARGETS) {
  console.log(`→ ${t.slug}  (${t.meta})`);
  try {
    const assetId = await uploadAsset(t.url, t.filename);
    await patchCover(t.postId, assetId);
    console.log(`  ✓ ${assetId}\n`);
    audit.push({ ...t, assetId, status: 'ok' });
  } catch (err) {
    console.error(`  ✗ ${err.message}\n`);
    audit.push({ ...t, error: err.message, status: 'failed' });
  }
}

writeFileSync(
  new URL('./refresh-covers-round2.audit.json', import.meta.url),
  JSON.stringify(audit, null, 2),
);
console.log('✓ COMPLETADO. Auditoría en refresh-covers-round2.audit.json');
