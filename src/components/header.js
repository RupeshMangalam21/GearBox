import React from 'react';

const Header = () => {
  return (
    <header className="w-full dark:bg-black bg-white dark:bg-grid-small-white/[0.2] bg-grid-small-black/[0.2] relative flex items-center justify-center h-[20rem] md:h-[10rem] shadow-lg border-b border-gray-700">
      <nav className="flex items-center justify-between w-full max-w-7xl px-6 md:px-10 py-4">
        
        {/* Logo / Title */}
        <div className="text-2xl md:text-3xl font-bold font-['Roboto Condensed'] text-white hover:text-cobalt-blue transition-colors cursor-pointer">
          GearBox
        </div>
        
        {/* Navigation Links */}
        <div className="flex items-center space-x-6 text-white">
          <a
            href="#about"
            className="text-lg md:text-xl font-medium transition-colors hover:text-electric-blue"
          >
            About
          </a>
          <a
            href="#services"
            className="text-lg md:text-xl font-medium transition-colors hover:text-electric-blue"
          >
            Services
          </a>
          <a
            href="#contact"
            className="text-lg md:text-xl font-medium transition-colors hover:text-electric-blue"
          >
            Contact
          </a>
        </div>
      </nav>
    </header>
  );
};

export default Header;
