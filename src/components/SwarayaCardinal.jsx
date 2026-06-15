'use client';

/**
 * SwarayaCardinal — Sistema de marca oficial (versión fija).
 *
 * Anatomía:
 *  6 elementos INDEPENDIENTES que no se tocan entre ellos.
 *  - 4 cardinales (N, S, E, W) en sumi, formando una cruz interrumpida
 *  - 1 punto central pequeño en INDIGO, flotando en el espacio negativo
 *  - 1 diagonal NE en INDIGO, flotando separada en el cuadrante superior derecho
 *
 * Color:
 *  - Cardinales: color del texto (sumi)
 *  - Centro + diagonal NE: indigo (#2C3E80) — dos acentos cromáticos
 *
 * Comportamiento: FIJO. Sin morph. Sin reacción al scroll.
 * El ícono permanece igual en hero, scroll, páginas internas y mobile menu.
 *
 * Props:
 *  - size: pixel size (default 32)
 *  - color: stroke color para los 4 cardinales (default currentColor)
 *  - accent: color para el dot central + diagonal NE (default '#2C3E80')
 *  - strokeWidth: grosor de líneas (default 2.6)
 */

export default function SwarayaCardinal({
  size = 32,
  color = 'currentColor',
  accent = '#2C3E80',
  strokeWidth = 2.6,
}) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 48 48"
      fill="none"
      aria-hidden
      style={{ display: 'block', flexShrink: 0 }}
    >
      {/* N — cardinal vertical superior, separado del centro */}
      <line
        x1="24" y1="3" x2="24" y2="16"
        stroke={color}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
      />
      {/* S — cardinal vertical inferior, separado del centro */}
      <line
        x1="24" y1="32" x2="24" y2="45"
        stroke={color}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
      />
      {/* E — cardinal horizontal derecha, separada del centro */}
      <line
        x1="32" y1="24" x2="45" y2="24"
        stroke={color}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
      />
      {/* W — cardinal horizontal izquierda, separada del centro */}
      <line
        x1="3" y1="24" x2="16" y2="24"
        stroke={color}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
      />
      {/* Centro — punto INDIGO, flotando en el espacio negativo,
          sin tocar ningún cardinal. Acento cromático interior. */}
      <circle cx="24" cy="24" r="2.2" fill={accent} />
      {/* NE — diagonal INDIGO, flotando en el cuadrante superior derecho,
          completamente separada de todos los demás elementos. La firma. */}
      <line
        x1="32" y1="16" x2="45" y2="3"
        stroke={accent}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
      />
    </svg>
  );
}
