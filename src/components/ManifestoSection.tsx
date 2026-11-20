import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { GraffitiStroke, LambdaBorderPattern } from './BrandMarks';

gsap.registerPlugin(ScrollTrigger);

interface StatementItem {
  id: string;
  bg: string;
  text: string;
  strokeColor: string;
  words: Array<{
    display: string;
    highlight?: 'strike' | 'underline' | 'slash';
  }>;
  ariaLabel: string;
}

const STATEMENTS: StatementItem[] = [
  {
    id: 'm1',
    bg: 'bg-[#0B0B0B]',
    text: 'text-[#FFF0D4]',
    strokeColor: '#FF1A17',
    ariaLabel: 'Las agencias hacen campañas.',
    words: [
      { display: 'LΛS' },
      { display: 'ΛGENCIΛS' },
      { display: 'HΛCEN' },
      { display: 'CΛMPΛÑΛS.', highlight: 'strike' },
    ],
  },
  {
    id: 'm2',
    bg: 'bg-[#FF1A17]',
    text: 'text-[#0B0B0B]',
    strokeColor: '#FFF0D4',
    ariaLabel: 'Nosotros hacemos experimentos.',
    words: [
      { display: 'NOSOTROS' },
      { display: 'HΛCEMOS' },
      { display: 'EXPERIMENTOS.', highlight: 'underline' },
    ],
  },
  {
    id: 'm3',
    bg: 'bg-[#FFF0D4]',
    text: 'text-[#0B0B0B]',
    strokeColor: '#FF1A17',
    ariaLabel: 'Cada marca tiene un objetivo.',
    words: [
      { display: 'CΛDΛ' },
      { display: 'MΛRCΛ' },
      { display: 'TIENE' },
      { display: 'UN' },
      { display: 'OBJETIVO.', highlight: 'underline' },
    ],
  },
  {
    id: 'm4',
    bg: 'bg-[#0B0B0B]',
    text: 'text-[#FFF0D4]',
    strokeColor: '#FFF0D4',
    ariaLabel: 'Cada objetivo, una estrategia distinta.',
    words: [
      { display: 'CΛDΛ' },
      { display: 'OBJETIVO,' },
      { display: 'UNΛ' },
      { display: 'ESTRΛTEGIΛ' },
      { display: 'DISTINTΛ.', highlight: 'slash' },
    ],
  },
  {
    id: 'm5',
    bg: 'bg-[#FF1A17]',
    text: 'text-[#FFF0D4]',
    strokeColor: '#0B0B0B',
    ariaLabel: 'Si no da que hablar, no vende.',
    words: [
      { display: 'SI' },
      { display: 'NO' },
      { display: 'DΛ' },
      { display: 'QUE' },
      { display: 'HΛBLΛR,', highlight: 'underline' },
      { display: 'NO' },
      { display: 'VENDE.', highlight: 'strike' },
    ],
  },
];

/**
 * 2. MANIFIESTO
 * Una frase por pantalla con scroll, alternando rojo, negro y crema.
 * Entrada palabra por palabra + trazos de grafiti en palabras clave.
 */
export const ManifestoSection: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const reducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches;
    if (reducedMotion || !containerRef.current) return;

    const ctx = gsap.context(() => {
      const blocks = gsap.utils.toArray<HTMLElement>('.mf-manifesto-screen');

      blocks.forEach((block) => {
        const words = block.querySelectorAll('.mf-word');
        const strokes = block.querySelectorAll('.mf-stroke-wrap');

        gsap.fromTo(
          words,
          { yPercent: 28, opacity: 0.08, skewY: 2 },
          {
            yPercent: 0,
            opacity: 1,
            skewY: 0,
            duration: 0.55,
            stagger: 0.07,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: block,
              start: 'top 76%',
              end: 'top 25%',
              toggleActions: 'play none none reverse',
            },
          }
        );

        if (strokes.length > 0) {
          gsap.fromTo(
            strokes,
            { scaleX: 0, opacity: 0 },
            {
              scaleX: 1,
              opacity: 1,
              duration: 0.45,
              delay: 0.2,
              ease: 'power2.out',
              transformOrigin: 'left center',
              scrollTrigger: {
                trigger: block,
                start: 'top 72%',
                toggleActions: 'play none none reverse',
              },
            }
          );
        }
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="manifiesto"
      ref={containerRef}
      aria-label="Manifiesto de MALA FAMA"
      className="relative w-full"
    >
      {/* Divisor superior con patrón de Λ */}
      <div className="bg-[#0B0B0B]">
        <LambdaBorderPattern fill="#FF1A17" bg="#0B0B0B" className="w-full h-5" />
      </div>

      {STATEMENTS.map((item, idx) => (
        <div
          key={item.id}
          className={`mf-manifesto-screen relative min-h-[78vh] md:min-h-[90vh] w-full flex items-center px-5 py-20 md:px-12 lg:px-20 ${item.bg} ${item.text}`}
        >
          <div className="mx-auto w-full max-w-[1440px]">
            <p className="font-body text-xs md:text-sm uppercase tracking-[0.22em] opacity-65 mb-6 tabular-nums">
              0{idx + 1} / 05
            </p>
            <h2
              aria-label={item.ariaLabel}
              className="font-display text-[clamp(3.1rem,9.5vw,8.75rem)] leading-[0.88] tracking-tight max-w-6xl"
            >
              {item.words.map((word, wIdx) => (
                <span
                  key={`${item.id}-${wIdx}`}
                  className="mf-word relative inline-block mr-[0.22em] mb-[0.06em]"
                >
                  <span className="relative z-10">{word.display}</span>
                  {word.highlight === 'underline' && (
                    <span className="mf-stroke-wrap absolute left-[-2%] right-[-2%] bottom-[0.02em] h-[0.18em] z-20 block">
                      <GraffitiStroke
                        variant="underline"
                        color={item.strokeColor}
                        className="w-full h-full"
                      />
                    </span>
                  )}
                  {word.highlight === 'strike' && (
                    <span className="mf-stroke-wrap absolute left-[-3%] right-[-3%] top-[38%] h-[0.22em] z-20 block">
                      <GraffitiStroke
                        variant="strike"
                        color={item.strokeColor}
                        className="w-full h-full"
                      />
                    </span>
                  )}
                  {word.highlight === 'slash' && (
                    <span className="mf-stroke-wrap absolute left-[-2%] right-[-2%] bottom-[-0.04em] h-[0.22em] z-20 block">
                      <GraffitiStroke
                        variant="slash"
                        color={item.strokeColor}
                        className="w-full h-full"
                      />
                    </span>
                  )}
                </span>
              ))}
            </h2>
          </div>
        </div>
      ))}
    </section>
  );
};
