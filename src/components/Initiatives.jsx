'use client';

import { ArrowUpRight } from 'lucide-react';
import { initiatives } from '@/data/initiatives';
import useScrollReveal from '../hooks/useScrollReveal';

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
  operativa:  { label: 'Operativa',      color: 'var(--texto)',        fg: 'var(--texto)',        bg: 'var(--superficie)', ring: 'var(--borde)',      solid: true  },
  desarrollo: { label: 'En desarrollo',  color: 'var(--texto-apoyo)',  fg: 'var(--texto-apoyo)',  bg: 'var(--superficie)', ring: 'var(--borde-alfa)', solid: false },
  proximo:    { label: 'Próximamente',   color: 'var(--texto-apoyo)',  fg: 'var(--texto-apoyo)',  bg: 'var(--superficie)', ring: 'var(--borde-alfa)', solid: false },
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
      <span
        aria-hidden="true"
        className="inline-block rounded-full"
        style={{
          width: 8,
          height: 8,
          background: s.solid ? s.color : 'transparent',
          border: s.solid ? 'none' : `1.5px solid ${s.color}`,
        }}
      />
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
            'radial-gradient(45% 40% at 20% 60%, rgba(200, 232, 36,0.06) 0%, transparent 70%)',
        }}
      />

      <div className="container-main relative z-10">
        <div
          ref={headerRef}
          className={`max-w-2xl mb-16 md:mb-20 reveal ${headerVisible ? 'revealed' : ''}`}
        >
          <span className="label-accent block mb-6" data-testid="initiatives-label">
            Iniciativas
          </span>
          <h2 className="heading-xl mb-5" data-testid="initiatives-headline">
            Construimos software{' '}
            <span style={{ color: 'var(--texto-apoyo)' }}>
              además de venderlo
            </span>
          </h2>
          <p className="body-large">
            Operamos nuestras propias plataformas. No asesoramos sobre
            problemas que no hemos tenido: los tenemos todos los meses, con
            usuarios y facturación de por medio.
          </p>
        </div>

        <div
          ref={gridRef}
          className={`grid sm:grid-cols-2 lg:grid-cols-4 gap-px bg-[color:var(--borde-alfa)] rounded-xl overflow-hidden reveal-stagger ${gridVisible ? 'revealed' : ''}`}
        >
          {initiatives.map((it) => (
            <a
              key={it.id}
              href={it.url}
              target="_blank"
              rel="noopener noreferrer"
              className="relative bg-[color:var(--blanco)] p-7 md:p-8 lg:p-10 group transition-all duration-300 focus:outline-none flex flex-col"
              data-testid={`initiative-${it.id}`}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-2px)';
                e.currentTarget.style.background = 'var(--niebla)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.background = 'var(--blanco)';
              }}
            >
              <div className="flex items-start justify-between mb-6">
                <StatusBadge status={it.status} />
                <ArrowUpRight
                  className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                  strokeWidth={1.8}
                  style={{ color: 'var(--texto)' }}
                />
              </div>

              <h3
                className="mb-2 tracking-[-0.02em]"
                style={{
                  fontFamily: "'Cabinet Grotesk', sans-serif",
                  fontWeight: 500,
                  fontSize: 'clamp(1.5rem, 2vw, 1.875rem)',
                  lineHeight: 1.1,
                  color: 'var(--texto)',
                  textTransform: 'lowercase',
                }}
              >
                {it.name}
                <span aria-hidden="true" style={{ color: 'var(--brote)' }}>.</span>
              </h3>

              <span
                className="mb-5 text-[0.75rem]"
                style={{
                  fontFamily: "'Inter', sans-serif",
                  color: 'var(--texto-terciario)',
                  letterSpacing: '0.005em',
                }}
              >
                {it.domain}
              </span>

              <p
                className="text-[0.9375rem] leading-[1.65] mb-4"
                style={{ color: 'var(--texto)', fontFamily: "'Inter', sans-serif" }}
              >
                {it.tagline}
              </p>

              <p
                className="text-[0.8125rem] leading-[1.7] mt-auto"
                style={{ color: 'var(--texto-apoyo)', fontFamily: "'Inter', sans-serif" }}
              >
                {it.description}
              </p>

              <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[color:var(--borde)] to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Initiatives;
