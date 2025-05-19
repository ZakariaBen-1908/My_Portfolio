import React, { createContext, useContext, useState } from 'react';
import { LanguageContextType } from '../types';

// Import translation resources
import en from '../locales/en';
import fr from '../locales/fr';

const translations = { en, fr };

const LanguageContext = createContext<LanguageContextType>({
  language: 'en',
  setLanguage: () => {},
  t: (key: string) => key,
});

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<'en' | 'fr'>(() => {
    const savedLang = localStorage.getItem('language');
    return (savedLang === 'en' || savedLang === 'fr') ? savedLang : 'en';
  });

  // Translation function
  const t = (key: string): string => {
    // @ts-ignore - we know these keys exist
    return translations[language][key] || key;
  };

  // Save language preference to localStorage
  const handleSetLanguage = (lang: 'en' | 'fr') => {
    setLanguage(lang);
    localStorage.setItem('language', lang);
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage: handleSetLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => useContext(LanguageContext);