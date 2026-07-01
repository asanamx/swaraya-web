'use client';

import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { colors, indigoFor, borders } from '../lib/tokens';

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

  // Orden one-pager: las secciones del home en orden de aparición + Blog al final
  // (Blog es la única ruta separada; el resto son anclas de la home)
  const navLinks = [
    { name: 'Investigación', href: '#research' },
    { name: 'Método', href: '#method' },
    { name: 'Filosofía', href: '#philosophy' },
    { name: 'Contacto', href: '#contact' },
    { name: 'Blog', href: '/blog', isRoute: true },
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

  // En la home tenemos un hero OSCURO (mismo tono que el footer). Detectamos
  // si ya pasamos el alto del hero para invertir el navbar de "transparente
  // sobre oscuro" a "cream sobre secciones claras".
  // En el resto de páginas (blog, legal) el hero es claro y aplica la lógica
  // tradicional desde el inicio.
  const [pastHero, setPastHero] = useState(false);

  useEffect(() => {
    if (!isHomePage) {
      setPastHero(true); // forzamos modo "claro" para páginas con hero claro
      return;
    }
    const update = () => {
      const heroH = window.innerHeight; // hero es min-h-screen
      setPastHero(window.scrollY > heroH - 80);
    };
    window.addEventListener('scroll', update, { passive: true });
    update();
    return () => window.removeEventListener('scroll', update);
  }, [isHomePage]);

  // En home, dos estados visuales:
  //   - !pastHero (sobre hero oscuro): nav transparente + texto cream
  //   - pastHero (sobre secciones cream): nav cream con blur + texto sumi
  // En otras páginas siempre estado "claro".
  const onDarkHero = isHomePage && !pastHero;

  // ─────────────────────────────────────────────────────────────────
  // Colores theme-aware — sistema dual aplicado vía tokens.
  // Sobre hero oscuro usa los tokens "on dark"; sobre cream los "on cream".
  // El indigo correcto se resuelve con `indigoFor(surface)`.
  // ─────────────────────────────────────────────────────────────────
  const surface = onDarkHero ? 'dark' : 'cream';
  const indigoAccent = indigoFor(surface);                    // dot del logo, hover de links
  const ctaIndigo = colors.indigo.onDark;                     // CTA siempre brillante (el botón tiene texto cream)
  const ctaIndigoHover = colors.indigo.onDarkHover;

  const navTextColor = isMobileMenuOpen
    ? colors.textOnDark.primary
    : onDarkHero
      ? colors.textOnDark.primary    // cream sobre hero oscuro
      : colors.text.primary;         // sumi sobre cream

  const navMutedColor = isMobileMenuOpen
    ? 'rgba(245,242,236,0.7)'
    : onDarkHero
      ? 'rgba(245,242,236,0.78)'     // cream atenuado sobre oscuro
      : 'rgba(14,15,17,0.62)';       // sumi atenuado sobre cream

  const navHoverColor = indigoAccent;

  // Background del navbar — cuatro estados posibles:
  //   1. Mobile menu abierto → dark sólido
  //   2. Sobre hero oscuro → transparente (el hero ya es oscuro)
  //   3. Sobre cream + scrolleado → cream con blur
  //   4. Sobre cream + en top → transparente
  const navBgStyle = isMobileMenuOpen
    ? { background: colors.dark.base }
    : onDarkHero
      ? { background: 'transparent' }
      : isScrolled
        ? {
            background: 'rgba(245,242,236,0.92)',
            backdropFilter: 'blur(18px) saturate(140%)',
            WebkitBackdropFilter: 'blur(18px) saturate(140%)',
            borderBottom: `1px solid ${borders.onCream.soft}`,
          }
        : { background: 'transparent' };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 ${
        isMobileMenuOpen ? 'h-screen' : ''
      }`}
      style={{
        ...navBgStyle,
        // Crossfade cinematográfico — easing premium, duración cómoda al ojo.
        // Aplicado explícitamente a las propiedades que cambian para evitar
        // jank en navegadores que no transicionan correctamente `transition-all`.
        transitionProperty:
          'background-color, background, backdrop-filter, -webkit-backdrop-filter, border-color, box-shadow',
        transitionDuration: '420ms',
        transitionTimingFunction: 'cubic-bezier(0.22, 1, 0.36, 1)',
      }}
      data-testid="navbar"
    >
      {/* Acento superior — siempre en el DOM, opacity-fade para crossfade suave */}
      <div
        aria-hidden
        className="absolute top-0 left-0 right-0 h-px pointer-events-none"
        style={{
          background:
            `linear-gradient(90deg, transparent 0%, ${colors.indigo.onDark}59 50%, transparent 100%)`,
          opacity: !onDarkHero && isScrolled && !isMobileMenuOpen ? 1 : 0,
          transition: 'opacity 420ms cubic-bezier(0.22, 1, 0.36, 1)',
        }}
      />

      <div className="container-main relative">
        <div className="flex items-center justify-between h-14 md:h-16 lg:h-[72px]">
          {/* Logo: swaraya. wordmark (Quiet Confidence) */}
          <Link
            href="/"
            className="relative z-50 inline-flex items-baseline focus:outline-none"
            data-testid="navbar-logo"
            aria-label="swaraya — inicio"
            style={{
              transition: 'color 420ms cubic-bezier(0.22, 1, 0.36, 1)',
              color: isMobileMenuOpen ? '#F5F2EC' : navTextColor,
            }}
          >
            <span
              style={{
                fontFamily: "'Cabinet Grotesk', -apple-system, system-ui, sans-serif",
                fontWeight: 500,
                fontSize: '1.5rem',
                letterSpacing: '-0.035em',
                lineHeight: 1,
                textTransform: 'lowercase',
                color: 'currentColor',
              }}
            >
              swaraya
              <span aria-hidden="true" style={{ color: indigoAccent }}>.</span>
            </span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center gap-9 xl:gap-10">
            {navLinks.map((link) => (
              link.isRoute ? (
                <Link
                  key={link.name}
                  href={link.href}
                  className="link-hover text-[0.8125rem] tracking-wide"
                  style={{
                    color: navMutedColor,
                    transition: 'color 420ms cubic-bezier(0.22, 1, 0.36, 1)',
                  }}
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
                  className="link-hover text-[0.8125rem] tracking-wide"
                  style={{
                    color: navMutedColor,
                    transition: 'color 420ms cubic-bezier(0.22, 1, 0.36, 1)',
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = navHoverColor)}
                  onMouseLeave={(e) => (e.currentTarget.style.color = navMutedColor)}
                  data-testid={`nav-link-${link.name.toLowerCase()}`}
                >
                  {link.name}
                </button>
              )
            ))}
          </div>

          {/* CTA Desktop — mismo indigo que el CTA primario del hero */}
          <button
            onClick={() => scrollToSection('#contact')}
            className="hidden lg:inline-flex items-center justify-center text-[0.8125rem] font-medium tracking-wide rounded-full transition-all duration-300"
            style={{
              minHeight: 44,
              padding: '12px 24px',
              background: ctaIndigo,
              color: '#FFFFFF',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = ctaIndigoHover;
              e.currentTarget.style.boxShadow = `0 8px 20px -6px ${ctaIndigo}66`;
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = ctaIndigo;
              e.currentTarget.style.boxShadow = 'none';
            }}
            data-testid="nav-cta"
          >
            Iniciar Diálogo
          </button>

          {/* Mobile hamburger */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden relative z-50 flex items-center justify-center"
            style={{ color: isMobileMenuOpen ? '#F5F2EC' : navTextColor, width: 44, height: 44 }}
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
                background: colors.indigo.onDark,
                color: colors.textOnDark.primary,
                padding: '14px 26px',
                fontFamily: "'Inter', sans-serif",
              }}
            >
              Iniciar Diálogo →
            </button>
            <div
              className="mt-12 pt-6 flex flex-col gap-2"
              style={{
                borderTop: `1px solid ${borders.onDark.soft}`,
                color: colors.text.secondary,
              }}
            >
              <span
                className="text-xs"
                style={{
                  letterSpacing: '0.16em',
                  textTransform: 'uppercase',
                  color: '#9BA5B7',
                }}
              >
                hola@swaraya.ai
              </span>
              <span
                className="text-xs"
                style={{
                  letterSpacing: '0.04em',
                  color: '#7A8493',
                }}
              >
                Ciudad de México · LatAm + remoto
              </span>
              <span
                className="text-xs"
                style={{
                  letterSpacing: '0.04em',
                  color: '#7A8493',
                }}
              >
                Respuesta en 24 h hábiles
              </span>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
