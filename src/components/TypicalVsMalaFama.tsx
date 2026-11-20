import React, { useState } from 'react';
import { LambdaMark } from './BrandMarks';

const TYPICAL_ITEMS = [
  'Paquetes con precio fijo',
  'Contenido bonito sin objetivo',
  'Reportes de likes',
  'Estrategias copiadas',
];

const MALA_FAMA_ITEMS = [
  'Un caso a la vez',
  'Estrategia desde tu objetivo',
  'Experimentos medibles',
  'Marketing que da que hablar y vende',
];

/**
 * 3. LO TÍPICO VS MALA FAMA (Interactivo)
 * Al cambiar el interruptor, toda la sección muta color, tipografía y discurso.
 */
export const TypicalVsMalaFama: React.FC = () => {
  const [mode, setMode] = useState<'tipico' | 'malafama'>('tipico');
  const isMalaFama = mode === 'malafama';

  return (
    <section
      id="comparacion"
      className={`relative w-full min-h-[85vh] flex flex-col justify-center px-5 py-24 md:px-12 lg:px-20 transition-colors duration-200 ${
        isMalaFama
          ? 'bg-[#FFF0D4] text-[#0B0B0B]'
          : 'bg-[#E5E5E5] text-[#525252]'
      }`}
    >
      <div className="mx-auto w-full max-w-[1200px]">
        {/* Interruptor grande de dos estados */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-8 mb-14 md:mb-20">
          <div>
            <p
              className={`text-xs uppercase tracking-[0.2em] mb-4 ${
                isMalaFama
                  ? 'font-body font-bold text-[#FF1A17]'
                  : 'font-body text-[#737373]'
              }`}
            >
              Cambia el enfoque
            </p>
            <h2
              className={`transition-all duration-150 ${
                isMalaFama
                  ? 'font-display text-[clamp(2.8rem,7vw,5.8rem)] text-[#0B0B0B] mf-oblique-reveal'
                  : 'font-body font-normal text-3xl md:text-5xl text-[#404040] tracking-tight'
              }`}
            >
              {isMalaFama ? 'ESTO ES MΛLΛ FΛMΛ.' : 'Esto es lo de siempre.'}
            </h2>
          </div>

          <div
            role="tablist"
            aria-label="Comparar Lo típico contra Mala Fama"
            className={`inline-flex shrink-0 border-2 ${
              isMalaFama
                ? 'border-[#0B0B0B] bg-[#0B0B0B]'
                : 'border-[#A3A3A3] bg-[#FFFFFF]'
            }`}
          >
            <button
              type="button"
              role="tab"
              aria-selected={!isMalaFama}
              onClick={() => setMode('tipico')}
              className={`px-5 py-3.5 text-sm md:text-base whitespace-nowrap shrink-0 transition-colors duration-150 ${
                !isMalaFama
                  ? 'bg-[#525252] text-[#FFFFFF] font-medium'
                  : 'bg-transparent text-[#FFF0D4] hover:text-[#FF1A17] font-body'
              }`}
            >
              Lo típico
            </button>
            <button
              type="button"
              role="tab"
              aria-selected={isMalaFama}
              onClick={() => setMode('malafama')}
              className={`px-6 py-3.5 text-sm md:text-base whitespace-nowrap shrink-0 transition-colors duration-150 ${
                isMalaFama
                  ? 'bg-[#FF1A17] text-[#FFF0D4] font-display tracking-wider text-lg'
                  : 'bg-transparent text-[#525252] hover:bg-[#FF1A17] hover:text-[#FFF0D4] font-display tracking-wider text-lg'
              }`}
            >
              Mala Fama
            </button>
          </div>
        </div>

        {/* Lista que transforma su diseño según el estado */}
        {!isMalaFama ? (
          <div className="bg-[#FFFFFF] border border-[#D4D4D4] p-8 md:p-12">
            <p className="font-body text-sm text-[#737373] mb-8">
              Cotización estándar · PDF de 30 diapositivas
            </p>
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {TYPICAL_ITEMS.map((item, index) => (
                <li
                  key={item}
                  className="flex items-start gap-4 border-b border-[#E5E5E5] pb-5 font-body text-lg md:text-xl text-[#525252]"
                >
                  <span className="text-xs text-[#A3A3A3] mt-1.5 tabular-nums">
                    0{index + 1}
                  </span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
            <p className="mt-8 font-body text-sm text-[#737373]">
              ¿Suena igual a las últimas tres agencias que cotizaste? Exacto.
            </p>
          </div>
        ) : (
          <div className="bg-[#0B0B0B] text-[#FFF0D4] p-8 md:p-14 border-4 border-[#0B0B0B]">
            <div className="flex flex-wrap items-center justify-between gap-4 mb-10 border-b border-[#FFF0D4]/20 pb-5">
              <span className="font-body text-xs uppercase tracking-[0.2em] text-[#FF1A17] font-bold">
                Laboratorio creativo · Sin molde
              </span>
              <span className="font-marker text-xl md:text-2xl text-[#FFF0D4]">
                Que hablen.
              </span>
            </div>

            <ul className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-10">
              {MALA_FAMA_ITEMS.map((item) => (
                <li
                  key={item}
                  className="flex items-start gap-4 border-b border-[#FFF0D4]/15 pb-6"
                >
                  <LambdaMark
                    color="#FF1A17"
                    className="w-5 h-5 mt-1.5 shrink-0"
                  />
                  <span className="font-display text-2xl sm:text-3xl md:text-4xl text-[#FFF0D4] leading-[0.95]">
                    {item}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </section>
  );
};
