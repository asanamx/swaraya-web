'use client';

import { useState } from 'react';

// ---------- GLYPH OPTIONS ----------

// A — Coordinates (typographic, multi-line annotation)
const GlyphCoord = ({ color, size = 48, mono }) => (
  <div
    className={mono}
    style={{
      color,
      fontSize: Math.max(10, size * 0.18),
      lineHeight: 1.3,
      letterSpacing: '0.05em',
      textAlign: 'right',
      fontVariantNumeric: 'tabular-nums',
      fontFeatureSettings: '"tnum"',
      opacity: 0.85,
    }}
  >
    <div>19°26′N</div>
    <div style={{ opacity: 0.55 }}>99°07′W</div>
  </div>
);

// B — Orbital (3 concentric circles)
const GlyphOrbital = ({ color, size = 48 }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke={color}
    strokeWidth="1"
    aria-hidden
  >
    <circle cx="12" cy="12" r="10.5" opacity="0.35" />
    <circle cx="12" cy="12" r="6.5" opacity="0.6" />
    <circle cx="12" cy="12" r="2" fill={color} stroke="none" />
  </svg>
);

// C — Reticle / Crosshair
const GlyphReticle = ({ color, size = 48 }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke={color}
    strokeWidth="1.1"
    strokeLinecap="round"
    aria-hidden
  >
    <circle cx="12" cy="12" r="8.5" />
    <line x1="12" y1="1.5" x2="12" y2="6" />
    <line x1="12" y1="18" x2="12" y2="22.5" />
    <line x1="1.5" y1="12" x2="6" y2="12" />
    <line x1="18" y1="12" x2="22.5" y2="12" />
    <circle cx="12" cy="12" r="1.2" fill={color} stroke="none" />
  </svg>
);

// D — Yantra (square inscribed in circle, sacred geometry)
const GlyphYantra = ({ color, size = 48 }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke={color}
    strokeWidth="1.1"
    strokeLinecap="round"
    aria-hidden
  >
    <circle cx="12" cy="12" r="9.5" />
    <rect
      x="6"
      y="6"
      width="12"
      height="12"
      transform="rotate(45 12 12)"
    />
    <circle cx="12" cy="12" r="1.4" fill={color} stroke="none" />
  </svg>
);

// E — Bracket lockup (wraps the wordmark)
// Returned as separate left/right brackets — rendered around the word
const BracketLeft = ({ color, size = 48 }) => (
  <svg
    width={size * 0.35}
    height={size}
    viewBox="0 0 12 32"
    fill="none"
    stroke={color}
    strokeWidth="1.4"
    strokeLinecap="round"
    aria-hidden
  >
    <path d="M9 2 L4 2 L4 30 L9 30" />
  </svg>
);
const BracketRight = ({ color, size = 48 }) => (
  <svg
    width={size * 0.35}
    height={size}
    viewBox="0 0 12 32"
    fill="none"
    stroke={color}
    strokeWidth="1.4"
    strokeLinecap="round"
    aria-hidden
  >
    <path d="M3 2 L8 2 L8 30 L3 30" />
  </svg>
);

// F — Index (solid dot, editorial marker)
const GlyphIndex = ({ color, size = 48 }) => (
  <svg
    width={size * 0.4}
    height={size}
    viewBox="0 0 10 24"
    fill={color}
    aria-hidden
  >
    <circle cx="5" cy="14" r="2.8" />
  </svg>
);

const GLYPHS = {
  A: { type: 'side', cmp: GlyphCoord, label: 'A · Coord' },
  B: { type: 'side', cmp: GlyphOrbital, label: 'B · Orbital' },
  C: { type: 'side', cmp: GlyphReticle, label: 'C · Mira' },
  D: { type: 'side', cmp: GlyphYantra, label: 'D · Yantra' },
  E: { type: 'wrap', cmp: null, label: 'E · Bracket' },
  F: { type: 'side', cmp: GlyphIndex, label: 'F · Index' },
};

// ---------- UI HELPERS ----------

function ToggleGroup({ label, value, setValue, options }) {
  return (
    <div className="flex items-center gap-2">
      <span className="text-[10px] text-neutral-500 uppercase tracking-[0.15em] font-medium">
        {label}
      </span>
      <div className="flex bg-neutral-100 rounded-full p-1">
        {options.map(([val, lbl]) => (
          <button
            key={val}
            onClick={() => setValue(val)}
            className={`px-2.5 py-1.5 rounded-full text-[11px] transition-all ${
              value === val
                ? 'bg-white shadow-sm text-neutral-900 font-medium'
                : 'text-neutral-500 hover:text-neutral-700'
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
      <div
        className="w-3.5 h-3.5 rounded-full border border-neutral-300"
        style={{ background: hex }}
      />
      <span className="font-mono text-neutral-700">{hex}</span>
      <span className="text-neutral-400">·</span>
      <span>{name}</span>
    </div>
  );
}

// Helper that renders wordmark + glyph in the right composition
function WordmarkBlock({
  text,
  cls,
  weight,
  tracking,
  size,
  color,
  accentColor,
  glyph,
  glyphSize,
  monoCls,
}) {
  const word = (
    <span
      className={cls}
      style={{
        color,
        fontSize: size,
        fontWeight: weight,
        lineHeight: 1,
        letterSpacing: tracking,
      }}
    >
      {text}
    </span>
  );

  if (glyph === 'none' || !glyph) return word;

  const g = GLYPHS[glyph];
  if (!g) return word;

  // Bracket wrap mode
  if (g.type === 'wrap') {
    return (
      <span className="inline-flex items-center" style={{ gap: size * 0.12 }}>
        <BracketLeft color={accentColor} size={size * 0.9} />
        {word}
        <BracketRight color={accentColor} size={size * 0.9} />
      </span>
    );
  }

  // Side mode
  const Cmp = g.cmp;
  // Coordinates needs the mono class
  const extraProps = glyph === 'A' ? { mono: monoCls } : {};
  return (
    <span className="inline-flex items-center" style={{ gap: size * 0.18 }}>
      <Cmp color={accentColor} size={glyphSize ?? size * 0.55} {...extraProps} />
      {word}
    </span>
  );
}

// ---------- MAIN ----------

export default function TypeLabClient({ typefaces, monoCls }) {
  const [bg, setBg] = useState('cream');
  const [accent, setAccent] = useState('bermellon');
  const [glyph, setGlyph] = useState('A');

  const bgColor = bg === 'cream' ? '#F4F1EA' : '#1A1A1A';
  const textColor = bg === 'cream' ? '#1A1A1A' : '#F4F1EA';
  const borderColor = bg === 'cream' ? '#E5E0D5' : '#2A2A2A';
  const accentColor = accent === 'bermellon' ? '#C8553D' : '#E08D5C';

  return (
    <div className="min-h-screen" style={{ background: '#FAFAF7' }}>
      {/* Sticky control bar */}
      <div className="sticky top-0 z-20 backdrop-blur-md bg-white/85 border-b border-neutral-200">
        <div className="max-w-7xl mx-auto px-6 py-3 flex flex-wrap items-center gap-x-6 gap-y-3">
          <div className="flex items-center gap-2">
            <div className="w-1.5 h-1.5 rounded-full bg-[#C8553D]" />
            <h1 className="text-sm font-semibold text-neutral-900">
              Type Lab · swaraya
            </h1>
          </div>
          <div className="h-4 w-px bg-neutral-200" />
          <ToggleGroup
            label="Fondo"
            value={bg}
            setValue={setBg}
            options={[
              ['cream', 'Cream'],
              ['dark', 'Oscuro'],
            ]}
          />
          <ToggleGroup
            label="Acento"
            value={accent}
            setValue={setAccent}
            options={[
              ['bermellon', 'Bermellón'],
              ['terracota', 'Terracota'],
            ]}
          />
          <ToggleGroup
            label="Marca"
            value={glyph}
            setValue={setGlyph}
            options={[
              ['none', '∅'],
              ['A', 'A'],
              ['B', 'B'],
              ['C', 'C'],
              ['D', 'D'],
              ['E', 'E'],
              ['F', 'F'],
            ]}
          />
        </div>
      </div>

      {/* Palette legend + glyph legend */}
      <div className="max-w-7xl mx-auto px-6 pt-8 pb-3 space-y-2">
        <div className="flex flex-wrap items-center gap-4 text-[11px] text-neutral-500">
          <span className="uppercase tracking-[0.15em] font-medium">Paleta</span>
          <Swatch hex="#F4F1EA" name="Cream" />
          <Swatch hex="#1A1A1A" name="Sumi" />
          <Swatch hex="#C8553D" name="Bermellón" />
          <Swatch hex="#E08D5C" name="Terracota" />
        </div>
        <div className="flex flex-wrap items-center gap-x-5 gap-y-1 text-[11px] text-neutral-500">
          <span className="uppercase tracking-[0.15em] font-medium">
            Glifos
          </span>
          <span><b className="text-neutral-700">A</b> Coordenadas — editorial NYT/Bloomberg</span>
          <span><b className="text-neutral-700">B</b> Orbital — 3 círculos concéntricos</span>
          <span><b className="text-neutral-700">C</b> Mira — reticle de precisión</span>
          <span><b className="text-neutral-700">D</b> Yantra — geometría sagrada</span>
          <span><b className="text-neutral-700">E</b> Bracket — vibe Linear/Vercel</span>
          <span><b className="text-neutral-700">F</b> Index — punto editorial</span>
        </div>
      </div>

      {/* Intro */}
      <div className="max-w-7xl mx-auto px-6 pt-2 pb-6">
        <p className="text-sm text-neutral-600 max-w-2xl leading-relaxed">
          5 tipografías premium × 7 estados de marca. Cada glifo está pensado
          para una agencia de IA con tesis filosófica, no para una marca de
          producto de consumo. Cuando decidas:
          <br />
          <span className="font-mono text-neutral-900 mt-1 inline-block">
            &quot;Tipografía [1-5] + Glifo [A/B/C/D/E/F/Ninguno] + [Bermellón/Terracota]&quot;
          </span>
        </p>
      </div>

      {/* Typefaces grid */}
      <div className="max-w-7xl mx-auto px-6 pb-24 space-y-10">
        {typefaces.map((tf) => (
          <section
            key={tf.id}
            className="rounded-3xl overflow-hidden border transition-colors"
            style={{ background: bgColor, borderColor }}
          >
            {/* Header */}
            <div
              className="px-8 py-5 border-b flex justify-between items-baseline gap-4 flex-wrap"
              style={{ borderColor }}
            >
              <div className="flex items-baseline gap-3">
                <span
                  className={`text-[10px] uppercase tracking-[0.2em] ${monoCls}`}
                  style={{ color: textColor, opacity: 0.4 }}
                >
                  0{tf.id} / 05
                </span>
                <h2
                  className="text-sm font-medium"
                  style={{ color: textColor, opacity: 0.85 }}
                >
                  {tf.name}
                </h2>
              </div>
              <p
                className="text-xs"
                style={{ color: textColor, opacity: 0.5 }}
              >
                {tf.desc}
              </p>
            </div>

            {/* Hero size */}
            <div className="px-8 py-20 flex items-center justify-center min-h-[280px]">
              <WordmarkBlock
                text="swaraya"
                cls={tf.cls}
                weight={tf.weight}
                tracking={tf.tracking}
                size={160}
                color={textColor}
                accentColor={accentColor}
                glyph={glyph}
                monoCls={monoCls}
              />
            </div>

            <div className="border-t" style={{ borderColor }} />

            {/* Mid + Small sizes */}
            <div className="grid grid-cols-1 md:grid-cols-2">
              <div className="px-8 py-12 flex items-center justify-center">
                <WordmarkBlock
                  text="swaraya"
                  cls={tf.cls}
                  weight={tf.weight}
                  tracking={tf.tracking}
                  size={56}
                  color={textColor}
                  accentColor={accentColor}
                  glyph={glyph}
                  monoCls={monoCls}
                />
                <span
                  className={`text-[10px] uppercase tracking-[0.2em] ml-4 ${monoCls}`}
                  style={{ color: textColor, opacity: 0.35 }}
                >
                  hero
                </span>
              </div>

              <div
                className="px-8 py-12 flex items-center justify-center border-t md:border-t-0 md:border-l"
                style={{ borderColor }}
              >
                <WordmarkBlock
                  text="swaraya"
                  cls={tf.cls}
                  weight={tf.weight}
                  tracking={tf.tracking}
                  size={22}
                  color={textColor}
                  accentColor={accentColor}
                  glyph={glyph}
                  monoCls={monoCls}
                />
                <span
                  className={`text-[10px] uppercase tracking-[0.2em] ml-4 ${monoCls}`}
                  style={{ color: textColor, opacity: 0.35 }}
                >
                  navbar
                </span>
              </div>
            </div>

            {/* Body sample */}
            <div className="border-t" style={{ borderColor }} />
            <div className="px-8 py-8">
              <p
                className={tf.cls}
                style={{
                  color: textColor,
                  opacity: 0.75,
                  fontSize: 18,
                  lineHeight: 1.55,
                  maxWidth: '46ch',
                  fontWeight: tf.weight === 500 ? 400 : tf.weight,
                  letterSpacing: '0',
                }}
              >
                Devolvemos al humano el mando de su propia inteligencia. La
                soberanía no se delega; se ejerce.
              </p>
            </div>
          </section>
        ))}
      </div>

      <footer className="border-t border-neutral-200 py-10 text-center text-xs text-neutral-500">
        <p>
          Decide tu combinación y dime:{' '}
          <span className="font-mono text-neutral-900">
            &quot;Tipografía N + Glifo X + Color&quot;
          </span>
        </p>
        <p className="mt-2 opacity-70">
          Ej: &quot;Tipografía 1 + Glifo B + Bermellón&quot; · &quot;Tipografía 4 + Glifo E + Terracota&quot;
        </p>
      </footer>
    </div>
  );
}
