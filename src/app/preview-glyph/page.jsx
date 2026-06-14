'use client';

/**
 * /preview-glyph — Propuestas conceptuales de ícono derivado del wordmark
 *
 * Cada concepto muestra:
 *  1. El wordmark "swaraya" con el elemento gráfico visible (origen del ícono)
 *  2. El ícono aislado en tamaño grande
 *  3. El ícono en tamaño navbar (cómo se vería en producción)
 *  4. Justificación conceptual derivada de la etimología (Sanskrit svar / sva-rāja)
 */

// ============== GLYPH COMPONENTS ==============

/** Concept A — "Svar" — punto radiante (sol/origen) sobre la s. La diéresis del Sanskrit. */
function GlyphSvar({ size = 22, color = 'currentColor' }) {
  return (
    <svg viewBox="0 0 32 40" width={size * 1.6} height={size * 2} fill="none" aria-hidden="true">
      {/* Punto radiante — el "svar" (sol, luz, radiancia) */}
      <circle cx="16" cy="6" r="2.5" fill={color} />
      {/* Pequeños rayos */}
      <line x1="16" y1="0.5" x2="16" y2="2.5" stroke={color} strokeWidth="1.6" strokeLinecap="round" />
      <line x1="9.5" y1="6" x2="11.5" y2="6" stroke={color} strokeWidth="1.6" strokeLinecap="round" />
      <line x1="20.5" y1="6" x2="22.5" y2="6" stroke={color} strokeWidth="1.6" strokeLinecap="round" />
      {/* La "s" en lugar de un path arbitrario, dejamos el texto en Author */}
      <text x="16" y="34" textAnchor="middle" fontFamily="'Author', sans-serif" fontWeight="600"
            fontSize="32" letterSpacing="-0.03em" fill={color} style={{ dominantBaseline: 'auto' }}>
        s
      </text>
    </svg>
  );
}

/** Concept B — "Axis" — barra horizontal cruzando la "s". El eje del self/soberanía. */
function GlyphAxis({ size = 22, color = 'currentColor' }) {
  return (
    <svg viewBox="0 0 32 32" width={size * 1.4} height={size * 1.4} fill="none" aria-hidden="true">
      <text x="16" y="26" textAnchor="middle" fontFamily="'Author', sans-serif" fontWeight="600"
            fontSize="28" letterSpacing="-0.03em" fill={color}>
        s
      </text>
      {/* Eje horizontal que cruza el centro óptico de la "s" */}
      <line x1="2" y1="16.5" x2="30" y2="16.5" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

/** Concept C — "Raya" — línea bajo la s. Base / principio / regla. */
function GlyphRaya({ size = 22, color = 'currentColor' }) {
  return (
    <svg viewBox="0 0 32 32" width={size * 1.4} height={size * 1.4} fill="none" aria-hidden="true">
      <text x="16" y="22" textAnchor="middle" fontFamily="'Author', sans-serif" fontWeight="600"
            fontSize="28" letterSpacing="-0.03em" fill={color}>
        s
      </text>
      {/* Subrayado — la "raya" (principio, ley, regla) */}
      <line x1="6" y1="27" x2="26" y2="27" stroke={color} strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

/** Concept D — "Cuadrado de sva" — la s inscrita en un cuadrado vacío. Soberanía contenida. */
function GlyphFrame({ size = 22, color = 'currentColor' }) {
  return (
    <svg viewBox="0 0 32 32" width={size * 1.4} height={size * 1.4} fill="none" aria-hidden="true">
      <rect x="2" y="2" width="28" height="28" rx="3" stroke={color} strokeWidth="1.4" fill="none" />
      <text x="16" y="24" textAnchor="middle" fontFamily="'Author', sans-serif" fontWeight="600"
            fontSize="22" letterSpacing="-0.03em" fill={color}>
        s
      </text>
    </svg>
  );
}

/** Concept E — "Ligatura sv" — las dos primeras letras unidas. La raíz Sanskrit "sva" (self). */
function GlyphSv({ size = 22, color = 'currentColor' }) {
  return (
    <svg viewBox="0 0 50 32" width={size * 2.2} height={size * 1.4} fill="none" aria-hidden="true">
      <text x="0" y="24" fontFamily="'Author', sans-serif" fontWeight="600"
            fontSize="28" letterSpacing="-0.08em" fill={color}>
        sv
      </text>
      {/* Conector calligráfico sutil — un punto que une las dos letras */}
      <circle cx="24" cy="20" r="1.3" fill={color} />
    </svg>
  );
}

/** Concept F — "Punto soberano" — La s con un punto independiente al lado, igual que en el wordmark. */
function GlyphDot({ size = 22, color = 'currentColor' }) {
  return (
    <svg viewBox="0 0 40 32" width={size * 1.9} height={size * 1.4} fill="none" aria-hidden="true">
      <text x="0" y="24" fontFamily="'Author', sans-serif" fontWeight="600"
            fontSize="28" letterSpacing="-0.03em" fill={color}>
        s
      </text>
      {/* Punto independiente — el self soberano (svar) */}
      <circle cx="32" cy="20" r="3" fill={color} />
    </svg>
  );
}

// ============== Wordmark con cada elemento gráfico embebido ==============

function WordmarkWith({ children, size = '3.5rem', color = '#0E0F11' }) {
  return (
    <div
      style={{
        position: 'relative',
        display: 'inline-flex',
        alignItems: 'center',
        fontFamily: "'Author', sans-serif",
        fontWeight: 600,
        letterSpacing: '-0.035em',
        fontSize: size,
        lineHeight: 0.9,
        color,
      }}
    >
      <span style={{ position: 'relative', display: 'inline-block' }}>
        {children?.svgOverlay}
        swaraya
      </span>
    </div>
  );
}

const CONCEPTS = [
  {
    id: 'A',
    name: 'Svar — sol/origen',
    etym: '«svar» en Sanskrit = sol, luz, cielo, radiancia. La raíz de la palabra. Un punto radiante sobre la "s" simboliza la fuente de la inteligencia.',
    Glyph: GlyphSvar,
    overlay: (
      <svg
        style={{ position: 'absolute', top: '-0.55em', left: '-0.05em' }}
        width="0.4em" height="0.4em" viewBox="0 0 32 32" fill="none"
      >
        <circle cx="16" cy="16" r="6" fill="#2C3E80" />
        <line x1="16" y1="2" x2="16" y2="7" stroke="#2C3E80" strokeWidth="3" strokeLinecap="round" />
        <line x1="5" y1="16" x2="9" y2="16" stroke="#2C3E80" strokeWidth="3" strokeLinecap="round" />
        <line x1="23" y1="16" x2="27" y2="16" stroke="#2C3E80" strokeWidth="3" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    id: 'B',
    name: 'Axis — eje del self',
    etym: '«sva» = self, «rāja» = soberanía. Un eje horizontal cruza la "s", anclando su forma orgánica con una estructura geométrica. Identidad bicéfala: investigación (curva) + ingeniería (recta).',
    Glyph: GlyphAxis,
    overlay: (
      <span
        style={{
          position: 'absolute',
          left: '-0.05em',
          right: '92%',
          top: '50%',
          height: '0.07em',
          background: '#2C3E80',
          borderRadius: 2,
          transform: 'translateY(-50%)',
        }}
      />
    ),
  },
  {
    id: 'C',
    name: 'Raya — principio/regla',
    etym: '«rāja» / «rāya» también significa regla, ley, principio. Una línea bajo la "s" sostiene la palabra: la base sobre la que descansa el sistema.',
    Glyph: GlyphRaya,
    overlay: (
      <span
        style={{
          position: 'absolute',
          left: '0',
          right: '0',
          bottom: '-0.18em',
          height: '0.07em',
          background: '#2C3E80',
          borderRadius: 3,
        }}
      />
    ),
  },
  {
    id: 'D',
    name: 'Cuadro — soberanía contenida',
    etym: 'La autonomía (swarāj) requiere límites propios. La "s" inscrita en un marco sugiere un sistema cerrado y autosuficiente — la sovereign loop de un agente.',
    Glyph: GlyphFrame,
    overlay: (
      <span
        style={{
          position: 'absolute',
          left: '-0.18em',
          top: '-0.18em',
          width: '1.18em',
          height: '1.18em',
          border: '0.05em solid #2C3E80',
          borderRadius: '0.08em',
        }}
      />
    ),
  },
  {
    id: 'E',
    name: 'Ligatura sv',
    etym: 'Las dos letras Sanskrit que dan origen a todo: «sva». Fusionadas en una sola forma. Lectura sutil pero estructuralmente arraigada en la etimología.',
    Glyph: GlyphSv,
    overlay: null, // dejamos visible "sv" en el wordmark, ya está allí
    showSV: true,
  },
  {
    id: 'F',
    name: 'Punto soberano',
    etym: 'Un punto independiente — separado de la palabra pero parte de ella. Representa al individuo soberano (sva): la unidad de decisión que la palabra contiene.',
    Glyph: GlyphDot,
    overlay: (
      <span
        style={{
          position: 'absolute',
          left: '0.13em',
          top: '0.40em',
          width: '0.18em',
          height: '0.18em',
          borderRadius: '50%',
          background: '#2C3E80',
        }}
      />
    ),
  },
];

const Card = ({ c, idx }) => {
  const { Glyph, name, etym, id, overlay, showSV } = c;
  return (
    <article className="border border-[rgba(14,15,17,0.10)] rounded-2xl overflow-hidden bg-[#FAF8F2]">
      {/* Header */}
      <div className="flex items-center justify-between px-6 py-4 border-b border-[rgba(14,15,17,0.08)] bg-[rgba(44,62,128,0.04)]">
        <span className="text-[0.625rem] tracking-[0.32em] uppercase text-[#2C3E80] font-medium">
          Concepto {id}
        </span>
        <span className="text-xs text-[#5D6878]">{name}</span>
      </div>

      {/* Wordmark com elemento visible */}
      <div className="px-8 py-10 border-b border-[rgba(14,15,17,0.08)] bg-[#F5F2EC]">
        <div className="text-[0.625rem] tracking-[0.24em] uppercase text-[#5D6878] mb-5">
          Wordmark
        </div>
        <div
          style={{
            position: 'relative',
            display: 'inline-flex',
            alignItems: 'baseline',
            fontFamily: "'Author', sans-serif",
            fontWeight: 600,
            letterSpacing: showSV ? '-0.04em' : '-0.035em',
            fontSize: '3rem',
            lineHeight: 0.9,
            color: '#0E0F11',
          }}
        >
          {showSV ? (
            <>
              <span style={{ borderBottom: '0.04em solid #2C3E80', paddingBottom: '0.02em' }}>sv</span>
              <span>araya</span>
            </>
          ) : (
            <span style={{ position: 'relative', display: 'inline-block' }}>
              {overlay}
              swaraya
            </span>
          )}
        </div>
      </div>

      {/* Glyph aislado */}
      <div className="px-8 py-12 grid grid-cols-3 gap-6 items-end border-b border-[rgba(14,15,17,0.08)]">
        <div className="flex flex-col items-center gap-3">
          <Glyph size={48} color="#0E0F11" />
          <span className="text-[0.625rem] tracking-[0.18em] uppercase text-[#5D6878]">grande</span>
        </div>
        <div className="flex flex-col items-center gap-3">
          <Glyph size={22} color="#0E0F11" />
          <span className="text-[0.625rem] tracking-[0.18em] uppercase text-[#5D6878]">navbar</span>
        </div>
        <div className="flex flex-col items-center gap-3">
          <Glyph size={14} color="#0E0F11" />
          <span className="text-[0.625rem] tracking-[0.18em] uppercase text-[#5D6878]">favicon</span>
        </div>
      </div>

      {/* Justificación */}
      <div className="px-8 py-6">
        <p className="text-sm text-[#3C4654] leading-relaxed">{etym}</p>
      </div>
    </article>
  );
};

export default function PreviewGlyphPage() {
  return (
    <main className="min-h-screen bg-[#F5F2EC] text-[#0E0F11] pt-20 pb-24">
      <div className="container-main">
        <header className="mb-12 md:mb-16 max-w-3xl">
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
          <p className="text-lg text-[#3C4654] leading-relaxed mb-3">
            Seis conceptos donde el brand-mark se construye desde un elemento
            visible dentro del wordmark <em>swaraya</em>. Cada uno deriva de la
            etimología Sanskrit de la palabra:
          </p>
          <p className="text-sm text-[#5D6878] leading-relaxed">
            <strong className="text-[#0E0F11]">swarāj / sva-rāja</strong> · «sva» (self, propio) + «rāja»
            (soberanía, regla) · concepto Vedántico de auto-gobierno e independencia.
            La raíz <strong className="text-[#0E0F11]">svar</strong> aparece también en «svar» (sol, luz, cielo)
            — radiancia interior.
          </p>
        </header>

        <div className="grid md:grid-cols-2 gap-8 md:gap-10">
          {CONCEPTS.map((c, i) => (
            <Card key={c.id} c={c} idx={i} />
          ))}
        </div>

        <div className="mt-16 border-t border-[rgba(14,15,17,0.08)] pt-12 max-w-3xl">
          <h2
            className="text-2xl md:text-3xl mb-4"
            style={{
              fontFamily: "'Cabinet Grotesk', sans-serif",
              fontWeight: 500,
              letterSpacing: '-0.025em',
            }}
          >
            Mi recomendación
          </h2>
          <p className="text-[#3C4654] leading-relaxed mb-3">
            Las dos opciones más fuertes son <strong>A (Svar — sol/origen)</strong> y
            <strong> B (Axis — eje del self)</strong>. A es más cálido, más cargado
            simbólicamente; B es más austero, más editorial-tech. Ambas funcionan
            perfectamente en el morph y son identificables a cualquier tamaño.
          </p>
          <p className="text-[#3C4654] leading-relaxed">
            Las opciones C, D, F son sólidas si quieres algo más experimental. La E
            (ligatura sv) es la más sutil — funciona como guiño culto pero puede
            no comunicar identidad a primera vista.
          </p>
        </div>
      </div>
    </main>
  );
}
