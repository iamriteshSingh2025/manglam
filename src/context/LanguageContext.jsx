import React, { createContext, useContext, useState, useEffect } from 'react';
import { translations } from '../data/translations';

const LanguageContext = createContext();

export const LanguageProvider = ({ children }) => {
  const [language, setLanguageState] = useState(() => {
    return localStorage.getItem('manglam_lang') || localStorage.getItem('kaamsetu_lang') || 'hi';
  });

  const setLanguage = (lang) => {
    if (lang === 'hi' || lang === 'en') {
      setLanguageState(lang);
      localStorage.setItem('manglam_lang', lang);
      // Also update html lang attribute
      if (typeof document !== 'undefined') {
        document.documentElement.lang = lang;
      }
    }
  };

  useEffect(() => {
    localStorage.setItem('manglam_lang', language);
    if (typeof document !== 'undefined') {
      document.documentElement.lang = language;
    }
  }, [language]);

  // Translation function: returns string or fallback or key itself
  const t = (key, fallback = '') => {
    const currentDict = translations[language] || translations.hi;
    if (currentDict && currentDict[key] !== undefined) {
      return currentDict[key];
    }
    // Fallback to Hindi if not found in current language
    if (translations.hi && translations.hi[key] !== undefined) {
      return translations.hi[key];
    }
    return fallback || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t, translations: translations[language] }}>
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
