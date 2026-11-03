import React, { useEffect, useRef, useState } from 'react';
import { useTheme } from '../context/ThemeContext';

interface Node {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  alpha: number;
  pulseSpeed: number;
}

export const HeroIllustration: React.FC = () => {
  const { theme, animationsEnabled } = useTheme();
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [mouseOffset, setMouseOffset] = useState({ x: 0, y: 0 });

  const isDark = theme === 'dark';

  useEffect(() => {
    if (!animationsEnabled) return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let isVisible = true;
    let lastTime = 0;
    const targetFps = 30; // capped at 30fps as requested in dizayn.md
    const interval = 1000 / targetFps;

    // Resize canvas
    const updateSize = () => {
      const rect = canvas.getBoundingClientRect();
      const dpr = window.devicePixelRatio || 1;
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      ctx.scale(dpr, dpr);
    };
    updateSize();

    const rect = canvas.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;

    // Initialize <= 45 nodes for smooth 60fps performance on low-end laptops
    const nodeCount = 38;
    const nodes: Node[] = [];
    for (let i = 0; i < nodeCount; i++) {
      nodes.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.4,
        vy: (Math.random() - 0.5) * 0.4,
        radius: Math.random() * 2 + 1.5,
        alpha: Math.random() * 0.5 + 0.3,
        pulseSpeed: Math.random() * 0.02 + 0.01,
      });
    }

    // Visibility Observer
    const observer = new IntersectionObserver(([entry]) => {
      isVisible = entry.isIntersecting;
    });
    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    const handleVisibilityChange = () => {
      if (document.hidden) {
        isVisible = false;
      } else {
        isVisible = true;
      }
    };
    document.addEventListener('visibilitychange', handleVisibilityChange);

    // Animation Loop
    const render = (time: number) => {
      animationFrameId = requestAnimationFrame(render);
      if (!isVisible) return;

      const delta = time - lastTime;
      if (delta < interval) return;
      lastTime = time - (delta % interval);

      ctx.clearRect(0, 0, width, height);

      // Node connection distance
      const maxDist = 95;

      // Draw lines between nodes
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const dx = nodes[i].x - nodes[j].x;
          const dy = nodes[i].y - nodes[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < maxDist) {
            const lineAlpha = (1 - dist / maxDist) * 0.18;
            ctx.strokeStyle = isDark
              ? `rgba(34, 211, 197, ${lineAlpha})`
              : `rgba(14, 159, 148, ${lineAlpha})`;
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(nodes[i].x, nodes[i].y);
            ctx.lineTo(nodes[j].x, nodes[j].y);
            ctx.stroke();
          }
        }
      }

      // Draw and update nodes
      for (let i = 0; i < nodes.length; i++) {
        const n = nodes[i];
        n.x += n.vx;
        n.y += n.vy;

        if (n.x < 0 || n.x > width) n.vx *= -1;
        if (n.y < 0 || n.y > height) n.vy *= -1;

        n.alpha += Math.sin(time * n.pulseSpeed) * 0.01;
        const clampedAlpha = Math.max(0.2, Math.min(0.8, n.alpha));

        ctx.fillStyle = isDark
          ? `rgba(99, 102, 241, ${clampedAlpha})`
          : `rgba(79, 70, 229, ${clampedAlpha})`;
        ctx.beginPath();
        ctx.arc(n.x, n.y, n.radius, 0, Math.PI * 2);
        ctx.fill();
      }
    };

    animationFrameId = requestAnimationFrame(render);

    window.addEventListener('resize', updateSize);

    return () => {
      cancelAnimationFrame(animationFrameId);
      observer.disconnect();
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      window.removeEventListener('resize', updateSize);
    };
  }, [animationsEnabled, isDark]);

  // Parallax mouse handler (max 12px shift)
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!animationsEnabled) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 24; // max 12px
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * 24;
    setMouseOffset({
      x: Math.max(-12, Math.min(12, x)),
      y: Math.max(-12, Math.min(12, y)),
    });
  };

  const handleMouseLeave = () => {
    setMouseOffset({ x: 0, y: 0 });
  };

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative flex h-[340px] sm:h-[400px] w-full items-center justify-center overflow-hidden rounded-card select-none"
    >
      {/* Background Interactive Canvas */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 h-full w-full pointer-events-none"
      />

      {/* Floating Center Shield with Parallax Shift */}
      <div
        className="relative z-10 flex flex-col items-center justify-center transition-transform duration-200 ease-out"
        style={{
          transform: `translate3d(${mouseOffset.x}px, ${mouseOffset.y}px, 0)`,
        }}
      >
        {/* Softly Glowing Backdrop Aura */}
        <div className="absolute h-48 w-48 rounded-full bg-accent/20 blur-3xl pointer-events-none" />
        <div className="absolute h-36 w-36 rounded-full bg-accent-2/20 blur-2xl pointer-events-none" />

        {/* Central SVG Cyber Shield */}
        <div className="relative flex h-28 w-28 sm:h-32 sm:w-32 items-center justify-center rounded-2xl bg-surface/80 p-5 shadow-accent-glow backdrop-blur-md border border-accent/40">
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="h-16 w-16 text-accent drop-shadow"
          >
            <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
            <path d="m9 12 2 2 4-4" strokeWidth="2" />
          </svg>
        </div>

        {/* Badges / Tech Labels */}
        <div className="mt-4 flex items-center gap-2">
          <span className="rounded-chip bg-surface/90 px-3 py-1 font-mono text-[11px] font-semibold text-accent border border-border shadow-sm">
            CIA: Confidentiality • Integrity • Availability
          </span>
        </div>
      </div>
    </div>
  );
};

