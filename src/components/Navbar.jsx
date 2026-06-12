'use client';

import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

// Inline mark — v5 AXIS
function AxisMark({ size = 22, color = 'currentColor' }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 64 64"
      width={size}
      height={size}
      style={{ display: 'block', flexShrink: 0 }}
      aria-hidden="true"
    >
      <g stroke={color} strokeWidth={4} strokeLinecap="round" fill="none">
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
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();
  const isHomePage = pathname === '/';

  // On home, the nav sits over the dark hero until user scrolls past it.
  // On other routes, the nav is always over the cream content.
  const overDarkHero = isHomePage && !isScrolled;

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 80);
    window.addEventListener('scroll', handleScroll, { passive: true });
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

  // Color tokens for current state
  const navTextColor = overDarkHero ? '#F5F2EC' : '#0E0F11';
  const navMutedColor = overDarkHero ? 'rgba(245,242,236,0.65)' : 'rgba(14,15,17,0.6)';
  const navHoverColor = overDarkHero ? '#F5F2EC' : '#2C3E80';
  const navBgClass = isMobileMenuOpen
    ? 'bg-[#0E0F11]'
    : isScrolled
      ? 'bg-[#F5F2EC]/95 backdrop-blur-xl border-b border-[rgba(14,15,17,0.06)]'
      : isHomePage
        ? 'bg-transparent'
        : 'bg-[#F5F2EC]/95 backdrop-blur-xl border-b border-[rgba(14,15,17,0.06)]';

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${navBgClass} ${
        isMobileMenuOpen ? 'h-screen' : ''
      }`}
      data-testid="navbar"
    >
      <div className="container-main">
        <div className="flex items-center justify-between h-14 md:h-16 lg:h-[72px]">
          {/* Logo: glyph + wordmark Author */}
          <Link
            href="/"
            className="relative z-50 flex items-center gap-2.5 md:gap-3"
            data-testid="navbar-logo"
            style={{ color: isMobileMenuOpen ? '#F5F2EC' : navTextColor }}
          >
            <AxisMark size={22} color="currentColor" />
            <span
              style={{
                fontFamily: "'Author', sans-serif",
                fontWeight: 600,
                letterSpacing: '-0.03em',
                fontSize: '1.3125rem',
                lineHeight: 1,
              }}
            >
              swaraya
            </span>
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
              background: overDarkHero ? '#5468D6' : '#2C3E80',
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
