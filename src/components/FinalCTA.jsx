'use client';

import { ArrowRight } from 'lucide-react';
import useScrollReveal from '../hooks/useScrollReveal';

export const FinalCTA = () => {
  const [ctaRef, ctaVisible] = useScrollReveal({ threshold: 0.2 });
  const [formRef, formVisible] = useScrollReveal({ threshold: 0.15 });

  return (
    <section
      id="contact"
      className="section-padding-lg bg-[#F5F2EC] relative overflow-hidden"
      data-testid="final-cta-section"
    >
      {/* Architectural accent lines */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-1/4 left-0 w-[400px] h-px bg-gradient-to-r from-transparent via-[rgba(44,62,128,0.18)] to-transparent" />
        <div className="absolute top-1/3 right-0 w-[300px] h-px bg-gradient-to-l from-transparent via-[rgba(44,62,128,0.12)] to-transparent" />
      </div>

      <div className="container-main relative z-10">
        {/* CTA Content */}
        <div 
          ref={ctaRef}
          className={`max-w-[640px] mx-auto text-center mb-16 md:mb-24 lg:mb-32 reveal ${ctaVisible ? 'revealed' : ''}`}
        >
          <span 
            className="label-accent text-[#2C3E80] block mb-10" 
            data-testid="cta-label"
          >
            Diálogo Abierto
          </span>

          <h2 className="heading-xl mb-7" data-testid="cta-headline">
            Construye la arquitectura de inteligencia de la que dependerá tu institución.
          </h2>

          <p className="text-sm md:text-base text-[#5D6878] mb-10" data-testid="cta-body">
            Pensamiento de nivel investigación. Sistemas de nivel operativo. Resultados de nivel estratégico.
          </p>

          <a
            href="mailto:contacto@swaraya.ai"
            className="btn-primary inline-flex items-center group"
            data-testid="cta-button"
          >
            Inicia una Conversación por E-mail
            <ArrowRight className="ml-2.5 w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
          </a>
        </div>

        {/* Form Card - Elevated */}
        <div
          ref={formRef}
          id="contact-form"
          className={`max-w-[440px] mx-auto reveal ${formVisible ? 'revealed' : ''}`}
          data-testid="contact-form-section"
        >
          <div className="relative">
            {/* Outer glow frame */}
            <div 
              className="absolute -inset-px rounded-[21px] opacity-60"
              style={{
                background: 'linear-gradient(135deg, rgba(44,62,128,0.18) 0%, transparent 50%, rgba(44,62,128,0.12) 100%)',
              }}
            />
            
            {/* Main card */}
            <div 
              className="relative p-8 md:p-10 rounded-[20px] overflow-hidden"
              style={{
                background: 'linear-gradient(168deg, #0E0F11 0%, #161821 100%)',
                border: '1px solid rgba(245,242,236,0.06)',
              }}
            >
              {/* Top accent line */}
              <div 
                className="absolute top-0 left-8 right-8 h-px"
                style={{
                  background: 'linear-gradient(90deg, transparent 0%, rgba(84,104,214,0.35) 50%, transparent 100%)',
                }}
              />

              <h3 className="text-[0.8125rem] md:text-sm font-medium text-[#C8CCDC] mb-8 tracking-[-0.005em]">
                O déjanos tus datos
              </h3>
              
              <form className="space-y-6">
                <div>
                  <label className="text-[0.6875rem] font-medium text-[#5D6878] tracking-wide block mb-2.5" htmlFor="name">Nombre</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    className="input-premium"
                    placeholder="Tu nombre"
                    data-testid="contact-input-name"
                  />
                </div>
                
                <div>
                  <label className="text-[0.6875rem] font-medium text-[#5D6878] tracking-wide block mb-2.5" htmlFor="email">Correo electrónico</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    className="input-premium"
                    placeholder="tu@correo.com"
                    data-testid="contact-input-email"
                  />
                </div>
                
                <div>
                  <label className="text-[0.6875rem] font-medium text-[#5D6878] tracking-wide block mb-2.5" htmlFor="organization">Organización</label>
                  <input
                    type="text"
                    id="organization"
                    name="organization"
                    className="input-premium"
                    placeholder="Tu organización"
                    data-testid="contact-input-organization"
                  />
                </div>
                
                <div>
                  <label className="text-[0.6875rem] font-medium text-[#5D6878] tracking-wide block mb-2.5" htmlFor="message">Mensaje</label>
                  <textarea
                    id="message"
                    name="message"
                    rows="3"
                    className="input-premium resize-none"
                    placeholder="Cuéntanos sobre tu desafío..."
                    data-testid="contact-input-message"
                  />
                </div>
                
                <button
                  type="submit"
                  className="w-full mt-3 py-4 px-6 bg-[#F5F2EC] text-[#0E0F11] text-[0.8125rem] font-medium tracking-[-0.005em] rounded-xl transition-all duration-300 hover:bg-white hover:shadow-[0_8px_32px_-8px_rgba(245,242,236,0.18)]"
                  data-testid="contact-submit-button"
                >
                  Enviar Mensaje
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FinalCTA;
