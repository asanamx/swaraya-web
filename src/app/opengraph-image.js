import { ImageResponse } from 'next/og';

// Open Graph image generada dinámicamente con next/og.
// Sirve como og:image y twitter:image de la home.
// Sistema visual nuevo: dark dramático + Author wordmark + Cabinet headlines + indigo eléctrico.

export const runtime = 'edge';
export const alt = 'swaraya — Inteligencia, investigada y diseñada';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

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
  // Fonts: Author Semibold for wordmark, Cabinet Grotesk for headlines.
  // Fontshare CDN — fetched at edge.
  const [authorFont, cabinetFont] = await Promise.all([
    loadFont('https://cdn.fontshare.com/wf/47YDOTC2J2YPUMCV3Q4WHHNTMU33CFQH/V3M2WERPCNNZ7T26K3MOXUEZGS2ZGQUC/4ABQGZ3MYJZTWULQDLA7M3FNYIWY7CW3.woff'),
    loadFont('https://cdn.fontshare.com/wf/QO5AURETMMOXVFGEZACCRXP67D2GDP4U/J5OF54OLQMAYWFFKKLHKLPDAJWPKMUXM/RG7XCDLB3WGRNF4XJBR7QKD2EFR42KOA.woff'),
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
          background:
            'radial-gradient(circle at 78% 38%, rgba(84,104,214,0.22) 0%, rgba(14,15,17,0) 55%), radial-gradient(circle at 22% 78%, rgba(44,62,128,0.18) 0%, rgba(14,15,17,0) 55%), #0E0F11',
          color: '#F5F2EC',
          fontFamily: '"Cabinet", "Author", system-ui, sans-serif',
          position: 'relative',
        }}
      >
        {/* Subtle grid */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            opacity: 0.06,
            backgroundImage:
              'linear-gradient(rgba(84,104,214,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(84,104,214,0.5) 1px, transparent 1px)',
            backgroundSize: '60px 60px',
            display: 'flex',
          }}
        />

        {/* Top: eyebrow + wordmark */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            position: 'relative',
          }}
        >
          <div
            style={{
              fontSize: 22,
              letterSpacing: '0.32em',
              textTransform: 'uppercase',
              color: '#5468D6',
              fontWeight: 500,
              opacity: 0.95,
              display: 'flex',
              marginBottom: 40,
              fontFamily: 'system-ui, sans-serif',
            }}
          >
            Agencia de Inteligencia Artificial Aplicada
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 36 }}>
            {/* Mark v5 AXIS */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 64 64"
              width={130}
              height={130}
              style={{ display: 'flex' }}
            >
              <g
                stroke="#F5F2EC"
                strokeWidth={4}
                strokeLinecap="round"
                fill="none"
              >
                <line x1="32" y1="10" x2="32" y2="24" />
                <line x1="32" y1="40" x2="32" y2="54" />
                <line x1="10" y1="32" x2="24" y2="32" />
                <line x1="40" y1="32" x2="54" y2="32" />
                <line x1="44.5" y1="19.5" x2="50" y2="14" />
              </g>
            </svg>
            <div
              style={{
                fontFamily: '"Author", system-ui, sans-serif',
                fontSize: 140,
                lineHeight: 1,
                letterSpacing: '-0.04em',
                fontWeight: 600,
                color: '#F5F2EC',
                display: 'flex',
              }}
            >
              swaraya
            </div>
          </div>
        </div>

        {/* Bottom: tagline + url */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            position: 'relative',
          }}
        >
          <div
            style={{
              fontSize: 56,
              lineHeight: 1.05,
              letterSpacing: '-0.025em',
              fontWeight: 500,
              fontFamily: '"Cabinet", system-ui, sans-serif',
              display: 'flex',
              flexDirection: 'column',
              color: '#F5F2EC',
            }}
          >
            <span style={{ display: 'flex' }}>Investigación profunda.</span>
            <span style={{ display: 'flex', color: '#C8CCDC' }}>
              Ingeniería precisa.
            </span>
            <span style={{ display: 'flex', color: '#5468D6' }}>
              Inteligencia real.
            </span>
          </div>
          <div
            style={{
              marginTop: 32,
              display: 'flex',
              alignItems: 'center',
              gap: 16,
            }}
          >
            <div
              style={{
                width: 36,
                height: 1,
                background: '#5468D6',
                opacity: 0.6,
                display: 'flex',
              }}
            />
            <div
              style={{
                fontSize: 22,
                letterSpacing: '0.04em',
                color: '#9BA5B7',
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
