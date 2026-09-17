// Publica un post editorial de swaraya en Sanity, con la voz Newsreader
// del pull-quote de Filosofía. Sube el cover image + crea el documento.
//
//   node scripts/publish-editorial-post.mjs
//
// Requiere SANITY_WRITE_TOKEN en env.

import 'dotenv/config';

const PROJECT_ID = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || '9slaxsvf';
const DATASET = process.env.NEXT_PUBLIC_SANITY_DATASET || 'production';
const API_VERSION = process.env.NEXT_PUBLIC_SANITY_API_VERSION || '2024-01-01';
const TOKEN = process.env.SANITY_WRITE_TOKEN;

if (!TOKEN) {
  console.error('❌ Falta SANITY_WRITE_TOKEN en .env');
  process.exit(1);
}

const SITE_ID = '7e9e2930-2cc5-49d2-a832-5431fffb49e3';      // swaraya.ai
const CATEGORY_ID = 'cat-estrategia-liderazgo';               // Estrategia & Liderazgo
const TAG_IDS = [
  '7245c1e0-3a49-4978-bd1a-65c63d594c21',                     // Estrategia
  '4d7b17c9-6a83-41bf-8d70-1fe2e8e416ff',                     // Agentes IA
];

const COVER_URL =
  'https://images.unsplash.com/photo-1721244653757-b76cc4679dfb?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NjA2ODl8MHwxfHNlYXJjaHwyfHxhcmNoaXRlY3R1cmFsJTIwYmx1ZXByaW50fGVufDB8fHxibGFja19hbmRfd2hpdGV8MTc4OTUxNzMwOHww&ixlib=rb-4.1.0&q=85';

// ─────────────────────────────────────────────────────────────
// 1) Subir imagen a Sanity assets
// ─────────────────────────────────────────────────────────────
async function uploadImage() {
  console.log('↑ Descargando cover de Unsplash…');
  const imgRes = await fetch(COVER_URL);
  if (!imgRes.ok) throw new Error(`Unsplash: ${imgRes.status}`);
  const blob = await imgRes.arrayBuffer();

  console.log('↑ Subiendo a Sanity assets…');
  const uploadRes = await fetch(
    `https://${PROJECT_ID}.api.sanity.io/v${API_VERSION}/assets/images/${DATASET}?filename=diseno-sistemas-inteligencia.jpg`,
    {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${TOKEN}`,
        'Content-Type': 'image/jpeg',
      },
      body: Buffer.from(blob),
    },
  );

  if (!uploadRes.ok) {
    const text = await uploadRes.text();
    throw new Error(`Upload failed (${uploadRes.status}): ${text}`);
  }
  const data = await uploadRes.json();
  const assetId = data?.document?._id;
  console.log(`  ✓ Asset creado: ${assetId}`);
  return assetId;
}

// ─────────────────────────────────────────────────────────────
// 2) Portable Text del artículo (con blockquotes para pull-quotes)
// ─────────────────────────────────────────────────────────────
const uid = (i) => `${Date.now().toString(36)}-${i}`;

const P = (i, text, marks = null) => ({
  _key: uid(`p${i}`),
  _type: 'block',
  style: 'normal',
  markDefs: [],
  children: [
    { _key: uid(`s${i}`), _type: 'span', text, marks: marks || [] },
  ],
});

const H2 = (i, text) => ({
  _key: uid(`h${i}`),
  _type: 'block',
  style: 'h2',
  markDefs: [],
  children: [{ _key: uid(`hs${i}`), _type: 'span', text, marks: [] }],
});

const Q = (i, text) => ({
  _key: uid(`q${i}`),
  _type: 'block',
  style: 'blockquote',
  markDefs: [],
  children: [{ _key: uid(`qs${i}`), _type: 'span', text, marks: [] }],
});

// Bloque con emphasis mixto (spans con marks 'em')
const MIXED = (i, parts) => ({
  _key: uid(`m${i}`),
  _type: 'block',
  style: 'normal',
  markDefs: [],
  children: parts.map((p, idx) => ({
    _key: uid(`ms${i}-${idx}`),
    _type: 'span',
    text: p.text,
    marks: p.em ? ['em'] : [],
  })),
});

const body = [
  P(
    1,
    'Diseñar un sistema de inteligencia artificial no es —o no debería ser— una empresa de novedad. Es una disciplina lenta, más cercana al oficio del arquitecto que al del programador. Su primera pregunta nunca es qué puede hacer el modelo, sino qué debe hacer la organización.',
  ),

  P(
    2,
    'En swaraya empezamos cada proyecto con una intuición incómoda: la mayoría de los agentes que se despliegan hoy resuelven problemas que aún no han sido enunciados con precisión. Se automatiza lo visible antes de comprender lo estructural, y el resultado —predecible— es un catálogo de tecnologías en busca de un problema.',
  ),

  Q(3, 'Antes de automatizar, entendemos qué se debe automatizar. Toda arquitectura de inteligencia parte de una hipótesis operativa, no de un modelo.'),

  H2(4, 'La hipótesis como cimiento'),

  P(
    5,
    'Una hipótesis operativa nombra tres cosas: el criterio experto que se ejerce, la evidencia sobre la que se ejerce y el momento en el que la decisión importa. Sin esas tres coordenadas cualquier sistema —por sofisticado que sea— trabajará en el vacío.',
  ),

  MIXED(6, [
    { text: 'Cuando la hipótesis es clara, ' },
    { text: 'el diseño se vuelve casi mecánico', em: true },
    {
      text:
        '. Se identifican los datos que la sostienen, las decisiones que la agotan, los umbrales de reversibilidad. Los modelos entran al final, como se elige un material tras haber trazado un plano.',
    },
  ]),

  H2(7, 'Reversibilidad antes que autonomía'),

  P(
    8,
    'Un sistema que no puede deshacerse tampoco puede ejercer criterio. La reversibilidad —la capacidad humana de intervenir, anular o corregir cada paso— no es una concesión ética: es una propiedad estructural del sistema. Cuando la incorporamos desde el diseño, la conversación cambia. Deja de ser "cuánto puede automatizar el agente" y se convierte en "cuánto criterio se conserva en el flujo".',
  ),

  Q(9, 'La inteligencia artificial extiende el criterio experto. No lo sustituye.'),

  P(
    10,
    'Este principio se traduce en decisiones concretas: cada acción del agente se registra, cada umbral se explicita, cada decisión de negocio queda auditable. Trazabilidad no es un módulo posterior sino la forma en que se piensa el sistema desde el minuto cero.',
  ),

  H2(11, 'La escala como consecuencia, no como meta'),

  P(
    12,
    'Se habla mucho de "escalar la IA" y muy poco de qué significa escalar sin traicionar la hipótesis original. Escalar bien es multiplicar el criterio, no diluirlo. Escalar mal es reproducir un patrón que dejó de tener sentido dos iteraciones antes.',
  ),

  MIXED(13, [
    { text: 'Cada sistema que ponemos en operación llega con una fecha implícita de revisión. No prometemos ' },
    { text: 'permanencia', em: true },
    { text: ' ni ' },
    { text: 'terminación', em: true },
    { text: '; prometemos que el criterio experto que dio origen al agente seguirá siendo el que lo gobierne.' },
  ]),

  H2(14, 'Ningún atajo, ningún espectáculo'),

  P(
    15,
    'La disciplina no es una moral, es un método. Es ordenar la investigación antes que el prompt, la infraestructura antes que la interfaz, la gobernanza antes que la escala. Ese orden —repetido, corregido, defendido— es lo que hace que un sistema envejezca bien.',
  ),

  Q(16, 'La precisión importa más que la impresión inicial. Los sistemas que envejecen bien empezaron por preguntar mejor.'),

  P(
    17,
    'Estas notas son un compromiso interno tanto como una invitación. Si reconocen ustedes un patrón repetitivo en su disciplina, uno donde el criterio experto se ejerce sobre datos que llegan en flujo, ahí vive —muy probablemente— el siguiente agente.',
  ),
];

// ─────────────────────────────────────────────────────────────
// 3) Crear post
// ─────────────────────────────────────────────────────────────
async function createPost(assetId) {
  console.log('✎ Creando post…');
  const now = new Date().toISOString();
  const doc = {
    _type: 'post',
    title: 'Diseñar sistemas de inteligencia: notas sobre método y disciplina',
    slug: { _type: 'slug', current: 'disenar-sistemas-inteligencia-metodo-disciplina' },
    excerpt:
      'Antes de automatizar, entendemos qué se debe automatizar. Cinco notas sobre cómo diseñamos sistemas de IA que envejecen bien: hipótesis, reversibilidad, escala y disciplina.',
    published: true,
    publishedAt: now,
    readingTime: 6,
    site: { _type: 'reference', _ref: SITE_ID },
    category: { _type: 'reference', _ref: CATEGORY_ID },
    tags: TAG_IDS.map((id) => ({ _type: 'reference', _ref: id, _key: `t-${id.slice(0, 6)}` })),
    coverImage: {
      _type: 'image',
      asset: { _type: 'reference', _ref: assetId },
    },
    body,
  };

  const mutRes = await fetch(
    `https://${PROJECT_ID}.api.sanity.io/v${API_VERSION}/data/mutate/${DATASET}`,
    {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${TOKEN}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ mutations: [{ create: doc }] }),
    },
  );

  if (!mutRes.ok) {
    const text = await mutRes.text();
    throw new Error(`Mutate failed (${mutRes.status}): ${text}`);
  }
  const data = await mutRes.json();
  console.log(`  ✓ Post creado con _id: ${data?.results?.[0]?.id}`);
  return data;
}

// ─────────────────────────────────────────────────────────────
// Main
// ─────────────────────────────────────────────────────────────
(async () => {
  try {
    const assetId = await uploadImage();
    await createPost(assetId);
    console.log('\n🎉 Publicado: /blog/disenar-sistemas-inteligencia-metodo-disciplina');
  } catch (err) {
    console.error('\n✖ Error:', err.message);
    process.exit(1);
  }
})();
