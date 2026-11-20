import React, { useState } from 'react';
import { GraffitiStroke, LambdaMark } from './BrandMarks';

interface ObjectiveOption {
  id: string;
  label: string;
  hypothesis: string;
}

const OBJECTIVES: ObjectiveOption[] = [
  {
    id: 'vender',
    label: 'Quiero vender más',
    hypothesis:
      'El problema casi nunca es tu precio. Es que nadie siente urgencia por elegirte hoy. Vamos a provocar una razón concreta para que te compren y se lo cuenten a otros.',
  },
  {
    id: 'lanzar',
    label: 'Voy a lanzar algo',
    hypothesis:
      'Si sales pidiendo permiso con un video bonito, naciste invisible. Vamos a soltar un lanzamiento que obligue a tomar postura desde el primer día.',
  },
  {
    id: 'recordar',
    label: 'Necesito que me recuerden',
    hypothesis:
      'Ser correcto es la forma más cara de pasar desapercibido. Si tu marca no incomoda un poco a su categoría, mañana nadie se acuerda de tu nombre.',
  },
  {
    id: 'imagen',
    label: 'Quiero cambiar mi imagen',
    hypothesis:
      'Un cambio de logo no borra una historia vieja. Necesitas un movimiento público tan claro que la gente tenga que actualizar lo que piensa de ti.',
  },
  {
    id: 'hablar',
    label: 'Quiero que hablen de mí',
    hypothesis:
      'Deja de explicar lo bueno que eres. Vamos a diseñar un experimento tan específico y tan fuera de libreto que otros tengan que explicarlo por ti.',
  },
];

interface NoPricingSectionProps {
  onSelectObjectiveForForm: (objectiveText: string) => void;
}

/**
 * 5. SIN PRECIOS (Interactivo)
 * Chips seleccionables con objetivos que disparan una primera hipótesis provocadora.
 */
export const NoPricingSection: React.FC<NoPricingSectionProps> = ({
  onSelectObjectiveForForm,
}) => {
  const [selectedId, setSelectedId] = useState<string>(OBJECTIVES[0].id);
  const active =
    OBJECTIVES.find((obj) => obj.id === selectedId) ?? OBJECTIVES[0];

  return (
    <section
      id="sin-precios"
      className="relative w-full min-h-[90vh] flex flex-col justify-center bg-[#FF1A17] text-[#0B0B0B] px-5 py-24 md:px-12 lg:px-20"
    >
      <div className="mx-auto w-full max-w-[1200px]">
        <div className="max-w-4xl">
          <h2 className="font-display text-[clamp(3rem,8vw,6.8rem)] leading-[0.88] text-[#0B0B0B] mf-oblique-reveal">
            NO TENEMOS TΛRIFΛS.{' '}
            <span className="relative inline-block text-[#FFF0D4]">
              TENEMOS CΛSOS.
              <span className="absolute left-0 right-0 -bottom-2 h-4 block">
                <GraffitiStroke
                  variant="underline"
                  color="#0B0B0B"
                  className="w-full h-full"
                />
              </span>
            </span>
          </h2>

          <p className="mt-8 font-body text-xl sm:text-2xl md:text-3xl font-medium text-[#0B0B0B] max-w-2xl leading-snug">
            Cada marca es un caso distinto, así que cada estrategia se diseña
            desde cero.
          </p>
        </div>

        {/* Selector interactivo de objetivos */}
        <div className="mt-12 md:mt-16">
          <p className="font-body text-xs sm:text-sm uppercase tracking-[0.2em] font-bold text-[#FFF0D4] mb-5">
            Elige tu punto de partida:
          </p>

          <div
            role="radiogroup"
            aria-label="Objetivos de marca"
            className="flex flex-wrap gap-3 md:gap-4"
          >
            {OBJECTIVES.map((obj) => {
              const isSelected = obj.id === selectedId;
              return (
                <button
                  key={obj.id}
                  type="button"
                  role="radio"
                  aria-checked={isSelected}
                  onClick={() => setSelectedId(obj.id)}
                  className={`inline-flex items-center gap-2.5 px-5 py-3.5 text-left font-body text-base md:text-lg font-bold border-2 transition-colors duration-150 whitespace-nowrap shrink-0 ${
                    isSelected
                      ? 'bg-[#0B0B0B] text-[#FFF0D4] border-[#0B0B0B]'
                      : 'bg-[#FF1A17] text-[#0B0B0B] border-[#0B0B0B] hover:bg-[#FFF0D4] hover:border-[#FFF0D4]'
                  }`}
                >
                  <LambdaMark
                    color={isSelected ? '#FF1A17' : '#0B0B0B'}
                    className="w-3.5 h-3.5 shrink-0"
                  />
                  <span>{obj.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Respuesta animada tipo Primera Hipótesis */}
        <div
          key={active.id}
          aria-live="polite"
          className="mt-10 bg-[#0B0B0B] text-[#FFF0D4] p-7 sm:p-10 md:p-12 border-2 border-[#0B0B0B]"
        >
          <div className="flex flex-wrap items-center justify-between gap-4 mb-5">
            <span className="font-body text-xs uppercase tracking-[0.22em] text-[#FF1A17] font-bold">
              Primera hipótesis · {active.label}
            </span>
            <span className="font-marker text-lg sm:text-xl text-[#FFF0D4]">
              Que hablen.
            </span>
          </div>

          <p className="font-display text-[clamp(1.6rem,3.6vw,2.85rem)] leading-[1.05] text-[#FFF0D4] max-w-4xl">
            “{active.hypothesis}”
          </p>

          <div className="mt-8 pt-6 border-t border-[#FFF0D4]/20 flex flex-wrap items-center justify-between gap-4">
            <span className="font-body text-sm text-[#FFF0D4]/70">
              Sin paquetes prearmados. Sin tarifas estándar.
            </span>
            <button
              type="button"
              onClick={() => onSelectObjectiveForForm(active.label)}
              className="mf-btn-graffiti font-display text-lg md:text-xl text-[#FF1A17] hover:text-[#FFF0D4] tracking-wide whitespace-nowrap shrink-0 py-1"
            >
              <span>Trabajar este objetivo →</span>
              <svg
                viewBox="0 0 220 12"
                fill="none"
                aria-hidden="true"
                className="mf-underline-svg"
                preserveAspectRatio="none"
              >
                <path
                  d="M2 8C64 3 145 3 218 7"
                  stroke="#FFF0D4"
                  strokeWidth="3.5"
                  className="mf-underline-path"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
