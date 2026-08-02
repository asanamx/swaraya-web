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
  const dark = tone === 'dark';
  switch (elevation) {
    case 'raised':
      return {
        borderRadius: 'var(--radius-lg)',
        boxShadow: dark
          ? '0 12px 24px -12px rgba(0,0,0,0.6)'
          : '0 12px 32px -16px rgba(17, 17, 20,0.10)',
      };
    case 'hero':
      return {
        borderRadius: 'var(--radius-xl)',
        boxShadow: dark
          ? '0 32px 64px -24px rgba(0,0,0,0.7)'
          : '0 32px 64px -24px rgba(17, 17, 20,0.14)',
      };
    case 'flat':
    default:
      return { borderRadius: 'var(--radius-lg)', boxShadow: 'none' };
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
          e.currentTarget.style.transform = 'translateY(-3px)';
          e.currentTarget.style.boxShadow = tone === 'dark'
            ? '0 24px 48px -20px rgba(0,0,0,0.75)'
            : '0 24px 48px -16px rgba(17, 17, 20,0.12)';
        }
        rest.onMouseEnter?.(e);
      }}
      onMouseLeave={(e) => {
        if (interactive) {
          e.currentTarget.style.transform = 'translateY(0)';
          e.currentTarget.style.boxShadow = elev.boxShadow;
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
