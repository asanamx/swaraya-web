import './globals.css';
import ChatWidget from '@/components/ChatWidget';
import BadgeRemover from '@/components/BadgeRemover';
import FontLoadCheck from '@/components/FontLoadCheck';

export const metadata = {
  metadataBase: new URL('https://swaraya.ai'),
  title: 'swaraya | Agencia de Inteligencia Artificial Aplicada',
  description:
    'swaraya investiga, diseña e integra sistemas de inteligencia artificial para organizaciones que requieren precisión, escalabilidad y ventaja estructural.',
  keywords:
    'inteligencia artificial, IA, agencia IA, machine learning, automatización, consultoría IA, desarrollo IA, investigación IA',
  authors: [{ name: 'swaraya' }],
  robots: 'index, follow',
  alternates: { canonical: '/' },
  manifest: '/manifest.json',
  openGraph: {
    type: 'website',
    url: 'https://swaraya.ai/',
    title: 'swaraya | Agencia de Inteligencia Artificial Aplicada',
    description:
      'Investigación profunda. Ingeniería precisa. Inteligencia real. Sistemas de IA para organizaciones que requieren ventaja estructural.',
    locale: 'es_ES',
    siteName: 'swaraya',
    images: [
      { url: '/og-image.png', width: 1200, height: 630, alt: 'swaraya.' },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'swaraya | Agencia de Inteligencia Artificial Aplicada',
    description:
      'Investigación profunda. Ingeniería precisa. Inteligencia real. Sistemas de IA para organizaciones que requieren ventaja estructural.',
    images: ['/og-image.png'],
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
      { rel: 'mask-icon', url: '/safari-pinned-tab.svg', color: '#f6b91f' },
    ],
  },
};

export const viewport = {
  themeColor: '#0a0a0a',
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
