# Stack Estándar — Proyectos Web en Vercel

> Plantilla reusable derivada de los proyectos **swaraya.ai** y **estrattica**
> (originalmente FastAPI + React, migrados a Next.js nativo full-stack).
> Esta es la base para nuevos proyectos en Emergent → GitHub → Vercel.

---

## 🏗️ Arquitectura

**Next.js nativo full-stack** — sin backend separado. La app vive en una sola
carpeta, en la **raíz del repo** (sin `frontend/` envolvente).

```
mi-proyecto/
├── src/
│   ├── app/
│   │   ├── layout.js              # metadata global, fonts, providers
│   │   ├── page.js                # home one-page
│   │   ├── opengraph-image.js     # OG image dinámica (next/og)
│   │   ├── api/                   # endpoints serverless = "backend"
│   │   │   └── [feature]/route.js # ej: /api/chat/message, /api/contact
│   │   └── [otras-rutas]/page.js  # /blog, /privacidad, etc.
│   ├── components/                # UI components
│   ├── lib/                       # helpers, clientes de servicios externos
│   └── views/                     # vistas grandes / page-level
├── public/                        # estáticos (logos, og fallback, favicons)
├── package.json
├── next.config.js
├── tailwind.config.js
├── .npmrc                         # legacy-peer-deps=true (crítico)
├── jsconfig.json                  # alias @/* → src/*
└── vercel.json                    # { "framework": "nextjs" }
```

---

## 🛠️ Tecnologías core

| Capa | Tecnología | Versión |
|---|---|---|
| Framework | Next.js (App Router) | **16.x** |
| React | React + ReactDOM | **19.x** |
| Lenguaje | JavaScript (no TS, más simple/rápido para MVP) | ES2022 |
| Estilos | Tailwind CSS | **3.4.x** |
| Componentes UI | shadcn/ui sobre Radix | latest |
| Íconos | lucide-react | latest |
| Package manager | Yarn 1.x classic | 1.22.x |
| Node runtime | 20.x en Vercel | 20 |

---

## 🧩 Servicios externos (intercambiables)

| Necesidad | Servicio elegido | Por qué |
|---|---|---|
| CMS / Blog | Sanity (dataset público) | Free tier amplio, gran DX, multi-site |
| LLM / Chat | OpenAI directo (`gpt-4o-mini`) | Barato y bueno, key propia |
| DB transaccional (si aplica) | Supabase (PostgreSQL gestionado) | Free tier sólido, SDK simple |
| Email transaccional | Resend | Next-friendly, free tier |
| Hosting | Vercel | Auto-deploy desde GitHub, SSL, CDN |
| Dominio + DNS | cPanel del registrar (jellyfish/etc.) | A record a Vercel `76.76.21.21` |

> **Regla:** NO MongoDB. NO FastAPI. NO backend Python.
> Toda la lógica de servidor va en `src/app/api/*/route.js` como Route
> Handlers de Next.js.

---

## 🔐 Patrón para integraciones con problemas de CORS

Si un SDK del servicio (ej. `@sanity/client`) corre en el browser y el
servicio bloquea por CORS, se crea un **proxy server-side** en
`src/app/api/[servicio]/route.js`. El cliente llama al proxy local; el
proxy llama al servicio real desde el server.

Ejemplo aplicado en swaraya: `src/app/api/sanity/query/route.js` reenvía
queries GROQ.

---

## 🌐 Variables de entorno (convención)

**Públicas** (browser puede verlas — solo info NO sensible):
```
NEXT_PUBLIC_SANITY_PROJECT_ID
NEXT_PUBLIC_SANITY_DATASET
NEXT_PUBLIC_SANITY_API_VERSION
```

**Privadas** (solo server):
```
OPENAI_API_KEY              # key propia, no Emergent
OPENAI_MODEL=gpt-4o-mini
SUPABASE_URL
SUPABASE_ANON_KEY
SUPABASE_SERVICE_ROLE_KEY
RESEND_API_KEY
```

> ⚠️ Las keys **siempre** en el dashboard de Vercel, **nunca** en código ni
> en `.env` commiteado. El `.env` solo para dev local y va al `.gitignore`.

---

## 📋 Configuración crítica para Vercel

### `.npmrc` en la raíz (obligatorio)

```
legacy-peer-deps=true
```

Sin esto, npm en Vercel falla con conflictos de peer dependencies
(ej. `react-day-picker` vs `date-fns@4`). Yarn lo tolera, npm no.

### `yarn.lock` debe estar commiteado al repo

Si falta, Vercel cae a npm y aplica el `.npmrc` de arriba como rescate.
Con `yarn.lock` presente, Vercel usa yarn directamente.

### `next.config.js`

```js
const path = require('path');
module.exports = {
  reactStrictMode: true,
  turbopack: { root: __dirname },
  // Solo si usas preview de Emergent (no afecta producción):
  allowedDevOrigins: [
    '*.preview.emergentagent.com',
    '*.preview.emergentcf.cloud',
  ],
};
```

### Vercel project settings

- **Framework Preset:** Next.js (auto)
- **Root Directory:** `./` (NO usar `frontend/`)
- **Application Preset:** Next.js (NO "Services")
- Build / Install / Output: todo en default

---

## 🎨 Convenciones de diseño / SEO

1. **OG image dinámica** con `next/og` en `src/app/opengraph-image.js`
   (1200×630, runtime `nodejs` si necesitas leer assets locales).
2. **Metadata API** de Next.js para `<head>` (no `next/head` legacy).
3. **Fonts** vía `next/font/google` para self-hosting automático.
4. **Dark mode dominante** (`#05060A` base, acento cyan `#7AC4E0`).
5. **Branding en minúsculas** cuando la marca lo permita
   (ej. *swaraya*, no *Swaraya*).

---

## 🌐 DNS para apuntar dominio a Vercel

En el panel del registrador (cPanel, Cloudflare, Namecheap…):

| Tipo | Nombre | Valor |
|---|---|---|
| `A` | `@` (apex) | `76.76.21.21` |
| `CNAME` | `www` | `cname.vercel-dns.com.` |

Mantener intactos `MX`, `TXT (SPF/DKIM/DMARC)` y subdominios de hosting
(`mail`, `cpanel`, etc.) si tienes email en el dominio.

---

## 🚀 Flujo de desarrollo → producción

1. **Editar** en Emergent (preview en `*.preview.emergentagent.com`).
2. **Save to GitHub** desde Emergent (botón nativo).
3. Vercel detecta el push y **auto-deploya** la rama `main` a producción
   en ~2 min.
4. Para PR/staging: cualquier otra rama recibe un **Preview Deployment**
   automático con URL única.

---

## 🎯 Prompt-plantilla para arrancar proyectos nuevos en Emergent

```
Quiero un proyecto NATIVO de Next.js (App Router, última versión estable,
React 19) listo para deploy en Vercel. Stack obligatorio:

ESTRUCTURA:
- Todo el código en la raíz del repo (NO en /frontend/ envoltura).
- src/app/ con App Router, src/components/, src/lib/.
- Endpoints en src/app/api/[feature]/route.js (NO FastAPI/Python/MongoDB).

DEPENDENCIAS CORE:
- next ^16, react ^19, react-dom ^19
- Tailwind 3.4, shadcn/ui, lucide-react, Radix
- Yarn classic 1.22 como package manager (commitear yarn.lock)

ARCHIVOS CRÍTICOS PARA VERCEL:
- .npmrc con "legacy-peer-deps=true" en la raíz
- vercel.json con {"framework": "nextjs"}
- next.config.js con allowedDevOrigins para preview de Emergent
- .gitignore que excluya .env, .env.*, node_modules, .next

METADATA / SEO:
- layout.js con Metadata API (metadataBase, openGraph, twitter)
- src/app/opengraph-image.js con next/og (1200x630, runtime nodejs)
- Fonts con next/font/google
- Locale es_ES

INTEGRACIONES (si aplican):
- Sanity CMS: proxy server-side en src/app/api/sanity/query/route.js
  para evitar CORS desde el browser.
- OpenAI: route handler en src/app/api/chat/message/route.js usando
  gpt-4o-mini, OPENAI_API_KEY en env, soporte opcional OPENAI_BASE_URL.
- Resend: en src/lib/resend.js, RESEND_API_KEY en env.
- Supabase: cliente en src/lib/supabase.js, keys en env.

VARIABLES DE ENTORNO:
- Públicas con prefijo NEXT_PUBLIC_*.
- Privadas sin prefijo, solo accedidas en route handlers.
- NUNCA hardcoded en código.

REGLAS:
- NO MongoDB, NO FastAPI, NO Python.
- Toda lógica de server en Route Handlers Next.js.
- Diseño dark-mode-first cuando aplique.

Aquí va mi requerimiento específico:
[DESCRIBIR EL PROYECTO]
```

---

## 📝 Lecciones aprendidas (errores reales que evitamos así)

1. **Vercel rechaza el build con npm + peer deps modernas** →
   resuelto con `.npmrc` `legacy-peer-deps=true`.
2. **Emergent Universal LLM Key solo funciona dentro de Emergent** →
   en producción siempre usar OpenAI key propia.
3. **Sanity bloquea por CORS desde dominios no autorizados** →
   resuelto con proxy server-side en `/api/sanity/query`.
4. **Next.js 16 bloquea HMR cross-origin** en el preview de Emergent →
   resuelto con `allowedDevOrigins` en `next.config.js`.
5. **Estructura monorepo `/frontend` + `/backend` complica Vercel** →
   migrar todo a la raíz como app Next.js nativa.
6. **Las API keys nunca van por chat ni se commitean** →
   solo en el dashboard de Vercel.

---

_Última actualización: junio 2025 — referencia: swaraya-web, stratika-web._
