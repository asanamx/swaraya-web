import PrivacyPolicy from '@/views/legal/PrivacyPolicy';

export const metadata = {
  title: 'Aviso de Privacidad | Swaraya',
  description: 'Aviso de Privacidad de Swaraya: cómo recopilamos, usamos y protegemos su información personal.',
  alternates: { canonical: '/privacidad' },
};

export default function Page() {
  return <PrivacyPolicy />;
}
