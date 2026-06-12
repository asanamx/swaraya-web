// Página interna SOLO para preview visual de las propuestas de símbolo.
// No está enlazada desde el sitio público. Sirve para que el usuario
// (y el LLM) puedan comparar las tres opciones lado a lado.

export const metadata = { title: 'swaraya marks — preview', robots: 'noindex' };

function Card({ title, subtitle, src, scale = 1 }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <div
        style={{
          background: '#05060A',
          border: '1px solid #1A1F2B',
          borderRadius: 24,
          padding: 48,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          aspectRatio: '1 / 1',
        }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={src} alt={title} style={{ width: 220 * scale, height: 220 * scale }} />
      </div>
      <div>
        <div style={{ color: '#F4F6F9', fontSize: 18, fontWeight: 600, letterSpacing: '-0.01em' }}>{title}</div>
        <div style={{ color: '#9BA5B7', fontSize: 14, marginTop: 4 }}>{subtitle}</div>
      </div>
      {/* Mini-row: tamaños reales de uso */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 18, paddingTop: 6 }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={src} alt="" style={{ width: 64, height: 64 }} />
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={src} alt="" style={{ width: 32, height: 32 }} />
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={src} alt="" style={{ width: 16, height: 16 }} />
        <span style={{ color: '#5D6878', fontSize: 12 }}>64 · 32 · 16 px</span>
      </div>
    </div>
  );
}

export default function MarksPreview() {
  return (
    <main
      style={{
        minHeight: '100vh',
        background: '#0B0F19',
        padding: '64px 48px',
        fontFamily: 'Inter, system-ui, sans-serif',
      }}
    >
      <div style={{ maxWidth: 1280, margin: '0 auto' }}>
        <div style={{ marginBottom: 48 }}>
          <div
            style={{
              color: '#7AC4E0',
              fontSize: 13,
              letterSpacing: '0.28em',
              textTransform: 'uppercase',
              marginBottom: 12,
            }}
          >
            swaraya · símbolos
          </div>
          <h1
            style={{
              color: '#F4F6F9',
              fontSize: 40,
              fontWeight: 600,
              letterSpacing: '-0.02em',
              margin: 0,
            }}
          >
            Propuestas de símbolo standalone
          </h1>
          <p style={{ color: '#9BA5B7', fontSize: 16, lineHeight: 1.5, maxWidth: 720, marginTop: 12 }}>
            Tres direcciones conceptuales, todas en coherencia con la paleta actual del sitio
            (<code style={{ color: '#7AC4E0' }}>#05060A</code> + <code style={{ color: '#7AC4E0' }}>#F4F6F9</code> + acento <code style={{ color: '#7AC4E0' }}>#7AC4E0</code>).
          </p>
        </div>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: 32,
          }}
        >
          <Card
            title="v1 — Synapse"
            subtitle="s trazada como curva continua con nodo de acento cyan. Conecta con la red neuronal del hero."
            src="/logo-mark-v1-synapse.svg"
          />
          <Card
            title="v2 — Precision"
            subtitle="s geométrica seccionada por una línea precisa. Investigación + ingeniería como dos mitades alineadas."
            src="/logo-mark-v2-precision.svg"
          />
          <Card
            title="v3 — Monogram"
            subtitle="App icon institucional con contenedor cuadrado. Ideal para favicon y avatares de redes."
            src="/logo-mark-v3-monogram.svg"
          />
        </div>
      </div>
    </main>
  );
}
