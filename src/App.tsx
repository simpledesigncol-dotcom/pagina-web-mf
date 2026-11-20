import { useCallback, useEffect, useRef, useState } from 'react';
import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { CustomCursor } from './components/CustomCursor';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { ManifestoSection } from './components/ManifestoSection';
import { TypicalVsMalaFama } from './components/TypicalVsMalaFama';
import { MethodSection } from './components/MethodSection';
import { NoPricingSection } from './components/NoPricingSection';
import { CasesSection } from './components/CasesSection';
import { QueHablenWall } from './components/QueHablenWall';
import { CaseFormSection } from './components/CaseFormSection';
import { Footer } from './components/Footer';

gsap.registerPlugin(ScrollTrigger);

export default function App() {
  const lenisRef = useRef<Lenis | null>(null);
  const [prefilledObjective, setPrefilledObjective] = useState('');

  useEffect(() => {
    const reducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches;

    if (reducedMotion) {
      return;
    }

    const lenis = new Lenis({
      duration: 1.1,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });

    lenisRef.current = lenis;
    lenis.on('scroll', ScrollTrigger.update);

    const updateTicker = (time: number) => {
      lenis.raf(time * 1000);
    };

    gsap.ticker.add(updateTicker);
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(updateTicker);
      lenis.destroy();
      lenisRef.current = null;
    };
  }, []);

  const scrollToSection = useCallback((targetId: string) => {
    const el = document.getElementById(targetId);
    if (!el) return;

    if (lenisRef.current) {
      lenisRef.current.scrollTo(el, { offset: 0 });
    } else {
      el.scrollIntoView({ behavior: 'auto' });
    }
  }, []);

  const handleSelectObjectiveForForm = useCallback(
    (objectiveText: string) => {
      setPrefilledObjective(objectiveText);
      scrollToSection('contacto');
    },
    [scrollToSection]
  );

  return (
    <div className="min-h-screen bg-[#FF1A17] text-[#FFF0D4] selection:bg-[#0B0B0B] selection:text-[#FFF0D4]">
      <CustomCursor />
      <Navbar onScrollTo={scrollToSection} />

      <main>
        <HeroSection onScrollDown={() => scrollToSection('manifiesto')} />
        <ManifestoSection />
        <TypicalVsMalaFama />
        <MethodSection />
        <NoPricingSection
          onSelectObjectiveForForm={handleSelectObjectiveForForm}
        />
        <CasesSection />
        <QueHablenWall />
        <CaseFormSection prefilledObjective={prefilledObjective} />
      </main>

      <Footer />
    </div>
  );
}
