'use client';

import { forwardRef, useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Image from 'next/image';

gsap.registerPlugin(ScrollTrigger);

const TeamSection = forwardRef<HTMLElement>((props, ref) => {
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
          y: 0, opacity: 1, scale: 1, duration: 0.5, ease: 'back.out(1.5)',
          stagger: 0.08,
          scrollTrigger: { trigger: cardsRef.current, start: 'top 75%' }
        });
      }
    });

    return () => ctx.revert();
  }, []);

  const lecturers = [
    {
      name: "Алмаз",
      experience: "10+ лет в фитнесе",
      specialty: "Специалист по тренажёрному залу и реабилитации",
      photo: "/images/MAX07222.jpg",
      accentColor: "#20B5C9",
    },
    {
      name: "Александр",
      experience: "8+ лет тренерства",
      specialty: "Эксперт по биомеханике и функциональному тренингу",
      photo: "/images/MAX07342.jpg",
      accentColor: "#fff100",
    },
    {
      name: "Роман",
      experience: "12+ лет опыта",
      specialty: "Спортивное питание и работа с клиентами",
      photo: "/images/MAX07540.jpg",
      accentColor: "#20B5C9",
    },
    {
      name: "Дана",
      experience: "7+ лет в индустрии",
      specialty: "Групповые программы и мотивация",
      photo: "/images/MAX07633.jpg",
      accentColor: "#fff100",
    },
  ];

  return (
    <section ref={(node) => {
      (sectionRef as React.MutableRefObject<HTMLElement | null>).current = node;
      if (typeof ref === 'function') ref(node);
      else if (ref) (ref as React.MutableRefObject<HTMLElement | null>).current = node;
    }} id="lecturers" className="relative section-padding bg-gradient-to-b from-[#0a0a0a] via-[#0d0d0d] to-[#0a0a0a]">
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#20B5C9]/3 rounded-full blur-[200px] pointer-events-none" />

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <h2 ref={titleRef} className="text-4xl md:text-5xl lg:text-6xl font-black text-center text-white mb-4 font-road-radio">
          Лекторы
        </h2>
        <p ref={subtitleRef} className="text-center text-lg text-white/40 mb-16 font-gilroy">
          Практикующие профессионалы с реальным опытом
        </p>

        <div ref={cardsRef} className="max-w-6xl mx-auto grid md:grid-cols-2 lg:grid-cols-4 gap-5">
          {lecturers.map((lecturer, i) => (
            <div key={i} className="glass-card-hover rounded-2xl p-6 text-center group cursor-default">
              {/* Avatar */}
              <div className="relative w-20 h-20 mx-auto mb-5">
                <div className="w-full h-full rounded-2xl overflow-hidden relative">
                  <Image
                    src={lecturer.photo}
                    alt={lecturer.name}
                    fill
                    className="object-cover"
                    sizes="80px"
                  />
                </div>
                {/* Status dot */}
                <div className="absolute -bottom-1 -right-1 w-4 h-4 rounded-full bg-[#25D366] border-2 border-[#111111]" />
              </div>

              <h3 className="text-xl font-bold text-white mb-1 font-road-radio">{lecturer.name}</h3>
              <p className="text-base font-bold mb-2 font-gilroy" style={{ color: lecturer.accentColor }}>{lecturer.experience}</p>
              <p className="text-white/40 font-gilroy text-sm leading-relaxed">{lecturer.specialty}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
});

TeamSection.displayName = 'TeamSection';

export default TeamSection;
