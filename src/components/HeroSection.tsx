import React, { useCallback, useEffect, useRef, useState } from 'react';
import { LambdaMark, MalaFamaLogo } from './BrandMarks';

interface HeroSectionProps {
  onScrollDown: () => void;
}

interface Point {
  x: number;
  y: number;
  t: number;
}

/**
 * 1. HERO (Pantalla completa, fondo rojo #FF1A17)
 * Logo enorme en negro + canvas interactivo de trazo seco crema (#FFF0D4)
 * + auto-demostración a los 4 segundos si no hay interacción.
 */
export const HeroSection: React.FC<HeroSectionProps> = ({ onScrollDown }) => {
  const stageRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const logoWrapRef = useRef<HTMLDivElement>(null);

  const [hasDrawn, setHasDrawn] = useState(false);
  const [showQueHablen, setShowQueHablen] = useState(false);
  const [isDrawing, setIsDrawing] = useState(false);

  const isDrawingRef = useRef(false);
  const hasInteractedRef = useRef(false);
  const lastPointRef = useRef<Point | null>(null);
  const strokePointsRef = useRef<Point[]>([]);
  const demoRafRef = useRef<number | null>(null);

  const resizeCanvas = useCallback(() => {
    const canvas = canvasRef.current;
    const stage = stageRef.current;
    if (!canvas || !stage) return;

    const rect = stage.getBoundingClientRect();
    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    // Preservar dibujo existente al redimensionar si ya había trazo
    const temp = document.createElement('canvas');
    temp.width = canvas.width;
    temp.height = canvas.height;
    const tempCtx = temp.getContext('2d');
    if (tempCtx && canvas.width > 0 && canvas.height > 0) {
      tempCtx.drawImage(canvas, 0, 0);
    }

    canvas.width = Math.max(1, Math.floor(rect.width * dpr));
    canvas.height = Math.max(1, Math.floor(rect.height * dpr));
    canvas.style.width = `${rect.width}px`;
    canvas.style.height = `${rect.height}px`;

    const ctx = canvas.getContext('2d');
    if (ctx) {
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      if (temp.width > 0 && temp.height > 0) {
        ctx.drawImage(temp, 0, 0, rect.width, rect.height);
      }
    }
  }, []);

  useEffect(() => {
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);
    return () => window.removeEventListener('resize', resizeCanvas);
  }, [resizeCanvas]);

  /**
   * Dibuja un segmento de pincel seco con bordes irregulares y punta afilada en crema #FFF0D4.
   */
  const drawDryBrushSegment = useCallback(
    (
      ctx: CanvasRenderingContext2D,
      p0: Point,
      p1: Point,
      baseWidth: number,
      seedOffset = 0
    ) => {
      const dx = p1.x - p0.x;
      const dy = p1.y - p0.y;
      const dist = Math.hypot(dx, dy);
      if (dist < 0.5) return;

      const angle = Math.atan2(dy, dx);
      const perpX = -Math.sin(angle);
      const perpY = Math.cos(angle);
      const steps = Math.max(2, Math.ceil(dist / 2.2));

      ctx.fillStyle = '#FFF0D4';

      for (let i = 0; i <= steps; i++) {
        const u = i / steps;
        const cx = p0.x + dx * u;
        const cy = p0.y + dy * u;

        // Núcleo del trazo
        const coreW = baseWidth * (0.62 + 0.14 * Math.sin(u * Math.PI + seedOffset));
        ctx.beginPath();
        ctx.moveTo(cx + perpX * coreW, cy + perpY * coreW);
        ctx.lineTo(cx - perpX * coreW, cy - perpY * coreW);
        ctx.lineTo(cx + Math.cos(angle) * 3.5 - perpX * coreW * 0.7, cy + Math.sin(angle) * 3.5 - perpY * coreW * 0.7);
        ctx.lineTo(cx + Math.cos(angle) * 3.5 + perpX * coreW * 0.7, cy + Math.sin(angle) * 3.5 + perpY * coreW * 0.7);
        ctx.closePath();
        ctx.fill();

        // Cerdas irregulares de pincel seco en los bordes
        for (let b = 0; b < 5; b++) {
          const pseudo = Math.sin((cx * 0.37 + cy * 0.73 + b * 19.3 + seedOffset) * 1.7);
          if (pseudo > -0.25) {
            const offset = ((b - 2) / 2.1) * baseWidth * 1.15 + pseudo * 2.5;
            const bristleLen = Math.max(2.5, dist * 0.55);
            const bristleThick = Math.max(1.2, baseWidth * 0.14 * (1 - Math.abs(b - 2) * 0.2));
            const bx = cx + perpX * offset;
            const by = cy + perpY * offset;

            ctx.beginPath();
            ctx.moveTo(bx - perpX * bristleThick, by - perpY * bristleThick);
            ctx.lineTo(
              bx + Math.cos(angle) * bristleLen,
              by + Math.sin(angle) * bristleLen
            );
            ctx.lineTo(bx + perpX * bristleThick, by + perpY * bristleThick);
            ctx.closePath();
            ctx.fill();
          }
        }
      }
    },
    []
  );

  /**
   * Dibuja la punta afilada final en la dirección de salida del trazo.
   */
  const drawSharpTip = useCallback(
    (ctx: CanvasRenderingContext2D, points: Point[]) => {
      if (points.length < 2) return;
      const last = points[points.length - 1];
      const prev = points[Math.max(0, points.length - 4)];
      const angle = Math.atan2(last.y - prev.y, last.x - prev.x);
      const perpX = -Math.sin(angle);
      const perpY = Math.cos(angle);
      const tipLen = 28;
      const baseHalf = 7;

      ctx.fillStyle = '#FFF0D4';
      ctx.beginPath();
      ctx.moveTo(last.x + perpX * baseHalf, last.y + perpY * baseHalf);
      ctx.lineTo(
        last.x + Math.cos(angle) * tipLen,
        last.y + Math.sin(angle) * tipLen
      );
      ctx.lineTo(last.x - perpX * baseHalf, last.y - perpY * baseHalf);
      ctx.closePath();
      ctx.fill();
    },
    []
  );

  const clearCanvas = useCallback(() => {
    if (demoRafRef.current) {
      cancelAnimationFrame(demoRafRef.current);
      demoRafRef.current = null;
    }
    const canvas = canvasRef.current;
    const stage = stageRef.current;
    if (!canvas || !stage) return;
    const ctx = canvas.getContext('2d');
    if (ctx) {
      const rect = stage.getBoundingClientRect();
      ctx.clearRect(0, 0, rect.width, rect.height);
    }
    hasInteractedRef.current = true;
    setHasDrawn(false);
    setShowQueHablen(false);
    strokePointsRef.current = [];
    lastPointRef.current = null;
  }, []);

  /**
   * Auto-demostración a los 4 segundos: dibuja un trazo crema sobre "MALA".
   */
  useEffect(() => {
    const reducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches;

    const timer = window.setTimeout(() => {
      if (hasInteractedRef.current) return;

      const canvas = canvasRef.current;
      const stage = stageRef.current;
      const logoWrap = logoWrapRef.current;
      if (!canvas || !stage || !logoWrap) return;

      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      const stageRect = stage.getBoundingClientRect();
      const logoRect = logoWrap.getBoundingClientRect();

      // Coordenadas sobre la fila superior del logo ("MALA")
      const startX = logoRect.left - stageRect.left - logoRect.width * 0.05;
      const endX = logoRect.right - stageRect.left + logoRect.width * 0.04;
      const startY = logoRect.top - stageRect.top + logoRect.height * 0.27;
      const endY = logoRect.top - stageRect.top + logoRect.height * 0.19;

      const totalSteps = reducedMotion ? 1 : 28;
      const demoPoints: Point[] = [];

      for (let i = 0; i <= totalSteps; i++) {
        const t = i / totalSteps;
        const arcY = Math.sin(t * Math.PI) * -10;
        demoPoints.push({
          x: startX + (endX - startX) * t,
          y: startY + (endY - startY) * t + arcY,
          t: i * 16,
        });
      }

      setHasDrawn(true);

      if (reducedMotion) {
        for (let i = 1; i < demoPoints.length; i++) {
          const progress = i / demoPoints.length;
          const width = 10 + Math.sin(progress * Math.PI) * 14;
          drawDryBrushSegment(ctx, demoPoints[i - 1], demoPoints[i], width, i);
        }
        drawSharpTip(ctx, demoPoints);
        setShowQueHablen(true);
        return;
      }

      let step = 1;
      const animateDemo = () => {
        if (hasInteractedRef.current) return;
        if (step < demoPoints.length) {
          const progress = step / demoPoints.length;
          const width = 8 + Math.sin(progress * Math.PI) * 16;
          drawDryBrushSegment(
            ctx,
            demoPoints[step - 1],
            demoPoints[step],
            width,
            step
          );
          step += 1;
          demoRafRef.current = requestAnimationFrame(animateDemo);
        } else {
          drawSharpTip(ctx, demoPoints);
          setShowQueHablen(true);
        }
      };

      demoRafRef.current = requestAnimationFrame(animateDemo);
    }, 4000);

    return () => {
      window.clearTimeout(timer);
      if (demoRafRef.current) cancelAnimationFrame(demoRafRef.current);
    };
  }, [drawDryBrushSegment, drawSharpTip]);

  const getRelativePoint = (clientX: number, clientY: number): Point => {
    const stage = stageRef.current;
    const rect = stage?.getBoundingClientRect();
    return {
      x: clientX - (rect?.left ?? 0),
      y: clientY - (rect?.top ?? 0),
      t: performance.now(),
    };
  };

  const handlePointerDown = (e: React.PointerEvent<HTMLCanvasElement>) => {
    if (e.button !== 0 && e.pointerType === 'mouse') return;

    // Si había auto-demo en curso, cancelar y limpiar antes de trazar
    if (demoRafRef.current) {
      cancelAnimationFrame(demoRafRef.current);
      demoRafRef.current = null;
    }

    hasInteractedRef.current = true;
    isDrawingRef.current = true;
    setIsDrawing(true);
    setHasDrawn(true);
    setShowQueHablen(false);

    e.currentTarget.setPointerCapture(e.pointerId);
    const pt = getRelativePoint(e.clientX, e.clientY);
    lastPointRef.current = pt;
    strokePointsRef.current = [pt];
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLCanvasElement>) => {
    if (!isDrawingRef.current || !lastPointRef.current) return;
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');
    if (!ctx) return;

    const pt = getRelativePoint(e.clientX, e.clientY);
    const prev = lastPointRef.current;
    const dist = Math.hypot(pt.x - prev.x, pt.y - prev.y);
    if (dist < 1.5) return;

    const dt = Math.max(1, pt.t - prev.t);
    const velocity = dist / dt;
    // A mayor velocidad, trazo más fino y afilado
    const dynamicWidth = Math.max(5.5, Math.min(20, 17 - velocity * 4.5));

    drawDryBrushSegment(
      ctx,
      prev,
      pt,
      dynamicWidth,
      strokePointsRef.current.length
    );

    lastPointRef.current = pt;
    strokePointsRef.current.push(pt);
  };

  const handlePointerUp = () => {
    if (!isDrawingRef.current) return;
    isDrawingRef.current = false;
    setIsDrawing(false);

    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');
    if (ctx && strokePointsRef.current.length >= 2) {
      drawSharpTip(ctx, strokePointsRef.current);
      setShowQueHablen(true);
    }

    lastPointRef.current = null;
  };

  return (
    <section
      id="hero"
      className="relative min-h-screen w-full bg-[#FF1A17] text-[#0B0B0B] flex flex-col justify-between overflow-hidden pt-20 pb-6"
    >
      {/* Zona central interactiva (logo + canvas de pincel seco) */}
      <div
        ref={stageRef}
        className="relative flex-1 flex flex-col items-center justify-center px-5 md:px-12 select-none"
      >
        <div
          ref={logoWrapRef}
          className="relative z-10 w-full max-w-[820px] pointer-events-none"
        >
          <MalaFamaLogo color="#0B0B0B" className="w-full h-auto" />
        </div>

        {/* Canvas encima del logo para que el trazo de grafiti crema lo intervenga */}
        <canvas
          ref={canvasRef}
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUp}
          onPointerCancel={handlePointerUp}
          aria-label="Lienzo interactivo para dejar tu trazo sobre el logo de MALA FAMA"
          data-interactive="true"
          className={`absolute inset-0 z-20 touch-none ${
            isDrawing ? 'cursor-crosshair' : ''
          }`}
        />

        {/* Escritura a mano "Que hablen." que aparece al soltar el trazo */}
        <div className="relative z-30 mt-3 min-h-[3.5rem] md:min-h-[4.5rem] flex items-center justify-center pointer-events-none">
          {showQueHablen ? (
            <p className="mf-handwrite-active font-marker text-3xl sm:text-4xl md:text-6xl text-[#FFF0D4] -rotate-2 select-none">
              Que hablen.
            </p>
          ) : (
            !hasDrawn && (
              <p className="font-body text-xs sm:text-sm uppercase tracking-[0.22em] text-[#FFF0D4] font-medium">
                Deja tu marca.
              </p>
            )
          )}
        </div>

        {/* Subtítulo principal debajo del logo */}
        <p className="relative z-10 mt-3 max-w-md text-center font-body text-base sm:text-lg md:text-xl font-medium text-[#0B0B0B] leading-snug pointer-events-none">
          Laboratorio creativo. Estrategias que venden y dan que hablar.
        </p>
      </div>

      {/* Barra inferior de control y scroll seguro en móvil */}
      <div className="relative z-30 mx-auto flex w-full max-w-[1440px] items-center justify-between px-5 md:px-10 pt-4 touch-pan-y">
        <div className="min-w-[110px]">
          {hasDrawn && (
            <button
              type="button"
              onClick={clearCanvas}
              className="mf-btn-graffiti bg-[#0B0B0B] text-[#FFF0D4] font-display text-sm md:text-base tracking-wider px-5 py-2.5 hover:bg-[#FFF0D4] hover:text-[#0B0B0B] transition-colors duration-150"
            >
              Limpiar
            </button>
          )}
        </div>

        <button
          type="button"
          onClick={onScrollDown}
          aria-label="Bajar al manifiesto"
          className="mf-btn-graffiti inline-flex items-center gap-2 font-body text-xs md:text-sm uppercase tracking-[0.18em] font-bold text-[#0B0B0B] py-2 px-3 hover:text-[#FFF0D4] transition-colors"
        >
          <span>Desliza</span>
          <LambdaMark color="currentColor" className="w-3.5 h-3.5 rotate-180" />
        </button>
      </div>
    </section>
  );
};
