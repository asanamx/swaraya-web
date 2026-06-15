/**
 * SWARAYA — Tokens de diseño exportados para componentes JSX.
 *
 * Para CSS usa las variables custom de `globals.css`
 * (--indigo-on-cream, --indigo-on-dark, etc.).
 * Para JSX usa los exports de este módulo.
 *
 * ═══════════════════════════════════════════════════════════
 *  REGLA INVARIANTE — Sistema dual de indigo por fondo
 * ═══════════════════════════════════════════════════════════
 *  • Fondo CREAM (#F5F2EC) → indigo.onCream (#2C3E80)
 *  • Fondo DARK  (#0E0F11) → indigo.onDark  (#5468D6)
 *
 *  NUNCA invertir: el deep sobre dark se pierde, el electric
 *  sobre cream se ve lavado. La regla es invariante.
 * ═══════════════════════════════════════════════════════════
 */

export const colors = {
  // Surfaces — light first
  cream: {
    base: '#F5F2EC',
    soft: '#FAF8F2',
    deep: '#F0EBE0',
    hairline: '#E5E0D5',
  },

  // Dark surfaces (hero, footer, chat)
  dark: {
    base: '#0E0F11',
    soft: '#16181C',
    deep: '#1C1F25',
  },

  // Tipografía sobre cream
  text: {
    primary: '#0E0F11',
    secondary: '#5D6878',
    tertiary: '#9BA5B7',
  },

  // Tipografía sobre dark
  textOnDark: {
    primary: '#F5F2EC',
    secondary: '#C8CCDC',
    tertiary: '#9BA5B7',
  },

  /**
   * INDIGO — sistema dual.
   * - onCream: usar en cualquier elemento sobre fondo claro.
   * - onDark : usar en cualquier elemento sobre fondo oscuro.
   * - hover  : el estado interactivo de cada uno.
   */
  indigo: {
    onCream: '#2C3E80',
    onCreamHover: '#1F2D5C',
    onDark: '#5468D6',
    onDarkHover: '#7585E0',
  },
};

/**
 * Helpers para usar el indigo correcto según el fondo.
 * Ejemplo: <span style={{ color: indigoFor('cream') }}>...</span>
 */
export const indigoFor = (surface, state = 'base') => {
  const key = surface === 'dark' ? 'onDark' : 'onCream';
  const hoverKey = surface === 'dark' ? 'onDarkHover' : 'onCreamHover';
  return state === 'hover' ? colors.indigo[hoverKey] : colors.indigo[key];
};

/** Borders translúcidos por contexto */
export const borders = {
  onCream: {
    soft: 'rgba(14,15,17,0.04)',
    base: 'rgba(14,15,17,0.08)',
    strong: 'rgba(14,15,17,0.14)',
  },
  onDark: {
    soft: 'rgba(245,242,236,0.04)',
    base: 'rgba(245,242,236,0.08)',
    strong: 'rgba(245,242,236,0.14)',
  },
};

export const radii = {
  sm: '10px',
  md: '16px',
  lg: '20px',
  xl: '24px',
  pill: '999px',
};

export const fonts = {
  display: "'Cabinet Grotesk', -apple-system, system-ui, sans-serif",
  body: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
  wordmark: "'Author', -apple-system, system-ui, sans-serif",
};
