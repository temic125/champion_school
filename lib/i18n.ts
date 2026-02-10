import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const resources = {
  ru: {
    translation: {
      // Navigation
      graphic: "ГЛАВНАЯ",
      services: "ОБУЧЕНИЕ",
      reviews: "ОТЗЫВЫ",
      portfolio: "ПРОГРАММА",
      team: "ЛЕКТОРЫ",
      contacts: "КОНТАКТЫ",
      
      // Languages
      russian: "Русский",
      kazakh: "Қазақша",
      english: "English",
      
      // Hero section
      heroTitle1: "Стань фитнес-тренером и зарабатывай",
      heroTitle2: "от 500 000 ₸ в месяц",
      heroTitle3: "уже в первые месяцы работы",
      heroSubtitle: "Профессия с гибким графиком, сильным здоровьем и окружением",
      income: "Доход 500k+ ₸",
      schedule: "Свободный график",
      health: "Физическая форма",
      industry: "Фитнес-индустрия",
      wantOffline: "Хочу офлайн → Бесплатная консультация",
      wantOnline: "Хочу онлайн → Бесплатный демо-доступ",
      
      // Pain section
      painTitle: "Это про тебя?",
      pain1: "Устал(а) работать за копейки",
      pain2: "Нет роста и перспектив",
      pain3: "Сидячая работа → плохое здоровье",
      pain4: "Нет времени жить",
      pain5: "Ненавижу офис / начальников",
      pain6: "Хочу зарабатывать на том, что нравится",
      painConclusion: "Если ты узнал(а) себя —",
      painSolution: "у нас есть решение",
      
      // Solution section
      solutionTitle: "Фитнес-тренер — это реальный выход",
      solutionSubtitle: "Смени жизнь, тело и доход за несколько месяцев",
      highIncome: "Доход выше среднего",
      highIncomeDesc: "От 500 000 ₸ в первые месяцы",
      flexSchedule: "Гибкий график",
      flexScheduleDesc: "Работай когда удобно тебе",
      strongBody: "Сильное тело",
      strongBodyDesc: "Энергия и здоровье каждый день",
      
      // Buttons
      bookConsultation: "Записаться на бесплатную консультацию",
      getDemo: "Получить бесплатный демо-доступ",
      getDemoFree: "Получить демо-доступ бесплатно",
      learnMore: "Смотреть полную программу в WhatsApp",
    }
  },
  kz: {
    translation: {
      // Navigation
      graphic: "БАС БЕТ",
      services: "ОҚЫТУ",
      reviews: "ПІКІРЛЕР",
      portfolio: "БАҒДАРЛАМА",
      team: "ОҚЫТУШЫЛАР",
      contacts: "БАЙЛАНЫС",
      
      // Languages
      russian: "Русский",
      kazakh: "Қазақша",
      english: "English",
      
      // Hero section
      heroTitle1: "Фитнес-жаттықтырушы бол және табыс тап",
      heroTitle2: "айына 500 000 ₸-дан",
      heroTitle3: "жұмыстың алғашқы айларында",
      heroSubtitle: "Икемді кестемен, күшті денсаулықпен және қоршаумен мамандық",
      income: "Табыс 500k+ ₸",
      schedule: "Еркін кесте",
      health: "Физикалық форма",
      industry: "Фитнес индустриясы",
      wantOffline: "Офлайн → Тегін кеңес",
      wantOnline: "Онлайн → Тегін демо-қатынас",
      
      // Pain section
      painTitle: "Бұл сіз туралы ма?",
      pain1: "Тиынға жұмыс істеуден шаршадым",
      pain2: "Өсу мен болашақ жоқ",
      pain3: "Отырып жұмыс → нашар денсаулық",
      pain4: "Өмір сүруге уақыт жоқ",
      pain5: "Кеңсені / басшыларды жек көремін",
      pain6: "Ұнайтын нәрседен табыс тапқым келеді",
      painConclusion: "Егер өзіңді таныған болсаң —",
      painSolution: "бізде шешім бар",
      
      // Solution section
      solutionTitle: "Фитнес-жаттықтырушы — бұл нақты шығу жолы",
      solutionSubtitle: "Өмірді, денені және табысты бірнеше айда өзгерт",
      highIncome: "Орташадан жоғары табыс",
      highIncomeDesc: "Алғашқы айларда 500 000 ₸-дан",
      flexSchedule: "Икемді кесте",
      flexScheduleDesc: "Өзіңе ыңғайлы кезде жұмыс істе",
      strongBody: "Күшті дене",
      strongBodyDesc: "Күн сайын энергия мен денсаулық",
      
      // Buttons
      bookConsultation: "Тегін кеңеске жазылу",
      getDemo: "Тегін демо-қатынасты алу",
      getDemoFree: "Тегін демо-қатынасты алу",
      learnMore: "WhatsApp-та толық бағдарламаны көру",
    }
  },
  en: {
    translation: {
      // Navigation
      graphic: "HOME",
      services: "TRAINING",
      reviews: "REVIEWS",
      portfolio: "PROGRAM",
      team: "INSTRUCTORS",
      contacts: "CONTACTS",
      
      // Languages
      russian: "Русский",
      kazakh: "Қазақша",
      english: "English",
      
      // Hero section
      heroTitle1: "Become a fitness trainer and earn",
      heroTitle2: "from 500,000 ₸ per month",
      heroTitle3: "in the first months of work",
      heroSubtitle: "A profession with a flexible schedule, strong health and environment",
      income: "Income 500k+ ₸",
      schedule: "Flexible schedule",
      health: "Physical fitness",
      industry: "Fitness industry",
      wantOffline: "Offline → Free consultation",
      wantOnline: "Online → Free demo access",
      
      // Pain section
      painTitle: "Is this about you?",
      pain1: "Tired of working for pennies",
      pain2: "No growth and prospects",
      pain3: "Sedentary work → poor health",
      pain4: "No time to live",
      pain5: "I hate the office / bosses",
      pain6: "I want to earn from what I really like",
      painConclusion: "If you recognized yourself —",
      painSolution: "we have a solution",
      
      // Solution section
      solutionTitle: "Fitness trainer is a real way out",
      solutionSubtitle: "Change your life, body and income in a few months",
      highIncome: "Above average income",
      highIncomeDesc: "From 500,000 ₸ in the first months",
      flexSchedule: "Flexible schedule",
      flexScheduleDesc: "Work when it's convenient for you",
      strongBody: "Strong body",
      strongBodyDesc: "Energy and health every day",
      
      // Buttons
      bookConsultation: "Book a free consultation",
      getDemo: "Get free demo access",
      getDemoFree: "Get demo access for free",
      learnMore: "View full program in WhatsApp",
    }
  }
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: 'ru',
    fallbackLng: 'ru',
    interpolation: {
      escapeValue: false
    }
  });

export default i18n;
