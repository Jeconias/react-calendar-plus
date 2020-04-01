import translationEN_US from '@public/locales/en-US/translation.json';
import translationPT_BR from '@public/locales/pt-BR/translation.json';
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

// TODO require should be removed
export default i18n.use(initReactI18next).init({
  lng: 'en-US',
  fallbackLng: ['en-US', 'pt-BR'],
  load: 'currentOnly',
  resources: {
    ...translationEN_US,
    ...translationPT_BR,
  },
});
