'use client';

import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import useScrollReveal from '../hooks/useScrollReveal';
import { colors } from '../lib/tokens';
import { initiatives } from '@/data/initiatives';
import Wordmark from './Wordmark';

export const Footer = () => {
  const [topRef, topVisible] = useScrollReveal({ threshold: 0.15 });
  const [bottomRef, bottomVisible] = useScrollReveal({ threshold: 0.2 });
  const year = new Date().getFullYear();

  return (
    <footer
      ref={topRef}
      className={`reveal ${topVisible ? 'revealed' : ''}`}
      data-testid="footer"
    >
      {/* ═══════════════════════════════════════════════════════
          BANDA CONTACTO · full-girasol · única superficie amarilla
          del sitio (§6.3). Máximo impacto sin ruido.
          ═══════════════════════════════════════════════════════ */}
      <section
        id="contacto"
        style={{ background: '#c8e824', color: '#0d0f0e' }}
        data-testid="contact-band"
      >
        <div className="container-main">
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
                    color: '#0d0f0e',
                    fontWeight: 600,
                    display: 'inline-block',
                    marginBottom: '1.5rem',
                    opacity: 0.75,
                  }}
                >
                  Primera Etapa
                </span>

                <h2
                  style={{
                    fontFamily: "'Cabinet Grotesk', sans-serif",
                    fontSize: 'clamp(2rem, 4vw, 3.25rem)',
                    fontWeight: 500,
                    letterSpacing: '-0.03em',
                    lineHeight: 1.05,
                    color: '#0d0f0e',
                    maxWidth: '20ch',
                    marginBottom: '1.75rem',
                  }}
                >
                  Empieza por saber{' '}
                  <span style={{ opacity: 0.55 }}>qué automatizar</span>
                </h2>

                <p
                  style={{
                    fontSize: '1rem',
                    lineHeight: 1.65,
                    color: '#0d0f0e',
                    opacity: 0.85,
                    maxWidth: '52ch',
                    marginBottom: '2.5rem',
                    fontFamily: "'Inter', sans-serif",
                  }}
                >
                  Dos semanas de levantamiento con tu equipo. Al final tienes
                  el mapa de cómo decide hoy tu operación y qué procesos
                  conviene automatizar primero, ordenados por retorno. Es un
                  entregable tuyo, lo contrates o no con nosotros después.
                </p>

                <a
                  href="mailto:hola@swaraya.ai"
                  className="group inline-flex items-center gap-3 transition-all duration-300"
                  style={{
                    fontFamily: "'Cabinet Grotesk', sans-serif",
                    fontSize: '1.125rem',
                    fontWeight: 500,
                    letterSpacing: '-0.015em',
                    color: '#0d0f0e',
                    borderBottom: '1px solid rgba(43,30,0,0.45)',
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

                {/* Datos de la oferta — reemplazan SEDE / DISPONIBILIDAD */}
                <div
                  className="mt-10 grid grid-cols-1 sm:grid-cols-3 gap-x-8 gap-y-3 text-sm"
                  style={{ color: '#0d0f0e', fontFamily: "'Inter', sans-serif" }}
                  data-testid="footer-oferta"
                >
                  <div className="flex flex-col gap-1">
                    <span style={{ fontSize: '0.6875rem', letterSpacing: '0.24em', textTransform: 'uppercase', color: '#0d0f0e', opacity: 0.6, fontWeight: 600 }}>
                      Duración
                    </span>
                    <span>2 semanas</span>
                  </div>
                  <div className="flex flex-col gap-1">
                    <span style={{ fontSize: '0.6875rem', letterSpacing: '0.24em', textTransform: 'uppercase', color: '#0d0f0e', opacity: 0.6, fontWeight: 600 }}>
                      Entregable
                    </span>
                    <span>Mapa de criterio</span>
                  </div>
                  <div className="flex flex-col gap-1">
                    <span style={{ fontSize: '0.6875rem', letterSpacing: '0.24em', textTransform: 'uppercase', color: '#0d0f0e', opacity: 0.6, fontWeight: 600 }}>
                      Compromiso
                    </span>
                    <span>Ninguno de continuar</span>
                  </div>
                </div>
              </div>

              {/* Right: Form */}
              <div className="lg:col-span-5">
                <div
                  className="relative p-7 md:p-8 rounded-xl contact-form-panel"
                  style={{
                    background: 'rgba(255, 255, 255, 0.35)',
                    border: '1px solid rgba(43, 30, 0, 0.20)',
                    backdropFilter: 'blur(6px)',
                  }}
                >
                  <h3
                    style={{
                      fontSize: '0.6875rem',
                      letterSpacing: '0.24em',
                      textTransform: 'uppercase',
                      color: '#0d0f0e',
                      opacity: 0.65,
                      fontWeight: 600,
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
                          color: '#0d0f0e',
                          opacity: 0.75,
                          fontWeight: 600,
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
                        className="contact-input"
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
                        color: '#0d0f0e',
                        opacity: 0.75,
                        fontWeight: 600,
                        marginBottom: 8,
                      }}
                    >
                      Mensaje
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      rows="3"
                      placeholder="¿Qué proceso te gustaría dejar de hacer a mano?"
                      className="contact-input resize-none"
                      data-testid="footer-input-message"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full mt-2 py-3.5 px-6 rounded-xl text-[0.8125rem] font-semibold tracking-[-0.005em] transition-all duration-300 group inline-flex items-center justify-center gap-2"
                    style={{
                      background: '#0d0f0e',                 /* carbón, no amarillo */
                      color: '#ffffff',                      /* etiqueta blanca sobre carbón */
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.background = '#000000';
                      e.currentTarget.style.transform = 'translateY(-1px)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background = '#0d0f0e';
                      e.currentTarget.style.transform = 'translateY(0)';
                    }}
                    data-testid="footer-submit-button"
                  >
                    Solicitar diagnóstico
                    <ArrowRight size={14} className="transition-transform duration-300 group-hover:translate-x-1" />
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════
          BANDA FOOTER · carbón profundo · nav + copyright
          ═══════════════════════════════════════════════════════ */}
      <div
        className="relative invertido with-grain"
        style={{ background: 'var(--carbon)' }}
      >
        {/* Top accent line — girasol tenue */}
        <div
          className="absolute top-0 left-0 right-0 h-px pointer-events-none"
          style={{
            background:
              'linear-gradient(90deg, transparent 0%, rgba(200, 232, 36,0.35) 50%, transparent 100%)',
          }}
        />

        <div className="container-main relative">

        {/* ===== DIVIDER + WORDMARK + NAV ===== */}
        <div
          ref={bottomRef}
          className={`pt-16 md:pt-20 pb-12 reveal ${bottomVisible ? 'revealed' : ''}`}
          style={{ borderTop: '1px solid rgba(255, 255, 255,0.08)' }}
        >
          {/* Wordmark del footer — sistema unificado con el navbar.
              Componente canónico <Wordmark />; el punto siempre es --brote,
              swaraya hereda color del contexto (.invertido → blanco). */}
          <div className="mb-12 md:mb-16">
            <Wordmark size="lg" data-testid="footer-wordmark" />
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
                  color: 'rgba(255, 255, 255, 0.60)',
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
                  color: 'rgba(255, 255, 255, 0.72)',
                  fontFamily: "'Inter', sans-serif",
                }}
              >
                Agencia de Inteligencia Aplicada. Destilamos el criterio de
                tu operación en sistemas que deciden con tu estándar.
              </p>

              {/* SEDE + DISPONIBILIDAD — trasladados aquí desde la banda de contacto */}
              <div
                className="mt-8 grid grid-cols-2 gap-x-6 gap-y-2 max-w-md"
                style={{ fontFamily: "'Inter', sans-serif" }}
                data-testid="footer-manifest-meta"
              >
                <div className="flex flex-col gap-1">
                  <span
                    style={{
                      fontSize: '0.6875rem',
                      letterSpacing: '0.24em',
                      textTransform: 'uppercase',
                      color: 'rgba(255, 255, 255, 0.55)',
                      fontWeight: 500,
                    }}
                  >
                    Sede
                  </span>
                  <span style={{ fontSize: '0.8125rem', color: 'rgba(255, 255, 255, 0.72)' }}>
                    Ciudad de México
                  </span>
                  <span style={{ fontSize: '0.75rem', color: 'rgba(255, 255, 255, 0.55)' }}>
                    LatAm + remoto
                  </span>
                </div>
                <div className="flex flex-col gap-1">
                  <span
                    style={{
                      fontSize: '0.6875rem',
                      letterSpacing: '0.24em',
                      textTransform: 'uppercase',
                      color: 'rgba(255, 255, 255, 0.55)',
                      fontWeight: 500,
                    }}
                  >
                    Disponibilidad
                  </span>
                  <span style={{ fontSize: '0.8125rem', color: 'rgba(255, 255, 255, 0.72)' }}>
                    Lun – Vie · 9:00 – 19:00
                  </span>
                  <span style={{ fontSize: '0.75rem', color: 'rgba(255, 255, 255, 0.55)' }}>
                    Respuesta en 24 h hábiles
                  </span>
                </div>
              </div>
            </div>

            {[
              {
                title: 'Trabajo',
                items: [
                  { label: 'Criterio', href: '/#criterio' },
                  { label: 'Agentes',  href: '/#agentes' },
                  { label: 'Método',   href: '/#metodo' },
                  { label: 'Panel',    href: '/#panel' },
                  { label: 'Contacto', href: '/#contacto' },
                ],
              },
              {
                title: 'Recursos',
                items: [
                  { label: 'Blog', href: '/blog' },
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
                    color: 'rgba(255, 255, 255, 0.60)',
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
                          style={{ color: 'rgba(255, 255, 255, 0.75)' }}
                        >
                          {item.label}
                        </a>
                      ) : (
                        <Link
                          href={item.href}
                          className="link-hover text-sm transition-colors"
                          style={{ color: 'rgba(255, 255, 255, 0.75)' }}
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
                  color: 'rgba(255, 255, 255, 0.60)',
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
                      {it.logo ? (
                        <img
                          src={it.logo}
                          alt={it.logoAlt || it.name}
                          style={{
                            height: `${it.footerHeightPx ?? 20}px`,
                            width: 'auto',
                            display: 'block',
                          }}
                        />
                      ) : (
                        <span
                          className="initiative-wordmark"
                          style={{
                            fontFamily: "'Cabinet Grotesk', sans-serif",
                            fontWeight: 500,
                            fontSize: '20px',
                            lineHeight: 1,
                            letterSpacing: '-0.02em',
                            color: '#ffffff',
                            textTransform: 'lowercase',
                            display: 'inline-block',
                          }}
                        >
                          {it.name}
                          <span aria-hidden="true" style={{ color: 'var(--brote)' }}>.</span>
                        </span>
                      )}
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
              color: 'rgba(255, 255, 255, 0.55)',
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
            }}
          >
            <span>© {year} swaraya, S. de R. L. de C. V.</span>
            <span>Agencia de Inteligencia Aplicada</span>
          </div>
        </div>
      </div>
      </div>

      {/* Local input styles */}
      <style jsx>{`
        /* Inputs sobre banda girasol — contraste dark ink */
        .contact-input {
          width: 100%;
          min-height: 44px;
          padding: 12px 14px;
          background: rgba(255, 255, 255, 0.35);
          border: 1px solid rgba(43, 30, 0, 0.35);
          border-radius: 10px;
          color: #0d0f0e;
          font-family: 'Inter', sans-serif;
          font-size: 0.9375rem;
          line-height: 1.4;
          transition: border-color 0.25s ease, background 0.25s ease, box-shadow 0.25s ease;
        }
        .contact-input::placeholder {
          color: rgba(43, 30, 0, 0.55);
        }
        .contact-input:focus {
          outline: none;
          border-color: #0d0f0e;
          background: rgba(255, 255, 255, 0.55);
          box-shadow: 0 0 0 3px rgba(43, 30, 0, 0.20);
        }

        /* Inputs sobre footer oscuro (por si algún día se usan) */
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
          color: #9aa0a8;                              /* 7.72:1 sobre #0d0f0e ✓ */
        }
        .footer-input:focus {
          outline: none;
          border-color: #c8e824;
          background: rgba(255, 255, 255,0.06);
          box-shadow: 0 0 0 3px rgba(200, 232, 36,0.25);
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
          outline: 2px solid #c8e824;
          outline-offset: 4px;
          border-radius: 4px;
        }
      `}</style>
    </footer>
  );
};

export default Footer;
