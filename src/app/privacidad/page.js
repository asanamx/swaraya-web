import PrivacyPolicy from '@/views/legal/PrivacyPolicy';

export const metadata = {
  title: 'Aviso de Privacidad | swaraya',
  description: 'Aviso de Privacidad de swaraya: cómo recopilamos, usamos y protegemos su información personal.',
  alternates: { canonical: '/privacidad' },
};

export default function Page() {
  return <PrivacyPolicy />;
}
