'use client';

import { Star, Quote } from 'lucide-react';
import { forwardRef, useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Image from 'next/image';

gsap.registerPlugin(ScrollTrigger);

const ReviewsSection = forwardRef<HTMLElement>((props, ref) => {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.set(titleRef.current, { y: 30, opacity: 0 });
      gsap.to(titleRef.current, {
        y: 0, opacity: 1, duration: 0.5, ease: 'power3.out',
        scrollTrigger: { trigger: titleRef.current, start: 'top 80%' }
      });

      if (cardsRef.current) {
        const cards = cardsRef.current.children;
        gsap.set(cards, { y: 40, opacity: 0 });
        gsap.to(cards, {
          y: 0, opacity: 1, duration: 0.5, ease: 'power3.out',
          stagger: 0.1,
          scrollTrigger: { trigger: cardsRef.current, start: 'top 75%' }
        });
      }
    });

    return () => ctx.revert();
  }, []);

  const reviews = [
    {
      name: "Алия Смагулова",
      role: "Фитнес-тренер",
      content: "Champion School дала мне не просто диплом, а реальные навыки. Сейчас работаю в топовом фитнес-клубе и веду групповые занятия!",
      rating: 5,
      photo: "/images/MAX07835.jpg"
    },
    {
      name: "Ержан Нұрғали",
      role: "Персональный тренер",
      content: "Преподаватели - практикующие профессионалы. Каждое занятие - новые знания и опыт. Трудоустроился еще до окончания курса!",
      rating: 5,
      photo: "/images/MAX07742.jpg"
    },
    {
      name: "Дина Касымова",
      role: "Тренер по функциональному тренингу",
      content: "Лучшее вложение в себя! Получила профессию мечты, нашла единомышленников и изменила свою жизнь через спорт.",
      rating: 5,
      photo: "/images/MAX07862.jpg"
    },
  ];

  return (
    <section ref={(node) => {
      (sectionRef as React.MutableRefObject<HTMLElement | null>).current = node;
      if (typeof ref === 'function') ref(node);
      else if (ref) (ref as React.MutableRefObject<HTMLElement | null>).current = node;
    }} id="reviews" className="relative section-padding bg-gradient-to-b from-[#0a0a0a] via-[#0d0d0d] to-[#0a0a0a]">
      <div className="absolute bottom-0 left-1/4 w-[600px] h-[400px] bg-[#20B5C9]/3 rounded-full blur-[200px] pointer-events-none" />

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <h2 ref={titleRef} className="text-4xl md:text-5xl lg:text-6xl font-black text-center text-white mb-16 font-road-radio">
          Отзывы выпускников
        </h2>

        <div ref={cardsRef} className="max-w-6xl mx-auto grid md:grid-cols-3 gap-6">
          {reviews.map((review, i) => (
            <div key={i} className="glass-card-hover rounded-2xl p-7 flex flex-col group">
              {/* Quote icon */}
              <div className="w-10 h-10 rounded-xl bg-[#20B5C9]/10 flex items-center justify-center mb-5 group-hover:bg-[#20B5C9]/20 transition-colors">
                <Quote className="h-5 w-5 text-[#20B5C9]" />
              </div>

              {/* Stars */}
              <div className="flex gap-1 mb-4">
                {[...Array(review.rating)].map((_, j) => (
                  <Star key={j} className="h-4 w-4 text-[#fff100] fill-current" />
                ))}
              </div>

              {/* Content */}
              <p className="text-white/60 font-gilroy text-sm leading-relaxed flex-1 mb-6">
                &ldquo;{review.content}&rdquo;
              </p>

              {/* Author */}
              <div className="flex items-center gap-3 pt-5 border-t border-white/5">
                <div className="w-9 h-9 rounded-full overflow-hidden relative">
                  <Image
                    src={review.photo}
                    alt={review.name}
                    fill
                    className="object-cover"
                    sizes="36px"
                  />
                </div>
                <div>
                  <p className="text-sm font-bold text-white font-road-radio">{review.name}</p>
                  <p className="text-xs text-white/30 font-gilroy">{review.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
});

ReviewsSection.displayName = 'ReviewsSection';

export default ReviewsSection;
