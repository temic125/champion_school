'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

interface CTASectionProps {
  openModal: (type: 'offline' | 'online') => void;
}

export default function CTASection({ openModal }: CTASectionProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const button1Ref = useRef<HTMLButtonElement>(null);
  const button2Ref = useRef<HTMLButtonElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Floating glow
      gsap.to(glowRef.current, {
        x: 30, 
        y: -20, 
        duration: 5, 
        ease: 'sine.inOut', 
        repeat: -1, 
        yoyo: true
      });

      // Title animation
      gsap.fromTo(titleRef.current,
        { scale: 0.9, opacity: 0 },
        {
          scale: 1, 
          opacity: 1, 
          duration: 0.6, 
          ease: 'back.out(1.7)',
          scrollTrigger: { 
            trigger: sectionRef.current, 
            start: 'top 70%' 
          }
        }
      );

      // Subtitle animation
      gsap.fromTo(subtitleRef.current,
        { y: 20, opacity: 0 },
        {
          y: 0, 
          opacity: 1, 
          duration: 0.5, 
          ease: 'power3.out',
          delay: 0.1,
          scrollTrigger: { 
            trigger: sectionRef.current, 
            start: 'top 70%' 
          }
        }
      );

      // Buttons animation - отдельно каждую кнопку
      const buttons = [button1Ref.current, button2Ref.current];
      
      gsap.fromTo(buttons,
        { y: 30, opacity: 0, scale: 0.9 },
        {
          y: 0, 
          opacity: 1, 
          scale: 1, 
          duration: 0.5, 
          ease: 'back.out(1.5)',
          stagger: 0.1,
          delay: 0.3,
          scrollTrigger: { 
            trigger: sectionRef.current, 
            start: 'top 70%' 
          }
        }
      );
    });

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="relative py-24 md:py-32 bg-gradient-to-b from-[#0a0a0a] via-[#111111] to-[#0a0a0a] overflow-hidden">
      {/* Background glow */}
      <div ref={glowRef} className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[600px] rounded-full bg-[#20B5C9]/8 blur-[200px] pointer-events-none" />
      
      <div className="container mx-auto px-4 md:px-6 text-center relative z-10">
        <h2 ref={titleRef} className="text-4xl md:text-5xl lg:text-7xl font-black text-white mb-6 font-road-radio leading-[0.95]">
          Готов(а) изменить<br />
          <span className="gradient-text">доход, тело и окружение?</span>
        </h2>
        
        <p ref={subtitleRef} className="text-lg md:text-xl text-white/40 mb-12 max-w-2xl mx-auto font-gilroy">
          Начни карьеру в фитнесе уже сейчас
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button 
            ref={button1Ref}
            onClick={() => openModal('offline')}
            className="group bg-[#20B5C9] text-white px-8 py-5 rounded-[60px] text-lg font-bold hover:bg-[#1a9fb0] hover:scale-[1.02] transition-all duration-300 font-gilroy inline-flex items-center justify-center gap-3"
          >
            Офлайн → Бесплатная консультация
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </button>
          
          <button 
            ref={button2Ref}
            onClick={() => openModal('online')}
            className="group bg-white/5 text-white px-8 py-5 rounded-[60px] text-lg font-bold border border-white/10 hover:bg-white/10 hover:border-white/20 hover:scale-[1.03] transition-[transform,background-color,border-color] duration-300 font-gilroy inline-flex items-center justify-center gap-3"
          >
            Онлайн → Бесплатный демо-доступ
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </div>
    </section>
  );
}