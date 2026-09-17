import './globals.css';
import ChatWidget from '@/components/ChatWidget';
import BadgeRemover from '@/components/BadgeRemover';
import FontLoadCheck from '@/components/FontLoadCheck';

/**
 * URL canónica del sitio.
 *
 * Prioridad:
 *   1. NEXT_PUBLIC_SITE_URL — dominio final de producción cuando esté listo
 *      (ej. https://swaraya.ai). Sobrescribe todo lo demás.
 *   2. NEXT_PUBLIC_BASE_URL — dominio actual del deploy (preview de
 *      Emergent hoy, Vercel mañana). Es lo que permite que la previsualización
 *      de OG funcione antes de publicar swaraya.ai.
 *   3. Fallback local para builds sin variables (ej. `next build` en CI).
 */
const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL ||
  process.env.NEXT_PUBLIC_BASE_URL ||
  'http://localhost:3000'
).replace(/\/+$/, ''); // sin trailing slash

export const metadata = {
  metadataBase: new URL(SITE_URL),
  title: 'swaraya | Agencia de Inteligencia Aplicada',
  description:
    'Destilamos el criterio de tu operación en sistemas que deciden con tu estándar. Precisión medida y aprobación humana antes de cada acción.',
  keywords:
    'inteligencia artificial, IA, agencia IA, machine learning, automatización, consultoría IA, desarrollo IA, investigación IA',
  authors: [{ name: 'swaraya' }],
  robots: 'index, follow',
  alternates: { canonical: '/' },
  manifest: '/manifest.json',
  openGraph: {
    type: 'website',
    url: `${SITE_URL}/`,
    title: 'swaraya | Agencia de Inteligencia Aplicada',
    description:
      'Destilamos el criterio de tu operación en sistemas que deciden con tu estándar. Precisión medida y aprobación humana antes de cada acción.',
    locale: 'es_MX',
    siteName: 'swaraya',
    // URL absoluta y explícita hacia el endpoint dinámico de la imagen OG.
    // Se apunta al route handler `/api/og` en vez de la convención file-based
    // (`opengraph-image.js`) porque ésta resuelve la URL contra el host
    // interno del proceso y no respeta metadataBase detrás de un proxy.
    images: [
      {
        url: `${SITE_URL}/api/og`,
        width: 1200,
        height: 630,
        alt: 'swaraya — Agencia de Inteligencia Aplicada · Tu mejor criterio, aplicado todos los días.',
        type: 'image/png',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'swaraya | Agencia de Inteligencia Aplicada',
    description:
      'Destilamos el criterio de tu operación en sistemas que deciden con tu estándar. Precisión medida y aprobación humana antes de cada acción.',
    images: [`${SITE_URL}/api/og`],
  },
  icons: {
    icon: [
      { url: '/favicon-16.png', sizes: '16x16', type: 'image/png' },
      { url: '/favicon-32.png', sizes: '32x32', type: 'image/png' },
      { url: '/icon-192.png',   sizes: '192x192', type: 'image/png' },
      { url: '/icon-512.png',   sizes: '512x512', type: 'image/png' },
    ],
    apple: [
      { url: '/apple-icon.png', sizes: '180x180', type: 'image/png' },
    ],
    other: [
      { rel: 'mask-icon', url: '/safari-pinned-tab.svg', color: '#c8e824' },
    ],
  },
};

export const viewport = {
  themeColor: '#141414',
};

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <head>
        {/* Preconnect hints — abren la conexión antes de descubrir los CSS */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://api.fontshare.com" crossOrigin="anonymous" />

        {/* Cabinet Grotesk (Fontshare) — display / titulares (500) + icon "s" (700) */}
        <link
          rel="stylesheet"
          href="https://api.fontshare.com/v2/css?f[]=cabinet-grotesk@400,500,700&display=swap"
        />
        {/* Inter (Google) — cuerpo / UI */}
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap"
        />
        {/* Newsreader (Google) — capa editorial (manifiesto, pull-quotes) */}
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Newsreader:ital,opsz,wght@0,6..72,400;0,6..72,500;1,6..72,400;1,6..72,500&display=swap"
        />
      </head>
      <body>
        {children}
        <ChatWidget />
        <BadgeRemover />
        <FontLoadCheck />
      </body>
    </html>
  );
}
