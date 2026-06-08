'use client';

import useScrollReveal from '../hooks/useScrollReveal';

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
      className="section-padding bg-[#05060A]"
      data-testid="method-section"
    >
      <div className="container-main">
        {/* Header */}
        <div 
          ref={headerRef}
          className={`max-w-xl mb-16 md:mb-20 lg:mb-28 reveal ${headerVisible ? 'revealed' : ''}`}
        >
          <span 
            className="label-accent text-[#7AC4E0] block mb-6" 
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
                    <span className="text-[3.5rem] font-semibold text-[rgba(122,196,224,0.06)] leading-none tracking-tight transition-colors duration-400 group-hover:text-[rgba(122,196,224,0.1)]" style={{fontFamily: 'system-ui, -apple-system, sans-serif'}}>
                      {step.number}
                    </span>
                  </div>
                  
                  {/* Node dot */}
                  <div className="absolute top-[48px] left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-[#7AC4E0]/40 transition-all duration-300 group-hover:bg-[#7AC4E0]/70 group-hover:scale-125" />
                  
                  {/* Vertical connector */}
                  <div className="absolute top-[56px] left-1/2 w-px h-6 bg-gradient-to-b from-[rgba(255,255,255,0.06)] to-transparent -translate-x-1/2" />
                  
                  {/* Content */}
                  <div className="pt-6">
                    <h3 className="text-[0.9375rem] font-medium text-[#F4F6F9] mb-2.5 tracking-[-0.01em]">
                      {step.title}
                    </h3>
                    <p className="text-[0.8125rem] text-[#999999] leading-[1.7] max-w-[170px] mx-auto">
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
                <div className="flex flex-col items-center w-10">
                  <span className="text-xl font-semibold text-[#7AC4E0]/40 mb-2 tabular-nums">
                    {step.number}
                  </span>
                  {index < steps.length - 1 && (
                    <div className="flex-1 w-px bg-gradient-to-b from-[rgba(122,196,224,0.15)] to-transparent min-h-[50px]" />
                  )}
                </div>
                
                {/* Right: Content */}
                <div className="pb-8 flex-1">
                  <h3 className="text-[0.9375rem] font-medium text-[#F4F6F9] mb-1.5 tracking-[-0.01em]">
                    {step.title}
                  </h3>
                  <p className="text-[0.8125rem] text-[#999999] leading-[1.7]">
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
