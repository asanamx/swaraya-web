'use client';

import { useEffect, useState } from 'react';
import { AbstractVisual } from './AbstractVisual';
import { ArrowRight } from 'lucide-react';

export const Hero = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [particles, setParticles] = useState([]);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoaded(true), 150);
    // Generate floating particles on the client only to avoid SSR hydration
    // mismatches (Math.random differs between server and client).
    setParticles(
      [...Array(20)].map(() => ({
        left: `${Math.random() * 100}%`,
        top: `${Math.random() * 100}%`,
        animation: `float ${8 + Math.random() * 10}s ease-in-out infinite`,
        animationDelay: `${Math.random() * 5}s`,
      }))
    );
    return () => clearTimeout(timer);
  }, []);

  const scrollToSection = (href) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      className="relative min-h-screen bg-[#05060A] overflow-hidden"
      data-testid="hero-section"
    >
      {/* Animated grid background */}
      <div className="absolute inset-0 opacity-[0.03]">
        <div 
          className="absolute inset-0"
          style={{
            backgroundImage: `
              linear-gradient(rgba(122,196,224,0.3) 1px, transparent 1px),
              linear-gradient(90deg, rgba(122,196,224,0.3) 1px, transparent 1px)
            `,
            backgroundSize: '60px 60px',
            animation: 'gridMove 20s linear infinite',
          }}
        />
      </div>

      {/* Floating particles */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {particles.map((p, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-[#7AC4E0] rounded-full opacity-20"
            style={{
              left: p.left,
              top: p.top,
              animation: p.animation,
              animationDelay: p.animationDelay,
            }}
          />
        ))}
      </div>

      {/* Abstract Visual */}
      <div className="absolute inset-0">
        <AbstractVisual />
      </div>

      {/* Ambient glow orbs */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div 
          className="absolute top-1/4 right-1/4 w-[700px] h-[700px] rounded-full"
          style={{
            background: 'radial-gradient(circle, rgba(122,196,224,0.18) 0%, transparent 70%)',
            filter: 'blur(80px)',
            animation: 'pulse 8s ease-in-out infinite, drift 15s ease-in-out infinite',
          }}
        />
        <div 
          className="absolute bottom-1/3 right-1/3 w-[500px] h-[500px] rounded-full"
          style={{
            background: 'radial-gradient(circle, rgba(90,123,250,0.15) 0%, transparent 70%)',
            filter: 'blur(60px)',
            animation: 'pulse 10s ease-in-out infinite reverse, drift 20s ease-in-out infinite reverse',
          }}
        />
        <div 
          className="absolute top-1/2 right-[20%] w-[300px] h-[300px] rounded-full"
          style={{
            background: 'radial-gradient(circle, rgba(255,255,255,0.08) 0%, transparent 70%)',
            filter: 'blur(40px)',
            animation: 'pulse 6s ease-in-out infinite',
          }}
        />
      </div>

      {/* Animated lines */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-20">
        <svg className="absolute w-full h-full">
          <line 
            x1="0%" y1="30%" x2="100%" y2="70%" 
            stroke="url(#lineGradient)" 
            strokeWidth="1"
            className="animate-pulse"
            style={{ animation: 'lineDraw 3s ease-in-out infinite' }}
          />
          <line 
            x1="20%" y1="0%" x2="80%" y2="100%" 
            stroke="url(#lineGradient)" 
            strokeWidth="1"
            style={{ animation: 'lineDraw 4s ease-in-out infinite', animationDelay: '1s' }}
          />
          <defs>
            <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="transparent" />
              <stop offset="50%" stopColor="#7AC4E0" />
              <stop offset="100%" stopColor="transparent" />
            </linearGradient>
          </defs>
        </svg>
      </div>

      {/* Gradient overlays */}
      <div 
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `linear-gradient(to right, 
            rgba(5,6,10,0.95) 0%, 
            rgba(5,6,10,0.85) 30%, 
            rgba(5,6,10,0.5) 60%, 
            rgba(5,6,10,0.15) 100%
          )`,
        }}
      />
      
      {/* Bottom gradient */}
      <div 
        className="absolute bottom-0 left-0 right-0 h-36 md:h-48 pointer-events-none"
        style={{
          background: 'linear-gradient(to top, rgba(5,6,10,1) 0%, transparent 100%)',
        }}
      />

      {/* Subtle top accent line */}
      <div 
        className={`absolute top-0 left-0 right-0 h-px transition-opacity duration-1000 ${
          isLoaded ? 'opacity-100' : 'opacity-0'
        }`}
        style={{
          background: 'linear-gradient(90deg, transparent 0%, rgba(122,196,224,0.15) 50%, transparent 100%)',
          transitionDelay: '600ms',
        }}
      />

      <div className="container-main relative z-10">
        <div className="min-h-screen flex flex-col justify-center pt-24 pb-28 md:pt-32 md:pb-36 lg:pt-36 lg:pb-44">
          <div className="max-w-[720px]">
            {/* Label */}
            <div
              className={`label-accent text-[#7AC4E0] mb-8 md:mb-10 transition-all duration-500 ${
                isLoaded ? 'opacity-80 translate-y-0' : 'opacity-0 translate-y-3'
              }`}
              style={{ transitionDelay: '50ms' }}
              data-testid="hero-label"
            >
              Agencia de Inteligencia Artificial Aplicada
            </div>

            {/* Headline */}
            <h1
              className={`heading-hero mb-8 md:mb-10 transition-all duration-500 ${
                isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'
              }`}
              style={{ transitionDelay: '100ms' }}
              data-testid="hero-headline"
            >
              Investigación profunda.<br />
              <span className="text-[#9BA5B7]">Ingeniería precisa.<br />Inteligencia real.</span>
            </h1>

            {/* Description */}
            <p
              className={`body-large mb-10 md:mb-12 transition-all duration-500 ${
                isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
              }`}
              style={{ transitionDelay: '150ms' }}
              data-testid="hero-description"
            >
              Swaraya investiga, diseña e integra sistemas de inteligencia artificial para organizaciones que requieren precisión, escalabilidad y ventaja estructural.
            </p>

            {/* CTAs */}
            <div 
              className={`flex flex-col sm:flex-row gap-4 transition-all duration-500 ${
                isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
              }`}
              style={{ transitionDelay: '200ms' }}
            >
              <button
                onClick={() => scrollToSection('#contact')}
                className="btn-primary group"
                data-testid="hero-cta-primary"
              >
                Inicia una Conversación Estratégica
                <ArrowRight className="ml-2.5 w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
              </button>
              <button
                onClick={() => scrollToSection('#research')}
                className="btn-secondary"
                data-testid="hero-cta-secondary"
              >
                Ver nuestros Dominios →
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div 
        className={`absolute bottom-32 md:bottom-36 left-1/2 -translate-x-1/2 transition-all duration-500 ${
          isLoaded ? 'opacity-40' : 'opacity-0'
        }`}
        style={{ transitionDelay: '350ms' }}
      >
        <div className="w-px h-10 md:h-12 bg-gradient-to-b from-transparent via-[#5D6878]/60 to-transparent" />
      </div>

      {/* Tech Logos */}
      <div 
        className={`absolute bottom-8 md:bottom-12 left-0 right-0 z-20 pointer-events-auto transition-all duration-500 ${
          isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
        }`}
        style={{ transitionDelay: '400ms' }}
      >
        <div className="container-main">
          <div className="flex flex-wrap items-center justify-center gap-8 md:gap-12 lg:gap-16">
            {/* Claude */}
            <div 
              className="text-[#6B7280] opacity-70 hover:opacity-100 hover:text-[#7AC4E0] transition-all duration-300 cursor-pointer hover:scale-110 hover:drop-shadow-[0_0_8px_rgba(122,196,224,0.4)] pointer-events-auto flex items-center gap-2" 
              title="Claude"
            >
              <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 md:w-6 md:h-6">
                <path d="M17.304 3.541h-3.672l6.696 16.918h3.672l-6.696-16.918zm-10.608 0L0 20.459h3.744l1.32-3.456h6.36l1.344 3.456h3.744L9.816 3.541H6.696zm-.096 10.63l2.16-5.639 2.16 5.639H6.6z"/>
              </svg>
              <span className="text-sm md:text-base font-medium tracking-tight">Claude</span>
            </div>
            
            {/* OpenAI */}
            <div 
              className="text-[#6B7280] opacity-70 hover:opacity-100 hover:text-[#7AC4E0] transition-all duration-300 cursor-pointer hover:scale-110 hover:drop-shadow-[0_0_8px_rgba(122,196,224,0.4)] pointer-events-auto" 
              title="OpenAI"
            >
              <svg viewBox="0 0 24 24" fill="currentColor" className="w-20 h-6 md:w-24 md:h-7">
                <path d="M22.282 9.821a5.985 5.985 0 0 0-.516-4.91 6.046 6.046 0 0 0-6.51-2.9A6.065 6.065 0 0 0 4.981 4.18a5.985 5.985 0 0 0-3.998 2.9 6.046 6.046 0 0 0 .743 7.097 5.98 5.98 0 0 0 .51 4.911 6.051 6.051 0 0 0 6.515 2.9A5.985 5.985 0 0 0 13.26 24a6.056 6.056 0 0 0 5.772-4.206 5.99 5.99 0 0 0 3.997-2.9 6.056 6.056 0 0 0-.747-7.073zM13.26 22.43a4.476 4.476 0 0 1-2.876-1.04l.141-.081 4.779-2.758a.795.795 0 0 0 .392-.681v-6.737l2.02 1.168a.071.071 0 0 1 .038.052v5.583a4.504 4.504 0 0 1-4.494 4.494zM3.6 18.304a4.47 4.47 0 0 1-.535-3.014l.142.085 4.783 2.759a.771.771 0 0 0 .78 0l5.843-3.369v2.332a.08.08 0 0 1-.033.062L9.74 19.95a4.5 4.5 0 0 1-6.14-1.646zM2.34 7.896a4.485 4.485 0 0 1 2.366-1.973V11.6a.766.766 0 0 0 .388.676l5.815 3.355-2.02 1.168a.076.076 0 0 1-.071 0l-4.83-2.786A4.504 4.504 0 0 1 2.34 7.872zm16.597 3.855l-5.833-3.387L15.119 7.2a.076.076 0 0 1 .071 0l4.83 2.791a4.494 4.494 0 0 1-.676 8.105v-5.678a.79.79 0 0 0-.407-.667zm2.01-3.023l-.141-.085-4.774-2.782a.776.776 0 0 0-.785 0L9.409 9.23V6.897a.066.066 0 0 1 .028-.061l4.83-2.787a4.5 4.5 0 0 1 6.68 4.66zm-12.64 4.135l-2.02-1.164a.08.08 0 0 1-.038-.057V6.075a4.5 4.5 0 0 1 7.375-3.453l-.142.08L8.704 5.46a.795.795 0 0 0-.393.681zm1.097-2.365l2.602-1.5 2.607 1.5v2.999l-2.597 1.5-2.607-1.5z"/>
              </svg>
            </div>
            
            {/* Vercel */}
            <div 
              className="text-[#6B7280] opacity-70 hover:opacity-100 hover:text-[#7AC4E0] transition-all duration-300 cursor-pointer hover:scale-110 hover:drop-shadow-[0_0_8px_rgba(122,196,224,0.4)] pointer-events-auto" 
              title="Vercel"
            >
              <svg viewBox="0 0 76 20" fill="currentColor" className="w-20 h-5 md:w-24 md:h-6">
                <path d="M10 2L20 18H0L10 2Z" />
                <text x="24" y="15" fontFamily="system-ui, -apple-system, sans-serif" fontSize="13" fontWeight="600" letterSpacing="-0.3">Vercel</text>
              </svg>
            </div>
            
            {/* OpenClaw */}
            <div 
              className="text-[#6B7280] opacity-70 hover:opacity-100 hover:text-[#7AC4E0] transition-all duration-300 cursor-pointer hover:scale-110 hover:drop-shadow-[0_0_8px_rgba(122,196,224,0.4)] pointer-events-auto" 
              title="OpenClaw"
            >
              <svg viewBox="0 0 100 20" fill="currentColor" className="w-24 h-5 md:w-28 md:h-6">
                <text x="0" y="15" fontFamily="system-ui, -apple-system, sans-serif" fontSize="15" fontWeight="500" letterSpacing="-0.3">OpenClaw</text>
              </svg>
            </div>

            {/* Resend */}
            <div
              className="text-[#6B7280] opacity-70 hover:opacity-100 hover:text-[#7AC4E0] transition-all duration-300 cursor-pointer hover:scale-110 hover:drop-shadow-[0_0_8px_rgba(122,196,224,0.4)] pointer-events-auto flex items-center gap-2"
              title="Resend"
            >
              <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 md:w-6 md:h-6">
                <path d="M14.679 0c4.648 0 7.413 2.765 7.413 6.434s-2.765 6.434-7.413 6.434H12.33L24 24h-8.245l-8.88-8.44c-.636-.588-.93-1.273-.93-1.86 0-.831.587-1.565 1.713-1.883l4.574-1.224c1.737-.465 2.936-1.81 2.936-3.572 0-2.153-1.761-3.4-3.939-3.4H0V0z"/>
              </svg>
              <span className="text-sm md:text-base font-medium tracking-tight">Resend</span>
            </div>

            {/* Sanity */}
            <div
              className="text-[#6B7280] opacity-70 hover:opacity-100 hover:text-[#7AC4E0] transition-all duration-300 cursor-pointer hover:scale-110 hover:drop-shadow-[0_0_8px_rgba(122,196,224,0.4)] pointer-events-auto flex items-center gap-2"
              title="Sanity"
            >
              <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 md:w-6 md:h-6">
                <path d="m23.327 15.205-.893-1.555-4.321 2.632 4.799-6.11.726-.426-.179-.27.33-.421-1.515-1.261-.693.883-13.992 8.186 5.173-6.221 9.636-5.282-.915-1.769-5.248 2.876 2.584-3.106-1.481-1.305-5.816 6.994-5.777 3.168 4.423-5.847 2.771-1.442-.88-1.789-8.075 4.203L6.186 4.43 4.648 3.198 0 9.349l.072.058.868 1.768 5.153-2.683-4.696 6.207.77.617.458.885 5.425-2.974-5.974 7.185 1.481 1.304.297-.358 14.411-8.459-4.785 6.094.078.065-.007.005.992 1.726 6.364-3.877-2.451 3.954 1.642 1.077L24 15.648z"/>
              </svg>
              <span className="text-sm md:text-base font-medium tracking-tight">Sanity</span>
            </div>
          </div>
        </div>
      </div>

      {/* CSS Animation */}
      <style jsx>{`
        @keyframes pulse {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.7; transform: scale(1.1); }
        }
      `}</style>
    </section>
  );
};

export default Hero;
