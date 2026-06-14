/**
 * Homologates cover images for the 15 LEGACY swaraya.ai blog posts.
 * Replaces each old PNG/AI-cliche cover with an editorial architectural image
 * that will look coherent after the duotone indigo filter is applied.
 *
 * Strategy:
 *   1. For each legacy post, download a new cover URL
 *   2. Upload to Sanity Asset Store → get assetId
 *   3. PATCH the post.coverImage.asset._ref to the new assetId
 *
 * Run: node scripts/homologate-covers.mjs
 */

import 'dotenv/config';
import { writeFile } from 'node:fs/promises';

const SANITY_PROJECT_ID = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || '9slaxsvf';
const SANITY_DATASET = process.env.NEXT_PUBLIC_SANITY_DATASET || 'production';
const SANITY_API_VER = process.env.NEXT_PUBLIC_SANITY_API_VERSION || '2024-01-01';
const SANITY_TOKEN = process.env.SANITY_WRITE_TOKEN;

if (!SANITY_TOKEN) throw new Error('Missing SANITY_WRITE_TOKEN');

// Map: slug → { postId, newCover (Unsplash URL) }
// Mapping picked to evoke topic without literal AI imagery — duotone normalizes them anyway.
const COVER_MAP = [
  { slug: 'agentes-autonomos-ia-empresarial',
    postId: 'd386b751-1b4b-470a-9ca0-285ab7198050',
    url: 'https://images.unsplash.com/photo-1534237710431-e2fc698436d0?w=1920&q=85' },
  { slug: 'arquitectura-ia-empresarial',
    postId: 'b7aa645b-5690-412f-9aad-8c77f83ec731',
    url: 'https://images.unsplash.com/photo-1487958449943-2429e8be8625?w=1920&q=85' },
  { slug: 'roi-inteligencia-artificial',
    postId: '39c2a07b-bdeb-4888-818c-3bd830e53ec3',
    url: 'https://images.unsplash.com/photo-1576502200916-3808e07386a5?w=1920&q=85' },
  { slug: 'implementar-mlops-organizacion',
    postId: 'bebdc6b3-c760-4c03-bd7d-8874bf4801e2',
    url: 'https://images.unsplash.com/photo-1624011492916-e3dd7a8934d8?w=1920&q=85' },
  { slug: 'llms-empresa-mas-alla-chatbot',
    postId: 'dba06546-f4d8-4a9c-ba38-9dfc650b9aef',
    url: 'https://images.unsplash.com/photo-1522404419647-18cb51cc5c7a?w=1920&q=85' },
  { slug: 'data-mesh-arquitectura-datos',
    postId: '4fdf8304-f8a4-429e-aa19-89bb4bcdac23',
    url: 'https://images.unsplash.com/photo-1483959651481-dc75b89291f1?w=1920&q=85' },
  { slug: 'futuro-trabajo-ia-generativa',
    postId: 'f6276856-70bf-4a42-a63f-796c4d370f94',
    url: 'https://images.unsplash.com/photo-1576831371356-d6e9411ae501?w=1920&q=85' },
  { slug: 'nlp-aplicado-casos-practicos',
    postId: '2db7a284-89dc-4c2e-ba0c-ea0bff9c469a',
    url: 'https://images.unsplash.com/photo-1490351267196-b7a67e26e41b?w=1920&q=85' },
  { slug: 'gobernanza-ia-implementacion-responsable',
    postId: '6cf76d2c-317c-41d9-9963-e9f6dc26df50',
    url: 'https://images.unsplash.com/photo-1549791084-5f78368b208b?w=1920&q=85' },
  { slug: 'automatizacion-inteligente-rpa-ia',
    postId: 'fc096221-cd51-4555-9290-d2d37bdd769c',
    url: 'https://images.unsplash.com/photo-1493397212122-2b85dda8106b?w=1920&q=85' },
  { slug: 'computer-vision-cadena-suministro',
    postId: 'b605cacd-c9bc-443b-b804-eec45303f9c0',
    url: 'https://images.unsplash.com/photo-1553768603-9bd7ccb7bec7?w=1920&q=85' },
  { slug: 'construyendo-equipo-ia-efectivo',
    postId: 'f6b447b3-adc4-493e-b219-ebcebe700322',
    url: 'https://images.unsplash.com/photo-1600075947079-1fc30a9f9de9?w=1920&q=85' },
  { slug: 'prediccion-demanda-machine-learning',
    postId: '2a556371-54c0-486a-9cbe-2f9ac3b215c8',
    url: 'https://images.unsplash.com/photo-1518005020951-eccb494ad742?w=1920&q=85' },
  { slug: 'apis-ia-construir-vs-consumir',
    postId: '0fca9773-f90a-4c22-a369-2e9996761a2f',
    url: 'https://images.unsplash.com/photo-1462556791646-c201b8241a94?w=1920&q=85' },
  { slug: 'tendencias-ia-2026',
    postId: '32f9fa32-50c8-4e4e-ae75-324c530741f9',
    url: 'https://images.unsplash.com/photo-1554469384-e58fac16e23a?w=1920&q=85' },
];

const headers = {
  Authorization: `Bearer ${SANITY_TOKEN}`,
  'Content-Type': 'application/json',
};

async function uploadAsset(url, filename) {
  const res = await fetch(url);
  if (!res.ok) throw new Error(`Download failed: ${res.status} ${url}`);
  const buf = await res.arrayBuffer();
  const up = await fetch(
    `https://${SANITY_PROJECT_ID}.api.sanity.io/v${SANITY_API_VER}/assets/images/${SANITY_DATASET}?filename=${encodeURIComponent(filename)}`,
    {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${SANITY_TOKEN}`,
        'Content-Type': 'image/jpeg',
      },
      body: buf,
    },
  );
  const text = await up.text();
  if (!up.ok) throw new Error(`Upload failed: ${up.status} ${text}`);
  const data = JSON.parse(text);
  return data.document._id;
}

async function patchCover(postId, assetId) {
  const res = await fetch(
    `https://${SANITY_PROJECT_ID}.api.sanity.io/v${SANITY_API_VER}/data/mutate/${SANITY_DATASET}`,
    {
      method: 'POST',
      headers,
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
  return JSON.parse(text);
}

async function main() {
  console.log(`\n🎨 Homologating ${COVER_MAP.length} legacy post covers\n`);
  const audit = [];

  for (let i = 0; i < COVER_MAP.length; i++) {
    const m = COVER_MAP[i];
    console.log(`[${i + 1}/${COVER_MAP.length}] ${m.slug}`);
    try {
      console.log(`  ↳ downloading + uploading…`);
      const assetId = await uploadAsset(m.url, `${m.slug}.jpg`);
      console.log(`  ↳ new asset: ${assetId}`);
      console.log(`  ↳ patching post ${m.postId}…`);
      await patchCover(m.postId, assetId);
      console.log(`  ✅ updated`);
      audit.push({ slug: m.slug, postId: m.postId, assetId, status: 'ok' });
    } catch (e) {
      console.error(`  ❌ FAILED: ${e.message}`);
      audit.push({ slug: m.slug, postId: m.postId, status: 'error', error: e.message });
    }
  }

  await writeFile('/app/scripts/homologate-covers.audit.json', JSON.stringify(audit, null, 2));
  console.log(`\n✨ Done. Audit log at /app/scripts/homologate-covers.audit.json\n`);
}

main().catch((e) => {
  console.error('💥 Fatal:', e);
  process.exit(1);
});
