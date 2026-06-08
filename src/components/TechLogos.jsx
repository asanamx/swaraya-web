'use client';

import useScrollReveal from '../hooks/useScrollReveal';

export const TechLogos = () => {
  const [sectionRef, isVisible] = useScrollReveal({ threshold: 0.3 });

  const technologies = [
    {
      name: 'Claude',
      logo: (
        <div className="flex items-center gap-2">
          <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
            <path d="M17.304 3.541h-3.672l6.696 16.918h3.672l-6.696-16.918zm-10.608 0L0 20.459h3.744l1.32-3.456h6.36l1.344 3.456h3.744L9.816 3.541H6.696zm-.096 10.63l2.16-5.639 2.16 5.639H6.6z"/>
          </svg>
          <span className="text-base font-medium tracking-tight">Claude</span>
        </div>
      )
    },
    {
      name: 'OpenAI',
      logo: (
        <svg viewBox="0 0 24 24" fill="currentColor" className="w-24 h-8">
          <path d="M22.282 9.821a5.985 5.985 0 0 0-.516-4.91 6.046 6.046 0 0 0-6.51-2.9A6.065 6.065 0 0 0 4.981 4.18a5.985 5.985 0 0 0-3.998 2.9 6.046 6.046 0 0 0 .743 7.097 5.98 5.98 0 0 0 .51 4.911 6.051 6.051 0 0 0 6.515 2.9A5.985 5.985 0 0 0 13.26 24a6.056 6.056 0 0 0 5.772-4.206 5.99 5.99 0 0 0 3.997-2.9 6.056 6.056 0 0 0-.747-7.073zM13.26 22.43a4.476 4.476 0 0 1-2.876-1.04l.141-.081 4.779-2.758a.795.795 0 0 0 .392-.681v-6.737l2.02 1.168a.071.071 0 0 1 .038.052v5.583a4.504 4.504 0 0 1-4.494 4.494zM3.6 18.304a4.47 4.47 0 0 1-.535-3.014l.142.085 4.783 2.759a.771.771 0 0 0 .78 0l5.843-3.369v2.332a.08.08 0 0 1-.033.062L9.74 19.95a4.5 4.5 0 0 1-6.14-1.646zM2.34 7.896a4.485 4.485 0 0 1 2.366-1.973V11.6a.766.766 0 0 0 .388.676l5.815 3.355-2.02 1.168a.076.076 0 0 1-.071 0l-4.83-2.786A4.504 4.504 0 0 1 2.34 7.872zm16.597 3.855l-5.833-3.387L15.119 7.2a.076.076 0 0 1 .071 0l4.83 2.791a4.494 4.494 0 0 1-.676 8.105v-5.678a.79.79 0 0 0-.407-.667zm2.01-3.023l-.141-.085-4.774-2.782a.776.776 0 0 0-.785 0L9.409 9.23V6.897a.066.066 0 0 1 .028-.061l4.83-2.787a4.5 4.5 0 0 1 6.68 4.66zm-12.64 4.135l-2.02-1.164a.08.08 0 0 1-.038-.057V6.075a4.5 4.5 0 0 1 7.375-3.453l-.142.08L8.704 5.46a.795.795 0 0 0-.393.681zm1.097-2.365l2.602-1.5 2.607 1.5v2.999l-2.597 1.5-2.607-1.5z"/>
        </svg>
      )
    },
    {
      name: 'Vercel',
      logo: (
        <svg viewBox="0 0 76 24" fill="currentColor" className="w-24 h-7">
          <path d="M12 1L24 22H0L12 1Z" />
          <text x="28" y="18" fontFamily="system-ui, -apple-system, sans-serif" fontSize="15" fontWeight="600" letterSpacing="-0.3">Vercel</text>
        </svg>
      )
    },
    {
      name: 'OpenClaw',
      logo: (
        <svg viewBox="0 0 120 24" fill="currentColor" className="w-28 h-7">
          <text x="0" y="18" fontFamily="system-ui, -apple-system, sans-serif" fontSize="17" fontWeight="500" letterSpacing="-0.3">OpenClaw</text>
        </svg>
      )
    },
  ];

  return (
    <section 
      className="py-12 md:py-16 bg-[#05060A] border-y border-[rgba(255,255,255,0.03)]"
      data-testid="tech-logos-section"
    >
      <div className="container-main">
        <div 
          ref={sectionRef}
          className={`flex flex-col items-center reveal ${isVisible ? 'revealed' : ''}`}
        >
          {/* Label */}
          <p className="text-[0.6875rem] text-[#4B5563] tracking-widest uppercase mb-8 md:mb-10">
            Tecnologías que impulsan nuestras soluciones
          </p>
          
          {/* Logos Grid */}
          <div className="flex flex-wrap items-center justify-center gap-8 md:gap-12 lg:gap-16">
            {technologies.map((tech, index) => (
              <div
                key={tech.name}
                className="text-[#4B5563] hover:text-[#6B7280] transition-colors duration-300 opacity-60 hover:opacity-80"
                style={{ transitionDelay: `${index * 50}ms` }}
                title={tech.name}
              >
                {tech.logo}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default TechLogos;
