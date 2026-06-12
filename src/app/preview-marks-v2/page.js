// Página interna SOLO para preview visual de los símbolos (estilo Anthropic).
// No indexada, no enlazada desde el sitio público.

export const metadata = { title: 'swaraya marks v2 — preview', robots: 'noindex' };

function Card({ title, subtitle, src }) {
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
        <img src={src} alt={title} style={{ width: 200, height: 200 }} />
      </div>
      <div>
        <div style={{ color: '#F4F6F9', fontSize: 18, fontWeight: 600, letterSpacing: '-0.01em' }}>{title}</div>
        <div style={{ color: '#9BA5B7', fontSize: 14, marginTop: 4, lineHeight: 1.5 }}>{subtitle}</div>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 18, paddingTop: 6 }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={src} alt="" style={{ width: 64, height: 64 }} />
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={src} alt="" style={{ width: 32, height: 32 }} />
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={src} alt="" style={{ width: 16, height: 16 }} />
        <span style={{ color: '#5D6878', fontSize: 12 }}>64 · 32 · 16 px</span>
      </div>
      {/* Variante con wordmark */}
      <div
        style={{
          marginTop: 12,
          display: 'flex',
          alignItems: 'center',
          gap: 16,
          background: '#05060A',
          border: '1px solid #1A1F2B',
          borderRadius: 12,
          padding: '18px 24px',
        }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={src} alt="" style={{ width: 32, height: 32 }} />
        <span
          style={{
            color: '#F4F6F9',
            fontSize: 24,
            fontWeight: 500,
            letterSpacing: '-0.02em',
          }}
        >
          swaraya
        </span>
      </div>
    </div>
  );
}

export default function MarksPreviewV2() {
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
            swaraya · símbolos v2 · anthropic-style
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
            Glyphs axiomáticos
          </h1>
          <p style={{ color: '#9BA5B7', fontSize: 16, lineHeight: 1.5, maxWidth: 760, marginTop: 12 }}>
            Tres direcciones sin letras, monocromas, derivadas del significado de la marca:
            <em style={{ color: '#7AC4E0' }}> swaraj </em>
            (sánscrito: <em>autodeterminación</em>, <em>soberanía del conocimiento</em>).
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
            title="v4 — Bindu"
            subtitle="Punto del que emana el conocimiento. Anillo + núcleo central. Calma, axiomático, contemplativo."
            src="/logo-mark-v4-bindu.svg"
          />
          <Card
            title="v5 — Axis"
            subtitle="Cuatro cardinales + un quinto trazo asimétrico. Múltiples disciplinas que convergen en un principio."
            src="/logo-mark-v5-axis.svg"
          />
          <Card
            title="v6 — Threshold"
            subtitle="Dos arcos espejados. El umbral entre investigación e ingeniería. Arquitectónico, sobrio."
            src="/logo-mark-v6-threshold.svg"
          />
        </div>
      </div>
    </main>
  );
}
