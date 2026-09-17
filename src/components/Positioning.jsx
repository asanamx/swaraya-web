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
              className="label-accent block mb-6 md:mb-8" 
              data-testid="positioning-label"
            >
              El problema
            </span>
            <h2
              className="heading-xl"
              data-testid="positioning-headline"
            >
              El modelo sabe razonar.{' '}
              <span style={{ color: 'var(--texto-apoyo)' }}>
                Lo que no sabe es cómo decide tu negocio, y eso no lo va a aprender solo.
              </span>
            </h2>
          </div>

          {/* Right Column */}
          <div 
            className={`lg:col-span-6 lg:pt-12 xl:pt-16 reveal ${isVisible ? 'revealed' : ''}`}
            style={{ transitionDelay: '120ms' }}
          >
            <p className="body-large" data-testid="positioning-body">
              Qué descuento se autoriza y cuál se escala. Qué prospecto merece una llamada hoy. Qué desviación de obra es tolerable y cuál enciende alarmas. Ese juicio está probado por años de operación, casi nunca está escrito, y se va de la empresa el día que se va la persona que lo tiene.
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
