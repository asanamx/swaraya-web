'use client';

/**
 * SWARAYA · <Wordmark /> — marca tipográfica canónica.
 *
 * Sistema v3.0: sólo tipografía. Sin logotipo gráfico, sin monograma.
 * El punto SIEMPRE es `--brote` (único acento del sistema).
 * El resto (swaraya) hereda color del contexto: por defecto `currentColor`,
 * lo que permite que el mismo componente funcione en fondo claro (tinta)
 * y en fondo `.invertido` (blanco) sin duplicar componentes.
 *
 * Uso:
 *   <Wordmark />                          // heredado — 24px (default)
 *   <Wordmark size="sm" />                // 16px
 *   <Wordmark size="lg" as="span" />      // 32px
 *   <Wordmark size="display" />           // 64px+ (para hero/footer)
 *   <Wordmark ariaLabel="swaraya inicio"/>// override accesible
 */

import { forwardRef } from 'react';

const SIZES = {
  sm:      'clamp(1rem, 1vw + 0.75rem, 1.125rem)',    // 16–18px
  md:      'clamp(1.25rem, 1.4vw + 0.8rem, 1.5rem)',  // 20–24px (default)
  lg:      'clamp(1.5rem, 1.8vw + 1rem, 2rem)',       // 24–32px
  display: 'clamp(2.5rem, 5vw, 4rem)',                // 40–64px
};

const Wordmark = forwardRef(function Wordmark(
  {
    size = 'md',
    as: Comp = 'span',
    ariaLabel = 'swaraya',
    className = '',
    style,
    ...rest
  },
  ref,
) {
  const fontSize = SIZES[size] ?? SIZES.md;

  return (
    <Comp
      ref={ref}
      aria-label={ariaLabel}
      className={className}
      style={{
        fontFamily:
          "'Cabinet Grotesk', -apple-system, system-ui, sans-serif",
        fontWeight: 500,
        fontSize,
        letterSpacing: '-0.03em',
        lineHeight: 1,
        textTransform: 'lowercase',
        color: 'currentColor',
        display: 'inline-flex',
        alignItems: 'baseline',
        ...style,
      }}
      {...rest}
    >
      <span aria-hidden="true">swaraya</span>
      <span aria-hidden="true" style={{ color: 'var(--brote)' }}>.</span>
    </Comp>
  );
});

export default Wordmark;
