'use client';

import { useState } from 'react';

// ---------- SUN SYMBOLS ----------

const SunA = ({ color, size = 48 }) => (
  // Yantra: hollow circle + 8 straight rays
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke={color}
    strokeWidth="1.2"
    strokeLinecap="round"
    aria-hidden
  >
    <circle cx="12" cy="12" r="3.6" />
    <line x1="12" y1="2" x2="12" y2="5" />
    <line x1="12" y1="19" x2="12" y2="22" />
    <line x1="2" y1="12" x2="5" y2="12" />
    <line x1="19" y1="12" x2="22" y2="12" />
    <line x1="4.93" y1="4.93" x2="7.05" y2="7.05" />
    <line x1="16.95" y1="16.95" x2="19.07" y2="19.07" />
    <line x1="4.93" y1="19.07" x2="7.05" y2="16.95" />
    <line x1="16.95" y1="7.05" x2="19.07" y2="4.93" />
  </svg>
);

const SunB = ({ color, size = 48 }) => (
  // Mon japonés: solid disc with subtle orbit dots
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill={color}
    aria-hidden
  >
    <circle cx="12" cy="12" r="5" />
    <circle cx="12" cy="2.6" r="0.85" />
    <circle cx="12" cy="21.4" r="0.85" />
    <circle cx="2.6" cy="12" r="0.85" />
    <circle cx="21.4" cy="12" r="0.85" />
    <circle cx="5.4" cy="5.4" r="0.6" />
    <circle cx="18.6" cy="18.6" r="0.6" />
    <circle cx="5.4" cy="18.6" r="0.6" />
    <circle cx="18.6" cy="5.4" r="0.6" />
  </svg>
);

const SunC = ({ color, size = 48 }) => (
  // Sectorial: semicircle horizon with 5 rays
  <svg
    width={size}
    height={size * 0.62}
    viewBox="0 0 24 15"
    fill="none"
    stroke={color}
    strokeWidth="1.2"
    strokeLinecap="round"
    aria-hidden
  >
    <path d="M3 14 A 9 9 0 0 1 21 14" />
    <line x1="12" y1="1.2" x2="12" y2="4.2" />
    <line x1="6.2" y1="3.2" x2="7.7" y2="5.8" />
    <line x1="17.8" y1="3.2" x2="16.3" y2="5.8" />
    <line x1="1.4" y1="9.2" x2="3.9" y2="9.7" />
    <line x1="22.6" y1="9.2" x2="20.1" y2="9.7" />
  </svg>
);

const SUNS = {
  A: SunA,
  B: SunB,
  C: SunC,
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
            className={`px-3 py-1.5 rounded-full text-xs transition-all ${
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

// ---------- MAIN ----------

export default function TypeLabClient({ typefaces }) {
  const [bg, setBg] = useState('cream');
  const [accent, setAccent] = useState('bermellon');
  const [sun, setSun] = useState('A');

  const bgColor = bg === 'cream' ? '#F4F1EA' : '#1A1A1A';
  const textColor = bg === 'cream' ? '#1A1A1A' : '#F4F1EA';
  const borderColor = bg === 'cream' ? '#E5E0D5' : '#2A2A2A';
  const accentColor = accent === 'bermellon' ? '#C8553D' : '#E08D5C';

  const SunCmp = sun !== 'none' ? SUNS[sun] : null;

  return (
    <div className="min-h-screen" style={{ background: '#FAFAF7' }}>
      {/* Sticky control bar */}
      <div className="sticky top-0 z-20 backdrop-blur-md bg-white/85 border-b border-neutral-200">
        <div className="max-w-6xl mx-auto px-6 py-3 flex flex-wrap items-center gap-x-6 gap-y-3">
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
            label="Sol"
            value={sun}
            setValue={setSun}
            options={[
              ['none', 'Ninguno'],
              ['A', 'A'],
              ['B', 'B'],
              ['C', 'C'],
            ]}
          />
        </div>
      </div>

      {/* Palette legend */}
      <div className="max-w-6xl mx-auto px-6 pt-8 pb-3">
        <div className="flex flex-wrap items-center gap-4 text-[11px] text-neutral-500">
          <span className="uppercase tracking-[0.15em] font-medium">Paleta</span>
          <Swatch hex="#F4F1EA" name="Cream" />
          <Swatch hex="#1A1A1A" name="Sumi" />
          <Swatch hex="#C8553D" name="Bermellón" />
          <Swatch hex="#E08D5C" name="Terracota" />
        </div>
      </div>

      {/* Intro */}
      <div className="max-w-6xl mx-auto px-6 pt-2 pb-6">
        <p className="text-sm text-neutral-600 max-w-2xl leading-relaxed">
          5 tipografías premium (todas gratis vía Google Fonts) escritas en su
          forma natural, con la opción de añadir un símbolo del sol al lado.
          Usa los controles arriba para alternar fondo, acento y forma del sol.
          Cuando decidas, dímelo así:
          <br />
          <span className="font-mono text-neutral-900 mt-1 inline-block">
            &quot;Tipografía [1-5] + Sol [A/B/C/Ninguno] + [Bermellón/Terracota]&quot;
          </span>
        </p>
      </div>

      {/* Typefaces grid */}
      <div className="max-w-6xl mx-auto px-6 pb-24 space-y-10">
        {typefaces.map((tf) => (
          <section
            key={tf.id}
            className="rounded-3xl overflow-hidden border transition-colors"
            style={{ background: bgColor, borderColor: borderColor }}
          >
            {/* Header */}
            <div
              className="px-8 py-5 border-b flex justify-between items-baseline gap-4 flex-wrap"
              style={{ borderColor }}
            >
              <div className="flex items-baseline gap-3">
                <span
                  className="text-[10px] uppercase tracking-[0.2em] font-mono"
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
            <div className="px-8 py-20 flex items-center justify-center gap-8 flex-wrap">
              {SunCmp && <SunCmp color={accentColor} size={110} />}
              <span
                className={tf.cls}
                style={{
                  color: textColor,
                  fontSize: 'clamp(96px, 14vw, 200px)',
                  fontWeight: tf.weight,
                  lineHeight: 1,
                  letterSpacing: tf.tracking,
                }}
              >
                swaraya
              </span>
            </div>

            <div className="border-t" style={{ borderColor }} />

            {/* Mid + Small sizes */}
            <div
              className="grid grid-cols-1 md:grid-cols-2"
              style={{ borderColor }}
            >
              {/* Hero card */}
              <div className="px-8 py-12 flex items-center justify-center gap-4">
                {SunCmp && <SunCmp color={accentColor} size={44} />}
                <span
                  className={tf.cls}
                  style={{
                    color: textColor,
                    fontSize: 64,
                    fontWeight: tf.weight,
                    lineHeight: 1,
                    letterSpacing: tf.tracking,
                  }}
                >
                  swaraya
                </span>
                <span
                  className="text-[10px] uppercase tracking-[0.2em] ml-2 font-mono"
                  style={{ color: textColor, opacity: 0.35 }}
                >
                  hero
                </span>
              </div>

              {/* Navbar card */}
              <div
                className="px-8 py-12 flex items-center justify-center gap-2.5 border-t md:border-t-0 md:border-l"
                style={{ borderColor }}
              >
                {SunCmp && <SunCmp color={accentColor} size={18} />}
                <span
                  className={tf.cls}
                  style={{
                    color: textColor,
                    fontSize: 22,
                    fontWeight: tf.weight,
                    lineHeight: 1,
                    letterSpacing: tf.tracking,
                  }}
                >
                  swaraya
                </span>
                <span
                  className="text-[10px] uppercase tracking-[0.2em] ml-3 font-mono"
                  style={{ color: textColor, opacity: 0.35 }}
                >
                  navbar
                </span>
              </div>
            </div>

            {/* Body sentence */}
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
          Decide tu combinación favorita y dime:{' '}
          <span className="font-mono text-neutral-900">
            &quot;Tipografía N + Sol X + Color&quot;
          </span>
        </p>
        <p className="mt-2 opacity-70">
          Ej: &quot;Tipografía 3 + Sol A + Bermellón&quot; · &quot;Tipografía 1 + Sin sol + Terracota&quot;
        </p>
      </footer>
    </div>
  );
}
