'use client';

/**
 * SwarayaMorphMark — wordmark cuyo ícono se CONSTRUYE del colapso de las letras.
 *
 * Concepto:
 *  - La "s" permanece (es el ancla letterform: «sva» / self / inicio)
 *  - Las otras 6 letras (w-a-r-a-y-a) rotan alrededor de la "s" hasta formar
 *    los 6 rayos de un sol radiante encima de ella.
 *  - El sol NO es un símbolo arbitrario añadido a la "s" — está literalmente
 *    construido a partir de las letras del wordmark.
 *
 * Props:
 *   progress (0..1): 0 = wordmark horizontal natural · 1 = sol formado
 *   size:    fontSize CSS
 *   color:   currentColor
 *
 * La "s" crece +18% como compensación cuando los rayos se forman alrededor.
 */

// Posiciones naturales aproximadas (em) en font Author 600, letter-spacing -0.03em
// y configuración polar final (ángulo en grados, distancia en em del centro de la "s")
const LETTERS = [
  { ch: 's', nx: 0.00, anchor: true },
  { ch: 'w', nx: 0.62, deg: -162, dist: 1.10 },
  { ch: 'a', nx: 1.24, deg: -136, dist: 1.05 },
  { ch: 'r', nx: 1.72, deg: -110, dist: 1.15 },
  { ch: 'a', nx: 2.05, deg: -84,  dist: 1.10 },
  { ch: 'y', nx: 2.52, deg: -58,  dist: 1.05 },
  { ch: 'a', nx: 3.08, deg: -32,  dist: 1.10 },
];

const S_CENTER_X = 0.27; // visual center of "s" glyph in em from its left edge

function lerp(a, b, t) { return a + (b - a) * t; }

export default function SwarayaMorphMark({
  progress = 0,
  size = '3rem',
  color = '#0E0F11',
  durationMs = 160,
}) {
  const p = Math.max(0, Math.min(1, progress));

  return (
    <div
      style={{
        fontFamily: "'Author', sans-serif",
        fontWeight: 600,
        letterSpacing: '-0.03em',
        fontSize: size,
        color,
        position: 'relative',
        height: '1.4em',
        width: '4em',
        lineHeight: 1,
      }}
    >
      {LETTERS.map((L, i) => {
        const baseStyle = {
          position: 'absolute',
          left: `${L.nx}em`,
          bottom: '0.15em',
          display: 'inline-block',
          transformOrigin: 'center center',
          transition: `transform ${durationMs}ms cubic-bezier(0.6, 0, 0.2, 1)`,
          willChange: 'transform',
        };

        if (L.anchor) {
          return (
            <span
              key={i}
              style={{
                ...baseStyle,
                transformOrigin: 'left center',
                transform: `scale(${lerp(1, 1.18, p)})`,
              }}
            >
              {L.ch}
            </span>
          );
        }

        // Polar target relative to "s" center
        const rad = (L.deg * Math.PI) / 180;
        const targetX = S_CENTER_X + L.dist * Math.cos(rad);
        const targetY = L.dist * Math.sin(rad); // negative => up
        const dx = targetX - L.nx;
        const dy = targetY;
        const rot = L.deg + 90; // align letter's vertical axis with ray direction
        const scale = 0.38;

        return (
          <span
            key={i}
            style={{
              ...baseStyle,
              transform: `translate(${lerp(0, dx, p)}em, ${lerp(0, dy, p)}em) rotate(${lerp(0, rot, p)}deg) scale(${lerp(1, scale, p)})`,
            }}
          >
            {L.ch}
          </span>
        );
      })}
    </div>
  );
}
