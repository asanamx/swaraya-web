/**
 * SWARAYA — Design tokens exportados para JSX (paridad con globals.css).
 *
 * Para CSS usa las variables custom de `globals.css` (--bg, --ink, --accent, ...).
 * Para JSX importa desde este módulo.
 *
 * ═══════════════════════════════════════════════════════════
 *  SISTEMA CONSOLIDADO · ~12 roles semánticos · WCAG 2.1 AA
 * ═══════════════════════════════════════════════════════════
 *  • Fondo GALERÍA (--bg) → text-primary/secondary/tertiary + accent (#0d0f0e)
 *  • Fondo DARK    (--ink) → text-on-dark-* + accentBright (#c8e824)
 *
 *  Contraste verificado para cada par texto/superficie.
 *  Los alias legacy están marcados como @deprecated.
 * ═══════════════════════════════════════════════════════════
 */

export const colors = {
  // ── SUPERFICIES ──────────────────────────────────────────
  bg: 'var(--niebla)',                 // canvas gris galería base
  surface: 'var(--blanco)',            // superficie elevada
  surfaceRaised: 'var(--blanco)',      // alias cards, popovers
  surfaceMuted: '#e5e5e6',       // chips, hover, secondary
  ink: 'var(--tinta)',                // tinta / foreground

  // Superficies oscuras
  bgDark: 'var(--tinta)',
  bgDeep: '#141414',             // hero + footer profundo
  surfaceDark: 'var(--tinta)',
  surfaceDark2: '#1c1c1b',
  surfaceDark3: '#1c1c22',

  // ── TEXTO SOBRE CLARO ────────────────────────────────────
  text: {
    primary: 'var(--tinta)',          // ≈17:1 sobre #f4f4f5 AAA
    secondary: 'var(--piedra-contraste)',        // ≈6.6:1 AA
    tertiary: 'var(--piedra-contraste)',         // ≈4.9:1 AA
    placeholder: 'var(--piedra-contraste)',
  },

  // ── TEXTO SOBRE OSCURO ───────────────────────────────────
  inkInverse: 'var(--blanco)',
  textOnDark: {
    primary: 'var(--blanco)',
    secondary: '#c9cdd3',
    tertiary: 'var(--piedra-media)',         // ≈6.9:1 sobre #0d0f0e ✓
  },

  // ── ACENTO ULTRAMAR ──────────────────────────────────────
  accent: 'var(--tinta)',             // sobre claro · ≈9.3:1 ✓
  accentHover: 'var(--tinta)',
  accentBright: 'var(--brote)',       // sobre oscuro o fills grandes
  accentBrightHover: 'var(--brote-alto)',
  accentBrightText: 'var(--brote-alto)',   // texto pequeño sobre oscuro · ≈7:1

  // ── FOCO ─────────────────────────────────────────────────
  ring: 'var(--tinta)',
  ringOnDark: 'var(--brote)',

  // ── ESTADOS DE ERROR ─────────────────────────────────────
  destructive: '#EF4343',        // fills, iconos, bordes
  destructiveText: '#c62f2f',    // solo texto sobre claro · 4.88:1 ✓

  // ─────────────────────────────────────────────────────────
  // @deprecated · alias hacia el nuevo sistema
  // ─────────────────────────────────────────────────────────
  cream: {
    base: 'var(--niebla)',              // @deprecated → bg
    soft: 'var(--blanco)',              // @deprecated → surfaceRaised
    deep: '#e5e5e6',              // @deprecated → surfaceMuted
    hairline: '#e5e5e6',          // @deprecated → borders.solid
  },
  dark: {
    base: 'var(--tinta)',              // @deprecated → surfaceDark
    soft: '#1c1c1b',              // @deprecated → surfaceDark2
    deep: '#1c1c22',              // @deprecated → surfaceDark3
  },
  indigo: {
    onCream: 'var(--tinta)',           // @deprecated → accent
    onCreamHover: 'var(--tinta)',      // @deprecated → accentHover
    onDark: 'var(--brote)',            // @deprecated → accentBright
    onDarkHover: 'var(--brote-alto)',       // @deprecated → accentBrightHover
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
    soft: 'rgba(13, 15, 14, 0.05)',
    base: 'rgba(13, 15, 14, 0.10)',
    strong: 'rgba(13, 15, 14, 0.16)',
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
