'use client';

import { useMemo } from 'react';

/**
 * SectionParticles — Capa de partículas sutiles para secciones que de otra
 * forma se ven sobre-simplificadas.
 *
 * Implementación CSS-only (sin canvas), distribuye N partículas en una
 * rejilla pseudo-uniforme con jitter determinístico y aplica drift lento
 * vía `@keyframes float` (definido en globals.css).
 *
 * - No es intrusivo: opacidad baja, partículas chicas, sin glow.
 * - Determinístico por `seed`: las mismas posiciones en SSR y client
 *   (evita mismatch de hidratación).
 * - Cero overhead de animación JS: todo CSS.
 *
 * Props:
 *  - density: 'low' | 'medium' (cantidad de partículas; default 'low')
 *  - opacity: opacidad base por partícula (default 0.18)
 *  - color:   color base de las partículas (default indigo accent)
 *  - seed:    semilla para variar distribución entre secciones
 */
export default function SectionParticles({
  density = 'low',
  opacity = 0.40,
  color = '#5468D6',
  seed = 1,
}) {
  // Densidades sutiles — la idea es complementar, no llenar
  const count = density === 'high' ? 48 : density === 'medium' ? 28 : 18;
  // Rejilla pseudo-uniforme. low=6×3, medium=7×4, high=8×6
  const cols = density === 'high' ? 8 : density === 'medium' ? 7 : 6;
  const rows = Math.ceil(count / cols);

  const particles = useMemo(() => {
    const arr = [];
    for (let i = 0; i < count; i++) {
      const row = Math.floor(i / cols);
      const col = i % cols;
      // PRNG determinístico basado en (seed, i)
      const r1 = ((seed * 31 + i * 17.31) % 1 + 1) % 1;
      const r2 = ((seed * 47 + i * 11.79) % 1 + 1) % 1;
      const r3 = ((seed * 53 + i * 7.93) % 1 + 1) % 1;
      // Jitter dentro de la celda (entre 10% y 90% para evitar bordes duros)
      const cellW = 100 / cols;
      const cellH = 100 / rows;
      const left = cellW * (col + 0.1 + r1 * 0.8);
      const top = cellH * (row + 0.1 + r2 * 0.8);
      // Cada partícula tiene su propio ciclo (entre 12s y 22s) y delay
      const duration = 12 + r3 * 10;
      const delay = (r1 + r2) * 6;
      // Opacidad variando un poco entre partículas
      const opacityFactor = 0.7 + r2 * 0.6;
      // Tamaño 2px ó 3px (algunas más grandes para acento visible)
      const sizePx = r1 > 0.75 ? 3 : 2;

      arr.push({
        left: `${left}%`,
        top: `${top}%`,
        duration,
        delay,
        opacityFactor,
        sizePx,
      });
    }
    return arr;
  }, [count, cols, rows, seed]);

  return (
    <div
      className="absolute inset-0 overflow-hidden pointer-events-none"
      aria-hidden="true"
      data-testid="section-particles"
    >
      {particles.map((p, i) => (
        <span
          key={i}
          className="absolute rounded-full"
          style={{
            left: p.left,
            top: p.top,
            width: `${p.sizePx}px`,
            height: `${p.sizePx}px`,
            background: color,
            opacity: opacity * p.opacityFactor,
            animationName: 'driftSubtle',
            animationDuration: `${p.duration}s`,
            animationTimingFunction: 'ease-in-out',
            animationIterationCount: 'infinite',
            animationDelay: `-${p.delay}s`,
            willChange: 'transform',
          }}
        />
      ))}
    </div>
  );
}
