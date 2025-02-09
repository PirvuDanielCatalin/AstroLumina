import React from 'react';
import {
  NavbarProps,
  getNavbarStyles,
  NavbarLogo,
  NavbarLinks,
  NavbarLanguageSwitcher
} from './NavbarCommon';

const DesktopNavbar: React.FC<NavbarProps> = ({ lightTheme = false }) => {
  const { navClasses, linkClasses, logoClasses } = getNavbarStyles(lightTheme);

  return (
    <div className="hidden md:block">
      <nav className={navClasses}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <NavbarLogo logoClasses={logoClasses} />
            
            <div className="ml-10 flex items-baseline space-x-4">
              <NavbarLinks linkClasses={linkClasses} />
              <NavbarLanguageSwitcher lightTheme={lightTheme} />
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default DesktopNavbar;
