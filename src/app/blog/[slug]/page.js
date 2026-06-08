import { notFound } from 'next/navigation';
import { getPost, getPosts } from '@/lib/sanity';
import BlogArticle from '@/components/BlogArticle';

const SITE_DOMAIN = 'swaraya.ai';

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const post = await getPost(slug, SITE_DOMAIN);

  if (!post) {
    return { title: 'Artículo no encontrado | Swaraya' };
  }

  const images = post.coverImage ? [post.coverImage] : [];
  return {
    title: `${post.title} | Swaraya Insights`,
    description: post.excerpt,
    alternates: { canonical: `/blog/${post.slug}` },
    openGraph: {
      title: post.title,
      description: post.excerpt,
      url: `https://swaraya.ai/blog/${post.slug}`,
      type: 'article',
      images,
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.excerpt,
      images,
    },
  };
}

export default async function Page({ params }) {
  const { slug } = await params;
  const post = await getPost(slug, SITE_DOMAIN);

  if (!post) {
    notFound();
  }

  let relatedPosts = [];
  try {
    const related = await getPosts({ category: post.category, perPage: 3, site: SITE_DOMAIN });
    relatedPosts = related.posts.filter((p) => p.slug !== slug).slice(0, 2);
  } catch {
    relatedPosts = [];
  }

  return <BlogArticle post={post} relatedPosts={relatedPosts} />;
}
