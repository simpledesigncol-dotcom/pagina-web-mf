import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { GraffitiStroke, LambdaBorderPattern } from './BrandMarks';

gsap.registerPlugin(ScrollTrigger);

interface WallQuote {
  id: string;
  text: string;
  tag: string;
  rotation: string;
  strokeType: 'underline' | 'strike' | 'slash';
}

const WALL_QUOTES: WallQuote[] = [
  {
    id: 'q1',
    text: '“¿Viste lo que hicieron ayer?”',
    tag: '[EJEMPLO]',
    rotation: '-rotate-2',
    strokeType: 'underline',
  },
  {
    id: 'q2',
    text: '“Eso no parece publicidad.”',
    tag: '[EJEMPLO]',
    rotation: 'rotate-1',
    strokeType: 'slash',
  },
  {
    id: 'q3',
    text: '“Es demasiado arriesgado.”',
    tag: '[EJEMPLO]',
    rotation: '-rotate-1',
    strokeType: 'strike',
  },
  {
    id: 'q4',
    text: '“No sé si me encanta o me indigna, pero lo compré.”',
    tag: '[EJEMPLO]',
    rotation: 'rotate-2',
    strokeType: 'underline',
  },
  {
    id: 'q5',
    text: '“Me lo mandaron tres personas en la mañana.”',
    tag: '[EJEMPLO]',
    rotation: '-rotate-1',
    strokeType: 'slash',
  },
  {
    id: 'q6',
    text: '“¿Quién está detrás de esta marca?”',
    tag: '[EJEMPLO]',
    rotation: 'rotate-1',
    strokeType: 'underline',
  },
];

/**
 * 7. LA PARED DE "QUE HABLEN"
 * Pared animada de frases escritas a mano en crema sobre fondo negro,
 * que aparecen y se tachan o destacan con trazos de grafiti.
 */
export const QueHablenWall: React.FC = () => {
  const wallRef = useRef<HTMLDivElement>(null);
  const [markedIds, setMarkedIds] = useState<Record<string, boolean>>({
    q1: true,
    q3: true,
    q5: true,
  });

  useEffect(() => {
    const reducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches;
    if (reducedMotion || !wallRef.current) return;

    const ctx = gsap.context(() => {
      const items = gsap.utils.toArray<HTMLElement>('.mf-wall-item');
      gsap.fromTo(
        items,
        { y: 28, opacity: 0.1 },
        {
          y: 0,
          opacity: 1,
          duration: 0.55,
          stagger: 0.1,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: wallRef.current,
            start: 'top 78%',
            toggleActions: 'play none none reverse',
          },
        }
      );
    }, wallRef);

    return () => ctx.revert();
  }, []);

  const toggleMark = (id: string) => {
    setMarkedIds((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <section
      id="que-hablen"
      ref={wallRef}
      className="relative w-full bg-[#0B0B0B] text-[#FFF0D4] overflow-hidden"
    >
      <LambdaBorderPattern fill="#FFF0D4" bg="#0B0B0B" className="w-full h-5" />

      <div className="mx-auto max-w-[1320px] px-5 py-24 md:px-12 lg:px-16">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
          <div>
            <p className="font-body text-xs md:text-sm uppercase tracking-[0.22em] text-[#FF1A17] font-bold mb-3">
              La calle opina · Toca una frase para rayarla
            </p>
            <h2 className="font-display text-[clamp(2.8rem,7.5vw,6rem)] text-[#FFF0D4] mf-oblique-reveal">
              LΛ PΛRED DE “QUE HΛBLEN”
            </h2>
          </div>
          <span className="font-marker text-2xl md:text-3xl text-[#FF1A17]">
            Que hablen.
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-10 gap-y-14">
          {WALL_QUOTES.map((quote) => {
            const isMarked = Boolean(markedIds[quote.id]);
            return (
              <button
                key={quote.id}
                type="button"
                onClick={() => toggleMark(quote.id)}
                aria-pressed={isMarked}
                className={`mf-wall-item group text-left border-b border-[#FFF0D4]/15 pb-8 transition-transform duration-150 hover:-translate-y-1 focus-visible:outline-[#FF1A17] ${quote.rotation}`}
              >
                <span className="block font-body text-[11px] uppercase tracking-[0.2em] text-[#FFF0D4]/55 mb-3">
                  {quote.tag}
                </span>

                <div className="relative inline-block">
                  <p className="font-marker text-2xl sm:text-3xl leading-snug text-[#FFF0D4]">
                    {quote.text}
                  </p>

                  {isMarked && (
                    <span
                      aria-hidden="true"
                      className={`pointer-events-none absolute left-[-2%] right-[-2%] block ${
                        quote.strokeType === 'strike'
                          ? 'top-[42%] h-6'
                          : '-bottom-2 h-4'
                      }`}
                    >
                      <GraffitiStroke
                        variant={quote.strokeType}
                        color="#FF1A17"
                        className="w-full h-full"
                      />
                    </span>
                  )}
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
};
