/**
 * Generates 6 editorial blog posts for swaraya.ai and publishes them to Sanity.
 * 
 * Pipeline:
 *   1) Download cover images from Unsplash/Pexels
 *   2) Upload each cover to Sanity Asset Store
 *   3) Generate article body with OpenAI (Emergent proxy) as structured JSON
 *   4) Convert structured JSON → Portable Text blocks
 *   5) Create post documents in Sanity via /data/mutate
 * 
 * Run: node scripts/generate-posts.mjs
 */

import 'dotenv/config';
import { randomUUID } from 'node:crypto';
import { writeFile } from 'node:fs/promises';

// ---------- Config ----------
const SANITY_PROJECT_ID = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || '9slaxsvf';
const SANITY_DATASET    = process.env.NEXT_PUBLIC_SANITY_DATASET    || 'production';
const SANITY_API_VER    = process.env.NEXT_PUBLIC_SANITY_API_VERSION || '2024-01-01';
const SANITY_TOKEN      = process.env.SANITY_WRITE_TOKEN;

const OPENAI_KEY  = process.env.OPENAI_API_KEY;
const OPENAI_BASE = process.env.OPENAI_BASE_URL || 'https://api.openai.com/v1';
const OPENAI_MODEL = process.env.OPENAI_MODEL || 'gpt-4o-mini';

const SITE_ID = '7e9e2930-2cc5-49d2-a832-5431fffb49e3'; // swaraya.ai

const CATEGORIES = {
  estrategia:     '2098f8bd-3e08-40aa-ad8f-462b4432ba08', // Estrategia de IA
  automatizacion: '286ecf29-183a-4c30-bc65-911dabef0e7a', // Automatización Inteligente
  casos:          '6d99f079-b90a-483a-ae9b-435179bf2811', // Casos de Uso
  arquitectura:   'a7b25c9f-0894-4d15-9576-d4ce03f30242', // Arquitectura
  tendencias:     'd5247705-77df-46b4-982a-a3912ff45803', // Tendencias
};

const TAGS = {
  llms:           '34c9daae-d9f1-4ec9-a35c-81dff91df921',
  agentes:        '4d7b17c9-6a83-41bf-8d70-1fe2e8e416ff',
  transformacion: '66a8c35f-d191-42ca-85ad-0566a42c6395',
  ml:             '6ddf315e-c582-4a82-98ec-d4af50b00d3c',
  estrategia:     '7245c1e0-3a49-4978-bd1a-65c63d594c21',
  nlp:            '9316ec0d-e0f7-486e-a1cb-72f45fd10c91',
  datos:          'b12b23e9-26a4-4971-9e2c-fd6fe5ec36c1',
  mlops:          'b2ee71c9-7cf3-4ddc-a116-bc79bc2dfe75',
  productividad:  'f061e4d4-14cb-47ab-b7aa-bcbffe08c863',
};

// ---------- Plan de posts ----------
const POSTS_PLAN = [
  {
    slug: 'gobernanza-ia-instituciones',
    title: 'Gobernanza de IA en instituciones: estructura antes que tecnología',
    topic: 'Cómo diseñar marcos de gobernanza de IA en organizaciones medianas y grandes. Cubre: comité de IA, principios, taxonomía de riesgos, ciclo de revisión, gating de despliegue, accountability humana, alineación con marcos como NIST AI RMF y EU AI Act sin convertir el post en un manual regulatorio.',
    category: CATEGORIES.estrategia,
    tags: [TAGS.estrategia, TAGS.transformacion],
    readingTime: 9,
    cover: 'https://images.unsplash.com/photo-1563441082154-be8c9b37f115?w=1920&q=85',
  },
  {
    slug: 'rag-vs-fine-tuning-cuando-usar-cada-uno',
    title: 'RAG vs Fine-tuning: cuándo usar cada uno',
    topic: 'Análisis técnico sobre cuándo conviene RAG, cuándo fine-tuning, y cuándo combinar ambos. Cubre: latencia, costo, frescura del conocimiento, control de comportamiento, evals, costos operativos, complejidad del pipeline. Audiencia: CTOs y arquitectos.',
    category: CATEGORIES.arquitectura,
    tags: [TAGS.llms, TAGS.mlops],
    readingTime: 11,
    cover: 'https://images.unsplash.com/photo-1483959651481-dc75b89291f1?w=1920&q=85',
  },
  {
    slug: 'metricas-exito-proyectos-ia',
    title: 'Métricas que importan en proyectos de IA',
    topic: 'Marco para definir métricas de éxito en proyectos de IA empresarial. Diferencia entre métricas de modelo (accuracy, F1), métricas de producto (engagement, adopción) y métricas de negocio (ahorro, ingreso, riesgo). Habla del riesgo de optimizar la métrica equivocada (Goodhart). Incluye ejemplos.',
    category: CATEGORIES.estrategia,
    tags: [TAGS.estrategia, TAGS.datos],
    readingTime: 8,
    cover: 'https://images.unsplash.com/photo-1493397212122-2b85dda8106b?w=1920&q=85',
  },
  {
    slug: 'cio-ia-agentica',
    title: 'El nuevo rol del CIO ante la IA agéntica',
    topic: 'Cómo cambia la responsabilidad del CIO cuando la organización pasa de "IA como copiloto" a "IA como agente autónomo". Cubre: redefinición de identidad y permisos no-humanos, observabilidad de agentes, contratos de SLO con sistemas autónomos, manejo de incidentes, contención de blast radius.',
    category: CATEGORIES.tendencias,
    tags: [TAGS.agentes, TAGS.estrategia],
    readingTime: 10,
    cover: 'https://images.unsplash.com/photo-1462556791646-c201b8241a94?w=1920&q=85',
  },
  {
    slug: 'por-que-ia-falla-empresas-grandes',
    title: 'Por qué la IA falla en empresas grandes (y cómo evitarlo)',
    topic: 'Diagnóstico de los patrones que hacen fracasar proyectos de IA en organizaciones de más de 5000 empleados: pilotos eternos, ausencia de propietario operativo, datos sin gobernanza, dependencia de héroes técnicos, métricas erróneas, falta de integración con procesos existentes. Es un post crítico pero constructivo, no sermón.',
    category: CATEGORIES.casos,
    tags: [TAGS.transformacion, TAGS.estrategia],
    readingTime: 12,
    cover: 'https://images.pexels.com/photos/6159262/pexels-photo-6159262.jpeg?w=1920&q=85',
  },
  {
    slug: 'evals-sistemas-llm-produccion',
    title: 'Diseño de evals para sistemas LLM en producción',
    topic: 'Cómo diseñar suites de evaluación continua para LLMs en producción más allá de los benchmarks académicos. Cubre: golden datasets, LLM-as-judge, evals adversariales, regression testing, métricas de calidad cualitativa, integración en CI/CD. Audiencia técnica.',
    category: CATEGORIES.arquitectura,
    tags: [TAGS.llms, TAGS.mlops],
    readingTime: 10,
    cover: 'https://images.pexels.com/photos/37632839/pexels-photo-37632839.jpeg?w=1920&q=85',
  },
];

// ---------- Helpers ----------
const headers = {
  Authorization: `Bearer ${SANITY_TOKEN}`,
  'Content-Type': 'application/json',
};

async function sanityMutate(mutations) {
  const res = await fetch(
    `https://${SANITY_PROJECT_ID}.api.sanity.io/v${SANITY_API_VER}/data/mutate/${SANITY_DATASET}?returnIds=true`,
    { method: 'POST', headers, body: JSON.stringify({ mutations }) },
  );
  const text = await res.text();
  if (!res.ok) throw new Error(`Sanity mutate failed: ${res.status} ${text}`);
  return JSON.parse(text);
}

async function uploadAsset(url, filename) {
  console.log(`  ↳ downloading ${url.slice(0, 70)}…`);
  const imgRes = await fetch(url);
  if (!imgRes.ok) throw new Error(`Image download failed: ${imgRes.status}`);
  const arrBuf = await imgRes.arrayBuffer();
  console.log(`  ↳ uploading to Sanity assets (${(arrBuf.byteLength/1024).toFixed(0)} KB)…`);
  const uploadRes = await fetch(
    `https://${SANITY_PROJECT_ID}.api.sanity.io/v${SANITY_API_VER}/assets/images/${SANITY_DATASET}?filename=${encodeURIComponent(filename)}`,
    {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${SANITY_TOKEN}`,
        'Content-Type': 'image/jpeg',
      },
      body: arrBuf,
    },
  );
  const text = await uploadRes.text();
  if (!uploadRes.ok) throw new Error(`Asset upload failed: ${uploadRes.status} ${text}`);
  const data = JSON.parse(text);
  return data.document._id; // image-xxxxx-WxH-jpg
}

// ---------- OpenAI ----------
async function generateArticleJSON(plan) {
  const sys = `Eres un editor senior de una agencia de inteligencia artificial llamada swaraya. Escribes en español neutro, voz institucional, sobria, técnica pero accesible para líderes ejecutivos. NO usas exclamaciones, NO usas emojis, NO usas frases promocionales tipo "revolucionario" o "el futuro es ahora". Escribes como The Economist o Stratechery — analítico, con autoridad, con matices.

Tu output es SIEMPRE JSON puro (sin markdown fences) con esta estructura:
{
  "excerpt": "<150-200 caracteres, gancho conceptual, sin clickbait>",
  "intro": "<párrafo de apertura de 80-120 palabras, conceptual, sin saludos>",
  "sections": [
    {
      "h2": "<título de sección>",
      "blocks": [
        { "type": "p", "text": "<párrafo>" },
        { "type": "h3", "text": "<subtítulo opcional>" },
        { "type": "p", "text": "<...>" },
        { "type": "ul", "items": ["<bullet>", "<bullet>"] },
        { "type": "blockquote", "text": "<cita o aforismo conceptual>" }
      ]
    }
  ],
  "conclusion": "<párrafo de cierre de 80-120 palabras que sintetice, no resuma>"
}

Reglas:
- 4 a 6 sections máximo
- Cada sección tiene 2-4 párrafos
- Usa h3 dentro de h2 cuando ayuda a estructurar (no obligatorio)
- Listas (ul) solo cuando aportan claridad, no por adornar
- blockquote máximo una por artículo, opcional
- Los textos son densos pero legibles, no usar frases huecas
- Sin disclaimers, sin "en este artículo veremos", entra directo al fondo
- No menciones marcas específicas salvo OpenAI/Anthropic/Google si vienen al caso técnicamente`;

  const user = `Escribe un artículo editorial para swaraya.ai.

TÍTULO: ${plan.title}
TEMA Y SCOPE: ${plan.topic}

Objetivo: ${plan.readingTime} minutos de lectura aproximada. Devuelve SOLO el JSON, nada más.`;

  const res = await fetch(`${OPENAI_BASE}/chat/completions`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${OPENAI_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      model: OPENAI_MODEL,
      messages: [
        { role: 'system', content: sys },
        { role: 'user', content: user },
      ],
      temperature: 0.7,
      response_format: { type: 'json_object' },
    }),
  });

  if (!res.ok) {
    const t = await res.text();
    throw new Error(`OpenAI failed: ${res.status} ${t}`);
  }
  const data = await res.json();
  const content = data.choices[0].message.content;
  return JSON.parse(content);
}

// ---------- Structured JSON → Portable Text ----------
function key() { return Math.random().toString(36).slice(2, 10); }

function textBlock(style, text) {
  return {
    _key: key(),
    _type: 'block',
    style,
    markDefs: [],
    children: [{ _key: key(), _type: 'span', marks: [], text }],
  };
}

function bulletBlock(text) {
  return {
    _key: key(),
    _type: 'block',
    style: 'normal',
    listItem: 'bullet',
    level: 1,
    markDefs: [],
    children: [{ _key: key(), _type: 'span', marks: [], text }],
  };
}

function toPortableText(article) {
  const blocks = [];
  blocks.push(textBlock('normal', article.intro));

  for (const section of article.sections || []) {
    blocks.push(textBlock('h2', section.h2));
    for (const b of section.blocks || []) {
      switch (b.type) {
        case 'h3':
          blocks.push(textBlock('h3', b.text));
          break;
        case 'p':
          blocks.push(textBlock('normal', b.text));
          break;
        case 'ul':
          for (const item of b.items || []) blocks.push(bulletBlock(item));
          break;
        case 'blockquote':
          blocks.push(textBlock('blockquote', b.text));
          break;
        default:
          if (b.text) blocks.push(textBlock('normal', b.text));
      }
    }
  }

  blocks.push(textBlock('h2', 'Síntesis'));
  blocks.push(textBlock('normal', article.conclusion));
  return blocks;
}

// ---------- Build & publish ----------
function buildPostDoc({ plan, assetId, body, excerpt }) {
  // Stagger publishedAt going slightly into the past so they appear in order
  const idx = POSTS_PLAN.indexOf(plan);
  const date = new Date();
  date.setDate(date.getDate() - idx * 3); // 3 days apart, newest = plan 0
  return {
    _type: 'post',
    _id: `post-${plan.slug}-${randomUUID().slice(0, 8)}`,
    title: plan.title,
    slug: { _type: 'slug', current: plan.slug },
    excerpt,
    published: true,
    publishedAt: date.toISOString(),
    readingTime: plan.readingTime,
    site: { _type: 'reference', _ref: SITE_ID },
    category: { _type: 'reference', _ref: plan.category },
    tags: plan.tags.map((tagId) => ({
      _key: key(),
      _type: 'reference',
      _ref: tagId,
    })),
    coverImage: {
      _type: 'image',
      asset: { _type: 'reference', _ref: assetId },
    },
    body,
  };
}

// ---------- Main ----------
async function main() {
  if (!SANITY_TOKEN) throw new Error('Missing SANITY_WRITE_TOKEN in env');
  if (!OPENAI_KEY)   throw new Error('Missing OPENAI_API_KEY in env');

  console.log(`\n🌱 Generating ${POSTS_PLAN.length} posts for swaraya.ai\n`);
  const audit = [];

  for (let i = 0; i < POSTS_PLAN.length; i++) {
    const plan = POSTS_PLAN[i];
    console.log(`\n[${i + 1}/${POSTS_PLAN.length}] ${plan.title}`);

    try {
      console.log('  ↳ uploading cover…');
      const assetId = await uploadAsset(plan.cover, `${plan.slug}.jpg`);
      console.log(`  ↳ asset id: ${assetId}`);

      console.log('  ↳ generating article with OpenAI…');
      const article = await generateArticleJSON(plan);
      const excerpt = (article.excerpt || '').slice(0, 220);
      const body = toPortableText(article);

      console.log(`  ↳ body has ${body.length} portable-text blocks, excerpt: "${excerpt.slice(0, 80)}…"`);

      const doc = buildPostDoc({ plan, assetId, body, excerpt });
      const result = await sanityMutate([{ create: doc }]);
      console.log(`  ✅ created ${doc._id}`);
      audit.push({ slug: plan.slug, id: doc._id, title: plan.title, assetId });
    } catch (e) {
      console.error(`  ❌ FAILED: ${e.message}`);
      audit.push({ slug: plan.slug, error: e.message });
    }
  }

  await writeFile('/app/scripts/generated-posts.audit.json', JSON.stringify(audit, null, 2));
  console.log('\n✨ Done. Audit log at /app/scripts/generated-posts.audit.json\n');
}

main().catch((e) => {
  console.error('\n💥 Fatal:', e);
  process.exit(1);
});
