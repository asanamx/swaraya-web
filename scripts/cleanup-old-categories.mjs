/**
 * CLEANUP CATEGORIES — Patchea drafts que referencian categorías viejas y
 * luego elimina las 5 categorías de Swaraya antiguas.
 */
import 'dotenv/config';

const PID = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const DS  = process.env.NEXT_PUBLIC_SANITY_DATASET;
const VER = process.env.NEXT_PUBLIC_SANITY_API_VERSION;
const TOKEN = process.env.SANITY_WRITE_TOKEN;

const headers = {
  Authorization: `Bearer ${TOKEN}`,
  'Content-Type': 'application/json',
};

const OLD_IDS = [
  '2098f8bd-3e08-40aa-ad8f-462b4432ba08',
  '286ecf29-183a-4c30-bc65-911dabef0e7a',
  'd5247705-77df-46b4-982a-a3912ff45803',
  '6d99f079-b90a-483a-ae9b-435179bf2811',
  'a7b25c9f-0894-4d15-9576-d4ce03f30242',
];

async function sanityFetch(query) {
  const url = `https://${PID}.api.sanity.io/v${VER}/data/query/${DS}?query=${encodeURIComponent(query)}`;
  const res = await fetch(url, { headers });
  const j = await res.json();
  return j.result;
}

async function sanityMutate(mutations) {
  const res = await fetch(
    `https://${PID}.api.sanity.io/v${VER}/data/mutate/${DS}?returnIds=true&visibility=sync`,
    { method: 'POST', headers, body: JSON.stringify({ mutations }) },
  );
  const text = await res.text();
  if (!res.ok) throw new Error(`Mutate failed: ${res.status} ${text}`);
  return JSON.parse(text);
}

async function main() {
  // 1. Encontrar todos los documentos (incluyendo drafts) que referencian alguna categoría vieja
  const refs = await sanityFetch(
    `*[references(${OLD_IDS.map((id) => `"${id}"`).join(', ')})]{ _id, _type, "cat": category._ref }`
  );
  console.log(`Encontrados ${refs.length} documentos con referencias a categorías viejas:`);
  for (const r of refs) console.log(`  - ${r._id} (${r._type})`);

  // 2. Borrar drafts (mejor borrarlos que mantenerlos desactualizados)
  const drafts = refs.filter((r) => r._id.startsWith('drafts.'));
  if (drafts.length) {
    console.log(`\n🗑  Borrando ${drafts.length} drafts…`);
    const r = await sanityMutate(drafts.map((d) => ({ delete: { id: d._id } })));
    console.log(`  ✅ ${r.results.length} drafts eliminados`);
  }

  // 3. Borrar categorías viejas
  console.log(`\n🗑  Borrando categorías viejas…`);
  try {
    const r = await sanityMutate(OLD_IDS.map((id) => ({ delete: { id } })));
    console.log(`  ✅ ${r.results.length} categorías eliminadas`);
  } catch (e) {
    console.log(`  ⚠️  ${e.message}`);
  }

  // 4. Verificación
  console.log('\n🔍 Categorías finales (swaraya):');
  const cats = await sanityFetch(`*[_type=="category" && site->domain=="swaraya.ai"]{ title, "slug": slug.current }`);
  for (const c of cats) console.log(`  - ${c.title} (${c.slug})`);

  console.log('\n✨ Listo.\n');
}

main().catch((e) => { console.error('💥', e); process.exit(1); });
