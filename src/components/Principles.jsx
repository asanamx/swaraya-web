'use client';

import useScrollReveal from '../hooks/useScrollReveal';
import SectionParticles from './SectionParticles';
import SectionGlow from './SectionGlow';

const principles = [
  'Contexto antes que automatización',
  'Precisión antes que espectáculo',
  'Integración antes que experimentación',
  'Gobernanza antes que despliegue',
  'Amplificación humana antes que reemplazo',
];

export const Principles = () => {
  const [sectionRef, isVisible] = useScrollReveal({ threshold: 0.15 });

  return (
    <section
      ref={sectionRef}
      className="section-padding-lg bg-[#FAF8F2] relative overflow-hidden"
      data-testid="principles-section"
    >
      {/* Glow indigo a la derecha + saturación alta de partículas */}
      <SectionGlow position={{ x: 82, y: 40 }} size={540} intensity="medium" />
      <SectionParticles density="high" opacity={0.72} seed={11} />

      <div className="container-main relative z-10">
        <div className="grid lg:grid-cols-12 gap-8 md:gap-10 lg:gap-16 xl:gap-20 items-start">
          {/* Headline */}
          <div className={`lg:col-span-5 reveal ${isVisible ? 'revealed' : ''}`}>
            <h2 className="heading-xl" data-testid="principles-headline">
              Nuestros sistemas se moldean por{' '}
              <span className="text-[#5D6878]">disciplina antes que escala.</span>
            </h2>
          </div>

          {/* Principles List */}
          <div 
            className={`lg:col-span-7 lg:pt-2 reveal-stagger ${isVisible ? 'revealed' : ''}`}
          >
            <ul className="space-y-5 md:space-y-6 lg:space-y-7">
              {principles.map((principle, index) => (
                <li
                  key={index}
                  className="flex items-start gap-5 group"
                  data-testid={`principle-item-${index + 1}`}
                >
                  <div className="principle-marker transition-all duration-300 group-hover:w-6 group-hover:opacity-100" style={{ opacity: 0.7 }} />
                  <span className="text-[0.9375rem] md:text-base lg:text-lg text-[#5D6878] font-normal leading-snug tracking-[-0.01em] transition-colors duration-300 group-hover:text-[#0E0F11]">
                    {principle}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Principles;
