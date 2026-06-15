'use client';

/**
 * SectionGrid — Cuadrícula arquitectónica PARCIAL para secciones que
 * necesitan textura sin cobertura total.
 *
 * Usa la misma trama del hero (linear-gradient 64×64) pero aplicada con
 * `mask-image: radial-gradient` para que el grid sólo sea visible alrededor
 * de un punto focal y se desvanezca suavemente hacia los bordes.
 *
 * El resultado es una "huella" cuadrada de fondo, sutil, que sugiere
 * estructura sin imponer una rejilla completa.
 *
 * Props:
 *  - focal:     { x, y } en porcentajes (centro de la cuadrícula visible)
 *  - radius:    radio de visibilidad de la cuadrícula (default 55%)
 *  - cellSize:  tamaño de celda en px (default 64, igual que el hero)
 *  - lineAlpha: opacidad de las líneas (default 0.045 — apenas perceptible)
 */
export default function SectionGrid({
  focal = { x: 50, y: 50 },
  radius = 55,
  cellSize = 64,
  lineAlpha = 0.045,
}) {
  const lineColor = `rgba(14,15,17,${lineAlpha})`;
  const maskGradient = `radial-gradient(ellipse ${radius}% ${radius * 0.85}% at ${focal.x}% ${focal.y}%, black 0%, black 35%, transparent 75%)`;

  return (
    <div
      className="absolute inset-0 pointer-events-none"
      aria-hidden="true"
      data-testid="section-grid"
      style={{
        backgroundImage: `
          linear-gradient(${lineColor} 1px, transparent 1px),
          linear-gradient(90deg, ${lineColor} 1px, transparent 1px)
        `,
        backgroundSize: `${cellSize}px ${cellSize}px`,
        maskImage: maskGradient,
        WebkitMaskImage: maskGradient,
      }}
    />
  );
}
