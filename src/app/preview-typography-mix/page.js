import { Inter } from 'next/font/google';

// MOCK PAGE — Comparación de MEZCLAS tipográficas (wordmark vs body)
// Tres direcciones: misma fuente para todo, dos fuentes, tres fuentes.

const inter = Inter({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  variable: '--font-inter',
  display: 'swap',
});

export const metadata = {
  title: 'swaraya — typography mix comparison',
  robots: 'noindex',
};

function Mark({ size = 32, color = '#0E0F11', strokeWidth = 4 }) {
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

function MixColumn({
  id,
  title,
  badge,
  spec,
  wordmarkFont,
  wordmarkWeight,
  wordmarkLetterSpacing,
  displayFont,
  displayWeight,
  proAndCons,
}) {
  return (
    <div
      style={{
        background: '#FAF8F2',
        border: '1px solid #E5E0D5',
        borderRadius: 16,
        padding: '36px 32px',
        display: 'flex',
        flexDirection: 'column',
        gap: 0,
        minHeight: 800,
      }}
    >
      {/* Header de la columna */}
      <div style={{ paddingBottom: 22, borderBottom: '1px solid #E5E0D5', marginBottom: 32 }}>
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: 10,
          }}
        >
          <span
            style={{
              fontSize: 10,
              letterSpacing: '0.28em',
              textTransform: 'uppercase',
              color: '#2C3E80',
              fontWeight: 500,
            }}
          >
            MEZCLA {id}
          </span>
          <span
            style={{
              fontSize: 10,
              letterSpacing: '0.04em',
              padding: '4px 10px',
              borderRadius: 100,
              background: '#E5E0D5',
              color: '#5D6878',
              fontWeight: 500,
            }}
          >
            {badge}
          </span>
        </div>
        <h2
          style={{
            fontFamily: 'var(--font-inter), system-ui, sans-serif',
            fontSize: 22,
            fontWeight: 600,
            letterSpacing: '-0.02em',
            color: '#0E0F11',
            margin: 0,
            lineHeight: 1.15,
          }}
        >
          {title}
        </h2>
        <div
          style={{
            fontFamily: 'var(--font-inter), system-ui, sans-serif',
            fontSize: 11,
            color: '#A39B85',
            marginTop: 8,
            lineHeight: 1.6,
            letterSpacing: '0.02em',
          }}
        >
          {spec}
        </div>
      </div>

      {/* Wordmark GIGANTE — el corazón de cada mezcla */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 36 }}>
        <Mark size={48} color="#0E0F11" strokeWidth={4} />
        <span
          style={{
            fontFamily: wordmarkFont,
            fontSize: 56,
            fontWeight: wordmarkWeight,
            letterSpacing: wordmarkLetterSpacing,
            color: '#0E0F11',
            lineHeight: 1,
          }}
        >
          swaraya
        </span>
      </div>

      {/* Headline (display) */}
      <div
        style={{
          fontSize: 10,
          letterSpacing: '0.28em',
          textTransform: 'uppercase',
          color: '#2C3E80',
          fontWeight: 500,
          marginBottom: 14,
          fontFamily: 'var(--font-inter), system-ui, sans-serif',
        }}
      >
        Headline · display
      </div>
      <h1
        style={{
          fontFamily: displayFont,
          fontSize: 38,
          lineHeight: 1.03,
          letterSpacing: '-0.03em',
          fontWeight: displayWeight,
          margin: 0,
          marginBottom: 28,
          color: '#0E0F11',
        }}
      >
        Investigación profunda.
        <br />
        <span style={{ color: '#2C3E80' }}>Inteligencia real.</span>
      </h1>

      {/* Body */}
      <div
        style={{
          fontSize: 10,
          letterSpacing: '0.28em',
          textTransform: 'uppercase',
          color: '#2C3E80',
          fontWeight: 500,
          marginBottom: 10,
          fontFamily: 'var(--font-inter), system-ui, sans-serif',
        }}
      >
        Body · texto
      </div>
      <p
        style={{
          fontFamily: 'var(--font-inter), system-ui, sans-serif',
          fontSize: 14,
          lineHeight: 1.6,
          color: '#5D6878',
          margin: 0,
          marginBottom: 28,
          maxWidth: '42ch',
        }}
      >
        Diseñamos sistemas de IA para organizaciones que requieren ventaja
        estructural, no novedad. Investigada y diseñada.
      </p>

      {/* Pros & cons */}
      <div
        style={{
          paddingTop: 20,
          borderTop: '1px dashed #D9D3C2',
          fontFamily: 'var(--font-inter), system-ui, sans-serif',
          fontSize: 12,
          color: '#5D6878',
          lineHeight: 1.6,
          marginTop: 'auto',
        }}
      >
        {proAndCons}
      </div>
    </div>
  );
}

export default function TypographyMixComparison() {
  return (
    <>
      {/* Fonts: Cabinet Grotesk, Boldonse, General Sans, Switzer — todo Fontshare */}
      <link
        rel="stylesheet"
        href="https://api.fontshare.com/v2/css?f[]=cabinet-grotesk@400,500,700,800&f[]=tanker@400&f[]=erode@400,500,700&display=swap"
      />

      <div
        className={inter.variable}
        style={{
          background: '#F5F2EC',
          minHeight: '100vh',
          padding: '64px 48px',
          fontFamily: 'var(--font-inter), system-ui, sans-serif',
        }}
      >
        <div style={{ maxWidth: 1600, margin: '0 auto' }}>
          {/* Intro */}
          <div style={{ marginBottom: 40 }}>
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
              swaraya · mezclas tipográficas
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
              ¿Mismo tipo o mezclar?
            </h1>
            <p
              style={{
                color: '#5D6878',
                fontSize: 16,
                lineHeight: 1.55,
                maxWidth: '78ch',
                marginTop: 14,
              }}
            >
              Tres estrategias de mezcla. Misma paleta. Mismo contenido. Mismo
              tamaño. Solo cambia <em>cuánta personalidad</em> tiene el wordmark
              respecto al cuerpo del sitio.
            </p>
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(3, 1fr)',
              gap: 28,
              alignItems: 'stretch',
            }}
          >
            {/* MIX A — MONOSISTEMA */}
            <MixColumn
              id="A"
              title="Una sola voz."
              badge="Mono-fuente"
              spec="Wordmark + Display + Body en la misma familia (Cabinet Grotesk, diferentes pesos)."
              wordmarkFont="'Cabinet Grotesk', sans-serif"
              wordmarkWeight={700}
              wordmarkLetterSpacing="-0.035em"
              displayFont="'Cabinet Grotesk', sans-serif"
              displayWeight={500}
              proAndCons={
                <>
                  <strong style={{ color: '#0E0F11' }}>+</strong> Coherencia
                  absoluta, fácil de mantener.
                  <br />
                  <strong style={{ color: '#0E0F11' }}>+</strong> Lo más simple
                  técnicamente.
                  <br />
                  <strong style={{ color: '#C45A2C' }}>−</strong> El wordmark se
                  confunde visualmente con los headlines.
                  <br />
                  <strong style={{ color: '#C45A2C' }}>−</strong> Marca menos
                  memorable.
                  <br />
                  <em style={{ display: 'block', marginTop: 10, color: '#A39B85' }}>
                    Pensar: Vercel, Apple, OpenAI
                  </em>
                </>
              }
            />

            {/* MIX B — DOS-TIER (el "estándar bueno") */}
            <MixColumn
              id="B"
              title="Dos niveles."
              badge="Identidad + utilidad"
              spec="Wordmark + Display en Cabinet Grotesk Bold. Body en Inter. La pareja más probada."
              wordmarkFont="'Cabinet Grotesk', sans-serif"
              wordmarkWeight={800}
              wordmarkLetterSpacing="-0.04em"
              displayFont="'Cabinet Grotesk', sans-serif"
              displayWeight={500}
              proAndCons={
                <>
                  <strong style={{ color: '#0E0F11' }}>+</strong> Balance ideal
                  entre identidad y legibilidad.
                  <br />
                  <strong style={{ color: '#0E0F11' }}>+</strong> Solo 2 fuentes
                  = más liviano y disciplinado.
                  <br />
                  <strong style={{ color: '#0E0F11' }}>+</strong> El wordmark{' '}
                  <em>destaca</em> del cuerpo, pero pertenece.
                  <br />
                  <strong style={{ color: '#C45A2C' }}>−</strong> Wordmark y
                  headlines comparten familia.
                  <br />
                  <em style={{ display: 'block', marginTop: 10, color: '#A39B85' }}>
                    Pensar: Linear, Anthropic
                  </em>
                </>
              }
            />

            {/* MIX C — TRES-TIER (max identidad) */}
            <MixColumn
              id="C"
              title="Wordmark distintivo."
              badge="3 fuentes · max identidad"
              spec="Wordmark en Tanker (display único, denso). Headlines en Cabinet Grotesk. Body en Inter."
              wordmarkFont="'Tanker', sans-serif"
              wordmarkWeight={400}
              wordmarkLetterSpacing="0.005em"
              displayFont="'Cabinet Grotesk', sans-serif"
              displayWeight={500}
              proAndCons={
                <>
                  <strong style={{ color: '#0E0F11' }}>+</strong> Wordmark
                  inmediatamente reconocible y único.
                  <br />
                  <strong style={{ color: '#0E0F11' }}>+</strong> Sistema rico:
                  identidad / contenido / lectura, cada uno con su voz.
                  <br />
                  <strong style={{ color: '#0E0F11' }}>+</strong> Diferenciación
                  máxima en categoría IA.
                  <br />
                  <strong style={{ color: '#C45A2C' }}>−</strong> Requiere
                  disciplina para no mezclar contextos.
                  <br />
                  <strong style={{ color: '#C45A2C' }}>−</strong> 3 fuentes a
                  cargar (todas free, mínimo overhead).
                  <br />
                  <em style={{ display: 'block', marginTop: 10, color: '#A39B85' }}>
                    Pensar: Stripe, The Economist, Notion
                  </em>
                </>
              }
            />
          </div>

          {/* Mi pick */}
          <div
            style={{
              marginTop: 48,
              padding: 32,
              background: '#0E0F11',
              borderRadius: 16,
              display: 'grid',
              gridTemplateColumns: '200px 1fr',
              gap: 32,
              alignItems: 'start',
              color: '#F5F2EC',
            }}
          >
            <div
              style={{
                fontSize: 12,
                letterSpacing: '0.28em',
                textTransform: 'uppercase',
                color: '#5468D6',
                fontWeight: 500,
              }}
            >
              ◦  Mi pick honesto
            </div>
            <div style={{ fontSize: 15, lineHeight: 1.65, color: '#C8CCDC' }}>
              <strong style={{ color: '#F5F2EC' }}>Mezcla B</strong> es el
              <em> default</em> correcto para casi cualquier marca seria.
              <br /><br />
              Pero para <strong style={{ color: '#F5F2EC' }}>swaraya</strong>,
              que está naciendo y necesita memorabilidad alta en una categoría
              saturada (IA), te recomiendo{' '}
              <strong style={{ color: '#F5F2EC' }}>Mezcla C</strong>: invertir
              el costo gráfico en hacer que el wordmark sea inolvidable, mientras
              el contenido vive en tipografías neutras y eficientes.
              <br /><br />
              La asimetría wordmark↔body es lo que distingue marcas{' '}
              <em>diseñadas</em> de marcas <em>renderizadas</em>.
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
            Mock · Mezclas tipográficas
          </div>
        </div>
      </div>
    </>
  );
}
