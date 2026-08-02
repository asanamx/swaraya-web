'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { ArrowRight, Calendar, Clock } from 'lucide-react';
import useScrollReveal from '../hooks/useScrollReveal';
import { getRecentPosts } from '../lib/sanity';

const SITE_DOMAIN = 'swaraya.ai';

export const BlogPreview = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [headerRef, headerVisible] = useScrollReveal({ threshold: 0.2 });
  const [postsRef, postsVisible] = useScrollReveal({ threshold: 0.1 });

  useEffect(() => {
    fetchRecentPosts();
  }, []);

  const fetchRecentPosts = async () => {
    try {
      const data = await getRecentPosts(3, SITE_DOMAIN);
      setPosts(data);
    } catch (err) {
      console.error('Error fetching recent posts:', err);
    }
    setLoading(false);
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('es-ES', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  return (
    <section className="section-padding bg-[#ffffff]" id="insights">
      <div className="container-main">
        {/* Header */}
        <div 
          ref={headerRef}
          className={`flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-12 md:mb-16 reveal ${headerVisible ? 'revealed' : ''}`}
        >
          <div className="max-w-xl">
            <span className="label-accent text-[#1233cc] mb-4 md:mb-5 block">
              Insights
            </span>
            <h2 className="heading-xl">
              Perspectivas sobre <span className="text-[#1233cc]">inteligencia aplicada</span>
            </h2>
          </div>
          
          <Link 
            href="/blog"
            className="inline-flex items-center gap-2 text-sm text-[#52565e] hover:text-[#1233cc] transition-colors group"
          >
            Ver todos los artículos
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>

        {/* Posts Grid */}
        <div 
          ref={postsRef}
          className={`grid md:grid-cols-3 gap-6 md:gap-8 reveal-stagger ${postsVisible ? 'revealed' : ''}`}
        >
          {loading ? (
            // Loading skeleton
            [...Array(3)].map((_, i) => (
              <div key={i} className="animate-pulse">
                <div className="aspect-[16/9] bg-[#FAF8F2] rounded-xl mb-4" />
                <div className="h-3 bg-[#FAF8F2] rounded w-1/4 mb-3" />
                <div className="h-5 bg-[#FAF8F2] rounded w-3/4 mb-2" />
                <div className="h-4 bg-[#FAF8F2] rounded w-full" />
              </div>
            ))
          ) : (
            posts.map((post, index) => (
              <article
                key={post.id}
                className="group"
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                <Link href={`/blog/${post.slug}`}>
                  {/* Cover Image — duotono índigo unificado (Prompt B) */}
                  <div className="duotone-indigo relative aspect-[16/9] mb-5 rounded-2xl overflow-hidden bg-[#ffffff] border border-[rgba(17, 17, 20,0.06)] transition-transform duration-500 group-hover:scale-[1.02]">
                    <img
                      src={post.coverImage || post.cover_image}
                      alt={post.title}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  {/* Meta */}
                  <div className="flex items-center gap-3 mb-3">
                    <span className="text-[0.6875rem] font-medium text-[#1233cc] tracking-[0.18em] uppercase">
                      {post.category}
                    </span>
                    <span className="w-1 h-1 rounded-full bg-[#52565e]/40" />
                    <span className="flex items-center gap-1.5 text-[0.6875rem] text-[#52565e]">
                      <Clock className="w-3 h-3" />
                      {post.readingTime || post.reading_time || '5'} min
                    </span>
                  </div>

                  {/* Title */}
                  <h3
                    className="text-base md:text-lg text-[#111114] mb-2.5 leading-snug group-hover:text-[#1233cc] transition-colors line-clamp-2"
                    style={{
                      fontFamily: "'Cabinet Grotesk', sans-serif",
                      fontWeight: 500,
                      letterSpacing: '-0.02em',
                    }}
                  >
                    {post.title}
                  </h3>

                  {/* Excerpt */}
                  <p className="text-sm text-[#52565e] leading-relaxed line-clamp-2">
                    {post.excerpt}
                  </p>
                </Link>
              </article>
            ))
          )}
        </div>
      </div>
    </section>
  );
};

export default BlogPreview;
