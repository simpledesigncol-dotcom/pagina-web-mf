import React from 'react';
import { LambdaBorderPattern, MalaFamaLogo } from './BrandMarks';

/**
 * 9. FOOTER
 * Fondo rojo, logo limpio en crema, patrón de Λ arriba,
 * enlaces de Instagram y correo, y "Que hablen." escrito a mano.
 */
export const Footer: React.FC = () => {
  return (
    <footer className="relative w-full bg-[#FF1A17] text-[#FFF0D4]">
      {/* Borde superior repetido con el recurso gráfico Λ */}
      <LambdaBorderPattern fill="#0B0B0B" bg="#FF1A17" className="w-full h-6" />

      <div className="mx-auto max-w-[1440px] px-5 pt-16 pb-12 md:px-12 lg:px-16">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-12 border-b-2 border-[#0B0B0B]/25 pb-14">
          <div className="w-full max-w-[320px] sm:max-w-[380px]">
            <MalaFamaLogo color="#FFF0D4" className="w-full h-auto" />
          </div>

          <div className="flex flex-col sm:flex-row sm:items-end gap-8 md:gap-14">
            <div>
              <p className="font-body text-xs uppercase tracking-[0.2em] text-[#0B0B0B] font-bold mb-2">
                Instagram
              </p>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="mf-btn-graffiti font-display text-2xl md:text-3xl text-[#FFF0D4] hover:text-[#0B0B0B] transition-colors"
              >
                <span>[PONER LINK]</span>
                <svg
                  viewBox="0 0 180 12"
                  fill="none"
                  aria-hidden="true"
                  className="mf-underline-svg"
                  preserveAspectRatio="none"
                >
                  <path
                    d="M2 8C54 3 124 3 178 7"
                    stroke="#0B0B0B"
                    strokeWidth="3.5"
                    className="mf-underline-path"
                  />
                </svg>
              </a>
            </div>

            <div>
              <p className="font-body text-xs uppercase tracking-[0.2em] text-[#0B0B0B] font-bold mb-2">
                Correo
              </p>
              <a
                href="mailto:hola@malafama.co"
                className="mf-btn-graffiti font-display text-2xl md:text-3xl text-[#FFF0D4] hover:text-[#0B0B0B] transition-colors"
              >
                <span>[PONER CORREO]</span>
                <svg
                  viewBox="0 0 210 12"
                  fill="none"
                  aria-hidden="true"
                  className="mf-underline-svg"
                  preserveAspectRatio="none"
                >
                  <path
                    d="M2 8C64 3 144 3 208 7"
                    stroke="#0B0B0B"
                    strokeWidth="3.5"
                    className="mf-underline-path"
                  />
                </svg>
              </a>
            </div>
          </div>
        </div>

        <div className="pt-8 flex flex-col sm:flex-row sm:items-center justify-between gap-6">
          <p className="font-body text-xs sm:text-sm uppercase tracking-[0.18em] text-[#0B0B0B] font-bold">
            MALA FAMA · Laboratorio creativo · Colombia
          </p>
          <p className="font-marker text-3xl sm:text-4xl text-[#FFF0D4] -rotate-1">
            Que hablen.
          </p>
        </div>
      </div>
    </footer>
  );
};
