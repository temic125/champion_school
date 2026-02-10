'use client';

import { useTranslation } from 'react-i18next';
import { MapPin, Smartphone, ArrowDown } from 'lucide-react';
import { forwardRef, useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Image from 'next/image';

gsap.registerPlugin(ScrollTrigger);

interface HeroSectionProps {
  openModal: (type: 'offline' | 'online') => void;
}

const HeroSection = forwardRef<HTMLElement, HeroSectionProps>(({ openModal }, ref) => {
  const { t } = useTranslation();
  const sectionRef = useRef<HTMLElement>(null);
  const tagRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);
  const button1Ref = useRef<HTMLButtonElement>(null);
  const button2Ref = useRef<HTMLButtonElement>(null);
  const scrollIndicatorRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Glow background animation
      gsap.to(glowRef.current, {
        x: 50, y: -30, duration: 6, ease: 'sine.inOut', repeat: -1, yoyo: true
      });

      // Tag line
      gsap.set(tagRef.current, { y: 20, opacity: 0 });
      gsap.to(tagRef.current, {
        y: 0, opacity: 1, duration: 0.6, ease: 'power3.out', delay: 0.8
      });

      // Title
      gsap.set(titleRef.current, { y: 60, opacity: 0 });
      gsap.to(titleRef.current, {
        y: 0, opacity: 1, duration: 0.8, ease: 'power3.out', delay: 1.0
      });

      // Subtitle
      gsap.set(subtitleRef.current, { y: 30, opacity: 0 });
      gsap.to(subtitleRef.current, {
        y: 0, opacity: 1, duration: 0.6, ease: 'power3.out', delay: 1.3
      });

      // Stats
      if (statsRef.current) {
        const items = statsRef.current.children;
        gsap.set(items, { y: 30, opacity: 0 });
        gsap.to(items, {
          y: 0, opacity: 1, duration: 0.5, ease: 'power2.out', stagger: 0.08, delay: 1.5
        });
      }

      // Buttons
      const buttons = [button1Ref.current, button2Ref.current];
      gsap.set(buttons, { y: 30, opacity: 0 });
      gsap.to(buttons, {
        y: 0, opacity: 1, duration: 0.6, ease: 'power2.out', stagger: 0.1, delay: 1.7
      });

      // Scroll indicator
      gsap.set(scrollIndicatorRef.current, { opacity: 0 });
      gsap.to(scrollIndicatorRef.current, { opacity: 1, duration: 0.5, delay: 2.2 });
      gsap.to(scrollIndicatorRef.current, {
        y: 10, duration: 1.2, ease: 'sine.inOut', repeat: -1, yoyo: true, delay: 2.5
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <section ref={(node) => {
      (sectionRef as React.MutableRefObject<HTMLElement | null>).current = node;
      if (typeof ref === 'function') ref(node);
      else if (ref) (ref as React.MutableRefObject<HTMLElement | null>).current = node;
    }} className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[#0a0a0a]">
      {/* Background image */}
      <div className="absolute inset-0 opacity-80">
        <Image
          src="/images/MAX07135.jpg"
          alt="Champion School Background"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a0a] via-[#0a0a0a]/80 to-[#0a0a0a]" />
      </div>

      {/* Background glow orbs */}
      <div ref={glowRef} className="absolute top-1/4 left-1/3 w-[600px] h-[600px] rounded-full bg-[#20B5C9]/8 blur-[150px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] rounded-full bg-[#fff100]/5 blur-[120px] pointer-events-none" />
      
      {/* Grid background */}
      <div className="absolute inset-0 grid-bg opacity-50" />

      <div className="container mx-auto px-4 md:px-6 relative z-10 pt-32 pb-20">
        <div className="max-w-5xl mx-auto text-center">
          {/* Tag */}
          <div ref={tagRef} className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-[#20B5C9]/30 bg-[#20B5C9]/5 mb-8">
            <span className="w-2 h-2 rounded-full bg-[#20B5C9] animate-pulse" />
            <span className="text-[#20B5C9] font-gilroy text-sm tracking-wider uppercase">С 2019 года • 2500+ выпускников</span>
          </div>

          {/* Title */}
          <h1 ref={titleRef} className="text-5xl md:text-6xl lg:text-[80px] font-black text-white mb-8 font-road-radio leading-[0.95] tracking-tight">
            {t('heroTitle1')}<br />
            <span className="text-[#20B5C9]">{t('heroTitle2')}</span><br />
            <span className="text-white/60">{t('heroTitle3')}</span>
          </h1>
          
          {/* Subtitle */}
          <p ref={subtitleRef} className="text-lg md:text-xl text-white/50 mb-14 font-gilroy max-w-2xl mx-auto leading-relaxed">
            {t('heroSubtitle')}
          </p>

          {/* Stats row */}
          <div ref={statsRef} className="flex flex-wrap justify-center gap-8 md:gap-12 mb-14">
            {[
              { value: '500K+ ₸', label: t('income') },
              { value: '24/7', label: t('schedule') },
              { value: '100%', label: t('health') },
              { value: '#1', label: t('industry') },
            ].map((stat, i) => (
              <div key={i} className="text-center">
                <div className="text-lg md:text-xl font-black text-[#20B5C9] font-road-radio">{stat.value}</div>
                <div className="text-xs md:text-sm text-white/40 font-gilroy mt-1 uppercase tracking-wider">{stat.label}</div>
              </div>
            ))}
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button 
              ref={button1Ref}
              onClick={() => openModal('offline')}
              className="group relative bg-[#20B5C9] text-white px-8 py-5 rounded-[60px] text-lg font-bold hover:bg-[#1a9fb0] hover:scale-[1.02] transition-all duration-300 font-gilroy flex items-center justify-center gap-3"
            >
              <MapPin className="h-5 w-5" />
              {t('wantOffline')}
            </button>
            <button 
              ref={button2Ref}
              onClick={() => openModal('online')}
              className="group relative bg-white/5 text-white px-8 py-5 rounded-[60px] text-lg font-bold border border-white/10 hover:bg-white/10 hover:border-white/20 transition-colors font-gilroy flex items-center justify-center gap-3"
            >
              <Smartphone className="h-5 w-5" />
              {t('wantOnline')}
            </button>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div ref={scrollIndicatorRef} className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2">
        <span className="text-white/30 text-xs font-gilroy uppercase tracking-widest">Scroll</span>
        <ArrowDown className="w-4 h-4 text-white/30" />
      </div>
    </section>
  );
});

HeroSection.displayName = 'HeroSection';

export default HeroSection;