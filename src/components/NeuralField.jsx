'use client';

import { useEffect, useRef } from 'react';

/**
 * NeuralField — Campo neuronal procedural inspirado en la marca Cardinal.
 *
 * Concepto: el glifo Swaraya (4 cardinales + dot indigo + diagonal NE) actúa
 * como una "constelación fantasma" anclada en el cuadrante superior derecho
 * del hero. El dot indigo es la fuente de luz pulsante de donde nacen la
 * mayoría de las partículas. Otras partículas brotan a lo largo de las líneas
 * cardinales y otras pocas son ambientales.
 *
 * Cuando dos partículas están cerca entre sí, se conectan con líneas indigo
 * de opacidad proporcional a su distancia — el efecto neuronal.
 *
 * No lleva dependencias externas. Canvas 2D, dpr-aware, pausa cuando la
 * pestaña no es visible, y respeta `prefers-reduced-motion`.
 */
export default function NeuralField({
  // Tamaño relativo del glifo en el hero (0..1 sobre el alto)
  glyphSizeRatio = 0.28,
  // Posición del centro del glifo (0..1 sobre ancho/alto)
  glyphCenter = { x: 0.74, y: 0.42 },
  // Máximo de partículas vivas a la vez
  maxParticles = 140,
  // Distancia máxima para dibujar una conexión neuronal (px)
  connectDistance = 130,
  // Acento indigo de la marca
  accent = '#5468D6',
  accentDeep = '#2C3E80',
}) {
  const canvasRef = useRef(null);
  const containerRef = useRef(null);
  const stateRef = useRef({
    particles: [],
    width: 0,
    height: 0,
    dpr: 1,
    glyph: null,
    time: 0,
    raf: 0,
    paused: false,
  });

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const ctx = canvas.getContext('2d', { alpha: true });
    const state = stateRef.current;

    // Respeta reduced-motion: una sola pasada estática
    const prefersReduced =
      typeof window !== 'undefined' &&
      window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;

    /* ----------------------------- GEOMETRÍA ----------------------------- */
    /**
     * Reconstruye la geometría del glifo Cardinal a partir del viewBox 48x48
     * del componente SwarayaCardinal.jsx, escalado y posicionado dentro del
     * canvas. Devuelve segmentos en coordenadas de canvas (px).
     */
    function rebuildGlyph(w, h) {
      const size = Math.min(w, h) * glyphSizeRatio;
      const cx = w * glyphCenter.x;
      const cy = h * glyphCenter.y;
      const s = size / 48; // factor de escala del viewBox a px
      const mapX = (x) => cx + (x - 24) * s;
      const mapY = (y) => cy + (y - 24) * s;

      const segments = [
        // N
        { x1: mapX(24), y1: mapY(3), x2: mapX(24), y2: mapY(16), color: 'sumi' },
        // S
        { x1: mapX(24), y1: mapY(32), x2: mapX(24), y2: mapY(45), color: 'sumi' },
        // E
        { x1: mapX(32), y1: mapY(24), x2: mapX(45), y2: mapY(24), color: 'sumi' },
        // W
        { x1: mapX(3), y1: mapY(24), x2: mapX(16), y2: mapY(24), color: 'sumi' },
        // NE diagonal — firma indigo
        { x1: mapX(32), y1: mapY(16), x2: mapX(45), y2: mapY(3), color: 'accent' },
      ];

      return {
        cx,
        cy,
        size,
        scale: s,
        dotRadius: 2.6 * s,
        segments,
      };
    }

    /* ----------------------------- RESIZE ------------------------------- */
    function resize() {
      const rect = container.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      state.width = rect.width;
      state.height = rect.height;
      state.dpr = dpr;
      canvas.width = Math.round(rect.width * dpr);
      canvas.height = Math.round(rect.height * dpr);
      canvas.style.width = `${rect.width}px`;
      canvas.style.height = `${rect.height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      state.glyph = rebuildGlyph(rect.width, rect.height);
    }
    resize();

    const resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(container);

    /* ----------------------------- PARTÍCULAS ---------------------------- */
    /** Devuelve un punto aleatorio sobre un segmento. */
    function pointOnSegment(seg) {
      const t = Math.random();
      return {
        x: seg.x1 + (seg.x2 - seg.x1) * t,
        y: seg.y1 + (seg.y2 - seg.y1) * t,
      };
    }

    /**
     * Crea una partícula. Distribución de origen:
     *  - 60% nace del dot central indigo (la fuente)
     *  - 28% brota de una línea del glifo aleatoria
     *  - 12% partícula ambiental (todo el canvas)
     */
    function spawnParticle() {
      const g = state.glyph;
      const r = Math.random();
      let x;
      let y;
      let originType;
      let speedFactor;

      if (r < 0.45) {
        // Nacimiento desde el dot — irradiar con dirección preferentemente
        // outward (hacia afuera de la marca). Velocidad inicial mayor para
        // que las partículas se dispersen rápido y no se aglomeren.
        const ang = Math.random() * Math.PI * 2;
        const jitter = Math.random() * (g.dotRadius * 0.4);
        x = g.cx + Math.cos(ang) * jitter;
        y = g.cy + Math.sin(ang) * jitter;
        originType = 'dot';
        speedFactor = 1.6;
      } else if (r < 0.78) {
        const seg = g.segments[Math.floor(Math.random() * g.segments.length)];
        const p = pointOnSegment(seg);
        x = p.x;
        y = p.y;
        originType = 'line';
        speedFactor = 0.9;
      } else {
        x = Math.random() * state.width;
        y = Math.random() * state.height;
        originType = 'ambient';
        speedFactor = 0.5;
      }

      // Velocidad: dirección hacia afuera de la marca + ruido sinusoidal
      const dx = x - g.cx;
      const dy = y - g.cy;
      const len = Math.hypot(dx, dy) || 1;
      const baseSpeed = (0.18 + Math.random() * 0.32) * speedFactor;
      // Las ambientales no irradian desde el centro: van por su propio camino
      const ux = originType === 'ambient' ? Math.random() - 0.5 : dx / len;
      const uy = originType === 'ambient' ? Math.random() - 0.5 : dy / len;

      return {
        x,
        y,
        vx: ux * baseSpeed + (Math.random() - 0.5) * 0.08,
        vy: uy * baseSpeed + (Math.random() - 0.5) * 0.08,
        life: 0,
        maxLife: 5500 + Math.random() * 4500, // 5.5s a 10s
        originType,
        baseRadius: originType === 'dot' ? 1.1 : 0.9,
        // Cada partícula tiene su propia frecuencia para "respirar"
        phase: Math.random() * Math.PI * 2,
        freq: 0.0009 + Math.random() * 0.0012,
      };
    }

    /* ----------------------------- RENDER ------------------------------- */
    function drawGhostGlyph() {
      const g = state.glyph;
      if (!g) return;

      // Trazo sumi MUY sutil — la marca como "fantasma" que se intuye más
      // que se ve. Más fina y más transparente para no competir con el headline.
      ctx.lineCap = 'round';
      ctx.lineWidth = 1.8 * g.scale;
      ctx.strokeStyle = 'rgba(14,15,17,0.045)';
      for (const seg of g.segments) {
        if (seg.color === 'sumi') {
          ctx.beginPath();
          ctx.moveTo(seg.x1, seg.y1);
          ctx.lineTo(seg.x2, seg.y2);
          ctx.stroke();
        }
      }
      // Diagonal NE en accent indigo, muy sutil
      ctx.lineWidth = 1.8 * 1.15 * g.scale;
      ctx.strokeStyle = `${accent}1f`; // ~12%
      for (const seg of g.segments) {
        if (seg.color === 'accent') {
          ctx.beginPath();
          ctx.moveTo(seg.x1, seg.y1);
          ctx.lineTo(seg.x2, seg.y2);
          ctx.stroke();
        }
      }

      // Dot central — pulsa con intensidad moderada (no sobre-expone)
      const t = state.time;
      const pulse = 0.5 + Math.sin(t * 0.0012) * 0.5; // 0..1
      const pulseRadius = g.dotRadius * (1.2 + pulse * 0.8);
      const haloRadius = g.dotRadius * (4.5 + pulse * 2.5);

      // Halo radial sutil
      const halo = ctx.createRadialGradient(g.cx, g.cy, 0, g.cx, g.cy, haloRadius);
      halo.addColorStop(0, `${accent}33`);
      halo.addColorStop(0.5, `${accent}10`);
      halo.addColorStop(1, `${accent}00`);
      ctx.fillStyle = halo;
      ctx.beginPath();
      ctx.arc(g.cx, g.cy, haloRadius, 0, Math.PI * 2);
      ctx.fill();

      // Núcleo brillante — más contenido para no abrumar
      const core = ctx.createRadialGradient(g.cx, g.cy, 0, g.cx, g.cy, pulseRadius);
      core.addColorStop(0, accent);
      core.addColorStop(0.7, `${accent}aa`);
      core.addColorStop(1, `${accent}00`);
      ctx.fillStyle = core;
      ctx.beginPath();
      ctx.arc(g.cx, g.cy, pulseRadius, 0, Math.PI * 2);
      ctx.fill();
    }

    function drawConnections() {
      const ps = state.particles;
      const maxD = connectDistance;
      const maxD2 = maxD * maxD;
      ctx.lineWidth = 0.6;
      for (let i = 0; i < ps.length; i++) {
        const a = ps[i];
        for (let j = i + 1; j < ps.length; j++) {
          const b = ps[j];
          const dx = a.x - b.x;
          const dy = a.y - b.y;
          const d2 = dx * dx + dy * dy;
          if (d2 < maxD2) {
            const d = Math.sqrt(d2);
            const t = 1 - d / maxD;
            // Atenuamos también por edad — partículas en su prime conectan más
            const ageA = 1 - Math.abs(a.life / a.maxLife - 0.5) * 2;
            const ageB = 1 - Math.abs(b.life / b.maxLife - 0.5) * 2;
            const alpha = t * t * t * 0.28 * Math.min(ageA, ageB);
            if (alpha < 0.012) continue;
            ctx.strokeStyle = `rgba(84,104,214,${alpha.toFixed(3)})`;
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.stroke();
          }
        }
      }
    }

    function drawParticles() {
      const ps = state.particles;
      for (const p of ps) {
        const lifeRatio = p.life / p.maxLife;
        // Fade in al principio, fade out al final
        const fade =
          lifeRatio < 0.15
            ? lifeRatio / 0.15
            : lifeRatio > 0.85
              ? (1 - lifeRatio) / 0.15
              : 1;
        const breathe = 0.85 + Math.sin(state.time * p.freq + p.phase) * 0.15;
        const r = p.baseRadius * breathe;
        const alpha = fade * 0.85;
        if (alpha < 0.02) continue;

        // Indigo brillante para las nacidas del dot, indigo medio para resto
        const color =
          p.originType === 'dot' ? accent : p.originType === 'line' ? accent : accentDeep;
        ctx.fillStyle = `rgba(${hexToRgb(color)},${alpha.toFixed(3)})`;
        ctx.beginPath();
        ctx.arc(p.x, p.y, r, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    /* ----------------------------- TICK ---------------------------------- */
    let lastT = performance.now();

    function tick(now) {
      if (state.paused) {
        state.raf = requestAnimationFrame(tick);
        return;
      }
      const dt = Math.min(now - lastT, 50); // cap delta
      lastT = now;
      state.time += dt;

      // Aclarado del canvas con un velo cream — más opaco para que las
      // partículas no dejen estela acumulativa.
      ctx.fillStyle = 'rgba(245,242,236,0.55)';
      ctx.fillRect(0, 0, state.width, state.height);

      // Si las dimensiones son inválidas (mobile sin medir), bail.
      if (state.width === 0 || state.height === 0) {
        state.raf = requestAnimationFrame(tick);
        return;
      }

      // Spawn nuevas partículas hasta llenar — lento y constante
      const deficit = maxParticles - state.particles.length;
      const spawnCount = Math.min(deficit, 2);
      for (let i = 0; i < spawnCount; i++) {
        state.particles.push(spawnParticle());
      }

      // Update + cull
      const next = [];
      for (const p of state.particles) {
        p.life += dt;
        if (p.life >= p.maxLife) continue;
        // Ruido sinusoidal sutil para movimiento orgánico
        const wob = Math.sin(state.time * 0.0008 + p.phase) * 0.04;
        p.x += p.vx + wob * Math.cos(p.phase);
        p.y += p.vy + wob * Math.sin(p.phase);
        // Cull si salen demasiado del canvas
        const margin = 80;
        if (
          p.x < -margin ||
          p.x > state.width + margin ||
          p.y < -margin ||
          p.y > state.height + margin
        ) {
          continue;
        }
        next.push(p);
      }
      state.particles = next;

      drawGhostGlyph();
      drawConnections();
      drawParticles();

      state.raf = requestAnimationFrame(tick);
    }

    if (prefersReduced) {
      // Una sola pasada estática: spawnea, simula 1.5s y se queda fijo
      for (let i = 0; i < maxParticles; i++) state.particles.push(spawnParticle());
      ctx.fillStyle = '#F5F2EC';
      ctx.fillRect(0, 0, state.width, state.height);
      drawGhostGlyph();
      drawConnections();
      drawParticles();
    } else {
      state.raf = requestAnimationFrame(tick);
    }

    // Pausa cuando la pestaña no es visible
    function onVisChange() {
      state.paused = document.hidden;
      if (!state.paused) lastT = performance.now();
    }
    document.addEventListener('visibilitychange', onVisChange);

    return () => {
      cancelAnimationFrame(state.raf);
      resizeObserver.disconnect();
      document.removeEventListener('visibilitychange', onVisChange);
    };
  }, [maxParticles, connectDistance, accent, accentDeep, glyphSizeRatio, glyphCenter.x, glyphCenter.y]);

  return (
    <div
      ref={containerRef}
      aria-hidden="true"
      className="absolute inset-0 pointer-events-none"
      data-testid="neural-field"
    >
      <canvas ref={canvasRef} style={{ width: '100%', height: '100%', display: 'block' }} />
    </div>
  );
}

/** Convierte #RRGGBB a "r,g,b" para usar en rgba(). */
function hexToRgb(hex) {
  const h = hex.replace('#', '');
  const r = parseInt(h.substring(0, 2), 16);
  const g = parseInt(h.substring(2, 4), 16);
  const b = parseInt(h.substring(4, 6), 16);
  return `${r},${g},${b}`;
}
