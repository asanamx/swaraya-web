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
  positive:   { text: '#111114', dot: '#7d5800' },
  negative:   { text: '#ffffff', dot: '#e8a317' },
  indigo:     { text: '#7d5800', dot: '#7d5800' },
  'mono-ink': { text: '#111114', dot: '#111114' },
  'mono-cream': { text: '#ffffff', dot: '#ffffff' },
  'on-indigo': { text: '#f4f4f5', dot: '#f4f4f5' },
};

const ICON_BG = {
  positive:  { bg: '#7d5800', fg: '#f4f4f5' },
  negative:  { bg: '#e8a317', fg: '#f4f4f5' },
  indigo:    { bg: '#7d5800', fg: '#f4f4f5' },
  'mono-ink':   { bg: '#111114', fg: '#f4f4f5' },
  'mono-cream': { bg: '#ffffff', fg: '#111114' },
  'on-indigo':  { bg: '#f4f4f5', fg: '#7d5800' },
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
