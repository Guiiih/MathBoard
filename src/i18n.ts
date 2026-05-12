import { createI18n } from 'vue-i18n';
import pt from './locales/pt.json';
import en from './locales/en.json';

const messages = {
  pt,
  en
};

const i18n = createI18n({
  legacy: false, 
  locale: 'pt', 
  fallbackLocale: 'en',
  messages, 
  globalInjection: true, 
});

export default i18n;