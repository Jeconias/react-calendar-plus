import i18n from 'i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import { initReactI18next } from 'react-i18next';

import translationEnUS from '../public/locales/en-US/translation.json';
import translationPtBr from '../public/locales/pt-BR/translation.json';

// TODO require should be removed
export default i18n
  .use(initReactI18next)
  .use(LanguageDetector)
  .init({
    fallbackLng: ['en-US', 'pt-BR'],
    load: 'currentOnly',
    resources: {
      ...translationEnUS,
      ...translationPtBr,
    },
    detection: {
      order: ['localStorage', 'navigator'],
      lookupLocalStorage: 'calendarLanguage',
    },
  });
