import { Fraunces, Inter } from 'next/font/google';
import Link from 'next/link';

// MOCK PAGE — Direction Preview
// Sistema editorial: Indigo + Fraunces (serif display) + Inter (body)
// Light-first, dark como excepción dramática (hero + footer)

const fraunces = Fraunces({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  style: ['normal', 'italic'],
  variable: '--font-fraunces',
  display: 'swap',
});

const inter = Inter({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  variable: '--font-inter',
  display: 'swap',
});

export const metadata = {
  title: 'swaraya — preview direction',
  robots: 'noindex',
};

// Mark inline (v5 AXIS) — usado como ancla compositiva en hero y otras secciones.
function Mark({ size = 64, color = 'currentColor', strokeWidth = 4 }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 64 64"
      width={size}
      height={size}
      style={{ display: 'block' }}
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

export default function PreviewDirection() {
  return (
    <div className={`${fraunces.variable} ${inter.variable}`} style={{ background: '#F5F2EC' }}>
      {/* ═══════════════════════════════════════════════════════════════ */}
      {/* 1. HERO — DARK editorial                                          */}
      {/* ═══════════════════════════════════════════════════════════════ */}
      <section
        style={{
          background: '#0E0F11',
          color: '#F5F2EC',
          minHeight: '100vh',
          position: 'relative',
          overflow: 'hidden',
          fontFamily: 'var(--font-inter), system-ui, sans-serif',
        }}
      >
        {/* Glow indigo eléctrico, sutil */}
        <div
          style={{
            position: 'absolute',
            top: '20%',
            right: '-10%',
            width: '60vw',
            height: '60vw',
            background: 'radial-gradient(circle, rgba(84,104,214,0.18) 0%, rgba(14,15,17,0) 60%)',
            filter: 'blur(40px)',
            pointerEvents: 'none',
          }}
        />

        {/* Navbar mock */}
        <header
          style={{
            position: 'relative',
            zIndex: 10,
            padding: '32px 80px',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
            <Mark size={28} color="#F5F2EC" strokeWidth={4} />
            <span
              style={{
                fontFamily: 'var(--font-fraunces), Georgia, serif',
                fontSize: 26,
                fontWeight: 500,
                letterSpacing: '-0.02em',
                color: '#F5F2EC',
              }}
            >
              swaraya
            </span>
          </div>
          <nav style={{ display: 'flex', gap: 36, fontSize: 14, color: '#9BA5B7', letterSpacing: '0.01em' }}>
            <a>Investigación</a>
            <a>Método</a>
            <a>Filosofía</a>
            <a>Blog</a>
            <a>Contacto</a>
          </nav>
          <button
            style={{
              background: '#5468D6',
              color: '#FFFFFF',
              padding: '10px 22px',
              borderRadius: 100,
              fontSize: 14,
              fontWeight: 500,
              letterSpacing: '0.01em',
              border: 'none',
              cursor: 'pointer',
            }}
          >
            Iniciar Diálogo
          </button>
        </header>

        {/* Hero content */}
        <div
          style={{
            position: 'relative',
            zIndex: 5,
            padding: '120px 80px 160px',
            maxWidth: 1400,
            margin: '0 auto',
          }}
        >
          <div
            style={{
              fontSize: 13,
              letterSpacing: '0.32em',
              textTransform: 'uppercase',
              color: '#5468D6',
              fontWeight: 500,
              marginBottom: 40,
            }}
          >
            ◦  Agencia de Inteligencia Artificial Aplicada
          </div>

          <h1
            style={{
              fontFamily: 'var(--font-fraunces), Georgia, serif',
              fontSize: 'clamp(64px, 7.5vw, 116px)',
              lineHeight: 0.98,
              letterSpacing: '-0.035em',
              fontWeight: 500,
              margin: 0,
              maxWidth: '14ch',
              color: '#F5F2EC',
            }}
          >
            Investigación profunda.
            <br />
            <span style={{ fontStyle: 'italic', fontWeight: 400, color: '#C8CCDC' }}>
              Ingeniería precisa.
            </span>
            <br />
            <span style={{ color: '#5468D6' }}>Inteligencia real.</span>
          </h1>

          <p
            style={{
              marginTop: 56,
              maxWidth: '52ch',
              fontSize: 19,
              lineHeight: 1.55,
              color: '#9BA5B7',
              fontFamily: 'var(--font-inter), system-ui, sans-serif',
            }}
          >
            Diseñamos sistemas de inteligencia artificial para organizaciones
            que requieren ventaja estructural, no novedad. Cada solución es una
            arquitectura precisa, investigada y diseñada.
          </p>

          <div style={{ display: 'flex', gap: 20, marginTop: 56, alignItems: 'center' }}>
            <button
              style={{
                background: '#F5F2EC',
                color: '#0E0F11',
                padding: '18px 32px',
                borderRadius: 100,
                fontSize: 15,
                fontWeight: 500,
                letterSpacing: '0.005em',
                border: 'none',
                cursor: 'pointer',
                fontFamily: 'var(--font-inter), system-ui, sans-serif',
              }}
            >
              Inicia una Conversación Estratégica  →
            </button>
            <button
              style={{
                background: 'transparent',
                color: '#F5F2EC',
                padding: '18px 32px',
                borderRadius: 100,
                fontSize: 15,
                fontWeight: 500,
                border: '1px solid rgba(245,242,236,0.2)',
                cursor: 'pointer',
                fontFamily: 'var(--font-inter), system-ui, sans-serif',
              }}
            >
              Ver nuestros Dominios
            </button>
          </div>
        </div>

        {/* Tech stack discreto al pie del hero */}
        <div
          style={{
            position: 'absolute',
            bottom: 56,
            left: 80,
            right: 80,
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            color: '#5D6878',
            fontSize: 12,
            letterSpacing: '0.16em',
            textTransform: 'uppercase',
            fontFamily: 'var(--font-inter), system-ui, sans-serif',
          }}
        >
          <span>Stack: Claude · OpenAI · Vercel · OpenClaw · Resend · Sanity</span>
          <span>↓  Continúa</span>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════ */}
      {/* 2. TRANSICIÓN dramática dark → crema                              */}
      {/* ═══════════════════════════════════════════════════════════════ */}
      <div
        style={{
          height: 120,
          background: 'linear-gradient(to bottom, #0E0F11 0%, #F5F2EC 100%)',
        }}
      />

      {/* ═══════════════════════════════════════════════════════════════ */}
      {/* 3. CONTENIDO — Light / editorial                                  */}
      {/* ═══════════════════════════════════════════════════════════════ */}
      <section
        style={{
          background: '#F5F2EC',
          color: '#0E0F11',
          padding: '120px 80px 160px',
          fontFamily: 'var(--font-inter), system-ui, sans-serif',
        }}
      >
        <div style={{ maxWidth: 1400, margin: '0 auto' }}>
          {/* Overline */}
          <div
            style={{
              fontSize: 13,
              letterSpacing: '0.32em',
              textTransform: 'uppercase',
              color: '#2C3E80',
              fontWeight: 500,
              marginBottom: 32,
              display: 'flex',
              alignItems: 'center',
              gap: 16,
            }}
          >
            <span style={{ width: 32, height: 1, background: '#2C3E80', opacity: 0.5 }} />
            Método
          </div>

          {/* Headline editorial */}
          <h2
            style={{
              fontFamily: 'var(--font-fraunces), Georgia, serif',
              fontSize: 'clamp(48px, 5.5vw, 86px)',
              lineHeight: 0.98,
              letterSpacing: '-0.03em',
              fontWeight: 500,
              margin: 0,
              maxWidth: '18ch',
              color: '#0E0F11',
            }}
          >
            Cuatro fases entre el problema
            <br />
            <span style={{ fontStyle: 'italic', color: '#2C3E80' }}>y el sistema.</span>
          </h2>

          <p
            style={{
              marginTop: 40,
              maxWidth: '56ch',
              fontSize: 19,
              lineHeight: 1.6,
              color: '#5D6878',
            }}
          >
            No empezamos por el modelo. Empezamos por la pregunta correcta. Cada
            engagement sigue una secuencia investigada: del diagnóstico al despliegue,
            sin atajos.
          </p>

          {/* Grid de fases */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(4, 1fr)',
              gap: 32,
              marginTop: 96,
            }}
          >
            {[
              {
                num: '01',
                title: 'Investigación',
                desc: 'Diagnóstico del dominio, mapeo de fricciones, identificación de la palanca real.',
              },
              {
                num: '02',
                title: 'Arquitectura',
                desc: 'Diseño del sistema: agentes, datos, integraciones, rutas de decisión.',
              },
              {
                num: '03',
                title: 'Ingeniería',
                desc: 'Implementación rigurosa con observabilidad, evaluación y guardrails.',
              },
              {
                num: '04',
                title: 'Operación',
                desc: 'Acompañamiento en producción: mejora continua y transferencia de capacidad.',
              },
            ].map((phase) => (
              <div
                key={phase.num}
                style={{
                  borderTop: '1px solid #D9D3C2',
                  paddingTop: 24,
                }}
              >
                <div
                  style={{
                    fontFamily: 'var(--font-fraunces), Georgia, serif',
                    fontSize: 14,
                    fontWeight: 500,
                    color: '#2C3E80',
                    letterSpacing: '0.04em',
                    marginBottom: 16,
                  }}
                >
                  {phase.num}
                </div>
                <h3
                  style={{
                    fontFamily: 'var(--font-fraunces), Georgia, serif',
                    fontSize: 26,
                    lineHeight: 1.1,
                    fontWeight: 500,
                    letterSpacing: '-0.015em',
                    margin: 0,
                    marginBottom: 14,
                    color: '#0E0F11',
                  }}
                >
                  {phase.title}
                </h3>
                <p
                  style={{
                    fontSize: 15,
                    lineHeight: 1.55,
                    color: '#5D6878',
                    margin: 0,
                  }}
                >
                  {phase.desc}
                </p>
              </div>
            ))}
          </div>

          {/* Quote / Filosofía */}
          <div
            style={{
              marginTop: 160,
              padding: '80px 0',
              borderTop: '1px solid #D9D3C2',
              borderBottom: '1px solid #D9D3C2',
              display: 'grid',
              gridTemplateColumns: '1fr 2fr',
              gap: 80,
              alignItems: 'start',
            }}
          >
            <div>
              <div
                style={{
                  fontSize: 13,
                  letterSpacing: '0.32em',
                  textTransform: 'uppercase',
                  color: '#2C3E80',
                  fontWeight: 500,
                }}
              >
                Filosofía
              </div>
            </div>
            <blockquote
              style={{
                margin: 0,
                fontFamily: 'var(--font-fraunces), Georgia, serif',
                fontSize: 'clamp(32px, 3.2vw, 48px)',
                lineHeight: 1.15,
                letterSpacing: '-0.022em',
                fontWeight: 400,
                fontStyle: 'italic',
                color: '#0E0F11',
              }}
            >
              "La inteligencia artificial no debería sustituir el pensamiento.
              Debería{' '}
              <span style={{ color: '#2C3E80', fontStyle: 'normal', fontWeight: 500 }}>
                amplificar el pensamiento profundo
              </span>{' '}
              de quien decide."
              <footer
                style={{
                  marginTop: 40,
                  fontSize: 14,
                  letterSpacing: '0.12em',
                  textTransform: 'uppercase',
                  fontFamily: 'var(--font-inter), system-ui, sans-serif',
                  fontStyle: 'normal',
                  color: '#5D6878',
                  fontWeight: 500,
                }}
              >
                — swaraya, principio rector
              </footer>
            </blockquote>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════ */}
      {/* 4. FOOTER — DARK con wordmark unificado                           */}
      {/* ═══════════════════════════════════════════════════════════════ */}
      <footer
        style={{
          background: '#0E0F11',
          color: '#F5F2EC',
          padding: '96px 80px 48px',
          fontFamily: 'var(--font-inter), system-ui, sans-serif',
        }}
      >
        <div style={{ maxWidth: 1400, margin: '0 auto' }}>
          {/* Wordmark gigante editorial */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 32, marginBottom: 80 }}>
            <Mark size={80} color="#F5F2EC" strokeWidth={3.5} />
            <span
              style={{
                fontFamily: 'var(--font-fraunces), Georgia, serif',
                fontSize: 'clamp(80px, 10vw, 160px)',
                fontWeight: 500,
                letterSpacing: '-0.04em',
                lineHeight: 1,
                color: '#F5F2EC',
              }}
            >
              swaraya
            </span>
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: '2fr 1fr 1fr 1fr',
              gap: 48,
              borderTop: '1px solid rgba(245,242,236,0.08)',
              paddingTop: 48,
            }}
          >
            <div>
              <p style={{ color: '#9BA5B7', fontSize: 15, lineHeight: 1.6, maxWidth: '36ch' }}>
                Agencia de inteligencia artificial aplicada. Diseñamos sistemas
                para organizaciones que requieren ventaja estructural.
              </p>
              <p style={{ color: '#5D6878', fontSize: 13, marginTop: 24 }}>
                hola@swaraya.ai · Ciudad de México
              </p>
            </div>
            {[
              { title: 'Trabajo', items: ['Investigación', 'Método', 'Filosofía'] },
              { title: 'Recursos', items: ['Blog', 'Casos', 'Manifiesto'] },
              { title: 'Legal', items: ['Privacidad', 'Términos'] },
            ].map((col) => (
              <div key={col.title}>
                <h4
                  style={{
                    fontSize: 12,
                    letterSpacing: '0.24em',
                    textTransform: 'uppercase',
                    color: '#5D6878',
                    fontWeight: 500,
                    marginBottom: 20,
                  }}
                >
                  {col.title}
                </h4>
                <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                  {col.items.map((item) => (
                    <li key={item} style={{ marginBottom: 12 }}>
                      <a
                        style={{
                          color: '#C8CCDC',
                          fontSize: 14,
                          textDecoration: 'none',
                        }}
                      >
                        {item}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div
            style={{
              marginTop: 80,
              paddingTop: 32,
              borderTop: '1px solid rgba(245,242,236,0.08)',
              display: 'flex',
              justifyContent: 'space-between',
              fontSize: 12,
              color: '#5D6878',
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
            }}
          >
            <span>© 2025 swaraya</span>
            <span>Inteligencia investigada y diseñada</span>
          </div>
        </div>
      </footer>

      {/* Top floating ribbon */}
      <Link
        href="/"
        style={{
          position: 'fixed',
          top: 16,
          left: '50%',
          transform: 'translateX(-50%)',
          zIndex: 50,
          background: 'rgba(245,242,236,0.95)',
          color: '#0E0F11',
          padding: '8px 18px',
          borderRadius: 100,
          fontSize: 12,
          fontWeight: 500,
          letterSpacing: '0.04em',
          textDecoration: 'none',
          fontFamily: 'var(--font-inter), system-ui, sans-serif',
          border: '1px solid rgba(14,15,17,0.08)',
          backdropFilter: 'blur(8px)',
        }}
      >
        Mock · Dirección visual propuesta · ← volver al sitio actual
      </Link>
    </div>
  );
}
