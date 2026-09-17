'use client';

/**
 * CasoSantaMonica — Sección B · En Campo.
 *
 * Fondo claro. Caso concreto de la primera implementación.
 * Se activa con MOSTRAR_CASO = true. Cifras editables en CIFRAS_CASO.
 */

import useScrollReveal from '../hooks/useScrollReveal';

// ─── Configuración editable ──────────────────────────────────
const MOSTRAR_CASO = false;

const CIFRAS_CASO = [
  { valor: '0', etiqueta: 'Prospectos procesados' },
  { valor: '0', etiqueta: 'Proporción que llegó a cita' },
  { valor: '0', etiqueta: 'Horas liberadas al equipo comercial' },
];

export const CasoSantaMonica = () => {
  if (!MOSTRAR_CASO) return null;

  const [headerRef, headerVisible] = useScrollReveal({ threshold: 0.2 });
  const [gridRef, gridVisible] = useScrollReveal({ threshold: 0.15 });

  return (
    <section
      id="caso-santa-monica"
      className="section-padding-lg relative"
      style={{ background: 'var(--blanco)' }}
      data-testid="caso-section"
    >
      <div className="container-main">
        <div className="grid lg:grid-cols-12 gap-10 md:gap-14 lg:gap-20 items-start">
          {/* Copy — 6 cols */}
          <div
            ref={headerRef}
            className={`lg:col-span-6 reveal ${headerVisible ? 'revealed' : ''}`}
          >
            <span
              className="label-accent block mb-6"
              data-testid="caso-label"
            >
              En Campo
            </span>
            <h2 className="heading-xl mb-6" data-testid="caso-headline">
              Empezamos aplicándonos{' '}
              <span style={{ color: 'var(--texto-apoyo)' }}>
                el método a nosotros
              </span>
            </h2>
            <p className="body-large mb-4" data-testid="caso-body-1">
              Santa Mónica Residencial es un desarrollo de ochenta y seis lotes
              en Mineral de la Reforma, Hidalgo. Ahí opera el primer agente de
              perfilado: califica cada prospecto y prioriza por probabilidad
              de cierre.
            </p>
            <p className="body-large" data-testid="caso-body-2">
              El criterio que aplica no salió de un manual. Salió de sentarnos
              a destilar cómo decide un desarrollador con treinta años de
              oficio qué prospecto merece una llamada y cuál no.
            </p>
          </div>

          {/* Cifras del caso — 6 cols */}
          <div
            ref={gridRef}
            className={`lg:col-span-6 flex flex-col gap-px reveal-stagger ${gridVisible ? 'revealed' : ''}`}
            style={{
              background: 'var(--borde-alfa)',
              borderRadius: 'var(--r-xl)',
              overflow: 'hidden',
            }}
          >
            {CIFRAS_CASO.map((c, i) => (
              <div
                key={i}
                className="p-6 md:p-8 flex items-baseline gap-6"
                style={{ background: 'var(--blanco)' }}
                data-testid={`caso-metric-${i + 1}`}
              >
                <span
                  style={{
                    fontFamily: "'Cabinet Grotesk', sans-serif",
                    fontWeight: 500,
                    fontSize: 'clamp(2rem, 4vw, 2.75rem)',
                    lineHeight: 1,
                    letterSpacing: '-0.03em',
                    color: 'var(--texto)',
                    minWidth: '3ch',
                  }}
                >
                  {c.valor}
                </span>
                <span
                  className="flex-1"
                  style={{
                    fontFamily: "'Inter', sans-serif",
                    fontSize: '0.9375rem',
                    lineHeight: 1.5,
                    color: 'var(--texto-apoyo)',
                  }}
                >
                  {c.etiqueta}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default CasoSantaMonica;
