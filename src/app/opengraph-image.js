import { ImageResponse } from 'next/og';
import { readFile } from 'fs/promises';
import path from 'path';

// Open Graph image generada dinámicamente con next/og.
// Sirve como og:image y twitter:image de la home.

export const runtime = 'nodejs';
export const alt = 'swaraya — Inteligencia, investigada y diseñada';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

async function getLogoDataUri() {
  try {
    const filePath = path.join(process.cwd(), 'public', 'logo-swaraya.png');
    const buf = await readFile(filePath);
    return `data:image/png;base64,${buf.toString('base64')}`;
  } catch (err) {
    console.error('Could not load logo:', err);
    return null;
  }
}

export default async function Image() {
  const logoSrc = await getLogoDataUri();

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

        {/* Top: label + logo oficial */}
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
              marginBottom: 36,
            }}
          >
            Agencia de Inteligencia Artificial Aplicada
          </div>
          {logoSrc ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={logoSrc}
              alt="swaraya"
              style={{ height: 120, width: 'auto', display: 'flex' }}
            />
          ) : (
            <div
              style={{
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
          )}
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
                fontSize: 22,
                letterSpacing: '0.04em',
                color: '#9BA5B7',
                fontWeight: 500,
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
