'use client';

import useScrollReveal from '../hooks/useScrollReveal';

/**
 * PRINCIPLES · rediseño (brief punto 3)
 *
 * Cada principio parseado en 3 registros:
 *   1) Concepto principal (Cabinet ink 500)  — "Contexto"
 *   2) Conector "antes que" (versalitas #9aa0a8, pequeño)
 *   3) Concepto secundario (Inter #52565e)  — "automatización"
 *
 * Filas con número índice fantasma + hairline divider + hover con
 * highlight sutil. El "antes que" se convierte en patrón visual.
 */

const principles = [
  ['Contexto',       'automatización'],
  ['Precisión',      'espectáculo'],
  ['Integración',    'experimentación'],
  ['Gobernanza',     'despliegue'],
  ['Amplificación humana', 'reemplazo'],
];

const glosses = [
  'Antes de automatizar entendemos qué se debe automatizar.',
  'La precisión importa más que la impresión inicial.',
  'Se integra al proceso real, no a un experimento aislado.',
  'La gobernanza se define antes de mover código a producción.',
  'La IA extiende el criterio experto; no lo sustituye.',
];

export const Principles = () => {
  const [sectionRef, isVisible] = useScrollReveal({ threshold: 0.15 });

  return (
    <section
      ref={sectionRef}
      className="section-padding-lg relative overflow-hidden"
      style={{ background: '#f4f4f5' }}
      data-testid="principles-section"
    >
      {/* Glow indigo suave — único elemento decorativo (brief 2) */}
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(50% 45% at 78% 40%, rgba(232, 163, 23,0.08) 0%, transparent 70%)',
        }}
      />

      <div className="container-main relative z-10">
        <div className="grid lg:grid-cols-12 gap-10 md:gap-14 lg:gap-20 items-start">
          {/* Headline · 40% */}
          <div className={`lg:col-span-5 reveal ${isVisible ? 'revealed' : ''}`}>
            <h2 className="heading-xl mb-6" data-testid="principles-headline">
              Nuestros sistemas se moldean por{' '}
              <span style={{ color: '#7d5800' }}>disciplina antes que escala.</span>
            </h2>
            <p
              className="max-w-[38ch]"
              style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: '0.9375rem',
                lineHeight: 1.65,
                color: '#52565e',
              }}
            >
              Cinco compromisos que ordenan cómo diseñamos, integramos
              y entregamos los agentes que operan.
            </p>
          </div>

          {/* Principles rows · 60% */}
          <div className={`lg:col-span-7 reveal-stagger ${isVisible ? 'revealed' : ''}`}>
            <ul className="border-t" style={{ borderColor: 'rgba(17, 17, 20,0.10)' }}>
              {principles.map(([a, b], i) => (
                <li
                  key={i}
                  className="group relative flex items-start gap-6 md:gap-8 py-6 md:py-7 transition-colors duration-300"
                  data-testid={`principle-item-${i + 1}`}
                  style={{ borderBottom: '1px solid rgba(17, 17, 20,0.10)' }}
                  onMouseEnter={(e) => (e.currentTarget.style.background = 'rgba(125, 88, 0,0.04)')}
                  onMouseLeave={(e) => (e.currentTarget.style.background = 'transparent')}
                >
                  {/* Número índice fantasma */}
                  <span
                    className="select-none transition-colors duration-300 flex-shrink-0"
                    style={{
                      fontFamily: "'Cabinet Grotesk', sans-serif",
                      fontWeight: 500,
                      fontSize: 'clamp(1.5rem, 2.6vw, 2rem)',
                      lineHeight: 1,
                      letterSpacing: '-0.03em',
                      color: 'rgba(17, 17, 20,0.12)',
                      minWidth: 44,
                    }}
                  >
                    {String(i + 1).padStart(2, '0')}
                  </span>

                  {/* Contenido */}
                  <div className="flex-1 flex flex-col gap-1.5">
                    <div className="flex flex-wrap items-baseline gap-x-2.5 gap-y-1">
                      <span
                        style={{
                          fontFamily: "'Cabinet Grotesk', sans-serif",
                          fontWeight: 500,
                          fontSize: 'clamp(1.0625rem, 1.4vw, 1.25rem)',
                          letterSpacing: '-0.015em',
                          color: '#111114',
                          lineHeight: 1.25,
                        }}
                      >
                        {a}
                      </span>
                      <span
                        style={{
                          fontFamily: "'Inter', sans-serif",
                          fontSize: '0.6875rem',
                          fontWeight: 500,
                          letterSpacing: '0.18em',
                          textTransform: 'uppercase',
                          color: '#63666e',
                          lineHeight: 1.4,
                        }}
                      >
                        antes que
                      </span>
                      <span
                        style={{
                          fontFamily: "'Inter', sans-serif",
                          fontWeight: 400,
                          fontSize: 'clamp(1rem, 1.3vw, 1.15rem)',
                          color: '#52565e',
                          letterSpacing: '-0.005em',
                          lineHeight: 1.3,
                        }}
                      >
                        {b}
                      </span>
                    </div>
                    <p
                      className="max-h-0 opacity-0 group-hover:max-h-24 group-hover:opacity-100 group-hover:mt-2 transition-all duration-500 overflow-hidden"
                      style={{
                        fontFamily: "'Inter', sans-serif",
                        fontSize: '0.8125rem',
                        lineHeight: 1.6,
                        color: '#52565e',
                        maxWidth: '54ch',
                      }}
                    >
                      {glosses[i]}
                    </p>
                  </div>

                  {/* Marker indigo — aparece en hover */}
                  <span
                    aria-hidden="true"
                    className="absolute left-0 top-8 w-1.5 h-1.5 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    style={{
                      background: '#7d5800',
                      transform: 'translateX(-14px)',
                    }}
                  />
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Principles;
