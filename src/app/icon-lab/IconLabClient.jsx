'use client';

import { useState } from 'react';

// ============================================================
// THREE VARIANTS OF THE CARDINAL ASIMÉTRICO ICON
// All use the same coordinate system (viewBox 0 0 64 64)
// Center at (32, 32). NE = upper-right.
// ============================================================

// VARIANT A — Cardinal Asimétrico completo
// Center + NE long ray + N short + S medium + E/W small markers
function IconA({ size = 64, fg = '#1A1A1A', accent = '#C8553D' }) {
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" fill="none" aria-hidden>
      {/* NE long ray (dominant — from the 'r' ear) */}
      <line x1="34.5" y1="29.5" x2="58" y2="6" stroke={fg} strokeWidth="1.5" strokeLinecap="round" />
      {/* N short ray (from 'a' stems) */}
      <line x1="32" y1="28" x2="32" y2="16" stroke={fg} strokeWidth="1.5" strokeLinecap="round" />
      {/* S medium ray (from 'y' descender) */}
      <line x1="32" y1="36" x2="32" y2="52" stroke={fg} strokeWidth="1.5" strokeLinecap="round" />
      {/* E small marker (terminal) */}
      <line x1="36" y1="32" x2="44" y2="32" stroke={fg} strokeWidth="1.2" strokeLinecap="round" opacity="0.55" />
      {/* W small marker (terminal) */}
      <line x1="28" y1="32" x2="20" y2="32" stroke={fg} strokeWidth="1.2" strokeLinecap="round" opacity="0.55" />
      {/* Center — the soberano */}
      <circle cx="32" cy="32" r="2.4" fill={accent} />
    </svg>
  );
}

// VARIANT B — Minimalista: solo centro + rayo NE
function IconB({ size = 64, fg = '#1A1A1A', accent = '#C8553D' }) {
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" fill="none" aria-hidden>
      {/* NE single ray */}
      <line x1="34.5" y1="29.5" x2="58" y2="6" stroke={fg} strokeWidth="1.6" strokeLinecap="round" />
      {/* Center */}
      <circle cx="32" cy="32" r="2.6" fill={accent} />
    </svg>
  );
}

// VARIANT C — NE con curva sutil (trayectoria, no solo dirección)
function IconC({ size = 64, fg = '#1A1A1A', accent = '#C8553D' }) {
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" fill="none" aria-hidden>
      {/* NE curved trajectory — like a planet's path */}
      <path d="M 34.5 29.5 Q 46 22, 58 6" stroke={fg} strokeWidth="1.6" strokeLinecap="round" fill="none" />
      {/* Small terminal tip at the end of the curve */}
      <circle cx="58" cy="6" r="1.2" fill={fg} />
      {/* Center */}
      <circle cx="32" cy="32" r="2.6" fill={accent} />
    </svg>
  );
}

const VARIANTS = {
  A: {
    cmp: IconA,
    name: 'A · Cardinal Completo',
    tagline: 'Centro + 4 rayos asimétricos · NE dominante',
    pros: [
      'Sistema visual rico — sostiene narrativa anatómica (cada rayo viene de una letra).',
      'Legible y memorable a cualquier tamaño.',
      'Aguanta perfectamente como favicon, OG image y signature de presentaciones.',
    ],
    cons: [
      'Es el más "lleno" — requiere espacio en compositions densas.',
      'Riesgo bajo de leerse como compás genérico si los rayos quedan demasiado equilibrados.',
    ],
    bestFor: 'Identidad principal del sitio · Hero · OG image · Favicon vectorial',
  },
  B: {
    cmp: IconB,
    name: 'B · Sextante',
    tagline: 'Centro + un solo rayo NE',
    pros: [
      'Máxima síntesis — un solo gesto, una sola dirección.',
      'Imposible de confundir con cualquier otra marca.',
      'Funciona excepcionalmente como favicon a 16/32px.',
    ],
    cons: [
      'Pierde la narrativa anatómica (no se ve la contribución de 4 letras).',
      'Riesgo medio de leerse como "punto + flecha" demasiado abstracto.',
      'Solo, sin sistema, puede sentirse incompleto a tamaño hero.',
    ],
    bestFor: 'Favicon · App icon · Versión compacta para Navbar al hacer scroll',
  },
  C: {
    cmp: IconC,
    name: 'C · Trayectoria',
    tagline: 'Centro + rayo NE curvado (vector con curvatura)',
    pros: [
      'Sugiere movimiento, transformación, trayectoria — no solo dirección.',
      'Tiene un toque más "orgánico" que casa con tipografía serif cálida.',
      'Resuena con la idea de "el camino del Sabio".',
    ],
    cons: [
      'La curva debilita la fuerza geométrica del NE.',
      'Más difícil de hacer crisp a tamaños pequeños (16px favicon se ve borroso).',
      'Riesgo alto de leerse como Stripe-wave o trayectoria de cohete.',
    ],
    bestFor: 'Loading screen · Reveals cinematográficos · Hero (no como favicon)',
  },
};

// ============================================================
// MAIN
// ============================================================

export default function IconLabClient({ serifCls, monoCls }) {
  const [bg, setBg] = useState('cream');
  const [accent, setAccent] = useState('bermellon');

  const bgColor = bg === 'cream' ? '#F4F1EA' : '#1A1A1A';
  const fgColor = bg === 'cream' ? '#1A1A1A' : '#F4F1EA';
  const borderColor = bg === 'cream' ? '#E5E0D5' : '#2A2A2A';
  const accentColor = accent === 'bermellon' ? '#C8553D' : '#E08D5C';

  const keys = ['A', 'B', 'C'];

  return (
    <div className="min-h-screen" style={{ background: '#FAFAF7' }}>
      {/* Sticky control bar */}
      <div className="sticky top-0 z-20 bg-white/95 backdrop-blur border-b border-neutral-200">
        <div className="max-w-7xl mx-auto px-6 py-4 flex flex-wrap items-center gap-x-6 gap-y-3">
          <div className="flex items-center gap-3">
            <div className="w-1.5 h-1.5 rounded-full bg-[#C8553D]" />
            <h1 className="text-sm font-semibold text-neutral-900">Icon Lab · Cardinal Asimétrico</h1>
            <a href="/type-lab" className="text-xs text-neutral-500 hover:text-neutral-900 underline decoration-dotted">type lab</a>
            <a href="/morph-lab" className="text-xs text-neutral-500 hover:text-neutral-900 underline decoration-dotted">morph lab</a>
          </div>
          <div className="h-4 w-px bg-neutral-200" />
          <div className="flex items-center gap-2">
            <span className={`text-[10px] uppercase tracking-[0.15em] text-neutral-500 font-medium ${monoCls}`}>Fondo</span>
            <div className="flex bg-neutral-100 rounded-full p-1">
              {[['cream', 'Cream'], ['dark', 'Oscuro']].map(([v, l]) => (
                <button key={v} onClick={() => setBg(v)} className={`px-3 py-1.5 rounded-full text-[11px] ${bg === v ? 'bg-white shadow-sm font-medium' : 'text-neutral-500'}`}>{l}</button>
              ))}
            </div>
          </div>
          <div className="flex items-center gap-2">
            <span className={`text-[10px] uppercase tracking-[0.15em] text-neutral-500 font-medium ${monoCls}`}>Acento</span>
            <div className="flex bg-neutral-100 rounded-full p-1">
              {[['bermellon', 'Bermellón'], ['terracota', 'Terracota']].map(([v, l]) => (
                <button key={v} onClick={() => setAccent(v)} className={`px-3 py-1.5 rounded-full text-[11px] ${accent === v ? 'bg-white shadow-sm font-medium' : 'text-neutral-500'}`}>{l}</button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Intro */}
      <div className="max-w-7xl mx-auto px-6 pt-10 pb-6">
        <p className={`text-[10px] uppercase tracking-[0.2em] text-neutral-500 mb-3 ${monoCls}`}>3 variantes del cardinal asimétrico</p>
        <h2 className="text-2xl font-semibold text-neutral-900 max-w-3xl">
          Cada variante destila lo mismo: un soberano que apunta al noreste. La diferencia está en cuánto del sistema visual quieres mostrar.
        </h2>
        <p className="text-sm text-neutral-600 max-w-2xl mt-3 leading-relaxed">
          Los <b>3 ejes de evaluación</b>: legibilidad a 16px (favicon), expresividad a 200px (hero), y autonomía conceptual (¿sostiene la marca por sí solo?).
        </p>
      </div>

      {/* Side-by-side comparison at 3 sizes */}
      <div className="max-w-7xl mx-auto px-6 pb-10">
        <div className="rounded-3xl border" style={{ background: bgColor, borderColor }}>
          {/* Header row */}
          <div className="grid grid-cols-3 border-b" style={{ borderColor }}>
            {keys.map((k) => {
              const v = VARIANTS[k];
              return (
                <div key={k} className="px-6 py-5 border-r last:border-r-0" style={{ borderColor }}>
                  <div className={`text-[10px] uppercase tracking-[0.2em] ${monoCls}`} style={{ color: fgColor, opacity: 0.45 }}>{v.name}</div>
                  <div className="text-sm mt-1" style={{ color: fgColor, opacity: 0.7 }}>{v.tagline}</div>
                </div>
              );
            })}
          </div>

          {/* Hero size (200px) */}
          <div className="grid grid-cols-3 border-b" style={{ borderColor }}>
            {keys.map((k) => {
              const Cmp = VARIANTS[k].cmp;
              return (
                <div key={k} className="px-6 py-12 flex items-center justify-center border-r last:border-r-0" style={{ borderColor }}>
                  <Cmp size={200} fg={fgColor} accent={accentColor} />
                </div>
              );
            })}
          </div>
          <div className="grid grid-cols-3 border-b" style={{ borderColor }}>
            {keys.map((k) => (
              <div key={k} className={`px-6 py-2 text-center text-[10px] uppercase tracking-[0.2em] border-r last:border-r-0 ${monoCls}`} style={{ borderColor, color: fgColor, opacity: 0.4 }}>200px · hero</div>
            ))}
          </div>

          {/* Navbar size (32px) + wordmark */}
          <div className="grid grid-cols-3 border-b" style={{ borderColor }}>
            {keys.map((k) => {
              const Cmp = VARIANTS[k].cmp;
              return (
                <div key={k} className="px-6 py-10 flex items-center justify-center gap-3 border-r last:border-r-0" style={{ borderColor }}>
                  <Cmp size={32} fg={fgColor} accent={accentColor} />
                  <span className={serifCls} style={{ color: fgColor, fontSize: 28, lineHeight: 1, letterSpacing: '-0.02em' }}>swaraya</span>
                </div>
              );
            })}
          </div>
          <div className="grid grid-cols-3 border-b" style={{ borderColor }}>
            {keys.map((k) => (
              <div key={k} className={`px-6 py-2 text-center text-[10px] uppercase tracking-[0.2em] border-r last:border-r-0 ${monoCls}`} style={{ borderColor, color: fgColor, opacity: 0.4 }}>32px + wordmark · navbar</div>
            ))}
          </div>

          {/* Favicon size (16px) */}
          <div className="grid grid-cols-3" style={{ borderColor }}>
            {keys.map((k) => {
              const Cmp = VARIANTS[k].cmp;
              return (
                <div key={k} className="px-6 py-8 flex items-center justify-center gap-6 border-r last:border-r-0" style={{ borderColor }}>
                  <div className="flex items-center gap-2">
                    <Cmp size={16} fg={fgColor} accent={accentColor} />
                    <span className={`text-[10px] ${monoCls}`} style={{ color: fgColor, opacity: 0.4 }}>16px</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Cmp size={24} fg={fgColor} accent={accentColor} />
                    <span className={`text-[10px] ${monoCls}`} style={{ color: fgColor, opacity: 0.4 }}>24px</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Cmp size={48} fg={fgColor} accent={accentColor} />
                    <span className={`text-[10px] ${monoCls}`} style={{ color: fgColor, opacity: 0.4 }}>48px</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Justification cards */}
      <div className="max-w-7xl mx-auto px-6 pb-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {keys.map((k) => {
            const v = VARIANTS[k];
            const Cmp = v.cmp;
            return (
              <div key={k} className="rounded-2xl border border-neutral-200 bg-white p-6 flex flex-col">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-14 h-14 rounded-xl bg-[#F4F1EA] flex items-center justify-center shrink-0">
                    <Cmp size={48} />
                  </div>
                  <div>
                    <div className={`text-[10px] uppercase tracking-[0.18em] text-neutral-500 ${monoCls}`}>{v.name}</div>
                    <div className="text-sm font-medium text-neutral-900 mt-0.5">{v.tagline}</div>
                  </div>
                </div>

                <div className="space-y-3 text-sm flex-1">
                  <div>
                    <div className={`text-[10px] uppercase tracking-[0.18em] text-emerald-700 mb-1.5 ${monoCls}`}>A favor</div>
                    <ul className="space-y-1.5 text-neutral-700">
                      {v.pros.map((p, i) => (
                        <li key={i} className="flex gap-2 leading-relaxed text-[13px]">
                          <span className="text-emerald-600 mt-0.5">+</span>
                          <span>{p}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <div className={`text-[10px] uppercase tracking-[0.18em] text-rose-700 mb-1.5 ${monoCls}`}>En contra</div>
                    <ul className="space-y-1.5 text-neutral-700">
                      {v.cons.map((p, i) => (
                        <li key={i} className="flex gap-2 leading-relaxed text-[13px]">
                          <span className="text-rose-500 mt-0.5">−</span>
                          <span>{p}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="mt-4 pt-4 border-t border-neutral-100">
                  <div className={`text-[10px] uppercase tracking-[0.18em] text-neutral-500 mb-1 ${monoCls}`}>Mejor para</div>
                  <p className="text-[13px] text-neutral-700 leading-relaxed">{v.bestFor}</p>
                </div>
              </div>
            );
          })}
        </div>

        {/* My recommendation */}
        <div className="mt-10 rounded-2xl bg-[#1A1A1A] text-white p-6 md:p-8">
          <div className={`text-[10px] uppercase tracking-[0.2em] text-[#E08D5C] mb-3 ${monoCls}`}>Mi recomendación de oficio</div>
          <p className="text-base md:text-lg leading-relaxed max-w-3xl">
            La respuesta correcta no es elegir una — es <b>usar A y B juntas como sistema</b>. <b>A</b> vive como
            firma de marca a tamaño grande (hero, OG, presentaciones). <b>B</b> vive como reducción a tamaño pequeño
            (favicon, navbar al hacer scroll, app icon). Comparten ADN — el centro y el rayo NE son idénticos —
            así que la transición entre escalas se siente continua, no contradictoria.
          </p>
          <p className="text-sm text-neutral-400 mt-4 leading-relaxed max-w-3xl">
            <b>C (la curva)</b> queda reservada para el momento cinematográfico: pantalla de carga, animación de
            entrada, video corporativo. Es demasiado expresiva para uso diario, pero ideal para el primer encuentro
            con la marca.
          </p>
        </div>
      </div>

      {/* Anatomy breakdown */}
      <div className="max-w-7xl mx-auto px-6 pb-24">
        <h3 className={`text-[10px] uppercase tracking-[0.2em] text-neutral-500 mb-4 ${monoCls}`}>Justificación anatómica</h3>
        <div className="rounded-2xl border border-neutral-200 bg-white p-6">
          <p className="text-sm text-neutral-700 leading-relaxed mb-4">
            Cada rayo del cardinal asimétrico (Variante A) viene literalmente de un terminal tipográfico del wordmark.
            No hay nada inventado — el ícono es lo que <i>queda</i> cuando las letras se retiran.
          </p>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className={`text-left text-[10px] uppercase tracking-[0.15em] text-neutral-500 ${monoCls}`}>
                  <th className="py-2 pr-4">Rayo</th>
                  <th className="py-2 pr-4">Dirección</th>
                  <th className="py-2 pr-4">Origen tipográfico</th>
                  <th className="py-2">Lectura</th>
                </tr>
              </thead>
              <tbody className="text-neutral-800">
                <tr className="border-t border-neutral-100">
                  <td className="py-3 pr-4 font-medium">Largo</td>
                  <td className="py-3 pr-4 font-mono text-xs">NE</td>
                  <td className="py-3 pr-4">La oreja de la <b className={serifCls}>r</b> (única protuberancia direccional del wordmark)</td>
                  <td className="py-3 text-neutral-600">Dirección elegida · soberanía direccional · AI alignment con intención</td>
                </tr>
                <tr className="border-t border-neutral-100">
                  <td className="py-3 pr-4 font-medium">Corto</td>
                  <td className="py-3 pr-4 font-mono text-xs">N</td>
                  <td className="py-3 pr-4">Tope del stem de las 3 letras <b className={serifCls}>a</b></td>
                  <td className="py-3 text-neutral-600">Verticalidad · autonomía · postura erguida</td>
                </tr>
                <tr className="border-t border-neutral-100">
                  <td className="py-3 pr-4 font-medium">Medio</td>
                  <td className="py-3 pr-4 font-mono text-xs">S</td>
                  <td className="py-3 pr-4">El descender curvo de la <b className={serifCls}>y</b></td>
                  <td className="py-3 text-neutral-600">Raíz · gravedad · arraigo</td>
                </tr>
                <tr className="border-t border-neutral-100">
                  <td className="py-3 pr-4 font-medium">Marca</td>
                  <td className="py-3 pr-4 font-mono text-xs">E</td>
                  <td className="py-3 pr-4">Terminal derecho de la <b className={serifCls}>w</b></td>
                  <td className="py-3 text-neutral-600">Presencia · balance lateral</td>
                </tr>
                <tr className="border-t border-neutral-100">
                  <td className="py-3 pr-4 font-medium">Marca</td>
                  <td className="py-3 pr-4 font-mono text-xs">W</td>
                  <td className="py-3 pr-4">Rabillo superior de la <b className={serifCls}>s</b></td>
                  <td className="py-3 text-neutral-600">Origen · punto de partida del wordmark</td>
                </tr>
                <tr className="border-t border-neutral-100">
                  <td className="py-3 pr-4 font-medium">Centro</td>
                  <td className="py-3 pr-4 font-mono text-xs">·</td>
                  <td className="py-3 pr-4">Intersección visual de los baselines</td>
                  <td className="py-3 text-neutral-600">El soberano · el sí mismo · el punto de decisión</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <footer className="border-t border-neutral-200 py-10 text-center text-xs text-neutral-500">
        <p>Elige tu variante (o sistema A+B): <span className="font-mono text-neutral-900">&quot;Variante A · Bermellón&quot;</span></p>
        <p className="mt-2 opacity-70">Una vez confirmes, construyo el morph-lab v2 con esta mecánica anatómica.</p>
      </footer>
    </div>
  );
}
