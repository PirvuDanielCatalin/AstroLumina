import React, { useState, useEffect, useRef } from 'react';
import {
  NavbarProps,
  getNavbarStyles,
  NavbarLogo,
  NavbarLinks,
  NavbarLanguageSwitcher
} from './NavbarCommon';

const MobileNavbar: React.FC<NavbarProps> = ({ lightTheme = false }) => {
  const [isOpen, setIsOpen] = useState(false);
  const navbarRef = useRef<HTMLDivElement>(null);
  const { mobileLinkClasses, logoClasses } = getNavbarStyles(lightTheme);

  const navClasses = lightTheme
    ? `fixed top-0 left-0 right-0 z-50 bg-white/50 ${!isOpen ? 'backdrop-blur-md' : ''}`
    : `fixed top-0 left-0 right-0 z-50 bg-black/50 ${!isOpen ? 'backdrop-blur-md' : ''}`;
  const navSubdivClasses = `max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 ${isOpen ? 'backdrop-blur-md' : ''}`

  const buttonClasses = lightTheme
    ? "inline-flex items-center justify-center p-2 rounded-md text-gray-800 hover:text-amber-600 focus:outline-none"
    : "inline-flex items-center justify-center p-2 rounded-md text-white hover:text-yellow-200 focus:outline-none";

  const mobileMenuClasses = lightTheme
    ? `${isOpen ? 'block' : 'hidden'} md:hidden fixed top-16 left-0 right-0 z-50 bg-white/50 backdrop-blur-md`
    : `${isOpen ? 'block' : 'hidden'} md:hidden fixed top-16 left-0 right-0 z-50 bg-black/50 backdrop-blur-md`;

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
      const buttonElement = document.querySelector('button[aria-expanded]');
      if (
        navbarRef.current && 
        !navbarRef.current.contains(event.target as Node) && 
        isOpen &&
        buttonElement !== event.target &&
        !buttonElement?.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  return (
    <div className="md:hidden">
      <nav className={navClasses}>
        <div className={navSubdivClasses}>
          <div className="flex items-center justify-between h-16">
            <NavbarLogo logoClasses={logoClasses} />

            {/* Mobile menu button */}
            <div>
              <button
                onClick={() => setIsOpen(!isOpen)}
                className={buttonClasses}
                aria-expanded={isOpen}
              >
                <span className="sr-only">
                  {isOpen ? 'Close main menu' : 'Open main menu'}
                </span>
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
          <div className="px-2 pt-2 pb-3 space-y-1">
            <NavbarLinks linkClasses={mobileLinkClasses} />
            <div className="px-3 py-2">
              <NavbarLanguageSwitcher lightTheme={lightTheme} />
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default MobileNavbar;
