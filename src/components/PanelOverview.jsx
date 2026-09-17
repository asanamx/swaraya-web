'use client';

/**
 * PanelOverview — Sección C · Lo que recibes.
 *
 * Fondo oscuro (.invertido). Cuatro puntos en 2×2 (desktop) sobre columna
 * izquierda + placeholder 16:10 para captura del panel a la derecha.
 * Esta sección SÍ se renderiza desde ya (no tiene bandera de visibilidad).
 */

import useScrollReveal from '../hooks/useScrollReveal';

const PUNTOS = [
  {
    titulo: 'Estado de procesos',
    cuerpo:
      'Qué está corriendo, cuánto atendió y qué requiere atención hoy.',
  },
  {
    titulo: 'Bandeja de decisiones',
    cuerpo:
      'Lo ambiguo llega aquí. Tu equipo aprueba, corrige o rechaza en un clic.',
  },
  {
    titulo: 'Tus reglas visibles',
    cuerpo:
      'Umbrales y excepciones en lenguaje llano, editables, con historial de cambios.',
  },
  {
    titulo: 'Desempeño en el tiempo',
    cuerpo:
      'Precisión contra el banco de casos, mes con mes, con el detalle de los errores.',
  },
];

export const PanelOverview = () => {
  const [headerRef, headerVisible] = useScrollReveal({ threshold: 0.2 });
  const [gridRef, gridVisible] = useScrollReveal({ threshold: 0.1 });

  return (
    <section
      id="panel"
      className="section-padding-lg relative invertido with-grain"
      data-testid="panel-section"
    >
      <div className="container-main">
        {/* Header */}
        <div
          ref={headerRef}
          className={`max-w-2xl mb-14 md:mb-18 lg:mb-20 reveal ${headerVisible ? 'revealed' : ''}`}
        >
          <span className="label-accent block mb-6" data-testid="panel-label">
            Lo que recibes
          </span>
          <h2 className="heading-xl mb-5" data-testid="panel-headline">
            Un solo lugar donde{' '}
            <span style={{ color: 'var(--texto-apoyo)' }}>
              ver y mandar
            </span>
          </h2>
          <p className="body-large" data-testid="panel-subtext">
            No entregamos flujos técnicos que solo nosotros entendemos.
            Entregamos un panel donde tu equipo ve qué pasó, aprueba lo dudoso
            y cambia las reglas cuando cambia el negocio.
          </p>
        </div>

        {/* Split — 4 puntos (izq) + captura (der) */}
        <div
          ref={gridRef}
          className={`grid lg:grid-cols-12 gap-10 md:gap-14 lg:gap-16 items-start reveal-stagger ${gridVisible ? 'revealed' : ''}`}
        >
          {/* Cuatro puntos — 5 cols en desktop */}
          <div className="lg:col-span-5">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-10">
              {PUNTOS.map((p, i) => (
                <div key={i} data-testid={`panel-punto-${i + 1}`}>
                  <h3
                    className="mb-2.5"
                    style={{
                      fontFamily: "'Inter', sans-serif",
                      fontSize: '0.9375rem',
                      fontWeight: 600,
                      letterSpacing: '-0.005em',
                      color: 'var(--texto)',
                    }}
                  >
                    {p.titulo}
                  </h3>
                  <p
                    style={{
                      fontFamily: "'Inter', sans-serif",
                      fontSize: '0.8125rem',
                      lineHeight: 1.6,
                      color: 'var(--texto-apoyo)',
                      maxWidth: '32ch',
                    }}
                  >
                    {p.cuerpo}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Captura del panel — placeholder 16:10 · 7 cols en desktop */}
          <div className="lg:col-span-7">
            <div
              className="relative w-full overflow-hidden"
              style={{
                aspectRatio: '16 / 10',
                background: 'var(--superficie)',
                border: '1px solid var(--borde)',
                borderRadius: 'var(--r-xl)',
              }}
              data-testid="panel-captura"
            >
              <div
                className="absolute inset-0 flex items-center justify-center"
                style={{
                  fontFamily: "'Inter', sans-serif",
                  fontSize: '0.8125rem',
                  letterSpacing: '0.08em',
                  textTransform: 'uppercase',
                  color: 'var(--texto-apoyo)',
                }}
              >
                Captura del panel
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PanelOverview;
