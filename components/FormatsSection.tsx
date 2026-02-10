'use client';

import { MapPin, Smartphone, Check } from 'lucide-react';
import { forwardRef, useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Image from 'next/image';

gsap.registerPlugin(ScrollTrigger);

interface FormatsSectionProps {
  openModal: (type: 'offline' | 'online') => void;
}

export default function FormatsSection({ openModal }: FormatsSectionProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const card1Ref = useRef<HTMLDivElement>(null);
  const card2Ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.set(titleRef.current, { y: 30, opacity: 0 });
      gsap.to(titleRef.current, {
        y: 0, opacity: 1, duration: 0.5, ease: 'power3.out',
        scrollTrigger: { trigger: titleRef.current, start: 'top 80%' }
      });

      gsap.set(card1Ref.current, { x: -50, opacity: 0 });
      gsap.to(card1Ref.current, {
        x: 0, opacity: 1, duration: 0.6, ease: 'power2.out',
        scrollTrigger: { trigger: sectionRef.current, start: 'top 70%' }
      });

      gsap.set(card2Ref.current, { x: 50, opacity: 0 });
      gsap.to(card2Ref.current, {
        x: 0, opacity: 1, duration: 0.6, ease: 'power2.out',
        scrollTrigger: { trigger: sectionRef.current, start: 'top 70%' }, delay: 0.15
      });
    });

    return () => ctx.revert();
  }, []);

  const offlineFeatures = [
    { text: 'Астана: тренажёрный зал + групповые программы' },
    { text: 'Алматы: тренажёрный зал' },
    { text: 'Практика во время обучения' },
    { text: '8 филиалов Champion Fitness в Астане' },
    { text: 'Реальная работа с клиентами' },
    { text: 'Доступ к онлайн-платформе включён' },
  ];

  const onlineFeatures = [
    { text: 'Тренер тренажёрного зала' },
    { text: 'Инструктор групповых программ' },
    { text: '3 тарифа на выбор' },
    { text: 'Пройти реально за 1 месяц' },
    { text: 'Доступ 24/7' },
    { text: 'Можно с телефона' },
  ];

  return (
    <section ref={sectionRef} id="formats" className="relative section-padding bg-gradient-to-b from-[#0a0a0a] via-[#0a0a0a] to-[#0a0a0a]">
      {/* Background image */}
      <div className="absolute inset-0 opacity-10">
        <Image
          src="/images/MAX07489.jpg"
          alt="Formats Background"
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a0a] via-[#0a0a0a]/90 to-[#0a0a0a]" />
      </div>

      <div className="divider-glow absolute top-0 left-0 right-0" />

      <div className="container mx-auto px-4 md:px-6">
        <h2 ref={titleRef} className="text-4xl md:text-5xl lg:text-6xl font-black text-center text-white mb-16 font-road-radio">
          Выбери свой формат
        </h2>

        <div className="grid lg:grid-cols-2 gap-6 max-w-6xl mx-auto">
          {/* OFFLINE */}
          <div ref={card1Ref} className="relative group rounded-2xl overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-b from-[#20B5C9]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <div className="glass-card rounded-2xl p-8 md:p-10 h-full relative border-[#20B5C9]/20 hover:border-[#20B5C9]/40 transition-colors duration-300" style={{ borderWidth: '1px' }}>
              <div className="flex items-center gap-4 mb-8">
                <div className="w-14 h-14 rounded-2xl bg-[#20B5C9]/10 flex items-center justify-center">
                  <MapPin className="h-7 w-7 text-[#20B5C9]" />
                </div>
                <div>
                  <h3 className="text-2xl md:text-3xl font-black text-white font-road-radio">Офлайн</h3>
                  <p className="text-white/40 text-sm font-gilroy">Астана • Алматы</p>
                </div>
              </div>

              <div className="space-y-4 mb-10">
                {offlineFeatures.map((f, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <div className="w-5 h-5 rounded-full bg-[#20B5C9]/10 flex items-center justify-center shrink-0 mt-0.5">
                      <Check className="h-3 w-3 text-[#20B5C9]" />
                    </div>
                    <p className="font-gilroy text-white/60 text-sm leading-relaxed">{f.text}</p>
                  </div>
                ))}
              </div>

              <button 
                onClick={() => openModal('offline')}
                className="w-full bg-[#20B5C9] text-white px-6 py-4 rounded-[60px] text-base font-bold hover:shadow-[0_0_40px_rgba(32,181,201,0.3)] hover:scale-[1.03] transition-[transform,box-shadow] duration-300 font-gilroy"
              >
                Записаться на бесплатную консультацию
              </button>
            </div>
          </div>

          {/* ONLINE */}
          <div ref={card2Ref} className="relative group rounded-2xl overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-b from-[#fff100]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <div className="glass-card rounded-2xl p-8 md:p-10 h-full relative border-white/10 hover:border-[#fff100]/20 transition-colors duration-300" style={{ borderWidth: '1px' }}>
              <div className="flex items-center gap-4 mb-8">
                <div className="w-14 h-14 rounded-2xl bg-[#fff100]/10 flex items-center justify-center">
                  <Smartphone className="h-7 w-7 text-[#fff100]" />
                </div>
                <div>
                  <h3 className="text-2xl md:text-3xl font-black text-white font-road-radio">Онлайн</h3>
                  <p className="text-white/40 text-sm font-gilroy">Весь Казахстан</p>
                </div>
              </div>

              <div className="space-y-4 mb-10">
                {onlineFeatures.map((f, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <div className="w-5 h-5 rounded-full bg-[#fff100]/10 flex items-center justify-center shrink-0 mt-0.5">
                      <Check className="h-3 w-3 text-[#fff100]" />
                    </div>
                    <p className="font-gilroy text-white/60 text-sm leading-relaxed">{f.text}</p>
                  </div>
                ))}
              </div>

              <button 
                onClick={() => openModal('online')}
                className="w-full bg-white/5 text-white px-6 py-4 rounded-[60px] text-base font-bold border border-white/10 hover:bg-white/10 hover:border-white/20 hover:scale-[1.03] transition-[transform,background-color,border-color] duration-300 font-gilroy"
              >
                Получить бесплатный демо-доступ
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
