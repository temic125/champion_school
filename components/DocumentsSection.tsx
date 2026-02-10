'use client';

import { Award, GraduationCap } from 'lucide-react';
import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function DocumentsSection() {
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
        gsap.set(cards, { y: 40, opacity: 0, scale: 0.95 });
        gsap.to(cards, {
          y: 0, opacity: 1, scale: 1, duration: 0.5, ease: 'back.out(1.3)',
          stagger: 0.15,
          scrollTrigger: { trigger: cardsRef.current, start: 'top 75%' }
        });
      }
    });

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="documents" className="relative section-padding bg-gradient-to-b from-[#0a0a0a] via-[#0a0a0a] to-[#0a0a0a]">
      <div className="divider-glow absolute top-0 left-0 right-0" />

      <div className="container mx-auto px-4 md:px-6">
        <h2 ref={titleRef} className="text-4xl md:text-5xl lg:text-6xl font-black text-center text-white mb-4 font-road-radio">
          Что вы получаете
        </h2>
        <p ref={subtitleRef} className="text-center text-lg text-white/40 mb-16 font-gilroy">
          Официальные документы и реальные навыки
        </p>

        <div ref={cardsRef} className="max-w-3xl mx-auto grid md:grid-cols-2 gap-6">
          <div className="glass-card-hover rounded-2xl p-8 text-center group">
            <div className="w-16 h-16 rounded-2xl bg-[#20B5C9]/10 mx-auto mb-5 flex items-center justify-center group-hover:bg-[#20B5C9]/20 transition-colors">
              <Award className="h-8 w-8 text-[#20B5C9]" />
            </div>
            <h3 className="text-xl font-bold text-white mb-3 font-road-radio">Сертификат ISO 9001</h3>
            <p className="text-white/40 font-gilroy text-sm leading-relaxed">Международный стандарт качества обучения</p>
          </div>
          <div className="glass-card-hover rounded-2xl p-8 text-center group">
            <div className="w-16 h-16 rounded-2xl bg-[#fff100]/10 mx-auto mb-5 flex items-center justify-center group-hover:bg-[#fff100]/20 transition-colors">
              <GraduationCap className="h-8 w-8 text-[#fff100]" />
            </div>
            <h3 className="text-xl font-bold text-white mb-3 font-road-radio">Свидетельство</h3>
            <p className="text-white/40 font-gilroy text-sm leading-relaxed">При успешной сдаче экзамена</p>
          </div>
        </div>
      </div>
    </section>
  );
}
