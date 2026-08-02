/**
 * Hexagon — motivo gráfico único del sistema swaraya (colmena).
 * SIEMPRE outline 1.2–1.5px. Sin relleno salvo estado 'active'.
 *
 * Usos permitidos (§5 del brand book):
 *  1. Indicador de estado en agentes/plataformas.
 *  2. Bullet de listas clave (Compromisos 01–05).
 *  3. Malla hexagonal apenas visible (sólo Agentes).
 *
 * PROHIBIDO: abejas, panales literales, patrones densos.
 */
const Hexagon = ({
  size = 12,
  color = 'currentColor',
  strokeWidth = 1.3,
  active = false,
  pulse = false,
  className = '',
  style = {},
}) => {
  // Hexágono regular vertical (punta arriba) inscrito en viewBox 24×24
  // Vértices: cos/sin de 30°, 90°, 150°, 210°, 270°, 330° escalados a r≈11
  const points = '12,1.5 21.5,7 21.5,17 12,22.5 2.5,17 2.5,7';

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      className={`${pulse ? 'hex-pulse' : ''} ${className}`}
      style={{ display: 'inline-block', flexShrink: 0, ...style }}
      aria-hidden="true"
    >
      <polygon
        points={points}
        fill={active ? color : 'none'}
        stroke={color}
        strokeWidth={strokeWidth}
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default Hexagon;
