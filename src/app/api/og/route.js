import { ImageResponse } from 'next/og';
import { readFile } from 'node:fs/promises';
import path from 'node:path';

/**
 * OG Image endpoint — 1200×630, fondo carbón, wordmark swaraya. + tagline.
 *
 * Se expone como route handler (`/api/og`) en lugar de la convención
 * file-based (`opengraph-image.js`) porque esta última resuelve la URL
 * absoluta contra el host interno del proceso Next (localhost:3000) y no
 * respeta el `metadataBase` cuando el sitio se sirve detrás de un proxy
 * de preview. Con un route handler, `layout.js` puede apuntar a
 * `${SITE_URL}/api/og` y la URL queda estable en todo entorno.
 */

export const runtime = 'nodejs';
export const dynamic = 'force-static';   // se puede cachear en producción

const SIZE = { width: 1200, height: 630 };

async function loadFonts() {
  const fontsDir = path.join(process.cwd(), 'src', 'assets', 'fonts');
  const [regular, medium] = await Promise.all([
    readFile(path.join(fontsDir, 'CabinetGrotesk-Regular.ttf')),
    readFile(path.join(fontsDir, 'CabinetGrotesk-Medium.ttf')),
  ]);
  return [
    { name: 'Cabinet Grotesk', data: regular, weight: 400, style: 'normal' },
    { name: 'Cabinet Grotesk', data: medium,  weight: 500, style: 'normal' },
  ];
}

export async function GET() {
  const fonts = await loadFonts();

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          padding: '80px 88px',
          background:
            'radial-gradient(60% 46% at 74% 30%, rgba(200, 232, 36, 0.10) 0%, rgba(20, 20, 20, 0) 65%), #141414',
          color: '#ffffff',
          fontFamily: 'Cabinet Grotesk',
        }}
      >
        {/* Eyebrow superior */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 16,
            fontSize: 20,
            letterSpacing: '6px',
            textTransform: 'uppercase',
            color: '#c8e824',
            fontWeight: 500,
          }}
        >
          <div style={{ width: 44, height: 2, background: '#c8e824', opacity: 0.6 }} />
          Agencia de Inteligencia Aplicada
        </div>

        {/* Tagline principal */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            fontSize: 92,
            fontWeight: 500,
            lineHeight: 1.02,
            letterSpacing: '-0.035em',
            color: '#ffffff',
            maxWidth: 980,
          }}
        >
          <span>Tu mejor criterio,</span>
          <span style={{ color: '#c8e824' }}>aplicado todos los días.</span>
        </div>

        {/* Wordmark inferior */}
        <div
          style={{
            display: 'flex',
            alignItems: 'flex-end',
            justifyContent: 'space-between',
            width: '100%',
          }}
        >
          <div
            style={{
              display: 'flex',
              alignItems: 'baseline',
              fontSize: 72,
              fontWeight: 500,
              letterSpacing: '-0.03em',
              lineHeight: 1,
              color: '#ffffff',
              textTransform: 'lowercase',
            }}
          >
            swaraya
            <span style={{ color: '#c8e824' }}>.</span>
          </div>
          <div
            style={{
              fontSize: 20,
              letterSpacing: '2px',
              textTransform: 'uppercase',
              color: 'rgba(255,255,255,0.55)',
              fontWeight: 400,
            }}
          >
            swaraya.ai
          </div>
        </div>
      </div>
    ),
    {
      ...SIZE,
      fonts,
    }
  );
}
