'use client';

import { useState, useEffect } from 'react';

// ============================================================
// EXACT COLORS FROM THE LIVE SITE
// ============================================================
const COLORS = {
  cream: '#F5F2EC',
  text: '#0E0F11',
  muted: 'rgba(14,15,17,0.6)',
  border: 'rgba(14,15,17,0.06)',
  indigo: '#2C3E80', // main brand accent — Iniciar Diálogo button, headlines
  indigoLight: '#5468D6',
};

// ============================================================
// THE ICON SYSTEM — same coordinates, two states
// ============================================================

// VARIANT A — Cardinal Asimétrico completo
function IconA({ size = 24, fg = COLORS.text, accent = COLORS.indigo, strokeWidth = 2, opacity = 1 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" fill="none" aria-hidden style={{ opacity }}>
      {/* NE long ray */}
      <line x1="34.5" y1="29.5" x2="58" y2="6" stroke={fg} strokeWidth={strokeWidth} strokeLinecap="round" />
      {/* N short ray */}
      <line x1="32" y1="28" x2="32" y2="14" stroke={fg} strokeWidth={strokeWidth} strokeLinecap="round" />
      {/* S medium ray */}
      <line x1="32" y1="36" x2="32" y2="54" stroke={fg} strokeWidth={strokeWidth} strokeLinecap="round" />
      {/* E small marker */}
      <line x1="36" y1="32" x2="46" y2="32" stroke={fg} strokeWidth={strokeWidth * 0.9} strokeLinecap="round" opacity="0.6" />
      {/* W small marker */}
      <line x1="28" y1="32" x2="18" y2="32" stroke={fg} strokeWidth={strokeWidth * 0.9} strokeLinecap="round" opacity="0.6" />
      {/* Center — bigger, more present */}
      <circle cx="32" cy="32" r="3.4" fill={accent} />
    </svg>
  );
}

// VARIANT B — Sextante
function IconB({ size = 24, fg = COLORS.text, accent = COLORS.indigo, strokeWidth = 2, opacity = 1 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" fill="none" aria-hidden style={{ opacity }}>
      <line x1="34.5" y1="29.5" x2="58" y2="6" stroke={fg} strokeWidth={strokeWidth} strokeLinecap="round" />
      <circle cx="32" cy="32" r="3.4" fill={accent} />
    </svg>
  );
}

// ============================================================
// CROSSFADE BETWEEN A AND B BASED ON PROGRESS
// progress: 0 = A (full)  · 1 = B (sextante)
// All rays of A live in the SVG simultaneously, but the "extra" rays
// (N, S, E, W) fade out as progress → 1. Only NE remains at 100%.
// ============================================================
function MorphIcon({ size = 24, progress = 0, fg = COLORS.text, accent = COLORS.indigo, strokeWidth = 2 }) {
  // Crossfade individual ray opacities
  const fadeOpacity = 1 - progress;
  const eOpacity = 0.6 * fadeOpacity;
  const wOpacity = 0.6 * fadeOpacity;

  return (
    <svg width={size} height={size} viewBox="0 0 64 64" fill="none" aria-hidden>
      {/* NE long ray — ALWAYS visible */}
      <line x1="34.5" y1="29.5" x2="58" y2="6" stroke={fg} strokeWidth={strokeWidth} strokeLinecap="round" />
      {/* N short ray — fades */}
      <line x1="32" y1="28" x2="32" y2="14" stroke={fg} strokeWidth={strokeWidth} strokeLinecap="round" opacity={fadeOpacity} />
      {/* S medium ray — fades */}
      <line x1="32" y1="36" x2="32" y2="54" stroke={fg} strokeWidth={strokeWidth} strokeLinecap="round" opacity={fadeOpacity} />
      {/* E marker — fades */}
      <line x1="36" y1="32" x2="46" y2="32" stroke={fg} strokeWidth={strokeWidth * 0.9} strokeLinecap="round" opacity={eOpacity} />
      {/* W marker — fades */}
      <line x1="28" y1="32" x2="18" y2="32" stroke={fg} strokeWidth={strokeWidth * 0.9} strokeLinecap="round" opacity={wOpacity} />
      {/* Center — bigger, more present */}
      <circle cx="32" cy="32" r="3.4" fill={accent} />
    </svg>
  );
}

// ============================================================
// MAIN
// ============================================================

export default function BrandFinalClient({ monoCls }) {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const onScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Same scroll mechanic as real Navbar (matches the existing Navbar.jsx range)
  const MORPH_START = 60;
  const MORPH_END = 140;
  const morphProgress = Math.min(
    Math.max((scrollY - MORPH_START) / (MORPH_END - MORPH_START), 0),
    1
  );
  const isScrolled = scrollY > 80;

  return (
    <div style={{ background: COLORS.cream, color: COLORS.text, minHeight: '100vh' }}>
      {/* ============ FAKE NAVBAR ============ */}
      <nav
        className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
        style={{
          background: isScrolled
            ? 'rgba(245,242,236,0.92)'
            : 'rgba(245,242,236,0)',
          backdropFilter: isScrolled ? 'blur(20px)' : 'none',
          borderBottom: isScrolled ? `1px solid ${COLORS.border}` : '1px solid transparent',
        }}
      >
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center justify-between h-[72px]">
            {/* Logo: icon + wordmark, icon morphs A → B based on scroll */}
            <div className="flex items-center gap-2.5">
              <MorphIcon
                size={36}
                progress={morphProgress}
                fg={COLORS.text}
                accent={COLORS.indigo}
                strokeWidth={2.2}
              />
              <span
                style={{
                  fontFamily: 'Inter, sans-serif',
                  fontWeight: 700,
                  fontSize: '1.25rem',
                  letterSpacing: '-0.025em',
                  color: COLORS.text,
                }}
              >
                swaraya
              </span>
            </div>

            {/* Fake menu */}
            <div className="hidden md:flex items-center gap-8 text-[13px]" style={{ color: COLORS.muted }}>
              <span>Investigación</span>
              <span>Método</span>
              <span>Filosofía</span>
              <span>Blog</span>
              <span>Contacto</span>
            </div>

            {/* CTA */}
            <button
              className="hidden md:inline-flex items-center text-[13px] font-medium rounded-full"
              style={{
                padding: '10px 20px',
                background: COLORS.indigo,
                color: COLORS.cream,
              }}
            >
              Iniciar Diálogo
            </button>
          </div>
        </div>
      </nav>

      {/* ============ FAKE HERO ============ */}
      <section className="pt-[150px] pb-32 px-6">
        <div className="max-w-7xl mx-auto">
          <div className={`text-[11px] uppercase tracking-[0.18em] mb-6 ${monoCls}`} style={{ color: COLORS.indigo }}>
            <span style={{ marginRight: 10 }}>—</span>
            Demo · Sistema de marca aplicado al Navbar
          </div>

          <h1
            style={{
              fontFamily: 'Inter, sans-serif',
              fontWeight: 700,
              fontSize: 'clamp(40px, 6vw, 80px)',
              lineHeight: 1.05,
              letterSpacing: '-0.03em',
              color: COLORS.text,
              maxWidth: '900px',
            }}
          >
            Scrollea hacia abajo y mira el ícono del navbar.
            <br />
            <span style={{ color: COLORS.indigo }}>
              Es la única cosa que cambia.
            </span>
          </h1>

          <p
            style={{
              fontFamily: 'Inter, sans-serif',
              fontSize: 17,
              lineHeight: 1.6,
              color: COLORS.muted,
              marginTop: 28,
              maxWidth: 620,
            }}
          >
            El wordmark <b style={{ color: COLORS.text, fontWeight: 600 }}>swaraya</b> no se deforma.
            No hay morph violento de letras a símbolo. Lo que cambia es el ícono al lado: pasa de
            <b style={{ color: COLORS.text, fontWeight: 600 }}> A (Cardinal Asimétrico completo) </b>
            a <b style={{ color: COLORS.text, fontWeight: 600 }}>B (Sextante)</b>. Una respiración del
            sistema visual.
          </p>

          {/* Scroll indicator showing exact progress */}
          <div className="mt-16 inline-flex items-center gap-4 rounded-full border px-5 py-3" style={{ borderColor: COLORS.border, background: 'white' }}>
            <div className={`text-[10px] uppercase tracking-[0.18em] ${monoCls}`} style={{ color: COLORS.muted }}>
              Scroll
            </div>
            <div className={`text-sm tabular-nums ${monoCls}`} style={{ color: COLORS.text, minWidth: 50 }}>
              {Math.round(scrollY)}px
            </div>
            <div className="w-px h-4" style={{ background: COLORS.border }} />
            <div className={`text-[10px] uppercase tracking-[0.18em] ${monoCls}`} style={{ color: COLORS.muted }}>
              Morph
            </div>
            <div className={`text-sm tabular-nums ${monoCls}`} style={{ color: COLORS.indigo, minWidth: 50 }}>
              {Math.round(morphProgress * 100)}%
            </div>
          </div>
        </div>
      </section>

      {/* ============ COMPARISON SECTION ============ */}
      <section className="px-6 pb-32">
        <div className="max-w-7xl mx-auto">
          <h2
            className="mb-8"
            style={{
              fontFamily: 'Inter, sans-serif',
              fontWeight: 600,
              fontSize: 36,
              letterSpacing: '-0.02em',
              color: COLORS.text,
            }}
          >
            Los dos estados, lado a lado
          </h2>

          <div className="grid md:grid-cols-2 gap-6">
            {/* Rest state */}
            <div className="rounded-2xl border bg-white p-8" style={{ borderColor: COLORS.border }}>
              <div className={`text-[10px] uppercase tracking-[0.2em] mb-2 ${monoCls}`} style={{ color: COLORS.muted }}>
                Estado 0 · Hero
              </div>
              <div className="text-sm mb-8" style={{ color: COLORS.text }}>
                Cuando el usuario llega al sitio (scrollY = 0)
              </div>

              <div className="flex items-center gap-4 py-12 justify-center" style={{ background: COLORS.cream, borderRadius: 12 }}>
                <IconA size={58} fg={COLORS.text} accent={COLORS.indigo} strokeWidth={2.4} />
                <span
                  style={{
                    fontFamily: 'Inter, sans-serif',
                    fontWeight: 700,
                    fontSize: 36,
                    letterSpacing: '-0.025em',
                    color: COLORS.text,
                  }}
                >
                  swaraya
                </span>
              </div>

              <ul className="mt-6 space-y-2 text-[13px]" style={{ color: COLORS.muted }}>
                <li>· Cardinal Asimétrico A completo</li>
                <li>· Centro en indigo <span className={monoCls}>{COLORS.indigo}</span></li>
                <li>· 4 rayos visibles (NE largo, N, S, E·W marcadores)</li>
                <li>· Wordmark sin alterar</li>
              </ul>
            </div>

            {/* Scrolled state */}
            <div className="rounded-2xl border bg-white p-8" style={{ borderColor: COLORS.border }}>
              <div className={`text-[10px] uppercase tracking-[0.2em] mb-2 ${monoCls}`} style={{ color: COLORS.muted }}>
                Estado 1 · Navbar scrolleado
              </div>
              <div className="text-sm mb-8" style={{ color: COLORS.text }}>
                Cuando el usuario ha hecho scroll &gt; 140px
              </div>

              <div className="flex items-center gap-4 py-12 justify-center" style={{ background: COLORS.cream, borderRadius: 12 }}>
                <IconB size={58} fg={COLORS.text} accent={COLORS.indigo} strokeWidth={2.4} />
                <span
                  style={{
                    fontFamily: 'Inter, sans-serif',
                    fontWeight: 700,
                    fontSize: 36,
                    letterSpacing: '-0.025em',
                    color: COLORS.text,
                  }}
                >
                  swaraya
                </span>
              </div>

              <ul className="mt-6 space-y-2 text-[13px]" style={{ color: COLORS.muted }}>
                <li>· Variante B · Sextante</li>
                <li>· Mismo centro en indigo (ADN compartido)</li>
                <li>· Mismo rayo NE (ADN compartido)</li>
                <li>· N, S, E, W desvanecidos a 0%</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ============ MECHANIC EXPLANATION ============ */}
      <section className="px-6 pb-32">
        <div className="max-w-3xl mx-auto">
          <div className={`text-[10px] uppercase tracking-[0.2em] mb-3 ${monoCls}`} style={{ color: COLORS.indigo }}>
            La mecánica
          </div>
          <h2
            className="mb-6"
            style={{
              fontFamily: 'Inter, sans-serif',
              fontWeight: 600,
              fontSize: 28,
              letterSpacing: '-0.02em',
              color: COLORS.text,
            }}
          >
            Por qué esto se siente íntegro y no forzado
          </h2>

          <ol className="space-y-5 text-[15px] leading-relaxed" style={{ color: COLORS.text }}>
            <li className="flex gap-4">
              <span className={`shrink-0 ${monoCls} text-[10px] mt-1`} style={{ color: COLORS.muted }}>01</span>
              <div>
                <b>El wordmark nunca se toca.</b> Ningún letra se deforma, ninguna se desvanece. El usuario sigue leyendo "swaraya" de forma idéntica en todo momento.
              </div>
            </li>
            <li className="flex gap-4">
              <span className={`shrink-0 ${monoCls} text-[10px] mt-1`} style={{ color: COLORS.muted }}>02</span>
              <div>
                <b>El ícono no cambia su geometría base.</b> El centro y el rayo NE permanecen en sus posiciones exactas. Lo único que ocurre es que los rayos secundarios (N, S, E, W) atenúan su opacidad de 100% a 0%.
              </div>
            </li>
            <li className="flex gap-4">
              <span className={`shrink-0 ${monoCls} text-[10px] mt-1`} style={{ color: COLORS.muted }}>03</span>
              <div>
                <b>Misma paleta, misma tipografía, misma escala.</b> No hay color nuevo, no hay fuente nueva, no hay tamaño nuevo. Solo se decanta el sistema.
              </div>
            </li>
            <li className="flex gap-4">
              <span className={`shrink-0 ${monoCls} text-[10px] mt-1`} style={{ color: COLORS.muted }}>04</span>
              <div>
                <b>Reversible 100%.</b> Cuando el usuario scrollea hacia arriba, los rayos secundarios re-emergen suavemente. No hay irreversibilidad ni efecto "trick".
              </div>
            </li>
            <li className="flex gap-4">
              <span className={`shrink-0 ${monoCls} text-[10px] mt-1`} style={{ color: COLORS.muted }}>05</span>
              <div>
                <b>Coherente con el lenguaje del sitio.</b> El centro del ícono usa el indigo <span className={monoCls}>{COLORS.indigo}</span> que ya está en el CTA, en el headline "Inteligencia real." y en los acentos editoriales. No es color nuevo — es eco.
              </div>
            </li>
          </ol>
        </div>
      </section>

      {/* ============ EXTRA SCROLL ROOM ============ */}
      <section className="px-6 pb-48">
        <div className="max-w-3xl mx-auto text-center py-32">
          <div className={`text-[10px] uppercase tracking-[0.2em] mb-4 ${monoCls}`} style={{ color: COLORS.muted }}>
            Vuelve arriba con un scroll suave
          </div>
          <p style={{ color: COLORS.text, fontSize: 18, lineHeight: 1.5 }}>
            Cuando hayas validado el comportamiento, dime{' '}
            <span className={monoCls} style={{ color: COLORS.indigo }}>
              &quot;adelante con la integración&quot;
            </span>{' '}
            y aplico esto al <code className={monoCls}>Navbar.jsx</code> real del sitio.
          </p>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="border-t px-6 py-12" style={{ borderColor: COLORS.border, background: 'white' }}>
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-4">
          <div>
            <div className={`text-[10px] uppercase tracking-[0.2em] ${monoCls}`} style={{ color: COLORS.muted }}>
              Demo /brand-final
            </div>
            <div className="text-sm mt-1" style={{ color: COLORS.text }}>
              Sistema A → B aplicado en el contexto real del sitio
            </div>
          </div>
          <div className="flex gap-3 text-[12px]">
            <a href="/icon-lab" className="px-4 py-2 rounded-full border" style={{ borderColor: COLORS.border, color: COLORS.text }}>
              ← icon lab
            </a>
            <a href="/type-lab" className="px-4 py-2 rounded-full border" style={{ borderColor: COLORS.border, color: COLORS.text }}>
              type lab
            </a>
            <a href="/" className="px-4 py-2 rounded-full" style={{ background: COLORS.indigo, color: COLORS.cream }}>
              Ver sitio actual →
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
