/**
 * SWARAYA — Design tokens exportados para JSX (paridad con globals.css).
 *
 * Para CSS usa las variables custom de `globals.css` (--bg, --ink, --accent, ...).
 * Para JSX importa desde este módulo.
 *
 * ═══════════════════════════════════════════════════════════
 *  SISTEMA CONSOLIDADO · ~12 roles semánticos · WCAG 2.1 AA
 * ═══════════════════════════════════════════════════════════
 *  • Fondo CREAM (--bg)   → text-primary/secondary/tertiary + accent (#2C3E80)
 *  • Fondo DARK  (--ink)  → text-on-dark-* + accentBright (#5468D6)
 *
 *  Contraste verificado para cada par texto/superficie.
 *  Los alias legacy están marcados como @deprecated.
 * ═══════════════════════════════════════════════════════════
 */

export const colors = {
  // ── SUPERFICIES ──────────────────────────────────────────
  bg: '#F5F2EB',                 // canvas crema base
  surfaceRaised: '#F8F6F1',      // cards, popovers
  surfaceMuted: '#ECE8DF',       // chips, hover, secondary
  ink: '#0E0F11',                // tinta / foreground

  // Superficies oscuras
  surfaceDark: '#0E0F11',
  surfaceDark2: '#16181C',
  surfaceDark3: '#1C1F25',

  // ── TEXTO SOBRE CLARO ────────────────────────────────────
  text: {
    primary: '#0E0F11',          // 15.94:1  AAA
    secondary: '#5D6878',        //  5.94:1  AA
    tertiary: '#646E7B',         //  4.63:1  AA ✓ (corregido, era #9BA5B7)
    placeholder: '#646E7B',
  },

  // ── TEXTO SOBRE OSCURO ───────────────────────────────────
  textOnDark: {
    primary: '#F5F2EC',
    secondary: '#C8CCDC',
    tertiary: '#9BA5B7',         //  7.72:1 sobre ink ✓
  },

  // ── ACENTO ÍNDIGO ────────────────────────────────────────
  accent: '#2C3E80',             // sobre claro · 8.91:1 ✓
  accentHover: '#1F2D5C',
  accentBright: '#5468D6',       // sobre oscuro o fills
  accentBrightHover: '#7585E0',

  // ── FOCO ─────────────────────────────────────────────────
  ring: '#2C3E80',
  ringOnDark: '#5468D6',

  // ── ESTADOS DE ERROR ─────────────────────────────────────
  destructive: '#EF4343',        // fills, iconos, bordes
  destructiveText: '#C62F2F',    // solo texto sobre claro · 4.88:1 ✓

  // ─────────────────────────────────────────────────────────
  // @deprecated · mantener durante migración
  // ─────────────────────────────────────────────────────────
  cream: {
    base: '#F5F2EB',              // @deprecated → bg
    soft: '#F8F6F1',              // @deprecated → surfaceRaised
    deep: '#ECE8DF',              // @deprecated → surfaceMuted
    hairline: '#DED9CF',          // @deprecated → borders.solid
  },
  dark: {
    base: '#0E0F11',              // @deprecated → surfaceDark
    soft: '#16181C',              // @deprecated → surfaceDark2
    deep: '#1C1F25',              // @deprecated → surfaceDark3
  },
  indigo: {
    onCream: '#2C3E80',           // @deprecated → accent
    onCreamHover: '#1F2D5C',      // @deprecated → accentHover
    onDark: '#5468D6',            // @deprecated → accentBright
    onDarkHover: '#7585E0',       // @deprecated → accentBrightHover
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
    soft: 'rgba(14,15,17,0.04)',
    base: 'rgba(14,15,17,0.08)',
    strong: 'rgba(14,15,17,0.14)',
    solid: '#DED9CF',
  },
  onDark: {
    soft: 'rgba(245,242,236,0.04)',
    base: 'rgba(245,242,236,0.08)',
    strong: 'rgba(245,242,236,0.14)',
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
