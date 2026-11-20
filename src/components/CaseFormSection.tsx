import React, { useEffect, useState } from 'react';
import { LambdaMark } from './BrandMarks';

/**
 * REEMPLAZAR ESTE NÚMERO POR EL WHATSAPP REAL DE MALA FAMA
 * (Código de país + número sin +, espacios ni guiones. Ej: 573001234567)
 */
const WHATSAPP_NUMBER_PLACEHOLDER = 'PONER_NUMERO';

interface CaseFormSectionProps {
  prefilledObjective: string;
}

export const CaseFormSection: React.FC<CaseFormSectionProps> = ({
  prefilledObjective,
}) => {
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [goal, setGoal] = useState('');
  const [tried, setTried] = useState('');
  const [name, setName] = useState('');
  const [contact, setContact] = useState('');
  const [error, setError] = useState('');
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    if (prefilledObjective) {
      setGoal(prefilledObjective);
      setSubmitted(false);
      setStep(1);
      setError('');
    }
  }, [prefilledObjective]);

  const handleNext = () => {
    setError('');
    if (step === 1) {
      if (goal.trim().length < 3) {
        setError('Cuéntanos qué quieres lograr en al menos unas palabras.');
        return;
      }
      setStep(2);
    } else if (step === 2) {
      if (tried.trim().length < 3) {
        setError('Dinos qué has intentado o si partes desde cero.');
        return;
      }
      setStep(3);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (step < 3) {
      handleNext();
      return;
    }

    if (name.trim().length < 2) {
      setError('Escribe tu nombre o el de tu marca.');
      return;
    }

    const cleanContact = contact.trim();
    const isEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(cleanContact);
    const digitsOnly = cleanContact.replace(/\D/g, '');
    const isPhone = digitsOnly.length >= 7;

    if (!isEmail && !isPhone) {
      setError('Déjanos un número de WhatsApp o un correo válido.');
      return;
    }

    setSubmitted(true);
  };

  const resetForm = () => {
    setSubmitted(false);
    setStep(1);
    setGoal('');
    setTried('');
    setName('');
    setContact('');
    setError('');
  };

  const whatsappMessage = encodeURIComponent(
    `Hola MALA FAMA. Soy ${name.trim() || 'una marca'}.\n\nObjetivo: ${goal.trim()}\nQué hemos intentado: ${tried.trim()}\nContacto: ${contact.trim()}`
  );
  const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER_PLACEHOLDER}?text=${whatsappMessage}`;

  return (
    <section
      id="contacto"
      className="relative w-full min-h-screen flex flex-col justify-center bg-[#FFF0D4] text-[#0B0B0B] px-5 py-24 md:px-12 lg:px-20"
    >
      <div className="mx-auto w-full max-w-[960px]">
        {!submitted ? (
          <form onSubmit={handleSubmit} noValidate>
            <div className="flex flex-wrap items-center justify-between gap-4 border-b-2 border-[#0B0B0B] pb-5 mb-12">
              <div className="flex items-center gap-3">
                <LambdaMark color="#FF1A17" className="w-4 h-4 shrink-0" />
                <span className="font-body text-xs sm:text-sm uppercase tracking-[0.2em] font-bold">
                  Cuéntanos tu caso
                </span>
              </div>
              <span className="font-display text-2xl md:text-3xl text-[#FF1A17] tabular-nums">
                0{step} / 03
              </span>
            </div>

            {/* PASO 1 */}
            {step === 1 && (
              <div className="space-y-8">
                <label
                  htmlFor="mf-goal"
                  className="block font-display text-[clamp(2.5rem,6.5vw,5.2rem)] leading-[0.92] text-[#0B0B0B]"
                >
                  ¿QUÉ QUIERES LOGRΛR?
                </label>
                <input
                  id="mf-goal"
                  type="text"
                  value={goal}
                  onChange={(e) => setGoal(e.target.value)}
                  placeholder="Ej: Quiero que mi marca deje de verse igual a las demás..."
                  className="w-full bg-transparent border-b-4 border-[#0B0B0B] py-4 font-body text-xl sm:text-2xl md:text-3xl text-[#0B0B0B] placeholder:text-[#0B0B0B]/35 focus:border-[#FF1A17] focus:outline-none"
                />
              </div>
            )}

            {/* PASO 2 */}
            {step === 2 && (
              <div className="space-y-8">
                <label
                  htmlFor="mf-tried"
                  className="block font-display text-[clamp(2.5rem,6.5vw,5.2rem)] leading-[0.92] text-[#0B0B0B]"
                >
                  ¿QUÉ HΛS INTENTΛDO HΛSTΛ ΛHORΛ?
                </label>
                <textarea
                  id="mf-tried"
                  rows={3}
                  value={tried}
                  onChange={(e) => setTried(e.target.value)}
                  placeholder="Ej: Pautar con descuentos, cambiar de agencia, publicar reels todos los días..."
                  className="w-full bg-transparent border-b-4 border-[#0B0B0B] py-4 font-body text-xl sm:text-2xl md:text-3xl text-[#0B0B0B] placeholder:text-[#0B0B0B]/35 focus:border-[#FF1A17] focus:outline-none resize-none"
                />
              </div>
            )}

            {/* PASO 3 */}
            {step === 3 && (
              <div className="space-y-8">
                <h2 className="font-display text-[clamp(2.5rem,6.5vw,5.2rem)] leading-[0.92] text-[#0B0B0B]">
                  ¿CÓMO TE ESCRIBIMOS?
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-2">
                  <div>
                    <label
                      htmlFor="mf-name"
                      className="block font-body text-xs uppercase tracking-[0.18em] font-bold text-[#0B0B0B]/70 mb-2"
                    >
                      Tu nombre o marca
                    </label>
                    <input
                      id="mf-name"
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Nombre / Marca"
                      className="w-full bg-transparent border-b-4 border-[#0B0B0B] py-3 font-body text-xl md:text-2xl text-[#0B0B0B] placeholder:text-[#0B0B0B]/35 focus:border-[#FF1A17] focus:outline-none"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="mf-contact"
                      className="block font-body text-xs uppercase tracking-[0.18em] font-bold text-[#0B0B0B]/70 mb-2"
                    >
                      WhatsApp o correo
                    </label>
                    <input
                      id="mf-contact"
                      type="text"
                      value={contact}
                      onChange={(e) => setContact(e.target.value)}
                      placeholder="+57 300... o correo@marca.co"
                      className="w-full bg-transparent border-b-4 border-[#0B0B0B] py-3 font-body text-xl md:text-2xl text-[#0B0B0B] placeholder:text-[#0B0B0B]/35 focus:border-[#FF1A17] focus:outline-none"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Mensaje de validación */}
            {error && (
              <p
                role="alert"
                className="mt-6 font-body text-base font-bold text-[#FF1A17]"
              >
                {error}
              </p>
            )}

            {/* Controles del formulario paso a paso */}
            <div className="mt-12 flex flex-wrap items-center justify-between gap-4">
              {step > 1 ? (
                <button
                  type="button"
                  onClick={() => {
                    setError('');
                    setStep((prev) => (prev === 3 ? 2 : 1));
                  }}
                  className="font-body text-base font-bold uppercase tracking-[0.14em] text-[#0B0B0B] hover:text-[#FF1A17] py-3 px-2 transition-colors"
                >
                  ← Atrás
                </button>
              ) : (
                <span className="font-body text-sm text-[#0B0B0B]/60">
                  Sin formularios eternos.
                </span>
              )}

              {step < 3 ? (
                <button
                  type="button"
                  onClick={handleNext}
                  className="mf-btn-graffiti bg-[#0B0B0B] text-[#FFF0D4] hover:bg-[#FF1A17] font-display text-xl md:text-2xl tracking-wider px-8 py-4 transition-colors"
                >
                  <span>Siguiente →</span>
                </button>
              ) : (
                <button
                  type="submit"
                  className="mf-btn-graffiti bg-[#FF1A17] text-[#FFF0D4] hover:bg-[#0B0B0B] font-display text-xl md:text-2xl tracking-wider px-8 py-4 transition-colors"
                >
                  <span>Enviar caso</span>
                </button>
              )}
            </div>
          </form>
        ) : (
          <div className="bg-[#0B0B0B] text-[#FFF0D4] p-8 sm:p-12 md:p-16 border-4 border-[#0B0B0B]">
            <p className="font-body text-xs uppercase tracking-[0.22em] text-[#FF1A17] font-bold mb-5">
              Caso recibido · {name}
            </p>

            <h2 className="font-display text-[clamp(2.2rem,5.5vw,4.5rem)] leading-[0.94] text-[#FFF0D4] mb-8">
              Te responderemos con una primera hipótesis, no con una cotización.
            </h2>

            <div className="border-t border-b border-[#FFF0D4]/20 py-5 mb-8 space-y-2 font-body text-sm sm:text-base text-[#FFF0D4]/80">
              <p>
                <strong className="text-[#FFF0D4]">Objetivo:</strong> {goal}
              </p>
              <p>
                <strong className="text-[#FFF0D4]">Contacto:</strong> {contact}
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-5">
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="mf-btn-graffiti bg-[#FF1A17] text-[#FFF0D4] hover:bg-[#FFF0D4] hover:text-[#0B0B0B] font-display text-xl md:text-2xl tracking-wider px-8 py-4 transition-colors"
              >
                <span>Abrir en WhatsApp [PONER NÚMERO]</span>
              </a>

              <button
                type="button"
                onClick={resetForm}
                className="font-body text-sm uppercase tracking-[0.16em] text-[#FFF0D4]/70 hover:text-[#FFF0D4] py-3 px-2"
              >
                Enviar otro caso
              </button>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
