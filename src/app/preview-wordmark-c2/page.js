import { Inter, Khand } from 'next/font/google';

// MOCK PAGE — Comparación C-2: wordmark distintivo en minúsculas
// 4 candidatos para wordmark + Cabinet headlines + Inter body

const inter = Inter({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  variable: '--font-inter',
  display: 'swap',
});

const khand = Khand({
  subsets: ['latin'],
  weight: ['500', '600', '700'],
  variable: '--font-khand',
  display: 'swap',
});

export const metadata = {
  title: 'swaraya — wordmark candidates (C-2)',
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

function Candidate({
  id,
  name,
  foundry,
  charDesc,
  wordmarkFont,
  wordmarkWeight,
  wordmarkLetterSpacing = '-0.025em',
  wordmarkSize = 52,
  markSize = 44,
  pros,
}) {
  return (
    <div
      style={{
        background: '#FAF8F2',
        border: '1px solid #E5E0D5',
        borderRadius: 16,
        padding: '32px 28px',
        display: 'flex',
        flexDirection: 'column',
        gap: 0,
        minHeight: 720,
      }}
    >
      {/* Header de la candidate */}
      <div style={{ paddingBottom: 22, borderBottom: '1px solid #E5E0D5', marginBottom: 32 }}>
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: 8,
          }}
        >
          <span
            style={{
              fontSize: 10,
              letterSpacing: '0.26em',
              textTransform: 'uppercase',
              color: '#2C3E80',
              fontWeight: 500,
            }}
          >
            C-2 · Opción {id}
          </span>
        </div>
        <h2
          style={{
            fontFamily: 'var(--font-inter), system-ui, sans-serif',
            fontSize: 20,
            fontWeight: 600,
            letterSpacing: '-0.015em',
            color: '#0E0F11',
            margin: 0,
            lineHeight: 1.15,
          }}
        >
          {name}
        </h2>
        <div
          style={{
            fontSize: 10,
            color: '#A39B85',
            marginTop: 6,
            letterSpacing: '0.04em',
            textTransform: 'uppercase',
          }}
        >
          {foundry}
        </div>
        <p
          style={{
            fontSize: 12,
            color: '#5D6878',
            marginTop: 10,
            lineHeight: 1.55,
            marginBottom: 0,
          }}
        >
          {charDesc}
        </p>
      </div>

      {/* Wordmark — el item principal */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 28 }}>
        <Mark size={markSize} color="#0E0F11" strokeWidth={4} />
        <span
          style={{
            fontFamily: wordmarkFont,
            fontSize: wordmarkSize,
            fontWeight: wordmarkWeight,
            letterSpacing: wordmarkLetterSpacing,
            color: '#0E0F11',
            lineHeight: 1,
          }}
        >
          swaraya
        </span>
      </div>

      {/* Lockup mini (cómo se vería al 32px) */}
      <div
        style={{
          padding: '14px 18px',
          background: '#0E0F11',
          borderRadius: 10,
          display: 'flex',
          alignItems: 'center',
          gap: 12,
          marginBottom: 24,
          alignSelf: 'flex-start',
        }}
      >
        <Mark size={22} color="#F5F2EC" strokeWidth={4.5} />
        <span
          style={{
            fontFamily: wordmarkFont,
            fontSize: 24,
            fontWeight: wordmarkWeight,
            letterSpacing: wordmarkLetterSpacing,
            color: '#F5F2EC',
            lineHeight: 1,
          }}
        >
          swaraya
        </span>
      </div>

      {/* Test diacríticos */}
      <div style={{ fontSize: 11, color: '#A39B85', letterSpacing: '0.04em', marginBottom: 4, textTransform: 'uppercase' }}>
        Diacríticos
      </div>
      <div
        style={{
          fontFamily: wordmarkFont,
          fontSize: 28,
          fontWeight: wordmarkWeight,
          letterSpacing: wordmarkLetterSpacing,
          color: '#0E0F11',
          lineHeight: 1.1,
          marginBottom: 24,
        }}
      >
        áéíóú ñ
      </div>

      {/* Headline en Cabinet (constante) — para ver cómo se ve junto al wordmark */}
      <div style={{ fontSize: 11, color: '#A39B85', letterSpacing: '0.04em', marginBottom: 4, textTransform: 'uppercase' }}>
        Headline (Cabinet — fijo)
      </div>
      <h3
        style={{
          fontFamily: "'Cabinet Grotesk', sans-serif",
          fontSize: 26,
          lineHeight: 1.05,
          letterSpacing: '-0.025em',
          fontWeight: 500,
          margin: 0,
          marginBottom: 20,
          color: '#0E0F11',
        }}
      >
        Investigación profunda.
        <br />
        <span style={{ color: '#2C3E80' }}>Inteligencia real.</span>
      </h3>

      {/* Veredict */}
      <div
        style={{
          paddingTop: 18,
          borderTop: '1px dashed #D9D3C2',
          fontFamily: 'var(--font-inter), system-ui, sans-serif',
          fontSize: 12,
          color: '#5D6878',
          lineHeight: 1.65,
          marginTop: 'auto',
        }}
      >
        {pros}
      </div>
    </div>
  );
}

export default function WordmarkCandidatesC2() {
  return (
    <>
      <link
        rel="stylesheet"
        href="https://api.fontshare.com/v2/css?f[]=cabinet-grotesk@400,500,700&f[]=general-sans@500,700&f[]=author@500,700&f[]=switzer@700,800,900&display=swap"
      />

      <div
        className={`${inter.variable} ${khand.variable}`}
        style={{
          background: '#F5F2EC',
          minHeight: '100vh',
          padding: '56px 40px',
          fontFamily: 'var(--font-inter), system-ui, sans-serif',
        }}
      >
        <div style={{ maxWidth: 1800, margin: '0 auto' }}>
          {/* Intro */}
          <div style={{ marginBottom: 36 }}>
            <div
              style={{
                fontSize: 12,
                letterSpacing: '0.32em',
                textTransform: 'uppercase',
                color: '#2C3E80',
                fontWeight: 500,
                marginBottom: 12,
              }}
            >
              swaraya · wordmark candidates · C-2
            </div>
            <h1
              style={{
                color: '#0E0F11',
                fontSize: 42,
                fontWeight: 600,
                letterSpacing: '-0.025em',
                margin: 0,
                lineHeight: 1.05,
              }}
            >
              Cuatro wordmarks con personalidad — en minúsculas.
            </h1>
            <p
              style={{
                color: '#5D6878',
                fontSize: 16,
                lineHeight: 1.55,
                maxWidth: '76ch',
                marginTop: 12,
              }}
            >
              Headlines siempre en <strong>Cabinet Grotesk</strong>. Body siempre
              en <strong>Inter</strong>. Solo cambia la fuente del{' '}
              <em>wordmark</em>. Compara su voz y cómo se acopla con el
              sistema.
            </p>
          </div>

          {/* 4 columnas */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(4, 1fr)',
              gap: 22,
              alignItems: 'stretch',
            }}
          >
            <Candidate
              id="1"
              name="Khand Bold"
              foundry="Indian Type Foundry · Google Fonts"
              charDesc="Condensada con personalidad clara. Lectura institucional + carácter visible."
              wordmarkFont="var(--font-khand), sans-serif"
              wordmarkWeight={700}
              wordmarkLetterSpacing="-0.005em"
              wordmarkSize={62}
              pros={
                <>
                  <strong style={{ color: '#0E0F11' }}>+</strong> Condensada =
                  ocupa menos espacio horizontal. Bien en headers.
                  <br />
                  <strong style={{ color: '#0E0F11' }}>+</strong> Personalidad
                  distintiva sin ser experimental.
                  <br />
                  <strong style={{ color: '#C45A2C' }}>−</strong> Lee más
                  "deportiva" que "institucional".
                </>
              }
            />

            <Candidate
              id="2"
              name="General Sans Bold"
              foundry="Indian Type Foundry · Fontshare"
              charDesc="Geométrica con detalles humanistas. Lo que ChatGPT te propuso, ya pulida."
              wordmarkFont="'General Sans', sans-serif"
              wordmarkWeight={700}
              wordmarkLetterSpacing="-0.03em"
              wordmarkSize={54}
              pros={
                <>
                  <strong style={{ color: '#0E0F11' }}>+</strong> Letras redondas
                  y amigables sin perder seriedad.
                  <br />
                  <strong style={{ color: '#0E0F11' }}>+</strong> Probada en
                  marcas modernas (Fontshare flagship).
                  <br />
                  <strong style={{ color: '#C45A2C' }}>−</strong> Demasiado
                  popular = se confunde con docenas de startups.
                </>
              }
            />

            <Candidate
              id="3"
              name="Author Bold"
              foundry="ITF · Fontshare"
              charDesc="Geométrica clásica con tensión sutil. Letras anchas, autoritativas."
              wordmarkFont="'Author', sans-serif"
              wordmarkWeight={700}
              wordmarkLetterSpacing="-0.035em"
              wordmarkSize={54}
              pros={
                <>
                  <strong style={{ color: '#0E0F11' }}>+</strong> Lee como
                  "editorial moderno" — periódico digital.
                  <br />
                  <strong style={{ color: '#0E0F11' }}>+</strong> Buen contraste
                  con Cabinet en headlines.
                  <br />
                  <strong style={{ color: '#C45A2C' }}>−</strong> Las "a" tienen
                  un look específico que puede o no gustarte.
                </>
              }
            />

            <Candidate
              id="4"
              name="Switzer Black"
              foundry="ITF · Fontshare"
              charDesc="Neogrotesque moderna al peso máximo (900). Densidad máxima sin esfuerzo."
              wordmarkFont="'Switzer', sans-serif"
              wordmarkWeight={900}
              wordmarkLetterSpacing="-0.045em"
              wordmarkSize={54}
              pros={
                <>
                  <strong style={{ color: '#0E0F11' }}>+</strong> Máximo
                  contraste de peso vs Cabinet 500.
                  <br />
                  <strong style={{ color: '#0E0F11' }}>+</strong> Lee como
                  "presencia institucional" — pero moderna.
                  <br />
                  <strong style={{ color: '#C45A2C' }}>−</strong> Casi familia
                  visual con Cabinet — sutil contraste.
                </>
              }
            />
          </div>

          {/* Mi pick */}
          <div
            style={{
              marginTop: 40,
              padding: 32,
              background: '#0E0F11',
              borderRadius: 16,
              display: 'grid',
              gridTemplateColumns: '180px 1fr',
              gap: 28,
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
              <strong style={{ color: '#F5F2EC' }}>Opción 3 — Author Bold</strong>.
              <br /><br />
              Razones específicas para swaraya:
              <br />
              (1) Lee como <em>"editorial moderno"</em>, perfecto para una agencia que se posiciona como "investigación + ingeniería".
              <br />
              (2) Las letras anchas le dan{' '}
              <em>autoridad institucional</em> sin caer en cliché tech.
              <br />
              (3) Es <em>distinta</em> a Cabinet pero pertenece al mismo universo grotesque → coherencia sin redundancia.
              <br />
              (4) Casi nadie en categoría IA la usa → diferenciación real.
              <br /><br />
              <strong style={{ color: '#F5F2EC' }}>Plan B: Switzer Black (4)</strong>.
              Si lo que buscas es <em>presencia visual máxima</em> y no te importa que sea "primo" de Cabinet, Switzer 900 te da el wordmark más contundente.
            </div>
          </div>

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
            Mock · C-2 · Wordmark candidates (minúsculas)
          </div>
        </div>
      </div>
    </>
  );
}
