import React, { useEffect, useRef, useState } from 'react';

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  alpha: number;
  glowColor: string;
}

interface ParticleBackgroundProps {
  coverUrl: string;
  themeColor: 'cyan' | 'blue' | 'green' | 'purple';
}

export default function ParticleBackground({ coverUrl, themeColor }: ParticleBackgroundProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mousePosRef = useRef({ x: 0, y: 0 });

  // Handle Mouse Move for Parallax
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      // Calculate normalized position from center (-0.5 to 0.5)
      const x = (e.clientX / window.innerWidth) - 0.5;
      const y = (e.clientY / window.innerHeight) - 0.5;
      mousePosRef.current = { x, y };
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  // Canvas Particle System
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let particles: Particle[] = [];
    const particleCount = 15;

    const getThemeColorString = () => {
      switch (themeColor) {
        case 'blue': return '59, 130, 246';
        case 'green': return '34, 197, 94';
        case 'purple': return '168, 85, 247';
        default: return '6, 182, 212'; // cyan
      }
    };

    const resizeCanvas = () => {
      if (canvas) {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
      }
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Initialize particles
    particles = [];
    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.4,
        vy: (Math.random() - 0.5) * 0.4 - 0.2, // Drift slightly upwards
        size: Math.random() * 2.5 + 0.5,
        alpha: Math.random() * 0.5 + 0.1,
        glowColor: Math.random() > 0.4 ? getThemeColorString() : '255, 255, 255',
      });
    }

    const draw = () => {
      const mX = mousePosRef.current.x;
      const mY = mousePosRef.current.y;

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Draw Energy Aura (soft light glows in background)
      const gradient = ctx.createRadialGradient(
        canvas.width * 0.5 + mX * 50,
        canvas.height * 0.3 + mY * 50,
        10,
        canvas.width * 0.5,
        canvas.height * 0.5,
        Math.max(canvas.width, canvas.height) * 0.6
      );
      const mainColor = getThemeColorString();
      gradient.addColorStop(0, `rgba(${mainColor}, 0.08)`);
      gradient.addColorStop(0.5, `rgba(${mainColor}, 0.03)`);
      gradient.addColorStop(1, 'rgba(0, 0, 0, 0)');
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Draw particles
      particles.forEach((p) => {
        p.x += p.vx + mX * 0.2; // slight mouse push
        p.y += p.vy + mY * 0.2;

        // Wrap around borders
        if (p.x < 0) p.x = canvas.width;
        if (p.x > canvas.width) p.x = 0;
        if (p.y < 0) p.y = canvas.height;
        if (p.y > canvas.height) p.y = canvas.height;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${p.glowColor}, ${p.alpha})`;

        // Glow effect
        ctx.shadowBlur = p.size * 3;
        ctx.shadowColor = `rgba(${p.glowColor}, ${p.alpha})`;
        ctx.fill();

        // Connect near particles with faint cyber lines
        particles.forEach((p2) => {
          const dx = p.x - p2.x;
          const dy = p.y - p2.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 100) {
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);
            // Cyber mesh line alpha
            const lineAlpha = (1 - dist / 110) * 0.05 * p.alpha;
            ctx.strokeStyle = `rgba(${mainColor}, ${lineAlpha})`;
            ctx.lineWidth = 0.5;
            ctx.shadowBlur = 0;
            ctx.stroke();
          }
        });
      });

      // Clear shadows for performance
      ctx.shadowBlur = 0;

      // Draw subtle top cinematic flare
      const flareGrad = ctx.createLinearGradient(0, 0, 0, 300);
      flareGrad.addColorStop(0, `rgba(${mainColor}, 0.12)`);
      flareGrad.addColorStop(1, 'rgba(0, 0, 0, 0)');
      ctx.fillStyle = flareGrad;
      ctx.fillRect(0, 0, canvas.width, 300);

      animationFrameId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      cancelAnimationFrame(animationFrameId);
    };
  }, [themeColor]);

  return (
    <div className="fixed inset-0 w-full h-full overflow-hidden -z-50 bg-[#020512]">
      {/* 
        LAYER 1: Static cover image with maximum blur(20px) and 0.25 opacity.
        - No animations (slowZoom is disabled) to prioritize high visual performance. 
      */}
      <div
        className="absolute inset-0 w-full h-full opacity-25 bg-cover bg-center"
        style={{
          backgroundImage: `url(${coverUrl})`,
          filter: 'blur(20px) brightness(0.4)',
        }}
        referrerPolicy="no-referrer"
      />

      {/* LAYER 2: Single consolidated gradient background overlay layer to prevent rendering/flickering issues */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#020512] via-[#020512]/92 to-[#01040f]/75" />

      {/* LAYER 3: Interactive Canvas (with precise 0.25 opacity) */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full pointer-events-none opacity-25"
      />
    </div>
  );
}
