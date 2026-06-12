'use client';

import Link from 'next/link';
import useScrollReveal from '../hooks/useScrollReveal';

// Inline AXIS mark
function AxisMark({ size = 64, color = '#F5F2EC', strokeWidth = 3.5 }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 64 64"
      width={size}
      height={size}
      style={{ display: 'block', flexShrink: 0 }}
      aria-hidden="true"
    >
      <g stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" fill="none">
        <line x1="32" y1="10" x2="32" y2="24" />
        <line x1="32" y1="40" x2="32" y2="54" />
        <line x1="10" y1="32" x2="24" y2="32" />
        <line x1="40" y1="32" x2="54" y2="32" />
        <line x1="44.5" y1="19.5" x2="50" y2="14" />
      </g>
    </svg>
  );
}

export const Footer = () => {
  const [footerRef, isVisible] = useScrollReveal({ threshold: 0.2 });
  const year = new Date().getFullYear();

  return (
    <footer
      ref={footerRef}
      className={`relative dark-mode reveal ${isVisible ? 'revealed' : ''}`}
      style={{ background: '#0E0F11', color: '#F5F2EC' }}
      data-testid="footer"
    >
      {/* Indigo glow sutil */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 60% 50% at 20% 30%, rgba(84,104,214,0.10) 0%, transparent 60%)',
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

      <div className="container-main relative py-20 md:py-24 lg:py-32">
        {/* Wordmark gigante editorial */}
        <div className="flex items-center gap-5 md:gap-8 mb-16 md:mb-20">
          <AxisMark size={56} color="#F5F2EC" strokeWidth={3.5} />
          <span
            style={{
              fontFamily: "'Author', sans-serif",
              fontWeight: 600,
              letterSpacing: '-0.04em',
              fontSize: 'clamp(4rem, 12vw, 11rem)',
              lineHeight: 1,
              color: '#F5F2EC',
            }}
          >
            swaraya
          </span>
        </div>

        {/* Grid de columnas */}
        <div
          className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 pt-12 md:pt-16"
          style={{ borderTop: '1px solid rgba(245,242,236,0.08)' }}
        >
          {/* Brand column */}
          <div className="lg:col-span-5">
            <p
              style={{
                fontSize: '0.9375rem',
                lineHeight: 1.65,
                color: '#C8CCDC',
                maxWidth: '36ch',
                fontFamily: "'Inter', sans-serif",
              }}
            >
              Agencia de inteligencia artificial aplicada. Diseñamos sistemas
              para organizaciones que requieren ventaja estructural —
              investigada y diseñada.
            </p>
            <div className="mt-8 flex flex-col gap-2 text-sm" style={{ color: '#9BA5B7' }}>
              <a href="mailto:hola@swaraya.ai" className="link-hover" style={{ color: '#9BA5B7' }}>
                hola@swaraya.ai
              </a>
              <span>Ciudad de México</span>
            </div>
          </div>

          {/* Nav columns */}
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
                { label: 'Contacto', href: '/#contact' },
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
            <div key={col.title} className="lg:col-span-2">
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

          {/* CTA column */}
          <div className="lg:col-span-1">
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
              Acción
            </h4>
            <Link
              href="/#contact"
              className="link-hover text-sm transition-colors"
              style={{ color: '#5468D6', fontWeight: 500 }}
            >
              Iniciar Diálogo →
            </Link>
          </div>
        </div>

        {/* Bottom row */}
        <div
          className="mt-20 md:mt-24 pt-8 flex flex-col md:flex-row justify-between gap-4 text-xs"
          style={{
            borderTop: '1px solid rgba(245,242,236,0.06)',
            color: '#5D6878',
            letterSpacing: '0.08em',
            textTransform: 'uppercase',
          }}
        >
          <span>© {year} swaraya</span>
          <span>Inteligencia investigada y diseñada</span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
