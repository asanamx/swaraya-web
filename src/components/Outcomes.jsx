'use client';

import useScrollReveal from '../hooks/useScrollReveal';

/**
 * OUTCOMES · "Inteligencia operativa medible"
 *
 * Sección OSCURA por diseño — funciona como puntuación tonal en medio
 * del sitio (crema … crema … OSCURO … crema …).
 *
 * PROMPT D · métricas cualitativas honestas, ancladas a dominio.
 * No inventamos porcentajes; comunicamos las propiedades reales de
 * los sistemas que hemos puesto en operación.
 */

const facts = [
  {
    kicker: 'Perfilado de leads',
    heading: 'Aprobación humana antes de cada acción del agente.',
    domain: 'Inmobiliario residencial · en producción',
  },
  {
    kicker: 'Documentación fiscal',
    heading: 'Marcado prioritario de riesgo antes de la revisión manual.',
    domain: 'Fiscal / contable · en desarrollo',
  },
  {
    kicker: 'Trazabilidad',
    heading: 'Cada decisión del sistema queda auditada end-to-end.',
    domain: 'Estándar de todo agente entregado',
  },
  {
    kicker: 'Operación',
    heading: 'Sistemas diseñados para funcionar sin intervención constante.',
    domain: 'Con reversibilidad humana en cualquier paso',
  },
];

export const Outcomes = () => {
  const [headerRef, headerVisible] = useScrollReveal({ threshold: 0.2 });
  const [gridRef, gridVisible]     = useScrollReveal({ threshold: 0.12 });

  return (
    <section
      className="section-padding-lg relative overflow-hidden invertido with-grain"
      data-testid="outcomes-section"
    >
      {/* Glow indigo enfocado — mismo lenguaje que el hero */}
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none section-glow"
        style={{
          background:
            'radial-gradient(60% 50% at 72% 38%, rgba(200, 232, 36,0.18) 0%, rgba(200, 232, 36,0.05) 40%, transparent 70%)',
        }}
      />

      {/* Grano SVG (feTurbulence) — sutil, sobre el glow */}
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='240' height='240'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/%3E%3CfeColorMatrix values='0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.4 0'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
          opacity: 0.05,
          mixBlendMode: 'overlay',
        }}
      />

      <div className="container-main relative z-10">
        {/* Header */}
        <div
          ref={headerRef}
          className={`max-w-2xl mb-16 md:mb-20 lg:mb-24 reveal ${headerVisible ? 'revealed' : ''}`}
        >
          <span
            className="label-accent block mb-6"
            data-testid="outcomes-label"
          >
            Resultados
          </span>
          <h2
            className="heading-xl"
            data-testid="outcomes-headline"
          >
            Inteligencia <span style={{ color: 'var(--brote)' }}>operativa</span> medible
          </h2>
          <p
            className="mt-6 max-w-[54ch]"
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: 'clamp(0.9375rem, 1vw, 1rem)',
              lineHeight: 1.65,
              color: 'var(--texto-apoyo)',
            }}
          >
            No promesas. Propiedades de sistemas ya en operación —
            trazables, gobernables, con humanos siempre en el bucle.
          </p>
        </div>

        {/* Grid de hechos cualitativos */}
        <div
          ref={gridRef}
          className={`grid sm:grid-cols-2 gap-px reveal-stagger ${gridVisible ? 'revealed' : ''}`}
          style={{
            background: 'var(--borde)',
            borderRadius: 'var(--r-xl)',
            overflow: 'hidden',
          }}
        >
          {facts.map((f, i) => (
            <div
              key={i}
              className="relative p-8 md:p-10 lg:p-12 flex flex-col gap-5 transition-colors duration-400 group"
              style={{ background: 'var(--tema)' }}
              data-testid={`outcome-fact-${i + 1}`}
              onMouseEnter={(e) => (e.currentTarget.style.background = '#1c1c1b')}
              onMouseLeave={(e) => (e.currentTarget.style.background = 'var(--tema)')}
            >
              <span
                style={{
                  fontFamily: "'Inter', sans-serif",
                  fontSize: '0.6875rem',
                  letterSpacing: '0.18em',
                  textTransform: 'uppercase',
                  fontWeight: 500,
                  color: 'var(--brote)',
                }}
              >
                {f.kicker}
              </span>
              <p
                style={{
                  fontFamily: "'Cabinet Grotesk', sans-serif",
                  fontWeight: 500,
                  fontSize: 'clamp(1.375rem, 2vw, 1.75rem)',
                  lineHeight: 1.2,
                  letterSpacing: '-0.02em',
                  color: 'var(--texto)',
                  maxWidth: '30ch',
                }}
              >
                {f.heading}
              </p>
              <div
                className="w-10 h-px transition-all duration-400 group-hover:w-16 mt-1"
                style={{
                  background: 'linear-gradient(90deg, rgba(200, 232, 36,0.7) 0%, transparent 100%)',
                }}
              />
              <span
                style={{
                  fontFamily: "'Inter', sans-serif",
                  fontSize: '0.8125rem',
                  color: 'var(--texto-apoyo)',
                  letterSpacing: '0.01em',
                }}
              >
                {f.domain}
              </span>
            </div>
          ))}
        </div>

        {/* Nota de alcance */}
        <p
          className="mt-8 md:mt-10 text-center md:text-left max-w-[60ch]"
          style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: '0.75rem',
            color: 'var(--texto-apoyo)',
            letterSpacing: '0.02em',
            lineHeight: 1.6,
          }}
        >
          Propiedades de sistemas en operación; el detalle específico
          varía por implementación y dominio.
        </p>
      </div>
    </section>
  );
};

export default Outcomes;
