'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Calendar, Clock, ArrowLeft, Twitter, Linkedin, Facebook, Link as LinkIcon, Check, Play } from 'lucide-react';

// Component for embedded YouTube videos
const YouTubeEmbed = ({ videoId, title }) => {
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <div className="my-8">
      <div className="relative w-full aspect-video rounded-xl overflow-hidden bg-[#FAF8F2] border border-[rgba(14,15,17,0.08)]">
        {!isLoaded ? (
          <button
            onClick={() => setIsLoaded(true)}
            className="absolute inset-0 flex flex-col items-center justify-center gap-4 group cursor-pointer"
          >
            <img
              src={`https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`}
              alt={title || 'Video thumbnail'}
              className="absolute inset-0 w-full h-full object-cover opacity-60 group-hover:opacity-80 transition-opacity"
              onError={(e) => {
                e.target.src = `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`;
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#05060A]/80 to-transparent" />
            <div className="relative z-10 w-16 h-16 flex items-center justify-center rounded-full bg-[#2C3E80] text-[#05060A] group-hover:scale-110 transition-transform">
              <Play className="w-7 h-7 ml-1" fill="currentColor" />
            </div>
            {title && (
              <span className="relative z-10 text-sm text-[#5D6878] font-medium px-4 text-center">
                {title}
              </span>
            )}
          </button>
        ) : (
          <iframe
            src={`https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0`}
            title={title || 'YouTube video'}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="absolute inset-0 w-full h-full"
          />
        )}
      </div>
      {title && isLoaded && (
        <p className="mt-3 text-xs text-[#5D6878] text-center">{title}</p>
      )}
    </div>
  );
};

// Process content to embed videos
const processContentWithVideos = (htmlContent) => {
  if (!htmlContent) return { segments: [], hasVideos: false };

  const videoPattern = /\[VIDEO:([a-zA-Z0-9_-]+):([^\]]+)\]|🎬\s*Video recomendado:\s*(https:\/\/(?:www\.)?youtube\.com\/watch\?v=([a-zA-Z0-9_-]+)[^\s<]*)/g;

  const segments = [];
  let lastIndex = 0;
  let match;
  let hasVideos = false;

  while ((match = videoPattern.exec(htmlContent)) !== null) {
    hasVideos = true;
    if (match.index > lastIndex) {
      segments.push({ type: 'html', content: htmlContent.slice(lastIndex, match.index) });
    }
    if (match[1]) {
      segments.push({ type: 'video', videoId: match[1], title: match[2] });
    } else if (match[4]) {
      segments.push({ type: 'video', videoId: match[4], title: 'Video recomendado' });
    }
    lastIndex = match.index + match[0].length;
  }

  if (lastIndex < htmlContent.length) {
    segments.push({ type: 'html', content: htmlContent.slice(lastIndex) });
  }

  if (segments.length === 0) {
    segments.push({ type: 'html', content: htmlContent });
  }

  return { segments, hasVideos };
};

const formatDate = (dateString) => {
  return new Date(dateString).toLocaleDateString('es-ES', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
};

const BlogArticle = ({ post, relatedPosts = [] }) => {
  const [copied, setCopied] = useState(false);

  const shareUrl = typeof window !== 'undefined' ? window.location.href : `https://swaraya.ai/blog/${post.slug}`;
  const shareText = `${post.title} | swaraya Insights`;

  const shareLinks = {
    twitter: `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(shareUrl)}`,
    linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`,
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`,
  };

  const copyLink = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  return (
    <div className="min-h-screen bg-[#F5F2EC]">
      {/* Header */}
      <header className="border-b border-[rgba(255,255,255,0.04)]">
        <div className="container-main py-6">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center">
              <img src="/logo-swaraya.png" alt="swaraya" className="h-5 md:h-6 w-auto" />
            </Link>
            <Link
              href="/blog"
              className="flex items-center gap-2 text-sm text-[#9BA5B7] hover:text-[#0E0F11] transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              Todos los artículos
            </Link>
          </div>
        </div>
      </header>

      {/* Article */}
      <article className="py-12 md:py-16">
        <div className="container-main">
          {/* Back Link - Mobile */}
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-sm text-[#2C3E80] mb-8 md:hidden"
          >
            <ArrowLeft className="w-4 h-4" />
            Volver
          </Link>

          {/* Article Header */}
          <header className="max-w-3xl mx-auto mb-10 md:mb-12">
            <div className="flex flex-wrap items-center gap-3 mb-6">
              <span className="text-xs font-medium text-[#2C3E80] tracking-wide px-2.5 py-1 bg-[rgba(122,196,224,0.1)] rounded-md">
                {post.category}
              </span>
              <span className="w-1 h-1 rounded-full bg-[#3D4654]" />
              <span className="flex items-center gap-1.5 text-xs text-[#5D6878]">
                <Calendar className="w-3.5 h-3.5" />
                {formatDate(post.publishedAt || post.published_at)}
              </span>
              <span className="w-1 h-1 rounded-full bg-[#3D4654]" />
              <span className="flex items-center gap-1.5 text-xs text-[#5D6878]">
                <Clock className="w-3.5 h-3.5" />
                {post.readingTime || post.reading_time || '5'} min de lectura
              </span>
            </div>

            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-[2.75rem] font-semibold text-[#0E0F11] tracking-[-0.03em] leading-[1.15] mb-6">
              {post.title}
            </h1>

            <p className="text-base md:text-lg text-[#9BA5B7] leading-relaxed">
              {post.excerpt}
            </p>

            <div className="flex flex-wrap gap-2 mt-6">
              {(post.tags || []).map((tag) => (
                <Link
                  key={tag}
                  href={`/blog?tag=${encodeURIComponent(tag)}`}
                  className="text-xs text-[#9BA5B7] hover:text-[#9BA5B7] transition-colors"
                >
                  #{tag.replace(/\s+/g, '')}
                </Link>
              ))}
            </div>
          </header>

          {/* Cover Image */}
          <div className="max-w-4xl mx-auto mb-12 md:mb-16">
            <div className="aspect-[16/9] rounded-xl overflow-hidden bg-[#FAF8F2]">
              <img
                src={post.coverImage || post.cover_image}
                alt={post.title}
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          {/* Content */}
          <div className="max-w-3xl mx-auto">
            {(() => {
              const { segments } = processContentWithVideos(post.content);
              return segments.map((segment, index) => {
                if (segment.type === 'video') {
                  return (
                    <YouTubeEmbed
                      key={`video-${index}`}
                      videoId={segment.videoId}
                      title={segment.title}
                    />
                  );
                }
                return (
                  <div
                    key={`html-${index}`}
                    className="prose prose-invert prose-base max-w-none
                      prose-headings:text-[#C8CDD6] prose-headings:font-medium prose-headings:tracking-[-0.02em]
                      prose-h1:text-2xl prose-h1:mt-10 prose-h1:mb-5
                      prose-h2:text-xl prose-h2:mt-9 prose-h2:mb-4
                      prose-h3:text-lg prose-h3:mt-7 prose-h3:mb-3
                      prose-p:text-[#8B95A5] prose-p:leading-[1.75] prose-p:mb-5 prose-p:text-[0.9375rem]
                      prose-a:text-[#2C3E80] prose-a:no-underline hover:prose-a:underline
                      prose-strong:text-[#A8B0BC] prose-strong:font-medium
                      prose-ul:text-[#8B95A5] prose-ul:my-5
                      prose-ol:text-[#8B95A5] prose-ol:my-5
                      prose-li:my-1.5 prose-li:leading-[1.7] prose-li:text-[0.9375rem]
                      prose-blockquote:border-l-[#5A7BFA] prose-blockquote:bg-[rgba(90,123,250,0.04)] prose-blockquote:py-3 prose-blockquote:px-5 prose-blockquote:rounded-r-lg prose-blockquote:not-italic
                      prose-code:text-[#2C3E80] prose-code:bg-[rgba(122,196,224,0.08)] prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded prose-code:font-normal prose-code:before:content-none prose-code:after:content-none
                      prose-pre:bg-[#FAF8F2] prose-pre:border prose-pre:border-[rgba(255,255,255,0.04)] prose-pre:rounded-xl
                      prose-hr:border-[rgba(14,15,17,0.08)] prose-hr:my-8
                    "
                    dangerouslySetInnerHTML={{ __html: segment.content }}
                  />
                );
              });
            })()}

            {/* Share */}
            <div className="mt-12 pt-8 border-t border-[rgba(255,255,255,0.04)]">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <span className="text-xs font-medium text-[#5D6878] tracking-wide">Compartir artículo</span>
                <div className="flex items-center gap-3">
                  <a href={shareLinks.twitter} target="_blank" rel="noopener noreferrer" className="w-10 h-10 flex items-center justify-center rounded-lg bg-[rgba(255,255,255,0.04)] text-[#9BA5B7] hover:bg-[rgba(255,255,255,0.08)] hover:text-[#0E0F11] transition-all" aria-label="Compartir en Twitter">
                    <Twitter className="w-4 h-4" />
                  </a>
                  <a href={shareLinks.linkedin} target="_blank" rel="noopener noreferrer" className="w-10 h-10 flex items-center justify-center rounded-lg bg-[rgba(255,255,255,0.04)] text-[#9BA5B7] hover:bg-[rgba(255,255,255,0.08)] hover:text-[#0E0F11] transition-all" aria-label="Compartir en LinkedIn">
                    <Linkedin className="w-4 h-4" />
                  </a>
                  <a href={shareLinks.facebook} target="_blank" rel="noopener noreferrer" className="w-10 h-10 flex items-center justify-center rounded-lg bg-[rgba(255,255,255,0.04)] text-[#9BA5B7] hover:bg-[rgba(255,255,255,0.08)] hover:text-[#0E0F11] transition-all" aria-label="Compartir en Facebook">
                    <Facebook className="w-4 h-4" />
                  </a>
                  <button onClick={copyLink} className="w-10 h-10 flex items-center justify-center rounded-lg bg-[rgba(255,255,255,0.04)] text-[#9BA5B7] hover:bg-[rgba(255,255,255,0.08)] hover:text-[#0E0F11] transition-all" aria-label="Copiar enlace">
                    {copied ? <Check className="w-4 h-4 text-[#2C3E80]" /> : <LinkIcon className="w-4 h-4" />}
                  </button>
                </div>
              </div>
            </div>

            {/* Author */}
            <div className="mt-8 p-6 bg-[#FAF8F2] rounded-xl border border-[rgba(255,255,255,0.04)]">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-[rgba(90,123,250,0.1)] flex items-center justify-center">
                  <span className="text-[#2C3E80] font-semibold">S</span>
                </div>
                <div>
                  <div className="text-sm font-medium text-[#0E0F11]">{post.author?.name || 'swaraya'}</div>
                  <div className="text-xs text-[#5D6878]">Agencia de Inteligencia Aplicada</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </article>

      {/* Related Posts */}
      {relatedPosts.length > 0 && (
        <section className="py-12 md:py-16 border-t border-[rgba(255,255,255,0.04)]">
          <div className="container-main">
            <h2 className="text-xl font-semibold text-[#0E0F11] mb-8">Artículos relacionados</h2>
            <div className="grid md:grid-cols-2 gap-6">
              {relatedPosts.map((relPost) => (
                <Link
                  key={relPost.id}
                  href={`/blog/${relPost.slug}`}
                  className="group p-6 bg-[#FAF8F2] rounded-xl border border-[rgba(255,255,255,0.04)] hover:border-[rgba(14,15,17,0.1)] transition-colors"
                >
                  <span className="text-xs font-medium text-[#2C3E80] tracking-wide">{relPost.category}</span>
                  <h3 className="text-lg font-medium text-[#0E0F11] mt-3 mb-2 group-hover:text-[#2C3E80] transition-colors">
                    {relPost.title}
                  </h3>
                  <p className="text-sm text-[#9BA5B7] line-clamp-2">{relPost.excerpt}</p>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Footer */}
      <footer className="py-8 border-t border-[rgba(255,255,255,0.04)]">
        <div className="container-main flex flex-col sm:flex-row items-center justify-between gap-4">
          <Link href="/" className="flex items-center">
            <img src="/logo-swaraya.png" alt="swaraya" className="h-4 w-auto opacity-60" />
          </Link>
          <p className="text-xs text-[#5D6878]">
            © {new Date().getFullYear()} Agencia swaraya. Todos los derechos reservados.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default BlogArticle;
