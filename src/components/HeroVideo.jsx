'use client';

/**
 * HeroVideo — capa atmosférica opcional del hero (§4b del brand book).
 *
 * REGLAS ESTRICTAS
 *  · El hero funciona completo SIN video. El video es atmósfera, no contenido.
 *  · Video siempre detrás de: grayscale + contrast + overlay oscuro + glow girasol
 *    + grano. Aporta movimiento; nunca color propio.
 *  · No carga en: touch, prefers-reduced-motion, prefers-reduced-data,
 *    conexiones lentas (Save-Data / 2G/3G).
 *  · Pausa cuando el hero sale del viewport (IntersectionObserver).
 *  · Poster fallback siempre presente (el hero se ve idéntico si el video
 *    nunca carga).
 *
 * Uso:
 *   <HeroVideo
 *     src="/hero/starlings-murmuration.mp4"
 *     srcWebm="/hero/starlings-murmuration.webm"      (opcional)
 *     poster="/hero/starlings-poster.jpg"
 *   />
 */

import { useEffect, useRef, useState } from 'react';

const HeroVideo = ({ src, srcWebm, poster, className = '' }) => {
  const videoRef = useRef(null);
  const [shouldLoad, setShouldLoad] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);

  // Decide si cargar video basado en preferencias del usuario y ancho de banda
  useEffect(() => {
    if (typeof window === 'undefined') return;

    const mqReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    const mqReducedData   = window.matchMedia('(prefers-reduced-data: reduce)');
    const isTouch         = window.matchMedia('(hover: none)').matches;

    // Save-Data header vía navigator.connection
    const conn = navigator.connection || navigator.mozConnection || navigator.webkitConnection;
    const saveData = conn?.saveData === true;
    const slowNet = conn?.effectiveType && /(^|-)2g$/.test(conn.effectiveType);

    if (
      mqReducedMotion.matches ||
      mqReducedData.matches ||
      saveData ||
      slowNet ||
      isTouch
    ) {
      return;                                    // no cargar video — poster only
    }
    if (!src) return;
    setShouldLoad(true);
  }, [src]);

  // Pausa cuando el hero sale del viewport
  useEffect(() => {
    if (!shouldLoad) return;
    const el = videoRef.current;
    if (!el) return;

    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            el.play().then(() => setIsPlaying(true)).catch(() => {});
          } else {
            el.pause();
            setIsPlaying(false);
          }
        }
      },
      { threshold: 0.1 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [shouldLoad]);

  return (
    <div
      aria-hidden="true"
      className={`hero-video-wrap ${className}`}
      style={{
        position: 'absolute',
        inset: 0,
        overflow: 'hidden',
        pointerEvents: 'none',
        zIndex: 0,
      }}
    >
      {shouldLoad && (
        <video
          ref={videoRef}
          muted
          autoPlay
          loop
          playsInline
          preload="metadata"
          poster={poster}
          className="hero-video"
          style={{
            position: 'absolute',
            inset: 0,
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            /* filter aplicado en CSS para poder animarse suave */
          }}
        >
          {srcWebm && <source src={srcWebm} type="video/webm" />}
          {src && <source src={src} type="video/mp4" />}
        </video>
      )}

      {/* Fallback poster estático (siempre presente) — si video nunca carga,
          el hero luce idéntico */}
      {poster && !shouldLoad && (
        <img
          src={poster}
          alt=""
          className="hero-video-poster"
          style={{
            position: 'absolute',
            inset: 0,
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            opacity: 0.55,
          }}
        />
      )}

      {/* Overlay oscuro degradado — asegura contraste ≥4.5:1 del texto */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background:
            'linear-gradient(180deg, rgba(10,10,10,0.55) 0%, rgba(10,10,10,0.75) 55%, rgba(10,10,10,0.90) 100%)',
          pointerEvents: 'none',
        }}
      />

      <style jsx>{`
        .hero-video {
          filter: grayscale(1) contrast(1.10) brightness(0.85);
          opacity: 0.55;
          transition: opacity 700ms ease;
        }
        @media (prefers-reduced-motion: reduce) {
          .hero-video { display: none !important; }
        }
      `}</style>
    </div>
  );
};

export default HeroVideo;
