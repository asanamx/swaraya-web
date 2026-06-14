/**
 * DIVERSIFICACIÓN v3 — Cambia portadas circuit-heavy por una mezcla
 * temática: code, servers, charts, documentos, industrial, terminales.
 * Solo toca posts que actualmente tienen circuit/motherboard.
 */
import 'dotenv/config';
import { writeFile } from 'node:fs/promises';

const PID = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || '9slaxsvf';
const DS = process.env.NEXT_PUBLIC_SANITY_DATASET || 'production';
const VER = process.env.NEXT_PUBLIC_SANITY_API_VERSION || '2024-01-01';
const TOK = process.env.SANITY_WRITE_TOKEN;
if (!TOK) throw new Error('Missing SANITY_WRITE_TOKEN');

const u = (id) => `https://images.unsplash.com/photo-${id}?w=1920&q=85&auto=format&fit=crop`;

const SWAPS = [
  // (Subjects intentionally varied: terminal, charts, server, paper, gears, workspace, text, abstract)
  { slug: 'gobernanza-ia-instituciones',         postId: 'post-gobernanza-ia-instituciones-3e97dfca',
    url: u('1465101046530-73398c7f28ca'),  subject: 'documento/papel: marco, principios' },
  { slug: 'metricas-exito-proyectos-ia',         postId: 'post-metricas-exito-proyectos-ia-c9475920',
    url: u('1605379399642-870262d3d051'),  subject: 'oscilloscope/instrumento: medición' },
  { slug: 'cio-ia-agentica',                     postId: 'post-cio-ia-agentica-7d9d903f',
    url: u('1517694712202-14dd9538aa97'),  subject: 'terminal vintage: liderazgo, decisión' },
  { slug: 'arquitectura-ia-empresarial',         postId: 'b7aa645b-5690-412f-9aad-8c77f83ec731',
    url: u('1551033406-611cf9a28f67'),     subject: 'server rack: arquitectura de sistemas' },
  { slug: 'roi-inteligencia-artificial',         postId: '39c2a07b-bdeb-4888-818c-3bd830e53ec3',
    url: u('1499951360447-b19be8fe80f5'),  subject: 'datos/instrumentos: valor cuantitativo' },
  { slug: 'implementar-mlops-organizacion',      postId: 'bebdc6b3-c760-4c03-bd7d-8874bf4801e2',
    url: u('1456513080510-7bf3a84b82f8'),  subject: 'industrial/conveyor: pipeline operativo' },
  { slug: 'futuro-trabajo-ia-generativa',        postId: 'f6276856-70bf-4a42-a63f-796c4d370f94',
    url: u('1505373877841-8d25f7d46678'),  subject: 'workspace: trabajo con tecnología' },
  { slug: 'nlp-aplicado-casos-practicos',        postId: '2db7a284-89dc-4c2e-ba0c-ea0bff9c469a',
    url: u('1454165804606-c3d57bc86b40'),  subject: 'libros/lenguaje: NLP, sintaxis' },
  { slug: 'gobernanza-ia-implementacion-responsable', postId: '6cf76d2c-317c-41d9-9963-e9f6dc26df50',
    url: u('1518186285589-2f7649de83e0'),  subject: 'patrón abstracto: ética, marco' },
  { slug: 'automatizacion-inteligente-rpa-ia',   postId: 'fc096221-cd51-4555-9290-d2d37bdd769c',
    url: u('1581090700227-1e37b190418e'),  subject: 'mecanismo/industrial: automatización' },
  { slug: 'construyendo-equipo-ia-efectivo',     postId: 'f6b447b3-adc4-493e-b219-ebcebe700322',
    url: u('1542435503-956c469947f6'),     subject: 'espacio colaborativo: equipo técnico' },
];

const headers = { Authorization: `Bearer ${TOK}`, 'Content-Type': 'application/json' };

async function uploadAsset(url, filename) {
  const r = await fetch(url);
  if (!r.ok) throw new Error(`DL ${r.status} ${url}`);
  const buf = await r.arrayBuffer();
  const up = await fetch(
    `https://${PID}.api.sanity.io/v${VER}/assets/images/${DS}?filename=${encodeURIComponent(filename)}`,
    { method: 'POST', headers: { Authorization: `Bearer ${TOK}`, 'Content-Type': 'image/jpeg' }, body: buf },
  );
  const t = await up.text();
  if (!up.ok) throw new Error(`UP ${up.status} ${t}`);
  return JSON.parse(t).document._id;
}

async function patch(postId, assetId) {
  const r = await fetch(
    `https://${PID}.api.sanity.io/v${VER}/data/mutate/${DS}`,
    {
      method: 'POST',
      headers,
      body: JSON.stringify({
        mutations: [{ patch: { id: postId, set: { coverImage: { _type: 'image', asset: { _type: 'reference', _ref: assetId } } } } }],
      }),
    },
  );
  const t = await r.text();
  if (!r.ok) throw new Error(`PATCH ${r.status} ${t}`);
  return JSON.parse(t);
}

async function main() {
  console.log(`\n🎨 Diversificando ${SWAPS.length} portadas\n`);
  const audit = [];
  for (let i = 0; i < SWAPS.length; i++) {
    const s = SWAPS[i];
    console.log(`[${i + 1}/${SWAPS.length}] ${s.slug}`);
    console.log(`  ↳ ${s.subject}`);
    try {
      const assetId = await uploadAsset(s.url, `${s.slug}-v3.jpg`);
      await patch(s.postId, assetId);
      console.log(`  ✅ patched`);
      audit.push({ ...s, assetId, status: 'ok' });
    } catch (e) {
      console.error(`  ❌ ${e.message}`);
      audit.push({ ...s, status: 'error', error: e.message });
    }
  }
  await writeFile('/app/scripts/diversify-covers.audit.json', JSON.stringify(audit, null, 2));
  console.log('\n✨ Done\n');
}
main().catch((e) => { console.error('💥', e); process.exit(1); });
