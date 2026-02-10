'use client';

import { Heart, Dumbbell, Users, GraduationCap, TrendingUp, Award, Brain, ShieldPlus, Stethoscope, ClipboardList } from 'lucide-react';
import { forwardRef, useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Image from 'next/image';

gsap.registerPlugin(ScrollTrigger);

const ProgramSection = forwardRef<HTMLElement>((props, ref) => {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);

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
        gsap.set(cards, { y: 30, opacity: 0 });
        gsap.to(cards, {
          y: 0, opacity: 1, duration: 0.4, ease: 'power2.out',
          stagger: 0.04,
          scrollTrigger: { trigger: cardsRef.current, start: 'top 75%' }
        });
      }

      gsap.set(ctaRef.current, { y: 30, opacity: 0, scale: 0.95 });
      gsap.to(ctaRef.current, {
        y: 0, opacity: 1, scale: 1, duration: 0.5, ease: 'back.out(1.3)',
        scrollTrigger: { trigger: ctaRef.current, start: 'top 85%' }
      });
    });

    return () => ctx.revert();
  }, []);

  const modules = [
    { title: "Анатомия", icon: Heart, number: "01" },
    { title: "Физиология", icon: Brain, number: "02" },
    { title: "Биомеханика", icon: TrendingUp, number: "03" },
    { title: "Кинезитерапия", icon: ShieldPlus, number: "04", desc: "бонус офлайн Астана" },
    { title: "Питание + спортпит", icon: Stethoscope, number: "05" },
    { title: "Первая медицинская помощь", icon: GraduationCap, number: "06", desc: "бонус офлайн Астана" },
    { title: "Психология работы с клиентами", icon: Users, number: "07" },
    { title: "Техника выполнения упражнений", icon: Dumbbell, number: "08" },
    { title: "Лечебно-физическая культура (ЛФК)", icon: ClipboardList, number: "09" },
    { title: "Составление индивидуальных тренировок", icon: Award, number: "10" },
  ];

  return (
    <section ref={(node) => {
      (sectionRef as React.MutableRefObject<HTMLElement | null>).current = node;
      if (typeof ref === 'function') ref(node);
      else if (ref) (ref as React.MutableRefObject<HTMLElement | null>).current = node;
    }} id="programs" className="relative section-padding bg-gradient-to-b from-[#0a0a0a] via-[#0d0d0d] to-[#0a0a0a]">
      {/* Background image */}
      <div className="absolute inset-0 opacity-10">
        <Image
          src="/images/MAX07468.jpg"
          alt="Program Background"
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a0a] via-[#0a0a0a]/90 to-[#0a0a0a]" />
      </div>

      <div className="divider-glow absolute top-0 left-0 right-0" />

      <div className="container mx-auto px-4 md:px-6">
        <h2 ref={titleRef} className="text-4xl md:text-5xl lg:text-6xl font-black text-center text-white mb-4 font-road-radio">
          Программа обучения
        </h2>
        <p ref={subtitleRef} className="text-center text-lg text-white/40 mb-16 font-gilroy max-w-2xl mx-auto">
          ВСЕ ТЕМЫ РАЗБИРАЮТСЯ ОФЛАЙН С ЛЕКТОРОМ (АСТАНА АЛМАТЫ)
        </p>

        <div ref={cardsRef} className="max-w-5xl mx-auto grid md:grid-cols-2 gap-4">
          {modules.map((item, i) => {
            const Icon = item.icon;
            return (
              <div key={i} className="glass-card-hover rounded-xl p-5 flex items-center gap-5 group cursor-default">
                <div className="text-white/10 font-road-radio text-3xl font-black w-10 shrink-0 group-hover:text-[#20B5C9]/30 transition-colors">
                  {item.number}
                </div>
                <div className="w-10 h-10 rounded-xl bg-[#20B5C9]/10 flex items-center justify-center shrink-0 group-hover:bg-[#20B5C9]/20 transition-colors">
                  <Icon className="h-5 w-5 text-[#20B5C9]" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-white font-road-radio">{item.title}</h3>
                  {item.desc && <p className="text-xs text-white/30 font-gilroy mt-0.5">{item.desc}</p>}
                </div>
              </div>
            );
          })}
        </div>

        <div ref={ctaRef} className="text-center mt-14">
          <a 
            href="https://wa.me/77771234567?text=Хочу%20узнать%20полную%20программу" 
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 bg-[#25D366] text-white px-8 py-4 rounded-2xl text-base font-bold hover:bg-[#1fb056] hover:scale-[1.02] transition-all duration-300 font-gilroy"
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
            </svg>
            Получить полную программу в WhatsApp
          </a>
        </div>
      </div>
    </section>
  );
});

ProgramSection.displayName = 'ProgramSection';

export default ProgramSection;
