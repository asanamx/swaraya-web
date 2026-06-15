'use client';

const CREAM = '#F5F2EC';
const SUMI = '#0E0F11';
const INDIGO = '#2C3E80';
const INDIGO_LIGHT = '#5468D6';
const MUTED = '#5D6878';

function Icon({ size = 28, fg = SUMI, accent = INDIGO, strokeWidth = 2.6 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" fill="none" aria-hidden style={{ display: 'block' }}>
      <line x1="24" y1="3" x2="24" y2="16" stroke={fg} strokeWidth={strokeWidth} strokeLinecap="round" />
      <line x1="24" y1="32" x2="24" y2="45" stroke={fg} strokeWidth={strokeWidth} strokeLinecap="round" />
      <line x1="32" y1="24" x2="45" y2="24" stroke={fg} strokeWidth={strokeWidth} strokeLinecap="round" />
      <line x1="3" y1="24" x2="16" y2="24" stroke={fg} strokeWidth={strokeWidth} strokeLinecap="round" />
      <circle cx="24" cy="24" r="2.6" fill={accent} />
      <line x1="32" y1="16" x2="45" y2="3" stroke={accent} strokeWidth={strokeWidth * 1.15} strokeLinecap="round" />
    </svg>
  );
}

function NavbarSim({ background, accentLine, glowOverlay }) {
  return (
    <div className="relative" style={{ height: 56, overflow: 'hidden' }}>
      {/* Top accent line (Camino "Diálogo Abierto") */}
      {accentLine && (
        <div
          className="absolute top-0 left-0 right-0 h-px z-20"
          style={{ background: accentLine }}
        />
      )}
      {/* Glow overlay (radial) */}
      {glowOverlay && (
        <div
          className="absolute inset-0 pointer-events-none z-10"
          style={{ background: glowOverlay }}
        />
      )}
      {/* Base background */}
      <div
        className="absolute inset-0"
        style={{
          background: background.base,
          backdropFilter: background.blur || 'none',
          WebkitBackdropFilter: background.blur || 'none',
          borderBottom: background.border || 'none',
        }}
      />
      {/* Content */}
      <div className="relative z-30 px-5 flex items-center justify-between h-full">
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, color: CREAM }}>
          <Icon size={28} fg="currentColor" accent={INDIGO_LIGHT} />
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
  );
}

// Hero (cream) preview for the "at top" state — same for all variants
function HeroPreview() {
  return (
    <div style={{ background: CREAM, padding: '14px 22px 22px' }}>
      <div style={{ fontSize: 9, letterSpacing: '0.2em', textTransform: 'uppercase', color: INDIGO, marginBottom: 8 }}>
        — Agencia de IA Aplicada
      </div>
      <h3 style={{ fontFamily: "'Inter', sans-serif", fontWeight: 700, fontSize: 24, lineHeight: 1.05, letterSpacing: '-0.03em', margin: 0, color: SUMI }}>
        Inteligencia real.
        <br />
        <span style={{ color: INDIGO }}>Para decisiones reales.</span>
      </h3>
    </div>
  );
}

export default function NavbarVariantsClient({ monoCls }) {
  const variants = [
    {
      id: 'C-PREVIO',
      label: 'C previo · Sumi sólido',
      tag: 'rgba(14,15,17, 0.95) + blur 20px',
      desc: 'Versión anterior: navbar casi opaco. Funciona pero se siente "denso", como si el navbar fuera otro plano completo.',
      pros: ['Indigo brilla máximamente', 'Cero ambigüedad: es claramente "modo oscuro"'],
      cons: ['Demasiado peso visual', 'Ruptura abrupta con el cream del hero', 'Se siente como otra página, no como continuación'],
      background: {
        base: 'rgba(14,15,17,0.95)',
        blur: 'blur(20px)',
        border: '1px solid rgba(245,242,236,0.06)',
      },
    },
    {
      id: 'C-CRISTAL',
      label: 'C1 · Cristal tintado',
      tag: 'rgba(14,15,17, 0.72) + blur 24px',
      desc: 'Semi-transparente. Se puede percibir tenuemente el contenido debajo a través del navbar. Sensación de "cristal oscuro" elegante.',
      pros: ['Mantiene sensación de profundidad', 'Indigo se percibe claramente', 'Menos peso visual que el sólido'],
      cons: ['El "ver a través" puede competir con la legibilidad si el contenido debajo es muy denso'],
      background: {
        base: 'rgba(14,15,17,0.72)',
        blur: 'blur(24px) saturate(140%)',
        border: '1px solid rgba(245,242,236,0.05)',
      },
    },
    {
      id: 'C-DIALOGO',
      label: 'C2 · Eco de "Diálogo Abierto"',
      tag: 'Sumi 85% + glow indigo radial + accent line',
      desc: 'Replica la receta exacta del footer "Diálogo Abierto" pero en el navbar: sumi base + glow indigo radial sutil desde la izquierda + línea de acento indigo superior. La marca se cierra sobre sí misma — navbar y footer hablan el mismo idioma visual.',
      pros: [
        'Coherencia narrativa con el footer "Diálogo Abierto"',
        'Glow indigo añade luminosidad y dimensión',
        'Línea superior de acento da identidad editorial',
        'El indigo del ícono BRILLA naturalmente sobre este fondo',
      ],
      cons: [
        'Es más "elaborado" que las otras opciones',
        'Requiere disciplina en su uso (no overusar el glow)',
      ],
      background: {
        base: 'rgba(14,15,17,0.85)',
        blur: 'blur(20px) saturate(130%)',
        border: '1px solid rgba(84,104,214,0.08)',
      },
      glowOverlay:
        'radial-gradient(ellipse 60% 100% at 8% 50%, rgba(84,104,214,0.16) 0%, transparent 60%), radial-gradient(ellipse 40% 100% at 95% 50%, rgba(44,62,128,0.10) 0%, transparent 60%)',
      accentLine:
        'linear-gradient(90deg, transparent 0%, rgba(84,104,214,0.4) 50%, transparent 100%)',
    },
    {
      id: 'C-MAS-LIGERO',
      label: 'C3 · Tinta diluida',
      tag: 'rgba(14,15,17, 0.55) + blur 28px',
      desc: 'La versión más sutil. El navbar es apenas una sombra translúcida sobre el contenido. Casi etéreo. Solo lo suficiente para que el indigo se distinga.',
      pros: ['Mínimo impacto visual', 'Se siente más como continuación del hero'],
      cons: ['El indigo está justo en el límite de visibilidad', 'Puede no diferenciarse lo suficiente del navbar transparente del hero'],
      background: {
        base: 'rgba(14,15,17,0.55)',
        blur: 'blur(28px) saturate(120%)',
        border: '1px solid rgba(245,242,236,0.04)',
      },
    },
  ];

  return (
    <div className="min-h-screen" style={{ background: '#FAFAF7' }}>
      {/* Header */}
      <div className="sticky top-0 z-30 bg-white/95 backdrop-blur border-b border-neutral-200">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center gap-4">
          <div className="w-1.5 h-1.5 rounded-full" style={{ background: INDIGO_LIGHT }} />
          <h1 className="text-sm font-semibold text-neutral-900">Navbar · Variantes de overlay oscuro</h1>
          <span className={`text-[10px] uppercase tracking-[0.18em] text-neutral-500 ml-2 ${monoCls}`}>4 niveles de oscuridad</span>
          <a href="/indigo-impact" className="ml-auto text-xs underline text-neutral-600">volver a indigo impact →</a>
        </div>
      </div>

      {/* Intro */}
      <section className="max-w-7xl mx-auto px-6 pt-10 pb-6">
        <div className={`text-[10px] uppercase tracking-[0.2em] text-neutral-500 mb-2 ${monoCls}`}>refinamiento del camino c</div>
        <h2 className="text-2xl font-semibold text-neutral-900 mb-2 max-w-3xl">
          ¿Qué tan oscuro debe ser el navbar al scrollear?
        </h2>
        <p className="text-sm text-neutral-600 max-w-2xl mb-2 leading-relaxed">
          4 variantes con distintos niveles de overlay. Cada una se muestra en su estado "scrolleado" (navbar visible
          sobre contenido). El logo y el wordmark son cream en todos los casos. La C2 replica el efecto cinematográfico
          de la sección "Diálogo Abierto" del footer.
        </p>
      </section>

      {/* Variants stacked vertically — each takes full width to see clearly */}
      <section className="max-w-7xl mx-auto px-6 pb-16 space-y-8">
        {variants.map((v) => (
          <div key={v.id} className="rounded-3xl overflow-hidden border bg-white" style={{ borderColor: 'rgba(14,15,17,0.08)' }}>
            {/* Header */}
            <div className="px-6 py-4 border-b" style={{ borderColor: 'rgba(14,15,17,0.08)' }}>
              <div className="flex items-baseline gap-3 flex-wrap">
                <span className={`text-[10px] uppercase tracking-[0.2em] text-neutral-500 ${monoCls}`}>{v.id}</span>
                <span className="text-base font-semibold text-neutral-900">{v.label}</span>
                <span className={`text-xs text-neutral-500 ${monoCls}`}>{v.tag}</span>
              </div>
            </div>

            {/* Two side-by-side states: hero state (no scroll) + scrolled state */}
            <div className="grid grid-cols-1 md:grid-cols-2 divide-x" style={{ borderColor: 'rgba(14,15,17,0.08)' }}>
              {/* HERO STATE */}
              <div>
                <div className={`px-5 py-2.5 text-[10px] uppercase tracking-[0.2em] ${monoCls} text-neutral-500 border-b`} style={{ borderColor: 'rgba(14,15,17,0.06)' }}>
                  Hero · scroll 0 (logo sumi, navbar cream)
                </div>
                {/* Same navbar but cream */}
                <div className="relative">
                  <div className="relative" style={{ height: 56 }}>
                    <div className="absolute inset-0" style={{ background: CREAM }} />
                    <div className="relative z-10 px-5 flex items-center justify-between h-full">
                      <div style={{ display: 'flex', alignItems: 'center', gap: 8, color: SUMI }}>
                        <Icon size={28} fg="currentColor" accent={INDIGO} />
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
                  <HeroPreview />
                </div>
              </div>

              {/* SCROLLED STATE — the variant */}
              <div>
                <div className={`px-5 py-2.5 text-[10px] uppercase tracking-[0.2em] ${monoCls} text-neutral-500 border-b`} style={{ borderColor: 'rgba(14,15,17,0.06)' }}>
                  Scrolled · navbar invertido (logo cream, navbar oscuro)
                </div>
                {/* Scrolled navbar over content */}
                <div style={{ position: 'relative', background: CREAM }}>
                  <NavbarSim background={v.background} glowOverlay={v.glowOverlay} accentLine={v.accentLine} />
                  {/* fake content beneath to show how navbar overlays */}
                  <div style={{ padding: '14px 22px 22px' }}>
                    <div style={{ fontSize: 11, color: MUTED, marginBottom: 6 }}>Sección "Método"</div>
                    <p style={{ fontSize: 13, color: SUMI, maxWidth: 380, lineHeight: 1.5, opacity: 0.85 }}>
                      Diseñamos sistemas de IA que amplifican el criterio humano. Aquí ves el contenido del sitio mientras el navbar sticky permanece arriba.
                    </p>
                    <div style={{ display: 'flex', gap: 8, marginTop: 14 }}>
                      <div style={{ background: '#E8E2D5', height: 8, width: '40%', borderRadius: 4 }} />
                      <div style={{ background: '#E8E2D5', height: 8, width: '25%', borderRadius: 4 }} />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Description + Pros/Cons */}
            <div className="px-6 py-5 border-t bg-neutral-50/50" style={{ borderColor: 'rgba(14,15,17,0.08)' }}>
              <p className="text-sm text-neutral-700 mb-4 leading-relaxed">{v.desc}</p>
              <div className="grid grid-cols-2 gap-6 text-[12px]">
                <div>
                  <div className={`text-[10px] uppercase tracking-[0.18em] text-emerald-700 mb-1.5 ${monoCls}`}>A favor</div>
                  <ul className="space-y-1 text-neutral-700">
                    {v.pros.map((p, i) => (
                      <li key={i} className="flex gap-1.5 leading-tight">
                        <span className="text-emerald-600">+</span><span>{p}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <div className={`text-[10px] uppercase tracking-[0.18em] text-rose-700 mb-1.5 ${monoCls}`}>En contra</div>
                  <ul className="space-y-1 text-neutral-700">
                    {v.cons.map((p, i) => (
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
      </section>

      {/* Recomendación */}
      <section className="max-w-7xl mx-auto px-6 pb-24">
        <div className="rounded-2xl bg-[#0E0F11] text-white p-7 relative overflow-hidden">
          {/* Replica del glow del footer */}
          <div className="absolute inset-0 pointer-events-none" style={{
            background: 'radial-gradient(ellipse 70% 60% at 20% 30%, rgba(84,104,214,0.14) 0%, transparent 60%), radial-gradient(ellipse 60% 50% at 90% 80%, rgba(44,62,128,0.10) 0%, transparent 60%)',
          }} />
          <div className="relative">
            <div className={`text-[10px] uppercase tracking-[0.2em] text-[#5468D6] mb-3 ${monoCls}`}>Mi recomendación</div>
            <h3 className="text-xl font-semibold mb-3">C2 · Eco de &quot;Diálogo Abierto&quot;</h3>
            <p className="text-base leading-relaxed max-w-3xl">
              Es la variante que mejor materializa tu intuición. La marca se cierra sobre sí misma:
              navbar y footer hablan el mismo idioma visual. Cuando el usuario scrollea, no entra
              a un "modo oscuro" aleatorio — entra en el lenguaje del <b>diálogo</b> que la propia
              marca ya estableció.
            </p>
            <p className="text-sm text-neutral-300 mt-4 leading-relaxed max-w-3xl">
              El glow indigo radial + la línea de acento superior dan al navbar la misma
              luminosidad cinematográfica que tiene el footer. El indigo del ícono no solo se ve —
              <b className="text-white"> dialoga visualmente con el glow del fondo</b>.
            </p>
            <p className="text-sm text-neutral-400 mt-4 leading-relaxed max-w-3xl">
              <b className="text-white">Si C2 te parece "demasiado",</b> C1 (cristal tintado) es el
              compromiso. Pierde el glow pero mantiene la elegancia translúcida.
            </p>
          </div>
        </div>

        <div className="mt-6 text-sm text-neutral-600 text-center">
          Dime: <span className={`${monoCls} text-neutral-900`}>&quot;C1 / C2 / C3 / C-previo&quot;</span> o pídeme afinar uno
        </div>
      </section>
    </div>
  );
}
