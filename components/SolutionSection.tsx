'use client';

import { useTranslation } from 'react-i18next';
import { DollarSign, Calendar, Heart } from 'lucide-react';
import { forwardRef, useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const SolutionSection = forwardRef<HTMLElement>((props, ref) => {
  const { t } = useTranslation();
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.set(titleRef.current, { y: 30, opacity: 0 });
      gsap.to(titleRef.current, {
        y: 0, opacity: 1, duration: 0.5, ease: 'power3.out',
        scrollTrigger: { trigger: titleRef.current, start: 'top 80%' }
      });

      gsap.set(subtitleRef.current, { y: 20, opacity: 0 });
      gsap.to(subtitleRef.current, {
        y: 0, opacity: 1, duration: 0.4, ease: 'power3.out',
        scrollTrigger: { trigger: subtitleRef.current, start: 'top 80%' }
      });

      if (cardsRef.current) {
        const cards = cardsRef.current.children;
        gsap.set(cards, { y: 50, opacity: 0, scale: 0.9 });
        gsap.to(cards, {
          y: 0, opacity: 1, scale: 1, duration: 0.6, ease: 'back.out(1.4)',
          stagger: 0.12,
          scrollTrigger: { trigger: cardsRef.current, start: 'top 75%' }
        });
      }
    });

    return () => ctx.revert();
  }, []);

  const solutions = [
    {
      icon: DollarSign,
      title: t('highIncome'),
      desc: t('highIncomeDesc'),
      color: '#20B5C9',
      gradient: 'from-[#20B5C9]/20 to-[#20B5C9]/5',
    },
    {
      icon: Calendar,
      title: t('flexSchedule'),
      desc: t('flexScheduleDesc'),
      color: '#fff100',
      gradient: 'from-[#fff100]/15 to-[#fff100]/5',
    },
    {
      icon: Heart,
      title: t('strongBody'),
      desc: t('strongBodyDesc'),
      color: '#20B5C9',
      gradient: 'from-[#20B5C9]/20 to-[#20B5C9]/5',
    },
  ];

  return (
    <section ref={(node) => {
      (sectionRef as React.MutableRefObject<HTMLElement | null>).current = node;
      if (typeof ref === 'function') ref(node);
      else if (ref) (ref as React.MutableRefObject<HTMLElement | null>).current = node;
    }} className="relative section-padding bg-gradient-to-b from-[#0a0a0a] via-[#0d0d0d] to-[#0a0a0a]">
      {/* Subtle glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-[#20B5C9]/5 rounded-full blur-[150px] pointer-events-none" />

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <h2 ref={titleRef} className="text-4xl md:text-5xl lg:text-6xl font-black text-center text-white mb-4 font-road-radio">
          {t('solutionTitle')}
        </h2>
        <p ref={subtitleRef} className="text-center text-lg md:text-xl text-white/40 mb-16 font-gilroy max-w-2xl mx-auto">
          {t('solutionSubtitle')}
        </p>

        <div ref={cardsRef} className="max-w-5xl mx-auto grid md:grid-cols-3 gap-6">
          {solutions.map((item, i) => {
            const Icon = item.icon;
            return (
              <div key={i} className="relative group">
                <div className="glass-card-hover rounded-2xl p-8 h-full text-center relative overflow-hidden">
                  {/* Gradient bg on hover */}
                  <div className={`absolute inset-0 bg-gradient-to-b ${item.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
                  
                  <div className="relative z-10">
                    <div className="w-16 h-16 rounded-2xl mx-auto mb-6 flex items-center justify-center" style={{ backgroundColor: `${item.color}15` }}>
                      <Icon className="h-8 w-8" style={{ color: item.color }} />
                    </div>
                    <h3 className="text-xl md:text-2xl font-bold text-white mb-3 font-road-radio">{item.title}</h3>
                    <p className="text-white/50 font-gilroy leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
});

SolutionSection.displayName = 'SolutionSection';

export default SolutionSection;
