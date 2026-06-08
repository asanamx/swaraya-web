// Next.js Route Handler — Sanity GROQ proxy.
// Permite ejecutar queries GROQ desde el browser sin depender de la
// configuración de CORS de Sanity (todas las requests salen del servidor).
//
// GET  /api/sanity/query?query=<groq>&params=<json>
// POST /api/sanity/query  { query, params }
//
// Funciona en preview de Emergent y en producción de Vercel.

export const runtime = 'nodejs';
// La query se sirve fresca; el cache de Sanity CDN ya es agresivo en su lado.
export const dynamic = 'force-dynamic';

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || '9slaxsvf';
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || 'production';
const apiVersion = process.env.NEXT_PUBLIC_SANITY_API_VERSION || '2024-01-01';

function buildUrl(query, params) {
  const url = new URL(`https://${projectId}.apicdn.sanity.io/v${apiVersion}/data/query/${dataset}`);
  url.searchParams.set('query', query);
  if (params && typeof params === 'object') {
    for (const [k, v] of Object.entries(params)) {
      // GROQ params API: $key=value (JSON-encoded string values)
      url.searchParams.set(`$${k}`, JSON.stringify(v));
    }
  }
  return url.toString();
}

async function runQuery(query, params) {
  if (!query || typeof query !== 'string') {
    return Response.json({ error: 'query is required' }, { status: 400 });
  }
  try {
    const upstream = await fetch(buildUrl(query, params), { cache: 'no-store' });
    const text = await upstream.text();
    return new Response(text, {
      status: upstream.status,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (err) {
    console.error('Sanity proxy error:', err);
    return Response.json({ error: 'Sanity proxy failed' }, { status: 502 });
  }
}

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get('query');
  let params = {};
  try {
    const raw = searchParams.get('params');
    if (raw) params = JSON.parse(raw);
  } catch {
    params = {};
  }
  return runQuery(query, params);
}

export async function POST(request) {
  let body = {};
  try {
    body = await request.json();
  } catch {
    body = {};
  }
  return runQuery(body?.query, body?.params || {});
}
