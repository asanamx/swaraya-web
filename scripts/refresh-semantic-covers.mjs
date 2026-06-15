/**
 * REFRESH-SEMANTIC-COVERS — Sustituye 4 portadas por imágenes semánticas
 * pensadas en metáforas concretas para el contenido. Evita circuitos
 * genéricos, humanos, robots y "hands typing".
 *
 * 1. RPA + IA           → mecanismo de relojería en cascada
 * 2. RAG vs Fine-tuning → arquitectura paralela (bifurcación)
 * 3. Evals para LLM     → metrónomo (medición de precisión)
 * 4. APIs Construir/Consumir → estructura geométrica modular
 */
import 'dotenv/config';

const PID = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || '9slaxsvf';
const DS = process.env.NEXT_PUBLIC_SANITY_DATASET || 'production';
const VER = process.env.NEXT_PUBLIC_SANITY_API_VERSION || '2024-01-01';
const TOKEN = process.env.SANITY_WRITE_TOKEN;
if (!TOKEN) throw new Error('Missing SANITY_WRITE_TOKEN');

const TARGETS = [
  {
    postId: 'fc096221-cd51-4555-9290-d2d37bdd769c',
    slug: 'automatizacion-inteligente-rpa-ia',
    filename: 'rpa-ia-clockwork-mechanism.jpg',
    url: 'https://images.unsplash.com/photo-1633451238042-85d93d267866?w=1920&q=85&auto=format&fit=crop',
    meta: 'clockwork mechanism — automatización cascada',
  },
  {
    postId: 'post-rag-vs-fine-tuning-cuando-usar-cada-uno-e0c8c389',
    slug: 'rag-vs-fine-tuning-cuando-usar-cada-uno',
    filename: 'rag-vs-fine-tuning-parallel-arch.jpg',
    url: 'https://images.unsplash.com/photo-1488972685288-c3fd157d7c7a?w=1920&q=85&auto=format&fit=crop',
    meta: 'parallel architecture — dos enfoques',
  },
  {
    postId: 'post-evals-sistemas-llm-produccion-fdce0a74',
    slug: 'evals-sistemas-llm-produccion',
    filename: 'evals-llm-metronome.jpg',
    url: 'https://images.unsplash.com/photo-1602342654726-83c1ea525a9c?w=1920&q=85&auto=format&fit=crop',
    meta: 'metronome — precisión, medición',
  },
  {
    postId: '0fca9773-f90a-4c22-a369-2e9996761a2f',
    slug: 'apis-ia-construir-vs-consumir',
    filename: 'apis-modular-architecture.jpg',
    url: 'https://images.unsplash.com/photo-1553332697-bf631215652e?w=1920&q=85&auto=format&fit=crop',
    meta: 'modular architecture — componentes',
  },
];

async function uploadAsset(url, filename) {
  console.log(`  ↓ Descargando ${filename}…`);
  const res = await fetch(url);
  if (!res.ok) throw new Error(`Download failed: ${res.status}`);
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

console.log('--- Refresh semantic covers ---\n');
const audit = [];
for (const t of TARGETS) {
  console.log(`→ ${t.slug}  (${t.meta})`);
  const assetId = await uploadAsset(t.url, t.filename);
  await patchCover(t.postId, assetId);
  console.log(`  ✓ Actualizado: ${assetId}\n`);
  audit.push({ ...t, assetId, status: 'ok' });
}

import { writeFileSync } from 'node:fs';
writeFileSync(
  new URL('./refresh-semantic-covers.audit.json', import.meta.url),
  JSON.stringify(audit, null, 2),
);
console.log('✓ COMPLETADO. Auditoría en refresh-semantic-covers.audit.json');
