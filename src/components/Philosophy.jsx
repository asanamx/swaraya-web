'use client';

import useScrollReveal from '../hooks/useScrollReveal';
import SectionParticles from './SectionParticles';
import SectionGlow from './SectionGlow';
import SectionGrid from './SectionGrid';

export const Philosophy = () => {
  const [sectionRef, isVisible] = useScrollReveal({ threshold: 0.2 });

  return (
    <section
      ref={sectionRef}
      id="philosophy"
      className="section-padding-lg bg-[#FAF8F2] relative overflow-hidden"
      data-testid="philosophy-section"
    >
      {/* Cuadrícula parcial anclada al foco — textura sutil */}
      <SectionGrid focal={{ x: 22, y: 50 }} radius={42} lineAlpha={0.045} />

      {/* Glow indigo a la izquierda + saturación alta de partículas */}
      <SectionGlow position={{ x: 22, y: 50 }} size={500} intensity="medium" />
      <SectionParticles density="high" opacity={0.72} seed={7} />

      {/* Top border */}
      <div className="absolute top-0 left-0 right-0">
        <div className="container-main">
          <div className="divider-subtle" />
        </div>
      </div>

      <div className="container-main">
        <div className={`max-w-[680px] mx-auto text-center reveal ${isVisible ? 'revealed' : ''}`}>
          <span 
            className="label-accent text-[#2C3E80] block mb-8 md:mb-10" 
            data-testid="philosophy-label"
          >
            Filosofía
          </span>

          <h2
            className="mb-8 md:mb-10"
            style={{
              fontFamily: 'var(--font-serif-editorial)',
              fontSize: 'clamp(1.5rem, 2.6vw, 2.125rem)',
              fontWeight: 400,
              lineHeight: 1.28,
              letterSpacing: '-0.012em',
              color: 'var(--text-primary)',
            }}
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
