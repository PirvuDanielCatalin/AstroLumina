import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import LanguageSwitcher from './LanguageSwitcher';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

interface NavbarProps {
  isScrolled: boolean;
  onlyLogo?: boolean;
  lightTheme?: boolean;
}

const Navbar: React.FC<NavbarProps> = ({ isScrolled, onlyLogo = false, lightTheme = false }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { t } = useTranslation();
  const navigate = useNavigate();

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const offset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
      setIsMobileMenuOpen(false);
    }
  };

  const handleLogoClick = (e: React.MouseEvent) => {
    e.preventDefault();
    if (window.location.pathname !== '/') {
      navigate('/');
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
    setIsMobileMenuOpen(false);
  };

  const navClasses = lightTheme
    ? "fixed top-0 left-0 right-0 z-50 bg-white/50 backdrop-blur-sm border-b border-gray-200"
    : "fixed top-0 left-0 right-0 z-50 bg-black/50 backdrop-blur-sm border-b border-white/10";

  const linkClasses = lightTheme
    ? "text-gray-800 hover:text-amber-600 px-3 py-2 rounded-md text-sm font-semibold transition-colors"
    : "text-white hover:text-yellow-200 px-3 py-2 rounded-md text-sm font-semibold transition-colors";

  const logoClasses = lightTheme
    ? "text-xl font-bold text-gray-800 hover:text-amber-600 transition-colors"
    : "text-xl font-bold text-white hover:text-yellow-200 transition-colors";

  const mobileButtonClasses = lightTheme
    ? "inline-flex items-center justify-center p-2 rounded-md text-gray-800 hover:text-amber-600 focus:outline-none"
    : "inline-flex items-center justify-center p-2 rounded-md text-white hover:text-yellow-200 focus:outline-none";

  const mobileLinkClasses = lightTheme
    ? "text-gray-800 hover:text-amber-600 block px-3 py-2 rounded-md text-base font-semibold transition-colors"
    : "text-white hover:text-yellow-200 block px-3 py-2 rounded-md text-base font-semibold transition-colors";

  const mobileMenuClasses = lightTheme
    ? `md:hidden ${isMobileMenuOpen ? 'block' : 'hidden'} border-b border-gray-200`
    : `md:hidden ${isMobileMenuOpen ? 'block' : 'hidden'} border-b border-white/10`;

  // Close mobile menu when window is resized to desktop size
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) { // md breakpoint
        setIsMobileMenuOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <nav className={navClasses}>
      <div className="container mx-auto px-6">
        <div className="relative flex items-center justify-between h-16">
          <div className="flex-1 flex items-center justify-between">
            <div className="flex-shrink-0">
              <a 
                href="/"
                onClick={handleLogoClick}
                className={logoClasses}
              >
                AstroLumina
              </a>
            </div>

            {!onlyLogo && (
              <>
                {/* Mobile menu button */}
                <div className="md:hidden">
                  <button
                    onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                    className={mobileButtonClasses}
                  >
                    <span className="sr-only">Open main menu</span>
                    {!isMobileMenuOpen ? (
                      <svg className="block h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                      </svg>
                    ) : (
                      <svg className="block h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    )}
                  </button>
                </div>

                {/* Desktop menu */}
                <div className="hidden md:block">
                  <div className="ml-10 flex items-baseline space-x-4">
                    <a 
                      href="#services" 
                      onClick={(e) => {
                        e.preventDefault();
                        scrollToSection('services');
                      }}
                      className={linkClasses}
                    >
                      {t('services')}
                    </a>
                    <Link to="/about" className={linkClasses}>
                      {t('about')}
                    </Link>
                    <a 
                      href="#contact" 
                      onClick={(e) => {
                        e.preventDefault();
                        scrollToSection('contact');
                      }}
                      className={linkClasses}
                    >
                      {t('contact')}
                    </a>
                    <LanguageSwitcher lightTheme={lightTheme} />
                  </div>
                </div>
              </>
            )}

            {onlyLogo && (
              <div>
                <LanguageSwitcher lightTheme={lightTheme} />
              </div>
            )}
          </div>
        </div>

        {/* Mobile menu */}
        {!onlyLogo && (
          <div className={mobileMenuClasses}>
            <div className="px-2 pt-2 pb-3 space-y-1">
              <Link to="/about" className={mobileLinkClasses}>
                About Me
              </Link>
              <a
                href="#services"
                onClick={(e) => {
                  e.preventDefault();
                  scrollToSection('services');
                }}
                className={mobileLinkClasses}
              >
                {t('services')}
              </a>
              <a
                href="#about"
                onClick={(e) => {
                  e.preventDefault();
                  scrollToSection('about');
                }}
                className={mobileLinkClasses}
              >
                {t('about')}
              </a>
              <a
                href="#contact"
                onClick={(e) => {
                  e.preventDefault();
                  scrollToSection('contact');
                }}
                className={mobileLinkClasses}
              >
                {t('contact')}
              </a>
              <div className="px-3 py-2">
                <LanguageSwitcher lightTheme={lightTheme} />
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
