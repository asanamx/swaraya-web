'use client';

/**
 * IntelligenceShowcase — Sección "Inteligencia Aplicada".
 *
 * Vitrina de agentes en operación. Catálogo vivo, no portafolio estático.
 * Datos vienen de @/data/agents (mañana de API sin rediseñar el componente).
 */

import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import useScrollReveal from '../hooks/useScrollReveal';
import { agents } from '@/data/agents';

// ─────────────────────────────────────────────────────────────
// BADGE DE ESTADO — semántico y único en el sitio
//   Las únicas vetas de color "no-indigo" del sistema viven aquí.
// ─────────────────────────────────────────────────────────────
const STATUS = {
  produccion: {
    label: 'En producción',
    dot: '#3A5A40',
    bg: 'rgba(58,90,64,0.10)',
    fg: '#2E4733',
    ring: 'rgba(58,90,64,0.22)',
  },
  desarrollo: {
    label: 'En desarrollo',
    dot: '#9C6644',
    bg: 'rgba(156,102,68,0.10)',
    fg: '#7C4F35',
    ring: 'rgba(156,102,68,0.22)',
  },
  proximo: {
    label: 'Próximamente',
    dot: '#9BA5B7',
    bg: 'rgba(155,165,183,0.12)',
    fg: '#5D6878',
    ring: 'rgba(155,165,183,0.30)',
  },
};

const StatusBadge = ({ estado }) => {
  const s = STATUS[estado] ?? STATUS.proximo;
  return (
    <span
      className="inline-flex items-center gap-2 px-3 py-1 text-[0.6875rem] tracking-wider uppercase rounded-full"
      style={{
        background: s.bg,
        color: s.fg,
        border: `1px solid ${s.ring}`,
        fontFamily: "'Inter', sans-serif",
        fontWeight: 500,
        letterSpacing: '0.08em',
      }}
    >
      <span
        className="w-1.5 h-1.5 rounded-full"
        style={{ background: s.dot }}
      />
      {s.label}
    </span>
  );
};

// ─────────────────────────────────────────────────────────────
// TARJETA DE AGENTE — caso real
// ─────────────────────────────────────────────────────────────
const AgentCard = ({ agent }) => (
  <article
    className="relative bg-[#FAF8F2] p-7 md:p-8 lg:p-10 flex flex-col h-full group"
    data-testid={`agent-card-${agent.id}`}
  >
    {/* Disciplina (etiqueta superior) */}
    <span
      className="label-accent text-[#5D6878] block mb-7"
      style={{ color: '#5D6878' }}
    >
      {agent.disciplina}
    </span>

    {/* Título — la promesa */}
    <h3
      className="text-[#0E0F11] mb-6 tracking-[-0.018em] leading-[1.18]"
      style={{
        fontFamily: "'Cabinet Grotesk', sans-serif",
        fontWeight: 500,
        fontSize: 'clamp(1.375rem, 1.5vw + 0.75rem, 1.6875rem)',
      }}
    >
      {agent.titulo}
    </h3>

    {/* Problema (label + texto) */}
    <div className="mb-5">
      <span
        className="block text-[0.6875rem] uppercase tracking-[0.16em] text-[#646E7B] mb-2"
        style={{ fontFamily: "'Inter', sans-serif", fontWeight: 500 }}
      >
        Problema
      </span>
      <p className="text-[0.875rem] text-[#5D6878] leading-[1.7]">
        {agent.problema}
      </p>
    </div>

    {/* Resultado (label + texto) */}
    <div className="mb-8">
      <span
        className="block text-[0.6875rem] uppercase tracking-[0.16em] text-[#646E7B] mb-2"
        style={{ fontFamily: "'Inter', sans-serif", fontWeight: 500 }}
      >
        Qué hace
      </span>
      <p className="text-[0.875rem] text-[#0E0F11] leading-[1.7]">
        {agent.resultado}
      </p>
    </div>

    {/* Footer de tarjeta — estado + logro */}
    <div
      className="mt-auto pt-6 flex flex-col gap-4"
      style={{ borderTop: '1px solid rgba(14,15,17,0.06)' }}
    >
      <StatusBadge estado={agent.estado} />
      {agent.logro ? (
        <p
          className="text-[0.8125rem] text-[#5D6878] leading-[1.65] italic"
          style={{ fontFamily: "'Cabinet Grotesk', sans-serif", fontWeight: 400 }}
        >
          {agent.logro}
        </p>
      ) : null}
    </div>

    {/* Hover line accent — consistente con ResearchDomains */}
    <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[rgba(44,62,128,0.30)] to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
  </article>
);

// ─────────────────────────────────────────────────────────────
// TARJETA-CTA — visualmente distinta, invita
// ─────────────────────────────────────────────────────────────
const CtaCard = ({ agent }) => (
  <Link
    href="/#chat"
    scroll={true}
    className="relative p-7 md:p-8 lg:p-10 flex flex-col h-full group rounded-none"
    data-testid={`agent-card-${agent.id}`}
    style={{
      background:
        'linear-gradient(160deg, rgba(44,62,128,0.05) 0%, rgba(250,248,242,0.7) 60%)',
      border: '1px dashed rgba(44,62,128,0.25)',
    }}
  >
    {/* Disciplina */}
    <span
      className="label-accent block mb-7"
      style={{ color: '#2C3E80' }}
    >
      {agent.disciplina}
    </span>

    {/* Título */}
    <h3
      className="text-[#0E0F11] mb-6 tracking-[-0.018em] leading-[1.18]"
      style={{
        fontFamily: "'Cabinet Grotesk', sans-serif",
        fontWeight: 500,
        fontSize: 'clamp(1.375rem, 1.5vw + 0.75rem, 1.6875rem)',
      }}
    >
      {agent.titulo}
    </h3>

    {/* Problema + Resultado en flujo */}
    <p className="text-[0.875rem] text-[#5D6878] leading-[1.7] mb-3">
      {agent.problema}
    </p>
    <p className="text-[0.875rem] text-[#0E0F11] leading-[1.7] mb-8">
      {agent.resultado}
    </p>

    {/* Footer CTA */}
    <div className="mt-auto pt-6 flex items-center justify-between gap-4"
      style={{ borderTop: '1px solid rgba(44,62,128,0.12)' }}
    >
      <StatusBadge estado={agent.estado} />
      <span
        className="inline-flex items-center gap-2 text-[0.875rem] font-medium transition-transform duration-400 group-hover:translate-x-0.5"
        style={{ color: '#2C3E80', fontFamily: "'Inter', sans-serif" }}
      >
        ¡Hablemos!
        <ArrowUpRight className="w-4 h-4" strokeWidth={1.8} />
      </span>
    </div>
  </Link>
);

// ─────────────────────────────────────────────────────────────
// SECCIÓN
// ─────────────────────────────────────────────────────────────
const IntelligenceShowcase = () => {
  const [headerRef, headerVisible] = useScrollReveal({ threshold: 0.15 });
  const [cardsRef, cardsVisible] = useScrollReveal({ threshold: 0.08 });

  return (
    <section
      id="inteligencia-aplicada"
      className="section-padding bg-[#F5F2EC]"
      data-testid="intelligence-showcase-section"
    >
      <div className="container-main">
        {/* Header */}
        <div
          ref={headerRef}
          className={`max-w-2xl mb-16 md:mb-20 lg:mb-24 reveal ${headerVisible ? 'revealed' : ''}`}
        >
          <span
            className="label-accent text-[#2C3E80] block mb-6"
            data-testid="showcase-label"
          >
            Inteligencia Aplicada
          </span>
          <h2 className="heading-xl mb-5" data-testid="showcase-headline">
            Agentes <span className="text-[#2C3E80]">en operación</span>
          </h2>
          <p className="body-large" data-testid="showcase-subtext">
            Sistemas reales que ya están trabajando — no promesas, no demos. Cada uno
            es una capacidad viva diseñada para una disciplina.
          </p>
        </div>

        {/* Grid */}
        <div
          ref={cardsRef}
          className={`grid sm:grid-cols-2 lg:grid-cols-3 gap-px bg-[rgba(14,15,17,0.06)] rounded-[20px] overflow-hidden reveal-stagger ${cardsVisible ? 'revealed' : ''}`}
        >
          {agents.map((agent) =>
            agent.ctaCard ? (
              <CtaCard key={agent.id} agent={agent} />
            ) : (
              <AgentCard key={agent.id} agent={agent} />
            ),
          )}
        </div>

        {/* CTA de cierre — discreto, invitacional */}
        <div className="mt-16 md:mt-20 flex flex-col items-start gap-4 max-w-2xl">
          <p className="text-[#5D6878] text-[0.9375rem] leading-[1.75]">
            Si reconoces un patrón repetitivo en tu disciplina — uno donde el
            criterio experto se ejerce sobre datos que llegan en flujo — probablemente
            ahí vive el siguiente agente.
          </p>
          <Link
            href="/#chat"
            scroll={true}
            className="inline-flex items-center gap-2 text-[0.9375rem] font-medium transition-colors duration-400"
            style={{
              color: '#2C3E80',
              fontFamily: "'Inter', sans-serif",
              borderBottom: '1px solid rgba(44,62,128,0.30)',
              paddingBottom: '2px',
            }}
            data-testid="showcase-cta"
          >
            ¡Hablemos!
            <ArrowUpRight className="w-4 h-4" strokeWidth={1.8} />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default IntelligenceShowcase;
