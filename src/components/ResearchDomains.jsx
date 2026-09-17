'use client';

import { ArrowUpRight } from 'lucide-react';
import useScrollReveal from '../hooks/useScrollReveal';

/**
 * ResearchDomains — v3.0 · índice editorial.
 *
 * Tres niveles de destilación de criterio (conocimiento, decisión, voz).
 * Formato: columna izquierda con label/titular/bajada; columna derecha
 * con lista numerada separada por hairlines + cierre atenuado.
 *
 * Sin cards, sin sombras, sin iconografía de color. Solo hairlines.
 */

const levels = [
  {
    number: '01',
    title: 'Lo que tu empresa sabe',
    description:
      'Catálogos, precios, políticas, contratos y el historial de casos resueltos. Consultable al instante, actualizable por tu equipo.',
  },
  {
    number: '02',
    title: 'Cómo tu empresa decide',
    description:
      'Umbrales, prioridades, excepciones y rutas de escalamiento, escritos en lenguaje llano y editables sin tocar una línea de código.',
  },
  {
    number: '03',
    title: 'Cómo tu empresa habla',
    description:
      'El tono, el formato y el estándar de calidad que aceptas, calibrados con ejemplos que tu propia gente aprobó.',
  },
];

export const ResearchDomains = () => {
  const [headerRef, headerVisible] = useScrollReveal({ threshold: 0.2 });
  const [listRef, listVisible] = useScrollReveal({ threshold: 0.08 });

  return (
    <section
      id="criterio"
      className="section-padding-lg relative"
      style={{ background: 'var(--niebla)' }}
      data-testid="research-domains-section"
    >
      <div className="container-main">
        <div className="grid lg:grid-cols-12 gap-10 md:gap-14 lg:gap-20 items-start">
          {/* Encabezado — 5 columnas */}
          <div
            ref={headerRef}
            className={`lg:col-span-5 lg:sticky lg:top-32 reveal ${headerVisible ? 'revealed' : ''}`}
          >
            <span
              className="label-accent block mb-6"
              data-testid="research-label"
            >
              Destilación de Criterio
            </span>
            <h2 className="heading-xl mb-5" data-testid="research-headline">
              Tres niveles para{' '}
              <span style={{ color: 'var(--texto-apoyo)' }}>
                convertir oficio en sistema
              </span>
            </h2>
            <p className="body-large" data-testid="research-subtext">
              Separar estos tres niveles es lo que permite que tu gente lea sus
              propias reglas, las cambie cuando quiera, y que el sistema no sea
              una caja cerrada.
            </p>
          </div>

          {/* Índice editorial — 7 columnas */}
          <div
            ref={listRef}
            className={`lg:col-span-7 reveal-stagger ${listVisible ? 'revealed' : ''}`}
          >
            <ul
              className="border-t"
              style={{ borderColor: 'var(--borde-alfa)' }}
            >
              {levels.map(({ number, title, description }, i) => (
                <li
                  key={number}
                  className="group relative transition-colors duration-300"
                  style={{ borderBottom: '1px solid var(--borde-alfa)' }}
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.background = 'var(--superficie)')
                  }
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.background = 'transparent')
                  }
                  data-testid={`domain-row-${i + 1}`}
                >
                  <div className="flex items-start gap-5 md:gap-8 py-6 md:py-7 pr-2">
                    {/* Número fantasma */}
                    <span
                      className="select-none flex-shrink-0 transition-colors duration-300 tabular-nums"
                      style={{
                        fontFamily: "'Cabinet Grotesk', sans-serif",
                        fontWeight: 500,
                        fontSize: 'clamp(1.5rem, 2.4vw, 1.875rem)',
                        lineHeight: 1,
                        letterSpacing: '-0.03em',
                        color: 'var(--tinta-10)',
                        minWidth: 44,
                      }}
                    >
                      {number}
                    </span>

                    {/* Contenido */}
                    <div className="flex-1 flex flex-col gap-2">
                      <h3
                        style={{
                          fontFamily: "'Cabinet Grotesk', sans-serif",
                          fontWeight: 500,
                          fontSize: 'clamp(1.125rem, 1.5vw, 1.375rem)',
                          letterSpacing: '-0.02em',
                          lineHeight: 1.2,
                          color: 'var(--texto)',
                        }}
                      >
                        {title}
                      </h3>
                      <p
                        style={{
                          fontFamily: "'Inter', sans-serif",
                          fontSize: '0.9375rem',
                          lineHeight: 1.65,
                          color: 'var(--texto-apoyo)',
                          maxWidth: '54ch',
                        }}
                      >
                        {description}
                      </p>
                    </div>

                    {/* Flecha — aparece en hover */}
                    <span
                      aria-hidden="true"
                      className="flex-shrink-0 opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-400"
                      style={{ color: 'var(--texto-apoyo)', marginTop: 6 }}
                    >
                      <ArrowUpRight className="w-5 h-5" strokeWidth={1.6} />
                    </span>
                  </div>
                </li>
              ))}
            </ul>

            {/* Cierre atenuado — bajo la última hairline */}
            <p
              className="mt-6 md:mt-8 max-w-[54ch]"
              style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: '0.8125rem',
                lineHeight: 1.6,
                color: 'var(--texto-apoyo)',
                fontWeight: 400,
              }}
              data-testid="research-closing"
            >
              Un modelo nuevo llega cada pocos meses, y llega igual de ignorante
              sobre tu operación. Lo que destilamos contigo no caduca con la
              siguiente versión: se queda contigo.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ResearchDomains;
