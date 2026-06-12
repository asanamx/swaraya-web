'use client';

import { useEffect, useState } from 'react';
import { ArrowRight } from 'lucide-react';

export const Hero = () => {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoaded(true), 100);
    return () => clearTimeout(timer);
  }, []);

  const scrollToSection = (href) => {
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section
      className="relative min-h-screen overflow-hidden dark-mode"
      style={{ background: '#0E0F11', color: '#F5F2EC' }}
      data-testid="hero-section"
    >
      {/* Indigo electric glow — sutil, no genérico AI */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 80% 60% at 75% 35%, rgba(84,104,214,0.18) 0%, transparent 60%), radial-gradient(ellipse 70% 50% at 15% 80%, rgba(44,62,128,0.12) 0%, transparent 60%)',
          filter: 'blur(20px)',
        }}
      />

      {/* Grid pattern muy sutil */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          opacity: 0.05,
          backgroundImage:
            'linear-gradient(rgba(84,104,214,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(84,104,214,0.5) 1px, transparent 1px)',
          backgroundSize: '64px 64px',
        }}
      />

      {/* Top accent line */}
      <div
        className="absolute top-0 left-0 right-0 h-px"
        style={{
          background:
            'linear-gradient(90deg, transparent 0%, rgba(84,104,214,0.3) 50%, transparent 100%)',
        }}
      />

      {/* Content */}
      <div className="container-main relative z-10">
        <div
          className="flex flex-col justify-center min-h-screen pt-24 md:pt-32 pb-24 md:pb-32 max-w-[1100px]"
          style={{
            opacity: isLoaded ? 1 : 0,
            transform: isLoaded ? 'translateY(0)' : 'translateY(20px)',
            transition: 'opacity 0.8s ease, transform 0.8s ease',
          }}
        >
          {/* Eyebrow */}
          <div
            className="flex items-center gap-3 mb-8 md:mb-12"
            style={{
              fontSize: '0.75rem',
              letterSpacing: '0.32em',
              textTransform: 'uppercase',
              color: '#5468D6',
              fontWeight: 500,
            }}
            data-testid="hero-eyebrow"
          >
            <span style={{ width: 28, height: 1, background: '#5468D6', opacity: 0.6 }} />
            Agencia de Inteligencia Artificial Aplicada
          </div>

          {/* Headline editorial */}
          <h1
            className="m-0 max-w-[14ch]"
            style={{
              fontFamily: "'Cabinet Grotesk', sans-serif",
              fontSize: 'clamp(2.75rem, 7.2vw, 6.5rem)',
              lineHeight: 0.98,
              letterSpacing: '-0.035em',
              fontWeight: 500,
              color: '#F5F2EC',
            }}
            data-testid="hero-headline"
          >
            Investigación profunda.
            <br />
            <span style={{ color: '#C8CCDC', fontWeight: 400 }}>
              Ingeniería precisa.
            </span>
            <br />
            <span style={{ color: '#5468D6' }}>Inteligencia real.</span>
          </h1>

          {/* Subhead */}
          <p
            className="mt-10 md:mt-14 max-w-[52ch]"
            style={{
              fontSize: 'clamp(1rem, 1.3vw, 1.2rem)',
              lineHeight: 1.55,
              color: '#9BA5B7',
              fontFamily: "'Inter', sans-serif",
            }}
            data-testid="hero-subhead"
          >
            Diseñamos sistemas de inteligencia artificial para organizaciones
            que requieren ventaja estructural, no novedad. Cada solución es una
            arquitectura precisa: investigada y diseñada.
          </p>

          {/* CTAs */}
          <div className="mt-12 md:mt-14 flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
            <button
              onClick={() => scrollToSection('#contact')}
              className="inline-flex items-center justify-center gap-3 rounded-full transition-all duration-300"
              style={{
                padding: '17px 30px',
                background: '#F5F2EC',
                color: '#0E0F11',
                fontFamily: "'Inter', sans-serif",
                fontWeight: 500,
                fontSize: '0.9375rem',
                letterSpacing: '0.005em',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = '#FFFFFF';
                e.currentTarget.style.transform = 'translateY(-2px)';
                e.currentTarget.style.boxShadow = '0 16px 32px -8px rgba(245,242,236,0.18)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = '#F5F2EC';
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = 'none';
              }}
              data-testid="hero-cta-primary"
            >
              Inicia una Conversación Estratégica
              <ArrowRight size={16} />
            </button>
            <button
              onClick={() => scrollToSection('#research')}
              className="inline-flex items-center justify-center rounded-full transition-all duration-300"
              style={{
                padding: '17px 30px',
                background: 'transparent',
                color: '#F5F2EC',
                fontFamily: "'Inter', sans-serif",
                fontWeight: 500,
                fontSize: '0.9375rem',
                letterSpacing: '0.005em',
                border: '1px solid rgba(245,242,236,0.2)',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = '#5468D6';
                e.currentTarget.style.color = '#5468D6';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = 'rgba(245,242,236,0.2)';
                e.currentTarget.style.color = '#F5F2EC';
              }}
              data-testid="hero-cta-secondary"
            >
              Ver nuestros Dominios
            </button>
          </div>

          {/* Tech stack discreto */}
          <div
            className="mt-20 md:mt-32 pt-8 md:pt-12 border-t flex flex-wrap items-center gap-x-8 gap-y-4"
            style={{ borderColor: 'rgba(245,242,236,0.08)' }}
          >
            <div
              style={{
                fontSize: '0.6875rem',
                letterSpacing: '0.24em',
                textTransform: 'uppercase',
                color: '#5D6878',
                fontWeight: 500,
              }}
            >
              Stack
            </div>
            <div
              className="flex flex-wrap items-center gap-x-8 md:gap-x-10 gap-y-3"
              style={{
                fontSize: '0.8125rem',
                color: '#9BA5B7',
                fontFamily: "'Inter', sans-serif",
                fontWeight: 500,
              }}
            >
              <span>Claude</span>
              <span>OpenAI</span>
              <span>Vercel</span>
              <span>OpenClaw</span>
              <span>Resend</span>
              <span>Sanity</span>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 hidden md:block"
        style={{
          opacity: isLoaded ? 0.5 : 0,
          transition: 'opacity 1.2s ease 0.6s',
          fontSize: '0.6875rem',
          letterSpacing: '0.24em',
          textTransform: 'uppercase',
          color: '#9BA5B7',
        }}
      >
        ↓  Continúa
      </div>
    </section>
  );
};

export default Hero;
