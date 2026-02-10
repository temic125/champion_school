'use client';

import { useState, useEffect, useRef } from 'react';
import '../lib/i18n';

// Components
import Header from '@/components/Header';
import HeroSection from '@/components/HeroSection';
import PainSection from '@/components/PainSection';
import SolutionSection from '@/components/SolutionSection';
import FormatsSection from '@/components/FormatsSection';
import DemoAccessSection from '@/components/DemoAccessSection';
import ProgramSection from '@/components/ProgramSection';
import TeamSection from '@/components/TeamSection';
import DocumentsSection from '@/components/DocumentsSection';
import ReviewsSection from '@/components/ReviewsSection';
import StatsSection from '@/components/StatsSection';
import TrainingShowcaseSection from '@/components/TrainingShowcaseSection';
import CTASection from '@/components/CTASection';
import Footer from '@/components/Footer';
import Modal from '@/components/Modal';
import WhatsAppButton from '@/components/WhatsAppButton';

export default function Home() {
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState<'offline' | 'online'>('offline');
  const [timeLeft, setTimeLeft] = useState(3 * 60 * 60);
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
        if (prev <= 0) return 3 * 60 * 60;
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

      <HeroSection ref={sectionRefs.graphic} openModal={openModal} />
      <PainSection />
      <SolutionSection ref={sectionRefs.services} />
      <FormatsSection openModal={openModal} />
      <DemoAccessSection 
        timeLeft={timeLeft}
        formatTime={formatTime}
        openModal={openModal}
      />
      <ProgramSection ref={sectionRefs.portfolio} />
      <TrainingShowcaseSection />
      <TeamSection ref={sectionRefs.team} />
      <DocumentsSection />
      <ReviewsSection ref={sectionRefs.reviews} />
      <StatsSection />
      <CTASection openModal={openModal} />
      
      <Footer ref={sectionRefs.contacts} />
      
      <Modal 
        showModal={showModal}
        setShowModal={setShowModal}
        modalType={modalType}
      />
    </div>
  );
}
