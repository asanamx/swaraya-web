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
  openGraph: {
    type: 'website',
    url: 'https://swaraya.ai/',
    title: 'swaraya | Agencia de Inteligencia Artificial Aplicada',
    description:
      'Investigación profunda. Ingeniería precisa. Inteligencia real. Sistemas de IA para organizaciones que requieren ventaja estructural.',
    locale: 'es_ES',
    siteName: 'swaraya',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'swaraya | Agencia de Inteligencia Artificial Aplicada',
    description:
      'Investigación profunda. Ingeniería precisa. Inteligencia real. Sistemas de IA para organizaciones que requieren ventaja estructural.',
  },
  icons: {
    icon: '/icon.svg',
    apple: '/apple-icon.svg',
  },
};

export const viewport = {
  themeColor: '#F5F2EC',
};

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <head>
        {/* Preconnect hints — abren la conexión antes de descubrir los CSS */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://api.fontshare.com" crossOrigin="anonymous" />

        {/* Cabinet Grotesk (Fontshare) — display / titulares (weight 500) */}
        <link
          rel="stylesheet"
          href="https://api.fontshare.com/v2/css?f[]=cabinet-grotesk@400,500&display=swap"
        />
        {/* Inter (Google) — cuerpo / UI */}
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap"
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
