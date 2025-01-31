import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const resources = {
  en: {
    translation: {
      "hero-presentation": "Unlock the secrets of your destiny through the ancient wisdom of the stars",
      "services": "Services",
      "about": "About",
      "contact": "Contact",
      "learn-more": "Learn more",
      "services-list": {
        "planet-positions": "Planet Positions",
        "astral-chart": "Astral Chart",
        "karmic-chart": "Karmic Chart",
        "relationship-chart": "Relationship Chart",
        "future-chart": "Future Chart",
        "consultations": "Consultations 1:1"
      }
    }
  },
  ro: {
    translation: {
      "hero-presentation": "Deblocheaza secretele propriului destin prin intelepciunea straveche a stelelor",
      "services": "Servicii",
      "about": "Despre mine",
      "contact": "Contact",
      "learn-more": "Afla mai multe...",
      "services-list": {
        "planet-positions": "Pozitiile planetelor",
        "astral-chart": "Harta astrala",
        "karmic-chart": "Harta karmica",
        "relationship-chart": "Harta relationala",
        "future-chart": "Harta previzionala",
        "consultations": "Consultatii 1:1"
      }
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
