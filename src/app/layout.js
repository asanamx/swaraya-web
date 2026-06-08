import './globals.css';
import ChatWidget from '@/components/ChatWidget';
import BadgeRemover from '@/components/BadgeRemover';

export const metadata = {
  metadataBase: new URL('https://swaraya.ai'),
  title: 'Swaraya | Agencia de Inteligencia Artificial Aplicada',
  description:
    'Swaraya investiga, diseña e integra sistemas de inteligencia artificial para organizaciones que requieren precisión, escalabilidad y ventaja estructural.',
  keywords:
    'inteligencia artificial, IA, agencia IA, machine learning, automatización, consultoría IA, desarrollo IA, investigación IA',
  authors: [{ name: 'Swaraya' }],
  robots: 'index, follow',
  alternates: { canonical: '/' },
  openGraph: {
    type: 'website',
    url: 'https://swaraya.ai/',
    title: 'Swaraya | Agencia de Inteligencia Artificial Aplicada',
    description:
      'Investigación profunda. Ingeniería precisa. Inteligencia real. Sistemas de IA para organizaciones que requieren ventaja estructural.',
    images: ['https://swaraya.ai/og-image.png'],
    locale: 'es_ES',
    siteName: 'Swaraya',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Swaraya | Agencia de Inteligencia Artificial Aplicada',
    description:
      'Investigación profunda. Ingeniería precisa. Inteligencia real. Sistemas de IA para organizaciones que requieren ventaja estructural.',
    images: ['https://swaraya.ai/og-image.png'],
  },
  icons: {
    icon: [
      { url: '/favicon.png', sizes: '32x32', type: 'image/png' },
      { url: '/favicon-16.png', sizes: '16x16', type: 'image/png' },
    ],
    apple: '/apple-touch-icon.png',
  },
};

export const viewport = {
  themeColor: '#05060A',
};

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <body>
        {children}
        <ChatWidget />
        <BadgeRemover />
      </body>
    </html>
  );
}
