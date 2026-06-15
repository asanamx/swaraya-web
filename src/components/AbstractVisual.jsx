'use client';

import { useEffect, useRef } from 'react';

/**
 * AbstractVisual — Sistema orbital procedural adaptado al tema cream + indigo.
 *
 * Es la animación original del sitio (era oscura con cian) restaurada y
 * adaptada al lenguaje editorial actual: un punto luminoso indigo flotando
 * en el cuadrante superior-derecho, con anillos concéntricos pulsantes,
 * partículas orbitales, partículas distantes, líneas radiales y rayos de luz.
 *
 * No depende de la marca/glifo: es un sistema abstracto independiente.
 *
 * Paleta:
 *  - accent (#5468D6) → indigo luminoso, partículas y anillos
 *  - deep   (#2C3E80) → indigo profundo, líneas y centro
 *
 * Performance: Canvas 2D con DPR-cap a 2, pausa cuando la pestaña no está
 * visible, respeta prefers-reduced-motion.
 */
export const AbstractVisual = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let animationFrameId;
    let paused = false;
    let time = 0;

    // Paleta indigo (rgb strings para usar en rgba())
    const ACCENT = '84, 104, 214';  // #5468D6
    const DEEP = '44, 62, 128';     // #2C3E80

    const prefersReduced =
      typeof window !== 'undefined' &&
      window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;

    const resizeCanvas = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = canvas.offsetWidth * dpr;
      canvas.height = canvas.offsetHeight * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    // Centro focal — cuadrante superior-derecho
    const FOCAL = { x: 0.72, y: 0.46 };

    // Grid muy sutil con onda
    const drawGrid = () => {
      const w = canvas.offsetWidth;
      const h = canvas.offsetHeight;
      const gridSize = 80;
      const offset = time * 0.015;

      ctx.strokeStyle = `rgba(${DEEP}, 0.045)`;
      ctx.lineWidth = 0.5;

      for (let x = -gridSize; x < w + gridSize; x += gridSize) {
        ctx.beginPath();
        ctx.moveTo(x + Math.sin(offset) * 10, 0);
        ctx.lineTo(x + Math.sin(offset + 2) * 10, h);
        ctx.stroke();
      }
      for (let y = -gridSize; y < h + gridSize; y += gridSize) {
        ctx.beginPath();
        ctx.moveTo(0, y + Math.cos(offset * 0.7) * 5);
        ctx.lineTo(w, y + Math.cos(offset * 0.7 + 1) * 5);
        ctx.stroke();
      }
    };

    // Estructura focal — anillos pulsantes + glow central
    const drawFocalStructure = () => {
      const w = canvas.offsetWidth;
      const h = canvas.offsetHeight;
      const cx = w * FOCAL.x;
      const cy = h * FOCAL.y;

      const pulseIntensity = 0.6 + Math.sin(time * 0.002) * 0.25;

      // Halo ambiental amplio
      const outerGlow = ctx.createRadialGradient(cx, cy, 0, cx, cy, 500);
      outerGlow.addColorStop(0, `rgba(${ACCENT}, ${0.10 * pulseIntensity})`);
      outerGlow.addColorStop(0.3, `rgba(${ACCENT}, ${0.05 * pulseIntensity})`);
      outerGlow.addColorStop(0.6, `rgba(${DEEP}, ${0.02 * pulseIntensity})`);
      outerGlow.addColorStop(1, 'transparent');
      ctx.fillStyle = outerGlow;
      ctx.fillRect(0, 0, w, h);

      // Anillos concéntricos rotando con segmentos
      for (let i = 0; i < 5; i++) {
        const baseRadius = 60 + i * 65;
        const radiusPulse = Math.sin(time * 0.001 + i * 0.5) * 10;
        const radius = baseRadius + radiusPulse;
        const opacity = (0.18 - i * 0.025) * pulseIntensity;
        const rotation = time * 0.00018 * (i % 2 === 0 ? 1 : -1);

        ctx.save();
        ctx.translate(cx, cy);
        ctx.rotate(rotation);

        const segments = 8 - i;
        const segmentAngle = (Math.PI * 2) / segments;
        const gapAngle = segmentAngle * 0.25;

        const color = i % 2 === 0 ? ACCENT : DEEP;
        ctx.strokeStyle = `rgba(${color}, ${opacity})`;
        ctx.lineWidth = 1.5 - i * 0.12;
        ctx.lineCap = 'round';

        for (let s = 0; s < segments; s++) {
          const startAngle = s * segmentAngle + gapAngle / 2;
          const endAngle = (s + 1) * segmentAngle - gapAngle / 2;
          ctx.beginPath();
          ctx.arc(0, 0, radius, startAngle, endAngle);
          ctx.stroke();
        }
        ctx.restore();
      }

      // Inner core glow — punto luminoso central
      const coreGlow = ctx.createRadialGradient(cx, cy, 0, cx, cy, 120);
      coreGlow.addColorStop(0, `rgba(${ACCENT}, ${0.22 * pulseIntensity})`);
      coreGlow.addColorStop(0.5, `rgba(${DEEP}, ${0.10 * pulseIntensity})`);
      coreGlow.addColorStop(1, 'transparent');
      ctx.fillStyle = coreGlow;
      ctx.beginPath();
      ctx.arc(cx, cy, 120, 0, Math.PI * 2);
      ctx.fill();

      // Bright point — el corazón de luz
      const brightPoint = ctx.createRadialGradient(cx, cy, 0, cx, cy, 30);
      brightPoint.addColorStop(0, `rgba(${ACCENT}, ${0.6 * pulseIntensity})`);
      brightPoint.addColorStop(0.5, `rgba(${ACCENT}, ${0.25 * pulseIntensity})`);
      brightPoint.addColorStop(1, 'transparent');
      ctx.fillStyle = brightPoint;
      ctx.beginPath();
      ctx.arc(cx, cy, 30, 0, Math.PI * 2);
      ctx.fill();
    };

    // Partículas orbitales y distantes
    const drawParticles = () => {
      const w = canvas.offsetWidth;
      const h = canvas.offsetHeight;
      const cx = w * FOCAL.x;
      const cy = h * FOCAL.y;

      // Orbitales — 25 partículas alrededor del punto focal
      for (let i = 0; i < 25; i++) {
        const orbitSpeed = 0.0002 + (i % 3) * 0.0001;
        const angle = (i / 25) * Math.PI * 2 + time * orbitSpeed;
        const orbitRadius = 100 + (i % 4) * 70;
        const radiusVariation = Math.sin(time * 0.001 + i) * 35;
        const radius = orbitRadius + radiusVariation;

        const x = cx + Math.cos(angle) * radius;
        const y = cy + Math.sin(angle) * radius * 0.55;
        const size = 1.5 + Math.sin(time * 0.002 + i * 0.5) * 1;
        const opacity = 0.45 + Math.sin(time * 0.001 + i) * 0.25;

        // Glow
        const glow = ctx.createRadialGradient(x, y, 0, x, y, size * 6);
        glow.addColorStop(0, `rgba(${ACCENT}, ${opacity * 0.85})`);
        glow.addColorStop(0.5, `rgba(${ACCENT}, ${opacity * 0.3})`);
        glow.addColorStop(1, 'transparent');
        ctx.fillStyle = glow;
        ctx.beginPath();
        ctx.arc(x, y, size * 6, 0, Math.PI * 2);
        ctx.fill();

        // Núcleo
        ctx.beginPath();
        ctx.arc(x, y, size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${ACCENT}, ${opacity})`;
        ctx.fill();
      }

      // Partículas distantes — drift por todo el canvas
      for (let i = 0; i < 20; i++) {
        const x = (w * 0.3) + Math.sin(time * 0.0003 + i * 2) * w * 0.45;
        const y = (h * 0.2) + Math.cos(time * 0.0002 + i * 1.5) * h * 0.6;
        const size = 1.2 + Math.sin(time * 0.001 + i) * 0.6;
        const opacity = 0.30 + Math.sin(time * 0.0015 + i) * 0.18;

        ctx.beginPath();
        ctx.arc(x, y, size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${DEEP}, ${opacity})`;
        ctx.fill();
      }
    };

    // Líneas radiales desde el centro
    const drawConnections = () => {
      const w = canvas.offsetWidth;
      const h = canvas.offsetHeight;
      const cx = w * FOCAL.x;
      const cy = h * FOCAL.y;

      for (let i = 0; i < 12; i++) {
        const angle = (i / 12) * Math.PI * 2 + time * 0.0001;
        const length = 220 + Math.sin(time * 0.0008 + i) * 60;
        const opacity = 0.10 + Math.sin(time * 0.001 + i * 0.3) * 0.05;

        const gradient = ctx.createLinearGradient(
          cx, cy,
          cx + Math.cos(angle) * length,
          cy + Math.sin(angle) * length * 0.5
        );
        gradient.addColorStop(0, `rgba(${DEEP}, ${opacity * 2})`);
        gradient.addColorStop(1, 'transparent');

        ctx.strokeStyle = gradient;
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(cx, cy);
        ctx.lineTo(
          cx + Math.cos(angle) * length,
          cy + Math.sin(angle) * length * 0.5
        );
        ctx.stroke();
      }
    };

    // Rayos de luz — más amplios y suaves
    const drawLightRays = () => {
      const w = canvas.offsetWidth;
      const h = canvas.offsetHeight;
      const cx = w * FOCAL.x;
      const cy = h * FOCAL.y;

      const rayCount = 8;
      for (let i = 0; i < rayCount; i++) {
        const angle = (i / rayCount) * Math.PI * 2 + time * 0.00008;
        const length = 500 + Math.sin(time * 0.0005 + i) * 120;
        const opacity = 0.045 + Math.sin(time * 0.001 + i * 0.5) * 0.025;

        ctx.save();
        ctx.translate(cx, cy);
        ctx.rotate(angle);

        const rayGradient = ctx.createLinearGradient(0, 0, length, 0);
        rayGradient.addColorStop(0, `rgba(${ACCENT}, ${opacity * 1.5})`);
        rayGradient.addColorStop(0.5, `rgba(${DEEP}, ${opacity})`);
        rayGradient.addColorStop(1, 'transparent');

        ctx.fillStyle = rayGradient;
        ctx.beginPath();
        ctx.moveTo(0, 0);
        ctx.lineTo(length, -20);
        ctx.lineTo(length, 20);
        ctx.closePath();
        ctx.fill();

        ctx.restore();
      }
    };

    const animate = () => {
      if (!paused) {
        time++;
        ctx.clearRect(0, 0, canvas.offsetWidth, canvas.offsetHeight);
        drawGrid();
        drawLightRays();
        drawFocalStructure();
        drawConnections();
        drawParticles();
      }
      animationFrameId = requestAnimationFrame(animate);
    };

    resizeCanvas();

    if (prefersReduced) {
      // Render estático único
      time = 100;
      ctx.clearRect(0, 0, canvas.offsetWidth, canvas.offsetHeight);
      drawGrid();
      drawLightRays();
      drawFocalStructure();
      drawConnections();
      drawParticles();
    } else {
      animate();
    }

    const onVis = () => { paused = document.hidden; };
    document.addEventListener('visibilitychange', onVis);

    const onResize = () => resizeCanvas();
    window.addEventListener('resize', onResize);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', onResize);
      document.removeEventListener('visibilitychange', onVis);
    };
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full"
        data-testid="abstract-visual-canvas"
      />
    </div>
  );
};

export default AbstractVisual;
