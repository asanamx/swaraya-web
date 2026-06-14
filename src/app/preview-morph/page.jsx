'use client';

import { useEffect, useRef, useState } from 'react';
import SwarayaMorphMark from '@/components/SwarayaMorphMark';

export default function PreviewMorphPage() {
  const [progress, setProgress] = useState(0);
  const [auto, setAuto] = useState(true);

  // Auto-loop animation
  useEffect(() => {
    if (!auto) return;
    let raf;
    let start = null;
    const period = 5000; // 5s loop: 0 → 1 → hold → 0 → hold
    const tick = (ts) => {
      if (start == null) start = ts;
      const t = ((ts - start) % period) / period;
      // Triangular wave: 0→1 in first half, 1→0 in second half, with eased holds
      let p;
      if (t < 0.4) p = t / 0.4;
      else if (t < 0.5) p = 1;
      else if (t < 0.9) p = 1 - (t - 0.5) / 0.4;
      else p = 0;
      setProgress(p);
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [auto]);

  return (
    <main className="min-h-screen bg-[#F5F2EC] text-[#0E0F11] pt-20 pb-24">
      <div className="container-main">
        <header className="mb-12 max-w-3xl">
          <span className="label-accent text-[#2C3E80] block mb-4">Identidad · v3 · Construcción</span>
          <h1
            className="text-4xl md:text-5xl lg:text-6xl mb-6"
            style={{
              fontFamily: "'Cabinet Grotesk', sans-serif",
              fontWeight: 500,
              letterSpacing: '-0.035em',
              lineHeight: 1,
            }}
          >
            El sol se construye del colapso de la palabra
          </h1>
          <p className="text-base text-[#3C4654] leading-relaxed">
            Cada una de las seis letras restantes (w-a-r-a-y-a) rota alrededor de la
            «s» hasta convertirse en un <strong>rayo del sol</strong>. La «s» permanece
            como ancla central. El ícono final no es un símbolo añadido — es la
            geometría literal del wordmark plegada sobre sí misma.
          </p>
        </header>

        {/* ========== HERO MORPH DEMO ========== */}
        <section className="rounded-2xl bg-[#FAF8F2] border border-[rgba(14,15,17,0.10)] overflow-hidden mb-12">
          <div
            className="flex items-center justify-center px-10 py-24"
            style={{
              background: 'radial-gradient(circle at center, rgba(44,62,128,0.05) 0%, transparent 70%)',
              minHeight: 360,
            }}
          >
            <SwarayaMorphMark progress={progress} size="clamp(4rem, 9vw, 7.5rem)" color="#0E0F11" />
          </div>

          {/* Controls */}
          <div className="px-10 py-6 border-t border-[rgba(14,15,17,0.08)] flex flex-col md:flex-row gap-6 items-center justify-between bg-[#F5F2EC]">
            <div className="flex items-center gap-4 w-full md:w-2/3">
              <span className="text-[10px] tracking-[0.24em] uppercase text-[#5D6878] font-medium whitespace-nowrap">
                Wordmark
              </span>
              <input
                type="range"
                min="0"
                max="1000"
                value={Math.round(progress * 1000)}
                onChange={(e) => {
                  setAuto(false);
                  setProgress(parseInt(e.target.value, 10) / 1000);
                }}
                className="flex-1 accent-[#2C3E80]"
                aria-label="Progreso del morph"
              />
              <span className="text-[10px] tracking-[0.24em] uppercase text-[#5D6878] font-medium whitespace-nowrap">
                Sol
              </span>
            </div>
            <button
              onClick={() => setAuto((a) => !a)}
              className="px-4 py-2 rounded-full text-xs font-medium border transition-all"
              style={{
                borderColor: auto ? '#2C3E80' : 'rgba(14,15,17,0.20)',
                color: auto ? '#2C3E80' : '#3C4654',
                background: auto ? 'rgba(44,62,128,0.06)' : 'transparent',
              }}
            >
              {auto ? '⏸ Auto-loop activo' : '▶ Activar auto-loop'}
            </button>
          </div>
        </section>

        {/* ========== KEY FRAMES ========== */}
        <h2
          className="text-xl mb-6 mt-12"
          style={{
            fontFamily: "'Cabinet Grotesk', sans-serif",
            fontWeight: 500,
            letterSpacing: '-0.02em',
          }}
        >
          Estados clave
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
          {[0, 0.25, 0.5, 0.75, 1].map((p) => (
            <div
              key={p}
              className="rounded-xl bg-[#FAF8F2] border border-[rgba(14,15,17,0.08)] overflow-hidden"
            >
              <div
                className="flex items-center justify-center px-4 py-12"
                style={{ minHeight: 180 }}
              >
                <SwarayaMorphMark progress={p} size="2.75rem" color="#0E0F11" durationMs={0} />
              </div>
              <div className="px-4 py-3 border-t border-[rgba(14,15,17,0.06)] flex items-center justify-between">
                <span className="text-[10px] tracking-[0.24em] uppercase text-[#5D6878]">
                  {Math.round(p * 100)}%
                </span>
                <span className="text-[10px] text-[#3C4654]">
                  {p === 0 ? 'wordmark' : p === 1 ? 'sol' : 'en tránsito'}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* ========== CONCEPT NOTES ========== */}
        <div className="mt-14 grid md:grid-cols-2 gap-8 max-w-5xl">
          <div className="p-6 rounded-xl bg-[#FAF8F2] border border-[rgba(14,15,17,0.08)]">
            <h3
              className="text-base mb-2"
              style={{
                fontFamily: "'Cabinet Grotesk', sans-serif",
                fontWeight: 500,
                letterSpacing: '-0.02em',
                color: '#0E0F11',
              }}
            >
              Por qué funciona
            </h3>
            <ul className="text-sm text-[#3C4654] leading-relaxed space-y-2">
              <li>· El ícono no es importado — emerge del wordmark.</li>
              <li>· Cada rayo es <em>literalmente</em> una letra de swaraya rotada.</li>
              <li>· La «s» como ancla refuerza la grafía de la palabra.</li>
              <li>· La etimología (svar = sol/luz) coincide con la geometría final.</li>
              <li>· Es memorable: la animación es la marca.</li>
            </ul>
          </div>
          <div className="p-6 rounded-xl bg-[#FAF8F2] border border-[rgba(14,15,17,0.08)]">
            <h3
              className="text-base mb-2"
              style={{
                fontFamily: "'Cabinet Grotesk', sans-serif",
                fontWeight: 500,
                letterSpacing: '-0.02em',
                color: '#0E0F11',
              }}
            >
              Integraciones planeadas
            </h3>
            <ul className="text-sm text-[#3C4654] leading-relaxed space-y-2">
              <li>· <strong>Navbar</strong>: el morph se ata al scroll (0 → 200 px)</li>
              <li>· <strong>Footer</strong>: estado 0% (wordmark completo) como cierre editorial</li>
              <li>· <strong>Favicon / OG</strong>: estado 100% (solo el sol formado)</li>
              <li>· <strong>Loading screen</strong>: morph en bucle 0 → 1 → 0</li>
            </ul>
          </div>
        </div>

        <div className="mt-12 max-w-2xl">
          <p
            className="text-lg text-[#0E0F11]"
            style={{
              fontFamily: "'Cabinet Grotesk', sans-serif",
              fontWeight: 500,
              letterSpacing: '-0.02em',
            }}
          >
            ¿Vamos por esta dirección?
          </p>
          <p className="text-[#3C4654] mt-2 text-sm leading-relaxed">
            Arrastra el slider o deja correr el auto-loop. Si te convence,
            lo conecto al scroll del navbar real, ajustamos curvas de easing y
            usamos el estado 100% como favicon/OG.
          </p>
        </div>
      </div>
    </main>
  );
}
