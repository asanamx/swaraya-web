'use client';

// Parametric icon — accepts gap, caps, accent, accent stroke ratio
function Icon({
  size = 30,
  gap = 8,         // distance from center where cardinals start (default 8 in 48 viewBox)
  cap = 'round',   // 'round' | 'square' | 'butt'
  fg = '#0E0F11',
  accent = '#5468D6',
  strokeWidth = 2.6,
  accentBoost = 1.15,
}) {
  // Cardinal extents — symmetric around center 24
  const inner = 24 - gap;      // end-near-center of each cardinal
  const outer = 24 - gap - 8;  // far end (length = 8 units)
  // For NE diagonal: start point follows the gap convention from center
  // diag_inner = (24 + gap/√2, 24 - gap/√2) roughly. Use simple offset.
  const dInner = 24 + gap;     // x of inner endpoint of NE diag
  const dInnerY = 24 - gap;    // y of inner endpoint of NE diag
  // NE diagonal extends to corner of upper-right region
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 48 48"
      fill="none"
      aria-hidden
      style={{ display: 'block' }}
    >
      {/* N */}
      <line x1="24" y1={3} x2="24" y2={inner}
        stroke={fg} strokeWidth={strokeWidth} strokeLinecap={cap} />
      {/* S */}
      <line x1="24" y1={48 - inner} x2="24" y2={45}
        stroke={fg} strokeWidth={strokeWidth} strokeLinecap={cap} />
      {/* E */}
      <line x1={48 - inner} y1="24" x2={45} y2="24"
        stroke={fg} strokeWidth={strokeWidth} strokeLinecap={cap} />
      {/* W */}
      <line x1="3" y1="24" x2={inner} y2="24"
        stroke={fg} strokeWidth={strokeWidth} strokeLinecap={cap} />
      {/* Dot center */}
      <circle cx="24" cy="24" r="2.6" fill={accent} />
      {/* NE diagonal */}
      <line x1={dInner} y1={dInnerY} x2="45" y2="3"
        stroke={accent} strokeWidth={strokeWidth * accentBoost} strokeLinecap={cap} />
    </svg>
  );
}

function Card({ label, sub, bg, fg, children, monoCls, size = 'normal' }) {
  return (
    <div className="rounded-2xl overflow-hidden border" style={{ borderColor: 'rgba(14,15,17,0.08)' }}>
      <div className="px-5 py-3 border-b" style={{ borderColor: 'rgba(14,15,17,0.08)' }}>
        <div className={`text-[10px] uppercase tracking-[0.2em] ${monoCls}`} style={{ color: '#5D6878' }}>{label}</div>
        {sub && <div className="text-xs mt-0.5" style={{ color: '#0E0F11' }}>{sub}</div>}
      </div>
      <div className="flex items-center justify-center gap-2.5 py-12" style={{ background: bg, color: fg }}>
        {children}
      </div>
    </div>
  );
}

function Wordmark({ color = '#0E0F11', size = 22 }) {
  return (
    <span style={{
      fontFamily: "'Inter', sans-serif",
      fontWeight: 700,
      fontSize: size,
      letterSpacing: '-0.028em',
      lineHeight: 1,
      color,
    }}>
      swaraya
    </span>
  );
}

export default function IconVariantsClient({ monoCls }) {
  const variants = [
    {
      id: 'CURRENT',
      label: 'Actual en el sitio',
      sub: 'gap 8 · round · indigo #5468D6',
      props: { gap: 8, cap: 'round', accent: '#5468D6' },
    },
    {
      id: 'GAP-LARGER',
      label: 'Variante · gap más amplio',
      sub: 'gap 11 · round · indigo #5468D6',
      props: { gap: 11, cap: 'round', accent: '#5468D6' },
    },
    {
      id: 'CAP-SQUARE',
      label: 'Variante · square caps',
      sub: 'gap 8 · square · indigo #5468D6',
      props: { gap: 8, cap: 'square', accent: '#5468D6' },
    },
    {
      id: 'GAP+SQUARE',
      label: 'Variante · gap amplio + square',
      sub: 'gap 11 · square · indigo #5468D6',
      props: { gap: 11, cap: 'square', accent: '#5468D6' },
    },
  ];

  const indigoExperiments = [
    { id: 'IND-CURRENT', label: 'Actual', sub: '#5468D6', color: '#5468D6' },
    { id: 'IND-VIVID',   label: 'Vívido',  sub: '#4F46E5 (Indigo 600)', color: '#4F46E5' },
    { id: 'IND-DEEP',    label: 'Profundo', sub: '#4338CA (Indigo 700)', color: '#4338CA' },
    { id: 'IND-ELEC',    label: 'Eléctrico', sub: '#3D5AFE (Material A400)', color: '#3D5AFE' },
    { id: 'IND-CTA',     label: 'Como el CTA', sub: '#2C3E80 (el oscuro del sitio)', color: '#2C3E80' },
  ];

  return (
    <div className="min-h-screen" style={{ background: '#FAFAF7' }}>
      {/* Header */}
      <div className="sticky top-0 z-20 bg-white/95 backdrop-blur border-b border-neutral-200">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center gap-4">
          <div className="w-1.5 h-1.5 rounded-full bg-[#5468D6]" />
          <h1 className="text-sm font-semibold text-neutral-900">Icon Variants · Gap, Caps & Indigo</h1>
          <span className={`text-[10px] uppercase tracking-[0.18em] text-neutral-500 ml-2 ${monoCls}`}>
            comparación · no toca el sitio
          </span>
          <a href="/" className="ml-auto text-xs underline text-neutral-600">ver sitio actual →</a>
        </div>
      </div>

      {/* SECTION 1 — Gap & Caps variants */}
      <section className="max-w-7xl mx-auto px-6 pt-10 pb-6">
        <div className={`text-[10px] uppercase tracking-[0.2em] text-neutral-500 mb-2 ${monoCls}`}>01 · Variantes de gap & caps</div>
        <h2 className="text-2xl font-semibold text-neutral-900 mb-2">
          4 versiones con cambios sutiles de respiración y terminación
        </h2>
        <p className="text-sm text-neutral-600 max-w-2xl mb-8">
          Cada variante se muestra a tamaño hero (60px) sobre cream y sobre oscuro, además del tamaño navbar real (30px) con el wordmark. Solo cambian dos cosas: el GAP entre los cardinales y el centro, y el strokeLinecap (round vs square).
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {variants.map((v) => (
            <div key={v.id} className="rounded-3xl overflow-hidden border bg-white" style={{ borderColor: 'rgba(14,15,17,0.08)' }}>
              {/* Header */}
              <div className="px-6 py-4 border-b" style={{ borderColor: 'rgba(14,15,17,0.08)' }}>
                <div className={`text-[10px] uppercase tracking-[0.2em] text-neutral-500 ${monoCls}`}>{v.id}</div>
                <div className="text-sm font-medium text-neutral-900 mt-0.5">{v.label}</div>
                <div className={`text-xs text-neutral-500 mt-1 ${monoCls}`}>{v.sub}</div>
              </div>

              {/* Cream context — hero size */}
              <div className="flex items-center justify-center gap-3 py-10" style={{ background: '#F5F2EC' }}>
                <Icon size={64} strokeWidth={4} {...v.props} fg="#0E0F11" />
                <Wordmark size={42} />
              </div>

              {/* Navbar size on cream */}
              <div className="border-t" style={{ borderColor: 'rgba(14,15,17,0.08)' }} />
              <div className="flex items-center justify-center gap-2.5 py-6" style={{ background: '#F5F2EC' }}>
                <Icon size={30} strokeWidth={2.6} {...v.props} fg="#0E0F11" />
                <Wordmark size={22} />
                <span className={`text-[10px] uppercase tracking-[0.2em] ml-3 text-neutral-400 ${monoCls}`}>navbar real</span>
              </div>

              {/* Dark context */}
              <div className="border-t" style={{ borderColor: 'rgba(14,15,17,0.08)' }} />
              <div className="flex items-center justify-center gap-2.5 py-6" style={{ background: '#0E0F11' }}>
                <Icon size={30} strokeWidth={2.6} {...v.props} fg="#F5F2EC" />
                <Wordmark size={22} color="#F5F2EC" />
                <span className={`text-[10px] uppercase tracking-[0.2em] ml-3 ${monoCls}`} style={{ color: '#5D6878' }}>footer</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* SECTION 2 — Indigo brightness experiments */}
      <section className="max-w-7xl mx-auto px-6 pt-12 pb-20">
        <div className={`text-[10px] uppercase tracking-[0.2em] text-neutral-500 mb-2 ${monoCls}`}>02 · Experimentos de tono indigo</div>
        <h2 className="text-2xl font-semibold text-neutral-900 mb-2">
          ¿Cuál indigo se ve realmente como azul sobre cream?
        </h2>
        <p className="text-sm text-neutral-600 max-w-2xl mb-8">
          El indigo a 2.6px de stroke depende mucho del croma. Aquí están 5 tonos a la misma escala del navbar. El que percibas como <b>más claramente azul sin perder elegancia</b> es el correcto.
        </p>

        <div className="rounded-3xl overflow-hidden border bg-white" style={{ borderColor: 'rgba(14,15,17,0.08)' }}>
          {/* Headers */}
          <div className="grid grid-cols-5 border-b" style={{ borderColor: 'rgba(14,15,17,0.08)' }}>
            {indigoExperiments.map((e) => (
              <div key={e.id} className="px-4 py-3 border-r last:border-r-0" style={{ borderColor: 'rgba(14,15,17,0.08)' }}>
                <div className={`text-[10px] uppercase tracking-[0.18em] text-neutral-500 ${monoCls}`}>{e.label}</div>
                <div className={`text-[10px] mt-1 text-neutral-400 ${monoCls}`}>{e.sub}</div>
                <div className="flex items-center gap-1.5 mt-2">
                  <div className="w-3 h-3 rounded-full border border-neutral-300" style={{ background: e.color }} />
                </div>
              </div>
            ))}
          </div>

          {/* Cream row — navbar size */}
          <div className="grid grid-cols-5" style={{ background: '#F5F2EC' }}>
            {indigoExperiments.map((e) => (
              <div key={e.id} className="flex items-center justify-center gap-2.5 py-10 border-r last:border-r-0" style={{ borderColor: 'rgba(14,15,17,0.08)' }}>
                <Icon size={30} strokeWidth={2.6} gap={8} cap="round" accent={e.color} fg="#0E0F11" />
                <Wordmark size={22} />
              </div>
            ))}
          </div>
          <div className="grid grid-cols-5 border-t border-b" style={{ borderColor: 'rgba(14,15,17,0.08)' }}>
            {indigoExperiments.map((e) => (
              <div key={e.id} className={`text-[10px] text-center py-2 uppercase tracking-[0.18em] text-neutral-400 border-r last:border-r-0 ${monoCls}`} style={{ borderColor: 'rgba(14,15,17,0.08)' }}>
                navbar · cream
              </div>
            ))}
          </div>

          {/* Cream — bigger size to confirm */}
          <div className="grid grid-cols-5" style={{ background: '#F5F2EC' }}>
            {indigoExperiments.map((e) => (
              <div key={e.id} className="flex items-center justify-center py-12 border-r last:border-r-0" style={{ borderColor: 'rgba(14,15,17,0.08)' }}>
                <Icon size={80} strokeWidth={5} gap={8} cap="round" accent={e.color} fg="#0E0F11" />
              </div>
            ))}
          </div>
          <div className="grid grid-cols-5 border-t" style={{ borderColor: 'rgba(14,15,17,0.08)' }}>
            {indigoExperiments.map((e) => (
              <div key={e.id} className={`text-[10px] text-center py-2 uppercase tracking-[0.18em] text-neutral-400 border-r last:border-r-0 ${monoCls}`} style={{ borderColor: 'rgba(14,15,17,0.08)' }}>
                glifo aislado · 80px
              </div>
            ))}
          </div>

          {/* Dark row */}
          <div className="grid grid-cols-5" style={{ background: '#0E0F11' }}>
            {indigoExperiments.map((e) => (
              <div key={e.id} className="flex items-center justify-center gap-2.5 py-10 border-r last:border-r-0" style={{ borderColor: 'rgba(245,242,236,0.08)' }}>
                <Icon size={30} strokeWidth={2.6} gap={8} cap="round" accent={e.color} fg="#F5F2EC" />
                <Wordmark size={22} color="#F5F2EC" />
              </div>
            ))}
          </div>
          <div className="grid grid-cols-5 border-t" style={{ borderColor: 'rgba(14,15,17,0.08)' }}>
            {indigoExperiments.map((e) => (
              <div key={e.id} className={`text-[10px] text-center py-2 uppercase tracking-[0.18em] border-r last:border-r-0 ${monoCls}`} style={{ borderColor: 'rgba(14,15,17,0.08)', color: '#5D6878' }}>
                footer · oscuro
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Recomendación */}
      <section className="max-w-7xl mx-auto px-6 pb-24">
        <div className="rounded-2xl bg-[#0E0F11] text-white p-7">
          <div className={`text-[10px] uppercase tracking-[0.2em] text-[#5468D6] mb-3 ${monoCls}`}>Mi recomendación</div>
          <p className="text-base leading-relaxed max-w-3xl">
            Para que el indigo se perciba claramente <b>en cream</b>, necesitas saltar a un tono más
            saturado. <b>#4F46E5 (Indigo 600 de Tailwind)</b> es el balance: lo suficientemente vívido
            para leerse como azul a 2.6px de stroke, pero todavía dentro del territorio "indigo
            sereno" — no agresivo, no fluorescente.
          </p>
          <p className="text-sm text-neutral-400 mt-4 leading-relaxed max-w-3xl">
            Sobre <b>gap</b>: la actual (8) ya respira bien, no necesita más espacio.<br/>
            Sobre <b>caps</b>: <b>square</b> daría más rigor editorial pero el actual (<b>round</b>) tiene mejor armonía con las curvas de Inter. Yo dejaría round.
          </p>
          <p className="text-sm text-neutral-300 mt-5 max-w-3xl">
            <b>Decisión sugerida:</b> mantener gap 8 + round caps, pero cambiar indigo de <span className={monoCls}>#5468D6</span> a <span className={monoCls}>#4F46E5</span>.
          </p>
        </div>

        <div className="mt-6 text-sm text-neutral-600 text-center">
          Cuando decidas, dime: <span className={`${monoCls} text-neutral-900`}>&quot;gap N · caps X · indigo #HEX&quot;</span>
        </div>
      </section>
    </div>
  );
}
