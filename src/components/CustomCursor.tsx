import React, { useEffect, useRef, useState } from 'react';

interface TrailPoint {
  x: number;
  y: number;
  age: number;
}

/**
 * Cursor personalizado: una Λ pequeña crema que se agranda sobre
 * elementos interactivos y deja un rastro corto de trazo afilado.
 */
export const CustomCursor: React.FC = () => {
  const cursorRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [enabled, setEnabled] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const [isPressed, setIsPressed] = useState(false);

  useEffect(() => {
    const finePointer = window.matchMedia('(pointer: fine)').matches;
    const reducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches;

    if (!finePointer || reducedMotion) {
      return;
    }

    setEnabled(true);
    document.body.classList.add('mf-custom-cursor');

    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');
    const trail: TrailPoint[] = [];
    let mouseX = -100;
    let mouseY = -100;
    let rafId = 0;

    const handleResize = () => {
      if (!canvas) return;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      canvas.style.width = `${window.innerWidth}px`;
      canvas.style.height = `${window.innerHeight}px`;
      ctx?.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    handleResize();
    window.addEventListener('resize', handleResize);

    const onMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;

      if (cursorRef.current) {
        cursorRef.current.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0)`;
      }

      trail.push({ x: mouseX, y: mouseY, age: 0 });
      if (trail.length > 14) {
        trail.shift();
      }

      const target = e.target as HTMLElement | null;
      const interactive = Boolean(
        target?.closest(
          'a, button, input, textarea, [role="button"], [data-interactive="true"]'
        )
      );
      setIsHovering(interactive);
    };

    const onMouseDown = () => setIsPressed(true);
    const onMouseUp = () => setIsPressed(false);
    const onMouseLeave = () => {
      if (cursorRef.current) {
        cursorRef.current.style.transform = 'translate3d(-100px, -100px, 0)';
      }
      trail.length = 0;
    };

    const renderTrail = () => {
      if (ctx && canvas) {
        ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);

        for (let i = trail.length - 1; i >= 0; i--) {
          trail[i].age += 1;
          if (trail[i].age > 14) {
            trail.splice(i, 1);
          }
        }

        if (trail.length > 1) {
          for (let i = 1; i < trail.length; i++) {
            const p0 = trail[i - 1];
            const p1 = trail[i];
            const progress = i / trail.length;
            const life = Math.max(0, 1 - p1.age / 14);

            ctx.beginPath();
            ctx.moveTo(p0.x, p0.y);
            ctx.lineTo(p1.x, p1.y);
            ctx.strokeStyle = `rgba(255, 240, 212, ${(life * 0.72).toFixed(2)})`;
            ctx.lineWidth = Math.max(0.8, progress * 3.8 * life);
            ctx.lineCap = 'butt';
            ctx.stroke();
          }
        }
      }

      rafId = requestAnimationFrame(renderTrail);
    };

    window.addEventListener('mousemove', onMouseMove, { passive: true });
    window.addEventListener('mousedown', onMouseDown);
    window.addEventListener('mouseup', onMouseUp);
    document.addEventListener('mouseleave', onMouseLeave);
    rafId = requestAnimationFrame(renderTrail);

    return () => {
      document.body.classList.remove('mf-custom-cursor');
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mousedown', onMouseDown);
      window.removeEventListener('mouseup', onMouseUp);
      document.removeEventListener('mouseleave', onMouseLeave);
      cancelAnimationFrame(rafId);
    };
  }, []);

  if (!enabled) return null;

  const scale = isPressed ? 0.85 : isHovering ? 1.55 : 1;

  return (
    <>
      <canvas
        ref={canvasRef}
        aria-hidden="true"
        className="pointer-events-none fixed inset-0 z-50"
      />
      <div
        ref={cursorRef}
        aria-hidden="true"
        className="pointer-events-none fixed top-0 left-0 z-50 -translate-x-1/2 -translate-y-1/2 will-change-transform"
        style={{ transform: 'translate3d(-100px, -100px, 0)' }}
      >
        <svg
          viewBox="0 0 28 28"
          fill="none"
          className="w-6 h-6 transition-transform duration-150 ease-out"
          style={{
            transform: `translate(-50%, -50%) scale(${scale})`,
          }}
        >
          {/* Contorno negro sutil para garantizar visibilidad sobre crema, rojo y negro */}
          <path
            d="M3 24L11.5 3H16.5L25 24H19L14 10.5L9 24H3Z"
            fill="#FFF0D4"
            stroke="#0B0B0B"
            strokeWidth="1.5"
          />
        </svg>
      </div>
    </>
  );
};
