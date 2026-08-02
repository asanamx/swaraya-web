'use client';

import { ArrowUpRight } from 'lucide-react';
import { initiatives } from '@/data/initiatives';
import useScrollReveal from '../hooks/useScrollReveal';
import Hexagon from './Hexagon';

/**
 * INITIATIVES · vitrina de plataformas/productos operados por swaraya.
 *
 * Semánticamente distinto de "Agentes en operación":
 *   - Agentes  = capacidades de IA construidas para clientes
 *   - Iniciativas = plataformas propietarias que swaraya opera bajo
 *                   marcas comerciales propias (Atika, Xtrática, …)
 *
 * Todo el contenido viene de @/data/initiatives — para agregar una nueva
 * iniciativa basta con extender el array de datos.
 */

const STATUS = {
  operativa:  { label: 'Operativa',      color: '#7d5800', fg: '#7d5800', bg: 'rgba(125, 88, 0, 0.08)',  ring: 'rgba(125, 88, 0, 0.22)',  pulse: true  },
  desarrollo: { label: 'En desarrollo',  color: '#9aa0a8', fg: '#52565e', bg: 'rgba(154, 160, 168, 0.12)', ring: 'rgba(154, 160, 168, 0.28)', pulse: false },
  proximo:    { label: 'Próximamente',   color: '#9aa0a8', fg: '#52565e', bg: 'rgba(154, 160, 168, 0.12)', ring: 'rgba(154, 160, 168, 0.28)', pulse: false },
};

const StatusBadge = ({ status }) => {
  const s = STATUS[status] ?? STATUS.proximo;
  return (
    <span
      className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-[0.6875rem]"
      style={{
        background: s.bg,
        color: s.fg,
        border: `1px solid ${s.ring}`,
        fontFamily: "'Inter', sans-serif",
        fontWeight: 500,
        letterSpacing: '0.08em',
        textTransform: 'uppercase',
      }}
    >
      <Hexagon size={10} color={s.color} strokeWidth={1.4} pulse={s.pulse} />
      {s.label}
    </span>
  );
};

const Initiatives = () => {
  const [headerRef, headerVisible] = useScrollReveal({ threshold: 0.15 });
  const [gridRef, gridVisible] = useScrollReveal({ threshold: 0.1 });

  if (!initiatives.length) return null;

  return (
    <section
      id="iniciativas"
      className="section-padding bg-[#f4f4f5] relative overflow-hidden"
      data-testid="initiatives-section"
    >
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(45% 40% at 20% 60%, rgba(232, 163, 23,0.06) 0%, transparent 70%)',
        }}
      />

      <div className="container-main relative z-10">
        <div
          ref={headerRef}
          className={`max-w-2xl mb-16 md:mb-20 reveal ${headerVisible ? 'revealed' : ''}`}
        >
          <span className="label-accent text-[#7d5800] block mb-6" data-testid="initiatives-label">
            Iniciativas
          </span>
          <h2 className="heading-xl mb-5" data-testid="initiatives-headline">
            Plataformas <span className="text-[#7d5800]">propietarias</span> operadas por swaraya
          </h2>
          <p className="body-large">
            swaraya opera productos y plataformas digitales bajo marcas comerciales propias.
            Cada iniciativa tiene su propia identidad, dominio y modelo comercial.
          </p>
        </div>

        <div
          ref={gridRef}
          className={`grid sm:grid-cols-2 lg:grid-cols-3 gap-px bg-[rgba(17, 17, 20,0.06)] rounded-[16px] overflow-hidden reveal-stagger ${gridVisible ? 'revealed' : ''}`}
        >
          {initiatives.map((it) => (
            <a
              key={it.id}
              href={it.url}
              target="_blank"
              rel="noopener noreferrer"
              className="relative bg-[#ffffff] p-7 md:p-8 lg:p-10 group transition-all duration-300 focus:outline-none flex flex-col"
              data-testid={`initiative-${it.id}`}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-3px)';
                e.currentTarget.style.boxShadow = '0 24px 48px -16px rgba(17, 17, 20,0.08)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = 'none';
              }}
            >
              <div className="flex items-start justify-between mb-6">
                <StatusBadge status={it.status} />
                <ArrowUpRight
                  className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                  strokeWidth={1.8}
                  style={{ color: '#7d5800' }}
                />
              </div>

              <h3
                className="mb-2 tracking-[-0.02em]"
                style={{
                  fontFamily: "'Cabinet Grotesk', sans-serif",
                  fontWeight: 500,
                  fontSize: 'clamp(1.5rem, 2vw, 1.875rem)',
                  lineHeight: 1.1,
                  color: '#111114',
                  textTransform: 'lowercase',
                }}
              >
                {it.name}
                <span aria-hidden="true" style={{ color: '#7d5800' }}>.</span>
              </h3>

              <span
                className="mb-5 text-[0.75rem]"
                style={{
                  fontFamily: "'Inter', sans-serif",
                  color: '#63666e',
                  letterSpacing: '0.005em',
                }}
              >
                {it.domain}
              </span>

              <p
                className="text-[0.9375rem] leading-[1.65] mb-4"
                style={{ color: '#111114', fontFamily: "'Inter', sans-serif" }}
              >
                {it.tagline}
              </p>

              <p
                className="text-[0.8125rem] leading-[1.7] mt-auto"
                style={{ color: '#52565e', fontFamily: "'Inter', sans-serif" }}
              >
                {it.description}
              </p>

              <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[rgba(125, 88, 0,0.30)] to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Initiatives;
