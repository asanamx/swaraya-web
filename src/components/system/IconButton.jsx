'use client';

/**
 * SWARAYA · <IconButton /> y <FAB />
 *
 * SEPARACIÓN INTENCIONAL:
 *  - IconButton (32px)  → acción secundaria, sutil, sin glow.
 *                          Usarlo en toolbars, listas, tarjetas.
 *  - FAB (44px)         → acción flotante principal con glow indigo.
 *                          Uno por vista como máximo (ChatWidget, etc.).
 *
 * Ambos comparten: :focus-visible visible, aria-label obligatorio en JSX,
 * radio 12 (rect) o pill según prop.
 */

import { forwardRef } from 'react';

// ─────────────────────────────────────────────────────────────
// ICON BUTTON — 32px, sutil, sin glow
// ─────────────────────────────────────────────────────────────
export const IconButton = forwardRef(function IconButton(
  { children, tone = 'light', shape = 'rect', ariaLabel, className = '', style, ...rest },
  ref,
) {
  if (!ariaLabel && !rest['aria-label']) {
    console.warn('<IconButton> requiere prop `ariaLabel` o `aria-label`.');
  }
  const color  = tone === 'dark' ? 'var(--text-on-dark-primary)' : 'var(--ink)';
  const hover  = tone === 'dark' ? 'var(--accent-bright)'         : 'var(--accent)';
  const bg     = tone === 'dark' ? 'rgba(255, 255, 255,0.06)'       : 'rgba(17, 17, 20,0.04)';
  const bgH    = tone === 'dark' ? 'rgba(255, 255, 255,0.12)'       : 'rgba(17, 17, 20,0.08)';
  const radius = shape === 'pill' ? 'var(--radius-pill)' : 'var(--radius-md)';

  return (
    <button
      ref={ref}
      aria-label={ariaLabel ?? rest['aria-label']}
      className={`inline-flex items-center justify-center transition-colors duration-250 ${className}`}
      style={{
        width: 32,
        height: 32,
        borderRadius: radius,
        background: bg,
        color,
        border: 'none',
        cursor: 'pointer',
        ...style,
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.background = bgH;
        e.currentTarget.style.color = hover;
        rest.onMouseEnter?.(e);
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.background = bg;
        e.currentTarget.style.color = color;
        rest.onMouseLeave?.(e);
      }}
      {...rest}
    >
      {children}
    </button>
  );
});

// ─────────────────────────────────────────────────────────────
// FAB — 44px, con glow indigo, uno por vista
// ─────────────────────────────────────────────────────────────
export const FAB = forwardRef(function FAB(
  { children, tone = 'dark', ariaLabel, className = '', style, ...rest },
  ref,
) {
  if (!ariaLabel && !rest['aria-label']) {
    console.warn('<FAB> requiere prop `ariaLabel` o `aria-label`.');
  }
  return (
    <button
      ref={ref}
      aria-label={ariaLabel ?? rest['aria-label']}
      className={`inline-flex items-center justify-center transition-all duration-300 ${className}`}
      style={{
        width: 44,
        height: 44,
        borderRadius: 'var(--radius-md)',
        background: 'var(--accent-bright)',
        color: '#FFFFFF',
        border: 'none',
        boxShadow: '0 10px 24px -8px rgba(232, 163, 23,0.35)',
        cursor: 'pointer',
        ...style,
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = 'scale(1.05)';
        e.currentTarget.style.boxShadow = '0 14px 32px -8px rgba(232, 163, 23,0.5)';
        rest.onMouseEnter?.(e);
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = 'scale(1)';
        e.currentTarget.style.boxShadow = '0 10px 24px -8px rgba(232, 163, 23,0.35)';
        rest.onMouseLeave?.(e);
      }}
      {...rest}
    >
      {children}
    </button>
  );
});
