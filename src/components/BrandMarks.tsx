import React from 'react';

interface LogoProps {
  color?: string;
  className?: string;
}

/**
 * Logo oficial vectorial MALA / FAMA en dos líneas,
 * tipografía geométrica pesada y angular con las 4 A sin travesaño (Λ).
 */
export const MalaFamaLogo: React.FC<LogoProps> = ({
  color = '#0B0B0B',
  className = 'w-full h-auto',
}) => {
  return (
    <svg
      viewBox="0 0 640 310"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label="MALA FAMA"
      className={className}
    >
      {/* LÍNEA 1: M Λ L Λ */}
      {/* M */}
      <path
        d="M12 142V14H66L100 84L134 14H188V142H144V64L114 126H86L56 64V142H12Z"
        fill={color}
      />
      {/* Λ (A1) */}
      <path
        d="M204 142L262 14H312L370 142H320L287 64L254 142H204Z"
        fill={color}
      />
      {/* L */}
      <path
        d="M384 14H432V104H494V142H384V14Z"
        fill={color}
      />
      {/* Λ (A2) */}
      <path
        d="M492 142L550 14H600L636 142H586L574 64L542 142H492Z"
        fill={color}
      />

      {/* LÍNEA 2: F Λ M Λ */}
      {/* F */}
      <path
        d="M12 296V168H154V206H60V222H136V258H60V296H12Z"
        fill={color}
      />
      {/* Λ (A3) */}
      <path
        d="M150 296L208 168H258L316 296H266L233 218L200 296H150Z"
        fill={color}
      />
      {/* M */}
      <path
        d="M328 296V168H382L416 238L450 168H504V296H460V218L430 280H402L372 218V296H328Z"
        fill={color}
      />
      {/* Λ (A4) */}
      <path
        d="M506 296L564 168H614L636 296H586L576 218L556 296H506Z"
        fill={color}
      />
    </svg>
  );
};

/**
 * Símbolo Λ sin travesaño para viñetas, indicadores y acentos.
 */
export const LambdaMark: React.FC<{
  color?: string;
  className?: string;
}> = ({ color = '#FFF0D4', className = 'w-4 h-4' }) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden="true"
    className={className}
  >
    <path d="M2 21L9.8 3H14.2L22 21H17L12 8.8L7 21H2Z" fill={color} />
  </svg>
);

/**
 * Patrón repetido de Λ sin travesaño para bordes y divisores.
 */
export const LambdaBorderPattern: React.FC<{
  fill?: string;
  bg?: string;
  className?: string;
}> = ({ fill = '#0B0B0B', bg = 'transparent', className = 'w-full h-7' }) => {
  const patternId = React.useId();
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      className={className}
      preserveAspectRatio="none"
    >
      <defs>
        <pattern
          id={patternId}
          width="36"
          height="28"
          patternUnits="userSpaceOnUse"
        >
          {bg !== 'transparent' && (
            <rect width="36" height="28" fill={bg} />
          )}
          <path
            d="M2 28L15 2H21L34 28H26.5L18 10L9.5 28H2Z"
            fill={fill}
          />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill={`url(#${patternId})`} />
    </svg>
  );
};

/**
 * Trazo de grafiti con punta afilada para tachar o subrayar palabras clave.
 */
export const GraffitiStroke: React.FC<{
  variant?: 'underline' | 'strike' | 'slash';
  color?: string;
  className?: string;
}> = ({ variant = 'underline', color = '#FFF0D4', className = '' }) => {
  if (variant === 'strike') {
    return (
      <svg
        viewBox="0 0 280 42"
        fill="none"
        preserveAspectRatio="none"
        aria-hidden="true"
        className={`pointer-events-none ${className}`}
      >
        <path
          d="M3 24C52 19 130 13 212 16C240 17 262 19 277 15C242 22 168 25 94 27C52 28 21 31 6 33L3 24Z"
          fill={color}
        />
        <path
          d="M16 18L265 11L274 14L20 22Z"
          fill={color}
          opacity="0.85"
        />
      </svg>
    );
  }

  if (variant === 'slash') {
    return (
      <svg
        viewBox="0 0 300 46"
        fill="none"
        preserveAspectRatio="none"
        aria-hidden="true"
        className={`pointer-events-none ${className}`}
      >
        <path
          d="M4 34C64 25 148 16 296 7C254 18 170 28 74 37C41 40 18 42 5 41L4 34Z"
          fill={color}
        />
      </svg>
    );
  }

  return (
    <svg
      viewBox="0 0 260 28"
      fill="none"
      preserveAspectRatio="none"
      aria-hidden="true"
      className={`pointer-events-none ${className}`}
    >
      <path
        d="M2 18C55 12 142 7 258 10C214 16 135 19 42 23C20 24 8 25 3 24L2 18Z"
        fill={color}
      />
      <path
        d="M190 7L254 8L244 13L182 11Z"
        fill={color}
      />
    </svg>
  );
};
