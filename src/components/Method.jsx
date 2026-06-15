'use client';

import useScrollReveal from '../hooks/useScrollReveal';
import SectionParticles from './SectionParticles';

const steps = [
  {
    number: '01',
    title: 'Investigación',
    description: 'Exploración profunda del contexto organizacional y sus restricciones.',
  },
  {
    number: '02',
    title: 'Mapeo',
    description: 'Análisis de flujos de datos, procesos de decisión e integración.',
  },
  {
    number: '03',
    title: 'Diseño',
    description: 'Arquitectura de modelos de IA alineados con los requerimientos.',
  },
  {
    number: '04',
    title: 'Integración',
    description: 'Conexión fluida con la infraestructura existente.',
  },
  {
    number: '05',
    title: 'Evolución',
    description: 'Optimización continua y evolución de los sistemas.',
  },
];

export const Method = () => {
  const [headerRef, headerVisible] = useScrollReveal({ threshold: 0.2 });
  const [timelineRef, timelineVisible] = useScrollReveal({ threshold: 0.1 });

  return (
    <section
      id="method"
      className="section-padding bg-[#F5F2EC] relative overflow-hidden"
      data-testid="method-section"
    >
      {/* Capa sutil de partículas */}
      <SectionParticles density="medium" opacity={0.40} seed={3} />

      <div className="container-main relative z-10">
        {/* Header */}
        <div 
          ref={headerRef}
          className={`max-w-xl mb-16 md:mb-20 lg:mb-28 reveal ${headerVisible ? 'revealed' : ''}`}
        >
          <span 
            className="label-accent text-[#2C3E80] block mb-6" 
            data-testid="method-label"
          >
            Método
          </span>
          <h2 className="heading-xl mb-5" data-testid="method-headline">
            De la investigación a la infraestructura
          </h2>
          <p className="body-large" data-testid="method-subtext">
            Cada sistema nace de una hipótesis, se traduce en arquitectura y se valida en operación.
          </p>
        </div>

        {/* Timeline - Distinctive institutional style */}
        <div ref={timelineRef} className="relative">
          {/* Desktop: Horizontal layout with architectural lines */}
          <div className="hidden lg:block">
            {/* Main horizontal line */}
            <div 
              className={`absolute top-[52px] left-[10%] right-[10%] h-px transition-all duration-1000 ${
                timelineVisible ? 'opacity-100' : 'opacity-0'
              }`}
              style={{ 
                background: 'linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.06) 15%, rgba(255,255,255,0.06) 85%, transparent 100%)',
                transitionDelay: '200ms'
              }}
            />
            
            <div className="grid grid-cols-5 gap-0">
              {steps.map((step, index) => (
                <div
                  key={step.number}
                  className={`relative text-center timeline-reveal group ${timelineVisible ? 'revealed' : ''}`}
                  style={{ transitionDelay: `${index * 100 + 300}ms` }}
                  data-testid={`method-step-${step.number}`}
                >
                  {/* Large number */}
                  <div className="mb-6">
                    <span
                      className="text-[3.5rem] md:text-[4.25rem] leading-none transition-colors duration-400"
                      style={{
                        fontFamily: "'Cabinet Grotesk', sans-serif",
                        fontWeight: 500,
                        letterSpacing: '-0.045em',
                        color: 'rgba(44,62,128,0.20)',
                      }}
                    >
                      {step.number}
                    </span>
                  </div>
                  
                  {/* Node dot */}
                  <div className="absolute top-[48px] left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-[#2C3E80]/55 transition-all duration-300 group-hover:bg-[#2C3E80] group-hover:scale-125" />
                  
                  {/* Vertical connector */}
                  <div className="absolute top-[56px] left-1/2 w-px h-6 bg-gradient-to-b from-[rgba(255,255,255,0.06)] to-transparent -translate-x-1/2" />
                  
                  {/* Content */}
                  <div className="pt-6">
                    <h3 className="text-[0.9375rem] font-medium text-[#0E0F11] mb-2.5 tracking-[-0.01em]">
                      {step.title}
                    </h3>
                    <p className="text-[0.8125rem] text-[#5D6878] leading-[1.7] max-w-[170px] mx-auto">
                      {step.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Mobile/Tablet: Vertical layout */}
          <div className="lg:hidden space-y-0">
            {steps.map((step, index) => (
              <div
                key={step.number}
                className={`relative flex gap-5 md:gap-6 timeline-reveal ${timelineVisible ? 'revealed' : ''}`}
                style={{ transitionDelay: `${index * 80 + 150}ms` }}
                data-testid={`method-step-${step.number}-mobile`}
              >
                {/* Left: Number and line */}
                <div className="flex flex-col items-center w-12">
                  <span
                    className="text-[1.75rem] mb-2 tabular-nums"
                    style={{
                      fontFamily: "'Cabinet Grotesk', sans-serif",
                      fontWeight: 500,
                      letterSpacing: '-0.04em',
                      color: 'rgba(44,62,128,0.55)',
                    }}
                  >
                    {step.number}
                  </span>
                  {index < steps.length - 1 && (
                    <div className="flex-1 w-px bg-gradient-to-b from-[rgba(44,62,128,0.25)] to-transparent min-h-[50px]" />
                  )}
                </div>
                
                {/* Right: Content */}
                <div className="pb-8 flex-1">
                  <h3 className="text-[0.9375rem] font-medium text-[#0E0F11] mb-1.5 tracking-[-0.01em]">
                    {step.title}
                  </h3>
                  <p className="text-[0.8125rem] text-[#5D6878] leading-[1.7]">
                    {step.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Method;
