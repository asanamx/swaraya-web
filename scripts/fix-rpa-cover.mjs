/**
 * FIX-RPA-COVER — Reemplaza la portada del post "Automatización Inteligente
 * de Procesos: RPA + IA" porque la imagen anterior parecía la silueta de
 * una persona (Unsplash 1651340765216-ba02df201308).
 *
 * Nueva imagen: data flow abstracto en azul, totalmente tech, sin figuras
 * humanas. Mantiene el duotone indigo del resto de la colección.
 */

import 'dotenv/config';

const SANITY_PROJECT_ID = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || '9slaxsvf';
const SANITY_DATASET = process.env.NEXT_PUBLIC_SANITY_DATASET || 'production';
const SANITY_API_VER = process.env.NEXT_PUBLIC_SANITY_API_VERSION || '2024-01-01';
const SANITY_TOKEN = process.env.SANITY_WRITE_TOKEN;
if (!SANITY_TOKEN) throw new Error('Missing SANITY_WRITE_TOKEN');

const POST_ID = 'fc096221-cd51-4555-9290-d2d37bdd769c'; // automatizacion-inteligente-rpa-ia
const NEW_IMAGE_URL =
  'https://images.unsplash.com/photo-1644088379091-d574269d422f?w=1920&q=85&auto=format&fit=crop';

async function uploadAsset(url, filename) {
  console.log(`→ Descargando: ${url.substring(0, 80)}...`);
  const res = await fetch(url);
  if (!res.ok) throw new Error(`Download failed: ${res.status}`);
  const buf = await res.arrayBuffer();
  console.log(`  ${(buf.byteLength / 1024).toFixed(0)} KB descargados`);

  console.log(`→ Subiendo a Sanity como "${filename}"...`);
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
  const assetId = JSON.parse(text).document._id;
  console.log(`  ✓ Asset creado: ${assetId}`);
  return assetId;
}

async function patchCover(postId, assetId) {
  console.log(`→ Actualizando coverImage de ${postId}...`);
  const res = await fetch(
    `https://${SANITY_PROJECT_ID}.api.sanity.io/v${SANITY_API_VER}/data/mutate/${SANITY_DATASET}`,
    {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${SANITY_TOKEN}`,
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
  console.log(`  ✓ Post actualizado`);
}

async function main() {
  console.log('--- Fix RPA Cover ---\n');
  const assetId = await uploadAsset(NEW_IMAGE_URL, 'automatizacion-rpa-ia-v2.jpg');
  await patchCover(POST_ID, assetId);
  console.log('\n✓ COMPLETADO. La nueva portada ya está en Sanity.');
  console.log('  Refresca /blog/automatizacion-inteligente-rpa-ia para verla.');
}

main().catch((err) => {
  console.error('ERROR:', err.message);
  process.exit(1);
});
