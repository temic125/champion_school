'use client';

import { X } from 'lucide-react';
import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

interface ModalProps {
  showModal: boolean;
  setShowModal: (show: boolean) => void;
  modalType: 'offline' | 'online';
}

export default function Modal({ showModal, setShowModal, modalType }: ModalProps) {
  const overlayRef = useRef<HTMLDivElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (showModal && overlayRef.current && panelRef.current) {
      gsap.set(overlayRef.current, { opacity: 0 });
      gsap.to(overlayRef.current, { opacity: 1, duration: 0.3, ease: 'power2.out' });

      gsap.set(panelRef.current, { scale: 0.9, opacity: 0, y: 20 });
      gsap.to(panelRef.current, {
        scale: 1, opacity: 1, y: 0, duration: 0.4, ease: 'back.out(1.5)', delay: 0.1
      });
    }
  }, [showModal]);

  const handleClose = () => {
    if (overlayRef.current && panelRef.current) {
      gsap.to(panelRef.current, { scale: 0.9, opacity: 0, y: 20, duration: 0.2, ease: 'power2.in' });
      gsap.to(overlayRef.current, {
        opacity: 0, duration: 0.2, delay: 0.1, onComplete: () => setShowModal(false)
      });
    } else {
      setShowModal(false);
    }
  };

  if (!showModal) return null;

  return (
    <div ref={overlayRef} className="fixed inset-0 bg-black/70 backdrop-blur-sm z-[100] flex items-center justify-center p-4" onClick={handleClose}>
      <div ref={panelRef} className="glass-card rounded-2xl p-8 max-w-md w-full border-white/10" style={{ borderWidth: '1px', background: 'rgba(17, 17, 17, 0.95)' }} onClick={(e) => e.stopPropagation()}>
        <div className="flex justify-between items-center mb-8">
          <div>
            <h3 className="text-xl font-bold text-white font-road-radio">
              {modalType === 'offline' ? 'Бесплатная консультация' : 'Бесплатный демо-доступ'}
            </h3>
            <p className="text-white/30 text-sm font-gilroy mt-1">Заполните форму и мы свяжемся с вами</p>
          </div>
          <button onClick={handleClose} className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center text-white/40 hover:text-white hover:bg-white/10 transition-colors">
            <X className="h-4 w-4" />
          </button>
        </div>

        <form className="space-y-5">
          <div>
            <label className="block text-xs font-bold text-white/40 mb-2 font-gilroy uppercase tracking-wider">Ваше имя</label>
            <input 
              type="text" 
              className="w-full px-4 py-3.5 bg-white/5 border border-white/10 rounded-xl text-white font-gilroy text-sm placeholder-white/20 focus:border-[#20B5C9]/50 focus:outline-none focus:ring-1 focus:ring-[#20B5C9]/30 transition-all"
              placeholder="Введите имя"
            />
          </div>
          <div>
            <label className="block text-xs font-bold text-white/40 mb-2 font-gilroy uppercase tracking-wider">Телефон</label>
            <input 
              type="tel" 
              className="w-full px-4 py-3.5 bg-white/5 border border-white/10 rounded-xl text-white font-gilroy text-sm placeholder-white/20 focus:border-[#20B5C9]/50 focus:outline-none focus:ring-1 focus:ring-[#20B5C9]/30 transition-all"
              placeholder="+7 (___) ___-__-__"
            />
          </div>
          <button 
            type="submit"
            className="w-full bg-[#20B5C9] text-white px-6 py-4 rounded-[60px] text-base font-bold hover:shadow-[0_0_40px_rgba(32,181,201,0.3)] hover:scale-[1.03] transition-[transform,box-shadow] duration-300 font-gilroy mt-2"
          >
            {modalType === 'offline' ? 'Записаться на консультацию' : 'Получить демо-доступ'}
          </button>
        </form>

        <p className="text-[10px] text-white/20 text-center mt-5 font-gilroy">
          Нажимая кнопку, вы соглашаетесь с политикой конфиденциальности
        </p>
      </div>
    </div>
  );
}
