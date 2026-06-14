'use client';

import { useState } from 'react';

// ---------- HELPERS ----------

// Smooth interpolation between two values based on a range
function lerp(a, b, t) {
  return a + (b - a) * Math.max(0, Math.min(1, t));
}

// Phase information
const PHASES = [
  { range: [0, 0.18], label: 'Estado íntegro' },
  { range: [0.18, 0.42], label: 'Revelación interior' },
  { range: [0.42, 0.72], label: 'Retiro de consonantes' },
  { range: [0.72, 1.01], label: 'Ícono final' },
];

function getCurrentPhase(p) {
  return PHASES.find((ph) => p >= ph.range[0] && p < ph.range[1]) || PHASES[PHASES.length - 1];
}

// ---------- MAIN ----------

export default function MorphLabClient({ serifCls, monoCls }) {
  const [progress, setProgress] = useState(0);
  const [glyphChoice, setGlyphChoice] = useState('therefore'); // therefore | dot | yantra

  const cream = '#F4F1EA';
  const sumi = '#1A1A1A';
  const accent = '#C8553D';
  const borderSoft = '#E5E0D5';

  const letters = ['s', 'w', 'a', 'r', 'a', 'y', 'a'];
  const ANCHOR_IDX = 2; // first 'a' is our anchor

  // ---- Animations per progress ----

  // Letter opacity per index
  const letterOpacity = (idx) => {
    if (idx === ANCHOR_IDX) {
      // anchor 'a': stays visible until phase 4, then fades as the bowl takes over
      if (progress < 0.72) return 1;
      return Math.max(0, 1 - (progress - 0.72) / 0.22);
    }
    // other letters: fade between 0.42 and 0.72
    if (progress < 0.42) return 1;
    if (progress > 0.72) return 0;
    return 1 - (progress - 0.42) / 0.3;
  };

  // Anchor 'a' subtle scale-up to call attention (during phase 2-3)
  const anchorScale = lerp(1, 1.08, (progress - 0.18) / 0.4);

  // Inner glyph: initial near-zero presence in phase 0, emerges in phase 1
  // opacity ramps 0.05 → 1
  const innerGlyphOpacity = lerp(0.08, 1, progress * 1.4);
  // size relative to letter — starts very small, grows
  const innerGlyphScale = lerp(0.35, 1.05, progress);

  // Wordmark tracking opens slightly during transition
  const tracking = lerp(-0.02, 0.02, progress);

  // The "bowl" — emerges from inside the 'a' position
  // Phase 0: invisible (the 'a' contains its own implicit bowl)
  // Phase 2 onward: a visible circle appears overlaid on the bowl position,
  //                 grows in size while staying anchored to that center
  const bowlOpacity = progress < 0.42 ? 0 : Math.min(1, (progress - 0.42) / 0.18);
  // Bowl size grows from the actual letter bowl (~80px diameter at 200px font)
  // to a large final icon
  const bowlSize = lerp(90, 380, (progress - 0.42) / 0.58);

  // Where the bowl is centered, in pixels offset from canvas center.
  // Initially anchored to the first 'a' position in the wordmark.
  // Finally centered at (0, 0).
  // Wordmark center is approx 0. The first 'a' is to the LEFT of center.
  // For wordmark "swaraya" at width ~ 800px, the first 'a' is at ~ -200px from center.
  const bowlXOffset = lerp(-180, 0, progress);
  const bowlYOffset = lerp(20, 0, progress); // bowl sits slightly below baseline center

  const phaseInfo = getCurrentPhase(progress);

  const innerGlyph = (size, color) => {
    if (glyphChoice === 'therefore') {
      return (
        <span
          className={serifCls}
          style={{ color, fontSize: size, lineHeight: 1, display: 'inline-block', transform: 'translateY(-0.04em)' }}
        >
          ∴
        </span>
      );
    }
    if (glyphChoice === 'yantra') {
      return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.2" strokeLinecap="round">
          <rect x="6" y="6" width="12" height="12" transform="rotate(45 12 12)" />
          <circle cx="12" cy="12" r="1.6" fill={color} stroke="none" />
        </svg>
      );
    }
    // dot
    return (
      <div style={{ width: size * 0.4, height: size * 0.4, borderRadius: '50%', background: color }} />
    );
  };

  return (
    <div className="min-h-screen flex flex-col" style={{ background: '#FAFAF7' }}>
      {/* Sticky control bar */}
      <div className="sticky top-0 z-20 bg-white/95 backdrop-blur border-b border-neutral-200">
        <div className="max-w-5xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between gap-4 mb-4">
            <div className="flex items-center gap-3">
              <div className="w-1.5 h-1.5 rounded-full bg-[#C8553D]" />
              <h1 className="text-sm font-semibold text-neutral-900">Morph Lab · Bowl Reveal</h1>
              <a href="/type-lab" className="text-xs text-neutral-500 hover:text-neutral-900 underline decoration-dotted">
                ← volver al type lab
              </a>
            </div>
            <div className="flex items-center gap-2">
              <span className={`text-[10px] uppercase tracking-[0.18em] text-neutral-500 ${monoCls}`}>Glifo interior</span>
              <div className="flex bg-neutral-100 rounded-full p-1 text-[11px]">
                {[
                  ['therefore', '∴'],
                  ['yantra', '◇'],
                  ['dot', '•'],
                ].map(([val, lbl]) => (
                  <button
                    key={val}
                    onClick={() => setGlyphChoice(val)}
                    className={`px-3 py-1 rounded-full transition-all ${glyphChoice === val ? 'bg-white shadow-sm text-neutral-900 font-medium' : 'text-neutral-500'}`}
                  >
                    {lbl}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Slider */}
          <div className="flex items-center gap-4">
            <span className={`text-[10px] tabular-nums w-10 ${monoCls} text-neutral-500`}>{Math.round(progress * 100)}%</span>
            <input
              type="range"
              min={0}
              max={1000}
              value={progress * 1000}
              onChange={(e) => setProgress(Number(e.target.value) / 1000)}
              className="flex-1 accent-[#C8553D]"
              style={{ height: 4 }}
            />
            <span className={`text-[10px] tabular-nums w-20 ${monoCls} text-neutral-500 text-right`}>
              {phaseInfo.label}
            </span>
          </div>

          {/* Quick presets */}
          <div className="flex gap-2 mt-3">
            {[0, 0.25, 0.5, 0.75, 1].map((p) => (
              <button
                key={p}
                onClick={() => setProgress(p)}
                className={`px-2.5 py-1 rounded-md text-[10px] border transition-all ${monoCls} ${
                  Math.abs(progress - p) < 0.02 ? 'bg-[#1A1A1A] text-white border-[#1A1A1A]' : 'border-neutral-200 text-neutral-600 hover:border-neutral-300'
                }`}
              >
                {Math.round(p * 100)}%
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Canvas */}
      <div className="flex-1 flex items-center justify-center px-6 py-12" style={{ minHeight: 520 }}>
        <div
          className="relative w-full max-w-5xl rounded-3xl border flex items-center justify-center overflow-hidden"
          style={{ background: cream, borderColor: borderSoft, minHeight: 460 }}
        >
          {/* Subtle baseline guide */}
          <div className="absolute inset-x-0 top-1/2 h-px" style={{ background: 'rgba(26,26,26,0.04)' }} />

          {/* Wordmark — individual letter spans */}
          <div
            className={serifCls}
            style={{
              position: 'relative',
              fontSize: 'clamp(96px, 14vw, 200px)',
              lineHeight: 1,
              color: sumi,
              letterSpacing: `${tracking}em`,
              whiteSpace: 'nowrap',
              zIndex: 1,
            }}
          >
            {letters.map((char, idx) => (
              <span
                key={idx}
                style={{
                  display: 'inline-block',
                  opacity: letterOpacity(idx),
                  transform: idx === ANCHOR_IDX ? `scale(${anchorScale})` : 'none',
                  transformOrigin: 'center bottom',
                  transition: 'opacity 0.08s linear, transform 0.08s linear',
                  position: 'relative',
                }}
              >
                {char}
                {/* The inner glyph lives INSIDE the bowl of the anchor 'a' */}
                {idx === ANCHOR_IDX && (
                  <span
                    style={{
                      position: 'absolute',
                      // 'a' bowl center: roughly horizontal middle, ~68% from top (lower x-height)
                      left: '50%',
                      top: '68%',
                      transform: `translate(-50%, -50%) scale(${innerGlyphScale})`,
                      opacity: innerGlyphOpacity,
                      transition: 'opacity 0.08s linear, transform 0.08s linear',
                      pointerEvents: 'none',
                      lineHeight: 1,
                    }}
                  >
                    {innerGlyph('0.22em', accent)}
                  </span>
                )}
              </span>
            ))}
          </div>

          {/* The "growing bowl" — emerges from the anchor 'a' position
              and expands into the final icon at canvas center */}
          <div
            style={{
              position: 'absolute',
              left: '50%',
              top: '50%',
              transform: `translate(calc(-50% + ${bowlXOffset}px), calc(-50% + ${bowlYOffset}px))`,
              width: bowlSize,
              height: bowlSize,
              borderRadius: '50%',
              border: `${lerp(2, 3, progress)}px solid ${sumi}`,
              opacity: bowlOpacity,
              transition: 'opacity 0.1s linear, transform 0.1s linear, width 0.1s linear, height 0.1s linear',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              zIndex: 2,
              pointerEvents: 'none',
            }}
          >
            {/* Final inner glyph (only fully visible at end) */}
            <div style={{ opacity: bowlOpacity }}>
              {innerGlyph(bowlSize * 0.42, accent)}
            </div>
          </div>
        </div>
      </div>

      {/* Phase explanations */}
      <div className="max-w-5xl mx-auto px-6 pb-16 w-full">
        <h2 className={`text-[10px] uppercase tracking-[0.2em] text-neutral-500 mb-4 ${monoCls}`}>
          Las 4 fases del morph
        </h2>
        <div className="space-y-2">
          <PhaseRow
            active={progress < 0.18}
            pct="0—18%"
            name="Estado íntegro"
            desc="Wordmark estable. El glifo interior vive imperceptible dentro del bowl de la primera 'a'. El ojo lo registra inconscientemente — está ahí desde el primer segundo, no aparece de la nada."
            monoCls={monoCls}
          />
          <PhaseRow
            active={progress >= 0.18 && progress < 0.42}
            pct="18—42%"
            name="Revelación interior"
            desc="El glifo dentro del bowl emerge. La 'a' ancla recibe un sutil énfasis de escala (8%). Las consonantes aún están presentes. La marca sigue siendo wordmark, pero ya hay tensión narrativa."
            monoCls={monoCls}
          />
          <PhaseRow
            active={progress >= 0.42 && progress < 0.72}
            pct="42—72%"
            name="Retiro de consonantes"
            desc="Las letras 's·w·r·y' y la segunda 'a' se desvanecen. Permanece la 'a' ancla con su glifo interior. Simultáneamente, el bowl emerge como forma propia (círculo) anclado a la misma posición."
            monoCls={monoCls}
          />
          <PhaseRow
            active={progress >= 0.72}
            pct="72—100%"
            name="Ícono final"
            desc="La 'a' como letra se desvanece, el bowl-círculo crece y se centra. Lo que era anatomía tipográfica ahora es marca autónoma. El glifo interior está en su escala final."
            monoCls={monoCls}
          />
        </div>

        {/* Integrity manifesto */}
        <div className="mt-10 rounded-2xl border border-neutral-200 bg-white p-6">
          <h3 className={`text-[10px] uppercase tracking-[0.2em] text-[#C8553D] mb-3 ${monoCls}`}>
            Por qué este morph se siente íntegro
          </h3>
          <ul className="space-y-2.5 text-sm text-neutral-700 leading-relaxed">
            <li className="flex gap-3">
              <span className={`text-neutral-400 ${monoCls} text-xs mt-0.5`}>01</span>
              <span><b className="text-neutral-900">ADN visual compartido.</b> El círculo final ES el bowl de la 'a', con el mismo grosor de trazo. No es un círculo añadido — es la anatomía tipográfica liberada.</span>
            </li>
            <li className="flex gap-3">
              <span className={`text-neutral-400 ${monoCls} text-xs mt-0.5`}>02</span>
              <span><b className="text-neutral-900">Color con continuidad.</b> El acento bermellón siempre estuvo ahí (visible casi desde el 8%). El morph solo lo amplifica. No aparece de la nada.</span>
            </li>
            <li className="flex gap-3">
              <span className={`text-neutral-400 ${monoCls} text-xs mt-0.5`}>03</span>
              <span><b className="text-neutral-900">Posición anclada.</b> El bowl crece DESDE el lugar exacto donde estaba en la 'a', y solo en la fase final se centra. El usuario percibe el desplazamiento como natural, no teletransportación.</span>
            </li>
            <li className="flex gap-3">
              <span className={`text-neutral-400 ${monoCls} text-xs mt-0.5`}>04</span>
              <span><b className="text-neutral-900">Reversibilidad orgánica.</b> Hacer scroll hacia arriba devuelve el bowl a su posición original dentro de la 'a' y exhala las letras restantes. No es fade in/out — es expansión geométrica continua.</span>
            </li>
            <li className="flex gap-3">
              <span className={`text-neutral-400 ${monoCls} text-xs mt-0.5`}>05</span>
              <span><b className="text-neutral-900">Predecibilidad.</b> Después de verlo 2 veces, el ojo anticipa la transformación. Esa anticipación es la prueba de integridad — el morph se siente inevitable, no sorpresivo.</span>
            </li>
          </ul>
        </div>

        {/* Notes on next steps */}
        <div className="mt-6 rounded-2xl border border-dashed border-neutral-300 bg-transparent p-5">
          <h3 className={`text-[10px] uppercase tracking-[0.2em] text-neutral-500 mb-2 ${monoCls}`}>
            Notas técnicas para la integración
          </h3>
          <p className="text-xs text-neutral-600 leading-relaxed">
            Este preview usa un slider para que tú controles el progreso. En el sitio real, el progreso
            será impulsado por el <b>scroll del viewport</b> (0px = 0%, ~240px = 100%) con throttle
            de 16ms. En el Navbar sticky, el progreso queda fijo en 100% (ícono compacto), con un
            hover-state que "exhala" al wordmark completo. En la pantalla de carga, el progreso loopea
            0 → 1 → 0 cada 3s.
          </p>
        </div>

        <div className="mt-8 text-center">
          <p className="text-sm text-neutral-600">
            ¿Apruebas la mecánica? Dímelo y lo integro al Navbar real del sitio.
          </p>
        </div>
      </div>
    </div>
  );
}

function PhaseRow({ active, pct, name, desc, monoCls }) {
  return (
    <div
      className="flex gap-4 p-4 rounded-xl transition-colors"
      style={{
        background: active ? 'rgba(200,85,61,0.06)' : 'transparent',
        border: active ? '1px solid rgba(200,85,61,0.2)' : '1px solid transparent',
      }}
    >
      <span className={`${monoCls} text-[10px] text-neutral-500 w-20 shrink-0 mt-1 tabular-nums`}>{pct}</span>
      <div className="flex-1">
        <div className={`text-sm font-medium ${active ? 'text-[#1A1A1A]' : 'text-neutral-700'}`}>{name}</div>
        <p className="text-xs text-neutral-600 mt-1 leading-relaxed">{desc}</p>
      </div>
      {active && <div className="w-1 h-1 rounded-full bg-[#C8553D] mt-2 shrink-0" />}
    </div>
  );
}
