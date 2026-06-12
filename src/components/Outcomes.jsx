'use client';

import useScrollReveal from '../hooks/useScrollReveal';
import useCountUp from '../hooks/useCountUp';

const metrics = [
  { value: 85, suffix: '%', label: 'Precisión promedio en predicciones de demanda' },
  { value: 3,  suffix: '×', label: 'Aceleración en procesos de análisis de datos' },
  { value: 60, suffix: '%', label: 'Reducción en tareas manuales repetitivas' },
  { value: 24, suffix: '/7', label: 'Operación continua de sistemas autónomos' },
];

const MetricCounter = ({ end, suffix, trigger, delay = 0 }) => {
  const v = useCountUp(end, { duration: 1800 + delay, trigger });
  return (
    <div className="flex items-baseline">
      <span
        className="text-[3.25rem] md:text-[4rem] lg:text-[5.25rem] leading-[0.85] tabular-nums"
        style={{
          fontFamily: "'Cabinet Grotesk', sans-serif",
          fontWeight: 500,
          letterSpacing: '-0.045em',
          background: 'linear-gradient(180deg, #0E0F11 0%, #2C3E80 100%)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          backgroundClip: 'text',
        }}
      >
        {Math.round(v)}
      </span>
      <span
        className="ml-1"
        style={{
          fontFamily: "'Cabinet Grotesk', sans-serif",
          fontWeight: 500,
          fontSize: 'clamp(1.25rem, 1.6vw, 1.75rem)',
          color: '#2C3E80',
          letterSpacing: '-0.02em',
        }}
      >
        {suffix}
      </span>
    </div>
  );
};

export const Outcomes = () => {
  const [headerRef, headerVisible] = useScrollReveal({ threshold: 0.2 });
  const [metricsRef, metricsVisible] = useScrollReveal({ threshold: 0.15 });

  return (
    <section
      className="section-padding-lg bg-[#F5F2EC] relative overflow-hidden"
      data-testid="outcomes-section"
    >
      {/* Architectural grid overlay */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: `
            linear-gradient(rgba(14,15,17,0.025) 1px, transparent 1px),
            linear-gradient(90deg, rgba(14,15,17,0.025) 1px, transparent 1px)
          `,
          backgroundSize: '96px 96px',
          opacity: 0.55,
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

        {/* Metrics - Monumental, count-up animated */}
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
              <div className="mb-5 md:mb-6">
                <MetricCounter
                  end={metric.value}
                  suffix={metric.suffix}
                  trigger={metricsVisible}
                  delay={index * 120}
                />
              </div>

              <div
                className="w-10 h-px mb-4 transition-all duration-400 group-hover:w-16"
                style={{
                  background: 'linear-gradient(90deg, rgba(44,62,128,0.7) 0%, transparent 100%)',
                }}
              />

              <p className="text-[0.8125rem] md:text-sm text-[#5D6878] leading-relaxed max-w-[210px]">
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
