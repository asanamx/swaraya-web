'use client';

/**
 * FontLoadCheck — Verificación en desarrollo de que las fuentes web
 * cargaron realmente (no están cayendo a fallback system-ui).
 *
 * Emite un `console.assert` visible en devtools:
 *  ✓ Cabinet Grotesk 500 y 700
 *  ✓ Inter 400 y 500
 *
 * Silencioso en producción.
 */

import { useEffect } from 'react';

export default function FontLoadCheck() {
  useEffect(() => {
    if (typeof document === 'undefined' || !document.fonts?.ready) return;
    if (process.env.NODE_ENV !== 'development') return;

    document.fonts.ready.then(() => {
      const checks = [
        { spec: '500 48px "Cabinet Grotesk"', label: 'Cabinet Grotesk 500' },
        { spec: '400 16px "Inter"',           label: 'Inter 400'           },
        { spec: '500 16px "Inter"',           label: 'Inter 500'           },
        { spec: '400 32px "Newsreader"',      label: 'Newsreader 400'      },
        { spec: 'italic 400 32px "Newsreader"', label: 'Newsreader 400 italic' },
      ];
      const results = checks.map((c) => ({ ...c, ok: document.fonts.check(c.spec) }));
      const failed = results.filter((r) => !r.ok);
      if (failed.length === 0) {
        // eslint-disable-next-line no-console
        console.log('%c[swaraya] Fonts OK — Cabinet Grotesk + Inter cargadas',
          'color:#2C3E80;font-weight:600');
      } else {
        // eslint-disable-next-line no-console
        console.warn('[swaraya] Fuentes NO cargadas correctamente (fallback activo):', failed);
      }
    });
  }, []);

  return null;
}
