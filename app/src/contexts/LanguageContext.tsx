'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export type Language = 'en' | 'kk' | 'ru';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

interface LanguageProviderProps {
  children: ReactNode;
}

export function LanguageProvider({ children }: LanguageProviderProps) {
  const [language, setLanguage] = useState<Language>('en');

  // Load language from localStorage on mount
  useEffect(() => {
    const savedLanguage = localStorage.getItem('tree-guardian-language') as Language;
    if (savedLanguage && ['en', 'kk', 'ru'].includes(savedLanguage)) {
      setLanguage(savedLanguage);
    }
  }, []);

  // Save language to localStorage when it changes
  useEffect(() => {
    localStorage.setItem('tree-guardian-language', language);
  }, [language]);

  // Translation function
  const t = (key: string): string => {
    const translations = {
      en: {
        // Navigation
        'nav.dashboard': 'Dashboard',
        'nav.plantTree': 'Plant Tree',
        'nav.myNFTs': 'My NFTs',
        'nav.trade': 'Trade',
        'nav.leaderboard': 'Leaderboard',
        
        // Header
        'header.title': 'Tree Guardian',
        'header.subtitle': 'Almaty Air Quality Initiative',
        
        // Hero Section
        'hero.title': 'Clear Almaty\'s Air',
        'hero.subtitle': 'with Solana',
        'hero.description': 'Mint NFTs to offset 20kg of CO₂ and track local air quality in real-time. Join the movement to create a cleaner, healthier future for Almaty.',
        'hero.livePM25': 'Live PM2.5:',
        'hero.mintNFT': 'Mint Your NFT',
        'hero.viewDashboard': 'View Dashboard',
        'hero.feature1': 'Real-time PM2.5 monitoring',
        'hero.feature2': 'Location-based tree planting',
        'hero.feature3': 'Tradeable impact tokens',
        
        // Dashboard
        'dashboard.title': 'Almaty Air Quality',
        'dashboard.subtitle': 'Real-time PM2.5 monitoring and analysis',
        'dashboard.pm25Unit': 'μg/m³ PM2.5',
        'dashboard.trend': 'Trend',
        'dashboard.range': 'Range',
        'dashboard.last24Hours': 'Last 24 hours',
        'dashboard.lastUpdated': 'Last updated:',
        'dashboard.treeLocations': 'Tree Locations in Almaty',
        'dashboard.treeLocationsSubtitle': 'Interactive map showing tree planting impact',
        'dashboard.viewAllLocations': 'View all {count} locations',
        'dashboard.trees': 'trees',
        
        // Air Quality Status
        'airQuality.excellent': 'Excellent',
        'airQuality.good': 'Good',
        'airQuality.moderate': 'Moderate',
        'airQuality.unhealthy': 'Unhealthy',
        'airQuality.hazardous': 'Hazardous',
        
        // Air Quality Descriptions
        'airQuality.excellentDesc': 'Air quality is excellent. Perfect for outdoor activities.',
        'airQuality.goodDesc': 'Air quality is good. Suitable for most outdoor activities.',
        'airQuality.moderateDesc': 'Air quality is moderate. Sensitive individuals should limit outdoor activities.',
        'airQuality.unhealthyDesc': 'Air quality is unhealthy. Everyone should limit outdoor activities.',
        'airQuality.hazardousDesc': 'Air quality is hazardous. Avoid outdoor activities.',
        
        // Common
        'common.refresh': 'Refresh',
        'common.loading': 'Loading...',
        'common.error': 'Error',
        'common.success': 'Success',
        'common.cancel': 'Cancel',
        'common.confirm': 'Confirm',
        'common.close': 'Close',
        'common.save': 'Save',
        'common.edit': 'Edit',
        'common.delete': 'Delete',
        'common.view': 'View',
        'common.back': 'Back',
        'common.next': 'Next',
        'common.previous': 'Previous',
      },
      kk: {
        // Navigation
        'nav.dashboard': 'Басқару панелі',
        'nav.plantTree': 'Ағаш отырғызу',
        'nav.myNFTs': 'Менің NFT-тарым',
        'nav.trade': 'Сауда',
        'nav.leaderboard': 'Лидерлер кестесі',
        
        // Header
        'header.title': 'Ағаш Қорғаушы',
        'header.subtitle': 'Алматы ауа сапасы бастамасы',
        
        // Hero Section
        'hero.title': 'Алматы ауасын тазарту',
        'hero.subtitle': 'Solana арқылы',
        'hero.description': '20кг CO₂-ны өтеу үшін NFT-тар шығарыңыз және жергілікті ауа сапасын нақты уақытта бақылаңыз. Алматы үшін тазарақ, денсаулықты болашақ жасау қозғалысына қосылыңыз.',
        'hero.livePM25': 'Тікелей PM2.5:',
        'hero.mintNFT': 'NFT-ыңызды шығарыңыз',
        'hero.viewDashboard': 'Басқару панелін көру',
        'hero.feature1': 'Нақты уақытта PM2.5 мониторингі',
        'hero.feature2': 'Орналасуға негізделген ағаш отырғызу',
        'hero.feature3': 'Саудаланатын әсер токендері',
        
        // Dashboard
        'dashboard.title': 'Алматы ауа сапасы',
        'dashboard.subtitle': 'Нақты уақытта PM2.5 мониторингі және талдау',
        'dashboard.pm25Unit': 'μg/m³ PM2.5',
        'dashboard.trend': 'Тренд',
        'dashboard.range': 'Диапазон',
        'dashboard.last24Hours': 'Соңғы 24 сағат',
        'dashboard.lastUpdated': 'Соңғы жаңарту:',
        'dashboard.treeLocations': 'Алматыдағы ағаш орналасулары',
        'dashboard.treeLocationsSubtitle': 'Ағаш отырғызу әсерін көрсететін интерактивті карта',
        'dashboard.viewAllLocations': 'Барлық {count} орналасуды көру',
        'dashboard.trees': 'ағаш',
        
        // Air Quality Status
        'airQuality.excellent': 'Жақсы',
        'airQuality.good': 'Жақсы',
        'airQuality.moderate': 'Орташа',
        'airQuality.unhealthy': 'Денсаулыққа зиянды',
        'airQuality.hazardous': 'Қауіпті',
        
        // Air Quality Descriptions
        'airQuality.excellentDesc': 'Ауа сапасы жақсы. Сыртқы белсенділік үшін мінсіз.',
        'airQuality.goodDesc': 'Ауа сапасы жақсы. Көптеген сыртқы белсенділіктерге жарамды.',
        'airQuality.moderateDesc': 'Ауа сапасы орташа. Сезімтал адамдар сыртқы белсенділікті шектеуі керек.',
        'airQuality.unhealthyDesc': 'Ауа сапасы денсаулыққа зиянды. Барлығы сыртқы белсенділікті шектеуі керек.',
        'airQuality.hazardousDesc': 'Ауа сапасы қауіпті. Сыртқы белсенділіктен аулақ болыңыз.',
        
        // Common
        'common.refresh': 'Жаңарту',
        'common.loading': 'Жүктелуде...',
        'common.error': 'Қате',
        'common.success': 'Сәтті',
        'common.cancel': 'Болдырмау',
        'common.confirm': 'Растау',
        'common.close': 'Жабу',
        'common.save': 'Сақтау',
        'common.edit': 'Өңдеу',
        'common.delete': 'Жою',
        'common.view': 'Көру',
        'common.back': 'Артқа',
        'common.next': 'Келесі',
        'common.previous': 'Алдыңғы',
      },
      ru: {
        // Navigation
        'nav.dashboard': 'Панель управления',
        'nav.plantTree': 'Посадить дерево',
        'nav.myNFTs': 'Мои NFT',
        'nav.trade': 'Торговля',
        'nav.leaderboard': 'Таблица лидеров',
        
        // Header
        'header.title': 'Хранитель деревьев',
        'header.subtitle': 'Инициатива качества воздуха Алматы',
        
        // Hero Section
        'hero.title': 'Очистим воздух Алматы',
        'hero.subtitle': 'с помощью Solana',
        'hero.description': 'Чеканите NFT для компенсации 20кг CO₂ и отслеживайте качество местного воздуха в реальном времени. Присоединяйтесь к движению за создание более чистого и здорового будущего для Алматы.',
        'hero.livePM25': 'PM2.5 в реальном времени:',
        'hero.mintNFT': 'Чеканить NFT',
        'hero.viewDashboard': 'Посмотреть панель',
        'hero.feature1': 'Мониторинг PM2.5 в реальном времени',
        'hero.feature2': 'Посадка деревьев по локациям',
        'hero.feature3': 'Торгуемые токены воздействия',
        
        // Dashboard
        'dashboard.title': 'Качество воздуха Алматы',
        'dashboard.subtitle': 'Мониторинг и анализ PM2.5 в реальном времени',
        'dashboard.pm25Unit': 'μg/m³ PM2.5',
        'dashboard.trend': 'Тренд',
        'dashboard.range': 'Диапазон',
        'dashboard.last24Hours': 'Последние 24 часа',
        'dashboard.lastUpdated': 'Последнее обновление:',
        'dashboard.treeLocations': 'Места посадки деревьев в Алматы',
        'dashboard.treeLocationsSubtitle': 'Интерактивная карта, показывающая влияние посадки деревьев',
        'dashboard.viewAllLocations': 'Посмотреть все {count} мест',
        'dashboard.trees': 'деревьев',
        
        // Air Quality Status
        'airQuality.excellent': 'Отличное',
        'airQuality.good': 'Хорошее',
        'airQuality.moderate': 'Умеренное',
        'airQuality.unhealthy': 'Нездоровое',
        'airQuality.hazardous': 'Опасное',
        
        // Air Quality Descriptions
        'airQuality.excellentDesc': 'Качество воздуха отличное. Идеально для активного отдыха на свежем воздухе.',
        'airQuality.goodDesc': 'Качество воздуха хорошее. Подходит для большинства видов активного отдыха на свежем воздухе.',
        'airQuality.moderateDesc': 'Качество воздуха умеренное. Чувствительным людям следует ограничить активность на свежем воздухе.',
        'airQuality.unhealthyDesc': 'Качество воздуха нездоровое. Всем следует ограничить активность на свежем воздухе.',
        'airQuality.hazardousDesc': 'Качество воздуха опасное. Избегайте активности на свежем воздухе.',
        
        // Common
        'common.refresh': 'Обновить',
        'common.loading': 'Загрузка...',
        'common.error': 'Ошибка',
        'common.success': 'Успешно',
        'common.cancel': 'Отмена',
        'common.confirm': 'Подтвердить',
        'common.close': 'Закрыть',
        'common.save': 'Сохранить',
        'common.edit': 'Редактировать',
        'common.delete': 'Удалить',
        'common.view': 'Просмотр',
        'common.back': 'Назад',
        'common.next': 'Далее',
        'common.previous': 'Предыдущий',
      }
    };

    return translations[language][key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}
