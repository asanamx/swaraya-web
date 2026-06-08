import './globals.css';
import ChatWidget from '@/components/ChatWidget';
import BadgeRemover from '@/components/BadgeRemover';

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
