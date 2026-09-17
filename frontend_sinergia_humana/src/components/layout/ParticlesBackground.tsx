import { useEffect, useRef } from "react";

interface ParticlesBackgroundProps {
  density?: number;
  className?: string;
  speed?: number;
  linkDistance?: number;
}

interface Node {
  x: number;
  y: number;
  vx: number;
  vy: number;
  r: number;
}

export function ParticlesBackground({
  density = 60,
  className,
  speed = 1,
  linkDistance = 150,
}: ParticlesBackgroundProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let width = 0;
    let height = 0;
    let nodes: Node[] = [];
    let rafId: number;

    const LINE_RGB = "125, 211, 252";
    const DOT_RGB = "255, 255, 255";

    const resize = () => {
      const rect = canvas.parentElement?.getBoundingClientRect();
      width = rect?.width ?? window.innerWidth;
      height = rect?.height ?? window.innerHeight;
      canvas.width = width;
      canvas.height = height;
      const areaBased = Math.round((width * height) / 22000);
      const count = Math.max(16, Math.min(density, areaBased));
      nodes = Array.from({ length: count }).map(() => ({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.45 * speed,
        vy: (Math.random() - 0.5) * 0.45 * speed,
        r: Math.random() * 1.4 + 1,
      }));
    };

    const step = () => {
      ctx.clearRect(0, 0, width, height);

      for (const n of nodes) {
        n.x += n.vx;
        n.y += n.vy;
        if (n.x < 0 || n.x > width) n.vx *= -1;
        if (n.y < 0 || n.y > height) n.vy *= -1;
      }

      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const a = nodes[i];
          const b = nodes[j];
          const dist = Math.hypot(a.x - b.x, a.y - b.y);
          if (dist < linkDistance) {
            ctx.strokeStyle = `rgba(${LINE_RGB}, ${0.22 * (1 - dist / linkDistance)})`;
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.stroke();
          }
        }
      }

      for (const n of nodes) {
        ctx.shadowColor = `rgba(${DOT_RGB}, 0.9)`;
        ctx.shadowBlur = 8;
        ctx.fillStyle = `rgba(${DOT_RGB}, 0.9)`;
        ctx.beginPath();
        ctx.arc(n.x, n.y, n.r, 0, Math.PI * 2);
        ctx.fill();
        ctx.shadowBlur = 0;
      }

      rafId = requestAnimationFrame(step);
    };

    resize();
    step();
    window.addEventListener("resize", resize);
    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener("resize", resize);
    };
  }, [density, speed, linkDistance]);

  return <canvas ref={canvasRef} className={className} aria-hidden />;
}
