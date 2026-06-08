import TermsOfService from '@/views/legal/TermsOfService';

export const metadata = {
  title: 'Términos de Servicio | Swaraya',
  description: 'Términos de Servicio de Swaraya: condiciones de uso de nuestro sitio web y servicios.',
  alternates: { canonical: '/terminos' },
};

export default function Page() {
  return <TermsOfService />;
}
