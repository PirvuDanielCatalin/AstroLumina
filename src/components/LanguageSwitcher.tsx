import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import ReactCountryFlag from "react-country-flag";

const LanguageSwitcher: React.FC = () => {
  const { i18n } = useTranslation();
  const [language, setLanguage] = useState('ro');

  const handleLanguageChange = (lang: string) => {
    setLanguage(lang);
    i18n.changeLanguage(lang);
  };

  return (
    <div className="flex items-center space-x-4">
      <button onClick={() => handleLanguageChange('ro')} className={`p-2 ${language === 'ro' ? 'border-b-2 border-white' : ''}`}>
        <ReactCountryFlag countryCode="RO" svg className="w-6 h-6" />
      </button>
      <button onClick={() => handleLanguageChange('en')} className={`p-2 ${language === 'en' ? 'border-b-2 border-white' : ''}`}>
        <ReactCountryFlag countryCode="GB" svg className="w-6 h-6" />
      </button>
    </div>
  );
};

export default LanguageSwitcher;
