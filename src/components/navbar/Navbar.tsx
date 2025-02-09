import React from 'react';
import { NavbarProps } from './NavbarCommon';
import DesktopNavbar from './DesktopNavbar';
import MobileNavbar from './MobileNavbar';

const Navbar: React.FC<NavbarProps> = ({ isScrolled, lightTheme = false }) => {
  return (
    <>
      <DesktopNavbar isScrolled={isScrolled} lightTheme={lightTheme} />
      <MobileNavbar isScrolled={isScrolled} lightTheme={lightTheme} />
    </>
  );
};

export default Navbar;
