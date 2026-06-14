'use client';

import ProceduralCover from '@/components/ProceduralCover';

// Slugs reales de tus posts para que las muestras se vean con datos reales
const SAMPLE_POSTS = [
  { slug: 'gobernanza-ia-instituciones',         title: 'Gobernanza de IA en instituciones',         family: 'topology' },
  { slug: 'rag-vs-fine-tuning-cuando-usar-cada-uno', title: 'RAG vs Fine-tuning',                     family: 'flow-field' },
  { slug: 'metricas-exito-proyectos-ia',         title: 'Métricas que importan en proyectos de IA',  family: 'network' },
  { slug: 'cio-ia-agentica',                     title: 'El nuevo rol del CIO ante la IA agéntica',  family: 'tessellation' },
  { slug: 'por-que-ia-falla-empresas-grandes',   title: 'Por qué la IA falla en empresas grandes',   family: 'flow-field' },
  { slug: 'evals-sistemas-llm-produccion',       title: 'Diseño de evals para sistemas LLM',         family: 'topology' },
  { slug: 'agentes-autonomos-ia-empresarial',    title: 'Agentes Autónomos',                          family: 'network' },
  { slug: 'apis-ia-construir-vs-consumir',       title: 'APIs de IA: Construir vs Consumir',         family: 'tessellation' },
];

// Tres ejemplos de Unsplash que NO son edificios
const OPTION_C_REFS = [
  { url: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=900&q=80', label: 'macro circuit board' },
  { url: 'https://images.unsplash.com/photo-1542831371-29b0f74f9713?w=900&q=80', label: 'code on screen (macro abstract)' },
  { url: 'https://images.unsplash.com/photo-1614729939124-032d1e6d3b15?w=900&q=80', label: 'fiber optic light' },
];

// Conceptos para Option B (AI-generated)
const OPTION_B_PROMPTS = [
  'Abstract computational composition, indigo gradient mesh, particle field, editorial minimalism, cream background',
  'Topology of a high-dimensional embedding space, contour lines, sober editorial, deep indigo + cream',
  'Schematic diagram of an agent system, monochrome indigo, white space, technical illustration',
];

const Section = ({ id, kicker, title, intro, children }) => (
  <section id={id} className="border-t border-[rgba(14,15,17,0.08)] py-16 md:py-20">
    <div className="container-main">
      <div className="mb-10 md:mb-14 max-w-2xl">
        <span className="label-accent text-[#2C3E80] block mb-3">{kicker}</span>
        <h2
          className="text-2xl md:text-3xl lg:text-4xl text-[#0E0F11] mb-4"
          style={{
            fontFamily: "'Cabinet Grotesk', sans-serif",
            fontWeight: 500,
            letterSpacing: '-0.025em',
            lineHeight: 1.1,
          }}
        >
          {title}
        </h2>
        <p className="text-[#3C4654] leading-relaxed">{intro}</p>
      </div>
      {children}
    </div>
  </section>
);

export default function PreviewCoversPage() {
  return (
    <main className="min-h-screen bg-[#F5F2EC] text-[#0E0F11] pt-20 pb-24">
      <div className="container-main">
        <header className="mb-12 md:mb-16 max-w-3xl">
          <span className="label-accent text-[#2C3E80] block mb-4">Propuesta</span>
          <h1
            className="text-4xl md:text-5xl lg:text-6xl text-[#0E0F11] mb-6"
            style={{
              fontFamily: "'Cabinet Grotesk', sans-serif",
              fontWeight: 500,
              letterSpacing: '-0.035em',
              lineHeight: 1,
            }}
          >
            Tres caminos para las portadas
          </h1>
          <p className="text-lg text-[#3C4654] leading-relaxed">
            Comparativa visual de las tres opciones discutidas. Mismos datos
            de tus posts reales, sin filtros — esto es exactamente lo que
            verías al desplegar.
          </p>
        </header>
      </div>

      {/* OPCIÓN A — Procedural */}
      <Section
        id="a"
        kicker="Opción A · mi recomendación"
        title="Procedural — composiciones SVG generadas por código"
        intro="Cada post recibe una composición única determinista a partir de su slug. 4 familias de patrón: campos de flujo, redes, topologías y teselaciones. Generadas en cliente, ligeras (~5-15 KB), sin dependencia de stock photos. La IA que aplicamos como agencia también genera nuestra propia identidad visual."
      >
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {SAMPLE_POSTS.map((p) => (
            <article key={p.slug} className="group">
              <div className="rounded-xl overflow-hidden border border-[rgba(14,15,17,0.08)]">
                <ProceduralCover seed={p.slug} family={p.family} aspect="16/10" />
              </div>
              <h3
                className="mt-4 text-base text-[#0E0F11]"
                style={{
                  fontFamily: "'Cabinet Grotesk', sans-serif",
                  fontWeight: 500,
                  letterSpacing: '-0.015em',
                }}
              >
                {p.title}
              </h3>
              <p className="text-[0.7rem] mt-1 text-[#5D6878] tracking-[0.16em] uppercase">
                {p.family}
              </p>
            </article>
          ))}
        </div>

        <div className="mt-12 p-6 bg-[#FAF8F2] rounded-xl border border-[rgba(14,15,17,0.08)] max-w-3xl">
          <h4 className="font-medium text-[#0E0F11] mb-2">Ventajas reales</h4>
          <ul className="text-sm text-[#3C4654] space-y-1.5 leading-relaxed">
            <li>• Cero foto de stock — la portada nace del código, como vuestro producto</li>
            <li>• 21 portadas únicas hoy, infinitas mañana (cualquier slug genera la suya)</li>
            <li>• ~10 KB por portada vs ~600 KB de las JPG actuales — Lighthouse mejora</li>
            <li>• Paleta indigo/cream garantizada por construcción — coherencia total</li>
            <li>• Conceptualmente alineado con &quot;agencia de inteligencia aplicada&quot;</li>
          </ul>
        </div>
      </Section>

      {/* OPCIÓN B — AI-generated */}
      <Section
        id="b"
        kicker="Opción B"
        title="AI-generated — portadas únicas por tema"
        intro="Generamos cada portada con un modelo de imágenes (Gemini Nano Banana o FAL Flux) usando prompts sistematizados. Cada post recibe una composición conceptualmente alineada con su tema. Requiere API key adicional o el uso de la Emergent LLM key."
      >
        <div className="grid md:grid-cols-3 gap-6 md:gap-8">
          {OPTION_B_PROMPTS.map((prompt, i) => (
            <div key={i} className="rounded-xl overflow-hidden border border-[rgba(14,15,17,0.08)] bg-[#FAF8F2]">
              <div
                className="aspect-[16/10] flex items-center justify-center p-6 text-center relative"
                style={{
                  background: `linear-gradient(${135 + i * 20}deg, rgba(44,62,128,0.45) 0%, rgba(44,62,128,0.18) 50%, rgba(44,62,128,0.32) 100%)`,
                }}
              >
                <span className="text-[10px] tracking-[0.24em] uppercase text-[#F5F2EC]/80 absolute top-3 left-3">
                  Concept · sample {i + 1}
                </span>
                <p className="text-[#F5F2EC] text-sm italic leading-relaxed">
                  &quot;{prompt}&quot;
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 p-6 bg-[#FAF8F2] rounded-xl border border-[rgba(14,15,17,0.08)] max-w-3xl">
          <h4 className="font-medium text-[#0E0F11] mb-2">Trade-offs</h4>
          <ul className="text-sm text-[#3C4654] space-y-1.5 leading-relaxed">
            <li>✅ Variedad temática real — cada cover evoca SU tema concreto</li>
            <li>✅ Estética cálida, más visual que Opción A</li>
            <li>⚠️ Requiere API key de generación de imágenes (Gemini / FAL)</li>
            <li>⚠️ Variabilidad de calidad — algunos prompts fallan o requieren iteración</li>
            <li>⚠️ Estilo difícil de mantener 100% consistente entre 21 generaciones</li>
          </ul>
          <p className="text-xs text-[#5D6878] mt-4 italic">
            * Los rectángulos arriba son mockups con gradientes — las imágenes reales se generarían si eliges esta opción.
          </p>
        </div>
      </Section>

      {/* OPCIÓN C — Unsplash sin edificios */}
      <Section
        id="c"
        kicker="Opción C"
        title="Unsplash curado — sin edificios, texturas tech"
        intro="Volvemos a stock pero con keywords correctos: macro de placas de circuito, fibra óptica, código en pantalla a contraluz, papel plegado, estudios de luz. Procesado por el mismo duotone indigo que ya tienes."
      >
        <div className="grid md:grid-cols-3 gap-6 md:gap-8">
          {OPTION_C_REFS.map((ref, i) => (
            <div key={i} className="rounded-xl overflow-hidden border border-[rgba(14,15,17,0.08)]">
              <div className="cover-editorial relative aspect-[16/10] bg-[#FAF8F2]">
                <img
                  src={ref.url}
                  alt={ref.label}
                  className="w-full h-full object-cover"
                />
              </div>
              <p className="text-[0.7rem] mt-3 text-[#5D6878] tracking-[0.16em] uppercase">
                {ref.label}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-12 p-6 bg-[#FAF8F2] rounded-xl border border-[rgba(14,15,17,0.08)] max-w-3xl">
          <h4 className="font-medium text-[#0E0F11] mb-2">Trade-offs</h4>
          <ul className="text-sm text-[#3C4654] space-y-1.5 leading-relaxed">
            <li>✅ Rápido de implementar — solo cambiar las URLs en el script</li>
            <li>✅ Texturas tech remiten a hardware/computación de forma sutil</li>
            <li>⚠️ Sigue siendo stock — cualquier startup podría tenerlas</li>
            <li>⚠️ Encontrar 21 imágenes coherentes entre sí es costoso y frágil</li>
            <li>⚠️ Mismo problema de peso — JPG grandes vs SVG ligero</li>
          </ul>
        </div>
      </Section>

      <div className="border-t border-[rgba(14,15,17,0.08)] pt-16 mt-8">
        <div className="container-main max-w-3xl">
          <p className="text-lg text-[#0E0F11]" style={{ fontFamily: "'Cabinet Grotesk', sans-serif", fontWeight: 500, letterSpacing: '-0.02em' }}>
            ¿Cuál te convence?
          </p>
          <p className="text-[#3C4654] mt-2">
            Una vez decidas, lo aplico a los 21 posts en producción. La opción A
            tarda ~10 min (solo código). La B requiere que me confirmes proveedor
            de imágenes. La C requiere reseleccionar fotos.
          </p>
        </div>
      </div>
    </main>
  );
}
