import React, { useRef, useState } from 'react';
import { LambdaMark } from './BrandMarks';

interface CaseDossier {
  id: string;
  tag: string;
  client: string;
  headline: string;
  objective: string;
  buzz: string;
}

const CASES: CaseDossier[] = [
  {
    id: 'c1',
    tag: '[CASO DE EJEMPLO 01]',
    client: '[MARCA DE CAFÉ EN BOGOTÁ]',
    headline: 'Regalamos el peor café del país para probar cuál era el mejor.',
    objective:
      'Objetivo: Posicionar un origen de especialidad frente a cadenas gigantes sin pauta tradicional.',
    buzz: '“¿En serio están regalando café feo en plena Zona T?” — Lo dijo la gente',
  },
  {
    id: 'c2',
    tag: '[CASO DE EJEMPLO 02]',
    client: '[MARCA DE ROPA URBANA]',
    headline: 'Cerramos la tienda online 72 horas y vendimos solo por código en muros.',
    objective:
      'Objetivo: Agotar una cápsula limitada en menos de una semana sin descuentos.',
    buzz: '“Llevo dos horas buscando el código por Medellín.” — Lo dijo la gente',
  },
  {
    id: 'c3',
    tag: '[CASO DE EJEMPLO 03]',
    client: '[RESTAURANTE LOCAL]',
    headline: 'Quitamos las fotos del menú y dejamos solo las críticas de 1 estrella.',
    objective:
      'Objetivo: Recuperar conversación orgánica tras un cambio total de cocina.',
    buzz: '“Si se atreven a publicar eso, hay que ir a probar.” — Lo dijo la gente',
  },
  {
    id: 'c4',
    tag: '[CASO DE EJEMPLO 04]',
    client: '[FINTECH COLOMBIANA]',
    headline: 'Publicamos la letra pequeña gigante en vallas frente a los bancos.',
    objective:
      'Objetivo: Convertir el hartazgo con cobros ocultos en aperturas de cuenta.',
    buzz: '“Por fin alguien dice lo que todos pensamos.” — Lo dijo la gente',
  },
];

/**
 * 6. EXPERIMENTOS / CASOS (Galería horizontal con scroll)
 * Tarjetas redactadas/censuradas con barras negras que se retiran al interactuar.
 */
export const CasesSection: React.FC = () => {
  const scrollerRef = useRef<HTMLDivElement>(null);
  const [revealedIds, setRevealedIds] = useState<Record<string, boolean>>({});

  const toggleReveal = (id: string) => {
    setRevealedIds((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const scrollGallery = (direction: 'prev' | 'next') => {
    const el = scrollerRef.current;
    if (!el) return;
    const step = Math.min(520, el.clientWidth * 0.82);
    el.scrollBy({
      left: direction === 'next' ? step : -step,
      behavior: 'smooth',
    });
  };

  return (
    <section
      id="casos"
      className="relative w-full bg-[#FFF0D4] text-[#0B0B0B] py-24 md:py-28 overflow-hidden"
    >
      <div className="mx-auto max-w-[1440px] px-5 md:px-12 lg:px-16 mb-10 md:mb-14">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <p className="font-body text-xs md:text-sm uppercase tracking-[0.22em] text-[#FF1A17] font-bold mb-3">
              Archivo clasificado · Toca o pasa el cursor para desclasificar
            </p>
            <h2 className="font-display text-[clamp(2.8rem,7.5vw,6rem)] text-[#0B0B0B] mf-oblique-reveal">
              EXPERIMENTOS
            </h2>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <button
              type="button"
              onClick={() => scrollGallery('prev')}
              aria-label="Caso anterior"
              className="w-12 h-12 border-2 border-[#0B0B0B] bg-transparent hover:bg-[#0B0B0B] hover:text-[#FFF0D4] flex items-center justify-center font-display text-2xl transition-colors"
            >
              ←
            </button>
            <button
              type="button"
              onClick={() => scrollGallery('next')}
              aria-label="Siguiente caso"
              className="w-12 h-12 border-2 border-[#0B0B0B] bg-[#0B0B0B] text-[#FFF0D4] hover:bg-[#FF1A17] hover:border-[#FF1A17] flex items-center justify-center font-display text-2xl transition-colors"
            >
              →
            </button>
          </div>
        </div>
      </div>

      {/* Carril horizontal */}
      <div
        ref={scrollerRef}
        className="no-scrollbar flex gap-6 md:gap-8 overflow-x-auto snap-x snap-mandatory px-5 md:px-12 lg:px-16 pb-4"
      >
        {CASES.map((item) => {
          const isOpen = Boolean(revealedIds[item.id]);

          return (
            <article
              key={item.id}
              className="group relative snap-start shrink-0 w-[86vw] sm:w-[70vw] md:w-[540px] lg:w-[600px] border-4 border-[#0B0B0B] bg-[#FFF0D4] p-7 sm:p-10 flex flex-col justify-between min-h-[430px] md:min-h-[470px]"
            >
              <button
                type="button"
                onClick={() => toggleReveal(item.id)}
                aria-expanded={isOpen}
                aria-label={`${
                  isOpen ? 'Ocultar' : 'Desclasificar'
                } ${item.tag}`}
                className="text-left w-full h-full flex flex-col justify-between focus-visible:outline-[#FF1A17]"
              >
                <div>
                  {/* Encabezado del expediente */}
                  <div className="flex flex-wrap items-center justify-between gap-3 border-b-2 border-[#0B0B0B] pb-4 mb-6">
                    <span className="font-body text-xs sm:text-sm font-bold tracking-[0.14em] uppercase text-[#FF1A17]">
                      {item.tag}
                    </span>
                    <span className="font-body text-xs uppercase tracking-[0.16em] text-[#0B0B0B]/70">
                      {isOpen ? 'Desclasificado' : 'Censurado'}
                    </span>
                  </div>

                  {/* Nombre de cliente con barra negra de censura */}
                  <div className="relative inline-block mb-6 overflow-hidden">
                    <span className="font-body text-sm font-bold uppercase tracking-[0.18em] text-[#0B0B0B] px-1">
                      {item.client}
                    </span>
                    <span
                      aria-hidden="true"
                      className={`absolute inset-0 bg-[#0B0B0B] transition-transform duration-300 ease-out origin-right ${
                        isOpen
                          ? 'scale-x-0'
                          : 'scale-x-100 group-hover:scale-x-0 group-focus-within:scale-x-0'
                      }`}
                    />
                  </div>

                  {/* Titular del caso con barras negras de censura */}
                  <div className="relative mb-6">
                    <h3 className="font-display text-3xl sm:text-4xl md:text-[2.65rem] leading-[0.95] text-[#0B0B0B]">
                      {item.headline}
                    </h3>
                    <div
                      aria-hidden="true"
                      className={`absolute inset-0 flex flex-col justify-between gap-2 py-1 transition-transform duration-300 ease-out origin-left ${
                        isOpen
                          ? 'scale-x-0'
                          : 'scale-x-100 group-hover:scale-x-0 group-focus-within:scale-x-0'
                      }`}
                    >
                      <span className="block h-1/3 w-full bg-[#0B0B0B]" />
                      <span className="block h-1/3 w-[88%] bg-[#0B0B0B]" />
                      <span className="block h-1/3 w-[64%] bg-[#0B0B0B]" />
                    </div>
                  </div>
                </div>

                {/* Objetivo y reacción del público */}
                <div className="space-y-4 pt-4 border-t-2 border-[#0B0B0B]/15">
                  <div className="relative overflow-hidden">
                    <p className="font-body text-base md:text-lg text-[#0B0B0B] font-medium leading-snug">
                      {item.objective}
                    </p>
                    <span
                      aria-hidden="true"
                      className={`absolute inset-0 bg-[#0B0B0B] transition-transform duration-300 delay-75 ease-out origin-right ${
                        isOpen
                          ? 'scale-x-0'
                          : 'scale-x-100 group-hover:scale-x-0 group-focus-within:scale-x-0'
                      }`}
                    />
                  </div>

                  <div className="relative flex items-start gap-2.5 overflow-hidden">
                    <LambdaMark
                      color="#FF1A17"
                      className="w-4 h-4 mt-1 shrink-0"
                    />
                    <p className="font-marker text-lg md:text-xl text-[#FF1A17] leading-snug">
                      {item.buzz}
                    </p>
                    <span
                      aria-hidden="true"
                      className={`absolute inset-0 bg-[#0B0B0B] transition-transform duration-300 delay-100 ease-out origin-left ${
                        isOpen
                          ? 'scale-x-0'
                          : 'scale-x-100 group-hover:scale-x-0 group-focus-within:scale-x-0'
                      }`}
                    />
                  </div>
                </div>
              </button>
            </article>
          );
        })}
      </div>
    </section>
  );
};
