'use client';

import { useEffect, useRef, useState } from 'react';
import { ArrowRight } from 'lucide-react';

export const Hero = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const heroRef = useRef(null);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoaded(true), 100);
    return () => clearTimeout(timer);
  }, []);

  // Cursor spotlight — Prompt A · desactivado en touch/reduced-motion
  useEffect(() => {
    if (typeof window === 'undefined') return;
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    const hasHover = window.matchMedia('(hover: hover)').matches;
    if (mq.matches || !hasHover) return;

    const el = heroRef.current;
    if (!el) return;
    let raf = null;
    let x = 0, y = 0;
    const onMove = (e) => {
      const rect = el.getBoundingClientRect();
      x = e.clientX - rect.left;
      y = e.clientY - rect.top;
      if (raf) return;
      raf = requestAnimationFrame(() => {
        el.style.setProperty('--mx', `${x}px`);
        el.style.setProperty('--my', `${y}px`);
        raf = null;
      });
    };
    el.addEventListener('mousemove', onMove);
    return () => {
      el.removeEventListener('mousemove', onMove);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  const scrollToSection = (href) => {
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  // Stagger delays para el titular (bloque 7 · motion contenido)
  const line1Delay = 100;
  const line2Delay = 180;
  const line3Delay = 260;

  return (
    <section
      className="relative min-h-screen overflow-hidden"
      style={{ background: '#0A0C10', color: '#F5F2EC' }}
      data-testid="hero-section"
      ref={heroRef}
    >
      {/* Cursor spotlight (Prompt A · sólo hero desktop) */}
      <div className="hero-spotlight" aria-hidden="true" />

      {/* Un solo glow radial indigo — sustituye partículas + AbstractVisual. */}
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none hero-glow"
        style={{
          background:
            'radial-gradient(circle at 70% 45%, rgba(84,104,214,0.18) 0%, rgba(84,104,214,0.06) 30%, transparent 60%)',
        }}
      />

      {/* Grid casi imperceptible — 0.03 opacity per brief */}
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage:
            'linear-gradient(rgba(245,242,236,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(245,242,236,0.03) 1px, transparent 1px)',
          backgroundSize: '80px 80px',
        }}
      />

      {/* Top accent line */}
      <div
        aria-hidden="true"
        className="absolute top-0 left-0 right-0 h-px"
        style={{
          background:
            'linear-gradient(90deg, transparent 0%, rgba(44,62,128,0.28) 50%, transparent 100%)',
        }}
      />

      {/* Content */}
      <div className="container-main relative z-10">
        <div
          className="flex flex-col justify-center min-h-screen pt-24 md:pt-32 pb-24 md:pb-32 max-w-[1100px]"
        >
          {/* Eyebrow */}
          <div
            className="flex items-center gap-3 mb-8 md:mb-12 reveal-motion"
            style={{
              fontSize: '0.75rem',
              letterSpacing: '0.32em',
              textTransform: 'uppercase',
              color: '#5468D6',
              fontWeight: 500,
              transitionDelay: '40ms',
              opacity: isLoaded ? 1 : 0,
              transform: isLoaded ? 'translateY(0)' : 'translateY(12px)',
              transition: 'opacity 600ms cubic-bezier(0.2,0.6,0.2,1), transform 600ms cubic-bezier(0.2,0.6,0.2,1)',
            }}
            data-testid="hero-eyebrow"
          >
            <span style={{ width: 28, height: 1, background: '#5468D6', opacity: 0.6 }} />
            Agencia de Inteligencia Artificial Aplicada
          </div>

          {/* Headline · Vía A (dos voces, no tres) — stagger 80ms por línea */}
          <h1
            className="m-0 max-w-[14ch]"
            style={{
              fontFamily: "'Cabinet Grotesk', sans-serif",
              fontSize: 'clamp(2.75rem, 7.2vw, 6.5rem)',
              lineHeight: 0.98,
              letterSpacing: '-0.035em',
              fontWeight: 500,
              color: '#F5F2EC',
            }}
            data-testid="hero-headline"
          >
            <span
              style={{
                display: 'block',
                opacity: isLoaded ? 1 : 0,
                transform: isLoaded ? 'translateY(0)' : 'translateY(12px)',
                transition: `opacity 600ms cubic-bezier(0.2,0.6,0.2,1) ${line1Delay}ms, transform 600ms cubic-bezier(0.2,0.6,0.2,1) ${line1Delay}ms`,
              }}
            >
              Investigación profunda.
            </span>
            <span
              style={{
                display: 'block',
                opacity: isLoaded ? 1 : 0,
                transform: isLoaded ? 'translateY(0)' : 'translateY(12px)',
                transition: `opacity 600ms cubic-bezier(0.2,0.6,0.2,1) ${line2Delay}ms, transform 600ms cubic-bezier(0.2,0.6,0.2,1) ${line2Delay}ms`,
              }}
            >
              Ingeniería precisa.
            </span>
            <span
              style={{
                display: 'block',
                color: '#5468D6',
                opacity: isLoaded ? 1 : 0,
                transform: isLoaded ? 'translateY(0)' : 'translateY(12px)',
                transition: `opacity 600ms cubic-bezier(0.2,0.6,0.2,1) ${line3Delay}ms, transform 600ms cubic-bezier(0.2,0.6,0.2,1) ${line3Delay}ms`,
              }}
            >
              Inteligencia real.
            </span>
          </h1>

          {/* Subhead */}
          <p
            className="mt-10 md:mt-12 max-w-[60ch]"
            style={{
              fontSize: 'clamp(1rem, 1.25vw, 1.15rem)',
              lineHeight: 1.55,
              color: 'rgba(245,242,236,0.72)',
              fontFamily: "'Inter', sans-serif",
              fontWeight: 400,
              opacity: isLoaded ? 1 : 0,
              transform: isLoaded ? 'translateY(0)' : 'translateY(12px)',
              transition: 'opacity 600ms cubic-bezier(0.2,0.6,0.2,1) 340ms, transform 600ms cubic-bezier(0.2,0.6,0.2,1) 340ms',
            }}
            data-testid="hero-subhead"
          >
            Diseñamos sistemas de inteligencia artificial para conversaciones
            estratégicas de largo plazo — ventaja estructural, no novedad.
            Cada solución es una arquitectura precisa: investigada y diseñada.
          </p>

          {/* CTAs */}
          <div
            className="mt-12 md:mt-14 flex flex-col sm:flex-row items-stretch sm:items-center gap-4"
            style={{
              opacity: isLoaded ? 1 : 0,
              transform: isLoaded ? 'translateY(0)' : 'translateY(12px)',
              transition: 'opacity 600ms cubic-bezier(0.2,0.6,0.2,1) 420ms, transform 600ms cubic-bezier(0.2,0.6,0.2,1) 420ms',
            }}
          >
            <button
              onClick={() => scrollToSection('#contact')}
              className="inline-flex items-center justify-center gap-3 rounded-full transition-all duration-300"
              style={{
                minHeight: 44,
                padding: '16px 32px',
                background: '#5468D6',
                color: '#FFFFFF',
                fontFamily: "'Inter', sans-serif",
                fontWeight: 500,
                fontSize: '0.9375rem',
                letterSpacing: '0.005em',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = '#7585E0';
                e.currentTarget.style.transform = 'translateY(-2px)';
                e.currentTarget.style.boxShadow = '0 16px 32px -8px rgba(84,104,214,0.45)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = '#5468D6';
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = 'none';
              }}
              data-testid="hero-cta-primary"
            >
              Iniciar diálogo
              <ArrowRight size={16} />
            </button>
            <button
              onClick={() => scrollToSection('#research')}
              className="inline-flex items-center justify-center rounded-full transition-all duration-300"
              style={{
                minHeight: 44,
                padding: '16px 32px',
                background: 'transparent',
                color: '#F5F2EC',
                fontFamily: "'Inter', sans-serif",
                fontWeight: 500,
                fontSize: '0.9375rem',
                letterSpacing: '0.005em',
                border: '1px solid rgba(245,242,236,0.25)',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = '#5468D6';
                e.currentTarget.style.color = '#5468D6';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = 'rgba(245,242,236,0.25)';
                e.currentTarget.style.color = '#F5F2EC';
              }}
              data-testid="hero-cta-secondary"
            >
              Ver nuestros Dominios
            </button>
          </div>

          {/* Fila de prueba — señales concretas (bloque 1) */}
          <div
            className="mt-8 md:mt-10 flex flex-wrap items-center gap-x-5 gap-y-3"
            style={{
              opacity: isLoaded ? 1 : 0,
              transform: isLoaded ? 'translateY(0)' : 'translateY(12px)',
              transition: 'opacity 600ms cubic-bezier(0.2,0.6,0.2,1) 500ms, transform 600ms cubic-bezier(0.2,0.6,0.2,1) 500ms',
              fontFamily: "'Inter', sans-serif",
              fontSize: 13,
              color: '#C8CCDC',
              letterSpacing: '0.005em',
            }}
            data-testid="hero-signals"
          >
            <span className="inline-flex items-center gap-2">
              <span
                aria-hidden="true"
                style={{
                  display: 'inline-block',
                  width: 6, height: 6, borderRadius: 999, background: '#5468D6',
                }}
              />
              Agentes en producción
            </span>
            <span aria-hidden="true" style={{ width: 20, height: 1, background: 'rgba(200,204,220,0.25)' }} />
            <span>Inmobiliario</span>
            <span aria-hidden="true" style={{ width: 20, height: 1, background: 'rgba(200,204,220,0.25)' }} />
            <span>Fiscal</span>
          </div>

          {/* Tech stack — logos oficiales monocromos */}
          <div
            className="mt-20 md:mt-28 pt-8 md:pt-10 border-t"
            style={{ borderColor: 'rgba(245,242,236,0.10)' }}
          >
            <div className="flex flex-wrap items-center gap-x-10 gap-y-6 md:gap-x-14">
              <span
                style={{
                  fontSize: '0.6875rem',
                  letterSpacing: '0.28em',
                  textTransform: 'uppercase',
                  color: 'rgba(245,242,236,0.55)',
                  fontWeight: 500,
                }}
              >
                Stack
              </span>

              {/* Anthropic */}
              <div className="flex items-center gap-2 transition-all duration-300 hover:opacity-100" style={{ opacity: 0.55, color: 'rgba(245,242,236,0.55)' }}
                onMouseEnter={(e) => { e.currentTarget.style.opacity = '1'; e.currentTarget.style.color = '#5468D6'; }}
                onMouseLeave={(e) => { e.currentTarget.style.opacity = '0.55'; e.currentTarget.style.color = 'rgba(245,242,236,0.55)'; }}
                title="Anthropic"
              >
                <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor" aria-hidden="true"><path d="M17.3041 3.541h-3.6718l6.696 16.918H24Zm-10.6082 0L0 20.459h3.7442l1.3693-3.5527h7.0052l1.3693 3.5528h3.7442L10.5363 3.5409Zm-.3712 10.2232 2.2914-5.9456 2.2914 5.9456Z"/></svg>
                <span style={{ fontSize: '0.8125rem', fontWeight: 500, letterSpacing: '-0.01em' }}>Anthropic</span>
              </div>

              {/* OpenAI */}
              <div className="flex items-center gap-2 transition-all duration-300" style={{ opacity: 0.55, color: 'rgba(245,242,236,0.55)' }}
                onMouseEnter={(e) => { e.currentTarget.style.opacity = '1'; e.currentTarget.style.color = '#5468D6'; }}
                onMouseLeave={(e) => { e.currentTarget.style.opacity = '0.55'; e.currentTarget.style.color = 'rgba(245,242,236,0.55)'; }}
                title="OpenAI"
              >
                <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor"><path d="M22.2819 9.8211a5.9847 5.9847 0 0 0-.5157-4.9108 6.0462 6.0462 0 0 0-6.5098-2.9A6.0651 6.0651 0 0 0 4.9807 4.1818a5.9847 5.9847 0 0 0-3.9977 2.9 6.0462 6.0462 0 0 0 .7427 7.0966 5.98 5.98 0 0 0 .511 4.9107 6.051 6.051 0 0 0 6.5146 2.9001A5.9847 5.9847 0 0 0 13.2599 24a6.0557 6.0557 0 0 0 5.7718-4.2058 5.9894 5.9894 0 0 0 3.9977-2.9001 6.0557 6.0557 0 0 0-.7475-7.0729zm-9.022 12.6081a4.4755 4.4755 0 0 1-2.8764-1.0408l.1419-.0804 4.7783-2.7582a.7948.7948 0 0 0 .3927-.6813v-6.7369l2.02 1.1686a.071.071 0 0 1 .038.052v5.5826a4.504 4.504 0 0 1-4.4945 4.4944zm-9.6607-4.1254a4.4708 4.4708 0 0 1-.5346-3.0137l.142.0852 4.783 2.7582a.7712.7712 0 0 0 .7806 0l5.8428-3.3685v2.3324a.0804.0804 0 0 1-.0332.0615L9.74 19.9502a4.4992 4.4992 0 0 1-6.1408-1.6464zM2.3408 7.8956a4.485 4.485 0 0 1 2.3655-1.9728V11.6a.7664.7664 0 0 0 .3879.6765l5.8144 3.3543-2.0201 1.1685a.0757.0757 0 0 1-.071 0l-4.8303-2.7865A4.504 4.504 0 0 1 2.3408 7.872zm16.5963 3.8558L13.1038 8.364 15.1192 7.2a.0757.0757 0 0 1 .071 0l4.8303 2.7913a4.4944 4.4944 0 0 1-.6765 8.1042v-5.6772a.79.79 0 0 0-.407-.667zm2.0107-3.0231l-.142-.0852-4.7735-2.7818a.7759.7759 0 0 0-.7854 0L9.409 9.2297V6.8974a.0662.0662 0 0 1 .0284-.0615l4.8303-2.7866a4.4992 4.4992 0 0 1 6.6802 4.66zM8.3065 12.863l-2.02-1.1638a.0804.0804 0 0 1-.038-.0567V6.0742a4.4992 4.4992 0 0 1 7.3757-3.4537l-.142.0805L8.704 5.459a.7948.7948 0 0 0-.3927.6813zm1.0976-2.3654l2.602-1.4998 2.6069 1.4998v2.9994l-2.5974 1.4997-2.6067-1.4997Z"/></svg>
                <span style={{ fontSize: '0.8125rem', fontWeight: 500, letterSpacing: '-0.01em' }}>OpenAI</span>
              </div>

              {/* Vercel */}
              <div className="flex items-center gap-2 transition-all duration-300" style={{ opacity: 0.55, color: 'rgba(245,242,236,0.55)' }}
                onMouseEnter={(e) => { e.currentTarget.style.opacity = '1'; e.currentTarget.style.color = '#5468D6'; }}
                onMouseLeave={(e) => { e.currentTarget.style.opacity = '0.55'; e.currentTarget.style.color = 'rgba(245,242,236,0.55)'; }}
                title="Vercel"
              >
                <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor"><path d="m12 1.608 12 20.784H0Z"/></svg>
                <span style={{ fontSize: '0.8125rem', fontWeight: 500, letterSpacing: '-0.01em' }}>Vercel</span>
              </div>

              {/* OpenClaw — tipografía display que respeta el wordmark original */}
              <div className="transition-all duration-300" style={{ opacity: 0.55, color: 'rgba(245,242,236,0.55)' }}
                onMouseEnter={(e) => { e.currentTarget.style.opacity = '1'; e.currentTarget.style.color = '#5468D6'; }}
                onMouseLeave={(e) => { e.currentTarget.style.opacity = '0.55'; e.currentTarget.style.color = 'rgba(245,242,236,0.55)'; }}
                title="OpenClaw"
              >
                <span style={{
                  fontFamily: "'Khand', sans-serif",
                  fontWeight: 700,
                  fontSize: '1.1rem',
                  letterSpacing: '-0.015em',
                  lineHeight: 1,
                }}>OpenClaw</span>
              </div>

              {/* Resend */}
              <div className="flex items-center gap-2 transition-all duration-300" style={{ opacity: 0.55, color: 'rgba(245,242,236,0.55)' }}
                onMouseEnter={(e) => { e.currentTarget.style.opacity = '1'; e.currentTarget.style.color = '#5468D6'; }}
                onMouseLeave={(e) => { e.currentTarget.style.opacity = '0.55'; e.currentTarget.style.color = 'rgba(245,242,236,0.55)'; }}
                title="Resend"
              >
                <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor"><path d="M14.679 0c4.648 0 7.413 2.765 7.413 6.434s-2.765 6.434-7.413 6.434H12.33L24 24h-8.245l-8.88-8.44c-.636-.588-.93-1.273-.93-1.86 0-.831.587-1.565 1.713-1.883l4.574-1.224c1.737-.465 2.936-1.81 2.936-3.572 0-2.153-1.761-3.4-3.939-3.4H0V0z"/></svg>
                <span style={{ fontSize: '0.8125rem', fontWeight: 500, letterSpacing: '-0.01em' }}>Resend</span>
              </div>

              {/* Sanity */}
              <div className="flex items-center gap-2 transition-all duration-300" style={{ opacity: 0.55, color: 'rgba(245,242,236,0.55)' }}
                onMouseEnter={(e) => { e.currentTarget.style.opacity = '1'; e.currentTarget.style.color = '#5468D6'; }}
                onMouseLeave={(e) => { e.currentTarget.style.opacity = '0.55'; e.currentTarget.style.color = 'rgba(245,242,236,0.55)'; }}
                title="Sanity"
              >
                <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor"><path d="m23.327 15.205-.893-1.555-4.321 2.632 4.799-6.11.726-.426-.179-.27.33-.421-1.515-1.261-.693.883-13.992 8.186 5.173-6.221 9.636-5.282-.915-1.769-5.248 2.876 2.584-3.106-1.481-1.305-5.816 6.994-5.777 3.168 4.423-5.847 2.771-1.442-.88-1.789-8.075 4.203L6.186 4.43 4.648 3.198 0 9.349l.072.058.868 1.768 5.153-2.683-4.696 6.207.77.617.458.885 5.425-2.974-5.974 7.185 1.481 1.304.297-.358 14.411-8.459-4.785 6.094.078.065-.007.005.992 1.726 6.364-3.877-2.451 3.954 1.642 1.077L24 15.648z"/></svg>
                <span style={{ fontSize: '0.8125rem', fontWeight: 500, letterSpacing: '-0.01em' }}>Sanity</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 hidden md:block"
        style={{
          opacity: isLoaded ? 0.5 : 0,
          transition: 'opacity 1.2s ease 0.6s',
          fontSize: '0.6875rem',
          letterSpacing: '0.24em',
          textTransform: 'uppercase',
          color: 'rgba(245,242,236,0.55)',
        }}
      >
        ↓  Continúa
      </div>

      {/* Bridge gradient hero → cream (suaviza la transición) */}
      <div
        className="absolute bottom-0 left-0 right-0 pointer-events-none"
        style={{
          height: 120,
          background:
            'linear-gradient(to bottom, transparent 0%, rgba(14,15,17,0) 40%, rgba(245,242,236,0.04) 70%, rgba(245,242,236,0.18) 100%)',
        }}
      />
    </section>
  );
};

export default Hero;
