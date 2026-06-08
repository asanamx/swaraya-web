import { ImageResponse } from 'next/og';

// Open Graph image generada dinámicamente con next/og.
// Next.js la sirve en /opengraph-image y la usa automáticamente como
// og:image y twitter:image para la home (gracias al fichero estar en
// el directorio raíz de la app).

export const runtime = 'edge';
export const alt = 'swaraya — Inteligencia, investigada y diseñada';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default async function Image() {
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
            'radial-gradient(circle at 78% 38%, rgba(122,196,224,0.22) 0%, rgba(5,6,10,0) 55%), radial-gradient(circle at 22% 78%, rgba(90,123,250,0.18) 0%, rgba(5,6,10,0) 55%), #05060A',
          color: '#F4F6F9',
          fontFamily: 'Inter, system-ui, sans-serif',
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
              'linear-gradient(rgba(122,196,224,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(122,196,224,0.5) 1px, transparent 1px)',
            backgroundSize: '60px 60px',
            display: 'flex',
          }}
        />

        {/* Top: label + wordmark */}
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
              color: '#7AC4E0',
              fontWeight: 500,
              opacity: 0.9,
              display: 'flex',
            }}
          >
            Agencia de Inteligencia Artificial Aplicada
          </div>
          <div
            style={{
              marginTop: 18,
              fontSize: 120,
              lineHeight: 1,
              letterSpacing: '-0.04em',
              fontWeight: 600,
              color: '#F4F6F9',
              display: 'flex',
            }}
          >
            swaraya
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
              color: '#F4F6F9',
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            <span style={{ display: 'flex' }}>Investigación profunda.</span>
            <span style={{ display: 'flex', color: '#9BA5B7' }}>
              Ingeniería precisa. Inteligencia real.
            </span>
          </div>
          <div
            style={{
              marginTop: 40,
              display: 'flex',
              alignItems: 'center',
              gap: 16,
            }}
          >
            <div
              style={{
                width: 36,
                height: 1,
                background: '#7AC4E0',
                opacity: 0.6,
                display: 'flex',
              }}
            />
            <div
              style={{
                fontSize: 20,
                letterSpacing: '0.2em',
                textTransform: 'uppercase',
                color: '#9BA5B7',
                display: 'flex',
              }}
            >
              swaraya.ai
            </div>
          </div>
        </div>
      </div>
    ),
    { ...size },
  );
}
