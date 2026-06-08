'use client';

import { useEffect, useRef } from 'react';

export const AbstractVisual = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let animationFrameId;
    let time = 0;

    const resizeCanvas = () => {
      const dpr = window.devicePixelRatio || 1;
      canvas.width = canvas.offsetWidth * dpr;
      canvas.height = canvas.offsetHeight * dpr;
      ctx.scale(dpr, dpr);
    };

    // Draw elegant grid structure
    const drawGrid = () => {
      const w = canvas.offsetWidth;
      const h = canvas.offsetHeight;
      const gridSize = 80;
      const offset = time * 0.015;
      
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.025)';
      ctx.lineWidth = 0.5;
      
      // Vertical lines with subtle wave
      for (let x = -gridSize; x < w + gridSize; x += gridSize) {
        ctx.beginPath();
        ctx.moveTo(x + Math.sin(offset) * 10, 0);
        ctx.lineTo(x + Math.sin(offset + 2) * 10, h);
        ctx.stroke();
      }
      
      // Horizontal lines
      for (let y = -gridSize; y < h + gridSize; y += gridSize) {
        ctx.beginPath();
        ctx.moveTo(0, y + Math.cos(offset * 0.7) * 5);
        ctx.lineTo(w, y + Math.cos(offset * 0.7 + 1) * 5);
        ctx.stroke();
      }
    };

    // Draw central focal structure - enhanced
    const drawFocalStructure = () => {
      const w = canvas.offsetWidth;
      const h = canvas.offsetHeight;
      const cx = w * 0.65;
      const cy = h * 0.48;
      
      // Pulsing outer glow
      const pulseIntensity = 0.6 + Math.sin(time * 0.002) * 0.25;
      
      // Large ambient glow - more visible
      const outerGlow = ctx.createRadialGradient(cx, cy, 0, cx, cy, 500);
      outerGlow.addColorStop(0, `rgba(90, 123, 250, ${0.15 * pulseIntensity})`);
      outerGlow.addColorStop(0.3, `rgba(122, 196, 224, ${0.08 * pulseIntensity})`);
      outerGlow.addColorStop(0.6, `rgba(90, 123, 250, ${0.04 * pulseIntensity})`);
      outerGlow.addColorStop(1, 'transparent');
      ctx.fillStyle = outerGlow;
      ctx.fillRect(0, 0, w, h);
      
      // Concentric rings - more dynamic and visible
      for (let i = 0; i < 5; i++) {
        const baseRadius = 60 + i * 65;
        const radiusPulse = Math.sin(time * 0.001 + i * 0.5) * 10;
        const radius = baseRadius + radiusPulse;
        const opacity = (0.12 - i * 0.018) * pulseIntensity;
        const rotation = time * 0.00018 * (i % 2 === 0 ? 1 : -1);
        
        ctx.save();
        ctx.translate(cx, cy);
        ctx.rotate(rotation);
        
        // Draw ring segments
        const segments = 8 - i;
        const segmentAngle = (Math.PI * 2) / segments;
        const gapAngle = segmentAngle * 0.25;
        
        const gradient = i % 2 === 0 ? 
          `rgba(90, 123, 250, ${opacity})` : 
          `rgba(122, 196, 224, ${opacity})`;
        
        ctx.strokeStyle = gradient;
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
      
      // Inner core glow - brighter
      const coreGlow = ctx.createRadialGradient(cx, cy, 0, cx, cy, 120);
      coreGlow.addColorStop(0, `rgba(122, 196, 224, ${0.2 * pulseIntensity})`);
      coreGlow.addColorStop(0.5, `rgba(90, 123, 250, ${0.1 * pulseIntensity})`);
      coreGlow.addColorStop(1, 'transparent');
      ctx.fillStyle = coreGlow;
      ctx.beginPath();
      ctx.arc(cx, cy, 120, 0, Math.PI * 2);
      ctx.fill();
      
      // Central bright point - more visible
      const brightPoint = ctx.createRadialGradient(cx, cy, 0, cx, cy, 30);
      brightPoint.addColorStop(0, `rgba(255, 255, 255, ${0.25 * pulseIntensity})`);
      brightPoint.addColorStop(0.5, `rgba(122, 196, 224, ${0.18 * pulseIntensity})`);
      brightPoint.addColorStop(1, 'transparent');
      ctx.fillStyle = brightPoint;
      ctx.beginPath();
      ctx.arc(cx, cy, 30, 0, Math.PI * 2);
      ctx.fill();
    };

    // Draw floating particles - enhanced
    const drawParticles = () => {
      const w = canvas.offsetWidth;
      const h = canvas.offsetHeight;
      const cx = w * 0.65;
      const cy = h * 0.48;
      
      // Orbital particles - more visible
      for (let i = 0; i < 25; i++) {
        const orbitSpeed = 0.0002 + (i % 3) * 0.0001;
        const angle = (i / 25) * Math.PI * 2 + time * orbitSpeed;
        const orbitRadius = 100 + (i % 4) * 70;
        const radiusVariation = Math.sin(time * 0.001 + i) * 35;
        const radius = orbitRadius + radiusVariation;
        
        const x = cx + Math.cos(angle) * radius;
        const y = cy + Math.sin(angle) * radius * 0.55;
        const size = 1.5 + Math.sin(time * 0.002 + i * 0.5) * 1;
        const opacity = 0.35 + Math.sin(time * 0.001 + i) * 0.2;
        
        // Particle glow - larger
        const particleGlow = ctx.createRadialGradient(x, y, 0, x, y, size * 6);
        particleGlow.addColorStop(0, `rgba(122, 196, 224, ${opacity})`);
        particleGlow.addColorStop(0.5, `rgba(122, 196, 224, ${opacity * 0.4})`);
        particleGlow.addColorStop(1, 'transparent');
        ctx.fillStyle = particleGlow;
        ctx.beginPath();
        ctx.arc(x, y, size * 6, 0, Math.PI * 2);
        ctx.fill();
        
        // Particle core - brighter
        ctx.beginPath();
        ctx.arc(x, y, size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${opacity})`;
        ctx.fill();
      }
      
      // Distant floating particles - more visible
      for (let i = 0; i < 20; i++) {
        const x = (w * 0.3) + Math.sin(time * 0.0003 + i * 2) * w * 0.45;
        const y = (h * 0.2) + Math.cos(time * 0.0002 + i * 1.5) * h * 0.6;
        const size = 1.2 + Math.sin(time * 0.001 + i) * 0.6;
        const opacity = 0.2 + Math.sin(time * 0.0015 + i) * 0.12;
        
        ctx.beginPath();
        ctx.arc(x, y, size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(90, 123, 250, ${opacity})`;
        ctx.fill();
      }
    };

    // Draw connection lines - enhanced
    const drawConnections = () => {
      const w = canvas.offsetWidth;
      const h = canvas.offsetHeight;
      const cx = w * 0.65;
      const cy = h * 0.48;
      
      // Radial lines from center - more visible
      for (let i = 0; i < 12; i++) {
        const angle = (i / 12) * Math.PI * 2 + time * 0.0001;
        const length = 220 + Math.sin(time * 0.0008 + i) * 60;
        const opacity = 0.06 + Math.sin(time * 0.001 + i * 0.3) * 0.03;
        
        const gradient = ctx.createLinearGradient(
          cx, cy,
          cx + Math.cos(angle) * length,
          cy + Math.sin(angle) * length * 0.5
        );
        gradient.addColorStop(0, `rgba(90, 123, 250, ${opacity * 2.5})`);
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
    
    // Draw light rays - more visible
    const drawLightRays = () => {
      const w = canvas.offsetWidth;
      const h = canvas.offsetHeight;
      const cx = w * 0.65;
      const cy = h * 0.48;
      
      const rayCount = 8;
      for (let i = 0; i < rayCount; i++) {
        const angle = (i / rayCount) * Math.PI * 2 + time * 0.00008;
        const length = 500 + Math.sin(time * 0.0005 + i) * 120;
        const opacity = 0.025 + Math.sin(time * 0.001 + i * 0.5) * 0.015;
        
        ctx.save();
        ctx.translate(cx, cy);
        ctx.rotate(angle);
        
        const rayGradient = ctx.createLinearGradient(0, 0, length, 0);
        rayGradient.addColorStop(0, `rgba(122, 196, 224, ${opacity * 1.5})`);
        rayGradient.addColorStop(0.5, `rgba(90, 123, 250, ${opacity})`);
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
      time++;
      ctx.clearRect(0, 0, canvas.offsetWidth, canvas.offsetHeight);
      
      drawGrid();
      drawLightRays();
      drawFocalStructure();
      drawConnections();
      drawParticles();
      
      animationFrameId = requestAnimationFrame(animate);
    };

    resizeCanvas();
    animate();

    window.addEventListener('resize', resizeCanvas);
    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', resizeCanvas);
    };
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden">
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full"
        data-testid="abstract-visual-canvas"
      />
    </div>
  );
};

export default AbstractVisual;
