'use client';

/**
 * SwarayaMark — el lockup oficial de la marca.
 *
 * Concepto G: la ligatura "sw" coronada por el sol radiante (svar).
 *  - El "sw" es la grafía visible del wordmark
 *  - El sol simboliza «svar» — sol, luz, radiancia (raíz Sanskrit de swaraya)
 *
 * Modos:
 *  - "full": "swaraya" completo con sol arriba + underline sutil bajo "sw"
 *  - "glyph": solo el lockup "sw + sol" como brand-mark aislado
 *  - "morph": render con opacities controlables (para scroll-driven animations)
 *
 * Props:
 *  - mode: 'full' | 'glyph'
 *  - size: fontSize CSS (default '1.3125rem')
 *  - color: currentColor por defecto
 *  - arayaOpacity: 0..1 (sólo en modo "morph")
 */

export default function SwarayaMark({
  mode = 'full',
  size = '1.3125rem',
  color = 'currentColor',
  arayaOpacity = 1,
  strokeWidth = 3,
}) {
  // Sol radiante SVG inline — escala con em
  const Sun = (
    <svg
      style={{
        position: 'absolute',
        top: '-0.55em',
        left: '0.08em',
        width: '0.42em',
        height: '0.42em',
        overflow: 'visible',
      }}
      viewBox="0 0 32 32"
      fill="none"
      aria-hidden="true"
    >
      <circle cx="16" cy="16" r="6" fill={color} />
      <line x1="16" y1="2" x2="16" y2="7" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" />
      <line x1="5" y1="16" x2="9" y2="16" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" />
      <line x1="23" y1="16" x2="27" y2="16" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" />
    </svg>
  );

  const baseTextStyle = {
    fontFamily: "'Author', sans-serif",
    fontWeight: 600,
    letterSpacing: '-0.03em',
    fontSize: size,
    lineHeight: 1,
    color,
    whiteSpace: 'nowrap',
  };

  // GLYPH ONLY — for favicon, OG, minimal brand marks
  if (mode === 'glyph') {
    return (
      <div
        style={{
          ...baseTextStyle,
          position: 'relative',
          display: 'inline-block',
          letterSpacing: '-0.06em',
          paddingTop: '0.55em',
        }}
      >
        {Sun}
        <span>sw</span>
      </div>
    );
  }

  // FULL wordmark "swaraya" — with optional araya fade for morph
  return (
    <div
      style={{
        ...baseTextStyle,
        position: 'relative',
        display: 'inline-flex',
        alignItems: 'baseline',
      }}
    >
      {/* "sw" lockup — always visible, the brand-mark */}
      <span style={{ position: 'relative', display: 'inline-block' }}>
        {Sun}
        <span>sw</span>
      </span>
      {/* "araya" — fades out on scroll via arayaOpacity prop */}
      <span
        style={{
          display: 'inline-block',
          opacity: arayaOpacity,
          transform: `translateX(${(1 - arayaOpacity) * -3}px)`,
          transition: 'opacity 80ms linear, transform 80ms linear',
        }}
      >
        araya
      </span>
    </div>
  );
}
