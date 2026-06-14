'use client';

/**
 * /preview-glyph — Propuestas conceptuales en formato presentation deck.
 * Cada concepto ocupa una sección completa con:
 *   - Glifo a tamaño grande (240px)
 *   - Wordmark con el elemento embebido
 *   - Mockup de navbar real
 *   - Aplicaciones (favicon, OG, business card)
 *   - Justificación etimológica
 */

// ============= GLYPH RENDERERS =============
// Each accepts size (px) and color. They render at the requested size cleanly.

function GlyphSvar({ size = 22, color = '#0E0F11' }) {
  // "s" + radiant sun (dot + 3 short rays) above
  const r = size;
  return (
    <svg viewBox="0 0 64 80" width={r * 0.8} height={r} fill="none" style={{ overflow: 'visible' }}>
      {/* sun core */}
      <circle cx="32" cy="14" r="4.2" fill={color} />
      {/* rays */}
      <line x1="32" y1="2" x2="32" y2="7"  stroke={color} strokeWidth="2.6" strokeLinecap="round" />
      <line x1="20" y1="14" x2="25" y2="14" stroke={color} strokeWidth="2.6" strokeLinecap="round" />
      <line x1="39" y1="14" x2="44" y2="14" stroke={color} strokeWidth="2.6" strokeLinecap="round" />
      {/* "s" */}
      <text x="32" y="68" textAnchor="middle" fontFamily="'Author', sans-serif" fontWeight="600"
            fontSize="56" letterSpacing="-0.03em" fill={color}>s</text>
    </svg>
  );
}

function GlyphAxis({ size = 22, color = '#0E0F11' }) {
  const r = size;
  return (
    <svg viewBox="0 0 64 64" width={r} height={r} fill="none">
      <text x="32" y="50" textAnchor="middle" fontFamily="'Author', sans-serif" fontWeight="600"
            fontSize="56" letterSpacing="-0.03em" fill={color}>s</text>
      {/* horizontal axis through optical center */}
      <line x1="3" y1="32" x2="61" y2="32" stroke={color} strokeWidth="2.4" strokeLinecap="round" />
    </svg>
  );
}

function GlyphRaya({ size = 22, color = '#0E0F11' }) {
  const r = size;
  return (
    <svg viewBox="0 0 64 64" width={r} height={r} fill="none">
      <text x="32" y="46" textAnchor="middle" fontFamily="'Author', sans-serif" fontWeight="600"
            fontSize="52" letterSpacing="-0.03em" fill={color}>s</text>
      <line x1="10" y1="58" x2="54" y2="58" stroke={color} strokeWidth="3.4" strokeLinecap="round" />
    </svg>
  );
}

function GlyphFrame({ size = 22, color = '#0E0F11' }) {
  const r = size;
  return (
    <svg viewBox="0 0 64 64" width={r} height={r} fill="none">
      <rect x="3" y="3" width="58" height="58" rx="6" stroke={color} strokeWidth="2.6" fill="none" />
      <text x="32" y="48" textAnchor="middle" fontFamily="'Author', sans-serif" fontWeight="600"
            fontSize="42" letterSpacing="-0.03em" fill={color}>s</text>
    </svg>
  );
}

function GlyphSv({ size = 22, color = '#0E0F11' }) {
  const r = size;
  return (
    <svg viewBox="0 0 100 64" width={r * 1.55} height={r} fill="none">
      <text x="0" y="50" fontFamily="'Author', sans-serif" fontWeight="600"
            fontSize="56" letterSpacing="-0.08em" fill={color}>sv</text>
      {/* connector dot — symbolizes the binding self-rule */}
      <circle cx="50" cy="40" r="2.6" fill={color} />
    </svg>
  );
}

function GlyphDot({ size = 22, color = '#0E0F11' }) {
  const r = size;
  return (
    <svg viewBox="0 0 80 64" width={r * 1.25} height={r} fill="none">
      <text x="6" y="50" fontFamily="'Author', sans-serif" fontWeight="600"
            fontSize="56" letterSpacing="-0.03em" fill={color}>s</text>
      <circle cx="64" cy="42" r="5.8" fill={color} />
    </svg>
  );
}

// ============= WORDMARK WITH EMBEDDED ELEMENT =============

function Wordmark({ concept, color = '#0E0F11', size = '3.5rem' }) {
  const base = {
    position: 'relative',
    display: 'inline-flex',
    alignItems: 'baseline',
    fontFamily: "'Author', sans-serif",
    fontWeight: 600,
    letterSpacing: '-0.035em',
    fontSize: size,
    lineHeight: 0.9,
    color,
  };

  switch (concept) {
    case 'A':
      return (
        <div style={base}>
          <span style={{ position: 'relative', display: 'inline-block' }}>
            {/* sun marker above the "s" */}
            <svg
              style={{ position: 'absolute', top: '-0.55em', left: '0.08em' }}
              viewBox="0 0 32 32" width="0.42em" height="0.42em"
            >
              <circle cx="16" cy="16" r="6" fill={color} />
              <line x1="16" y1="2" x2="16" y2="7" stroke={color} strokeWidth="3" strokeLinecap="round" />
              <line x1="5" y1="16" x2="9" y2="16" stroke={color} strokeWidth="3" strokeLinecap="round" />
              <line x1="23" y1="16" x2="27" y2="16" stroke={color} strokeWidth="3" strokeLinecap="round" />
            </svg>
            swaraya
          </span>
        </div>
      );
    case 'B':
      return (
        <div style={base}>
          <span style={{ position: 'relative', display: 'inline-block' }}>
            {/* axis line through optical center of "s" only */}
            <span style={{
              position: 'absolute',
              left: '-0.04em',
              width: '0.55em',
              top: '54%',
              height: '0.06em',
              background: color,
              borderRadius: 2,
            }} />
            swaraya
          </span>
        </div>
      );
    case 'C':
      return (
        <div style={base}>
          <span style={{ position: 'relative', display: 'inline-block', paddingBottom: '0.1em' }}>
            swaraya
            <span style={{
              position: 'absolute',
              left: 0,
              right: 0,
              bottom: '-0.04em',
              height: '0.06em',
              background: color,
              borderRadius: 3,
            }} />
          </span>
        </div>
      );
    case 'D':
      return (
        <div style={base}>
          <span style={{
            display: 'inline-block',
            border: `0.045em solid ${color}`,
            borderRadius: '0.08em',
            padding: '0.04em 0.18em 0.08em',
          }}>
            <span style={{
              borderRight: `0.025em solid ${color}`,
              paddingRight: '0.1em',
              marginRight: '0.1em',
            }}>s</span>
            <span>waraya</span>
          </span>
        </div>
      );
    case 'E':
      return (
        <div style={base}>
          <span style={{ borderBottom: `0.04em solid ${color}`, paddingBottom: '0.02em' }}>sv</span>
          <span>araya</span>
        </div>
      );
    case 'F':
      return (
        <div style={base}>
          <span style={{ position: 'relative', display: 'inline-block' }}>
            swaraya
            <span style={{
              position: 'absolute',
              right: '-0.42em',
              top: '0.45em',
              width: '0.2em',
              height: '0.2em',
              borderRadius: '50%',
              background: color,
            }} />
          </span>
        </div>
      );
    default:
      return <div style={base}>swaraya</div>;
  }
}

// ============= NAVBAR MOCKUP =============

function NavbarMockup({ Glyph, navColor = '#0E0F11' }) {
  return (
    <div
      className="rounded-xl border border-[rgba(14,15,17,0.10)] overflow-hidden"
      style={{ background: '#F5F2EC' }}
    >
      <div className="flex items-center justify-between px-5 py-4">
        <div style={{ display: 'flex', alignItems: 'center', height: 22 }}>
          <Glyph size={22} color={navColor} />
        </div>
        <div className="flex items-center gap-5 text-[11px] tracking-wide text-[#3C4654]">
          <span>Investigación</span>
          <span>Método</span>
          <span>Blog</span>
          <span
            className="px-3 py-1.5 rounded-full text-[#F5F2EC] text-[10px] font-medium"
            style={{ background: '#2C3E80' }}
          >
            Iniciar Diálogo
          </span>
        </div>
      </div>
    </div>
  );
}

// ============= CONCEPT DATA =============

const CONCEPTS = [
  {
    id: 'A',
    name: 'Svar — sol/origen',
    Glyph: GlyphSvar,
    short: 'Punto radiante sobre la "s"',
    etym:
      '«svar» en Sanskrit = sol, luz, cielo, radiancia. La raíz literal de la palabra. ' +
      'Un punto radiante sobre la "s" simboliza la fuente de la inteligencia.',
  },
  {
    id: 'B',
    name: 'Axis — eje del self',
    Glyph: GlyphAxis,
    short: 'Barra horizontal atravesando la "s"',
    etym:
      '«sva-rāja» = soberanía del self. Un eje horizontal cruza la "s", anclando su forma ' +
      'orgánica con una estructura geométrica. Identidad bicéfala: investigación (curva) + ' +
      'ingeniería (recta).',
  },
  {
    id: 'C',
    name: 'Raya — principio/regla',
    Glyph: GlyphRaya,
    short: 'Subrayado bajo la "s"',
    etym:
      '«rāja» / «rāya» también significa regla, ley, principio. Una línea bajo la "s" ' +
      'sostiene la palabra: la base sobre la que descansa el sistema.',
  },
  {
    id: 'D',
    name: 'Cuadro — soberanía contenida',
    Glyph: GlyphFrame,
    short: 'Marco geométrico envolvente',
    etym:
      'La autonomía (swarāj) requiere límites propios. La "s" inscrita en un marco ' +
      'sugiere un sistema cerrado y autosuficiente — la sovereign loop de un agente.',
  },
  {
    id: 'E',
    name: 'Ligatura sv',
    Glyph: GlyphSv,
    short: 'Dos letras Sanskrit unidas',
    etym:
      '«sva» (self) es la raíz Sanskrit que da origen a todo. Fusionada en una sola forma. ' +
      'Lectura sutil pero estructuralmente arraigada en la etimología.',
  },
  {
    id: 'F',
    name: 'Punto soberano',
    Glyph: GlyphDot,
    short: 'Punto independiente junto a la "s"',
    etym:
      'Un punto independiente — separado de la palabra pero parte de ella. ' +
      'Representa al individuo soberano (sva): la unidad de decisión que la palabra contiene.',
  },
];

// ============= MAIN PAGE =============

export default function PreviewGlyphPage() {
  return (
    <main className="min-h-screen bg-[#F5F2EC] text-[#0E0F11] pt-20 pb-24">
      <div className="container-main">
        {/* Header */}
        <header className="mb-12 max-w-3xl">
          <span className="label-accent text-[#2C3E80] block mb-4">Identidad</span>
          <h1
            className="text-4xl md:text-5xl lg:text-6xl mb-6"
            style={{
              fontFamily: "'Cabinet Grotesk', sans-serif",
              fontWeight: 500,
              letterSpacing: '-0.035em',
              lineHeight: 1,
            }}
          >
            El ícono nace de la palabra
          </h1>
          <p className="text-base text-[#3C4654] leading-relaxed">
            Seis brand-marks derivados del wordmark <em>swaraya</em>. Cada uno
            ancla el ícono en un elemento visible dentro de la palabra
            (etimología Sanskrit: <strong>sva-rāja</strong> = self + soberanía;
            raíz <strong>svar</strong> = sol/luz/cielo).
          </p>
        </header>

        {/* Comparison strip: All 6 glyphs side by side */}
        <section className="mb-16 border border-[rgba(14,15,17,0.10)] rounded-2xl bg-[#FAF8F2] p-8 md:p-12">
          <div className="text-[0.625rem] tracking-[0.32em] uppercase text-[#5D6878] mb-8">
            Comparación · 240 px
          </div>
          <div className="grid grid-cols-3 md:grid-cols-6 gap-8 items-center">
            {CONCEPTS.map((c) => (
              <div key={c.id} className="flex flex-col items-center text-center">
                <div className="h-[100px] flex items-end justify-center mb-4">
                  <c.Glyph size={80} color="#0E0F11" />
                </div>
                <div className="text-[10px] tracking-[0.28em] uppercase text-[#2C3E80] font-medium mb-1">
                  {c.id}
                </div>
                <div className="text-xs text-[#5D6878]">{c.short}</div>
              </div>
            ))}
          </div>
        </section>

        {/* Detailed concept sections */}
        <div className="space-y-12">
          {CONCEPTS.map((c) => (
            <section
              key={c.id}
              className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 border border-[rgba(14,15,17,0.10)] rounded-2xl overflow-hidden bg-[#FAF8F2]"
            >
              {/* LEFT: Big glyph */}
              <div
                className="lg:col-span-4 flex flex-col items-center justify-center px-10 py-16 border-r border-[rgba(14,15,17,0.08)]"
                style={{
                  background:
                    'radial-gradient(circle at center, rgba(44,62,128,0.04) 0%, transparent 65%)',
                }}
              >
                <div className="mb-6">
                  <c.Glyph size={180} color="#0E0F11" />
                </div>
                <div className="text-[10px] tracking-[0.32em] uppercase text-[#2C3E80] font-medium mb-2">
                  Concepto {c.id}
                </div>
                <h2
                  className="text-xl text-[#0E0F11] text-center"
                  style={{
                    fontFamily: "'Cabinet Grotesk', sans-serif",
                    fontWeight: 500,
                    letterSpacing: '-0.02em',
                  }}
                >
                  {c.name}
                </h2>
              </div>

              {/* RIGHT: Wordmark + navbar + applications */}
              <div className="lg:col-span-8 px-8 py-12 space-y-8">
                {/* Wordmark */}
                <div>
                  <div className="text-[0.625rem] tracking-[0.24em] uppercase text-[#5D6878] mb-5">
                    Wordmark
                  </div>
                  <Wordmark concept={c.id} size="3.25rem" />
                </div>

                {/* Navbar mockup */}
                <div>
                  <div className="text-[0.625rem] tracking-[0.24em] uppercase text-[#5D6878] mb-5">
                    Navbar en producción
                  </div>
                  <NavbarMockup Glyph={c.Glyph} />
                </div>

                {/* Application sizes */}
                <div>
                  <div className="text-[0.625rem] tracking-[0.24em] uppercase text-[#5D6878] mb-5">
                    Escalas
                  </div>
                  <div className="grid grid-cols-3 gap-4 items-end">
                    <div className="flex flex-col items-center gap-3 p-5 rounded-lg border border-[rgba(14,15,17,0.06)] bg-[#F5F2EC]">
                      <c.Glyph size={56} color="#0E0F11" />
                      <span className="text-[0.625rem] tracking-[0.18em] uppercase text-[#5D6878]">56 · App</span>
                    </div>
                    <div className="flex flex-col items-center gap-3 p-5 rounded-lg border border-[rgba(14,15,17,0.06)] bg-[#F5F2EC]">
                      <c.Glyph size={24} color="#0E0F11" />
                      <span className="text-[0.625rem] tracking-[0.18em] uppercase text-[#5D6878]">24 · Navbar</span>
                    </div>
                    <div className="flex flex-col items-center gap-3 p-5 rounded-lg border border-[rgba(14,15,17,0.06)] bg-[#F5F2EC]">
                      <c.Glyph size={16} color="#0E0F11" />
                      <span className="text-[0.625rem] tracking-[0.18em] uppercase text-[#5D6878]">16 · Favicon</span>
                    </div>
                  </div>
                </div>

                {/* Etymology */}
                <div className="pt-2 border-t border-[rgba(14,15,17,0.08)]">
                  <div className="text-[0.625rem] tracking-[0.24em] uppercase text-[#5D6878] mb-3 mt-5">
                    Concepto
                  </div>
                  <p className="text-sm md:text-base text-[#3C4654] leading-relaxed">
                    {c.etym}
                  </p>
                </div>
              </div>
            </section>
          ))}
        </div>

        {/* Footer guidance */}
        <div className="mt-16 max-w-3xl">
          <p
            className="text-xl text-[#0E0F11]"
            style={{
              fontFamily: "'Cabinet Grotesk', sans-serif",
              fontWeight: 500,
              letterSpacing: '-0.02em',
            }}
          >
            ¿Cuál implementamos?
          </p>
          <p className="text-[#3C4654] leading-relaxed mt-2">
            Dime la letra del concepto (A, B, C, D, E o F) y lo aplico en
            navbar (con morph), favicon, OG image y resto del sistema.
          </p>
        </div>
      </div>
    </main>
  );
}
