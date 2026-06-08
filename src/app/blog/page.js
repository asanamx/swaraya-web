import BlogPage from '@/views/blog/BlogPage';

export const metadata = {
  title: 'Insights | swaraya - Perspectivas sobre inteligencia aplicada',
  description:
    'Investigación, análisis y reflexiones sobre arquitectura de IA, agentes autónomos, gobernanza y el futuro de la inteligencia empresarial.',
  alternates: { canonical: '/blog' },
  openGraph: {
    title: 'Insights | swaraya',
    description:
      'Perspectivas sobre inteligencia aplicada: arquitectura de IA, agentes autónomos y gobernanza.',
    url: 'https://swaraya.ai/blog',
    type: 'website',
  },
};

export default function Page() {
  return <BlogPage />;
}
