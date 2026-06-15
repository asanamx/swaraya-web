'use client';

import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import useScrollReveal from '../hooks/useScrollReveal';
import SwarayaCardinal from './SwarayaCardinal';

export const Footer = () => {
  const [topRef, topVisible] = useScrollReveal({ threshold: 0.15 });
  const [bottomRef, bottomVisible] = useScrollReveal({ threshold: 0.2 });
  const year = new Date().getFullYear();

  return (
    <footer
      id="contact"
      ref={topRef}
      className={`relative dark-mode reveal ${topVisible ? 'revealed' : ''}`}
      style={{ background: '#0E0F11', color: '#F5F2EC' }}
      data-testid="footer"
    >
      {/* Indigo glow sutil */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 70% 50% at 20% 20%, rgba(84,104,214,0.12) 0%, transparent 60%), radial-gradient(ellipse 60% 50% at 85% 90%, rgba(44,62,128,0.10) 0%, transparent 60%)',
        }}
      />

      {/* Top accent line */}
      <div
        className="absolute top-0 left-0 right-0 h-px"
        style={{
          background:
            'linear-gradient(90deg, transparent 0%, rgba(84,104,214,0.35) 50%, transparent 100%)',
        }}
      />

      <div className="container-main relative">
        {/* ===== CONTACT SECTION (top) ===== */}
        <div className="pt-20 md:pt-28 lg:pt-32 pb-16 md:pb-20">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
            {/* Left: CTA copy */}
            <div className="lg:col-span-7">
              <span
                style={{
                  fontSize: '0.6875rem',
                  letterSpacing: '0.32em',
                  textTransform: 'uppercase',
                  color: '#5468D6',
                  fontWeight: 500,
                  display: 'inline-block',
                  marginBottom: '1.5rem',
                }}
              >
                Diálogo Abierto
              </span>

              <h2
                style={{
                  fontFamily: "'Cabinet Grotesk', sans-serif",
                  fontSize: 'clamp(2rem, 4vw, 3.25rem)',
                  fontWeight: 500,
                  letterSpacing: '-0.03em',
                  lineHeight: 1.05,
                  color: '#F5F2EC',
                  maxWidth: '20ch',
                  marginBottom: '1.75rem',
                }}
              >
                Iniciemos una conversación estratégica.
              </h2>

              <p
                style={{
                  fontSize: '1rem',
                  lineHeight: 1.65,
                  color: '#C8CCDC',
                  maxWidth: '52ch',
                  marginBottom: '2.5rem',
                  fontFamily: "'Inter', sans-serif",
                }}
              >
                Pensamiento de nivel investigación. Sistemas de nivel operativo.
                Resultados de nivel estratégico. Escríbenos directamente o
                déjanos tus datos y te contactamos.
              </p>

              <a
                href="mailto:hola@swaraya.ai"
                className="group inline-flex items-center gap-3 transition-all duration-300"
                style={{
                  fontFamily: "'Cabinet Grotesk', sans-serif",
                  fontSize: '1.125rem',
                  fontWeight: 500,
                  letterSpacing: '-0.015em',
                  color: '#F5F2EC',
                  borderBottom: '1px solid rgba(245,242,236,0.30)',
                  paddingBottom: '0.5rem',
                }}
                data-testid="footer-cta-email"
              >
                hola@swaraya.ai
                <ArrowRight
                  className="transition-transform duration-300 group-hover:translate-x-1.5"
                  size={18}
                />
              </a>

              <div
                className="mt-10 flex flex-col gap-1 text-sm"
                style={{ color: '#9BA5B7', fontFamily: "'Inter', sans-serif" }}
              >
                <span style={{ fontSize: '0.6875rem', letterSpacing: '0.24em', textTransform: 'uppercase', color: '#5D6878', marginBottom: 6 }}>
                  Sede
                </span>
                Ciudad de México · México
              </div>
            </div>

            {/* Right: Form */}
            <div className="lg:col-span-5">
              <div
                className="relative p-7 md:p-8 rounded-2xl"
                style={{
                  background: 'rgba(245,242,236,0.04)',
                  border: '1px solid rgba(245,242,236,0.08)',
                  backdropFilter: 'blur(20px)',
                }}
              >
                {/* Subtle accent */}
                <div
                  className="absolute top-0 left-6 right-6 h-px"
                  style={{
                    background:
                      'linear-gradient(90deg, transparent 0%, rgba(84,104,214,0.45) 50%, transparent 100%)',
                  }}
                />

                <h3
                  style={{
                    fontSize: '0.6875rem',
                    letterSpacing: '0.24em',
                    textTransform: 'uppercase',
                    color: '#9BA5B7',
                    fontWeight: 500,
                    marginBottom: '1.75rem',
                  }}
                >
                  O déjanos tus datos
                </h3>

                <form className="space-y-5" data-testid="footer-contact-form">
                  {[
                    { id: 'name',         label: 'Nombre',           type: 'text',  placeholder: 'Tu nombre' },
                    { id: 'email',        label: 'Correo electrónico', type: 'email', placeholder: 'tu@correo.com' },
                    { id: 'organization', label: 'Organización',     type: 'text',  placeholder: 'Tu organización' },
                  ].map((field) => (
                    <div key={field.id}>
                      <label
                        htmlFor={field.id}
                        style={{
                          display: 'block',
                          fontSize: '0.625rem',
                          letterSpacing: '0.18em',
                          textTransform: 'uppercase',
                          color: '#9BA5B7',
                          fontWeight: 500,
                          marginBottom: 8,
                        }}
                      >
                        {field.label}
                      </label>
                      <input
                        type={field.type}
                        id={field.id}
                        name={field.id}
                        placeholder={field.placeholder}
                        className="footer-input"
                        data-testid={`footer-input-${field.id}`}
                      />
                    </div>
                  ))}

                  <div>
                    <label
                      htmlFor="message"
                      style={{
                        display: 'block',
                        fontSize: '0.625rem',
                        letterSpacing: '0.18em',
                        textTransform: 'uppercase',
                        color: '#9BA5B7',
                        fontWeight: 500,
                        marginBottom: 8,
                      }}
                    >
                      Mensaje
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      rows="3"
                      placeholder="Cuéntanos sobre tu desafío…"
                      className="footer-input resize-none"
                      data-testid="footer-input-message"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full mt-2 py-3.5 px-6 rounded-xl text-[0.8125rem] font-medium tracking-[-0.005em] transition-all duration-300 group inline-flex items-center justify-center gap-2"
                    style={{
                      background: '#F5F2EC',
                      color: '#0E0F11',
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.background = '#FFFFFF';
                      e.currentTarget.style.transform = 'translateY(-1px)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background = '#F5F2EC';
                      e.currentTarget.style.transform = 'translateY(0)';
                    }}
                    data-testid="footer-submit-button"
                  >
                    Enviar Mensaje
                    <ArrowRight size={14} className="transition-transform duration-300 group-hover:translate-x-1" />
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>

        {/* ===== DIVIDER + WORDMARK + NAV ===== */}
        <div
          ref={bottomRef}
          className={`pt-16 md:pt-20 pb-12 reveal ${bottomVisible ? 'revealed' : ''}`}
          style={{ borderTop: '1px solid rgba(245,242,236,0.08)' }}
        >
          {/* Wordmark del footer — sistema unificado con el navbar.
              Misma proporción y composición. Cardinales en cream para
              contraste con fondo oscuro. Indigo se mantiene luminoso. */}
          <div className="mb-12 md:mb-16">
            <div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.5rem',
                color: '#F5F2EC',
              }}
            >
              <SwarayaCardinal
                size={30}
                color="currentColor"
                accent="#5468D6"
                strokeWidth={2.6}
              />
              <span
                style={{
                  fontFamily: "'Inter', sans-serif",
                  fontWeight: 700,
                  fontSize: '1.375rem',
                  letterSpacing: '-0.028em',
                  lineHeight: 1,
                  color: '#F5F2EC',
                }}
              >
                swaraya
              </span>
            </div>
          </div>

          {/* Grid de columnas */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-10">
            {/* About */}
            <div className="col-span-2 md:col-span-1">
              <h4
                style={{
                  fontSize: '0.6875rem',
                  letterSpacing: '0.24em',
                  textTransform: 'uppercase',
                  color: '#5D6878',
                  fontWeight: 500,
                  marginBottom: 20,
                }}
              >
                Manifiesto
              </h4>
              <p
                style={{
                  fontSize: '0.875rem',
                  lineHeight: 1.6,
                  color: '#C8CCDC',
                  fontFamily: "'Inter', sans-serif",
                }}
              >
                Agencia de inteligencia artificial aplicada. Diseñamos
                sistemas para organizaciones que requieren ventaja estructural.
              </p>
            </div>

            {[
              {
                title: 'Trabajo',
                items: [
                  { label: 'Investigación', href: '/#research' },
                  { label: 'Método', href: '/#method' },
                  { label: 'Filosofía', href: '/#philosophy' },
                ],
              },
              {
                title: 'Recursos',
                items: [
                  { label: 'Blog', href: '/blog' },
                  { label: 'Stack', href: '/#tech-stack' },
                ],
              },
              {
                title: 'Legal',
                items: [
                  { label: 'Privacidad', href: '/privacidad' },
                  { label: 'Términos', href: '/terminos' },
                ],
              },
            ].map((col) => (
              <div key={col.title}>
                <h4
                  style={{
                    fontSize: '0.6875rem',
                    letterSpacing: '0.24em',
                    textTransform: 'uppercase',
                    color: '#5D6878',
                    fontWeight: 500,
                    marginBottom: 20,
                  }}
                >
                  {col.title}
                </h4>
                <ul className="flex flex-col gap-3">
                  {col.items.map((item) => (
                    <li key={item.label}>
                      <Link
                        href={item.href}
                        className="link-hover text-sm transition-colors"
                        style={{ color: '#C8CCDC' }}
                      >
                        {item.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Bottom row */}
          <div
            className="mt-16 md:mt-20 pt-8 flex flex-col md:flex-row justify-between gap-4 text-xs"
            style={{
              borderTop: '1px solid rgba(245,242,236,0.06)',
              color: '#5D6878',
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
            }}
          >
            <span>© {year} swaraya</span>
            <span>Agencia de inteligencia artificial aplicada</span>
          </div>
        </div>
      </div>

      {/* Local input styles — dark-mode form */}
      <style jsx>{`
        .footer-input {
          width: 100%;
          padding: 12px 14px;
          background: rgba(245,242,236,0.04);
          border: 1px solid rgba(245,242,236,0.10);
          border-radius: 10px;
          color: #F5F2EC;
          font-family: 'Inter', sans-serif;
          font-size: 0.875rem;
          line-height: 1.4;
          transition: border-color 0.3s ease, background 0.3s ease;
        }
        .footer-input::placeholder {
          color: rgba(245,242,236,0.30);
        }
        .footer-input:focus {
          outline: none;
          border-color: rgba(84,104,214,0.55);
          background: rgba(245,242,236,0.06);
        }
      `}</style>
    </footer>
  );
};

export default Footer;
