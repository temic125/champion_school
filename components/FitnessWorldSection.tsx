'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Sparkles } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

interface FitnessWorldSectionProps {
  openModal: (type: 'offline' | 'online') => void;
}

export default function FitnessWorldSection({ openModal }: FitnessWorldSectionProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Floating glow
      gsap.to(glowRef.current, {
        x: 40, y: -30, duration: 6, ease: 'sine.inOut', repeat: -1, yoyo: true
      });

      gsap.set(contentRef.current, { y: 40, opacity: 0 });
      gsap.to(contentRef.current, {
        y: 0, opacity: 1, duration: 0.8, ease: 'power3.out',
        scrollTrigger: { trigger: sectionRef.current, start: 'top 75%' }
      });

      gsap.set(buttonRef.current, { scale: 0.9, opacity: 0 });
      gsap.to(buttonRef.current, {
        scale: 1, opacity: 1, duration: 0.6, ease: 'back.out(1.5)',
        scrollTrigger: { trigger: sectionRef.current, start: 'top 70%' }, delay: 0.3
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="relative py-24 md:py-32 bg-gradient-to-b from-[#0a0a0a] via-[#0d0d0d] to-[#0a0a0a] overflow-hidden">
      {/* Glow */}
      <div ref={glowRef} className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full bg-[#20B5C9]/8 blur-[180px] pointer-events-none" />

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <div ref={contentRef}>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-[#20B5C9]/30 bg-[#20B5C9]/5 mb-8">
              <Sparkles className="w-4 h-4 text-[#20B5C9]" />
              <span className="text-[#20B5C9] font-gilroy text-sm tracking-wider uppercase">Последний шаг</span>
            </div>
            
            <h2 className="text-5xl md:text-6xl lg:text-7xl font-black text-white mb-6 font-road-radio leading-[0.95]">
              ПОПАСТЬ<br />
              <span className="gradient-text">В МИР ФИТНЕСА</span>
            </h2>
            
            <p className="text-lg md:text-xl text-white/50 mb-12 font-gilroy max-w-2xl mx-auto leading-relaxed">
              Начни свою карьеру в фитнес-индустрии прямо сейчас.<br />
              Получи бесплатный доступ на 2 недели и убедись сам.
            </p>
          </div>

          <button 
            ref={buttonRef}
            onClick={() => openModal('online')}
            className="bg-[#20B5C9] text-white px-12 py-6 rounded-[60px] text-xl font-black hover:bg-[#1a9fb0] hover:scale-[1.02] transition-all duration-300 font-road-radio inline-flex items-center gap-3"
          >
            <Sparkles className="w-6 h-6" />
            Получить бесплатный доступ
          </button>
        </div>
      </div>
    </section>
  );
}
