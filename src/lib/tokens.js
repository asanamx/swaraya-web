/**
 * SWARAYA — Design tokens exportados para JSX (paridad con globals.css).
 *
 * Para CSS usa las variables custom de `globals.css` (--bg, --ink, --accent, ...).
 * Para JSX importa desde este módulo.
 *
 * ═══════════════════════════════════════════════════════════
 *  SISTEMA CONSOLIDADO · ~12 roles semánticos · WCAG 2.1 AA
 * ═══════════════════════════════════════════════════════════
 *  • Fondo GALERÍA (--bg) → text-primary/secondary/tertiary + accent (#775a00)
 *  • Fondo DARK    (--ink) → text-on-dark-* + accentBright (#f6b91f)
 *
 *  Contraste verificado para cada par texto/superficie.
 *  Los alias legacy están marcados como @deprecated.
 * ═══════════════════════════════════════════════════════════
 */

export const colors = {
  // ── SUPERFICIES ──────────────────────────────────────────
  bg: '#f4f4f5',                 // canvas gris galería base
  surface: '#ffffff',            // superficie elevada
  surfaceRaised: '#ffffff',      // alias cards, popovers
  surfaceMuted: '#e5e5e6',       // chips, hover, secondary
  ink: '#111114',                // tinta / foreground

  // Superficies oscuras
  bgDark: '#111114',
  bgDeep: '#0a0a0a',             // hero + footer profundo
  surfaceDark: '#111114',
  surfaceDark2: '#17171b',
  surfaceDark3: '#1c1c22',

  // ── TEXTO SOBRE CLARO ────────────────────────────────────
  text: {
    primary: '#111114',          // ≈17:1 sobre #f4f4f5 AAA
    secondary: '#52565e',        // ≈6.6:1 AA
    tertiary: '#63666e',         // ≈4.9:1 AA
    placeholder: '#63666e',
  },

  // ── TEXTO SOBRE OSCURO ───────────────────────────────────
  inkInverse: '#ffffff',
  textOnDark: {
    primary: '#ffffff',
    secondary: '#c9cdd3',
    tertiary: '#9aa0a8',         // ≈6.9:1 sobre #111114 ✓
  },

  // ── ACENTO ULTRAMAR ──────────────────────────────────────
  accent: '#775a00',             // sobre claro · ≈9.3:1 ✓
  accentHover: '#5a4400',
  accentBright: '#f6b91f',       // sobre oscuro o fills grandes
  accentBrightHover: '#ffc93d',
  accentBrightText: '#ffc93d',   // texto pequeño sobre oscuro · ≈7:1

  // ── FOCO ─────────────────────────────────────────────────
  ring: '#775a00',
  ringOnDark: '#f6b91f',

  // ── ESTADOS DE ERROR ─────────────────────────────────────
  destructive: '#EF4343',        // fills, iconos, bordes
  destructiveText: '#c62f2f',    // solo texto sobre claro · 4.88:1 ✓

  // ─────────────────────────────────────────────────────────
  // @deprecated · alias hacia el nuevo sistema
  // ─────────────────────────────────────────────────────────
  cream: {
    base: '#f4f4f5',              // @deprecated → bg
    soft: '#ffffff',              // @deprecated → surfaceRaised
    deep: '#e5e5e6',              // @deprecated → surfaceMuted
    hairline: '#e5e5e6',          // @deprecated → borders.solid
  },
  dark: {
    base: '#111114',              // @deprecated → surfaceDark
    soft: '#17171b',              // @deprecated → surfaceDark2
    deep: '#1c1c22',              // @deprecated → surfaceDark3
  },
  indigo: {
    onCream: '#775a00',           // @deprecated → accent
    onCreamHover: '#5a4400',      // @deprecated → accentHover
    onDark: '#f6b91f',            // @deprecated → accentBright
    onDarkHover: '#ffc93d',       // @deprecated → accentBrightHover
  },
};

/**
 * Helper para elegir el acento correcto según el fondo.
 * <span style={{ color: indigoFor('cream') }}>…</span>
 */
export const indigoFor = (surface, state = 'base') => {
  const isDark = surface === 'dark';
  if (state === 'hover') return isDark ? colors.accentBrightHover : colors.accentHover;
  return isDark ? colors.accentBright : colors.accent;
};

/** Bordes translúcidos por contexto */
export const borders = {
  onCream: {
    soft: 'rgba(17, 17, 20, 0.05)',
    base: 'rgba(17, 17, 20, 0.10)',
    strong: 'rgba(17, 17, 20, 0.16)',
    solid: '#e5e5e6',
  },
  onDark: {
    soft: 'rgba(255, 255, 255, 0.06)',
    base: 'rgba(255, 255, 255, 0.10)',
    strong: 'rgba(255, 255, 255, 0.14)',
  },
};

/** Radios · 4 tamaños + pill */
export const radii = {
  sm: '8px',      // inputs, íconos
  md: '12px',     // botones rect, chips
  lg: '16px',    // TODAS las cards
  xl: '20px',    // contenedores bento
  pill: '999px',
};

/** Tipografía */
export const fonts = {
  display: "'Cabinet Grotesk', -apple-system, system-ui, sans-serif",
  body: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
  wordmark: "'Author', 'Cabinet Grotesk', -apple-system, system-ui, sans-serif",
  serif: "'Iowan Old Style', 'Palatino Linotype', 'Book Antiqua', Palatino, Georgia, serif",
};

/** Escala tipográfica (px de referencia) — para JSX inline */
export const typeScale = {
  display:  { size: '76px', weight: 500, lineHeight: 0.98, letterSpacing: '-0.035em' },
  h1:       { size: '48px', weight: 500, lineHeight: 1.0,  letterSpacing: '-0.03em'  },
  h2:       { size: '30px', weight: 500, lineHeight: 1.05, letterSpacing: '-0.02em'  },
  h3:       { size: '20px', weight: 500, lineHeight: 1.4,  letterSpacing: '-0.01em'  },
  body:     { size: '16px', weight: 400, lineHeight: 1.55, letterSpacing: 'normal'    },
  small:    { size: '14px', weight: 400, lineHeight: 1.5,  letterSpacing: 'normal'    },
  caption:  { size: '12px', weight: 500, lineHeight: 1.5,  letterSpacing: '0.02em'    },
  micro:    { size: '11px', weight: 500, lineHeight: 1.5,  letterSpacing: '0.18em'    },
};

/** Tap target mínimo (WCAG 2.5.5) */
export const tapTarget = { min: 44 };
