'use client';

import useScrollReveal from '../hooks/useScrollReveal';

export const Philosophy = () => {
  const [sectionRef, isVisible] = useScrollReveal({ threshold: 0.2 });

  return (
    <section
      ref={sectionRef}
      id="philosophy"
      className="section-padding-lg bg-[#08090E] relative"
      data-testid="philosophy-section"
    >
      {/* Top border */}
      <div className="absolute top-0 left-0 right-0">
        <div className="container-main">
          <div className="divider-subtle" />
        </div>
      </div>

      <div className="container-main">
        <div className={`max-w-[680px] mx-auto text-center reveal ${isVisible ? 'revealed' : ''}`}>
          <span 
            className="label-accent text-[#5A7BFA] block mb-8 md:mb-10" 
            data-testid="philosophy-label"
          >
            Filosofía
          </span>

          <h2
            className="text-lg md:text-xl lg:text-2xl xl:text-[1.625rem] font-semibold text-[#F4F6F9] leading-[1.4] tracking-[-0.02em] mb-8 md:mb-10"
            data-testid="philosophy-headline"
          >
            Creemos que la inteligencia debe profundizar la capacidad humana, expandir la claridad institucional y elevar la calidad de la toma de decisiones.
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
