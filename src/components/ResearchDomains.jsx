'use client';

import useScrollReveal from '../hooks/useScrollReveal';

/**
 * SWARAYA · Set geométrico propio de dominios.
 * 20×20 viewBox, stroke 1.5px, sin fill, currentColor.
 * Ningún ícono de librería — cada glifo es una abstracción del dominio.
 */
const GlyphArchitecture = () => (
  <svg viewBox="0 0 20 20" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <rect x="4" y="12" width="12" height="4" />
    <rect x="6" y="7" width="8"  height="4" />
    <rect x="8" y="2" width="4"  height="4" />
  </svg>
);

const GlyphAgents = () => (
  <svg viewBox="0 0 20 20" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
    <circle cx="10" cy="10" r="3.2" />
    <circle cx="10" cy="3"  r="1"  fill="currentColor" stroke="none" />
    <circle cx="17" cy="10" r="1"  fill="currentColor" stroke="none" />
    <circle cx="10" cy="17" r="1"  fill="currentColor" stroke="none" />
    <circle cx="3"  cy="10" r="1"  fill="currentColor" stroke="none" />
  </svg>
);

const GlyphPredictive = () => (
  <svg viewBox="0 0 20 20" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="2,15 7,10 11,13 18,4" />
    <circle cx="18" cy="4" r="1.4" fill="currentColor" stroke="none" />
  </svg>
);

const GlyphData = () => (
  <svg viewBox="0 0 20 20" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M10 2 L17 6 L10 10 L3 6 Z" />
    <path d="M3 6 L3 14 L10 18 L17 14 L17 6" />
    <path d="M10 10 L10 18" />
  </svg>
);

const GlyphImplementation = () => (
  <svg viewBox="0 0 20 20" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="4" cy="16" r="1.4" fill="currentColor" stroke="none" />
    <line x1="4" y1="16" x2="16" y2="4" />
    <polyline points="10,4 16,4 16,10" />
  </svg>
);

const GlyphInteraction = () => (
  <svg viewBox="0 0 20 20" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.5">
    <circle cx="7"  cy="10" r="4" />
    <circle cx="13" cy="10" r="4" />
  </svg>
);

const domains = [
  {
    id: 1,
    Glyph: GlyphArchitecture,
    title: 'Arquitectura Estratégica de IA',
    description: 'Diseño de sistemas de inteligencia alineados con estructura organizacional, decisión y escalabilidad.',
    number: '01'
  },
  {
    id: 2,
    Glyph: GlyphAgents,
    title: 'Agentes Autónomos',
    description: 'Agentes cognitivos y flujos autónomos para ejecución, coordinación y asistencia contextual.',
    number: '02'
  },
  {
    id: 3,
    Glyph: GlyphPredictive,
    title: 'Modelado Predictivo',
    description: 'Modelos para anticipación de demanda, riesgo, comportamiento, operación y planeación.',
    number: '03'
  },
  {
    id: 4,
    Glyph: GlyphData,
    title: 'Estructuración de Datos',
    description: 'Organización semántica y operativa de datos para habilitar razonamiento computacional.',
    number: '04'
  },
  {
    id: 5,
    Glyph: GlyphImplementation,
    title: 'De la Investigación a la Implementación',
    description: 'Desarrollo de plataformas propietarias desde hipótesis hasta implementación.',
    number: '05'
  },
  {
    id: 6,
    Glyph: GlyphInteraction,
    title: 'Interacción Humano-IA',
    description: 'Diseño de interfaces conversacionales y experiencias de interacción de alta precisión.',
    number: '06'
  },
];

export const ResearchDomains = () => {
  const [headerRef, headerVisible] = useScrollReveal({ threshold: 0.2 });
  const [cardsRef, cardsVisible] = useScrollReveal({ threshold: 0.1 });

  return (
    <section
      id="research"
      className="section-padding bg-[#f4f4f5]"
      data-testid="research-domains-section"
    >
      <div className="container-main">
        <div 
          ref={headerRef}
          className={`max-w-xl mb-16 md:mb-20 lg:mb-24 reveal ${headerVisible ? 'revealed' : ''}`}
        >
          <span 
            className="label-accent text-[#7d5800] block mb-6" 
            data-testid="research-label"
          >
            Dominios de Investigación
          </span>
          <h2 className="heading-xl mb-5" data-testid="research-headline">
            Campos de <span className="text-[#7d5800]">inteligencia aplicada</span>
          </h2>
          <p className="body-large" data-testid="research-subtext">
            Capacidades diseñadas para traducir investigación, datos y sistemas en operación real.
          </p>
        </div>

        <div 
          ref={cardsRef}
          className={`grid sm:grid-cols-2 lg:grid-cols-3 gap-px bg-[rgba(17, 17, 20,0.06)] rounded-[16px] overflow-hidden reveal-stagger ${cardsVisible ? 'revealed' : ''}`}
        >
          {domains.map(({ id, Glyph, title, description, number }) => (
            <div
              key={id}
              className="relative bg-[#ffffff] p-7 md:p-8 lg:p-10 group transition-all duration-300"
              data-testid={`domain-card-${id}`}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-3px)';
                e.currentTarget.style.boxShadow = '0 24px 48px -16px rgba(17, 17, 20,0.08)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = 'none';
              }}
            >
              <span
                className="absolute top-5 right-6 text-[3.25rem] md:text-[4rem] leading-none select-none pointer-events-none transition-all duration-500"
                style={{
                  fontFamily: "'Cabinet Grotesk', sans-serif",
                  fontWeight: 500,
                  letterSpacing: '-0.04em',
                  color: 'rgba(125, 88, 0,0.14)',
                }}
              >
                {number}
              </span>

              <div className="relative z-10 mb-7">
                <div
                  className="w-9 h-9 rounded-lg flex items-center justify-center transition-all duration-400"
                  style={{
                    background: 'rgba(125, 88, 0,0.06)',
                    color: '#52565e',
                  }}
                >
                  <Glyph />
                </div>
              </div>

              <h3 className="relative z-10 text-[0.9375rem] md:text-base font-medium text-[#111114] mb-3.5 tracking-[-0.01em] leading-snug">
                {title}
              </h3>

              <p className="relative z-10 text-[0.8125rem] text-[#52565e] leading-[1.8]">
                {description}
              </p>

              <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[rgba(125, 88, 0,0.25)] to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ResearchDomains;
