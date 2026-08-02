'use client';

import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import useScrollReveal from '../hooks/useScrollReveal';
import { colors } from '../lib/tokens';
import { initiatives } from '@/data/initiatives';

export const Footer = () => {
  const [topRef, topVisible] = useScrollReveal({ threshold: 0.15 });
  const [bottomRef, bottomVisible] = useScrollReveal({ threshold: 0.2 });
  const year = new Date().getFullYear();

  return (
    <footer
      id="contact"
      ref={topRef}
      className={`relative dark-mode with-grain reveal ${topVisible ? 'revealed' : ''}`}
      style={{ background: '#0a0a0a', color: '#ffffff' }}
      data-testid="footer"
    >
      {/* Indigo electric glow — mismo lenguaje visual que el hero */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 80% 60% at 20% 25%, rgba(58, 91, 255,0.22) 0%, transparent 60%), radial-gradient(ellipse 70% 50% at 85% 85%, rgba(58, 91, 255,0.14) 0%, transparent 60%)',
          filter: 'blur(20px)',
        }}
      />

      {/* Top accent line */}
      <div
        className="absolute top-0 left-0 right-0 h-px"
        style={{
          background:
            'linear-gradient(90deg, transparent 0%, rgba(58, 91, 255,0.35) 50%, transparent 100%)',
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
                  color: '#3a5bff',
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
                  color: '#ffffff',
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
                  color: '#c9cdd3',
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
                  color: '#ffffff',
                  borderBottom: '1px solid rgba(255, 255, 255,0.30)',
                  paddingBottom: '0.5rem',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.color = colors.indigo.onDark;
                  e.currentTarget.style.borderBottomColor = `${colors.indigo.onDark}aa`;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.color = '#ffffff';
                  e.currentTarget.style.borderBottomColor = 'rgba(255, 255, 255,0.30)';
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
                className="mt-10 grid grid-cols-2 gap-x-8 gap-y-2 text-sm max-w-md"
                style={{ color: '#9aa0a8', fontFamily: "'Inter', sans-serif" }}
              >
                <div className="flex flex-col gap-1">
                  <span style={{ fontSize: '0.6875rem', letterSpacing: '0.24em', textTransform: 'uppercase', color: '#52565e' }}>
                    Sede
                  </span>
                  <span>Ciudad de México</span>
                  <span style={{ color: '#7A8493', fontSize: '0.8125rem' }}>LatAm + remoto</span>
                </div>
                <div className="flex flex-col gap-1">
                  <span style={{ fontSize: '0.6875rem', letterSpacing: '0.24em', textTransform: 'uppercase', color: '#52565e' }}>
                    Disponibilidad
                  </span>
                  <span>Lun – Vie · 9:00 – 19:00</span>
                  <span style={{ color: '#7A8493', fontSize: '0.8125rem' }}>Respuesta en 24 h hábiles</span>
                </div>
              </div>

              {/* Datos corporativos — bajo Sede, sin domicilio */}
              <div style={{ display: 'none' }} aria-hidden="true">
                <span style={{ fontSize: '0.6875rem', letterSpacing: '0.24em', textTransform: 'uppercase', color: '#52565e', marginBottom: 4 }}>
                  Datos corporativos
                </span>
                <span style={{ color: '#c9cdd3' }}>swaraya, S. de R. L. de C. V.</span>
                <span>RFC: SWA1408208F7</span>
              </div>
            </div>

            {/* Right: Form */}
            <div className="lg:col-span-5">
              <div
                className="relative p-7 md:p-8 rounded-2xl"
                style={{
                  background: 'rgba(255, 255, 255,0.04)',
                  border: '1px solid rgba(255, 255, 255,0.08)',
                  backdropFilter: 'blur(20px)',
                }}
              >
                {/* Subtle accent */}
                <div
                  className="absolute top-0 left-6 right-6 h-px"
                  style={{
                    background:
                      'linear-gradient(90deg, transparent 0%, rgba(58, 91, 255,0.45) 50%, transparent 100%)',
                  }}
                />

                <h3
                  style={{
                    fontSize: '0.6875rem',
                    letterSpacing: '0.24em',
                    textTransform: 'uppercase',
                    color: '#9aa0a8',
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
                          fontSize: '0.6875rem',
                          letterSpacing: '0.18em',
                          textTransform: 'uppercase',
                          color: '#9aa0a8',
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
                        fontSize: '0.6875rem',
                        letterSpacing: '0.18em',
                        textTransform: 'uppercase',
                        color: '#9aa0a8',
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
                      background: colors.indigo.onDark,
                      color: colors.textOnDark.primary,
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.background = colors.indigo.onDarkHover;
                      e.currentTarget.style.transform = 'translateY(-1px)';
                      e.currentTarget.style.boxShadow = `0 12px 28px -8px ${colors.indigo.onDark}66`;
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background = colors.indigo.onDark;
                      e.currentTarget.style.transform = 'translateY(0)';
                      e.currentTarget.style.boxShadow = 'none';
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
          style={{ borderTop: '1px solid rgba(255, 255, 255,0.08)' }}
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
                color: '#ffffff',
              }}
            >
              <span
                style={{
                  fontFamily: "'Cabinet Grotesk', -apple-system, system-ui, sans-serif",
                  fontWeight: 500,
                  fontSize: '1.5rem',
                  letterSpacing: '-0.035em',
                  lineHeight: 1,
                  color: '#ffffff',
                  textTransform: 'lowercase',
                }}
              >
                swaraya
                <span aria-hidden="true" style={{ color: '#3a5bff' }}>.</span>
              </span>
            </div>
          </div>

          {/* Grid de columnas — navegación */}
          <div className="grid grid-cols-2 md:grid-cols-5 gap-10">
            {/* About */}
            <div className="col-span-2 md:col-span-2">
              <h4
                style={{
                  fontSize: '0.6875rem',
                  letterSpacing: '0.24em',
                  textTransform: 'uppercase',
                  color: '#52565e',
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
                  color: '#c9cdd3',
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
                  { label: 'Devoluciones', href: '/devoluciones' },
                ],
              },
            ].map((col) => (
              <div key={col.title}>
                <h4
                  style={{
                    fontSize: '0.6875rem',
                    letterSpacing: '0.24em',
                    textTransform: 'uppercase',
                    color: '#52565e',
                    fontWeight: 500,
                    marginBottom: 20,
                  }}
                >
                  {col.title}
                </h4>
                <ul className="flex flex-col gap-3">
                  {col.items && col.items.map((item) => (
                    <li key={item.label}>
                      {item.external ? (
                        <a
                          href={item.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="link-hover text-sm transition-colors"
                          style={{ color: '#c9cdd3' }}
                        >
                          {item.label}
                        </a>
                      ) : (
                        <Link
                          href={item.href}
                          className="link-hover text-sm transition-colors"
                          style={{ color: '#c9cdd3' }}
                        >
                          {item.label}
                        </Link>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Iniciativas — franja horizontal, autopoblada desde
              /src/data/initiatives.js. Añadir una entrada al array
              se refleja aquí automáticamente. */}
          {initiatives.length > 0 && (
            <div
              className="mt-12 md:mt-14 pt-8 flex flex-col md:flex-row md:items-center md:justify-between gap-6"
              style={{ borderTop: '1px solid rgba(255, 255, 255,0.06)' }}
            >
              <h4
                style={{
                  fontSize: '0.6875rem',
                  letterSpacing: '0.24em',
                  textTransform: 'uppercase',
                  color: '#52565e',
                  fontWeight: 500,
                }}
              >
                Iniciativas
              </h4>
              <ul className="flex flex-wrap items-center gap-x-12 md:gap-x-14 gap-y-5">
                {initiatives.map((it) => (
                  <li key={it.id} className="flex items-center">
                    <a
                      href={it.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="initiative-logo inline-flex items-center"
                      aria-label={`Visitar ${it.name}`}
                    >
                      <img
                        src={it.logo}
                        alt={it.logoAlt || it.name}
                        style={{
                          height: `${it.footerHeightPx ?? 20}px`,
                          width: 'auto',
                          display: 'block',
                        }}
                      />
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Bottom row */}
          <div
            className="mt-10 pt-6 flex flex-col md:flex-row justify-between gap-4 text-xs"
            style={{
              borderTop: '1px solid rgba(255, 255, 255,0.06)',
              color: '#52565e',
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
            }}
          >
            <span>© {year} swaraya, S. de R. L. de C. V.</span>
            <span>Agencia de inteligencia artificial aplicada</span>
          </div>
        </div>
      </div>

      {/* Local input styles — dark-mode form (Prompt F.1) */}
      <style jsx>{`
        .footer-input {
          width: 100%;
          min-height: 44px;
          padding: 12px 14px;
          background: rgba(255, 255, 255,0.04);
          border: 1px solid rgba(255, 255, 255,0.14);
          border-radius: 10px;
          color: #ffffff;
          font-family: 'Inter', sans-serif;
          font-size: 0.9375rem;
          line-height: 1.4;
          transition: border-color 0.25s ease, background 0.25s ease, box-shadow 0.25s ease;
        }
        .footer-input::placeholder {
          color: #9aa0a8;                              /* 7.72:1 sobre #111114 ✓ */
        }
        .footer-input:focus {
          outline: none;
          border-color: #3a5bff;
          background: rgba(255, 255, 255,0.06);
          box-shadow: 0 0 0 3px rgba(58, 91, 255,0.25);
        }

        /* Iniciativas — homologación de estados idle/hover
           Los logos originales conviven con tratamientos gráficos muy
           distintos (wordmark blanco vs icono cuadrado a color). Para que
           el "logo strip" respire con coherencia:
           · Idle  → escala de grises + opacidad reducida (todos iguales)
           · Hover → color de marca original + opacidad plena           */
        .initiative-logo {
          filter: grayscale(1);
          opacity: 0.55;
          transition: filter 0.3s ease, opacity 0.3s ease, transform 0.3s ease;
        }
        .initiative-logo:hover,
        .initiative-logo:focus-visible {
          filter: grayscale(0);
          opacity: 1;
        }
        .initiative-logo:focus-visible {
          outline: 2px solid #3a5bff;
          outline-offset: 4px;
          border-radius: 4px;
        }
      `}</style>
    </footer>
  );
};

export default Footer;
