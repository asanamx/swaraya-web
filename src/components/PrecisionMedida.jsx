'use client';

/**
 * PrecisionMedida — Sección A · Evidencia.
 *
 * Fondo oscuro (.invertido). Muestra el compromiso de medición
 * antes de producción. Se activa con MOSTRAR_METRICAS = true.
 *
 * Métricas editables en un solo lugar (arreglo METRICAS).
 */

import useScrollReveal from '../hooks/useScrollReveal';

// ─── Configuración editable ──────────────────────────────────
const MOSTRAR_METRICAS = false;

const METRICAS = [
  { valor: '100', etiqueta: 'decisiones reales en cada banco de prueba' },
  { valor: '90%', etiqueta: 'acierto mínimo para salir a producción' },
  { valor: '0',   etiqueta: 'acciones ejecutadas sin aprobación humana' },
];

export const PrecisionMedida = () => {
  if (!MOSTRAR_METRICAS) return null;

  const [headerRef, headerVisible] = useScrollReveal({ threshold: 0.2 });
  const [gridRef, gridVisible] = useScrollReveal({ threshold: 0.15 });

  return (
    <section
      id="precision"
      className="section-padding-lg relative invertido with-grain"
      data-testid="precision-section"
    >
      <div className="container-main">
        {/* Header */}
        <div
          ref={headerRef}
          className={`max-w-2xl mb-16 md:mb-20 reveal ${headerVisible ? 'revealed' : ''}`}
        >
          <span
            className="label-accent block mb-6"
            data-testid="precision-label"
          >
            Evidencia
          </span>
          <h2 className="heading-xl mb-5" data-testid="precision-headline">
            No prometemos precisión.{' '}
            <span style={{ color: 'var(--texto-apoyo)' }}>
              La medimos y la firmamos.
            </span>
          </h2>
          <p className="body-large" data-testid="precision-subtext">
            Antes de que un agente entre a producción, lo corremos contra un
            banco de decisiones reales que tu propia gente ya resolvió. Si no
            alcanza el umbral acordado, no entra. Así de simple.
          </p>
        </div>

        {/* Cifras */}
        <div
          ref={gridRef}
          className={`grid grid-cols-1 sm:grid-cols-3 gap-px reveal-stagger ${gridVisible ? 'revealed' : ''}`}
          style={{
            background: 'var(--borde)',
            borderRadius: 'var(--r-xl)',
            overflow: 'hidden',
          }}
        >
          {METRICAS.map((m, i) => (
            <div
              key={i}
              className="p-8 md:p-10 lg:p-12 flex flex-col gap-4"
              style={{ background: 'var(--tema)' }}
              data-testid={`precision-metric-${i + 1}`}
            >
              <span
                className="metric-number"
                style={{
                  fontFamily: "'Cabinet Grotesk', sans-serif",
                  fontWeight: 500,
                  fontSize: 'clamp(3rem, 6vw, 4.5rem)',
                  lineHeight: 0.9,
                  letterSpacing: '-0.045em',
                  color: 'var(--texto)',
                }}
              >
                {m.valor}
              </span>
              <span
                style={{
                  fontFamily: "'Inter', sans-serif",
                  fontSize: '0.8125rem',
                  lineHeight: 1.55,
                  color: 'var(--texto-apoyo)',
                  maxWidth: '30ch',
                }}
              >
                {m.etiqueta}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PrecisionMedida;
