'use client';

import { useEffect } from 'react';

// Removes the Emergent platform badge from the DOM (ported from the
// original CRA index.html script). Runs continuously via interval + observer.
export default function BadgeRemover() {
  useEffect(() => {
    function removeBadge() {
      const badge = document.getElementById('emergent-badge');
      if (badge && badge.parentNode) badge.parentNode.removeChild(badge);

      document.querySelectorAll('[id*="emergent"], [class*="emergent"]').forEach((el) => {
        if (el.id !== 'root' && !el.closest('#__next') && !el.closest('#root')) {
          el.parentNode && el.parentNode.removeChild(el);
        }
      });

      document.querySelectorAll('a[href*="emergent"]').forEach((el) => {
        if (!el.closest('#__next') && !el.closest('#root') && !el.closest('nav')) {
          el.parentNode && el.parentNode.removeChild(el);
        }
      });

      document.querySelectorAll('body > a, body > div').forEach((el) => {
        if (el.id === '__next' || el.id === 'root') return;
        const style = window.getComputedStyle(el);
        if (
          style.position === 'fixed' &&
          (parseInt(style.bottom) <= 20 || style.bottom === '16px') &&
          (parseInt(style.right) <= 20 || style.right === '16px')
        ) {
          el.parentNode && el.parentNode.removeChild(el);
        }
      });
    }

    removeBadge();
    const onLoad = () => {
      removeBadge();
      [100, 500, 1000, 2000].forEach((t) => setTimeout(removeBadge, t));
    };
    window.addEventListener('load', onLoad);
    const interval = setInterval(removeBadge, 100);

    const observer = new MutationObserver(removeBadge);
    if (document.body) observer.observe(document.body, { childList: true, subtree: true });

    return () => {
      window.removeEventListener('load', onLoad);
      clearInterval(interval);
      observer.disconnect();
    };
  }, []);

  return null;
}
