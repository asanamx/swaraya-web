'use client';

import { useState, useEffect, useRef } from 'react';
import { Menu, X } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

// Inline mark — v5 AXIS
function AxisMark({ size = 22, color = 'currentColor', strokeWidth = 4 }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 64 64"
      width={size}
      height={size}
      style={{ display: 'block', flexShrink: 0 }}
      aria-hidden="true"
    >
      <g stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" fill="none">
        <line x1="32" y1="10" x2="32" y2="24" />
        <line x1="32" y1="40" x2="32" y2="54" />
        <line x1="10" y1="32" x2="24" y2="32" />
        <line x1="40" y1="32" x2="54" y2="32" />
        <line x1="44.5" y1="19.5" x2="50" y2="14" />
      </g>
    </svg>
  );
}

export const Navbar = () => {
  const [scrollY, setScrollY] = useState(0);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();
  const isHomePage = pathname === '/';

  // Scroll-driven logo morph (Anthropic-style)
  // 0–60px: full wordmark visible
  // 60–140px: crossfade wordmark→glyph
  // >140px: only glyph
  const MORPH_START = 60;
  const MORPH_END = 140;
  const morphProgress = Math.min(Math.max((scrollY - MORPH_START) / (MORPH_END - MORPH_START), 0), 1);
  const wordmarkOpacity = 1 - morphProgress;
  const glyphOpacity = morphProgress;
  // Glyph scale: starts at 0.7, ends at 1
  const glyphScale = 0.7 + morphProgress * 0.3;
  // On non-homepage routes, always show the compact glyph + wordmark (no morph)
  const isCompact = !isHomePage || scrollY > MORPH_END;

  const isScrolled = scrollY > 80;

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024 && isMobileMenuOpen) setIsMobileMenuOpen(false);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [isMobileMenuOpen]);

  useEffect(() => {
    document.body.style.overflow = isMobileMenuOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [isMobileMenuOpen]);

  const navLinks = [
    { name: 'Investigación', href: '#research' },
    { name: 'Método', href: '#method' },
    { name: 'Filosofía', href: '#philosophy' },
    { name: 'Blog', href: '/blog', isRoute: true },
    { name: 'Contacto', href: '#contact' },
  ];

  const scrollToSection = (href) => {
    if (href.startsWith('#')) {
      if (!isHomePage) {
        window.location.href = '/' + href;
        return;
      }
      const element = document.querySelector(href);
      if (element) element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMobileMenuOpen(false);
  };

  // Full light theme now — no more dark hero overlay
  const navTextColor = '#0E0F11';
  const navMutedColor = 'rgba(14,15,17,0.6)';
  const navHoverColor = '#2C3E80';
  const navBgClass = isMobileMenuOpen
    ? 'bg-[#0E0F11]'
    : isScrolled
      ? 'bg-[#F5F2EC]/92 backdrop-blur-xl border-b border-[rgba(14,15,17,0.06)]'
      : 'bg-[#F5F2EC]/0';

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${navBgClass} ${
        isMobileMenuOpen ? 'h-screen' : ''
      }`}
      data-testid="navbar"
    >
      <div className="container-main">
        <div className="flex items-center justify-between h-14 md:h-16 lg:h-[72px]">
          {/* Logo: Anthropic-style scroll morph
              The "s" IS the logomark. The rest of "swaraya" fades away on scroll. */}
          <Link
            href="/"
            className="relative z-50 flex items-center"
            data-testid="navbar-logo"
            aria-label="swaraya — Inicio"
            style={{ color: isMobileMenuOpen ? '#F5F2EC' : navTextColor }}
          >
            {isHomePage && !isMobileMenuOpen ? (
              // HOME — wordmark "swaraya" morphs to standalone "s"
              <div
                style={{
                  position: 'relative',
                  display: 'flex',
                  alignItems: 'center',
                  height: '28px',
                  fontFamily: "'Author', sans-serif",
                  fontWeight: 600,
                  letterSpacing: '-0.03em',
                  fontSize: '1.5rem',
                  lineHeight: 1,
                  whiteSpace: 'nowrap',
                }}
              >
                {/* "s" — sticks around as the brandmark */}
                <span
                  style={{
                    display: 'inline-block',
                    transform: `scale(${1 + morphProgress * 0.18})`,
                    transformOrigin: 'left center',
                    transition: 'transform 80ms linear',
                  }}
                >
                  s
                </span>
                {/* "waraya" — fades out and pulls left slightly */}
                <span
                  style={{
                    display: 'inline-block',
                    opacity: wordmarkOpacity,
                    transform: `translateX(${(1 - wordmarkOpacity) * -6}px)`,
                    transition: 'opacity 80ms linear, transform 80ms linear',
                  }}
                >
                  waraya
                </span>
              </div>
            ) : (
              // BLOG / other routes — wordmark only, always
              <div
                style={{
                  fontFamily: "'Author', sans-serif",
                  fontWeight: 600,
                  letterSpacing: '-0.03em',
                  fontSize: '1.3125rem',
                  lineHeight: 1,
                  whiteSpace: 'nowrap',
                }}
              >
                swaraya
              </div>
            )}
          </Link>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center gap-9 xl:gap-10">
            {navLinks.map((link) => (
              link.isRoute ? (
                <Link
                  key={link.name}
                  href={link.href}
                  className="link-hover text-[0.8125rem] tracking-wide transition-colors"
                  style={{ color: navMutedColor }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = navHoverColor)}
                  onMouseLeave={(e) => (e.currentTarget.style.color = navMutedColor)}
                  data-testid={`nav-link-${link.name.toLowerCase()}`}
                >
                  {link.name}
                </Link>
              ) : (
                <button
                  key={link.name}
                  onClick={() => scrollToSection(link.href)}
                  className="link-hover text-[0.8125rem] tracking-wide transition-colors"
                  style={{ color: navMutedColor }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = navHoverColor)}
                  onMouseLeave={(e) => (e.currentTarget.style.color = navMutedColor)}
                  data-testid={`nav-link-${link.name.toLowerCase()}`}
                >
                  {link.name}
                </button>
              )
            ))}
          </div>

          {/* CTA Desktop */}
          <button
            onClick={() => scrollToSection('#contact')}
            className="hidden lg:inline-flex items-center justify-center text-[0.8125rem] font-medium tracking-wide rounded-full transition-all duration-300"
            style={{
              padding: '10px 20px',
              background: '#2C3E80',
              color: '#F5F2EC',
            }}
            data-testid="nav-cta"
          >
            Iniciar Diálogo
          </button>

          {/* Mobile hamburger */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden relative z-50 flex items-center justify-center"
            style={{ color: isMobileMenuOpen ? '#F5F2EC' : navTextColor, width: 40, height: 40 }}
            data-testid="mobile-menu-toggle"
            aria-label="Menu"
          >
            {isMobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>

        {/* Mobile menu */}
        {isMobileMenuOpen && (
          <div className="lg:hidden mt-6 pb-12 flex flex-col" data-testid="mobile-menu">
            {navLinks.map((link, idx) => (
              link.isRoute ? (
                <Link
                  key={link.name}
                  href={link.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="py-4 text-[1.65rem] text-[#F5F2EC]"
                  style={{
                    fontFamily: "'Cabinet Grotesk', sans-serif",
                    fontWeight: 500,
                    letterSpacing: '-0.025em',
                    lineHeight: 1.1,
                    borderBottom: '1px solid rgba(245,242,236,0.06)',
                  }}
                >
                  {link.name}
                </Link>
              ) : (
                <button
                  key={link.name}
                  onClick={() => scrollToSection(link.href)}
                  className="py-4 text-left text-[1.65rem] text-[#F5F2EC] w-full"
                  style={{
                    fontFamily: "'Cabinet Grotesk', sans-serif",
                    fontWeight: 500,
                    letterSpacing: '-0.025em',
                    lineHeight: 1.1,
                    borderBottom: '1px solid rgba(245,242,236,0.06)',
                  }}
                >
                  {link.name}
                </button>
              )
            ))}
            <button
              onClick={() => scrollToSection('#contact')}
              className="mt-10 inline-flex items-center justify-center text-sm font-medium tracking-wide rounded-full self-start"
              style={{
                background: '#5468D6',
                color: '#F5F2EC',
                padding: '14px 26px',
                fontFamily: "'Inter', sans-serif",
              }}
            >
              Iniciar Diálogo →
            </button>
            <div
              className="mt-12 pt-6 text-xs"
              style={{
                borderTop: '1px solid rgba(245,242,236,0.06)',
                color: '#5D6878',
                letterSpacing: '0.16em',
                textTransform: 'uppercase',
              }}
            >
              hola@swaraya.ai · CDMX
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
