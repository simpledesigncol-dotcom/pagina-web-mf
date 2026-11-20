import React, { useEffect, useState } from 'react';
import { MalaFamaLogo } from './BrandMarks';

interface NavbarProps {
  onScrollTo: (targetId: string) => void;
}

/**
 * Barra superior fija minimalista:
 * Logo reducido al hacer scroll a la izquierda, un solo botón CTA a la derecha.
 */
export const Navbar: React.FC<NavbarProps> = ({ onScrollTo }) => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 80);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-colors duration-200 ${
        scrolled
          ? 'bg-[#0B0B0B] border-b border-[#FFF0D4]/15'
          : 'bg-transparent'
      }`}
    >
      <div className="mx-auto flex max-w-[1440px] items-center justify-between gap-8 px-5 py-3 md:px-10 md:py-4">
        <a
          href="#hero"
          onClick={(e) => {
            e.preventDefault();
            onScrollTo('hero');
          }}
          aria-label="Ir al inicio de MALA FAMA"
          className="flex items-center shrink-0 focus-visible:outline-[#FFF0D4]"
        >
          <div
            className={`transition-transform duration-200 origin-left ${
              scrolled ? 'w-20 md:w-24 scale-90' : 'w-24 md:w-28 scale-100'
            }`}
          >
            <MalaFamaLogo
              color={scrolled ? '#FFF0D4' : '#0B0B0B'}
              className="w-full h-auto block"
            />
          </div>
        </a>

        <button
          type="button"
          onClick={() => onScrollTo('contacto')}
          className={`mf-btn-graffiti font-display text-base md:text-lg tracking-wide whitespace-nowrap shrink-0 px-4 py-2 transition-colors duration-150 ${
            scrolled
              ? 'text-[#FFF0D4] hover:text-[#FF1A17]'
              : 'text-[#0B0B0B] bg-[#FFF0D4] hover:bg-[#0B0B0B] hover:text-[#FFF0D4]'
          }`}
        >
          <span>Cuéntanos tu caso</span>
          <svg
            viewBox="0 0 200 14"
            fill="none"
            aria-hidden="true"
            className="mf-underline-svg"
            preserveAspectRatio="none"
          >
            <path
              d="M2 9C56 4 128 3 198 7"
              stroke={scrolled ? '#FF1A17' : '#FFF0D4'}
              strokeWidth="4"
              strokeLinecap="butt"
              className="mf-underline-path"
            />
          </svg>
        </button>
      </div>
    </header>
  );
};
