'use client';

import { useState, useEffect } from 'react';
import { Search, Calendar, Clock, ArrowRight, Tag, Filter } from 'lucide-react';
import Link from 'next/link';
import Navbar from '../../components/Navbar';
import { getPosts, getCategories, getTags } from '../../lib/sanity';

const SITE_DOMAIN = 'swaraya.ai';

const BlogPage = () => {
  const [posts, setPosts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [tags, setTags] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedTag, setSelectedTag] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [showFilters, setShowFilters] = useState(false);

  useEffect(() => {
    fetchPosts();
    fetchCategories();
    fetchTags();
  }, [currentPage, selectedCategory, selectedTag, searchQuery]);

  const fetchPosts = async () => {
    setLoading(true);
    try {
      const data = await getPosts({
        page: currentPage,
        perPage: 6,
        site: SITE_DOMAIN,
        category: selectedCategory || undefined,
        tag: selectedTag || undefined,
        search: searchQuery || undefined,
      });
      setPosts(data.posts);
      setTotalPages(data.total_pages);
    } catch (err) {
      console.error('Error fetching posts:', err);
    }
    setLoading(false);
  };

  const fetchCategories = async () => {
    try {
      const data = await getCategories(SITE_DOMAIN);
      setCategories(data);
    } catch (err) {
      console.error('Error fetching categories:', err);
    }
  };

  const fetchTags = async () => {
    try {
      const data = await getTags(SITE_DOMAIN);
      setTags(data);
    } catch (err) {
      console.error('Error fetching tags:', err);
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    setCurrentPage(1);
    fetchPosts();
  };

  const clearFilters = () => {
    setSelectedCategory('');
    setSelectedTag('');
    setSearchQuery('');
    setCurrentPage(1);
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('es-ES', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div className="min-h-screen bg-[#05060A]">
      {/* Full Navigation */}
      <Navbar />

      {/* Hero Section */}
      <section className="pt-28 md:pt-32 pb-16 md:pb-24 border-b border-[rgba(255,255,255,0.04)]">
        <div className="container-main">
          <div className="max-w-3xl">
            <span className="label-accent text-[#7AC4E0] mb-6 block">Insights</span>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-semibold text-[#F4F6F9] tracking-[-0.03em] mb-6">
              Perspectivas sobre <span className="text-[#9BA5B7]">inteligencia aplicada</span>
            </h1>
            <p className="text-base md:text-lg text-[#6B7280] leading-relaxed">
              Investigación, análisis y reflexiones sobre arquitectura de IA, agentes autónomos, 
              gobernanza y el futuro de la inteligencia empresarial.
            </p>
          </div>
        </div>
      </section>

      {/* Search and Filters */}
      <section className="py-8 border-b border-[rgba(255,255,255,0.04)]">
        <div className="container-main">
          <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
            {/* Search */}
            <form onSubmit={handleSearch} className="relative w-full md:w-96">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#5D6878]" />
              <input
                type="text"
                placeholder="Buscar artículos..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-11 pr-4 py-3 bg-[#0C1016] border border-[rgba(255,255,255,0.06)] rounded-xl text-sm text-[#F4F6F9] placeholder-[#5D6878] focus:outline-none focus:border-[#5A7BFA]/50 transition-colors"
                data-testid="blog-search-input"
              />
            </form>

            {/* Filter Toggle */}
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center gap-2 text-sm text-[#9BA5B7] hover:text-[#F4F6F9] transition-colors"
            >
              <Filter className="w-4 h-4" />
              Filtros
              {(selectedCategory || selectedTag) && (
                <span className="w-2 h-2 rounded-full bg-[#7AC4E0]" />
              )}
            </button>
          </div>

          {/* Expanded Filters */}
          {showFilters && (
            <div className="mt-6 p-6 bg-[#0C1016] rounded-xl border border-[rgba(255,255,255,0.04)]">
              <div className="grid md:grid-cols-2 gap-6">
                {/* Categories */}
                <div>
                  <h3 className="text-xs font-medium text-[#5D6878] tracking-wide mb-3">Categorías</h3>
                  <div className="flex flex-wrap gap-2">
                    {categories.map((cat) => (
                      <button
                        key={cat.name}
                        onClick={() => {
                          setSelectedCategory(selectedCategory === cat.name ? '' : cat.name);
                          setCurrentPage(1);
                        }}
                        className={`px-3 py-1.5 text-xs rounded-lg transition-all ${
                          selectedCategory === cat.name
                            ? 'bg-[#5A7BFA] text-white'
                            : 'bg-[rgba(255,255,255,0.04)] text-[#9BA5B7] hover:bg-[rgba(255,255,255,0.08)]'
                        }`}
                      >
                        {cat.name} ({cat.count})
                      </button>
                    ))}
                  </div>
                </div>

                {/* Tags */}
                <div>
                  <h3 className="text-xs font-medium text-[#5D6878] tracking-wide mb-3">Tags</h3>
                  <div className="flex flex-wrap gap-2">
                    {tags.slice(0, 10).map((tag) => (
                      <button
                        key={tag.name}
                        onClick={() => {
                          setSelectedTag(selectedTag === tag.name ? '' : tag.name);
                          setCurrentPage(1);
                        }}
                        className={`px-3 py-1.5 text-xs rounded-lg transition-all ${
                          selectedTag === tag.name
                            ? 'bg-[#7AC4E0] text-[#05060A]'
                            : 'bg-[rgba(255,255,255,0.04)] text-[#9BA5B7] hover:bg-[rgba(255,255,255,0.08)]'
                        }`}
                      >
                        {tag.name}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {(selectedCategory || selectedTag) && (
                <button
                  onClick={clearFilters}
                  className="mt-4 text-xs text-[#7AC4E0] hover:text-[#9BD4EA] transition-colors"
                >
                  Limpiar filtros
                </button>
              )}
            </div>
          )}
        </div>
      </section>

      {/* Posts Grid */}
      <section className="py-12 md:py-16">
        <div className="container-main">
          {loading ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <div key={i} className="animate-pulse">
                  <div className="aspect-[16/9] bg-[#0C1016] rounded-xl mb-4" />
                  <div className="h-4 bg-[#0C1016] rounded w-1/4 mb-3" />
                  <div className="h-6 bg-[#0C1016] rounded w-3/4 mb-2" />
                  <div className="h-4 bg-[#0C1016] rounded w-full" />
                </div>
              ))}
            </div>
          ) : posts.length === 0 ? (
            <div className="text-center py-16">
              <p className="text-[#6B7280] mb-4">No se encontraron artículos</p>
              <button
                onClick={clearFilters}
                className="text-sm text-[#7AC4E0] hover:text-[#9BD4EA] transition-colors"
              >
                Limpiar filtros
              </button>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
              {posts.map((post, index) => (
                <article
                  key={post.id}
                  className="group"
                  data-testid={`blog-post-card-${post.id}`}
                >
                  <Link href={`/blog/${post.slug}`}>
                    {/* Cover Image */}
                    <div className="relative aspect-[16/9] mb-5 rounded-xl overflow-hidden bg-[#0C1016]">
                      <img
                        src={post.coverImage || post.cover_image}
                        alt={post.title}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#05060A]/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    </div>

                    {/* Category */}
                    <div className="flex items-center gap-3 mb-3">
                      <span className="text-[0.6875rem] font-medium text-[#7AC4E0] tracking-wide">
                        {post.category}
                      </span>
                      <span className="w-1 h-1 rounded-full bg-[#3D4654]" />
                      <span className="flex items-center gap-1.5 text-[0.6875rem] text-[#5D6878]">
                        <Clock className="w-3 h-3" />
                        {post.readingTime || post.reading_time || '5'} min
                      </span>
                    </div>

                    {/* Title */}
                    <h2 className="text-lg md:text-xl font-medium text-[#F4F6F9] mb-3 leading-snug tracking-[-0.01em] group-hover:text-[#7AC4E0] transition-colors">
                      {post.title}
                    </h2>

                    {/* Excerpt */}
                    <p className="text-sm text-[#6B7280] leading-relaxed line-clamp-2 mb-4">
                      {post.excerpt}
                    </p>

                    {/* Date */}
                    <div className="flex items-center gap-2 text-xs text-[#5D6878]">
                      <Calendar className="w-3.5 h-3.5" />
                      {formatDate(post.publishedAt || post.published_at)}
                    </div>
                  </Link>
                </article>
              ))}
            </div>
          )}

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex items-center justify-center gap-2 mt-12">
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                <button
                  key={page}
                  onClick={() => setCurrentPage(page)}
                  className={`w-10 h-10 rounded-lg text-sm font-medium transition-all ${
                    currentPage === page
                      ? 'bg-[#5A7BFA] text-white'
                      : 'bg-[rgba(255,255,255,0.04)] text-[#9BA5B7] hover:bg-[rgba(255,255,255,0.08)]'
                  }`}
                >
                  {page}
                </button>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Footer CTA */}
      <section className="py-16 border-t border-[rgba(255,255,255,0.04)]">
        <div className="container-main text-center">
          <p className="text-[#6B7280] mb-6">
            ¿Listo para transformar tu organización con inteligencia aplicada?
          </p>
          <Link
            href="/#contact"
            className="btn-primary inline-flex items-center group"
          >
            Iniciar Conversación
            <ArrowRight className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>
      </section>
    </div>
  );
};

export default BlogPage;
