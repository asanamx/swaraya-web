'use client';

import { useEffect, useRef, useState } from 'react';
import useScrollReveal from '../hooks/useScrollReveal';

/**
 * Method — v3.0 · 4 fases con entregables firmados.
 *
 * Timeline horizontal en desktop (línea + puntos + números grandes),
 * timeline vertical en móvil (línea izquierda + números). Cada fase
 * lleva una línea de entregable en cursiva que la distingue del cuerpo.
 */

const steps = [
  {
    number: '01',
    title: 'Levantamiento',
    duration: '2 semanas',
    description:
      'Sesiones grabadas con quien decide hoy y revisión de los casos que ya resolvió. Ahí aparece el criterio real.',
    entregable: 'Mapa de criterio y procesos ordenados por retorno.',
  },
  {
    number: '02',
    title: 'Codificación',
    duration: '3 semanas',
    description:
      'Construimos los tres niveles y conectamos con los sistemas que ya usas. Nada se reemplaza, todo se integra.',
    entregable: 'Documento de reglas en lenguaje de negocio.',
  },
  {
    number: '03',
    title: 'Calibración',
    duration: '2 semanas',
    description:
      'Cien decisiones reales con la respuesta correcta según tu gente. El sistema se ajusta hasta pasar el umbral pactado.',
    entregable: 'Reporte de precisión con aciertos y errores.',
  },
  {
    number: '04',
    title: 'Operación',
    duration: 'permanente',
    description:
      'Cada corrección que hace tu equipo entra al banco de casos. El sistema mejora con el uso en lugar de envejecer.',
    entregable: 'Reporte mensual de desempeño.',
  },
];

const STEP_COUNT = steps.length;

export const Method = () => {
  const [headerRef, headerVisible] = useScrollReveal({ threshold: 0.2 });
  const [timelineRef, timelineVisible] = useScrollReveal({ threshold: 0.1 });

  // ─── Pipeline vivo · progreso normalizado con scroll ─────────
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
      const start = vh * 0.75;
      const end = vh * 0.10;
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

  // Índice del step activo según progreso
  const activeStep = reducedMotion
    ? STEP_COUNT - 1
    : Math.min(STEP_COUNT - 1, Math.floor(progress * STEP_COUNT));

  return (
    <section
      id="metodo"
      className="section-padding bg-[#f4f4f5]"
      data-testid="method-section"
      ref={sectionRef}
    >
      <div className="container-main">
        {/* Header */}
        <div
          ref={headerRef}
          className={`max-w-xl mb-16 md:mb-20 lg:mb-28 reveal ${headerVisible ? 'revealed' : ''}`}
        >
          <span className="label-accent block mb-6" data-testid="method-label">
            Método
          </span>
          <h2 className="heading-xl mb-5" data-testid="method-headline">
            Cuatro fases,{' '}
            <span style={{ color: 'var(--texto-apoyo)' }}>
              cuatro entregables firmados
            </span>
          </h2>
          <p className="body-large" data-testid="method-subtext">
            Cada fase se contrata por separado y termina en un documento que
            puedes leer, aprobar y llevarte. Sin compromiso de continuar a la
            siguiente.
          </p>
        </div>

        {/* Timeline */}
        <div ref={timelineRef} className="relative">
          {/* Desktop: Horizontal pipeline vivo */}
          <div className="hidden lg:block relative">
            {/* SVG pipeline — línea base + progreso brote + token viajero */}
            <svg
              className="absolute left-[10%] right-[10%] pointer-events-none"
              style={{ top: 52, width: '80%', height: 24 }}
              viewBox="0 0 1000 24"
              preserveAspectRatio="none"
              aria-hidden="true"
            >
              <line
                x1="0"
                y1="12"
                x2="1000"
                y2="12"
                stroke="rgba(13, 15, 14,0.14)"
                strokeWidth="1"
              />
              <line
                x1="0"
                y1="12"
                x2={1000 * (reducedMotion ? 1 : progress)}
                y2="12"
                stroke="#c8e824"
                strokeWidth="1.5"
                strokeLinecap="round"
              />
              {!reducedMotion && progress > 0 && progress < 1 && (
                <g style={{ transform: `translateX(${1000 * progress}px)` }}>
                  <circle cx="0" cy="12" r="8" fill="#c8e824" opacity="0.25" />
                  <circle cx="0" cy="12" r="4" fill="#c8e824" />
                </g>
              )}
            </svg>

            <div className="grid grid-cols-4 gap-0 relative">
              {steps.map((step, index) => {
                const isActive = index <= activeStep;
                return (
                  <div
                    key={step.number}
                    className={`relative text-center timeline-reveal group ${
                      timelineVisible ? 'revealed' : ''
                    }`}
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
                          color: isActive
                            ? 'rgba(13, 15, 14,0.85)'
                            : 'rgba(13, 15, 14,0.20)',
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
                        width: 10,
                        height: 10,
                        background: isActive ? 'var(--brote)' : 'var(--niebla)',
                        border: isActive ? 'none' : '1px solid var(--borde-alfa)',
                      }}
                    />

                    {/* Content */}
                    <div className="pt-12 px-4">
                      <div className="flex items-baseline justify-center gap-2 mb-2.5">
                        <h3
                          className="text-[0.9375rem] font-medium tracking-[-0.01em]"
                          style={{ color: 'var(--texto)' }}
                        >
                          {step.title}
                        </h3>
                        <span
                          className="text-[0.6875rem] tabular-nums"
                          style={{
                            fontFamily: "'Inter', sans-serif",
                            color: 'var(--texto-terciario)',
                            letterSpacing: '0.02em',
                          }}
                        >
                          · {step.duration}
                        </span>
                      </div>
                      <p
                        className="text-[0.8125rem] leading-[1.65] max-w-[210px] mx-auto"
                        style={{ color: 'var(--texto-apoyo)' }}
                      >
                        {step.description}
                      </p>
                      <p
                        className="mt-4 text-[0.75rem] leading-[1.55] max-w-[210px] mx-auto italic"
                        style={{
                          fontFamily: "'Cabinet Grotesk', sans-serif",
                          color: 'var(--texto)',
                          fontWeight: 500,
                        }}
                      >
                        Entregable: {step.entregable}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Mobile/Tablet: Vertical layout con línea a la izquierda */}
          <div className="lg:hidden space-y-0 relative">
            {steps.map((step, index) => (
              <div
                key={step.number}
                className={`relative flex gap-5 md:gap-6 timeline-reveal ${
                  timelineVisible ? 'revealed' : ''
                }`}
                style={{ transitionDelay: `${index * 80 + 150}ms` }}
                data-testid={`method-step-${step.number}-mobile`}
              >
                {/* Left: número + línea vertical + nodo */}
                <div className="flex flex-col items-center w-12 flex-shrink-0">
                  <div className="relative flex items-center justify-center">
                    <span
                      className="text-[1.75rem] mb-2 tabular-nums"
                      style={{
                        fontFamily: "'Cabinet Grotesk', sans-serif",
                        fontWeight: 500,
                        letterSpacing: '-0.04em',
                        color: 'rgba(13, 15, 14,0.55)',
                      }}
                    >
                      {step.number}
                    </span>
                  </div>
                  {/* Punto brote centrado bajo el número */}
                  <div
                    className="rounded-full mb-2"
                    style={{
                      width: 8,
                      height: 8,
                      background: 'var(--brote)',
                    }}
                  />
                  {index < steps.length - 1 && (
                    <div className="flex-1 w-px bg-gradient-to-b from-[rgba(13, 15, 14,0.25)] to-transparent min-h-[70px]" />
                  )}
                </div>

                {/* Right: contenido */}
                <div className="pb-9 flex-1 min-w-0">
                  <div className="flex items-baseline gap-2 mb-1.5 flex-wrap">
                    <h3
                      className="text-[0.9375rem] font-medium tracking-[-0.01em]"
                      style={{ color: 'var(--texto)' }}
                    >
                      {step.title}
                    </h3>
                    <span
                      className="text-[0.6875rem]"
                      style={{
                        fontFamily: "'Inter', sans-serif",
                        color: 'var(--texto-terciario)',
                        letterSpacing: '0.02em',
                      }}
                    >
                      · {step.duration}
                    </span>
                  </div>
                  <p
                    className="text-[0.8125rem] leading-[1.7]"
                    style={{ color: 'var(--texto-apoyo)' }}
                  >
                    {step.description}
                  </p>
                  <p
                    className="mt-3 text-[0.75rem] leading-[1.55] italic"
                    style={{
                      fontFamily: "'Cabinet Grotesk', sans-serif",
                      color: 'var(--texto)',
                      fontWeight: 500,
                    }}
                  >
                    Entregable: {step.entregable}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Cierre — frase suelta centrada */}
        <p
          className="mt-16 md:mt-20 lg:mt-24 max-w-[54ch] mx-auto text-center"
          style={{
            fontFamily: "'Cabinet Grotesk', sans-serif",
            fontSize: 'clamp(1.125rem, 1.6vw, 1.375rem)',
            lineHeight: 1.35,
            letterSpacing: '-0.015em',
            fontWeight: 500,
            color: 'var(--texto)',
          }}
          data-testid="method-closing"
        >
          Implementamos un proceso a la vez. Es la razón por la que terminamos
          lo que empezamos.
        </p>
      </div>
    </section>
  );
};

export default Method;
