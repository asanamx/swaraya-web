'use client';

import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';

/**
 * LegalLayout — Contenedor compartido entre Aviso de Privacidad y Términos.
 * Estética editorial: cream, secciones numeradas "01, 02..." en dos columnas.
 */
export default function LegalLayout({
  eyebrow = 'Legal',
  title,
  subtitle,
  lastUpdated = '15 de junio de 2026',
  sections = [],
}) {
  return (
    <div className="min-h-screen bg-[#F5F2EC]" data-testid="legal-page">
      <Navbar />

      <main className="pt-28 md:pt-36 pb-20 md:pb-28">
        <div className="container-main">
          {/* Back link */}
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-[0.8125rem] text-[#5D6878] hover:text-[#2C3E80] transition-colors mb-12"
            data-testid="back-to-home"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            Volver al inicio
          </Link>

          {/* Header */}
          <header className="mb-16 md:mb-20 max-w-4xl">
            <p className="label-accent text-[#2C3E80] mb-6">{eyebrow}</p>
            <h1
              className="text-3xl md:text-5xl lg:text-[3.5rem] text-[#0E0F11] mb-6"
              style={{
                fontFamily: "'Cabinet Grotesk', sans-serif",
                fontWeight: 500,
                letterSpacing: '-0.035em',
                lineHeight: 1.04,
              }}
            >
              {title}
            </h1>
            {subtitle && (
              <p
                className="text-base md:text-lg text-[#5D6878] leading-relaxed max-w-[60ch] mb-6"
                style={{ fontWeight: 400 }}
              >
                {subtitle}
              </p>
            )}
            <p className="text-xs text-[#5D6878] tracking-[0.14em] uppercase">
              Última actualización · {lastUpdated}
            </p>
          </header>

          {/* Divider */}
          <div className="h-px bg-[rgba(14,15,17,0.10)] mb-16 md:mb-20" />

          {/* Sections */}
          <div className="space-y-16 md:space-y-20">
            {sections.map((s, i) => (
              <section
                key={s.id || i}
                id={s.id}
                className="grid grid-cols-12 gap-6 md:gap-10"
                data-testid={`legal-section-${s.number}`}
              >
                {/* Number column */}
                <div className="col-span-12 md:col-span-2">
                  <div
                    className="text-[#2C3E80] sticky top-24"
                    style={{
                      fontFamily: "'Cabinet Grotesk', sans-serif",
                      fontWeight: 300,
                      fontSize: 'clamp(2rem, 4vw, 3rem)',
                      letterSpacing: '-0.04em',
                      lineHeight: 1,
                    }}
                  >
                    {s.number}
                  </div>
                </div>

                {/* Content column */}
                <div className="col-span-12 md:col-span-10 max-w-3xl">
                  <h2
                    className="text-xl md:text-2xl lg:text-[1.625rem] text-[#0E0F11] mb-6"
                    style={{
                      fontFamily: "'Cabinet Grotesk', sans-serif",
                      fontWeight: 500,
                      letterSpacing: '-0.022em',
                      lineHeight: 1.2,
                    }}
                  >
                    {s.title}
                  </h2>
                  <div className="prose-legal text-[#3C4654] text-[0.9375rem] md:text-base leading-[1.75] space-y-4">
                    {s.body}
                  </div>
                </div>
              </section>
            ))}
          </div>
        </div>
      </main>

      <Footer />

      {/* Estilos para los bloques de prosa legal */}
      <style jsx global>{`
        .prose-legal p {
          margin: 0;
        }
        .prose-legal p + p {
          margin-top: 1em;
        }
        .prose-legal strong {
          color: #0E0F11;
          font-weight: 600;
        }
        .prose-legal a {
          color: #2C3E80;
          text-decoration: underline;
          text-decoration-thickness: 1px;
          text-underline-offset: 3px;
          transition: color 0.2s ease;
        }
        .prose-legal a:hover {
          color: #5468D6;
        }
        .prose-legal ul {
          list-style: none;
          padding-left: 0;
          display: flex;
          flex-direction: column;
          gap: 0.625rem;
        }
        .prose-legal ul li {
          position: relative;
          padding-left: 1.5rem;
        }
        .prose-legal ul li::before {
          content: '';
          position: absolute;
          left: 0;
          top: 0.7em;
          width: 0.5rem;
          height: 1px;
          background: #2C3E80;
        }
        .prose-legal .sublabel {
          display: inline-block;
          font-size: 0.6875rem;
          font-weight: 500;
          letter-spacing: 0.16em;
          text-transform: uppercase;
          color: #2C3E80;
          margin-bottom: 0.75rem;
          margin-top: 1rem;
        }
      `}</style>
    </div>
  );
}
