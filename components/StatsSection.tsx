'use client';

import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

function AnimatedCounter({ target, suffix = '', duration = 2 }: { target: number; suffix?: string; duration?: number }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    if (!ref.current) return;

    const trigger = ScrollTrigger.create({
      trigger: ref.current,
      start: 'top 85%',
      onEnter: () => {
        if (hasAnimated.current) return;
        hasAnimated.current = true;
        const obj = { val: 0 };
        gsap.to(obj, {
          val: target,
          duration: duration,
          ease: 'power2.out',
          onUpdate: () => setCount(Math.floor(obj.val)),
        });
      },
    });

    return () => trigger.kill();
  }, [target, duration]);

  return (
    <div ref={ref} className="text-4xl md:text-5xl lg:text-6xl font-black text-[#20B5C9] font-road-radio leading-none">
      {count}{suffix}
    </div>
  );
}

export default function StatsSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const itemsRef = useRef<HTMLDivElement>(null);
  const marqueeRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.set(titleRef.current, { y: 30, opacity: 0 });
      gsap.to(titleRef.current, {
        y: 0, opacity: 1, duration: 0.5, ease: 'power3.out',
        scrollTrigger: { trigger: titleRef.current, start: 'top 80%' }
      });

      if (itemsRef.current) {
        const items = itemsRef.current.children;
        gsap.set(items, { y: 30, opacity: 0 });
        gsap.to(items, {
          y: 0, opacity: 1, duration: 0.5, ease: 'power2.out',
          stagger: 0.1,
          scrollTrigger: { trigger: itemsRef.current, start: 'top 80%' }
        });
      }
    });

    return () => ctx.revert();
  }, []);

  const stats = [
    { value: 6, suffix: '', label: 'лет на рынке', duration: 2 },
    { value: 2500, suffix: '+', label: 'учеников', duration: 3.5 },
    { value: 55, suffix: '+', label: 'потоков онлайн', duration: 2 },
    { value: 160, suffix: '+', label: 'потоков офлайн', duration: 2.5 },
    { value: 8, suffix: '', label: 'своих фитнес-клубов', duration: 2 },
    { value: 1, suffix: '', label: 'оздоровительный центр', duration: 1.5 },
  ];

  return (
    <section ref={sectionRef} className="relative section-padding bg-gradient-to-b from-[#0a0a0a] via-[#0d0d0d] to-[#0a0a0a] overflow-hidden">
      <div className="divider-glow absolute top-0 left-0 right-0" />

      {/* Marquee background text */}
      <div ref={marqueeRef} className="absolute top-1/2 -translate-y-1/2 whitespace-nowrap overflow-hidden w-full pointer-events-none opacity-[0.02]">
        <div className="animate-marquee inline-block">
          <span className="text-[150px] font-black font-road-radio text-white">
            CHAMPION SCHOOL • FITNESS TRAINER • CHAMPION SCHOOL • FITNESS TRAINER • 
          </span>
          <span className="text-[150px] font-black font-road-radio text-white">
            CHAMPION SCHOOL • FITNESS TRAINER • CHAMPION SCHOOL • FITNESS TRAINER • 
          </span>
        </div>
      </div>

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <h2 ref={titleRef} className="text-4xl md:text-5xl lg:text-6xl font-black text-center text-white mb-16 font-road-radio">
          В цифрах
        </h2>

        <div ref={itemsRef} className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-16 md:gap-12 lg:gap-16">
          {stats.map((stat, i) => (
            <div key={i} className="text-center">
              <AnimatedCounter target={stat.value} suffix={stat.suffix} duration={stat.duration} />
              <p className="text-white/30 font-gilroy text-xs md:text-sm mt-3 uppercase tracking-wider">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
