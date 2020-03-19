import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import translationES_US from '@public/locales/es-US/translation.json';
import translationPT_BR from '@public/locales/pt-BR/translation.json';

// TODO require should be removed
export default i18n.use(initReactI18next).init({
  lng: 'es-US',
  fallbackLng: 'es-US',
  resources: {
    ...translationES_US,
    ...translationPT_BR,
  },
});
