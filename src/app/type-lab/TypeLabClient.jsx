'use client';

import { useState } from 'react';

// ---------- GLYPHS ----------

// B — Orbital (3 concentric circles)
const GlyphOrbital = ({ color, size = 48 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1" aria-hidden>
    <circle cx="12" cy="12" r="10.5" opacity="0.35" />
    <circle cx="12" cy="12" r="6.5" opacity="0.6" />
    <circle cx="12" cy="12" r="2" fill={color} stroke="none" />
  </svg>
);

// C — Reticle / Crosshair
const GlyphReticle = ({ color, size = 48 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.1" strokeLinecap="round" aria-hidden>
    <circle cx="12" cy="12" r="8.5" />
    <line x1="12" y1="1.5" x2="12" y2="6" />
    <line x1="12" y1="18" x2="12" y2="22.5" />
    <line x1="1.5" y1="12" x2="6" y2="12" />
    <line x1="18" y1="12" x2="22.5" y2="12" />
    <circle cx="12" cy="12" r="1.2" fill={color} stroke="none" />
  </svg>
);

// D — Yantra (square inscribed in circle)
const GlyphYantra = ({ color, size = 48 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.1" strokeLinecap="round" aria-hidden>
    <circle cx="12" cy="12" r="9.5" />
    <rect x="6" y="6" width="12" height="12" transform="rotate(45 12 12)" />
    <circle cx="12" cy="12" r="1.4" fill={color} stroke="none" />
  </svg>
);

// E — Bracket [ ] — wraps wordmark
const BracketLeft = ({ color, size = 48 }) => (
  <svg width={size * 0.35} height={size} viewBox="0 0 12 32" fill="none" stroke={color} strokeWidth="1.4" strokeLinecap="round" aria-hidden>
    <path d="M9 2 L4 2 L4 30 L9 30" />
  </svg>
);
const BracketRight = ({ color, size = 48 }) => (
  <svg width={size * 0.35} height={size} viewBox="0 0 12 32" fill="none" stroke={color} strokeWidth="1.4" strokeLinecap="round" aria-hidden>
    <path d="M3 2 L8 2 L8 30 L3 30" />
  </svg>
);

// G — Therefore ∴  (uses inherited font for visual continuity with wordmark)
const GlyphTherefore = ({ color, size = 48 }) => (
  <span
    style={{
      color,
      fontSize: size,
      lineHeight: 1,
      display: 'inline-block',
      transform: 'translateY(-0.02em)',
    }}
    aria-hidden
  >
    ∴
  </span>
);

// H — Arrow →
const GlyphArrow = ({ color, size = 48 }) => (
  <svg width={size} height={size * 0.42} viewBox="0 0 32 14" fill="none" stroke={color} strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
    <line x1="2" y1="7" x2="27" y2="7" />
    <polyline points="20,1.8 27,7 20,12.2" />
  </svg>
);

// I — Token ⟨ ⟩ — wraps wordmark (angle brackets)
const TokenLeft = ({ color, size = 48 }) => (
  <svg width={size * 0.4} height={size} viewBox="0 0 14 32" fill="none" stroke={color} strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
    <polyline points="10,3 4,16 10,29" />
  </svg>
);
const TokenRight = ({ color, size = 48 }) => (
  <svg width={size * 0.4} height={size} viewBox="0 0 14 32" fill="none" stroke={color} strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
    <polyline points="4,3 10,16 4,29" />
  </svg>
);

const GLYPHS = {
  B: { type: 'side', cmp: GlyphOrbital },
  C: { type: 'side', cmp: GlyphReticle },
  D: { type: 'side', cmp: GlyphYantra },
  E: { type: 'wrap', left: BracketLeft, right: BracketRight },
  G: { type: 'side', cmp: GlyphTherefore },
  H: { type: 'side', cmp: GlyphArrow },
  I: { type: 'wrap', left: TokenLeft, right: TokenRight },
};

const GLYPH_COMMENTARY = {
  none: {
    title: 'Sin glifo · Wordmark puro',
    ai: 'Cero ruido. La marca se sostiene solo con la tipografía.',
    sage: 'Máxima restraint. El silencio como autoridad. Vibe Vercel/Linear.',
    fitAI: 0,
    fitSage: 5,
    bestWith: 'Newsreader · Inter Tight · Manrope',
  },
  B: {
    title: 'B · Orbital',
    ai: '3 círculos concéntricos. Se lee como capas de red neuronal o ciclos de entrenamiento — pero también es genérico cósmico.',
    sage: 'La órbita de la sabiduría. Lo cíclico, lo planetario.',
    fitAI: 3,
    fitSage: 3,
    bestWith: 'Instrument Serif · Fraunces',
  },
  C: {
    title: 'C · Mira (reticle)',
    ai: 'Comunica AI Alignment — el problema central de la IA segura. Precisión, foco, decisión.',
    sage: 'Discernimiento. PERO la carga militar/violenta del crosshair choca con el arquetipo Sabio.',
    fitAI: 4,
    fitSage: 2,
    bestWith: 'Inter Tight · Manrope (sans tech)',
  },
  D: {
    title: 'D · Yantra',
    ai: 'Conexión INDIRECTA con IA (vía sabiduría aplicada). No es nativo del campo IA.',
    sage: 'Geometría sagrada sánscrita. Conexión directa con la raíz Swaraj. Máxima coherencia narrativa.',
    fitAI: 1,
    fitSage: 5,
    bestWith: 'Instrument Serif · Fraunces · Newsreader',
  },
  E: {
    title: 'E · Bracket [ ]',
    ai: 'Tensores, arrays, JSON, tokens. Los brackets están en cada línea de código de IA — pero genérico de todo programming.',
    sage: 'Contenedor, marco. La sabiduría enmarca el contexto.',
    fitAI: 3,
    fitSage: 3,
    bestWith: 'Inter Tight · Manrope · Newsreader',
  },
  G: {
    title: 'G · Therefore ∴',
    ai: 'NATIVO. Símbolo de "por lo tanto" — la firma del Chain-of-Thought reasoning en LLMs modernos. Razonamiento explícito.',
    sage: 'PERFECTO. El sabio que concluye tras analizar. Discernimiento que cierra.',
    fitAI: 5,
    fitSage: 5,
    bestWith: 'Newsreader · Fraunces · Instrument Serif',
  },
  H: {
    title: 'H · Arrow →',
    ai: 'NATIVO. Transformación input → output. Es la operación elemental de toda IA. Aparece en cada paper y diagrama.',
    sage: 'El sabio que conduce. De la pregunta a la respuesta. Movimiento direccional.',
    fitAI: 5,
    fitSage: 3,
    bestWith: 'Inter Tight · Manrope · Newsreader',
  },
  I: {
    title: 'I · Token ⟨ ⟩',
    ai: 'NATIVO. Delimitadores de tokens en LLMs (<BOS>, <EOS>, <|im_start|>). Notación de atención y de Dirac (mecánica cuántica).',
    sage: 'Lo que contiene contexto. El marco que el sabio honra.',
    fitAI: 5,
    fitSage: 3,
    bestWith: 'Inter Tight · Manrope · Newsreader',
  },
};

// ---------- UI HELPERS ----------

function ToggleGroup({ label, value, setValue, options }) {
  return (
    <div className="flex items-center gap-2">
      <span className="text-[10px] text-neutral-500 uppercase tracking-[0.15em] font-medium">{label}</span>
      <div className="flex bg-neutral-100 rounded-full p-1 flex-wrap">
        {options.map(([val, lbl]) => (
          <button
            key={val}
            onClick={() => setValue(val)}
            className={`px-2.5 py-1.5 rounded-full text-[11px] transition-all ${
              value === val ? 'bg-white shadow-sm text-neutral-900 font-medium' : 'text-neutral-500 hover:text-neutral-700'
            }`}
          >
            {lbl}
          </button>
        ))}
      </div>
    </div>
  );
}

function Swatch({ hex, name }) {
  return (
    <div className="flex items-center gap-1.5">
      <div className="w-3.5 h-3.5 rounded-full border border-neutral-300" style={{ background: hex }} />
      <span className="font-mono text-neutral-700">{hex}</span>
      <span className="text-neutral-400">·</span>
      <span>{name}</span>
    </div>
  );
}

function StarFit({ value, label }) {
  return (
    <div className="flex items-center gap-1.5">
      <span className="text-[10px] uppercase tracking-wider text-neutral-500 font-medium">{label}</span>
      <div className="flex gap-0.5">
        {[1, 2, 3, 4, 5].map((i) => (
          <div
            key={i}
            className="w-1.5 h-1.5 rounded-full"
            style={{ background: i <= value ? '#C8553D' : '#E5E0D5' }}
          />
        ))}
      </div>
    </div>
  );
}

function WordmarkBlock({ cls, weight, tracking, size, color, accentColor, glyph }) {
  const word = (
    <span className={cls} style={{ color, fontSize: size, fontWeight: weight, lineHeight: 1, letterSpacing: tracking }}>
      swaraya
    </span>
  );
  if (glyph === 'none' || !glyph) return word;
  const g = GLYPHS[glyph];
  if (!g) return word;
  if (g.type === 'wrap') {
    const L = g.left, R = g.right;
    return (
      <span className="inline-flex items-center" style={{ gap: size * 0.12 }}>
        <L color={accentColor} size={size * 0.9} />
        {word}
        <R color={accentColor} size={size * 0.9} />
      </span>
    );
  }
  const Cmp = g.cmp;
  // For ∴ glyph: render inline so it inherits typography
  if (glyph === 'G') {
    return (
      <span className={cls} style={{ color, fontSize: size, fontWeight: weight, lineHeight: 1, letterSpacing: tracking, display: 'inline-flex', alignItems: 'baseline', gap: size * 0.15 }}>
        <span style={{ color: accentColor, fontSize: '0.5em', lineHeight: 1, transform: 'translateY(-0.1em)' }}>∴</span>
        <span>swaraya</span>
      </span>
    );
  }
  return (
    <span className="inline-flex items-center" style={{ gap: size * 0.18 }}>
      <Cmp color={accentColor} size={size * 0.55} />
      {word}
    </span>
  );
}

// ---------- MAIN ----------

export default function TypeLabClient({ typefaces, monoCls }) {
  const [bg, setBg] = useState('cream');
  const [accent, setAccent] = useState('bermellon');
  const [glyph, setGlyph] = useState('G');

  const bgColor = bg === 'cream' ? '#F4F1EA' : '#1A1A1A';
  const textColor = bg === 'cream' ? '#1A1A1A' : '#F4F1EA';
  const borderColor = bg === 'cream' ? '#E5E0D5' : '#2A2A2A';
  const accentColor = accent === 'bermellon' ? '#C8553D' : '#E08D5C';

  const commentary = GLYPH_COMMENTARY[glyph] || GLYPH_COMMENTARY.none;

  return (
    <div className="min-h-screen" style={{ background: '#FAFAF7' }}>
      {/* Sticky control bar */}
      <div className="sticky top-0 z-20 backdrop-blur-md bg-white/90 border-b border-neutral-200">
        <div className="max-w-7xl mx-auto px-6 py-3 flex flex-wrap items-center gap-x-6 gap-y-3">
          <div className="flex items-center gap-2">
            <div className="w-1.5 h-1.5 rounded-full bg-[#C8553D]" />
            <h1 className="text-sm font-semibold text-neutral-900">Type Lab · swaraya</h1>
            <a href="/morph-lab" className="text-xs text-neutral-500 hover:text-neutral-900 ml-2 underline decoration-dotted">→ ver morph lab</a>
          </div>
          <div className="h-4 w-px bg-neutral-200" />
          <ToggleGroup label="Fondo" value={bg} setValue={setBg} options={[['cream', 'Cream'], ['dark', 'Oscuro']]} />
          <ToggleGroup label="Acento" value={accent} setValue={setAccent} options={[['bermellon', 'Bermellón'], ['terracota', 'Terracota']]} />
          <ToggleGroup
            label="Glifo"
            value={glyph}
            setValue={setGlyph}
            options={[
              ['none', '∅'],
              ['G', 'G·∴'],
              ['H', 'H·→'],
              ['I', 'I·⟨⟩'],
              ['E', 'E·[]'],
              ['B', 'B·○'],
              ['C', 'C·⊕'],
              ['D', 'D·◇'],
            ]}
          />
        </div>
      </div>

      {/* Commentary panel — DYNAMIC based on selected glyph */}
      <div className="max-w-7xl mx-auto px-6 pt-8">
        <div className="rounded-2xl border border-neutral-200 bg-white p-5 grid md:grid-cols-12 gap-5 items-start">
          <div className="md:col-span-3">
            <div className={`text-[10px] uppercase tracking-[0.2em] text-neutral-500 ${monoCls}`}>Glifo seleccionado</div>
            <h3 className="text-lg font-semibold mt-1 text-neutral-900">{commentary.title}</h3>
            <div className="flex flex-col gap-1.5 mt-3">
              <StarFit value={commentary.fitAI} label="IA" />
              <StarFit value={commentary.fitSage} label="Sage" />
            </div>
          </div>
          <div className="md:col-span-9 space-y-2.5 text-sm">
            <div>
              <span className={`text-[10px] uppercase tracking-[0.2em] text-[#C8553D] ${monoCls} mr-2`}>Lectura IA</span>
              <span className="text-neutral-700">{commentary.ai}</span>
            </div>
            <div>
              <span className={`text-[10px] uppercase tracking-[0.2em] text-[#C8553D] ${monoCls} mr-2`}>Lectura Sage</span>
              <span className="text-neutral-700">{commentary.sage}</span>
            </div>
            <div>
              <span className={`text-[10px] uppercase tracking-[0.2em] text-[#C8553D] ${monoCls} mr-2`}>Mejor con</span>
              <span className="text-neutral-700">{commentary.bestWith}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Palette legend */}
      <div className="max-w-7xl mx-auto px-6 pt-6 pb-3">
        <div className="flex flex-wrap items-center gap-4 text-[11px] text-neutral-500">
          <span className="uppercase tracking-[0.15em] font-medium">Paleta</span>
          <Swatch hex="#F4F1EA" name="Cream" />
          <Swatch hex="#1A1A1A" name="Sumi" />
          <Swatch hex="#C8553D" name="Bermellón" />
          <Swatch hex="#E08D5C" name="Terracota" />
        </div>
      </div>

      {/* Intro */}
      <div className="max-w-7xl mx-auto px-6 pt-2 pb-6">
        <p className="text-sm text-neutral-600 max-w-3xl leading-relaxed">
          5 tipografías × 7 glifos. Quité los que no aportaban al contexto IA (Coordenadas, Index) y
          añadí 3 nativos del oficio (<b>G ∴</b>, <b>H →</b>, <b>I ⟨ ⟩</b>). El glifo G es por mucho
          la mejor decisión conceptual: Chain-of-Thought + arquetipo Sabio en un solo símbolo.
        </p>
      </div>

      {/* Typefaces grid */}
      <div className="max-w-7xl mx-auto px-6 pb-24 space-y-10">
        {typefaces.map((tf) => (
          <section key={tf.id} className="rounded-3xl overflow-hidden border transition-colors" style={{ background: bgColor, borderColor }}>
            <div className="px-8 py-5 border-b flex justify-between items-baseline gap-4 flex-wrap" style={{ borderColor }}>
              <div className="flex items-baseline gap-3">
                <span className={`text-[10px] uppercase tracking-[0.2em] ${monoCls}`} style={{ color: textColor, opacity: 0.4 }}>0{tf.id} / 05</span>
                <h2 className="text-sm font-medium" style={{ color: textColor, opacity: 0.85 }}>{tf.name}</h2>
              </div>
              <p className="text-xs" style={{ color: textColor, opacity: 0.5 }}>{tf.desc}</p>
            </div>

            <div className="px-8 py-20 flex items-center justify-center min-h-[260px]">
              <WordmarkBlock cls={tf.cls} weight={tf.weight} tracking={tf.tracking} size={150} color={textColor} accentColor={accentColor} glyph={glyph} />
            </div>

            <div className="border-t" style={{ borderColor }} />

            <div className="grid grid-cols-1 md:grid-cols-2">
              <div className="px-8 py-12 flex items-center justify-center">
                <WordmarkBlock cls={tf.cls} weight={tf.weight} tracking={tf.tracking} size={56} color={textColor} accentColor={accentColor} glyph={glyph} />
                <span className={`text-[10px] uppercase tracking-[0.2em] ml-4 ${monoCls}`} style={{ color: textColor, opacity: 0.35 }}>hero</span>
              </div>
              <div className="px-8 py-12 flex items-center justify-center border-t md:border-t-0 md:border-l" style={{ borderColor }}>
                <WordmarkBlock cls={tf.cls} weight={tf.weight} tracking={tf.tracking} size={22} color={textColor} accentColor={accentColor} glyph={glyph} />
                <span className={`text-[10px] uppercase tracking-[0.2em] ml-4 ${monoCls}`} style={{ color: textColor, opacity: 0.35 }}>navbar</span>
              </div>
            </div>

            <div className="border-t" style={{ borderColor }} />
            <div className="px-8 py-8">
              <p className={tf.cls} style={{ color: textColor, opacity: 0.75, fontSize: 18, lineHeight: 1.55, maxWidth: '46ch', fontWeight: tf.weight === 500 ? 400 : tf.weight, letterSpacing: '0' }}>
                Devolvemos al humano el mando de su propia inteligencia. La soberanía no se delega; se ejerce.
              </p>
            </div>
          </section>
        ))}
      </div>

      <footer className="border-t border-neutral-200 py-10 text-center text-xs text-neutral-500">
        <p>Dime tu combinación final: <span className="font-mono text-neutral-900">&quot;Tipografía N + Glifo X + Color&quot;</span></p>
        <p className="mt-2 opacity-70">Ej: &quot;Tipografía 3 + Glifo G + Bermellón&quot; · &quot;Tipografía 4 + Glifo I + Bermellón&quot;</p>
        <p className="mt-4"><a href="/morph-lab" className="underline">→ Ver mecánica del morph (bowl reveal)</a></p>
      </footer>
    </div>
  );
}
