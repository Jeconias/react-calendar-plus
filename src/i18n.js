import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

//TODO require should be removed
export default i18n.use(initReactI18next).init({
  lng: 'es-US',
  fallbackLng: 'es-US',
  resources: require('../public/locales/es-US/translation.json'),
});
