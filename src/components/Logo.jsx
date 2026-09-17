'use client';

/**
 * SWARAYA · <Logo /> — Wordmark oficial (Quiet Confidence).
 *
 * Estructura invariante:
 *  - Wordmark: <span>swaraya<span class="dot">.</span></span>
 *  - El PUNTO es el único elemento con color; la letra usa tinta.
 *  - Tipografía: Cabinet Grotesk 500, tracking -0.035em, minúsculas.
 *
 * Icon: `s` Cabinet Grotesk 700 centrada en un contenedor con
 * border-radius ≈ 25% del lado.
 *
 * Tonos disponibles:
 *   positive     — texto ink · punto accent · fondo cream
 *   negative     — texto cream · punto accent-bright · fondo dark
 *   indigo       — texto accent · punto accent · fondo cream
 *   mono-ink     — todo ink (1 color) sobre claro
 *   mono-cream   — todo cream (1 color) sobre oscuro
 *   on-indigo    — texto cream · punto cream · fondo accent
 *   auto         — resuelve por prop `surface`
 *
 * Ver Design docs: docs/logo.md (o este JSDoc como fuente).
 */

import Link from 'next/link';

const TONES = {
  positive:   { text: '#0d0f0e', dot: '#c8e824' },   /* fondo claro · punto brote */
  negative:   { text: '#ffffff', dot: '#c8e824' },   /* fondo oscuro · punto brote (≈11:1) */
  indigo:     { text: '#0d0f0e', dot: '#c8e824' },   /* alias legacy → tinta + brote */
  'mono-ink': { text: '#0d0f0e', dot: '#0d0f0e' },   /* 1-color · sin acento */
  'mono-cream': { text: '#ffffff', dot: '#ffffff' }, /* 1-color · sobre oscuro */
  'on-indigo': { text: '#0d0f0e', dot: '#0d0f0e' },  /* sobre brote pleno · tinta */
};

const ICON_BG = {
  positive:  { bg: '#0d0f0e', fg: '#f4f4f3' },
  negative:  { bg: '#0d0f0e', fg: '#f4f4f3' },
  indigo:    { bg: '#0d0f0e', fg: '#f4f4f3' },
  'mono-ink':   { bg: '#0d0f0e', fg: '#f4f4f3' },
  'mono-cream': { bg: '#ffffff', fg: '#0d0f0e' },
  'on-indigo':  { bg: '#c8e824', fg: '#0d0f0e' },
};

const resolveTone = (tone, surface) => {
  if (tone && tone !== 'auto') return tone;
  return surface === 'dark' ? 'negative' : 'positive';
};

// ─────────────────────────────────────────────────────────────
// WORDMARK
// ─────────────────────────────────────────────────────────────
export function LogoWordmark({ tone, size = 22, className = '', style }) {
  const palette = TONES[tone] || TONES.positive;
  return (
    <span
      className={`inline-flex items-baseline ${className}`}
      style={{
        fontFamily: "'Cabinet Grotesk', -apple-system, system-ui, sans-serif",
        fontWeight: 500,
        fontSize: size,
        lineHeight: 1,
        letterSpacing: '-0.035em',
        color: palette.text,
        textTransform: 'lowercase',
        ...style,
      }}
    >
      swaraya
      <span aria-hidden="true" style={{ color: palette.dot }}>.</span>
    </span>
  );
}

// ─────────────────────────────────────────────────────────────
// ICON — `s` Cabinet Grotesk 700 en contenedor
// ─────────────────────────────────────────────────────────────
export function LogoIcon({ tone, size = 32, className = '', style }) {
  const palette = ICON_BG[tone] || ICON_BG.positive;
  const radius = Math.round(size * 0.25);
  return (
    <span
      aria-hidden="true"
      className={`inline-flex items-center justify-center ${className}`}
      style={{
        width: size,
        height: size,
        background: palette.bg,
        color: palette.fg,
        borderRadius: radius,
        fontFamily: "'Cabinet Grotesk', -apple-system, system-ui, sans-serif",
        fontWeight: 700,
        fontSize: Math.round(size * 0.62),
        lineHeight: 1,
        letterSpacing: '-0.04em',
        flexShrink: 0,
        ...style,
      }}
    >
      s
    </span>
  );
}

// ─────────────────────────────────────────────────────────────
// LOGO — API principal
// ─────────────────────────────────────────────────────────────
export default function Logo({
  variant = 'wordmark',
  tone,
  surface,
  size,
  href = '/',
  className = '',
  wrap = true,
  style,
}) {
  const resolvedTone = resolveTone(tone, surface);

  // Cambia a icon si el tamaño solicitado es demasiado pequeño (< 96px)
  // para wordmark, aplicamos regla de tamaño mínimo del sistema.
  const effectiveVariant =
    variant === 'wordmark' && size && size < 96 ? 'icon' : variant;

  const content =
    effectiveVariant === 'icon' ? (
      <LogoIcon tone={resolvedTone} size={size ?? 32} style={style} />
    ) : (
      <LogoWordmark tone={resolvedTone} size={size ?? 22} style={style} />
    );

  if (!wrap) return content;

  return (
    <Link
      href={href}
      aria-label="swaraya — inicio"
      className={`inline-flex items-center gap-2 focus:outline-none ${className}`}
      data-testid="logo"
    >
      {content}
    </Link>
  );
}
