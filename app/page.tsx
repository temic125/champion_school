'use client';

import { useState, useEffect, useRef } from 'react';
import '../lib/i18n';

// Components
import Header from '@/components/Header';
import HeroSection from '@/components/HeroSection';
import StatsSection from '@/components/StatsSection';
import PainSection from '@/components/PainSection';
import SolutionSection from '@/components/SolutionSection';
import FormatsSection from '@/components/FormatsSection';
import DemoAccessSection from '@/components/DemoAccessSection';
import ProgramSection from '@/components/ProgramSection';
import DocumentsSection from '@/components/DocumentsSection';
import TeamSection from '@/components/TeamSection';
import CTASection from '@/components/CTASection';
import ReviewsSection from '@/components/ReviewsSection';
import FAQSection from '@/components/FAQSection';
import TrainingShowcaseSection from '@/components/TrainingShowcaseSection';
import FitnessWorldSection from '@/components/FitnessWorldSection';
import Footer from '@/components/Footer';
import Modal from '@/components/Modal';
import WhatsAppButton from '@/components/WhatsAppButton';

export default function Home() {
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState<'offline' | 'online'>('offline');
  const [timeLeft, setTimeLeft] = useState(30 * 60);
  const [showLangMenu, setShowLangMenu] = useState(false);

  // Section refs for smooth scroll
  const sectionRefs = {
    graphic: useRef<HTMLElement>(null),
    services: useRef<HTMLElement>(null),
    reviews: useRef<HTMLElement>(null),
    portfolio: useRef<HTMLElement>(null),
    team: useRef<HTMLElement>(null),
    contacts: useRef<HTMLElement>(null),
  };

  const handleScroll = (key: keyof typeof sectionRefs) => {
    sectionRefs[key]?.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    // Scroll to top on mount/reload
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
    
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 0) return 30 * 60;
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTime = (seconds: number) => {
    const h = Math.floor(seconds / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    const s = seconds % 60;
    return `${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  const openModal = (type: 'offline' | 'online') => {
    setModalType(type);
    setShowModal(true);
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a]">
      <Header 
        showLangMenu={showLangMenu}
        setShowLangMenu={setShowLangMenu}
        handleScroll={handleScroll}
      />
      
      <WhatsAppButton />

      {/* 1. Стань фитнес-тренером (оффер) */}
      <HeroSection ref={sectionRefs.graphic} openModal={openModal} />
      
      {/* 2. В цифрах (со всеми анимациями) */}
      <StatsSection />
      
      {/* 3. Это про тебя? */}
      <PainSection />
      
      {/* 4. Фитнес-тренер — это реальный выход */}
      <SolutionSection ref={sectionRefs.services} />
      
      {/* 5. Выбери свой формат */}
      <FormatsSection openModal={openModal} />
      
      {/* 6. Бесплатный доступ на 2 недели */}
      <DemoAccessSection 
        timeLeft={timeLeft}
        formatTime={formatTime}
        openModal={openModal}
      />
      
      {/* 7. Программа обучения */}
      <ProgramSection ref={sectionRefs.portfolio} />
      
      {/* 8. Что вы получаете */}
      <DocumentsSection />
      
      {/* 9. Лекторы */}
      <TeamSection ref={sectionRefs.team} />
      
      {/* 10. Готов(а) изменить доход, тело и окружение? */}
      <CTASection openModal={openModal} />
      
      {/* 11. Отзывы выпускников */}
      <ReviewsSection ref={sectionRefs.reviews} />
      
      {/* 12. Вопрос — Ответ */}
      <FAQSection />
      
      {/* 13. Наши тренировки */}
      <TrainingShowcaseSection />
      
      {/* 14. Попасть в мир фитнеса */}
      <FitnessWorldSection openModal={openModal} />
      
      <Footer ref={sectionRefs.contacts} />
      
      <Modal 
        showModal={showModal}
        setShowModal={setShowModal}
        modalType={modalType}
      />
    </div>
  );
}
