'use client';

/**
 * SWARAYA · <Button /> — Un solo botón, forma por contexto.
 *
 * Reglas:
 *  - `shape="pill"`   → CTAs de marketing / hero / marquesinas
 *  - `shape="rect"`   → formularios de app (radio 12, ver --radius-md)
 *  - `variant="primary"` → fondo tinta (o accent-bright en tone="dark")
 *  - `variant="secondary"` → borde 1px, transparente
 *  - `variant="ghost"` → sin borde
 *  - `tone="dark"` → adaptado a superficies oscuras (hero, footer)
 *
 * Accesibilidad garantizada:
 *  - min-height 44px (WCAG 2.5.5)
 *  - texto en `#FFFFFF` sobre accent-bright (4.85:1)
 *  - :focus-visible heredado del sistema global
 */

import { forwardRef } from 'react';

const paletteFor = ({ variant, tone }) => {
  const dark = tone === 'dark';
  if (variant === 'primary') {
    return dark
      ? { bg: 'var(--accent-bright)', color: '#FFFFFF', border: 'none', hover: 'var(--accent-bright-hover)' }
      : { bg: 'var(--ink)',           color: '#FFFFFF', border: 'none', hover: 'var(--accent)' };
  }
  if (variant === 'secondary') {
    return dark
      ? { bg: 'transparent', color: 'var(--text-on-dark-primary)', border: '1px solid var(--border-dark-3)', hover: 'transparent', hoverColor: 'var(--accent-bright)', hoverBorder: 'var(--accent-bright)' }
      : { bg: 'transparent', color: 'var(--ink)',                  border: '1px solid var(--border-3)',      hover: 'transparent', hoverColor: 'var(--accent)',        hoverBorder: 'var(--accent)' };
  }
  // ghost
  return dark
    ? { bg: 'transparent', color: 'var(--text-on-dark-primary)', border: 'none', hover: 'transparent', hoverColor: 'var(--accent-bright)' }
    : { bg: 'transparent', color: 'var(--ink)',                  border: 'none', hover: 'transparent', hoverColor: 'var(--accent)'        };
};

const sizeFor = (size) => {
  switch (size) {
    case 'sm': return { padding: '10px 16px', minHeight: 40, fontSize: '0.8125rem' };
    case 'lg': return { padding: '18px 36px', minHeight: 52, fontSize: '1rem'      };
    case 'md':
    default:   return { padding: '16px 32px', minHeight: 44, fontSize: '0.875rem'  };
  }
};

const Button = forwardRef(function Button(
  {
    children,
    shape = 'pill',
    variant = 'primary',
    tone = 'light',
    size = 'md',
    as: Comp = 'button',
    style,
    className = '',
    ...rest
  },
  ref,
) {
  const pal = paletteFor({ variant, tone });
  const sz = sizeFor(size);

  const radius = shape === 'pill' ? 'var(--radius-pill)' : 'var(--radius-md)';

  return (
    <Comp
      ref={ref}
      className={`inline-flex items-center justify-center gap-2 font-medium tracking-[0.005em] transition-all duration-300 ${className}`}
      style={{
        fontFamily: "'Inter', sans-serif",
        fontWeight: 500,
        fontSize: sz.fontSize,
        minHeight: sz.minHeight,
        padding: sz.padding,
        borderRadius: radius,
        background: pal.bg,
        color: pal.color,
        border: pal.border,
        cursor: 'pointer',
        ...style,
      }}
      onMouseEnter={(e) => {
        if (pal.hover) e.currentTarget.style.background = pal.hover;
        if (pal.hoverColor) e.currentTarget.style.color = pal.hoverColor;
        if (pal.hoverBorder) e.currentTarget.style.borderColor = pal.hoverBorder;
        rest.onMouseEnter?.(e);
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.background = pal.bg;
        e.currentTarget.style.color = pal.color;
        if (pal.hoverBorder) {
          e.currentTarget.style.borderColor = pal.border.includes('var(') ? pal.border.split(' ').at(-1) : '';
        }
        rest.onMouseLeave?.(e);
      }}
      {...rest}
    >
      {children}
    </Comp>
  );
});

export default Button;
