import { ImageResponse } from 'next/og';

/**
 * OG Image endpoint — 1200×630, fondo carbón, wordmark swaraya. + tagline.
 *
 * ⚠️ Satori (motor de next/og) NO soporta `var(--…)`, `initial`, `inherit`,
 * `unset`, ni backgrounds con múltiples capas tipo
 * `radial-gradient(...) , #141414`. Todos los colores aquí están en hex/rgb
 * literal; el fondo usa un único `backgroundImage` (lineal) + un
 * `backgroundColor` sólido como respaldo. Para que Vercel compile en edge
 * runtime, las fuentes se cargan con `fetch(new URL(..., import.meta.url))`.
 */

export const runtime  = 'edge';
export const dynamic  = 'force-dynamic';

const SIZE = { width: 1200, height: 630 };

/* Paleta literal (NO tokens — Satori no resuelve CSS variables). */
const BROTE        = '#c8e824';
const CARBON       = '#141414';
const CARBON_SOFT  = '#1c1c1b';
const BLANCO       = '#ffffff';
const BLANCO_55    = 'rgba(255,255,255,0.55)';

async function loadFonts() {
  const [regular, medium] = await Promise.all([
    fetch(new URL('../../../assets/fonts/CabinetGrotesk-Regular.ttf', import.meta.url))
      .then((r) => r.arrayBuffer()),
    fetch(new URL('../../../assets/fonts/CabinetGrotesk-Medium.ttf', import.meta.url))
      .then((r) => r.arrayBuffer()),
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
          backgroundColor: CARBON,
          backgroundImage: `linear-gradient(135deg, ${CARBON_SOFT} 0%, ${CARBON} 100%)`,
          color: BLANCO,
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
            color: BROTE,
            fontWeight: 500,
          }}
        >
          <div
            style={{
              display: 'flex',
              width: 44,
              height: 2,
              backgroundColor: BROTE,
              opacity: 0.6,
            }}
          />
          <span style={{ display: 'flex' }}>Agencia de Inteligencia Aplicada</span>
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
            color: BLANCO,
            maxWidth: 980,
          }}
        >
          <span style={{ display: 'flex' }}>Tu mejor criterio,</span>
          <span style={{ display: 'flex', color: BROTE }}>aplicado todos los días.</span>
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
              color: BLANCO,
              textTransform: 'lowercase',
            }}
          >
            <span style={{ display: 'flex' }}>swaraya</span>
            <span style={{ display: 'flex', color: BROTE }}>.</span>
          </div>
          <div
            style={{
              display: 'flex',
              fontSize: 20,
              letterSpacing: '2px',
              textTransform: 'uppercase',
              color: BLANCO_55,
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
