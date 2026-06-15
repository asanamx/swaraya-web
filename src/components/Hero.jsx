'use client';

import { useEffect, useState } from 'react';
import { ArrowRight } from 'lucide-react';
import NeuralField from './NeuralField';

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
      className="relative min-h-screen overflow-hidden"
      style={{ background: '#F5F2EC', color: '#0E0F11' }}
      data-testid="hero-section"
    >
      {/* Indigo electric glow — sutil sobre cream */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 80% 60% at 75% 35%, rgba(44,62,128,0.10) 0%, transparent 60%), radial-gradient(ellipse 70% 50% at 15% 80%, rgba(44,62,128,0.06) 0%, transparent 60%)',
          filter: 'blur(20px)',
        }}
      />

      {/* Grid pattern muy sutil */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          opacity: 0.5,
          backgroundImage:
            'linear-gradient(rgba(14,15,17,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(14,15,17,0.04) 1px, transparent 1px)',
          backgroundSize: '64px 64px',
        }}
      />

      {/* NEURAL FIELD — el glifo Cardinal actúa como fuente luminosa de
          partículas que se conectan entre sí formando una red neuronal */}
      <NeuralField
        glyphSizeRatio={0.30}
        glyphCenter={{ x: 0.76, y: 0.44 }}
        maxParticles={110}
        connectDistance={120}
      />

      {/* Top accent line */}
      <div
        className="absolute top-0 left-0 right-0 h-px"
        style={{
          background:
            'linear-gradient(90deg, transparent 0%, rgba(44,62,128,0.28) 50%, transparent 100%)',
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
              color: '#2C3E80',
              fontWeight: 500,
            }}
            data-testid="hero-eyebrow"
          >
            <span style={{ width: 28, height: 1, background: '#2C3E80', opacity: 0.6 }} />
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
              color: '#0E0F11',
            }}
            data-testid="hero-headline"
          >
            Investigación profunda.
            <br />
            <span style={{ color: '#3C4654', fontWeight: 400 }}>
              Ingeniería precisa.
            </span>
            <br />
            <span style={{ color: '#2C3E80' }}>Inteligencia real.</span>
          </h1>

          {/* Subhead */}
          <p
            className="mt-10 md:mt-12 max-w-[52ch]"
            style={{
              fontSize: 'clamp(1rem, 1.25vw, 1.15rem)',
              lineHeight: 1.55,
              color: '#3C4654',
              fontFamily: "'Inter', sans-serif",
              fontWeight: 400,
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
                background: '#2C3E80',
                color: '#F5F2EC',
                fontFamily: "'Inter', sans-serif",
                fontWeight: 500,
                fontSize: '0.9375rem',
                letterSpacing: '0.005em',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = '#1F2D5C';
                e.currentTarget.style.transform = 'translateY(-2px)';
                e.currentTarget.style.boxShadow = '0 16px 32px -8px rgba(44,62,128,0.30)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = '#2C3E80';
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
                color: '#0E0F11',
                fontFamily: "'Inter', sans-serif",
                fontWeight: 500,
                fontSize: '0.9375rem',
                letterSpacing: '0.005em',
                border: '1px solid rgba(14,15,17,0.20)',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = '#2C3E80';
                e.currentTarget.style.color = '#2C3E80';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = 'rgba(14,15,17,0.20)';
                e.currentTarget.style.color = '#0E0F11';
              }}
              data-testid="hero-cta-secondary"
            >
              Ver nuestros Dominios
            </button>
          </div>

          {/* Tech stack — logos oficiales monocromos */}
          <div
            className="mt-20 md:mt-28 pt-8 md:pt-10 border-t"
            style={{ borderColor: 'rgba(14,15,17,0.08)' }}
          >
            <div className="flex flex-wrap items-center gap-x-10 gap-y-6 md:gap-x-14">
              <span
                style={{
                  fontSize: '0.6875rem',
                  letterSpacing: '0.28em',
                  textTransform: 'uppercase',
                  color: '#5D6878',
                  fontWeight: 500,
                }}
              >
                Stack
              </span>

              {/* Claude */}
              <div className="flex items-center gap-2 transition-all duration-300 hover:opacity-100" style={{ opacity: 0.55, color: '#5D6878' }}
                onMouseEnter={(e) => { e.currentTarget.style.opacity = '1'; e.currentTarget.style.color = '#2C3E80'; }}
                onMouseLeave={(e) => { e.currentTarget.style.opacity = '0.55'; e.currentTarget.style.color = '#5D6878'; }}
                title="Claude"
              >
                <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor"><path d="M4.709 15.955l4.72-2.647.079-.23-.079-.128h-.23l-.785-.048-2.687-.073-2.332-.097-2.262-.122-.57-.121L0 11.784l.054-.352.483-.323.69.06 1.524.105 2.288.158 1.658.097 2.456.255h.39l.054-.158-.13-.097-.067-.108-.49-.55-1.025-1.039-.1-.115-1.092-1.184-.61-.74-.582-.96-.115-.16-.115-.382L4.97 4.84l.54-1.282.272-.346.62-.227.32-.022.255-.04.34-.057.114-.04.115-.05.114-.05.146-.114.05-.057.046-.04.146-.04.16-.022.297.04.456.066.245.057.255.04.227.057.34.052.115.04.114.04.114.04.057.039.058.04.115.067.114.057.114.115.114.115.114.067.057.057.115.115.146.108.057.04.057.097.146.16.108.184.057.184.057.184.057.184.057.184-.04.184-.115.184-.084.4-.198 1.252-.108.685-.066.295-.057.295-.115.396-.115.473-.057.198-.115.4-.058.198-.057.198-.058.198-.057.473-.04.227-.04.16-.04.16-.04.16-.04.16-.04.16-.04.16-.04.16-.04.16-.04.16-.04.16-.04.198-.04.198-.04.198-.04.198-.04.198-.04.198-.04.198-.04.198-.04.198-.04.198-.04.198-.04.198-.04.198-.04.198-.04.198-.04.198-.04.198-.04.198-.04.198-.04.198 0 .198"/></svg>
                <span style={{ fontSize: '0.8125rem', fontWeight: 500, letterSpacing: '-0.01em' }}>Claude</span>
              </div>

              {/* OpenAI */}
              <div className="flex items-center gap-2 transition-all duration-300" style={{ opacity: 0.55, color: '#5D6878' }}
                onMouseEnter={(e) => { e.currentTarget.style.opacity = '1'; e.currentTarget.style.color = '#2C3E80'; }}
                onMouseLeave={(e) => { e.currentTarget.style.opacity = '0.55'; e.currentTarget.style.color = '#5D6878'; }}
                title="OpenAI"
              >
                <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor"><path d="M22.2819 9.8211a5.9847 5.9847 0 0 0-.5157-4.9108 6.0462 6.0462 0 0 0-6.5098-2.9A6.0651 6.0651 0 0 0 4.9807 4.1818a5.9847 5.9847 0 0 0-3.9977 2.9 6.0462 6.0462 0 0 0 .7427 7.0966 5.98 5.98 0 0 0 .511 4.9107 6.051 6.051 0 0 0 6.5146 2.9001A5.9847 5.9847 0 0 0 13.2599 24a6.0557 6.0557 0 0 0 5.7718-4.2058 5.9894 5.9894 0 0 0 3.9977-2.9001 6.0557 6.0557 0 0 0-.7475-7.0729zm-9.022 12.6081a4.4755 4.4755 0 0 1-2.8764-1.0408l.1419-.0804 4.7783-2.7582a.7948.7948 0 0 0 .3927-.6813v-6.7369l2.02 1.1686a.071.071 0 0 1 .038.052v5.5826a4.504 4.504 0 0 1-4.4945 4.4944zm-9.6607-4.1254a4.4708 4.4708 0 0 1-.5346-3.0137l.142.0852 4.783 2.7582a.7712.7712 0 0 0 .7806 0l5.8428-3.3685v2.3324a.0804.0804 0 0 1-.0332.0615L9.74 19.9502a4.4992 4.4992 0 0 1-6.1408-1.6464zM2.3408 7.8956a4.485 4.485 0 0 1 2.3655-1.9728V11.6a.7664.7664 0 0 0 .3879.6765l5.8144 3.3543-2.0201 1.1685a.0757.0757 0 0 1-.071 0l-4.8303-2.7865A4.504 4.504 0 0 1 2.3408 7.872zm16.5963 3.8558L13.1038 8.364 15.1192 7.2a.0757.0757 0 0 1 .071 0l4.8303 2.7913a4.4944 4.4944 0 0 1-.6765 8.1042v-5.6772a.79.79 0 0 0-.407-.667zm2.0107-3.0231l-.142-.0852-4.7735-2.7818a.7759.7759 0 0 0-.7854 0L9.409 9.2297V6.8974a.0662.0662 0 0 1 .0284-.0615l4.8303-2.7866a4.4992 4.4992 0 0 1 6.6802 4.66zM8.3065 12.863l-2.02-1.1638a.0804.0804 0 0 1-.038-.0567V6.0742a4.4992 4.4992 0 0 1 7.3757-3.4537l-.142.0805L8.704 5.459a.7948.7948 0 0 0-.3927.6813zm1.0976-2.3654l2.602-1.4998 2.6069 1.4998v2.9994l-2.5974 1.4997-2.6067-1.4997Z"/></svg>
                <span style={{ fontSize: '0.8125rem', fontWeight: 500, letterSpacing: '-0.01em' }}>OpenAI</span>
              </div>

              {/* Vercel */}
              <div className="flex items-center gap-2 transition-all duration-300" style={{ opacity: 0.55, color: '#5D6878' }}
                onMouseEnter={(e) => { e.currentTarget.style.opacity = '1'; e.currentTarget.style.color = '#2C3E80'; }}
                onMouseLeave={(e) => { e.currentTarget.style.opacity = '0.55'; e.currentTarget.style.color = '#5D6878'; }}
                title="Vercel"
              >
                <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor"><path d="m12 1.608 12 20.784H0Z"/></svg>
                <span style={{ fontSize: '0.8125rem', fontWeight: 500, letterSpacing: '-0.01em' }}>Vercel</span>
              </div>

              {/* OpenClaw */}
              <div className="transition-all duration-300" style={{ opacity: 0.55, color: '#5D6878' }}
                onMouseEnter={(e) => { e.currentTarget.style.opacity = '1'; e.currentTarget.style.color = '#2C3E80'; }}
                onMouseLeave={(e) => { e.currentTarget.style.opacity = '0.55'; e.currentTarget.style.color = '#5D6878'; }}
                title="OpenClaw"
              >
                <span style={{ fontSize: '0.8125rem', fontWeight: 500, letterSpacing: '-0.01em' }}>OpenClaw</span>
              </div>

              {/* Resend */}
              <div className="flex items-center gap-2 transition-all duration-300" style={{ opacity: 0.55, color: '#5D6878' }}
                onMouseEnter={(e) => { e.currentTarget.style.opacity = '1'; e.currentTarget.style.color = '#2C3E80'; }}
                onMouseLeave={(e) => { e.currentTarget.style.opacity = '0.55'; e.currentTarget.style.color = '#5D6878'; }}
                title="Resend"
              >
                <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor"><path d="M14.679 0c4.648 0 7.413 2.765 7.413 6.434s-2.765 6.434-7.413 6.434H12.33L24 24h-8.245l-8.88-8.44c-.636-.588-.93-1.273-.93-1.86 0-.831.587-1.565 1.713-1.883l4.574-1.224c1.737-.465 2.936-1.81 2.936-3.572 0-2.153-1.761-3.4-3.939-3.4H0V0z"/></svg>
                <span style={{ fontSize: '0.8125rem', fontWeight: 500, letterSpacing: '-0.01em' }}>Resend</span>
              </div>

              {/* Sanity */}
              <div className="flex items-center gap-2 transition-all duration-300" style={{ opacity: 0.55, color: '#5D6878' }}
                onMouseEnter={(e) => { e.currentTarget.style.opacity = '1'; e.currentTarget.style.color = '#2C3E80'; }}
                onMouseLeave={(e) => { e.currentTarget.style.opacity = '0.55'; e.currentTarget.style.color = '#5D6878'; }}
                title="Sanity"
              >
                <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor"><path d="m23.327 15.205-.893-1.555-4.321 2.632 4.799-6.11.726-.426-.179-.27.33-.421-1.515-1.261-.693.883-13.992 8.186 5.173-6.221 9.636-5.282-.915-1.769-5.248 2.876 2.584-3.106-1.481-1.305-5.816 6.994-5.777 3.168 4.423-5.847 2.771-1.442-.88-1.789-8.075 4.203L6.186 4.43 4.648 3.198 0 9.349l.072.058.868 1.768 5.153-2.683-4.696 6.207.77.617.458.885 5.425-2.974-5.974 7.185 1.481 1.304.297-.358 14.411-8.459-4.785 6.094.078.065-.007.005.992 1.726 6.364-3.877-2.451 3.954 1.642 1.077L24 15.648z"/></svg>
                <span style={{ fontSize: '0.8125rem', fontWeight: 500, letterSpacing: '-0.01em' }}>Sanity</span>
              </div>
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
          color: '#5D6878',
        }}
      >
        ↓  Continúa
      </div>

      {/* Bridge gradient hero → cream (suaviza la transición) */}
      <div
        className="absolute bottom-0 left-0 right-0 pointer-events-none"
        style={{
          height: 120,
          background:
            'linear-gradient(to bottom, transparent 0%, rgba(14,15,17,0) 40%, rgba(245,242,236,0.04) 70%, rgba(245,242,236,0.18) 100%)',
        }}
      />
    </section>
  );
};

export default Hero;
