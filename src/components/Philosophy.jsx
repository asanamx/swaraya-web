'use client';

import useScrollReveal from '../hooks/useScrollReveal';

export const Philosophy = () => {
  const [sectionRef, isVisible] = useScrollReveal({ threshold: 0.2 });

  return (
    <section
      ref={sectionRef}
      id="philosophy"
      className="section-padding-lg relative overflow-hidden"
      style={{ background: 'var(--niebla)' }}
      data-testid="philosophy-section"
    >
      {/* Glow brote suave detrás del manifiesto — único fondo */}
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(50% 45% at 50% 45%, rgba(200, 232, 36,0.08) 0%, transparent 70%)',
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
            className="label-accent block mb-8 md:mb-10"
            data-testid="philosophy-label"
          >
            Filosofía
          </span>

          {/* Pull-quote editorial — Newsreader serif, voz de investigación */}
          <blockquote
            className="editorial mb-8 md:mb-10"
            style={{
              fontSize: 'clamp(1.75rem, 3.2vw, 2.5rem)',
              lineHeight: 1.3,
              letterSpacing: '-0.015em',
            }}
            data-testid="philosophy-quote"
          >
            <span
              aria-hidden="true"
              className="block mx-auto mb-6"
              style={{
                width: 32,
                height: 1,
                background: 'var(--brote)',
              }}
            />
            Creemos que la inteligencia debe profundizar la{' '}
            <em>capacidad humana</em>, expandir la{' '}
            <em>claridad institucional</em> y elevar la calidad de la toma de
            decisiones.
          </blockquote>

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
