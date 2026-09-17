'use client';

/**
 * SWARAYA · <Surface /> — Contenedor unificado para tarjetas/paneles.
 *
 * Reemplaza las variantes previas (editorial / glass / hero) con dos props:
 *
 *   elevation:
 *     - 'flat'   → sin sombra, borde suave (default)
 *     - 'raised' → sombra ligera + hover con lift
 *     - 'hero'   → sombra profunda, radio xl
 *
 *   tone:
 *     - 'light' → surface-raised sobre cream (default)
 *     - 'dark'  → surface-dark sobre ink
 *     - 'glass' → translúcido con blur
 *
 * Los `bento` (patrones de grid con gap-px) son LAYOUT, no cards — no
 * usar Surface para eso; usar simplemente `grid gap-px` en el contenedor.
 *
 * Nota: TODAS las cards del sistema usan `--radius-lg` (16px), sin
 * discrecionalidad. La `hero` sube a `--radius-xl` (20px).
 */

import { forwardRef } from 'react';

const bgFor = (tone) => {
  switch (tone) {
    case 'dark':  return { bg: 'var(--surface-dark)',    color: 'var(--text-on-dark-primary)', border: '1px solid var(--border-dark-2)' };
    case 'glass': return { bg: 'rgba(248,246,241,0.6)',  color: 'var(--ink)',                  border: '1px solid var(--border-2)', backdropFilter: 'blur(12px)' };
    case 'light':
    default:      return { bg: 'var(--surface-raised)',  color: 'var(--ink)',                  border: '1px solid var(--border-2)' };
  }
};

const elevationStyle = (elevation, tone) => {
  // v3.0 — Sin sombras. La elevación se comunica con background/border.
  switch (elevation) {
    case 'raised':
      return { borderRadius: 'var(--r-xl)' };
    case 'hero':
      return { borderRadius: 'var(--r-xl)' };
    case 'flat':
    default:
      return { borderRadius: 'var(--r-xl)' };
  }
};

const Surface = forwardRef(function Surface(
  {
    children,
    elevation = 'flat',
    tone = 'light',
    interactive = false,
    as: Comp = 'div',
    className = '',
    style,
    ...rest
  },
  ref,
) {
  const base = bgFor(tone);
  const elev = elevationStyle(elevation, tone);

  return (
    <Comp
      ref={ref}
      className={`relative overflow-hidden transition-all duration-400 ${className}`}
      style={{
        ...base,
        ...elev,
        ...(interactive ? { cursor: 'pointer' } : null),
        ...style,
      }}
      onMouseEnter={(e) => {
        if (interactive) {
          e.currentTarget.style.transform = 'translateY(-2px)';
          e.currentTarget.style.background = tone === 'dark' ? '#1c1c1b' : 'var(--niebla)';
        }
        rest.onMouseEnter?.(e);
      }}
      onMouseLeave={(e) => {
        if (interactive) {
          e.currentTarget.style.transform = 'translateY(0)';
          e.currentTarget.style.background = base.bg;
        }
        rest.onMouseLeave?.(e);
      }}
      {...rest}
    >
      {children}
    </Comp>
  );
});

export default Surface;
