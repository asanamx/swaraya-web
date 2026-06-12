'use client';

import useScrollReveal from '../hooks/useScrollReveal';

const metrics = [
  { value: '85', suffix: '%', label: 'Precisión promedio en predicciones de demanda' },
  { value: '3', suffix: '×', label: 'Aceleración en procesos de análisis de datos' },
  { value: '60', suffix: '%', label: 'Reducción en tareas manuales repetitivas' },
  { value: '24', suffix: '/7', label: 'Operación continua de sistemas autónomos' },
];

export const Outcomes = () => {
  const [headerRef, headerVisible] = useScrollReveal({ threshold: 0.2 });
  const [metricsRef, metricsVisible] = useScrollReveal({ threshold: 0.15 });

  return (
    <section
      className="section-padding-lg bg-[#F5F2EC] relative overflow-hidden"
      data-testid="outcomes-section"
    >
      {/* Subtle architectural grid overlay */}
      <div 
        className="absolute inset-0 pointer-events-none opacity-30"
        style={{
          backgroundImage: `
            linear-gradient(rgba(255,255,255,0.015) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.015) 1px, transparent 1px)
          `,
          backgroundSize: '100px 100px',
        }}
      />

      <div className="container-main relative z-10">
        {/* Header */}
        <div 
          ref={headerRef}
          className={`max-w-xl mb-16 md:mb-20 lg:mb-28 reveal ${headerVisible ? 'revealed' : ''}`}
        >
          <span 
            className="label-accent text-[#2C3E80] block mb-6" 
            data-testid="outcomes-label"
          >
            Resultados
          </span>
          <h2 className="heading-xl" data-testid="outcomes-headline">
            Inteligencia operativa medible
          </h2>
        </div>

        {/* Metrics - Monumental */}
        <div 
          ref={metricsRef}
          className={`grid grid-cols-2 lg:grid-cols-4 gap-x-10 gap-y-16 md:gap-x-14 lg:gap-x-8 reveal-stagger ${metricsVisible ? 'revealed' : ''}`}
        >
          {metrics.map((metric, index) => (
            <div 
              key={index} 
              className="relative group"
              data-testid={`outcome-metric-${index + 1}`}
            >
              {/* Number container */}
              <div className="mb-5 md:mb-6">
                <div className="flex items-baseline">
                  <span 
                    className="text-[3.25rem] md:text-[4rem] lg:text-[5rem] font-semibold tracking-[-0.04em] leading-[0.85] transition-all duration-500"
                    style={{
                      fontFamily: "'Cabinet Grotesk', sans-serif",
                      background: 'linear-gradient(180deg, #0E0F11 0%, #5D6878 100%)',
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                      backgroundClip: 'text',
                    }}
                  >
                    {metric.value}
                  </span>
                  <span className="text-lg md:text-xl lg:text-2xl font-medium text-[#5D6878] ml-0.5">
                    {metric.suffix}
                  </span>
                </div>
              </div>
              
              {/* Accent line with gradient */}
              <div 
                className="w-10 h-px mb-4 transition-all duration-400 group-hover:w-14"
                style={{
                  background: 'linear-gradient(90deg, rgba(44,62,128,0.5) 0%, transparent 100%)'
                }}
              />
              
              {/* Label */}
              <p className="text-[0.8125rem] md:text-sm text-[#5D6878] leading-relaxed max-w-[200px]">
                {metric.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Outcomes;
