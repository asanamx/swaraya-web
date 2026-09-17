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
// BADGE DE ESTADO — píldora con dot de color por estado
// v3.0: produccion (verde brote) · desarrollo (hollow gris) ·
//        disponible (neutro tinta sólido, distinto de brote y gris)
// ─────────────────────────────────────────────────────────────
const STATUS = {
  produccion: {
    label: 'En producción',
    dotColor: 'var(--brote)',
    dotSolid: true,
    textColor: 'var(--texto)',
    bg: 'var(--superficie)',
    ring: 'var(--borde)',
  },
  desarrollo: {
    label: 'En desarrollo',
    dotColor: 'var(--texto-apoyo)',
    dotSolid: false,
    textColor: 'var(--texto-apoyo)',
    bg: 'var(--superficie)',
    ring: 'var(--borde-alfa)',
  },
  disponible: {
    label: 'Disponible',
    dotColor: 'var(--texto)',
    dotSolid: true,
    textColor: 'var(--texto)',
    bg: 'var(--superficie)',
    ring: 'var(--borde)',
  },
  // Compatibilidad con datos legacy — mapea al mismo look que 'desarrollo'
  proximo: {
    label: 'Próximamente',
    dotColor: 'var(--texto-apoyo)',
    dotSolid: false,
    textColor: 'var(--texto-apoyo)',
    bg: 'var(--superficie)',
    ring: 'var(--borde-alfa)',
  },
};

const StatusBadge = ({ estado }) => {
  const s = STATUS[estado] ?? STATUS.proximo;
  return (
    <span
      className="inline-flex items-center gap-2 px-3 py-1 text-[0.6875rem] tracking-wider uppercase rounded-full"
      style={{
        background: s.bg,
        color: s.textColor,
        border: `1px solid ${s.ring}`,
        fontFamily: "'Inter', sans-serif",
        fontWeight: 500,
        letterSpacing: '0.08em',
      }}
    >
      <span
        aria-hidden="true"
        className="inline-block rounded-full"
        style={{
          width: 8,
          height: 8,
          background: s.dotSolid ? s.dotColor : 'transparent',
          border: s.dotSolid ? 'none' : `1.5px solid ${s.dotColor}`,
        }}
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
    className="relative bg-[color:var(--blanco)] p-7 md:p-8 lg:p-10 flex flex-col h-full group rounded-xl"
    style={{
      border: '1px solid var(--borde-alfa)',
    }}
    data-testid={`agent-card-${agent.id}`}
  >
    {/* Disciplina (etiqueta superior) */}
    <span
      className="label-accent block mb-7"
      style={{ color: 'var(--texto-apoyo)' }}
    >
      {agent.disciplina}
    </span>

    {/* Título — la promesa */}
    <h3
      className="mb-6 tracking-[-0.018em] leading-[1.18]"
      style={{
        color: 'var(--texto)',
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
        className="block text-[0.6875rem] uppercase tracking-[0.16em] mb-2"
        style={{ fontFamily: "'Inter', sans-serif", fontWeight: 500, color: 'var(--texto-terciario)' }}
      >
        Problema
      </span>
      <p className="text-[0.875rem] leading-[1.7]" style={{ color: 'var(--texto-apoyo)' }}>
        {agent.problema}
      </p>
    </div>

    {/* Resultado (label + texto) */}
    <div className="mb-8">
      <span
        className="block text-[0.6875rem] uppercase tracking-[0.16em] mb-2"
        style={{ fontFamily: "'Inter', sans-serif", fontWeight: 500, color: 'var(--texto-terciario)' }}
      >
        Qué hace
      </span>
      <p className="text-[0.875rem] leading-[1.7]" style={{ color: 'var(--texto)' }}>
        {agent.resultado}
      </p>
    </div>

    {/* Footer de tarjeta — logro (variable) arriba, píldora anclada al fondo
        para que las cuatro píldoras compartan línea base independientemente
        de cuánto texto tenga cada logro. */}
    <div
      className="mt-auto pt-6 flex flex-col gap-4"
      style={{ borderTop: '1px solid var(--borde-alfa)' }}
    >
      {agent.logro ? (
        <p
          className="text-[0.8125rem] leading-[1.65] italic"
          style={{ fontFamily: "'Cabinet Grotesk', sans-serif", fontWeight: 400, color: 'var(--texto-apoyo)' }}
        >
          {agent.logro}
        </p>
      ) : null}
      <StatusBadge estado={agent.estado} />
    </div>

    {/* Hover line accent — consistente con ResearchDomains */}
    <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[color:var(--borde)] to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
  </article>
);

// ─────────────────────────────────────────────────────────────
// TARJETA-CTA — visualmente distinta, invita
// ─────────────────────────────────────────────────────────────
const CtaCard = ({ agent, className = '' }) => (
  <Link
    href="/#chat"
    scroll={true}
    className={`relative p-7 md:p-8 lg:p-10 flex flex-col h-full group rounded-xl transition-transform duration-500 invertido ${className}`}
    data-testid={`agent-card-${agent.id}`}
    style={{
      background: 'var(--carbon)',
      color: 'var(--blanco)',
      border: '1px solid var(--blanco-14)',
    }}
  >
    {/* Disciplina */}
    <span
      className="label-accent block mb-7"
      style={{ color: 'var(--brote)' }}                    /* brote sobre carbón · ≈9.5:1 ✓ */
    >
      {agent.disciplina}
    </span>

    {/* Título */}
    <h3
      className="mb-6 tracking-[-0.018em] leading-[1.18]"
      style={{
        color: 'var(--blanco)',
        fontFamily: "'Cabinet Grotesk', sans-serif",
        fontWeight: 500,
        fontSize: 'clamp(1.375rem, 1.5vw + 0.75rem, 1.6875rem)',
      }}
    >
      {agent.titulo}
    </h3>

    {/* Problema + Resultado unidos en un solo párrafo continuo */}
    <p className="text-[0.875rem] leading-[1.7] mb-4" style={{ color: 'var(--blanco)' }}>
      <span style={{ color: 'var(--blanco-60)' }}>{agent.problema}</span>{' '}
      {agent.resultado}
    </p>

    {/* Línea de cierre — promesa concreta, en brote para dar cierre visual */}
    {agent.cierre ? (
      <p
        className="text-[0.875rem] leading-[1.55] mb-8"
        style={{
          color: 'var(--brote)',
          fontFamily: "'Cabinet Grotesk', sans-serif",
          fontWeight: 500,
          letterSpacing: '-0.005em',
        }}
      >
        {agent.cierre}
      </p>
    ) : null}

    {/* Footer CTA — pie anclado al fondo con mt-auto: el contenido del
        cuerpo queda arriba y el espacio sobrante se absorbe antes del pie. */}
    <div
      className="mt-auto pt-6 flex items-center justify-between gap-4"
      style={{ borderTop: '1px solid var(--blanco-14)' }}
    >
      {/* Chip "En producción" sobre carbón — brote + borde brote */}
      <span
        className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-[0.6875rem] uppercase"
        style={{
          background: 'rgba(200, 232, 36, 0.10)',
          border: '1px solid rgba(200, 232, 36, 0.35)',
          color: 'var(--brote)',
          fontFamily: "'Inter', sans-serif",
          fontWeight: 500,
          letterSpacing: '0.08em',
        }}
      >
        <span
          aria-hidden="true"
          className="inline-block rounded-full"
          style={{ width: 8, height: 8, background: 'var(--brote)' }}
        />
        {agent.disciplina && 'Tu disciplina'}
      </span>
      <span
        className="inline-flex items-center gap-2 text-[0.875rem] font-medium transition-transform duration-400 group-hover:translate-x-0.5"
        style={{ color: 'var(--brote)', fontFamily: "'Inter', sans-serif" }}
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
      id="agentes"
      className="section-padding bg-[color:var(--blanco)]"
      data-testid="intelligence-showcase-section"
    >
      <div className="container-main">
        {/* Header */}
        <div
          ref={headerRef}
          className={`max-w-2xl mb-16 md:mb-20 lg:mb-24 reveal ${headerVisible ? 'revealed' : ''}`}
        >
          <span
            className="label-accent block mb-6"
            data-testid="showcase-label"
          >
            Agentes
          </span>
          <h2 className="heading-xl mb-5" data-testid="showcase-headline">
            Cuatro formas de empezar
          </h2>
          <p className="body-large" data-testid="showcase-subtext">
            Cada una es una plantilla probada que se reconfigura con tu
            criterio. Implementamos un proceso a la vez, con medición antes y
            después.
          </p>
        </div>

        {/* Grid — 3 arriba + 2 abajo (la 5ta card CTA ocupa 2 cols en desktop) */}
        <div
          ref={cardsRef}
          className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-px bg-[color:var(--borde-alfa)] rounded-xl overflow-hidden reveal-stagger ${cardsVisible ? 'revealed' : ''}`}
        >
          {agents.map((agent, i) =>
            agent.ctaCard ? (
              <CtaCard
                key={agent.id}
                agent={agent}
                className="lg:col-span-2"
              />
            ) : (
              <AgentCard key={agent.id} agent={agent} />
            ),
          )}
        </div>
      </div>
    </section>
  );
};

export default IntelligenceShowcase;
