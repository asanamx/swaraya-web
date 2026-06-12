import { Geist, Space_Grotesk, Inter } from 'next/font/google';

// MOCK PAGE — Comparación tipográfica
// 3 sans con personalidad, mismo sistema visual

const geist = Geist({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-geist',
  display: 'swap',
});

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-space',
  display: 'swap',
});

const inter = Inter({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  variable: '--font-inter',
  display: 'swap',
});

export const metadata = {
  title: 'swaraya — typography comparison',
  robots: 'noindex',
};

function Mark({ size = 40, color = '#0E0F11', strokeWidth = 4 }) {
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

function Column({ id, name, foundry, charDesc, fontStack, headlineWeight = 500, italicSupport = false }) {
  const displayFont = fontStack;

  return (
    <div
      style={{
        background: '#FAF8F2',
        border: '1px solid #E5E0D5',
        borderRadius: 16,
        padding: '40px 32px',
        display: 'flex',
        flexDirection: 'column',
        gap: 0,
        minHeight: 760,
      }}
    >
      {/* Header de la columna */}
      <div
        style={{
          paddingBottom: 24,
          borderBottom: '1px solid #E5E0D5',
          marginBottom: 32,
        }}
      >
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: 8,
            fontFamily: 'var(--font-inter), system-ui, sans-serif',
          }}
        >
          <span
            style={{
              fontSize: 11,
              letterSpacing: '0.24em',
              textTransform: 'uppercase',
              color: '#2C3E80',
              fontWeight: 500,
            }}
          >
            Opción {id}
          </span>
          <span style={{ fontSize: 11, color: '#A39B85' }}>{foundry}</span>
        </div>
        <h2
          style={{
            fontFamily: displayFont,
            fontSize: 32,
            fontWeight: 600,
            letterSpacing: '-0.025em',
            color: '#0E0F11',
            margin: 0,
            lineHeight: 1.1,
          }}
        >
          {name}
        </h2>
        <p
          style={{
            fontFamily: 'var(--font-inter), system-ui, sans-serif',
            fontSize: 12,
            color: '#5D6878',
            margin: 0,
            marginTop: 6,
            lineHeight: 1.5,
          }}
        >
          {charDesc}
        </p>
      </div>

      {/* Wordmark mock */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 32 }}>
        <Mark size={32} color="#0E0F11" strokeWidth={4} />
        <span
          style={{
            fontFamily: displayFont,
            fontSize: 34,
            fontWeight: headlineWeight,
            letterSpacing: '-0.025em',
            color: '#0E0F11',
            lineHeight: 1,
          }}
        >
          swaraya
        </span>
      </div>

      {/* Eyebrow */}
      <div
        style={{
          fontSize: 11,
          letterSpacing: '0.28em',
          textTransform: 'uppercase',
          color: '#2C3E80',
          fontWeight: 500,
          marginBottom: 20,
          fontFamily: 'var(--font-inter), system-ui, sans-serif',
        }}
      >
        Agencia de I.A. Aplicada
      </div>

      {/* Headline */}
      <h1
        style={{
          fontFamily: displayFont,
          fontSize: 44,
          lineHeight: 1.02,
          letterSpacing: '-0.035em',
          fontWeight: headlineWeight,
          margin: 0,
          marginBottom: 24,
          color: '#0E0F11',
        }}
      >
        Investigación profunda.
        <br />
        <span
          style={{
            fontStyle: italicSupport ? 'italic' : 'normal',
            fontWeight: 400,
            color: '#5D6878',
          }}
        >
          Ingeniería precisa.
        </span>
        <br />
        <span style={{ color: '#2C3E80', fontWeight: headlineWeight }}>Inteligencia real.</span>
      </h1>

      {/* Body */}
      <p
        style={{
          fontFamily: 'var(--font-inter), system-ui, sans-serif',
          fontSize: 14,
          lineHeight: 1.6,
          color: '#5D6878',
          margin: 0,
          marginBottom: 32,
          maxWidth: '42ch',
        }}
      >
        Diseñamos sistemas para organizaciones que requieren ventaja estructural,
        no novedad. Investigada y diseñada.
      </p>

      {/* CTA + spec test */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 16, marginTop: 'auto' }}>
        <button
          style={{
            background: '#0E0F11',
            color: '#F5F2EC',
            padding: '13px 24px',
            borderRadius: 100,
            fontSize: 13,
            fontWeight: 500,
            letterSpacing: '0.005em',
            border: 'none',
            cursor: 'pointer',
            fontFamily: 'var(--font-inter), system-ui, sans-serif',
            alignSelf: 'flex-start',
          }}
        >
          Inicia una Conversación  →
        </button>

        {/* Mini-specimen */}
        <div
          style={{
            paddingTop: 24,
            borderTop: '1px dashed #E5E0D5',
            fontFamily: displayFont,
            color: '#0E0F11',
          }}
        >
          <div style={{ fontSize: 28, fontWeight: 700, letterSpacing: '-0.02em', lineHeight: 1 }}>
            Aa Bb Cc
          </div>
          <div style={{ fontSize: 13, fontWeight: 400, marginTop: 6, color: '#5D6878', fontFamily: 'var(--font-inter), system-ui, sans-serif', letterSpacing: '0.04em' }}>
            áéíóú ñ · 0123456789
          </div>
        </div>
      </div>
    </div>
  );
}

export default function TypographyComparison() {
  return (
    <>
      {/* Cabinet Grotesk vía Fontshare (no está en Google Fonts) */}
      <link
        rel="stylesheet"
        href="https://api.fontshare.com/v2/css?f[]=cabinet-grotesk@400,500,700&display=swap"
      />

      <div
        className={`${geist.variable} ${spaceGrotesk.variable} ${inter.variable}`}
        style={{
          background: '#F5F2EC',
          minHeight: '100vh',
          padding: '64px 48px',
          fontFamily: 'var(--font-inter), system-ui, sans-serif',
        }}
      >
        <div style={{ maxWidth: 1600, margin: '0 auto' }}>
          {/* Header */}
          <div style={{ marginBottom: 48 }}>
            <div
              style={{
                fontSize: 12,
                letterSpacing: '0.32em',
                textTransform: 'uppercase',
                color: '#2C3E80',
                fontWeight: 500,
                marginBottom: 14,
              }}
            >
              swaraya · comparación tipográfica
            </div>
            <h1
              style={{
                color: '#0E0F11',
                fontSize: 44,
                fontWeight: 600,
                letterSpacing: '-0.025em',
                margin: 0,
                lineHeight: 1.05,
              }}
            >
              Tres sans con personalidad — sin patitas.
            </h1>
            <p
              style={{
                color: '#5D6878',
                fontSize: 16,
                lineHeight: 1.55,
                maxWidth: '70ch',
                marginTop: 14,
              }}
            >
              Mismo sistema visual (paleta crema + indigo, layout idéntico, contenido idéntico).
              Solo cambia la tipografía. Compara la <em>voz</em> que cada una le da a la marca.
            </p>
          </div>

          {/* Las 3 columnas */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(3, 1fr)',
              gap: 28,
              alignItems: 'stretch',
            }}
          >
            <Column
              id="A"
              name="Geist"
              foundry="Vercel · Google Fonts · gratis"
              charDesc="Neutral-moderna, técnica, balance perfecto. La que usa Vercel en todos sus sitios."
              fontStack="var(--font-geist), system-ui, sans-serif"
              headlineWeight={600}
            />
            <Column
              id="B"
              name="Cabinet Grotesk"
              foundry="Indian Type Foundry · Fontshare · gratis"
              charDesc="Grotesque editorial con tensión geométrica sutil. Distintiva, casi nadie la usa en IA aún."
              fontStack="'Cabinet Grotesk', system-ui, sans-serif"
              headlineWeight={700}
            />
            <Column
              id="C"
              name="Space Grotesk"
              foundry="Florian Karsten · Google Fonts · gratis"
              charDesc="Geométrica con carácter, terminales abiertos. Personalidad fuerte, lectura institucional."
              fontStack="var(--font-space), system-ui, sans-serif"
              headlineWeight={500}
            />
          </div>

          {/* Recomendación */}
          <div
            style={{
              marginTop: 48,
              padding: 32,
              background: '#FAF8F2',
              border: '1px solid #E5E0D5',
              borderRadius: 16,
              display: 'grid',
              gridTemplateColumns: '180px 1fr',
              gap: 32,
              alignItems: 'start',
            }}
          >
            <div
              style={{
                fontSize: 12,
                letterSpacing: '0.28em',
                textTransform: 'uppercase',
                color: '#2C3E80',
                fontWeight: 500,
              }}
            >
              ◦  Mi pick honesto
            </div>
            <div style={{ color: '#0E0F11', fontSize: 15, lineHeight: 1.65 }}>
              <strong>Opción B — Cabinet Grotesk</strong> para display + Inter para body.
              <br />
              Razones: (1) es <em>distintiva</em> sin ser rara, (2) en español los acentos quedan limpios,
              (3) casi nadie la usa todavía en categoría IA = diferenciación real,
              (4) gratis comercial vía Fontshare, (5) tiene la "voz de pensamiento" que Fraunces da pero sin patitas.
              <br /><br />
              Si quieres jugar a lo seguro, <strong>Opción A — Geist</strong> (es Vercel, es estándar, es seguro).
              <br />
              Si quieres carácter geométrico fuerte, <strong>Opción C — Space Grotesk</strong>.
            </div>
          </div>

          {/* Top floating ribbon */}
          <div
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
              border: '1px solid rgba(14,15,17,0.08)',
              backdropFilter: 'blur(8px)',
            }}
          >
            Mock · Comparación tipográfica
          </div>
        </div>
      </div>
    </>
  );
}
