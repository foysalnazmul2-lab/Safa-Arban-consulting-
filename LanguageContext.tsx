
import React, { createContext, useContext, useState, useEffect } from 'react';
import { TRANSLATIONS } from './constants';

type Language = 'EN' | 'AR';

interface LanguageContextType {
  lang: Language;
  toggleLanguage: () => void;
  t: (key: keyof typeof TRANSLATIONS.EN) => string;
  isRTL: boolean;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [lang, setLang] = useState<Language>('EN');

  const toggleLanguage = () => {
    setLang(prev => prev === 'EN' ? 'AR' : 'EN');
  };

  useEffect(() => {
    // Update document direction for CSS handling
    document.documentElement.dir = lang === 'AR' ? 'rtl' : 'ltr';
    document.documentElement.lang = lang === 'AR' ? 'ar' : 'en';
  }, [lang]);

  const t = (key: keyof typeof TRANSLATIONS.EN) => {
    return TRANSLATIONS[lang][key] || TRANSLATIONS['EN'][key] || key;
  };

  const isRTL = lang === 'AR';

  return (
    <LanguageContext.Provider value={{ lang, toggleLanguage, t, isRTL }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
