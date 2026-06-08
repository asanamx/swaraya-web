import BlogPage from '@/views/blog/BlogPage';

export const metadata = {
  title: 'Insights | Swaraya - Perspectivas sobre inteligencia aplicada',
  description:
    'Investigación, análisis y reflexiones sobre arquitectura de IA, agentes autónomos, gobernanza y el futuro de la inteligencia empresarial.',
  alternates: { canonical: '/blog' },
  openGraph: {
    title: 'Insights | Swaraya',
    description:
      'Perspectivas sobre inteligencia aplicada: arquitectura de IA, agentes autónomos y gobernanza.',
    url: 'https://swaraya.ai/blog',
    type: 'website',
  },
};

export default function Page() {
  return <BlogPage />;
}
