'use client';

import { useTranslation } from 'react-i18next';
import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Ban, TrendingDown, Activity, Clock, Building2, Sparkles } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export default function PainSection() {
  const { t } = useTranslation();
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);
  const conclusionRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Divider line
      gsap.set(lineRef.current, { scaleX: 0 });
      gsap.to(lineRef.current, {
        scaleX: 1, duration: 1, ease: 'power2.inOut',
        scrollTrigger: { trigger: sectionRef.current, start: 'top 90%' }
      });

      // Title
      gsap.set(titleRef.current, { y: 30, opacity: 0 });
      gsap.to(titleRef.current, {
        y: 0, opacity: 1, duration: 0.5, ease: 'power3.out',
        scrollTrigger: { trigger: titleRef.current, start: 'top 80%' }
      });

      // Cards
      if (cardsRef.current) {
        const cards = cardsRef.current.children;
        gsap.set(cards, { y: 40, opacity: 0, scale: 0.95 });
        gsap.to(cards, {
          y: 0, opacity: 1, scale: 1, duration: 0.5, ease: 'power2.out',
          stagger: 0.06,
          scrollTrigger: { trigger: cardsRef.current, start: 'top 75%' }
        });
      }

      // Conclusion
      gsap.set(conclusionRef.current, { y: 20, opacity: 0, scale: 0.95 });
      gsap.to(conclusionRef.current, {
        y: 0, opacity: 1, scale: 1, duration: 0.5, ease: 'back.out(1.2)',
        scrollTrigger: { trigger: conclusionRef.current, start: 'top 85%' }
      });
    });

    return () => ctx.revert();
  }, []);

  const painIcons = [Ban, TrendingDown, Activity, Clock, Building2, Sparkles];

  return (
    <section ref={sectionRef} className="relative section-padding bg-gradient-to-b from-[#0a0a0a] via-[#0a0a0a] to-[#0a0a0a]">
      {/* Top divider */}
      <div ref={lineRef} className="divider-glow absolute top-0 left-0 right-0" />

      <div className="container mx-auto px-4 md:px-6">
        <h2 ref={titleRef} className="text-4xl md:text-5xl lg:text-6xl font-black text-center text-white mb-16 font-road-radio">
          {t('painTitle')}
        </h2>
        
        <div ref={cardsRef} className="max-w-5xl mx-auto grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {['pain1', 'pain2', 'pain3', 'pain4', 'pain5', 'pain6'].map((key, i) => {
            const Icon = painIcons[i];
            return (
              <div key={i} className="glass-card-hover rounded-2xl p-6 group cursor-default">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-red-500/10 flex items-center justify-center shrink-0 group-hover:bg-red-500/20 transition-colors">
                    <Icon className="h-5 w-5 text-red-400" />
                  </div>
                  <p className="text-base md:text-lg font-gilroy text-white/70 leading-relaxed">{t(key)}</p>
                </div>
              </div>
            );
          })}
        </div>

        <div ref={conclusionRef} className="text-center mt-16">
          <div className="inline-block px-8 py-5 rounded-2xl bg-[#20B5C9]/5 border border-[#20B5C9]/20">
            <p className="text-xl md:text-2xl font-bold text-white font-road-radio">
              {t('painConclusion')} <span className="gradient-text">{t('painSolution')}</span>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
