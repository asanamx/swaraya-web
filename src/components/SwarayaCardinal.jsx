'use client';

/**
 * SwarayaCardinal — Sistema de marca oficial.
 *
 * Anatomía:
 *  5 LÍNEAS INDEPENDIENTES que no se tocan entre ellas.
 *  - 4 cardinales (N, S, E, W) forman una cruz INTERRUMPIDA con gap central
 *  - 1 diagonal NE flotando en el cuadrante superior derecho (OFFSET, separada)
 *  - El centro NO se dibuja — es espacio negativo, el silencio de la marca
 *
 * Color:
 *  - Cardinales: color principal del texto (sumi)
 *  - Diagonal NE: índigo (#2C3E80) — la única acentuación cromática
 *
 * Scroll morph (A → B):
 *  - progress 0 → 4 cardinales + diagonal NE visibles
 *  - progress 1 → solo la diagonal NE indigo (la firma)
 *
 * El gap central es el ADN compartido entre A y B — siempre presente.
 *
 * Props:
 *  - progress: 0..1
 *  - size: pixel size
 *  - color: stroke color for cardinals (default currentColor)
 *  - accent: stroke color for NE diagonal (default '#2C3E80')
 *  - strokeWidth: line weight (default 3)
 */

export default function SwarayaCardinal({
  progress = 0,
  size = 40,
  color = 'currentColor',
  accent = '#2C3E80',
  strokeWidth = 3,
}) {
  const p = Math.min(Math.max(progress, 0), 1);
  const cardinalFade = 1 - p;

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 64 64"
      fill="none"
      aria-hidden
      style={{ display: 'block', flexShrink: 0 }}
    >
      {/* N — cardinal vertical superior, NO toca el centro */}
      <line
        x1="32" y1="8" x2="32" y2="22"
        stroke={color}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        opacity={cardinalFade}
        style={{ transition: 'opacity 0.25s ease-out' }}
      />
      {/* S — cardinal vertical inferior, NO toca el centro */}
      <line
        x1="32" y1="42" x2="32" y2="56"
        stroke={color}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        opacity={cardinalFade}
        style={{ transition: 'opacity 0.25s ease-out' }}
      />
      {/* E — cardinal horizontal derecha, NO toca el centro */}
      <line
        x1="42" y1="32" x2="56" y2="32"
        stroke={color}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        opacity={cardinalFade}
        style={{ transition: 'opacity 0.25s ease-out' }}
      />
      {/* W — cardinal horizontal izquierda, NO toca el centro */}
      <line
        x1="8" y1="32" x2="22" y2="32"
        stroke={color}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        opacity={cardinalFade}
        style={{ transition: 'opacity 0.25s ease-out' }}
      />
      {/* NE — diagonal INDIGO flotando en el cuadrante superior derecho,
          OFFSET del centro, separada del resto. Siempre visible.
          Esta es la firma de la marca. */}
      <line
        x1="44" y1="22" x2="56" y2="10"
        stroke={accent}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
      />
    </svg>
  );
}
