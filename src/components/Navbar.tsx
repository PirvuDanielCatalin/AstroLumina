import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import LanguageSwitcher from './LanguageSwitcher';

interface NavbarProps {
  isScrolled: boolean;
  lightTheme?: boolean;
}

const Navbar: React.FC<NavbarProps> = ({ lightTheme = false }) => {
  const { t } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const navbarRef = useRef<HTMLDivElement>(null);

  const navClasses = lightTheme
    ? `fixed top-0 left-0 right-0 z-50 bg-white/50 ${!isOpen ? 'backdrop-blur-md' : ''}`
    : `fixed top-0 left-0 right-0 z-50 bg-black/50 ${!isOpen ? 'backdrop-blur-md' : ''}`;
  const navSubdivClasses = `max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 ${isOpen ? 'backdrop-blur-md' : ''}`

  const linkClasses = lightTheme
    ? "text-gray-800 hover:text-amber-600 px-3 py-2 rounded-md text-sm font-semibold transition-colors"
    : "text-white hover:text-yellow-200 px-3 py-2 rounded-md text-sm font-semibold transition-colors";

  const mobileLinkClasses = lightTheme
    ? "text-gray-800 hover:text-amber-600 block px-3 py-2 rounded-md text-base font-semibold transition-colors"
    : "text-white hover:text-yellow-200 block px-3 py-2 rounded-md text-base font-semibold transition-colors";

  const logoClasses = lightTheme
    ? "text-xl font-bold text-gray-800 hover:text-amber-600 transition-colors"
    : "text-xl font-bold text-white hover:text-yellow-200 transition-colors";

  const buttonClasses = lightTheme
    ? "inline-flex items-center justify-center p-2 rounded-md text-gray-800 hover:text-amber-600 focus:outline-none"
    : "inline-flex items-center justify-center p-2 rounded-md text-white hover:text-yellow-200 focus:outline-none";

  const mobileMenuClasses = lightTheme
    ? `${isOpen ? 'block' : 'hidden'} md:hidden fixed top-16 left-0 right-0 z-50 bg-white/50 backdrop-blur-md`
    : `${isOpen ? 'block' : 'hidden'} md:hidden fixed top-16 left-0 right-0 z-50 bg-black/50 backdrop-blur-md`;

  const mobileMenuContentClasses = "px-2 pt-2 pb-3 space-y-1";

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setIsOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (navbarRef.current && !navbarRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  return (
    <nav className={navClasses}>
      <div className={navSubdivClasses}>
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link to="/" className="flex items-center">
              <span className={logoClasses}>AstroLumina</span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              <Link
                to="/services"
                className={linkClasses}
              >
                {t('services')}
              </Link>
              <Link
                to="/about"
                className={linkClasses}
              >
                {t('about')}
              </Link>
              <Link
                to="/contact"
                className={linkClasses}
              >
                {t('contact')}
              </Link>
              <LanguageSwitcher lightTheme={lightTheme} />
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className={buttonClasses}
              aria-expanded="false"
            >
              <span className="sr-only">Open main menu</span>
              {!isOpen ? (
                <svg
                  className="block h-6 w-6"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              ) : (
                <svg
                  className="block h-6 w-6"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <div ref={navbarRef} className={mobileMenuClasses}>
        <div className={mobileMenuContentClasses}>
          <Link
            to="/services"
            className={mobileLinkClasses}
            onClick={() => setIsOpen(false)}
          >
            {t('services')}
          </Link>
          <Link
            to="/about"
            className={mobileLinkClasses}
            onClick={() => setIsOpen(false)}
          >
            {t('about')}
          </Link>
          <Link
            to="/contact"
            className={mobileLinkClasses}
            onClick={() => setIsOpen(false)}
          >
            {t('contact')}
          </Link>
          <div className="px-3 py-2">
            <LanguageSwitcher lightTheme={lightTheme} />
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
