import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const resources = {
  en: {
    translation: {
      "welcome": "Welcome to AstroLumina",
      // ...other translations...
    }
  },
  ro: {
    translation: {
      "welcome": "Bine ați venit la AstroLumina",
      // ...other translations...
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
