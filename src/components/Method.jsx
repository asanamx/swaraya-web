'use client';

import { useEffect, useRef, useState } from 'react';
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

  // ─── Pipeline vivo · Prompt G ───────────────────────────────
  // Progreso del scroll normalizado 0→1 mientras la sección atraviesa
  // el viewport. Alimenta el `stroke-dashoffset` y la posición del token.
  const sectionRef = useRef(null);
  const [progress, setProgress] = useState(0);
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReducedMotion(mq.matches);
    const onMq = () => setReducedMotion(mq.matches);
    mq.addEventListener?.('change', onMq);

    let raf = null;
    const compute = () => {
      const el = sectionRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const vh = window.innerHeight;
      // Empieza cuando la sección entra 20% del viewport,
      // termina cuando su parte inferior alcanza 30% del viewport.
      const start = vh * 0.8;
      const end = -rect.height + vh * 0.3;
      const raw = (start - rect.top) / (start - end);
      const p = Math.min(1, Math.max(0, raw));
      setProgress(p);
    };
    const onScroll = () => {
      if (raf) return;
      raf = requestAnimationFrame(() => {
        compute();
        raf = null;
      });
    };
    compute();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', compute);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', compute);
      mq.removeEventListener?.('change', onMq);
    };
  }, []);

  // Índice del step "activo" según el progreso
  const activeStep = reducedMotion ? 4 : Math.min(4, Math.floor(progress * 5));

  return (
    <section
      id="method"
      className="section-padding bg-[#F5F2EB]"
      data-testid="method-section"
      ref={sectionRef}
    >
      <div className="container-main">
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
          {/* Desktop: Horizontal pipeline vivo (Prompt G) */}
          <div className="hidden lg:block relative">
            {/* SVG pipeline — línea base + progreso índigo + token viajero */}
            <svg
              className="absolute left-[10%] right-[10%] pointer-events-none"
              style={{ top: 52, width: '80%', height: 24 }}
              viewBox="0 0 1000 24"
              preserveAspectRatio="none"
              aria-hidden="true"
            >
              {/* Línea base — hairline visible sobre cream */}
              <line x1="0" y1="12" x2="1000" y2="12"
                stroke="rgba(14,15,17,0.14)" strokeWidth="1" />
              {/* Progreso índigo (Prompt G) */}
              <line x1="0" y1="12" x2={1000 * (reducedMotion ? 1 : progress)} y2="12"
                stroke="#5468D6" strokeWidth="1.5" strokeLinecap="round" />
              {/* Token viajero con glow */}
              {!reducedMotion && progress > 0 && progress < 1 && (
                <g style={{ transform: `translateX(${1000 * progress}px)` }}>
                  <circle cx="0" cy="12" r="8" fill="#5468D6" opacity="0.25" />
                  <circle cx="0" cy="12" r="4" fill="#5468D6" />
                </g>
              )}
            </svg>

            <div className="grid grid-cols-5 gap-0 relative">
              {steps.map((step, index) => {
                const isActive = index <= activeStep;
                return (
                <div
                  key={step.number}
                  className={`relative text-center timeline-reveal group ${timelineVisible ? 'revealed' : ''}`}
                  style={{ transitionDelay: `${index * 100 + 300}ms` }}
                  data-testid={`method-step-${step.number}`}
                >
                  {/* Large number */}
                  <div className="mb-6">
                    <span
                      className="text-[3.5rem] md:text-[4.25rem] leading-none transition-colors duration-500"
                      style={{
                        fontFamily: "'Cabinet Grotesk', sans-serif",
                        fontWeight: 500,
                        letterSpacing: '-0.045em',
                        color: isActive ? 'rgba(44,62,128,0.85)' : 'rgba(44,62,128,0.20)',
                      }}
                    >
                      {step.number}
                    </span>
                  </div>

                  {/* Nodo alineado con la línea horizontal */}
                  <div
                    className="absolute left-1/2 -translate-x-1/2 rounded-full transition-all duration-500"
                    style={{
                      top: 58,
                      width: 10, height: 10,
                      background: isActive ? '#5468D6' : '#F5F2EB',
                      border: isActive ? 'none' : '1px solid rgba(14,15,17,0.20)',
                      boxShadow: isActive ? '0 0 0 6px rgba(84,104,214,0.12)' : 'none',
                    }}
                  />

                  {/* Content */}
                  <div className="pt-12">
                    <h3 className="text-[0.9375rem] font-medium text-[#0E0F11] mb-2.5 tracking-[-0.01em]">
                      {step.title}
                    </h3>
                    <p className="text-[0.8125rem] text-[#5D6878] leading-[1.7] max-w-[170px] mx-auto">
                      {step.description}
                    </p>
                  </div>
                </div>
              );})}
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
