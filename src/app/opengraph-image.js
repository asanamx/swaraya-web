import { ImageResponse } from 'next/og';

/**
 * Open Graph image generada dinámicamente con next/og.
 * Sirve como og:image y twitter:image de la home.
 *
 * Composición visual — espejo del hero del sitio:
 *  - Fondo dark #0E0F11 con glow indigo radial
 *  - Grid arquitectónico sutil
 *  - Cardinal Asimétrico oficial (5 líneas + dot indigo central + diagonal NE indigo)
 *  - Wordmark "swaraya" en Author SemiBold
 *  - Headline tricolor: "Investigación profunda / Ingeniería precisa / Inteligencia real"
 *  - Eyebrow indigo: "Agencia de Inteligencia Artificial Aplicada"
 *  - URL swaraya.ai en la base
 */

export const runtime = 'edge';
export const alt = 'swaraya — Agencia de inteligencia artificial aplicada';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

// Paleta — sincronizada con src/lib/tokens.js
const COLORS = {
  bg: '#0E0F11',
  cream: '#F5F2EC',
  creamMuted: '#C8CCDC',
  creamSubtle: '#9BA5B7',
  indigoOnDark: '#5468D6',
};

async function loadFont(url) {
  try {
    const res = await fetch(url);
    if (!res.ok) return null;
    return await res.arrayBuffer();
  } catch {
    return null;
  }
}

export default async function Image() {
  // Fonts: Author Semibold (wordmark) + Cabinet Grotesk Medium (headlines).
  const [authorFont, cabinetFont] = await Promise.all([
    loadFont(
      'https://cdn.fontshare.com/wf/47YDOTC2J2YPUMCV3Q4WHHNTMU33CFQH/V3M2WERPCNNZ7T26K3MOXUEZGS2ZGQUC/4ABQGZ3MYJZTWULQDLA7M3FNYIWY7CW3.woff',
    ),
    loadFont(
      'https://cdn.fontshare.com/wf/QO5AURETMMOXVFGEZACCRXP67D2GDP4U/J5OF54OLQMAYWFFKKLHKLPDAJWPKMUXM/RG7XCDLB3WGRNF4XJBR7QKD2EFR42KOA.woff',
    ),
  ]);

  const fonts = [];
  if (authorFont) {
    fonts.push({ name: 'Author', data: authorFont, style: 'normal', weight: 600 });
  }
  if (cabinetFont) {
    fonts.push({ name: 'Cabinet', data: cabinetFont, style: 'normal', weight: 500 });
  }

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          padding: '80px 96px',
          background: `
            radial-gradient(circle at 78% 32%, rgba(84,104,214,0.28) 0%, rgba(14,15,17,0) 55%),
            radial-gradient(circle at 18% 82%, rgba(84,104,214,0.16) 0%, rgba(14,15,17,0) 55%),
            ${COLORS.bg}
          `,
          color: COLORS.cream,
          fontFamily: '"Cabinet", "Author", system-ui, sans-serif',
          position: 'relative',
        }}
      >
        {/* Grid arquitectónico — mismo lenguaje que el hero */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            opacity: 0.06,
            backgroundImage:
              'linear-gradient(rgba(245,242,236,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(245,242,236,0.5) 1px, transparent 1px)',
            backgroundSize: '60px 60px',
            display: 'flex',
          }}
        />

        {/* Línea acento indigo en el top — eco del navbar */}
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            height: 1,
            background: `linear-gradient(90deg, transparent 0%, ${COLORS.indigoOnDark} 50%, transparent 100%)`,
            opacity: 0.5,
            display: 'flex',
          }}
        />

        {/* Top: eyebrow + wordmark + Cardinal mark */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            position: 'relative',
          }}
        >
          {/* Eyebrow con dash indigo */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 18,
              marginBottom: 44,
            }}
          >
            <div
              style={{
                width: 36,
                height: 1.5,
                background: COLORS.indigoOnDark,
                opacity: 0.7,
                display: 'flex',
              }}
            />
            <div
              style={{
                fontSize: 22,
                letterSpacing: '0.32em',
                textTransform: 'uppercase',
                color: COLORS.indigoOnDark,
                fontWeight: 500,
                opacity: 0.95,
                display: 'flex',
                fontFamily: 'system-ui, sans-serif',
              }}
            >
              Agencia de Inteligencia Artificial Aplicada
            </div>
          </div>

          {/* Cardinal Asimétrico + wordmark "swaraya" */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 38 }}>
            {/* Cardinal Asimétrico oficial — viewBox 48 escalado a 130px
                Replica fielmente src/components/SwarayaCardinal.jsx con
                las 4 cardinales en cream, la diagonal NE en indigo y el
                dot indigo central (la firma de la marca). */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 48 48"
              width={130}
              height={130}
              style={{ display: 'flex' }}
            >
              <g
                stroke={COLORS.cream}
                strokeWidth={3}
                strokeLinecap="round"
                fill="none"
              >
                {/* N */}
                <line x1="24" y1="3" x2="24" y2="16" />
                {/* S */}
                <line x1="24" y1="32" x2="24" y2="45" />
                {/* W */}
                <line x1="3" y1="24" x2="16" y2="24" />
                {/* E */}
                <line x1="32" y1="24" x2="45" y2="24" />
              </g>
              {/* Diagonal NE — firma indigo */}
              <line
                x1="32"
                y1="16"
                x2="45"
                y2="3"
                stroke={COLORS.indigoOnDark}
                strokeWidth={3.4}
                strokeLinecap="round"
              />
              {/* Dot central — el corazón de luz del cardinal */}
              <circle cx="24" cy="24" r="2.8" fill={COLORS.indigoOnDark} />
            </svg>

            <div
              style={{
                fontFamily: '"Author", system-ui, sans-serif',
                fontSize: 140,
                lineHeight: 1,
                letterSpacing: '-0.04em',
                fontWeight: 600,
                color: COLORS.cream,
                display: 'flex',
              }}
            >
              swaraya
            </div>
          </div>
        </div>

        {/* Bottom: headline tricolor + URL */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            position: 'relative',
          }}
        >
          <div
            style={{
              fontSize: 60,
              lineHeight: 1.04,
              letterSpacing: '-0.028em',
              fontWeight: 500,
              fontFamily: '"Cabinet", system-ui, sans-serif',
              display: 'flex',
              flexDirection: 'column',
              color: COLORS.cream,
            }}
          >
            <span style={{ display: 'flex' }}>Investigación profunda.</span>
            <span style={{ display: 'flex', color: COLORS.creamMuted }}>
              Ingeniería precisa.
            </span>
            <span style={{ display: 'flex', color: COLORS.indigoOnDark }}>
              Inteligencia real.
            </span>
          </div>

          {/* URL footer */}
          <div
            style={{
              marginTop: 36,
              display: 'flex',
              alignItems: 'center',
              gap: 16,
            }}
          >
            <div
              style={{
                width: 36,
                height: 1,
                background: COLORS.indigoOnDark,
                opacity: 0.6,
                display: 'flex',
              }}
            />
            <div
              style={{
                fontSize: 22,
                letterSpacing: '0.04em',
                color: COLORS.creamSubtle,
                fontWeight: 500,
                fontFamily: 'system-ui, sans-serif',
                display: 'flex',
              }}
            >
              swaraya.ai
            </div>
          </div>
        </div>
      </div>
    ),
    { ...size, fonts: fonts.length > 0 ? fonts : undefined },
  );
}
