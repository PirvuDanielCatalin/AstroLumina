import React, { useState } from 'react';
import { ReactComponent as UKFlag } from '../assets/uk-flag.svg';
import { ReactComponent as RomaniaFlag } from '../assets/romania-flag.svg';
import { useTranslation } from 'react-i18next';

const LanguageSwitcher: React.FC = () => {
  const { i18n } = useTranslation();
  const [language, setLanguage] = useState('ro');

  const handleLanguageChange = (lang: string) => {
    setLanguage(lang);
    i18n.changeLanguage(lang);
  };

  return (
    <div className="flex items-center space-x-4">
      <button onClick={() => handleLanguageChange('en')} className={`p-2 ${language === 'en' ? 'border-b-2 border-white' : ''}`}>
        <UKFlag className="w-6 h-6" />
      </button>
      <button onClick={() => handleLanguageChange('ro')} className={`p-2 ${language === 'ro' ? 'border-b-2 border-white' : ''}`}>
        <RomaniaFlag className="w-6 h-6" />
      </button>
    </div>
  );
};

export default LanguageSwitcher;
