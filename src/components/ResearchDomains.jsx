'use client';

import { 
  Layers, 
  Bot, 
  TrendingUp, 
  Database, 
  Rocket, 
  MessageSquare 
} from 'lucide-react';
import useScrollReveal from '../hooks/useScrollReveal';

const domains = [
  {
    id: 1,
    icon: Layers,
    title: 'Arquitectura Estratégica de IA',
    description: 'Diseño de sistemas de inteligencia alineados con estructura organizacional, decisión y escalabilidad.',
    number: '01'
  },
  {
    id: 2,
    icon: Bot,
    title: 'Agentes Autónomos',
    description: 'Agentes cognitivos y flujos autónomos para ejecución, coordinación y asistencia contextual.',
    number: '02'
  },
  {
    id: 3,
    icon: TrendingUp,
    title: 'Modelado Predictivo',
    description: 'Modelos para anticipación de demanda, riesgo, comportamiento, operación y planeación.',
    number: '03'
  },
  {
    id: 4,
    icon: Database,
    title: 'Estructuración de Datos',
    description: 'Organización semántica y operativa de datos para habilitar razonamiento computacional.',
    number: '04'
  },
  {
    id: 5,
    icon: Rocket,
    title: 'De la Investigación a la Implementación',
    description: 'Desarrollo de plataformas propietarias desde hipótesis hasta implementación.',
    number: '05'
  },
  {
    id: 6,
    icon: MessageSquare,
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
      className="section-padding bg-[#08090E]"
      data-testid="research-domains-section"
    >
      <div className="container-main">
        {/* Header */}
        <div 
          ref={headerRef}
          className={`max-w-xl mb-16 md:mb-20 lg:mb-24 reveal ${headerVisible ? 'revealed' : ''}`}
        >
          <span 
            className="label-accent text-[#5A7BFA] block mb-6" 
            data-testid="research-label"
          >
            Dominios de Investigación
          </span>
          <h2 className="heading-xl mb-5" data-testid="research-headline">
            Campos de inteligencia aplicada
          </h2>
          <p className="body-large" data-testid="research-subtext">
            Capacidades diseñadas para traducir investigación, datos y sistemas en operación real.
          </p>
        </div>

        {/* Cards Grid - Distinctive */}
        <div 
          ref={cardsRef}
          className={`grid sm:grid-cols-2 lg:grid-cols-3 gap-px bg-[rgba(255,255,255,0.04)] rounded-[20px] overflow-hidden reveal-stagger ${cardsVisible ? 'revealed' : ''}`}
        >
          {domains.map((domain) => (
            <div
              key={domain.id}
              className="relative bg-[#08090E] p-7 md:p-8 lg:p-10 group"
              data-testid={`domain-card-${domain.id}`}
            >
              {/* Number watermark */}
              <span className="absolute top-5 right-6 text-[3rem] md:text-[3.5rem] font-semibold text-[rgba(122,196,224,0.06)] leading-none select-none pointer-events-none transition-all duration-500 group-hover:text-[rgba(122,196,224,0.1)]" style={{fontFamily: 'system-ui, -apple-system, sans-serif'}}>
                {domain.number}
              </span>
              
              {/* Icon with subtle container */}
              <div className="relative z-10 mb-7">
                <div className="w-9 h-9 rounded-lg bg-[rgba(255,255,255,0.02)] flex items-center justify-center transition-all duration-400 group-hover:bg-[rgba(122,196,224,0.06)]">
                  <domain.icon 
                    className="w-4 h-4 text-[#5D6878] transition-colors duration-400 group-hover:text-[#7AC4E0]" 
                    strokeWidth={1.5}
                  />
                </div>
              </div>

              {/* Title */}
              <h3 className="relative z-10 text-[0.9375rem] md:text-base font-medium text-[#F4F6F9] mb-3.5 tracking-[-0.01em] leading-snug">
                {domain.title}
              </h3>

              {/* Description */}
              <p className="relative z-10 text-[0.8125rem] text-[#999999] leading-[1.8]">
                {domain.description}
              </p>
              
              {/* Hover line accent */}
              <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[rgba(90,123,250,0.25)] to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ResearchDomains;
