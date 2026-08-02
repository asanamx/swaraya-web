'use client';

import useScrollReveal from '../hooks/useScrollReveal';

export const Philosophy = () => {
  const [sectionRef, isVisible] = useScrollReveal({ threshold: 0.2 });

  return (
    <section
      ref={sectionRef}
      id="philosophy"
      className="section-padding-lg relative overflow-hidden"
      style={{ background: '#f4f4f5' }}
      data-testid="philosophy-section"
    >
      {/* Glow indigo suave detrás del manifiesto — único fondo */}
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(50% 45% at 50% 45%, rgba(58, 91, 255,0.08) 0%, transparent 70%)',
        }}
      />

      {/* Top border */}
      <div className="absolute top-0 left-0 right-0">
        <div className="container-main">
          <div className="divider-subtle" />
        </div>
      </div>

      <div className="container-main">
        <div className={`max-w-[680px] mx-auto text-center reveal ${isVisible ? 'revealed' : ''}`}>
          <span 
            className="label-accent text-[#1233cc] block mb-8 md:mb-10" 
            data-testid="philosophy-label"
          >
            Filosofía
          </span>

          <h2
            className="editorial mb-8 md:mb-10"
            style={{
              fontSize: 'clamp(2.25rem, 3.4vw, 2.75rem)',
              lineHeight: 1.25,
              letterSpacing: '-0.01em',
            }}
            data-testid="philosophy-headline"
          >
            Creemos que la inteligencia debe profundizar la <em>capacidad humana</em>, expandir la <em>claridad institucional</em> y elevar la calidad de la toma de decisiones.
          </h2>

          <p className="body-large mx-auto" data-testid="philosophy-body">
            swaraya concibe la inteligencia artificial como una disciplina de diseño, no sólo de ejecución. Por eso construimos sistemas con responsabilidad, estructura y visión de largo plazo.
          </p>
        </div>
      </div>

      {/* Bottom border */}
      <div className="absolute bottom-0 left-0 right-0">
        <div className="container-main">
          <div className="divider-subtle" />
        </div>
      </div>
    </section>
  );
};

export default Philosophy;
