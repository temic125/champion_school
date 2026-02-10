'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Zap } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

interface DemoAccessSectionProps {
  timeLeft: number;
  formatTime: (seconds: number) => string;
  openModal: (type: 'offline' | 'online') => void;
}

export default function DemoAccessSection({ timeLeft, formatTime, openModal }: DemoAccessSectionProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const timerRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.set(contentRef.current, { y: 30, opacity: 0 });
      gsap.to(contentRef.current, {
        y: 0, opacity: 1, duration: 0.6, ease: 'power3.out',
        scrollTrigger: { trigger: sectionRef.current, start: 'top 75%' }
      });

      gsap.set(timerRef.current, { scale: 0.9, opacity: 0 });
      gsap.to(timerRef.current, {
        scale: 1, opacity: 1, duration: 0.5, ease: 'back.out(1.4)',
        scrollTrigger: { trigger: sectionRef.current, start: 'top 70%' }, delay: 0.2
      });

      gsap.set(buttonRef.current, { y: 20, opacity: 0 });
      gsap.to(buttonRef.current, {
        y: 0, opacity: 1, duration: 0.5, ease: 'power2.out',
        scrollTrigger: { trigger: sectionRef.current, start: 'top 70%' }, delay: 0.4
      });
    });

    return () => ctx.revert();
  }, []);

  const timeStr = formatTime(timeLeft);
  const parts = timeStr.split(':');

  return (
    <section ref={sectionRef} className="relative py-20 md:py-28 bg-gradient-to-b from-[#0a0a0a] via-[#111111] to-[#0a0a0a] overflow-hidden">
      {/* Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-[#fff100]/5 blur-[200px] pointer-events-none" />

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="max-w-3xl mx-auto text-center">
          <div ref={contentRef}>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-[#fff100]/20 bg-[#fff100]/5 mb-6">
              <Zap className="w-4 h-4 text-[#fff100]" />
              <span className="text-[#fff100] font-gilroy text-sm tracking-wider uppercase">Бесплатное предложение</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-black text-white mb-4 font-road-radio">
              Бесплатный доступ на 2 недели
            </h2>
            <p className="text-lg text-white/40 mb-10 font-gilroy">
              Ознакомься с платформой, лекторами и программой
            </p>
          </div>

          {/* Timer */}
          <div ref={timerRef} className="flex justify-center gap-4 mb-10">
            {[
              { value: parts[0], label: 'часов' },
              { value: parts[1], label: 'минут' },
              { value: parts[2], label: 'секунд' },
            ].map((item, i) => (
              <div key={i} className="glass-card rounded-2xl px-6 py-5 min-w-[90px]">
                <div className="text-4xl md:text-5xl font-black text-[#20B5C9] font-road-radio leading-none">{item.value}</div>
                <div className="text-xs text-white/30 font-gilroy mt-2 uppercase tracking-wider">{item.label}</div>
              </div>
            ))}
          </div>

          <button 
            ref={buttonRef}
            onClick={() => openModal('online')}
            className="bg-[#fff100] text-[#0a0a0a] px-10 py-5 rounded-[60px] text-lg font-black hover:bg-[#e6dc00] hover:scale-[1.02] transition-all duration-300 font-road-radio inline-flex items-center gap-2"
          >
            <Zap className="w-5 h-5" />
            Получить демо-доступ бесплатно
          </button>
        </div>
      </div>
    </section>
  );
}
