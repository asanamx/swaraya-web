'use client';

/**
 * SectionGlow — Acento visual sutil para secciones que necesitan más presencia
 * inmediata (sin esperar a que el ojo perciba las partículas).
 *
 * Compone tres capas CSS, sin canvas:
 *  1. Glow radial difuso (indigo) — la "luz" de fondo
 *  2. Anillo concéntrico sutil — eco editorial del hero
 *  3. Punto central pulsante — el "núcleo"
 *
 * Es 100% CSS, sin JS de animación. Performance excelente.
 *
 * Props:
 *  - position: { x, y } en porcentajes (0..100) sobre la sección
 *  - size:     tamaño del glow en px (default 520)
 *  - intensity: 'subtle' | 'medium' (controla opacidades)
 */
export default function SectionGlow({
  position = { x: 50, y: 50 },
  size = 520,
  intensity = 'medium',
}) {
  const isSubtle = intensity === 'subtle';
  const glowAlpha = isSubtle ? 0.05 : 0.09;
  const ringAlpha = isSubtle ? 0.10 : 0.14;
  const coreAlpha = isSubtle ? 0.18 : 0.26;

  // Convertimos position al sistema de CSS absolute centrado en el punto
  const leftPct = `${position.x}%`;
  const topPct = `${position.y}%`;

  return (
    <div
      className="absolute inset-0 pointer-events-none overflow-hidden"
      aria-hidden="true"
      data-testid="section-glow"
    >
      {/* Glow radial difuso — la "luz" amplia de fondo */}
      <div
        className="absolute"
        style={{
          left: leftPct,
          top: topPct,
          width: `${size * 2}px`,
          height: `${size * 2}px`,
          transform: 'translate(-50%, -50%)',
          background: `radial-gradient(circle, rgba(84,104,214,${glowAlpha}) 0%, rgba(84,104,214,${glowAlpha * 0.45}) 28%, rgba(84,104,214,0) 60%)`,
          filter: 'blur(8px)',
          animation: 'glowPulse 7s ease-in-out infinite',
        }}
      />

      {/* Núcleo pulsante — el "punto de luz" central */}
      <div
        className="absolute rounded-full"
        style={{
          left: leftPct,
          top: topPct,
          width: '14px',
          height: '14px',
          transform: 'translate(-50%, -50%)',
          background: `radial-gradient(circle, rgba(84,104,214,${coreAlpha + 0.30}) 0%, rgba(84,104,214,${coreAlpha}) 40%, rgba(84,104,214,0) 100%)`,
          animation: 'glowPulse 4.5s ease-in-out infinite',
          boxShadow: `0 0 24px rgba(84,104,214,${coreAlpha * 0.7})`,
        }}
      />
    </div>
  );
}
