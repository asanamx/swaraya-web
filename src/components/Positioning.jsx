'use client';

import useScrollReveal from '../hooks/useScrollReveal';

export const Positioning = () => {
  const [sectionRef, isVisible] = useScrollReveal({ threshold: 0.15 });

  return (
    <section
      ref={sectionRef}
      className="section-padding bg-[#ffffff]"
      data-testid="positioning-section"
    >
      <div className="container-main">
        <div className="grid lg:grid-cols-12 gap-8 md:gap-10 lg:gap-16 xl:gap-20 items-start">
          {/* Left Column */}
          <div className={`lg:col-span-6 reveal ${isVisible ? 'revealed' : ''}`}>
            <span 
              className="label-accent text-[#1233cc] block mb-6 md:mb-8" 
              data-testid="positioning-label"
            >
              Posicionamiento
            </span>
            <h2
              className="heading-xl"
              data-testid="positioning-headline"
            >
              La inteligencia artificial ya no es una capa de interfaz.{' '}
              <span className="text-[#52565e]">
                Se está convirtiendo en la lógica operativa de las instituciones modernas.
              </span>
            </h2>
          </div>

          {/* Right Column */}
          <div 
            className={`lg:col-span-6 lg:pt-12 xl:pt-16 reveal ${isVisible ? 'revealed' : ''}`}
            style={{ transitionDelay: '120ms' }}
          >
            <p className="body-large" data-testid="positioning-body">
              Las organizaciones más avanzadas no adoptan IA como una herramienta aislada. La incorporan como una nueva capa de razonamiento, coordinación y decisión. swaraya diseña esa transición con rigor técnico, criterio estratégico y sensibilidad institucional.
            </p>
          </div>
        </div>

        {/* Divider */}
        <div className="mt-20 md:mt-28 lg:mt-36">
          <div className="divider-subtle" />
        </div>
      </div>
    </section>
  );
};

export default Positioning;
