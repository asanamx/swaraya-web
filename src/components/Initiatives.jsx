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
  operativa:  { label: 'Operativa',      dot: '#3A5A40', fg: '#2E4733', bg: 'rgba(58,90,64,0.10)',  ring: 'rgba(58,90,64,0.22)'  },
  desarrollo: { label: 'En desarrollo',  dot: '#9C6644', fg: '#7C4F35', bg: 'rgba(156,102,68,0.10)', ring: 'rgba(156,102,68,0.22)' },
  proximo:    { label: 'Próximamente',   dot: '#9BA5B7', fg: '#5D6878', bg: 'rgba(155,165,183,0.12)', ring: 'rgba(155,165,183,0.30)' },
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
      <span className="w-1.5 h-1.5 rounded-full" style={{ background: s.dot }} />
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
      className="section-padding bg-[#F5F2EB] relative overflow-hidden"
      data-testid="initiatives-section"
    >
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(45% 40% at 20% 60%, rgba(84,104,214,0.06) 0%, transparent 70%)',
        }}
      />

      <div className="container-main relative z-10">
        <div
          ref={headerRef}
          className={`max-w-2xl mb-16 md:mb-20 reveal ${headerVisible ? 'revealed' : ''}`}
        >
          <span className="label-accent text-[#2C3E80] block mb-6" data-testid="initiatives-label">
            Iniciativas
          </span>
          <h2 className="heading-xl mb-5" data-testid="initiatives-headline">
            Plataformas <span className="text-[#2C3E80]">propietarias</span> operadas por swaraya
          </h2>
          <p className="body-large">
            swaraya opera productos y plataformas digitales bajo marcas comerciales propias.
            Cada iniciativa tiene su propia identidad, dominio y modelo comercial.
          </p>
        </div>

        <div
          ref={gridRef}
          className={`grid sm:grid-cols-2 lg:grid-cols-3 gap-px bg-[rgba(14,15,17,0.06)] rounded-[16px] overflow-hidden reveal-stagger ${gridVisible ? 'revealed' : ''}`}
        >
          {initiatives.map((it) => (
            <a
              key={it.id}
              href={it.url}
              target="_blank"
              rel="noopener noreferrer"
              className="relative bg-[#F8F6F1] p-7 md:p-8 lg:p-10 group transition-all duration-300 focus:outline-none flex flex-col"
              data-testid={`initiative-${it.id}`}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-3px)';
                e.currentTarget.style.boxShadow = '0 24px 48px -16px rgba(14,15,17,0.08)';
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
                  style={{ color: '#2C3E80' }}
                />
              </div>

              <h3
                className="mb-2 tracking-[-0.02em]"
                style={{
                  fontFamily: "'Cabinet Grotesk', sans-serif",
                  fontWeight: 500,
                  fontSize: 'clamp(1.5rem, 2vw, 1.875rem)',
                  lineHeight: 1.1,
                  color: '#0E0F11',
                  textTransform: 'lowercase',
                }}
              >
                {it.name}
                <span aria-hidden="true" style={{ color: '#2C3E80' }}>.</span>
              </h3>

              <span
                className="mb-5 text-[0.75rem]"
                style={{
                  fontFamily: "'Inter', sans-serif",
                  color: '#646E7B',
                  letterSpacing: '0.005em',
                }}
              >
                {it.domain}
              </span>

              <p
                className="text-[0.9375rem] leading-[1.65] mb-4"
                style={{ color: '#0E0F11', fontFamily: "'Inter', sans-serif" }}
              >
                {it.tagline}
              </p>

              <p
                className="text-[0.8125rem] leading-[1.7] mt-auto"
                style={{ color: '#5D6878', fontFamily: "'Inter', sans-serif" }}
              >
                {it.description}
              </p>

              <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[rgba(44,62,128,0.30)] to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Initiatives;
