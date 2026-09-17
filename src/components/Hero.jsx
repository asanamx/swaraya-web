'use client';

import { useEffect, useRef, useState } from 'react';
import { ArrowRight } from 'lucide-react';
import LiveRow from './LiveRow';
import HeroVideo from './HeroVideo';

// Configuración del video atmosférico del hero (§4b).
// ─────────────────────────────────────────────────────────────
// Preferencia 1 del spec: murmuración de estorninos (starling murmuration)
//   - Enjambre = concepto de la marca (swar → swarm) sin mostrar insectos
//   - Video tratado con grayscale + contrast + overlay oscuro (HeroVideo.jsx)
//   - No carga en touch / reduced-motion / reduced-data — solo poster + glow
const HERO_VIDEO = {
  src:     '/hero/hero-bg.mp4',        // 3.1 MB · H.264 · 960×540 · 15s · Safari fallback
  srcWebm: '/hero/hero-bg.webm',       // 2.6 MB · VP9 · más eficiente · Chrome/Firefox
  poster:  '/hero/hero-poster.jpg',    // frame representativo del video (t=5s)
};

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
      className="relative min-h-screen overflow-hidden with-grain invertido"
      style={{ background: 'var(--tema)', color: 'var(--texto)' }}
      data-testid="hero-section"
      ref={heroRef}
    >
      {/* Video atmosférico (§4b) — no carga en touch / reduced-motion / reduced-data.
          El hero funciona idéntico si el video nunca se sirve (fallback poster). */}
      <HeroVideo
        src={HERO_VIDEO.src}
        srcWebm={HERO_VIDEO.srcWebm}
        poster={HERO_VIDEO.poster}
      />

      {/* Cursor spotlight (sólo hero desktop) */}
      <div className="hero-spotlight" aria-hidden="true" />

      {/* Ghost wordmark "sw." — capa de profundidad, esquina inf. derecha */}
      <span aria-hidden="true" className="ghost-wordmark ghost-wordmark--dark">sw.</span>

      {/* Un solo glow radial ultramar desplazado — spec 74% 30% */}
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none hero-glow"
        style={{
          background:
            'radial-gradient(60% 46% at 74% 30%, rgba(200, 232, 36, 0.11) 0%, transparent 68%)',
        }}
      />

      {/* Grid pattern muy sutil — líneas cream sobre oscuro */}
      <div
        aria-hidden="true"
        className="absolute top-0 left-0 right-0 h-px"
        style={{
          background:
            'linear-gradient(90deg, transparent 0%, rgba(13, 15, 14,0.28) 50%, transparent 100%)',
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
              color: '#c8e824',
              fontWeight: 500,
              transitionDelay: '40ms',
              opacity: isLoaded ? 1 : 0,
              transform: isLoaded ? 'translateY(0)' : 'translateY(12px)',
              transition: 'opacity 600ms cubic-bezier(0.2,0.6,0.2,1), transform 600ms cubic-bezier(0.2,0.6,0.2,1)',
            }}
            data-testid="hero-eyebrow"
          >
            <span style={{ width: 28, height: 1, background: '#c8e824', opacity: 0.6 }} />
            Agencia de Inteligencia Aplicada
          </div>

          {/* Headline · 3 líneas forzadas, tercera en brote */}
          <h1
            className="m-0 max-w-[14ch]"
            style={{
              fontFamily: "'Cabinet Grotesk', sans-serif",
              fontSize: 'clamp(2.5rem, 6.4vw, 5.75rem)',
              lineHeight: 0.98,
              letterSpacing: '-0.035em',
              fontWeight: 500,
              color: '#ffffff',
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
              Tu mejor criterio,
            </span>
            <span
              style={{
                display: 'block',
                opacity: isLoaded ? 1 : 0,
                transform: isLoaded ? 'translateY(0)' : 'translateY(12px)',
                transition: `opacity 600ms cubic-bezier(0.2,0.6,0.2,1) ${line2Delay}ms, transform 600ms cubic-bezier(0.2,0.6,0.2,1) ${line2Delay}ms`,
              }}
            >
              aplicado todos
            </span>
            <span
              style={{
                display: 'block',
                color: '#c8e824',
                opacity: isLoaded ? 1 : 0,
                transform: isLoaded ? 'translateY(0)' : 'translateY(12px)',
                transition: `opacity 600ms cubic-bezier(0.2,0.6,0.2,1) ${line3Delay}ms, transform 600ms cubic-bezier(0.2,0.6,0.2,1) ${line3Delay}ms`,
              }}
            >
              los días.
            </span>
          </h1>

          {/* Subhead */}
          <p
            className="mt-10 md:mt-12 max-w-[60ch]"
            style={{
              fontSize: 'clamp(1rem, 1.25vw, 1.15rem)',
              lineHeight: 1.55,
              color: 'rgba(255, 255, 255,0.72)',
              fontFamily: "'Inter', sans-serif",
              fontWeight: 400,
              opacity: isLoaded ? 1 : 0,
              transform: isLoaded ? 'translateY(0)' : 'translateY(12px)',
              transition: 'opacity 600ms cubic-bezier(0.2,0.6,0.2,1) 340ms, transform 600ms cubic-bezier(0.2,0.6,0.2,1) 340ms',
            }}
            data-testid="hero-subhead"
          >
            Destilamos el juicio que hoy vive en la cabeza de tu gente y lo
            convertimos en sistemas que deciden con tu estándar. Precisión medida
            contra casos reales, y aprobación humana antes de cada acción.
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
              onClick={() => scrollToSection('#contacto')}
              className="inline-flex items-center justify-center gap-3 rounded-full transition-all duration-300"
              style={{
                minHeight: 44,
                padding: '16px 32px',
                background: '#c8e824',
                color: '#0d0f0e',                     /* tinta oscura sobre miel · ≈7.8:1 ✓ */
                fontFamily: "'Inter', sans-serif",
                fontWeight: 600,
                fontSize: '0.9375rem',
                letterSpacing: '0.005em',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = '#e2f56e';
                e.currentTarget.style.transform = 'translateY(-2px)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = '#c8e824';
                e.currentTarget.style.transform = 'translateY(0)';
              }}
              data-testid="hero-cta-primary"
            >
              Agendar diagnóstico
              <ArrowRight size={16} />
            </button>
            <button
              onClick={() => scrollToSection('#metodo')}
              className="inline-flex items-center justify-center rounded-full transition-all duration-300"
              style={{
                minHeight: 44,
                padding: '16px 32px',
                background: 'transparent',
                color: '#ffffff',
                fontFamily: "'Inter', sans-serif",
                fontWeight: 500,
                fontSize: '0.9375rem',
                letterSpacing: '0.005em',
                border: '1px solid rgba(255, 255, 255,0.25)',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = '#c8e824';
                e.currentTarget.style.color = '#c8e824';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = 'rgba(255, 255, 255,0.25)';
                e.currentTarget.style.color = '#ffffff';
              }}
              data-testid="hero-cta-secondary"
            >
              Ver el método
            </button>
          </div>

          {/* Fila viva — momento signature (bajo el titular) */}
          <div
            className="mt-8 md:mt-10 max-w-xl"
            style={{
              opacity: isLoaded ? 1 : 0,
              transform: isLoaded ? 'translateY(0)' : 'translateY(12px)',
              transition: 'opacity 600ms cubic-bezier(0.2,0.6,0.2,1) 500ms, transform 600ms cubic-bezier(0.2,0.6,0.2,1) 500ms',
            }}
            data-testid="hero-signals"
          >
            <LiveRow label="Agentes en producción" onDark={true} dotCount={6} />
          </div>

          {/* Garantías de arquitectura — reemplaza la franja de logos.
              Bloque autónomo: intro atenuada + 4 columnas con separadores
              hairline. Mismo espaciado vertical que la franja anterior
              (mt-20/28 + pt-8/10 + border-t). */}
          <div
            className="mt-20 md:mt-28 pt-8 md:pt-10 border-t"
            style={{ borderColor: 'rgba(255, 255, 255,0.10)' }}
            data-testid="hero-guarantees"
          >
            {/* Intro atenuada */}
            <p
              className="mb-5 md:mb-6 max-w-[62ch]"
              style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: '0.8125rem',
                lineHeight: 1.5,
                color: 'rgba(255, 255, 255,0.55)',
                fontWeight: 400,
              }}
            >
              Construimos sobre los modelos frontera de la industria, sin que
              tu operación quede atada a ninguno de ellos.
            </p>

            {/* Grid de 4 garantías con hairlines internas */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
              {[
                {
                  title: 'Modelos intercambiables',
                  body: 'Cambiamos de proveedor sin rehacer tu sistema. La arquitectura no depende de una sola casa.',
                },
                {
                  title: 'Tus datos, tu casa',
                  body: 'Operación en tu infraestructura o en servidor dedicado, con residencia en México si la necesitas.',
                },
                {
                  title: 'Decisiones trazables',
                  body: 'Cada salida del sistema queda registrada con su origen y su regla. Auditable de principio a fin.',
                },
                {
                  title: 'Reversible siempre',
                  body: 'Ningún proceso queda sin control humano. Todo paso se aprueba, se corrige o se revierte.',
                },
              ].map((g, i, arr) => {
                const isLast = i === arr.length - 1;
                return (
                  <div
                    key={g.title}
                    className="guarantee-cell"
                    style={{
                      padding: '14px 20px 14px 0',
                      borderBottom: isLast
                        ? 'none'
                        : '1px solid rgba(255, 255, 255,0.10)',
                    }}
                    data-testid={`guarantee-${i + 1}`}
                  >
                    <h3
                      style={{
                        fontFamily: "'Inter', sans-serif",
                        fontSize: '0.8125rem',
                        fontWeight: 600,
                        letterSpacing: '-0.005em',
                        color: '#ffffff',
                        marginBottom: 6,
                      }}
                    >
                      {g.title}
                    </h3>
                    <p
                      style={{
                        fontFamily: "'Inter', sans-serif",
                        fontSize: '0.75rem',
                        lineHeight: 1.5,
                        color: 'rgba(255, 255, 255,0.60)',
                        margin: 0,
                        maxWidth: '32ch',
                      }}
                    >
                      {g.body}
                    </p>
                  </div>
                );
              })}
            </div>

            {/* Responsive borders — vertical en sm/lg, horizontal en móvil.
                Móvil (<640): border-bottom entre celdas (excepto última) via inline style.
                Tablet (640–1023): 2 cols. Borde izq. en cells pares (2,4). Borde inferior en fila 1 (cells 1,2).
                Desktop (1024+): 4 cols. Borde izq. en cells 2,3,4. */}
            <style jsx>{`
              @media (min-width: 640px) and (max-width: 1023.98px) {
                .guarantee-cell {
                  padding: 14px 20px !important;
                  border-bottom: none !important;
                  border-left: none !important;
                  min-height: 78px;
                }
                .guarantee-cell:nth-child(2n+1) {
                  padding-left: 0 !important;
                }
                .guarantee-cell:nth-child(2n) {
                  border-left: 1px solid rgba(255, 255, 255, 0.10) !important;
                }
                .guarantee-cell:nth-child(-n+2) {
                  border-bottom: 1px solid rgba(255, 255, 255, 0.10) !important;
                }
              }
              @media (min-width: 1024px) {
                .guarantee-cell {
                  padding: 6px 24px !important;
                  border-bottom: none !important;
                  border-left: 1px solid rgba(255, 255, 255, 0.10) !important;
                  min-height: 64px;
                }
                .guarantee-cell:first-child {
                  border-left: none !important;
                  padding-left: 0 !important;
                }
              }
            `}</style>
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
          color: 'rgba(255, 255, 255,0.55)',
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
            'linear-gradient(to bottom, transparent 0%, rgba(13, 15, 14,0) 40%, rgba(255, 255, 255,0.04) 70%, rgba(255, 255, 255,0.18) 100%)',
        }}
      />
    </section>
  );
};

export default Hero;
