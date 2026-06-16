/**
 * OVERHAUL BLOG — Pivote editorial completo del blog Swaraya.
 *
 * Pasos:
 *  1) Crear 5 categorías nuevas (Estrategia & Liderazgo, Casos por industria,
 *     Implementación responsable, Talento & Cultura, Tendencias & Diagnóstico)
 *  2) Re-asignar los 21 posts existentes a las nuevas categorías con nuevos
 *     títulos, slugs, excerpts y fechas distribuidas entre jun-2025 y jun-2026
 *  3) Eliminar las 5 categorías antiguas (solo de swaraya)
 *
 * Run: node scripts/overhaul-blog.mjs
 *
 * Idempotente: si una categoría ya existe (mismo _id determinístico) se
 * reutiliza. Los posts se patchean con `set` así que correr dos veces no
 * duplica nada.
 */

import 'dotenv/config';
import { writeFile } from 'node:fs/promises';

const PID = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const DS  = process.env.NEXT_PUBLIC_SANITY_DATASET;
const VER = process.env.NEXT_PUBLIC_SANITY_API_VERSION;
const TOKEN = process.env.SANITY_WRITE_TOKEN;

if (!TOKEN) throw new Error('Missing SANITY_WRITE_TOKEN');

const SITE_ID = '7e9e2930-2cc5-49d2-a832-5431fffb49e3';

const headers = {
  Authorization: `Bearer ${TOKEN}`,
  'Content-Type': 'application/json',
};

async function sanityFetch(query) {
  const url = `https://${PID}.api.sanity.io/v${VER}/data/query/${DS}?query=${encodeURIComponent(query)}`;
  const res = await fetch(url, { headers });
  if (!res.ok) throw new Error(`Fetch failed: ${res.status} ${await res.text()}`);
  const j = await res.json();
  return j.result;
}

async function sanityMutate(mutations) {
  const res = await fetch(
    `https://${PID}.api.sanity.io/v${VER}/data/mutate/${DS}?returnIds=true&visibility=async`,
    { method: 'POST', headers, body: JSON.stringify({ mutations }) },
  );
  const text = await res.text();
  if (!res.ok) throw new Error(`Mutate failed: ${res.status} ${text}`);
  return JSON.parse(text);
}

// ─────────────────────────────────────────────────────────────
// 1. NUEVAS CATEGORÍAS (IDs fijos para idempotencia)
// ─────────────────────────────────────────────────────────────
const NEW_CATEGORIES = [
  {
    _id: 'cat-estrategia-liderazgo',
    title: 'Estrategia & Liderazgo',
    slug: 'estrategia-liderazgo',
    description: 'Lecturas para CEO, board y dirección general sobre cómo invertir, gobernar y rentabilizar la inteligencia artificial.',
  },
  {
    _id: 'cat-casos-industria',
    title: 'Casos por industria',
    slug: 'casos-por-industria',
    description: 'Aplicaciones reales de IA por sector: banca, retail, manufactura, energía, salud y servicios profesionales.',
  },
  {
    _id: 'cat-implementacion-responsable',
    title: 'Implementación responsable',
    slug: 'implementacion-responsable',
    description: 'Gobernanza, riesgo, cumplimiento y medición. Cómo desplegar IA sin sorpresas reputacionales ni regulatorias.',
  },
  {
    _id: 'cat-talento-cultura',
    title: 'Talento & Cultura',
    slug: 'talento-cultura',
    description: 'Conversaciones de CHRO y dirección: rediseño de puestos, capacidades, change management y cultura operativa.',
  },
  {
    _id: 'cat-tendencias-diagnostico',
    title: 'Tendencias & Diagnóstico',
    slug: 'tendencias-diagnostico',
    description: 'Señales de mercado, lecturas de industria y diagnósticos ejecutivos sobre dónde va la IA y qué exige al negocio.',
  },
];

// ─────────────────────────────────────────────────────────────
// 2. PLAN DE RE-EDICIÓN DE LOS 21 POSTS EXISTENTES
//    (ordenados cronológicamente: el primero será el más antiguo)
// ─────────────────────────────────────────────────────────────
const POSTS_PLAN = [
  // ===== JUNIO 2025 =====
  {
    oldId: 'post-por-que-ia-falla-empresas-grandes-6df0695d',
    title: 'Por qué la IA falla en empresas grandes (y cómo evitarlo)',
    slug: 'por-que-ia-falla-empresas-grandes',
    excerpt: 'Diagnóstico de los patrones estructurales que estancan los proyectos de IA en grandes corporaciones: pilotos eternos, propiedad difusa y métricas equivocadas.',
    category: 'cat-implementacion-responsable',
    publishedAt: '2025-06-12T10:00:00.000Z',
  },
  {
    oldId: 'bebdc6b3-c760-4c03-bd7d-8874bf4801e2',
    title: 'La cultura operativa que sostiene la IA: disciplina, no heroísmo',
    slug: 'cultura-operativa-ia',
    excerpt: 'Las organizaciones que escalan IA con éxito no dependen de individuos brillantes; institucionalizan prácticas, ciclos de revisión y propiedad clara del modelo en producción.',
    category: 'cat-talento-cultura',
    publishedAt: '2025-06-26T10:00:00.000Z',
  },

  // ===== JULIO 2025 =====
  {
    oldId: '0fca9773-f90a-4c22-a369-2e9996761a2f',
    title: 'Construir, comprar o asociarse: la decisión estratégica de IA',
    slug: 'construir-comprar-asociarse-ia',
    excerpt: 'Toda dirección general enfrenta la misma encrucijada con IA: desarrollar capacidades internas, contratar plataformas o entrar en alianzas. Un marco para decidir sin atajos.',
    category: 'cat-estrategia-liderazgo',
    publishedAt: '2025-07-09T10:00:00.000Z',
  },
  {
    oldId: '6cf76d2c-317c-41d9-9963-e9f6dc26df50',
    title: 'Gobernanza de IA: el marco mínimo para operar con confianza',
    slug: 'gobernanza-ia-marco-minimo',
    excerpt: 'Antes de regular, antes de auditar, antes de comunicar: lo que cualquier organización necesita tener resuelto para que su IA no se vuelva un pasivo silencioso.',
    category: 'cat-implementacion-responsable',
    publishedAt: '2025-07-23T10:00:00.000Z',
  },

  // ===== AGOSTO 2025 =====
  {
    oldId: 'f6b447b3-adc4-493e-b219-ebcebe700322',
    title: 'Estructurar un equipo de IA que sobreviva al cambio de CEO',
    slug: 'estructurar-equipo-ia',
    excerpt: 'Los equipos de IA que dependen del patrocinio personal del primer ejecutivo no escalan. Cómo diseñar una función de IA que sobreviva ciclos políticos y de mercado.',
    category: 'cat-estrategia-liderazgo',
    publishedAt: '2025-08-06T10:00:00.000Z',
  },
  {
    oldId: 'post-evals-sistemas-llm-produccion-fdce0a74',
    title: 'Cómo medir el desempeño real de la IA antes de aprobar producción',
    slug: 'medir-desempeno-ia-produccion',
    excerpt: 'Las demos venden, las pruebas piloto convencen, y los modelos fallan en producción. Un protocolo de evaluación que el comité de IA puede exigir antes de cada lanzamiento.',
    category: 'cat-implementacion-responsable',
    publishedAt: '2025-08-20T10:00:00.000Z',
  },

  // ===== SEPTIEMBRE 2025 =====
  {
    oldId: '2db7a284-89dc-4c2e-ba0c-ea0bff9c469a',
    title: 'Lenguaje natural en banca, seguros y servicios profesionales',
    slug: 'lenguaje-natural-banca-seguros',
    excerpt: 'El procesamiento de lenguaje ya no es un experimento de I+D. Tres sectores con margen y volumen documental muestran dónde y cómo está moviendo realmente la aguja.',
    category: 'cat-casos-industria',
    publishedAt: '2025-09-04T10:00:00.000Z',
  },
  {
    oldId: 'post-metricas-exito-proyectos-ia-c9475920',
    title: 'Las métricas que el comité necesita ver en proyectos de IA',
    slug: 'metricas-comite-proyectos-ia',
    excerpt: 'Accuracy es una métrica de equipo técnico. La dirección necesita otra capa: adopción, impacto en ingreso, riesgo evitado y costo unitario. Cómo construir ese tablero.',
    category: 'cat-estrategia-liderazgo',
    publishedAt: '2025-09-18T10:00:00.000Z',
  },

  // ===== OCTUBRE 2025 =====
  {
    oldId: 'b605cacd-c9bc-443b-b804-eec45303f9c0',
    title: 'Visión artificial en operaciones: logística, manufactura y energía',
    slug: 'vision-artificial-operaciones',
    excerpt: 'Inspección de calidad, gestión de inventario, seguridad industrial. La visión artificial es la tecnología con ROI más predecible para operaciones intensivas en activos.',
    category: 'cat-casos-industria',
    publishedAt: '2025-10-02T10:00:00.000Z',
  },
  {
    oldId: 'fc096221-cd51-4555-9290-d2d37bdd769c',
    title: 'Automatización inteligente: del recorte de costos al rediseño de procesos',
    slug: 'automatizacion-rediseno-procesos',
    excerpt: 'RPA cumplió su ciclo. La automatización con IA exige rediseñar los procesos desde cero, no acelerar los existentes. Una conversación de COO, no de un proyecto puntual.',
    category: 'cat-talento-cultura',
    publishedAt: '2025-10-16T10:00:00.000Z',
  },

  // ===== NOVIEMBRE 2025 =====
  {
    oldId: '2a556371-54c0-486a-9cbe-2f9ac3b215c8',
    title: 'Predicción de demanda: ventaja competitiva en retail y consumo',
    slug: 'prediccion-demanda-retail',
    excerpt: 'En categorías de margen estrecho, dos puntos de mejora en pronóstico mueven el resultado anual. Cómo lo están haciendo las cadenas que sí lograron implementarlo.',
    category: 'cat-casos-industria',
    publishedAt: '2025-11-13T10:00:00.000Z',
  },

  // ===== DICIEMBRE 2025 =====
  {
    oldId: 'dba06546-f4d8-4a9c-ba38-9dfc650b9aef',
    title: 'Modelos de lenguaje en la operación: casos reales por sector',
    slug: 'modelos-lenguaje-operacion',
    excerpt: 'Más allá del chatbot de atención: contratos, informes, conciliaciones, expedientes médicos. Dónde los LLMs están entrando hoy a la operación de empresas tradicionales.',
    category: 'cat-casos-industria',
    publishedAt: '2025-12-04T10:00:00.000Z',
  },
  {
    oldId: '4fdf8304-f8a4-429e-aa19-89bb4bcdac23',
    title: 'Datos descentralizados: el modelo operativo para grupos empresariales',
    slug: 'datos-descentralizados-grupos',
    excerpt: 'Los holdings con múltiples unidades operativas no necesitan un data lake central; necesitan disciplina federada. Un modelo organizativo antes que tecnológico.',
    category: 'cat-casos-industria',
    publishedAt: '2025-12-18T10:00:00.000Z',
  },

  // ===== ENERO 2026 =====
  {
    oldId: 'f6276856-70bf-4a42-a63f-796c4d370f94',
    title: 'Rediseñar puestos con IA generativa: una conversación del CHRO',
    slug: 'redisenar-puestos-ia-generativa',
    excerpt: 'La IA generativa no elimina puestos: reformula descripciones, capacidades requeridas y bandas salariales. La función de capital humano necesita liderar esa conversación.',
    category: 'cat-talento-cultura',
    publishedAt: '2026-01-15T10:00:00.000Z',
  },
  {
    oldId: 'post-gobernanza-ia-instituciones-3e97dfca',
    title: 'Gobernanza de IA en instituciones: estructura antes que tecnología',
    slug: 'gobernanza-ia-instituciones',
    excerpt: 'Las instituciones públicas y reguladas no pueden importar el playbook de Silicon Valley. La gobernanza de IA empieza por estructura, mandato y rendición de cuentas.',
    category: 'cat-implementacion-responsable',
    publishedAt: '2026-01-29T10:00:00.000Z',
  },

  // ===== FEBRERO 2026 =====
  {
    oldId: '39c2a07b-bdeb-4888-818c-3bd830e53ec3',
    title: 'El ROI de la IA: marco financiero para el comité ejecutivo',
    slug: 'roi-ia-comite-ejecutivo',
    excerpt: 'Reducción de costos es una de cuatro palancas, no la única. Un marco que el CFO puede defender frente al board para evaluar inversión, retorno y riesgo en IA.',
    category: 'cat-estrategia-liderazgo',
    publishedAt: '2026-02-12T10:00:00.000Z',
  },
  {
    oldId: 'b7aa645b-5690-412f-9aad-8c77f83ec731',
    title: 'Del piloto al portafolio: cómo escalar IA con disciplina financiera',
    slug: 'piloto-al-portafolio-ia',
    excerpt: 'El problema no es lanzar pilotos; es decidir cuáles matar, cuáles escalar y cuáles consolidar. Cómo gobernar un portafolio de iniciativas de IA como gobierna activos.',
    category: 'cat-estrategia-liderazgo',
    publishedAt: '2026-02-26T10:00:00.000Z',
  },

  // ===== MARZO 2026 =====
  {
    oldId: 'd386b751-1b4b-470a-9ca0-285ab7198050',
    title: 'Agentes autónomos: del hype al modelo operativo',
    slug: 'agentes-autonomos-modelo-operativo',
    excerpt: 'Los agentes prometen ejecución autónoma de procesos. Antes de implementarlos, conviene preguntarse qué nivel de autonomía tolera realmente la operación y el negocio.',
    category: 'cat-tendencias-diagnostico',
    publishedAt: '2026-03-19T10:00:00.000Z',
  },

  // ===== ABRIL 2026 =====
  {
    oldId: 'post-cio-ia-agentica-7d9d903f',
    title: 'El nuevo mandato del CIO ante la IA agéntica',
    slug: 'nuevo-mandato-cio-ia-agentica',
    excerpt: 'Cuando los sistemas dejan de asistir y comienzan a decidir, el CIO se convierte en custodio de un nuevo tipo de identidad operativa. Las preguntas que el board ya está haciendo.',
    category: 'cat-tendencias-diagnostico',
    publishedAt: '2026-04-16T10:00:00.000Z',
  },

  // ===== MAYO 2026 =====
  {
    oldId: 'post-rag-vs-fine-tuning-cuando-usar-cada-uno-e0c8c389',
    title: 'Construir capacidades propias de IA: cuándo tiene sentido',
    slug: 'construir-capacidades-propias-ia',
    excerpt: 'Existe un punto donde dejar de consumir modelos como servicio y empezar a construir capacidades propias deja de ser un capricho técnico y se vuelve una decisión estratégica.',
    category: 'cat-tendencias-diagnostico',
    publishedAt: '2026-05-14T10:00:00.000Z',
  },

  // ===== JUNIO 2026 =====
  {
    oldId: '32f9fa32-50c8-4e4e-ae75-324c530741f9',
    title: 'Diagnóstico 2026: las cinco señales de mercado que el board debe leer',
    slug: 'diagnostico-2026-board',
    excerpt: 'No es un listado de tendencias. Son cinco lecturas estructurales sobre cómo la IA está rediseñando capital, talento y poder competitivo, y qué exige a la dirección general.',
    category: 'cat-tendencias-diagnostico',
    publishedAt: '2026-06-04T10:00:00.000Z',
  },
];

// IDs de las categorías viejas (solo las usadas por swaraya)
const OLD_CATEGORY_IDS_TO_DELETE = [
  '2098f8bd-3e08-40aa-ad8f-462b4432ba08', // Estrategia de IA
  '286ecf29-183a-4c30-bc65-911dabef0e7a', // Automatización Inteligente
  'd5247705-77df-46b4-982a-a3912ff45803', // Tendencias (null)
  '6d99f079-b90a-483a-ae9b-435179bf2811', // Casos de Uso
  'a7b25c9f-0894-4d15-9576-d4ce03f30242', // Arquitectura
];

// ─────────────────────────────────────────────────────────────
// MAIN
// ─────────────────────────────────────────────────────────────
async function main() {
  const audit = { steps: [] };

  // Verificación: ¿tenemos los 21 posts?
  if (POSTS_PLAN.length !== 21) {
    throw new Error(`Plan tiene ${POSTS_PLAN.length} posts, se esperaban 21.`);
  }

  // ===== 1. Crear categorías nuevas =====
  console.log('\n📂 Creando 5 categorías nuevas…');
  const catMutations = NEW_CATEGORIES.map((c) => ({
    createOrReplace: {
      _id: c._id,
      _type: 'category',
      title: c.title,
      slug: { _type: 'slug', current: c.slug },
      description: c.description,
      site: { _type: 'reference', _ref: SITE_ID },
    },
  }));
  const catRes = await sanityMutate(catMutations);
  console.log(`  ✅ ${catRes.results.length} categorías procesadas.`);
  audit.steps.push({ step: 'createCategories', count: catRes.results.length });

  // ===== 2. Patch a los 21 posts =====
  console.log('\n📝 Re-editando 21 posts…');
  const postMutations = POSTS_PLAN.map((p) => ({
    patch: {
      id: p.oldId,
      set: {
        title: p.title,
        slug: { _type: 'slug', current: p.slug },
        excerpt: p.excerpt,
        publishedAt: p.publishedAt,
        published: true,
        category: { _type: 'reference', _ref: p.category },
      },
    },
  }));
  // Mutar en lotes de 10 para evitar 413
  const batches = [];
  for (let i = 0; i < postMutations.length; i += 10) {
    batches.push(postMutations.slice(i, i + 10));
  }
  let patched = 0;
  for (const batch of batches) {
    const r = await sanityMutate(batch);
    patched += r.results.length;
    console.log(`  ↳ batch ${patched}/${postMutations.length}`);
  }
  audit.steps.push({ step: 'patchPosts', count: patched });

  // ===== 3. Eliminar categorías antiguas =====
  console.log('\n🗑  Eliminando categorías antiguas…');
  const delMutations = OLD_CATEGORY_IDS_TO_DELETE.map((id) => ({ delete: { id } }));
  try {
    const delRes = await sanityMutate(delMutations);
    console.log(`  ✅ ${delRes.results.length} categorías eliminadas.`);
    audit.steps.push({ step: 'deleteOldCategories', count: delRes.results.length });
  } catch (e) {
    console.log(`  ⚠️  No se pudieron borrar algunas categorías: ${e.message}`);
    audit.steps.push({ step: 'deleteOldCategories', error: e.message });
  }

  // ===== Verificación final =====
  console.log('\n🔍 Verificación final…');
  const finalPosts = await sanityFetch(
    `*[_type=="post" && site->domain=="swaraya.ai" && !(_id match "drafts.*")]{ title, "slug": slug.current, publishedAt, "category": category->title } | order(publishedAt asc)`
  );
  console.log(`Total posts: ${finalPosts.length}`);
  for (const p of finalPosts) {
    console.log(`  ${p.publishedAt?.slice(0,10)}  [${p.category}]  ${p.title}`);
  }
  audit.finalPosts = finalPosts;

  await writeFile('/app/scripts/overhaul-blog.audit.json', JSON.stringify(audit, null, 2));
  console.log('\n✨ Listo. Audit en /app/scripts/overhaul-blog.audit.json\n');
}

main().catch((e) => {
  console.error('💥 Fatal:', e);
  process.exit(1);
});
