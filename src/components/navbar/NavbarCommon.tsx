import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import LanguageSwitcher from '../language/LanguageSwitcher';

export interface NavbarProps {
  isScrolled: boolean;
  lightTheme?: boolean;
}

export const getNavbarStyles = (lightTheme: boolean) => {
  return {
    navClasses: lightTheme
      ? `fixed top-0 left-0 right-0 z-50 bg-white/50 backdrop-blur-md`
      : `fixed top-0 left-0 right-0 z-50 bg-black/50 backdrop-blur-md`,
    
    linkClasses: lightTheme
      ? "text-gray-800 hover:text-amber-600 px-3 py-2 rounded-md text-sm font-semibold transition-colors"
      : "text-white hover:text-yellow-200 px-3 py-2 rounded-md text-sm font-semibold transition-colors",
    
    mobileLinkClasses: lightTheme
      ? "text-gray-800 hover:text-amber-600 block px-3 py-2 rounded-md text-base font-semibold transition-colors"
      : "text-white hover:text-yellow-200 block px-3 py-2 rounded-md text-base font-semibold transition-colors",
    
    logoClasses: lightTheme
      ? "text-xl font-bold text-gray-800 hover:text-amber-600 transition-colors"
      : "text-xl font-bold text-white hover:text-yellow-200 transition-colors",
  };
};

export const NavbarLogo: React.FC<{ logoClasses: string }> = ({ logoClasses }) => (
  <div className="flex-shrink-0">
    <Link to="/" className="flex items-center">
      <span className={logoClasses}>AstroLumina</span>
    </Link>
  </div>
);

export const NavbarLinks: React.FC<{ linkClasses: string }> = ({ linkClasses }) => {
  const { t } = useTranslation();
  
  return (
    <>
      <Link to="/services" className={linkClasses}>
        {t('services')}
      </Link>
      <Link to="/about" className={linkClasses}>
        {t('about')}
      </Link>
      <Link to="/contact" className={linkClasses}>
        {t('contact')}
      </Link>
    </>
  );
};

export const NavbarLanguageSwitcher: React.FC<{ lightTheme: boolean }> = ({ lightTheme }) => (
  <LanguageSwitcher lightTheme={lightTheme} />
);
