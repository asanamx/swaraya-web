'use client';

/**
 * LiveRow — el "momento signature" del sistema visual swaraya.
 *
 * Fila punteada horizontal con 5–6 puntos girasol que marchan
 * de izquierda a derecha en loop lento con micro-oscilación vertical.
 * Aparece bajo el titular del hero y conectando los pasos del Método.
 *
 * Respetuoso con `prefers-reduced-motion` (fila estática, puntos fijos).
 */

const LiveRow = ({
  label = 'Agentes en producción',
  labelColor,               // opcional, default a token terciario oscuro
  onDark = true,
  dotCount = 6,
  className = '',
  style = {},
}) => {
  const dashColor = onDark ? 'rgba(200, 232, 36,0.35)' : 'rgba(13, 15, 14,0.35)';
  const labelDefault = onDark ? '#9aa0a8' : '#63666e';

  return (
    <div
      className={`live-row flex items-center gap-5 ${className}`}
      style={{ minHeight: 18, ...style }}
      data-testid="live-row"
    >
      {/* Track — línea punteada + puntos animados */}
      <div className="relative flex-1 flex items-center">
        <div
          aria-hidden="true"
          style={{
            height: 1,
            width: '100%',
            backgroundImage: `linear-gradient(to right, ${dashColor} 55%, transparent 45%)`,
            backgroundSize: '10px 1px',
            backgroundRepeat: 'repeat-x',
          }}
        />
        {/* Fila de puntos que marchan */}
        <div
          aria-hidden="true"
          className="absolute inset-0 flex items-center"
        >
          {Array.from({ length: dotCount }).map((_, i) => {
            // opacidades variables 0.55 – 1
            const opacities = [1, 0.72, 0.9, 0.6, 0.82, 0.55];
            // delays negativos irregulares para cadencia real
            const delays = [-0.4, -2.3, -4.1, -6.2, -8.4, -10.1];
            return (
              <span
                key={i}
                className="dot"
                style={{
                  '--delay': `${delays[i % delays.length]}s`,
                  '--bob-delay': `${(i * 0.17) % 1}s`,
                  opacity: opacities[i % opacities.length],
                }}
              />
            );
          })}
        </div>
      </div>

      {/* Label */}
      <span
        className="uppercase tracking-[0.16em] shrink-0"
        style={{
          fontFamily: "'Inter', sans-serif",
          fontSize: '0.6875rem',
          fontWeight: 500,
          color: labelColor || labelDefault,
          letterSpacing: '0.16em',
        }}
      >
        {label}
      </span>

      <style jsx>{`
        .live-row .dot {
          position: absolute;
          width: 5px;
          height: 5px;
          border-radius: 999px;
          background: #c8e824;
          top: 50%;
          left: -1%;
          margin-top: -2.5px;
          animation: live-march 11s linear infinite,
                     live-bob   2.1s ease-in-out infinite;
          animation-delay: var(--delay, 0s), var(--bob-delay, 0s);
          will-change: left, transform;
        }
        @keyframes live-march {
          0%   { left: -1%;  }
          100% { left: 101%; }
        }
        @keyframes live-bob {
          0%, 100% { transform: translateY(0); }
          50%      { transform: translateY(-1.5px); }
        }
        @media (prefers-reduced-motion: reduce) {
          .live-row .dot {
            animation: none !important;
            position: static;
            display: inline-block;
            margin: 0 8px;
          }
        }
      `}</style>
    </div>
  );
};

export default LiveRow;
