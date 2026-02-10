'use client';

import { forwardRef, useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Image from 'next/image';

gsap.registerPlugin(ScrollTrigger);

const TrainingShowcaseSection = forwardRef<HTMLElement>((props, ref) => {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const imagesRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.set(titleRef.current, { y: 30, opacity: 0 });
      gsap.to(titleRef.current, {
        y: 0, opacity: 1, duration: 0.5, ease: 'power3.out',
        scrollTrigger: { trigger: titleRef.current, start: 'top 80%' }
      });

      if (imagesRef.current) {
        const items = imagesRef.current.children;
        gsap.set(items, { y: 60, opacity: 0, scale: 0.9 });
        gsap.to(items, {
          y: 0, opacity: 1, scale: 1, duration: 0.6, ease: 'power3.out',
          stagger: 0.08,
          scrollTrigger: { trigger: imagesRef.current, start: 'top 75%' }
        });
      }
    });

    return () => ctx.revert();
  }, []);

  const showcaseImages = [
    { src: '/images/MAX07131.jpg', alt: 'Тренировка 1' },
    { src: '/images/MAX07371.jpg', alt: 'Тренировка 2' },
    { src: '/images/MAX07450.jpg', alt: 'Тренировка 3' },
    { src: '/images/MAX07596.jpg', alt: 'Тренировка 4' },
  ];

  return (
    <section ref={(node) => {
      (sectionRef as React.MutableRefObject<HTMLElement | null>).current = node;
      if (typeof ref === 'function') ref(node);
      else if (ref) (ref as React.MutableRefObject<HTMLElement | null>).current = node;
    }} className="relative section-padding bg-gradient-to-b from-[#0a0a0a] via-[#111111] to-[#0a0a0a]">
      {/* Subtle glow */}
      <div className="absolute top-1/2 left-0 w-[600px] h-[600px] bg-[#fff100]/3 rounded-full blur-[200px] pointer-events-none" />

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <h2 ref={titleRef} className="text-4xl md:text-5xl lg:text-6xl font-black text-center mb-16 font-road-radio">
          <span className="gradient-text">Наши тренировки</span>
        </h2>

        <div ref={imagesRef} className="max-w-7xl mx-auto grid md:grid-cols-2 gap-6">
          {showcaseImages.map((img, i) => (
            <div
              key={i}
              className="relative aspect-[4/3] rounded-2xl overflow-hidden group cursor-pointer"
            >
              <Image
                src={img.src}
                alt={img.alt}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-110"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
});

TrainingShowcaseSection.displayName = 'TrainingShowcaseSection';

export default TrainingShowcaseSection;
