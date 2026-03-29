import React, { useEffect, useRef } from 'react';

interface Particle {
  x: number;
  y: number;
  alpha: number;
  size: number;
  vx: number;
  vy: number;
  color: string;
}

const COLORS = [
  'rgba(129, 140, 248,',  // indigo
  'rgba(167, 139, 250,',  // purple
  'rgba(196, 181, 253,',  // light purple
  'rgba(99, 102, 241,',   // deeper indigo
];

const CursorTrail: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particles = useRef<Particle[]>([]);
  const mouse = useRef({ x: 0, y: 0 });
  const animFrameRef = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    const onMouseMove = (e: MouseEvent) => {
      mouse.current = { x: e.clientX, y: e.clientY };
      // Spawn 3–5 particles per move
      const count = Math.floor(Math.random() * 3) + 2;
      for (let i = 0; i < count; i++) {
        particles.current.push({
          x: e.clientX + (Math.random() - 0.5) * 6,
          y: e.clientY + (Math.random() - 0.5) * 6,
          alpha: 1,
          size: Math.random() * 5 + 2,
          vx: (Math.random() - 0.5) * 1.5,
          vy: (Math.random() - 0.5) * 1.5 - 0.5,
          color: COLORS[Math.floor(Math.random() * COLORS.length)],
        });
      }
      // Cap particles
      if (particles.current.length > 200) {
        particles.current.splice(0, particles.current.length - 200);
      }
    };

    window.addEventListener('mousemove', onMouseMove);

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.current = particles.current.filter(p => p.alpha > 0.02);

      for (const p of particles.current) {
        p.x += p.vx;
        p.y += p.vy;
        p.alpha *= 0.92;
        p.size *= 0.97;

        ctx.beginPath();
        const gradient = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.size);
        gradient.addColorStop(0, `${p.color}${p.alpha})`);
        gradient.addColorStop(1, `${p.color}0)`);
        ctx.fillStyle = gradient;
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();
      }

      animFrameRef.current = requestAnimationFrame(animate);
    };
    animate();

    return () => {
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', onMouseMove);
      cancelAnimationFrame(animFrameRef.current);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        pointerEvents: 'none',
        zIndex: 9999,
      }}
    />
  );
};

export default CursorTrail;
