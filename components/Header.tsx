'use client';

import Image from 'next/image';
import { useTranslation } from 'react-i18next';
import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';

interface HeaderProps {
  showLangMenu: boolean;
  setShowLangMenu: (show: boolean) => void;
  handleScroll: (key: 'graphic' | 'services' | 'reviews' | 'portfolio' | 'team' | 'contacts') => void;
}

export default function Header({ showLangMenu, setShowLangMenu, handleScroll }: HeaderProps) {
  const { t, i18n } = useTranslation();
  const headerRef = useRef<HTMLDivElement>(null);
  const navRef = useRef<HTMLElement>(null);
  const langRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);
  const [isClosing, setIsClosing] = useState(false);
  
  useEffect(() => {
    if (headerRef.current && navRef.current && langRef.current && logoRef.current) {
      const tl = gsap.timeline();
      
      // Сначала header появляется сверху по центру с шириной только для логотипа
      tl.fromTo(
        headerRef.current,
        { 
          y: -100, 
          opacity: 0,
          width: '220px',
        },
        { 
          y: 0, 
          opacity: 1, 
          width: '220px',
          duration: 0.4, 
          ease: 'power3.easeOut',
          delay: 0.1 
        }
      )
      // Затем расширяется до полной ширины
      .to(
        headerRef.current,
        {
          width: '100%',
          duration: 0.5,
          ease: 'power2.inOut',
        }
      )
      // И появляются навигация и язык
      .fromTo(
        [navRef.current, langRef.current],
        { 
          opacity: 0,
          scale: 0.8,
        },
        {
          opacity: 1,
          scale: 1,
          duration: 0.3,
          ease: 'back.out(1.5)',
          stagger: 0.05
        },
        '-=0.2'
      );
    }
  }, []);
  
  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
    setIsClosing(true);
    setTimeout(() => {
      setShowLangMenu(false);
      setIsClosing(false);
    }, 300);
  };

  const toggleLangMenu = () => {
    if (showLangMenu) {
      setIsClosing(true);
      setTimeout(() => {
        setShowLangMenu(false);
        setIsClosing(false);
      }, 300);
    } else {
      setShowLangMenu(true);
    }
  };

  const languages = [
    { id: 'ru', name: 'Русский' },
    { id: 'kz', name: 'Қазақша' },
    { id: 'en', name: 'English' }
  ];

  return (
    <header className="fixed top-6 left-1/2 -translate-x-1/2 z-50 w-full max-w-5xl px-4">
      <div ref={headerRef} className="bg-[#0a0a0a]/80 backdrop-blur-xl shadow-2xl rounded-full px-6 py-3 border border-white/5 mx-auto" style={{ boxShadow: '0 10px 40px rgba(0, 0, 0, 0.4), 0 0 0 1px rgba(255, 255, 255, 0.03)' }}>
        <div className="flex items-center justify-between gap-6">
          {/* Logo */}
          <div ref={logoRef} className="flex items-center gap-2 shrink-0 relative">
            <Image 
              src="/logos/white_short_with_blue_bg.PNG" 
              alt="Champion School" 
              width={36} 
              height={36}
              className="object-contain"
            />
            <span className="text-white font-bold font-road-radio text-sm hidden sm:block">Champion School</span>
          </div>
          
          {/* Desktop Navigation Items */}
          <nav ref={navRef} className="hidden lg:flex items-center space-x-6 flex-1 justify-center opacity-0">
            <button 
              onClick={() => handleScroll('graphic')} 
              className="text-white hover:text-[#20B5C9] transition-colors font-gilroy text-sm uppercase tracking-wider cursor-pointer font-medium"
            >
              {t('graphic')}
            </button>
            <button 
              onClick={() => handleScroll('services')} 
              className="text-white hover:text-[#20B5C9] transition-colors font-gilroy text-sm uppercase tracking-wider cursor-pointer font-medium"
            >
              {t('services')}
            </button>
            <button 
              onClick={() => handleScroll('reviews')} 
              className="text-white hover:text-[#20B5C9] transition-colors font-gilroy text-sm uppercase tracking-wider cursor-pointer font-medium"
            >
              {t('reviews')}
            </button>
            <button 
              onClick={() => handleScroll('portfolio')} 
              className="text-white hover:text-[#20B5C9] transition-colors font-gilroy text-sm uppercase tracking-wider cursor-pointer font-medium"
            >
              {t('portfolio')}
            </button>
            <button 
              onClick={() => handleScroll('team')} 
              className="text-white hover:text-[#20B5C9] transition-colors font-gilroy text-sm uppercase tracking-wider cursor-pointer font-medium"
            >
              {t('team')}
            </button>
            <button 
              onClick={() => handleScroll('contacts')} 
              className="text-white hover:text-[#20B5C9] transition-colors font-gilroy text-sm uppercase tracking-wider cursor-pointer font-medium"
            >
              {t('contacts')}
            </button>
          </nav>

          {/* Mobile Menu Button */}
          <button className="lg:hidden text-white">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>

          {/* Language Selector */}
          <div ref={langRef} className="relative shrink-0 opacity-0">
            <button
              onClick={toggleLangMenu}
              className="flex items-center gap-2 text-gray-300 hover:text-[#20B5C9] transition-colors font-gilroy text-sm"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129" />
              </svg>
              <span className="uppercase text-xs">{i18n.language}</span>
              <svg 
                className="w-3 h-3 transition-transform duration-200" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
                style={{ transform: showLangMenu ? 'rotate(180deg)' : 'rotate(0deg)' }}
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>

            {/* Language Dropdown */}
            {(showLangMenu || isClosing) && (
              <div 
                className={`absolute right-0 mt-3 w-36 bg-[#1F242A]/95 backdrop-blur-xl rounded-xl shadow-xl border border-white/10 overflow-hidden origin-top ${
                  isClosing ? 'animate-dropdown-close' : 'animate-dropdown-open'
                }`}
              >
                {languages.map((lang) => (
                  <button
                    key={lang.id}
                    onClick={() => changeLanguage(lang.id)}
                    className={`w-full text-left px-4 py-2 font-gilroy text-sm transition ${
                      i18n.language === lang.id 
                        ? 'text-[#20B5C9] bg-white/5' 
                        : 'text-gray-300 hover:text-white hover:bg-white/10'
                    }`}
                  >
                    {lang.name}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
