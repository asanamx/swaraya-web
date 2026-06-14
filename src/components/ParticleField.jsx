'use client';

import { useEffect, useRef } from 'react';

/**
 * ParticleField
 * Editorial particle constellation. Slow drift + dynamic connections.
 * Renders on canvas (perfomant up to 100+ particles).
 *
 * Props:
 *   density:     number of particles (default 60)
 *   maxConnect:  pixel distance at which two particles connect (default 130)
 *   particleColor: rgba/hex
 *   lineColor:   rgba color for connections (alpha applied dynamically)
 *   className:   additional classes for the wrapping canvas
 */
export default function ParticleField({
  density = 60,
  maxConnect = 140,
  speed = 0.22,
  particleColor = 'rgba(44,62,128,0.62)',
  lineRgb = '44,62,128',
  className = '',
}) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let particles = [];
    let raf;
    let mounted = true;
    let dpr = window.devicePixelRatio || 1;

    function resize() {
      const parent = canvas.parentElement;
      if (!parent) return;
      const rect = parent.getBoundingClientRect();
      dpr = window.devicePixelRatio || 1;
      canvas.width = Math.round(rect.width * dpr);
      canvas.height = Math.round(rect.height * dpr);
      canvas.style.width = `${rect.width}px`;
      canvas.style.height = `${rect.height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      // (Re)create particles only if first init or size changed dramatically
      const count = Math.max(20, Math.round(density * (rect.width / 1200)));
      particles = Array.from({ length: count }, () => ({
        x: Math.random() * rect.width,
        y: Math.random() * rect.height,
        vx: (Math.random() - 0.5) * speed,
        vy: (Math.random() - 0.5) * speed,
        r: 0.9 + Math.random() * 1.6,
        op: 0.35 + Math.random() * 0.5,
      }));
    }

    function tick() {
      if (!mounted) return;
      const w = canvas.width / dpr;
      const h = canvas.height / dpr;
      ctx.clearRect(0, 0, w, h);

      // Update positions
      for (const p of particles) {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < -10) p.x = w + 10;
        else if (p.x > w + 10) p.x = -10;
        if (p.y < -10) p.y = h + 10;
        else if (p.y > h + 10) p.y = -10;
      }

      // Draw connections
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const d2 = dx * dx + dy * dy;
          const max2 = maxConnect * maxConnect;
          if (d2 < max2) {
            const d = Math.sqrt(d2);
            const op = (1 - d / maxConnect) * 0.16;
            ctx.strokeStyle = `rgba(${lineRgb},${op})`;
            ctx.lineWidth = 0.55;
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
          }
        }
      }

      // Draw particles
      for (const p of particles) {
        ctx.fillStyle = particleColor.replace(/,\s*[\d.]+\)$/, `,${p.op})`);
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fill();
      }

      raf = requestAnimationFrame(tick);
    }

    resize();
    tick();
    window.addEventListener('resize', resize);
    return () => {
      mounted = false;
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', resize);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [density, maxConnect, speed]);

  return (
    <canvas
      ref={canvasRef}
      className={`absolute inset-0 pointer-events-none ${className}`}
      aria-hidden="true"
    />
  );
}
