import React, { useEffect, useRef, useState } from 'react';
import { LambdaBorderPattern, LambdaMark } from './BrandMarks';

interface MethodStep {
  number: string;
  title: string;
  description: string;
}

const METHOD_STEPS: MethodStep[] = [
  {
    number: '01',
    title: 'Objetivo',
    description:
      'Partimos de lo que necesitas lograr, no de lo que está de moda.',
  },
  {
    number: '02',
    title: 'Hipótesis',
    description: 'Definimos qué haría que hablen de ti.',
  },
  {
    number: '03',
    title: 'Experimento',
    description: 'Lo lanzamos, medimos y ajustamos rápido.',
  },
  {
    number: '04',
    title: 'Ruido',
    description: 'Lo que se dice de ti se convierte en ventas.',
  },
];

/**
 * 4. EL MÉTODO (Scroll sticky estilo Apple)
 * Columna fija con número gigante que cambia mientras se recorre cada paso.
 */
export const MethodSection: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const stepRefs = useRef<Array<HTMLDivElement | null>>([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const idx = Number(entry.target.getAttribute('data-step-index'));
            if (!Number.isNaN(idx)) {
              setActiveIndex(idx);
            }
          }
        });
      },
      {
        rootMargin: '-38% 0px -42% 0px',
        threshold: 0.1,
      }
    );

    stepRefs.current.forEach((el) => {
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  const currentStep = METHOD_STEPS[activeIndex] ?? METHOD_STEPS[0];

  return (
    <section
      id="metodo"
      className="relative w-full bg-[#0B0B0B] text-[#FFF0D4]"
    >
      <LambdaBorderPattern fill="#FF1A17" bg="#0B0B0B" className="w-full h-5" />

      <div className="mx-auto max-w-[1320px] px-5 py-24 md:px-12 lg:px-16">
        <div className="mb-14 md:mb-20">
          <p className="font-body text-xs md:text-sm uppercase tracking-[0.22em] text-[#FF1A17] font-bold mb-3">
            Cómo pensamos
          </p>
          <h2 className="font-display text-[clamp(2.8rem,7vw,5.5rem)] text-[#FFF0D4] mf-oblique-reveal">
            EL MÉTODO
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Columna izquierda sticky en desktop */}
          <div className="hidden lg:block lg:col-span-5 lg:sticky lg:top-28">
            <div className="border-t-4 border-[#FF1A17] pt-6">
              <div
                key={currentStep.number}
                className="font-display text-[clamp(8.5rem,15vw,13.5rem)] leading-[0.82] text-[#FF1A17] tabular-nums select-none transition-transform duration-200"
              >
                {currentStep.number}
              </div>

              <div className="mt-4 flex items-center gap-3">
                <LambdaMark color="#FFF0D4" className="w-5 h-5 shrink-0" />
                <span className="font-display text-4xl text-[#FFF0D4] tracking-wide">
                  {currentStep.title}
                </span>
              </div>

              {/* Barra de progreso discreta de 4 pasos */}
              <div
                className="mt-8 flex items-center gap-2"
                aria-hidden="true"
              >
                {METHOD_STEPS.map((step, i) => (
                  <button
                    key={step.number}
                    type="button"
                    onClick={() => {
                      stepRefs.current[i]?.scrollIntoView({
                        behavior: 'smooth',
                        block: 'center',
                      });
                    }}
                    aria-label={`Ir al paso ${step.number} ${step.title}`}
                    className={`h-2 transition-all duration-200 ${
                      i === activeIndex
                        ? 'w-14 bg-[#FF1A17]'
                        : 'w-6 bg-[#FFF0D4]/25 hover:bg-[#FFF0D4]/60'
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Columna derecha con los 4 pasos espaciados */}
          <div className="lg:col-span-7 flex flex-col">
            {METHOD_STEPS.map((step, index) => {
              const isActive = index === activeIndex;
              return (
                <div
                  key={step.number}
                  ref={(el) => {
                    stepRefs.current[index] = el;
                  }}
                  data-step-index={index}
                  className={`min-h-[42vh] lg:min-h-[58vh] flex flex-col justify-center border-b border-[#FFF0D4]/15 py-12 lg:py-16 transition-opacity duration-200 ${
                    isActive ? 'opacity-100' : 'opacity-55 lg:opacity-45'
                  }`}
                >
                  <div className="flex items-baseline gap-4 mb-4">
                    <span className="lg:hidden font-display text-6xl text-[#FF1A17] tabular-nums leading-none">
                      {step.number}
                    </span>
                    <span className="hidden lg:inline-block font-body text-xs uppercase tracking-[0.2em] text-[#FF1A17] font-bold tabular-nums">
                      Paso {step.number}
                    </span>
                  </div>

                  <h3 className="font-display text-[clamp(2.5rem,5.5vw,4.75rem)] text-[#FFF0D4] mb-5">
                    {step.title}
                  </h3>

                  <p className="font-body text-xl sm:text-2xl md:text-3xl text-[#FFF0D4]/90 leading-snug max-w-xl">
                    {step.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};
