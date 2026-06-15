'use client';

/**
 * SwarayaCardinal — Sistema de marca oficial.
 *
 * Anatomía:
 *  6 elementos INDEPENDIENTES que no se tocan entre ellos.
 *  - 4 cardinales (N, S, E, W) en el color del texto
 *  - 1 dot central INDIGO LUMINOSO (#5468D6) — flotando en el gap
 *  - 1 diagonal NE INDIGO LUMINOSO (#5468D6) — flotando en el cuadrante superior derecho
 *
 * Estática: el ícono es siempre el mismo. Sin scroll morph.
 *
 * Props:
 *  - size: pixel size (default 30)
 *  - color: stroke color para los 4 cardinales (default currentColor)
 *  - accent: color para dot + diagonal NE (default '#5468D6' — más luminoso
 *    que el indigo oscuro del CTA #2C3E80, para que sea perceptible a
 *    tamaños pequeños donde el indigo oscuro lee como negro)
 *  - strokeWidth: grosor de las líneas sumi (default 2.6)
 */

export default function SwarayaCardinal({
  size = 30,
  color = 'currentColor',
  accent = '#5468D6',
  strokeWidth = 2.6,
}) {
  // La diagonal NE es ligeramente más gruesa que los cardinales — privilegia
  // visualmente al acento indigo (es la firma de la marca, no un cardinal más).
  const accentStroke = strokeWidth * 1.15;

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 48 48"
      fill="none"
      aria-hidden
      style={{ display: 'block', flexShrink: 0 }}
    >
      {/* N — cardinal vertical superior */}
      <line
        x1="24" y1="3" x2="24" y2="16"
        stroke={color}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
      />
      {/* S — cardinal vertical inferior */}
      <line
        x1="24" y1="32" x2="24" y2="45"
        stroke={color}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
      />
      {/* E — cardinal horizontal derecha */}
      <line
        x1="32" y1="24" x2="45" y2="24"
        stroke={color}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
      />
      {/* W — cardinal horizontal izquierda */}
      <line
        x1="3" y1="24" x2="16" y2="24"
        stroke={color}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
      />
      {/* Centro — dot INDIGO, más grande que antes para que el color
          se perciba claramente. Flotando, sin tocar nada. */}
      <circle cx="24" cy="24" r="2.6" fill={accent} />
      {/* NE — diagonal INDIGO, ligeramente más gruesa que los cardinales.
          Es la firma cromática de la marca. */}
      <line
        x1="32" y1="16" x2="45" y2="3"
        stroke={accent}
        strokeWidth={accentStroke}
        strokeLinecap="round"
      />
    </svg>
  );
}
