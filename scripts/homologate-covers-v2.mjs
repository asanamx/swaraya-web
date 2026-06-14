/**
 * RE-HOMOLOGACIÓN v2 — Reemplaza las portadas (esta vez sin edificios).
 * Género visual unificado: macro/abstracto de tecnología real
 * (circuitos, fibra óptica, chips, servidores, código). Tras el duotone
 * indigo reforzado, todo el set se ve como una colección curada.
 *
 * Mapping: cada post → imagen Unsplash conceptualmente relacionada.
 */

import 'dotenv/config';
import { writeFile } from 'node:fs/promises';

const SANITY_PROJECT_ID = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || '9slaxsvf';
const SANITY_DATASET = process.env.NEXT_PUBLIC_SANITY_DATASET || 'production';
const SANITY_API_VER = process.env.NEXT_PUBLIC_SANITY_API_VERSION || '2024-01-01';
const SANITY_TOKEN = process.env.SANITY_WRITE_TOKEN;
if (!SANITY_TOKEN) throw new Error('Missing SANITY_WRITE_TOKEN');

const u = (id) => `https://images.unsplash.com/photo-${id}?w=1920&q=85&auto=format&fit=crop`;

/**
 * Mapeo conceptual de los 21 posts (6 nuevos + 15 antiguos).
 * Tema → imagen tech real.
 */
const COVER_MAP = [
  // -- 6 POSTS NUEVOS (sustituimos los edificios por tech) --
  { slug: 'gobernanza-ia-instituciones',          postId: 'post-gobernanza-ia-instituciones-3e97dfca',         
    url: u('1631376178637-392efc9e356b'),  concept: 'circuit close-up: orden, estructura, principio' },
  { slug: 'rag-vs-fine-tuning-cuando-usar-cada-uno', postId: 'post-rag-vs-fine-tuning-cuando-usar-cada-uno-e0c8c389',
    url: u('1592659762303-90081d34b277'),  concept: 'dark blue circuit: arquitectura técnica, decisión' },
  { slug: 'metricas-exito-proyectos-ia',          postId: 'post-metricas-exito-proyectos-ia-c9475920',
    url: u('1535136104956-115a2cd67fc4'),  concept: 'placa con componentes: granularidad, medición' },
  { slug: 'cio-ia-agentica',                      postId: 'post-cio-ia-agentica-7d9d903f',
    url: u('1518770660439-4636190af475'),  concept: 'circuit board macro: liderazgo técnico' },
  { slug: 'por-que-ia-falla-empresas-grandes',    postId: 'post-por-que-ia-falla-empresas-grandes-6df0695d',
    url: u('1667670778881-537035257bd8'),  concept: 'server close-up: complejidad organizacional' },
  { slug: 'evals-sistemas-llm-produccion',        postId: 'post-evals-sistemas-llm-produccion-fdce0a74',
    url: u('1573164713988-8665fc963095'),  concept: 'código en monitor: testing, validación' },

  // -- 15 POSTS ANTIGUOS --
  { slug: 'agentes-autonomos-ia-empresarial',     postId: 'd386b751-1b4b-470a-9ca0-285ab7198050',
    url: u('1675602488512-bdd631490fcb'),  concept: 'chip CPU central: agencia, autonomía' },
  { slug: 'arquitectura-ia-empresarial',          postId: 'b7aa645b-5690-412f-9aad-8c77f83ec731',
    url: u('1610878785620-3ab2d3a2ae7b'),  concept: 'motherboard: arquitectura de sistema' },
  { slug: 'roi-inteligencia-artificial',          postId: '39c2a07b-bdeb-4888-818c-3bd830e53ec3',
    url: u('1651340741844-48edcd3fe79c'),  concept: 'componentes granulares: medición de valor' },
  { slug: 'implementar-mlops-organizacion',       postId: 'bebdc6b3-c760-4c03-bd7d-8874bf4801e2',
    url: u('1517077304055-6e89abbf09b0'),  concept: 'tilt-shift motherboard: pipeline ordenado' },
  { slug: 'llms-empresa-mas-alla-chatbot',        postId: 'dba06546-f4d8-4a9c-ba38-9dfc650b9aef',
    url: u('1542831371-29b0f74f9713'),     concept: 'código en pantalla: lenguaje, sintaxis' },
  { slug: 'data-mesh-arquitectura-datos',         postId: '4fdf8304-f8a4-429e-aa19-89bb4bcdac23',
    url: u('1614729939124-032d1e6d3b15'),  concept: 'fibra óptica: red descentralizada' },
  { slug: 'futuro-trabajo-ia-generativa',         postId: 'f6276856-70bf-4a42-a63f-796c4d370f94',
    url: u('1651340550839-3b295d930048'),  concept: 'circuit board: trabajo + máquina' },
  { slug: 'nlp-aplicado-casos-practicos',         postId: '2db7a284-89dc-4c2e-ba0c-ea0bff9c469a',
    url: u('1580584126903-c17d41830450'),  concept: 'circuit abstracto: procesamiento de lenguaje' },
  { slug: 'gobernanza-ia-implementacion-responsable', postId: '6cf76d2c-317c-41d9-9963-e9f6dc26df50',
    url: u('1724770388447-30b015a5cbb6'),  concept: 'motherboard ordenada: marco ético' },
  { slug: 'automatizacion-inteligente-rpa-ia',    postId: 'fc096221-cd51-4555-9290-d2d37bdd769c',
    url: u('1651340765216-ba02df201308'),  concept: 'circuit repetitivo: automatización' },
  { slug: 'computer-vision-cadena-suministro',    postId: 'b605cacd-c9bc-443b-b804-eec45303f9c0',
    url: u('1617839625591-e5a789593135'),  concept: 'abstracto industrial: visión + cadena' },
  { slug: 'construyendo-equipo-ia-efectivo',      postId: 'f6b447b3-adc4-493e-b219-ebcebe700322',
    url: u('1651340675491-6fb0bfb5c4ea'),  concept: 'circuit ensamblado: colaboración técnica' },
  { slug: 'prediccion-demanda-machine-learning',  postId: '2a556371-54c0-486a-9cbe-2f9ac3b215c8',
    url: u('1535320903710-d993d3d77d29'),  concept: 'gráficas oscilantes: predicción, curvas' },
  { slug: 'apis-ia-construir-vs-consumir',        postId: '0fca9773-f90a-4c22-a369-2e9996761a2f',
    url: u('1483478550801-ceba5fe50e8e'),  concept: 'cables/conectores: interfaces, ports' },
  { slug: 'tendencias-ia-2026',                   postId: '32f9fa32-50c8-4e4e-ae75-324c530741f9',
    url: u('1551033406-611cf9a28f67'),     concept: 'server rack: horizonte tecnológico' },
];

// ---------- HTTP helpers ----------
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
  return JSON.parse(text).document._id;
}

async function patchCover(postId, assetId) {
  const res = await fetch(
    `https://${SANITY_PROJECT_ID}.api.sanity.io/v${SANITY_API_VER}/data/mutate/${SANITY_DATASET}`,
    {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${SANITY_TOKEN}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        mutations: [{
          patch: {
            id: postId,
            set: {
              coverImage: {
                _type: 'image',
                asset: { _type: 'reference', _ref: assetId },
              },
            },
          },
        }],
      }),
    },
  );
  const text = await res.text();
  if (!res.ok) throw new Error(`Patch failed: ${res.status} ${text}`);
  return JSON.parse(text);
}

async function main() {
  console.log(`\n🎨 Re-homologating ${COVER_MAP.length} post covers (tech genre)\n`);
  const audit = [];

  for (let i = 0; i < COVER_MAP.length; i++) {
    const m = COVER_MAP[i];
    console.log(`[${i + 1}/${COVER_MAP.length}] ${m.slug}`);
    console.log(`  ↳ concept: ${m.concept}`);
    try {
      const assetId = await uploadAsset(m.url, `${m.slug}-tech.jpg`);
      console.log(`  ↳ asset: ${assetId}`);
      await patchCover(m.postId, assetId);
      console.log(`  ✅ updated`);
      audit.push({ slug: m.slug, postId: m.postId, assetId, status: 'ok', concept: m.concept });
    } catch (e) {
      console.error(`  ❌ FAILED: ${e.message}`);
      audit.push({ slug: m.slug, postId: m.postId, status: 'error', error: e.message, sourceUrl: m.url });
    }
  }

  await writeFile('/app/scripts/homologate-covers-v2.audit.json', JSON.stringify(audit, null, 2));
  console.log(`\n✨ Done. Audit: /app/scripts/homologate-covers-v2.audit.json\n`);

  const failed = audit.filter(a => a.status === 'error');
  if (failed.length) {
    console.log(`⚠️  ${failed.length} failures:`);
    failed.forEach(f => console.log(`   - ${f.slug}: ${f.error}`));
  }
}

main().catch((e) => { console.error('💥 Fatal:', e); process.exit(1); });
