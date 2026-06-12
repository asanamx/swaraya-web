import { Inter } from 'next/font/google';

// MOCK PAGE — Author en 3 pesos, en 3 contextos reales (nav / hero / footer)

const inter = Inter({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  variable: '--font-inter',
  display: 'swap',
});

export const metadata = {
  title: 'swaraya — Author weights',
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

function WeightRow({ weight, label, recommendation }) {
  const wordmarkFont = "'Author', sans-serif";
  const tracking = weight === 500 ? '-0.025em' : weight === 600 ? '-0.03em' : '-0.035em';

  return (
    <div
      style={{
        background: '#FAF8F2',
        border: '1px solid #E5E0D5',
        borderRadius: 16,
        marginBottom: 20,
        overflow: 'hidden',
      }}
    >
      {/* Label */}
      <div
        style={{
          padding: '20px 32px',
          borderBottom: '1px solid #E5E0D5',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          background: '#FFFFFF',
        }}
      >
        <div>
          <div
            style={{
              fontSize: 11,
              letterSpacing: '0.28em',
              textTransform: 'uppercase',
              color: '#2C3E80',
              fontWeight: 500,
            }}
          >
            Author · weight {weight}
          </div>
          <div
            style={{
              fontSize: 18,
              fontWeight: 600,
              color: '#0E0F11',
              marginTop: 4,
              letterSpacing: '-0.01em',
            }}
          >
            {label}
          </div>
        </div>
        <div
          style={{
            fontSize: 12,
            color: recommendation === 'pick' ? '#2C3E80' : '#A39B85',
            fontWeight: 500,
            letterSpacing: '0.04em',
            padding: '6px 14px',
            border: `1px solid ${recommendation === 'pick' ? '#2C3E80' : '#E5E0D5'}`,
            borderRadius: 100,
            background: recommendation === 'pick' ? 'rgba(44,62,128,0.06)' : 'transparent',
          }}
        >
          {recommendation === 'pick' ? '◦ Mi pick' : recommendation}
        </div>
      </div>

      {/* Tres contextos */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1.5fr 1.2fr',
          alignItems: 'center',
          background: '#FAF8F2',
        }}
      >
        {/* Context 1: Navbar (small) */}
        <div
          style={{
            padding: '36px 32px',
            borderRight: '1px solid #E5E0D5',
            minHeight: 200,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
          }}
        >
          <div
            style={{
              fontSize: 10,
              letterSpacing: '0.28em',
              textTransform: 'uppercase',
              color: '#A39B85',
              fontWeight: 500,
            }}
          >
            Navbar · 28px
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
            <Mark size={26} color="#0E0F11" strokeWidth={4} />
            <span
              style={{
                fontFamily: wordmarkFont,
                fontSize: 28,
                fontWeight: weight,
                letterSpacing: tracking,
                color: '#0E0F11',
                lineHeight: 1,
              }}
            >
              swaraya
            </span>
          </div>
          <div style={{ fontSize: 11, color: '#5D6878', marginTop: 8 }}>
            Header del sitio. Co-existiendo con nav links en Inter.
          </div>
        </div>

        {/* Context 2: Hero (medium-large) */}
        <div
          style={{
            padding: '40px 32px',
            borderRight: '1px solid #E5E0D5',
            background: '#0E0F11',
            color: '#F5F2EC',
            minHeight: 200,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
          }}
        >
          <div
            style={{
              fontSize: 10,
              letterSpacing: '0.28em',
              textTransform: 'uppercase',
              color: '#5468D6',
              fontWeight: 500,
            }}
          >
            Hero dark · 72px
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 22 }}>
            <Mark size={64} color="#F5F2EC" strokeWidth={4} />
            <span
              style={{
                fontFamily: wordmarkFont,
                fontSize: 72,
                fontWeight: weight,
                letterSpacing: tracking,
                color: '#F5F2EC',
                lineHeight: 1,
              }}
            >
              swaraya
            </span>
          </div>
          <div style={{ fontSize: 11, color: '#9BA5B7', marginTop: 8 }}>
            Footer dark · OG image · presentaciones.
          </div>
        </div>

        {/* Context 3: Footer XXL (display) */}
        <div
          style={{
            padding: '40px 32px',
            minHeight: 200,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
          }}
        >
          <div
            style={{
              fontSize: 10,
              letterSpacing: '0.28em',
              textTransform: 'uppercase',
              color: '#A39B85',
              fontWeight: 500,
            }}
          >
            Display · 100px
          </div>
          <span
            style={{
              fontFamily: wordmarkFont,
              fontSize: 100,
              fontWeight: weight,
              letterSpacing: tracking,
              color: '#0E0F11',
              lineHeight: 0.95,
            }}
          >
            swaraya
          </span>
          <div style={{ fontSize: 11, color: '#5D6878', marginTop: 8 }}>
            Footer gigante · hero secundario · pieza editorial.
          </div>
        </div>
      </div>
    </div>
  );
}

export default function AuthorWeights() {
  return (
    <>
      <link
        rel="stylesheet"
        href="https://api.fontshare.com/v2/css?f[]=author@500,600,700&display=swap"
      />

      <div
        className={inter.variable}
        style={{
          background: '#F5F2EC',
          minHeight: '100vh',
          padding: '56px 40px',
          fontFamily: 'var(--font-inter), system-ui, sans-serif',
        }}
      >
        <div style={{ maxWidth: 1700, margin: '0 auto' }}>
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
              swaraya · author en 3 pesos · 3 contextos
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
              ¿Qué peso te late?
            </h1>
            <p
              style={{
                color: '#5D6878',
                fontSize: 16,
                lineHeight: 1.55,
                maxWidth: '70ch',
                marginTop: 12,
              }}
            >
              Tres pesos de Author (Medium 500, Semibold 600, Bold 700) en
              los tres tamaños reales del sitio. Mira cuál se siente mejor
              <em> a cada escala</em> — sobre todo el navbar (donde debe leer
              con autoridad sin pesar mucho).
            </p>
          </div>

          <WeightRow
            weight={500}
            label="Medium — refinada, lectura editorial cómoda"
            recommendation="ligero"
          />
          <WeightRow
            weight={600}
            label="Semibold — el sweet spot · presencia sin densidad"
            recommendation="pick"
          />
          <WeightRow
            weight={700}
            label="Bold — máxima presencia (lo que viste antes)"
            recommendation="contundente"
          />

          {/* Mi pick refinado */}
          <div
            style={{
              marginTop: 36,
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
              ◦  Mi pick refinado
            </div>
            <div style={{ fontSize: 15, lineHeight: 1.7, color: '#C8CCDC' }}>
              <strong style={{ color: '#F5F2EC' }}>Author Semibold (600)</strong> — el sweet spot.
              <br /><br />
              Razones:
              <br />
              (1) En <strong>navbar</strong> (28px) lee con presencia sin gritar — Bold a este tamaño se ve compacto, Medium se ve débil; 600 está perfecto.
              <br />
              (2) En <strong>hero</strong> (72px) tiene la autoridad institucional que querías, sin caer en "logo gritando".
              <br />
              (3) En <strong>display gigante</strong> (100px+) los espacios blancos entre letras respiran mejor que en Bold.
              <br />
              (4) Es <em>el peso editorial moderno</em>: lo usan Stripe, Notion, Anthropic en headlines.
              <br /><br />
              <strong style={{ color: '#F5F2EC' }}>Si te late más contundente:</strong> usa Bold (700) — válido, solo más editorial-pesado.
              <br />
              <strong style={{ color: '#F5F2EC' }}>Si te late más refinado:</strong> usa Medium (500) — válido, más sutil, pero arriesga "no se nota" en navbar.
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
            Mock · Author weights
          </div>
        </div>
      </div>
    </>
  );
}
