'use client';

// Site colors (exact)
const CREAM = '#F5F2EC';
const SUMI = '#0E0F11';
const INDIGO = '#2C3E80';
const MUTED = '#5D6878';

// ============================================================
// PARAMETRIC ICON
// ============================================================
function Icon({
  size = 30,
  fg = SUMI,
  accent = INDIGO,
  strokeWidth = 2.6,
  dotR = 2.6,
  accentStroke = null, // override stroke of the NE diagonal
}) {
  const aStroke = accentStroke ?? strokeWidth * 1.15;
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" fill="none" aria-hidden style={{ display: 'block', flexShrink: 0 }}>
      <line x1="24" y1="3" x2="24" y2="16" stroke={fg} strokeWidth={strokeWidth} strokeLinecap="round" />
      <line x1="24" y1="32" x2="24" y2="45" stroke={fg} strokeWidth={strokeWidth} strokeLinecap="round" />
      <line x1="32" y1="24" x2="45" y2="24" stroke={fg} strokeWidth={strokeWidth} strokeLinecap="round" />
      <line x1="3" y1="24" x2="16" y2="24" stroke={fg} strokeWidth={strokeWidth} strokeLinecap="round" />
      <circle cx="24" cy="24" r={dotR} fill={accent} />
      <line x1="32" y1="16" x2="45" y2="3" stroke={accent} strokeWidth={aStroke} strokeLinecap="round" />
    </svg>
  );
}

// ============================================================
// HERO SIMULATION — mimics the actual site
// ============================================================
function HeroSim({ navBg, navTextColor, iconProps, overlay, footerHint }) {
  return (
    <div style={{ position: 'relative', background: CREAM, overflow: 'hidden' }}>
      {/* Optional overlay (Camino B) */}
      {overlay && (
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background: overlay,
            pointerEvents: 'none',
          }}
        />
      )}

      {/* Navbar */}
      <div
        style={{
          position: 'relative',
          zIndex: 2,
          background: navBg,
          borderBottom: navBg.includes('rgba') ? '1px solid rgba(14,15,17,0.06)' : 'none',
          backdropFilter: navBg.includes('rgba') ? 'blur(8px)' : 'none',
        }}
      >
        <div className="px-5 flex items-center justify-between h-[56px]">
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, color: navTextColor }}>
            <Icon
              size={28}
              fg="currentColor"
              accent={iconProps.accent || INDIGO}
              strokeWidth={iconProps.strokeWidth || 2.6}
              dotR={iconProps.dotR || 2.6}
              accentStroke={iconProps.accentStroke}
            />
            <span style={{ fontFamily: "'Inter', sans-serif", fontWeight: 700, fontSize: 18, letterSpacing: '-0.025em' }}>
              swaraya
            </span>
          </div>
          <button
            style={{
              background: INDIGO,
              color: CREAM,
              padding: '7px 16px',
              borderRadius: 999,
              fontSize: 11,
              fontWeight: 500,
              fontFamily: "'Inter', sans-serif",
            }}
          >
            Iniciar Diálogo
          </button>
        </div>
      </div>

      {/* Hero content */}
      <div style={{ position: 'relative', zIndex: 1, padding: '36px 22px 48px', color: SUMI }}>
        <div style={{ fontSize: 9, letterSpacing: '0.2em', textTransform: 'uppercase', color: INDIGO, marginBottom: 10 }}>
          — Agencia de IA Aplicada
        </div>
        <h3 style={{ fontFamily: "'Inter', sans-serif", fontWeight: 700, fontSize: 28, lineHeight: 1.05, letterSpacing: '-0.03em', margin: 0 }}>
          Inteligencia real.
          <br />
          <span style={{ color: INDIGO }}>Para decisiones reales.</span>
        </h3>
        <p style={{ fontSize: 11, color: MUTED, marginTop: 12, maxWidth: 280, lineHeight: 1.5 }}>
          Pensamiento de nivel investigación. Sistemas de nivel operativo.
        </p>
      </div>

      {/* Footer hint */}
      {footerHint && (
        <div style={{ background: SUMI, padding: '14px 22px', color: CREAM, display: 'flex', alignItems: 'center', gap: 7 }}>
          <Icon
            size={22}
            fg="currentColor"
            accent={iconProps.accent || INDIGO}
            strokeWidth={iconProps.strokeWidth || 2.6}
            dotR={iconProps.dotR || 2.6}
            accentStroke={iconProps.accentStroke}
          />
          <span style={{ fontFamily: "'Inter', sans-serif", fontWeight: 700, fontSize: 14, letterSpacing: '-0.025em' }}>
            swaraya
          </span>
        </div>
      )}
    </div>
  );
}

// ============================================================
// MAIN
// ============================================================
export default function IndigoImpactClient({ monoCls }) {
  const caminos = [
    {
      id: 'CURRENT',
      label: 'Estado actual',
      tag: 'Lo que hay en el sitio',
      desc: 'Cardinales sumi, dot indigo #2C3E80 (radio 2.6), diagonal NE indigo. Tamaño normal.',
      pros: ['Coherencia total: un solo indigo en todo el sitio', 'Cero cambios al CTA, hero, footer'],
      cons: ['El indigo casi no se percibe sobre cream — lee como negro'],
      hero: {
        navBg: CREAM,
        navTextColor: SUMI,
        iconProps: { accent: INDIGO, strokeWidth: 2.6, dotR: 2.6 },
      },
      scrolled: {
        navBg: 'rgba(245,242,236,0.92)',
        navTextColor: SUMI,
        iconProps: { accent: INDIGO, strokeWidth: 2.6, dotR: 2.6 },
      },
    },
    {
      id: 'A-THICKER',
      label: 'A · Engrosar indigo',
      tag: 'Sin cambiar color, solo área',
      desc: 'Mismo indigo #2C3E80 pero dot radio 4 (de 2.6) y diagonal NE stroke 4. El color oscuro lee mejor porque hay más superficie.',
      pros: ['Un solo indigo en todo el sitio', 'Coherencia con CTA y hero', 'Indigo visible sin cambio cromático'],
      cons: ['El ícono se siente un poco más "fuerte" visualmente', 'Cardinales siguen finos — asimetría intencional'],
      hero: {
        navBg: CREAM,
        navTextColor: SUMI,
        iconProps: { accent: INDIGO, strokeWidth: 2.6, dotR: 4, accentStroke: 4 },
      },
      scrolled: {
        navBg: 'rgba(245,242,236,0.92)',
        navTextColor: SUMI,
        iconProps: { accent: INDIGO, strokeWidth: 2.6, dotR: 4, accentStroke: 4 },
      },
    },
    {
      id: 'B-OVERLAY',
      label: 'B · Hero con overlay sutil',
      tag: 'Hero ligeramente más oscuro',
      desc: 'Capa de overlay rgba(14,15,17,0.06) sobre el hero. Cream se ensombrece sutilmente. El indigo gana contraste sin perder identidad editorial.',
      pros: ['Indigo más visible sin tocar colores', 'Hero gana profundidad visual', 'Solo afecta al hero, no a resto del sitio'],
      cons: ['Cambia ligeramente el carácter "luminoso" del hero', 'Hay que decidir si el overlay sigue todo el hero o solo cerca del navbar'],
      hero: {
        navBg: 'rgba(14,15,17,0.04)',
        navTextColor: SUMI,
        iconProps: { accent: INDIGO, strokeWidth: 2.6, dotR: 2.6 },
        overlay: 'rgba(14,15,17,0.06)',
      },
      scrolled: {
        navBg: 'rgba(245,242,236,0.92)',
        navTextColor: SUMI,
        iconProps: { accent: INDIGO, strokeWidth: 2.6, dotR: 2.6 },
      },
    },
    {
      id: 'C-INVERT',
      label: 'C · Navbar invierte al scroll',
      tag: 'Logo blanco al hacer scroll',
      desc: 'En hero: logo sumi sobre cream (como ahora). Al hacer scroll: el navbar gana fondo oscuro y el logo + wordmark se vuelven cream. El indigo del ícono brilla intensamente sobre fondo oscuro.',
      pros: ['Indigo se ve PERFECTAMENTE al hacer scroll (sobre oscuro)', 'Da personalidad cinematográfica al navbar', 'Concepto nuevo, diferenciador'],
      cons: ['El logo a tamaño hero sigue con indigo subtle', 'Cambio mayor del comportamiento del navbar', 'Puede confundir al usuario el cambio de color del logo'],
      hero: {
        navBg: CREAM,
        navTextColor: SUMI,
        iconProps: { accent: INDIGO, strokeWidth: 2.6, dotR: 2.6 },
      },
      scrolled: {
        navBg: 'rgba(14,15,17,0.95)',
        navTextColor: CREAM,
        iconProps: { accent: INDIGO, strokeWidth: 2.6, dotR: 2.6 },
      },
    },
  ];

  return (
    <div className="min-h-screen" style={{ background: '#FAFAF7' }}>
      {/* Header */}
      <div className="sticky top-0 z-20 bg-white/95 backdrop-blur border-b border-neutral-200">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center gap-4">
          <div className="w-1.5 h-1.5 rounded-full" style={{ background: INDIGO }} />
          <h1 className="text-sm font-semibold text-neutral-900">Indigo Impact · simulación en contexto</h1>
          <span className={`text-[10px] uppercase tracking-[0.18em] text-neutral-500 ml-2 ${monoCls}`}>
            comparación · no toca el sitio
          </span>
          <a href="/" className="ml-auto text-xs underline text-neutral-600">ver sitio actual →</a>
        </div>
      </div>

      {/* Intro */}
      <section className="max-w-7xl mx-auto px-6 pt-10 pb-6">
        <div className={`text-[10px] uppercase tracking-[0.2em] text-neutral-500 mb-2 ${monoCls}`}>4 caminos en contexto real</div>
        <h2 className="text-2xl font-semibold text-neutral-900 mb-2 max-w-3xl">
          Cada simulación muestra un hero completo (navbar + headline + CTA) + footer compacto.
        </h2>
        <p className="text-sm text-neutral-600 max-w-2xl mb-2 leading-relaxed">
          Tamaño del ícono <b>normal</b> (28px en navbar, 22px en footer) para que veas cómo se percibe en uso real,
          no en exhibición. Compara el indigo del ícono con el indigo del botón &quot;Iniciar Diálogo&quot; y el del subtítulo.
        </p>
      </section>

      {/* The 4 simulations */}
      <section className="max-w-7xl mx-auto px-6 pb-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {caminos.map((c) => (
            <div key={c.id} className="rounded-3xl overflow-hidden border bg-white" style={{ borderColor: 'rgba(14,15,17,0.08)' }}>
              {/* Header */}
              <div className="px-6 py-4 border-b" style={{ borderColor: 'rgba(14,15,17,0.08)' }}>
                <div className={`text-[10px] uppercase tracking-[0.2em] text-neutral-500 ${monoCls}`}>{c.id}</div>
                <div className="text-base font-semibold text-neutral-900 mt-1">{c.label}</div>
                <div className="text-xs text-neutral-500 mt-1">{c.tag}</div>
              </div>

              {/* HERO STATE simulation */}
              <div className="relative">
                <div className={`absolute top-3 right-3 z-10 text-[9px] uppercase tracking-[0.2em] px-2 py-0.5 rounded-full ${monoCls}`} style={{ background: 'rgba(255,255,255,0.85)', color: MUTED }}>
                  hero · top
                </div>
                <HeroSim
                  navBg={c.hero.navBg}
                  navTextColor={c.hero.navTextColor}
                  iconProps={c.hero.iconProps}
                  overlay={c.hero.overlay}
                  footerHint={true}
                />
              </div>

              {/* SCROLLED STATE simulation (just the navbar in scrolled mode) */}
              <div className="relative border-t" style={{ borderColor: 'rgba(14,15,17,0.08)' }}>
                <div className={`absolute top-3 right-3 z-10 text-[9px] uppercase tracking-[0.2em] px-2 py-0.5 rounded-full ${monoCls}`} style={{ background: 'rgba(255,255,255,0.85)', color: MUTED }}>
                  scrolled
                </div>
                <div
                  style={{
                    position: 'relative',
                    background: c.scrolled.navBg.includes('rgba(14') ? CREAM : CREAM,
                    overflow: 'hidden',
                  }}
                >
                  {/* fake "content underneath" */}
                  <div style={{
                    position: 'absolute',
                    inset: 0,
                    backgroundImage: 'linear-gradient(180deg, transparent, rgba(14,15,17,0.04))',
                    pointerEvents: 'none',
                  }} />
                  {/* Navbar in scrolled mode */}
                  <div
                    style={{
                      position: 'relative',
                      background: c.scrolled.navBg,
                      backdropFilter: 'blur(20px)',
                      borderBottom: '1px solid rgba(14,15,17,0.06)',
                      zIndex: 2,
                    }}
                  >
                    <div className="px-5 flex items-center justify-between h-[56px]">
                      <div style={{ display: 'flex', alignItems: 'center', gap: 8, color: c.scrolled.navTextColor }}>
                        <Icon
                          size={28}
                          fg="currentColor"
                          accent={c.scrolled.iconProps.accent}
                          strokeWidth={c.scrolled.iconProps.strokeWidth}
                          dotR={c.scrolled.iconProps.dotR}
                          accentStroke={c.scrolled.iconProps.accentStroke}
                        />
                        <span style={{ fontFamily: "'Inter', sans-serif", fontWeight: 700, fontSize: 18, letterSpacing: '-0.025em' }}>
                          swaraya
                        </span>
                      </div>
                      <button
                        style={{
                          background: INDIGO,
                          color: CREAM,
                          padding: '7px 16px',
                          borderRadius: 999,
                          fontSize: 11,
                          fontWeight: 500,
                          fontFamily: "'Inter', sans-serif",
                        }}
                      >
                        Iniciar Diálogo
                      </button>
                    </div>
                  </div>
                  {/* sample content below to suggest scroll position */}
                  <div style={{ position: 'relative', padding: '24px 22px 36px', color: SUMI, zIndex: 1 }}>
                    <div style={{ fontSize: 11, color: MUTED, marginBottom: 6 }}>
                      Sección "Método"
                    </div>
                    <p style={{ fontSize: 13, color: MUTED, maxWidth: 280, lineHeight: 1.5 }}>
                      El usuario ya hizo scroll. El navbar está en modo &quot;sticky&quot; sobre el contenido.
                    </p>
                  </div>
                </div>
              </div>

              {/* Pros / Cons */}
              <div className="px-6 py-5 border-t bg-neutral-50/50" style={{ borderColor: 'rgba(14,15,17,0.08)' }}>
                <p className="text-xs text-neutral-700 mb-4 leading-relaxed">{c.desc}</p>
                <div className="grid grid-cols-2 gap-4 text-[12px]">
                  <div>
                    <div className={`text-[10px] uppercase tracking-[0.18em] text-emerald-700 mb-1.5 ${monoCls}`}>A favor</div>
                    <ul className="space-y-1 text-neutral-700">
                      {c.pros.map((p, i) => (
                        <li key={i} className="flex gap-1.5 leading-tight">
                          <span className="text-emerald-600">+</span><span>{p}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <div className={`text-[10px] uppercase tracking-[0.18em] text-rose-700 mb-1.5 ${monoCls}`}>En contra</div>
                    <ul className="space-y-1 text-neutral-700">
                      {c.cons.map((p, i) => (
                        <li key={i} className="flex gap-1.5 leading-tight">
                          <span className="text-rose-500">−</span><span>{p}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* My take */}
      <section className="max-w-7xl mx-auto px-6 pb-24">
        <div className="rounded-2xl bg-[#0E0F11] text-white p-7">
          <div className={`text-[10px] uppercase tracking-[0.2em] text-[#5468D6] mb-3 ${monoCls}`}>Mi lectura crítica</div>
          <p className="text-base leading-relaxed max-w-3xl">
            Tras ver las 4 simulaciones en contexto real, hay una conclusión incómoda pero honesta:
            <b> el indigo #2C3E80 a tamaño 28px nunca va a leerse como azul</b>. Es un problema físico de
            croma + área, no de diseño. Cualquier solución pasa por uno de estos 3 frentes:
          </p>

          <div className="grid md:grid-cols-3 gap-4 mt-6 text-sm">
            <div className="rounded-xl bg-white/5 p-4">
              <div className={`text-[10px] uppercase tracking-[0.18em] mb-2 ${monoCls}`} style={{ color: '#5468D6' }}>Camino A · sólido</div>
              <p className="text-neutral-300 leading-relaxed">Aumenta el ÁREA del indigo manteniendo el color. Coherente, conservador, funciona.</p>
            </div>
            <div className="rounded-xl bg-white/5 p-4">
              <div className={`text-[10px] uppercase tracking-[0.18em] mb-2 ${monoCls}`} style={{ color: '#5468D6' }}>Camino B · interesante</div>
              <p className="text-neutral-300 leading-relaxed">Overlay sutil. Pierde un poco de luminosidad pero el indigo respira. Funciona si el sitio ya tiene tendencia editorial.</p>
            </div>
            <div className="rounded-xl bg-white/5 p-4">
              <div className={`text-[10px] uppercase tracking-[0.18em] mb-2 ${monoCls}`} style={{ color: '#5468D6' }}>Camino C · cinematográfico</div>
              <p className="text-neutral-300 leading-relaxed">Navbar oscuro al scroll. El indigo del ícono BRILLA. Pero es el cambio más invasivo del comportamiento.</p>
            </div>
          </div>

          <p className="text-sm text-neutral-300 mt-6 leading-relaxed max-w-3xl">
            <b>Mi voto:</b> <b className="text-white">Camino C (navbar invierte al scroll)</b>. Aquí está
            mi razonamiento: el indigo sobre fondo oscuro brilla NATURALMENTE — no necesita
            engrosamiento ni overlay artificial. Además da al sitio un momento de personalidad
            (oscuro durante navegación profunda, cream en el primer encuentro). Es elegante y
            diferenciador, y respeta tu instinto original.
          </p>

          <p className="text-sm text-neutral-400 mt-4 leading-relaxed max-w-3xl">
            Camino B también es válido si quieres mantener navbar siempre cream. Camino A es el
            más conservador. Camino &quot;current&quot; es aceptar que el indigo es susurro en el ícono.
          </p>
        </div>

        <div className="mt-6 text-sm text-neutral-600 text-center">
          Dime: <span className={`${monoCls} text-neutral-900`}>&quot;Camino A / B / C / current&quot;</span> o una combinación.
        </div>
      </section>
    </div>
  );
}
