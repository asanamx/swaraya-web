'use client';

/**
 * SwarayaCardinal — Sistema de marca oficial.
 *
 * Concepto: Cardinal Asimétrico — el ícono que queda cuando las letras
 * del wordmark se retiran. Cada rayo viene de la anatomía tipográfica
 * de una letra específica:
 *  - NE largo: la oreja de la "r"
 *  - N corto: tope de stems de las "a"
 *  - S medio: descender de la "y"
 *  - E/W marcadores: terminales horizontales (w, s)
 *  - Centro indigo: el soberano, el punto de decisión
 *
 * Comportamiento scroll:
 *  - progress 0   → Variante A (Cardinal completo, 5 rayos)
 *  - progress 0→1 → Crossfade: rayos N/S/E/W → 0
 *  - progress 1   → Variante B (Sextante: solo NE + centro)
 *
 * El NE largo y el centro indigo PERMANECEN constantes — son el ADN
 * compartido entre A y B.
 *
 * Props:
 *  - progress: 0..1 (drives the A → B reduction)
 *  - size: pixel size of the SVG (default 36)
 *  - color: stroke color for rays (default 'currentColor')
 *  - accent: fill color for the center dot (default '#2C3E80' indigo)
 *  - strokeWidth: ray weight (default 2.2)
 */

export default function SwarayaCardinal({
  progress = 0,
  size = 36,
  color = 'currentColor',
  accent = '#2C3E80',
  strokeWidth = 2.2,
}) {
  const p = Math.min(Math.max(progress, 0), 1);
  const fade = 1 - p;
  const eOpacity = 0.6 * fade;
  const wOpacity = 0.6 * fade;

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 64 64"
      fill="none"
      aria-hidden
      style={{ display: 'block', flexShrink: 0 }}
    >
      {/* NE long ray — ALWAYS visible (shared DNA: A ∩ B) */}
      <line
        x1="34.5" y1="29.5" x2="58" y2="6"
        stroke={color} strokeWidth={strokeWidth} strokeLinecap="round"
      />
      {/* N short ray — fades to 0 with progress */}
      <line
        x1="32" y1="28" x2="32" y2="14"
        stroke={color} strokeWidth={strokeWidth} strokeLinecap="round"
        opacity={fade}
        style={{ transition: 'opacity 0.25s ease-out' }}
      />
      {/* S medium ray — fades */}
      <line
        x1="32" y1="36" x2="32" y2="54"
        stroke={color} strokeWidth={strokeWidth} strokeLinecap="round"
        opacity={fade}
        style={{ transition: 'opacity 0.25s ease-out' }}
      />
      {/* E small marker — fades */}
      <line
        x1="36" y1="32" x2="46" y2="32"
        stroke={color} strokeWidth={strokeWidth * 0.9} strokeLinecap="round"
        opacity={eOpacity}
        style={{ transition: 'opacity 0.25s ease-out' }}
      />
      {/* W small marker — fades */}
      <line
        x1="28" y1="32" x2="18" y2="32"
        stroke={color} strokeWidth={strokeWidth * 0.9} strokeLinecap="round"
        opacity={wOpacity}
        style={{ transition: 'opacity 0.25s ease-out' }}
      />
      {/* Center — ALWAYS visible (shared DNA: A ∩ B) */}
      <circle cx="32" cy="32" r="3.4" fill={accent} />
    </svg>
  );
}
