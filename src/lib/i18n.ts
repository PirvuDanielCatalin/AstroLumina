import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const resources = {
  en: {
    translation: {
      "hero-presentation": "Unlock the secrets of your destiny through the ancient wisdom of the stars",
      "services": "Services",
      "about": "About",
      "contact": "Contact",
    }
  },
  ro: {
    translation: {
      "hero-presentation": "Deblocheaza secretele propriului destin prin intelepciunea straveche a stelelor",
      "services": "Servicii",
      "about": "Despre mine",
      "contact": "Contact",
    }
  }
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: "ro", // default language
    interpolation: {
      escapeValue: false
    }
  });

export default i18n;
