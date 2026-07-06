import RefundPolicy from '@/views/legal/RefundPolicy';

export const metadata = {
  title: 'Política de devoluciones | swaraya',
  description:
    'Política de devoluciones y reembolsos de swaraya: condiciones para productos digitales de entrega puntual y servicios de suscripción.',
  alternates: { canonical: '/devoluciones' },
};

export default function Page() {
  return <RefundPolicy />;
}
