'use client';

import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ChevronDown } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const faqs = [
  {
    question: 'Нужно ли иметь опыт в фитнесе для обучения?',
    answer: 'Нет, наша программа подходит как для новичков, так и для тех, кто хочет систематизировать свои знания и получить официальную квалификацию. Мы начинаем с основ и постепенно углубляемся в профессиональные темы.'
  },
  {
    question: 'Какой документ я получу после окончания обучения?',
    answer: 'После успешного окончания обучения вы получите диплом о профессиональной переподготовке и международный сертификат, которые признаются фитнес-клубами по всему Казахстану.'
  },
  {
    question: 'Сколько длится обучение?',
    answer: 'Программа обучения рассчитана на 3-6 месяцев в зависимости от выбранного формата. Офлайн обучение — 3 месяца интенсива, онлайн — до 6 месяцев с гибким графиком.'
  },
  {
    question: 'Помогаете ли вы с трудоустройством?',
    answer: 'Да, мы сотрудничаем с ведущими фитнес-клубами Казахстана. Лучших выпускников мы рекомендуем нашим партнерам. Также помогаем составить резюме и подготовиться к собеседованию.'
  },
  {
    question: 'Можно ли оплатить обучение частями?',
    answer: 'Да, мы предоставляем возможность рассрочки платежа на удобный для вас срок. Подробности можно уточнить на бесплатной консультации.'
  },
  {
    question: 'Что входит в онлайн-формат обучения?',
    answer: 'Онлайн-формат включает видеолекции, домашние задания, проверку от кураторов, доступ к закрытому сообществу учеников и чат с преподавателями для обратной связи.'
  },
  {
    question: 'Сколько можно зарабатывать после обучения?',
    answer: 'Средний доход начинающего тренера — от 300 000 ₸ в месяц. Опытные специалисты зарабатывают от 500 000 до 1 000 000 ₸ и более, в зависимости от количества клиентов и специализации.'
  },
  {
    question: 'Есть ли возрастные ограничения?',
    answer: 'Минимальный возраст для обучения — 18 лет. Максимальных ограничений нет. У нас учатся люди разных возрастов, главное — желание развиваться в фитнес-индустрии.'
  }
];

export default function FAQSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const itemsRef = useRef<(HTMLDivElement | null)[]>([]);
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Title animation
      gsap.fromTo(titleRef.current,
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 70%'
          }
        }
      );

      // Items stagger animation
      gsap.fromTo(itemsRef.current,
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.6,
          stagger: 0.1,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 60%'
          }
        }
      );
    });

    return () => ctx.revert();
  }, []);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section ref={sectionRef} className="relative py-24 md:py-32 bg-gradient-to-b from-[#0a0a0a] via-[#0d0d0d] to-[#0a0a0a] overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-[#20B5C9]/5 blur-[150px] pointer-events-none" />
      
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <h2 ref={titleRef} className="text-4xl md:text-5xl lg:text-6xl font-black text-white mb-16 text-center font-road-radio">
          Вопрос — <span className="gradient-text">Ответ</span>
        </h2>

        <div className="max-w-3xl mx-auto space-y-4">
          {faqs.map((faq, index) => (
            <div
              key={index}
              ref={(el) => { itemsRef.current[index] = el; }}
              className="glass-card rounded-2xl overflow-hidden border border-white/10 hover:border-[#20B5C9]/30 transition-colors duration-300"
            >
              <button
                onClick={() => toggleFAQ(index)}
                className="w-full px-6 md:px-8 py-5 md:py-6 flex items-center justify-between gap-4 text-left group"
              >
                <h3 className="text-base md:text-lg font-bold text-white font-gilroy group-hover:text-[#20B5C9] transition-colors">
                  {faq.question}
                </h3>
                <ChevronDown
                  className={`w-5 h-5 text-[#20B5C9] shrink-0 transition-transform duration-300 ${
                    openIndex === index ? 'rotate-180' : ''
                  }`}
                />
              </button>
              
              <div
                className={`overflow-hidden transition-all duration-300 ease-out ${
                  openIndex === index ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                }`}
              >
                <div className="px-6 md:px-8 pb-5 md:pb-6">
                  <p className="text-white/60 font-gilroy leading-relaxed text-sm md:text-base">
                    {faq.answer}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}