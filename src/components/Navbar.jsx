'use client';

import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import SwarayaCardinal from './SwarayaCardinal';

export const Navbar = () => {
  const [scrollY, setScrollY] = useState(0);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();
  const isHomePage = pathname === '/';

  // Icon is fixed — no scroll morph. Solo necesitamos scrollY para el blur del navbar.
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

  // Theme-aware colors: cream + sumi at hero, invierte a oscuro al scrollear (Camino C2)
  const navTextColor = isMobileMenuOpen
    ? '#F5F2EC'
    : isScrolled
      ? '#F5F2EC'  // cream sobre fondo oscuro
      : '#0E0F11'; // sumi sobre cream del hero

  const navMutedColor = isMobileMenuOpen || isScrolled
    ? 'rgba(245,242,236,0.6)'
    : 'rgba(14,15,17,0.6)';

  const navHoverColor = '#5468D6';

  // Background: cream transparent al inicio, mobile menu sumi sólido,
  // o C2 (Diálogo Abierto) al scrollear: sumi 0.85 + glow indigo radial + accent line
  const navBgStyle = isMobileMenuOpen
    ? { background: '#0E0F11' }
    : isScrolled
      ? {
          background: 'rgba(14,15,17,0.85)',
          backdropFilter: 'blur(20px) saturate(130%)',
          WebkitBackdropFilter: 'blur(20px) saturate(130%)',
          borderBottom: '1px solid rgba(84,104,214,0.08)',
        }
      : { background: 'transparent' };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-350 ${
        isMobileMenuOpen ? 'h-screen' : ''
      }`}
      style={navBgStyle}
      data-testid="navbar"
    >
      {/* C2 — "Eco de Diálogo Abierto": glow indigo + accent line, solo al scrollear */}
      {isScrolled && !isMobileMenuOpen && (
        <>
          {/* Línea de acento indigo superior (gradient horizontal) */}
          <div
            aria-hidden
            className="absolute top-0 left-0 right-0 h-px pointer-events-none"
            style={{
              background:
                'linear-gradient(90deg, transparent 0%, rgba(84,104,214,0.4) 50%, transparent 100%)',
            }}
          />
          {/* Glow indigo radial — mismo recipe que el footer "Diálogo Abierto" */}
          <div
            aria-hidden
            className="absolute inset-0 pointer-events-none"
            style={{
              background:
                'radial-gradient(ellipse 60% 100% at 8% 50%, rgba(84,104,214,0.16) 0%, transparent 60%), radial-gradient(ellipse 40% 100% at 95% 50%, rgba(44,62,128,0.10) 0%, transparent 60%)',
            }}
          />
        </>
      )}

      <div className="container-main relative">
        <div className="flex items-center justify-between h-14 md:h-16 lg:h-[72px]">
          {/* Logo: Cardinal Asimétrico A → Sextante B (scroll-driven, no letter deformation) */}
          <Link
            href="/"
            className="relative z-50 flex items-center gap-2.5"
            data-testid="navbar-logo"
            aria-label="swaraya — Inicio"
            style={{ color: isMobileMenuOpen ? '#F5F2EC' : navTextColor }}
          >
            <SwarayaCardinal
              size={30}
              color="currentColor"
              accent={isMobileMenuOpen || isScrolled ? '#5468D6' : '#2C3E80'}
              strokeWidth={2.6}
            />
            <span
              style={{
                fontFamily: "'Inter', sans-serif",
                fontWeight: 700,
                fontSize: '1.375rem',
                letterSpacing: '-0.028em',
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
