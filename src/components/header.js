import React from 'react';
import { useClerk, useUser } from '@clerk/clerk-react';

const Header = () => {
  const { signOut } = useClerk();
  const { isSignedIn } = useUser();
  return (
    <header className="h-full w-full dark:bg-black bg-black  dark:bg-grid-small-white/[0.2] bg-grid-small-white/[0.2] relative flex items-center justify-center ">
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
        {isSignedIn && (
        <button 
          onClick={signOut} 
          className="px-6 py-3 bg-yellow-600 text-white rounded-full hover:bg-yellow-700 transition"
        >
          Log Out
        </button>
      )}
      </nav>
    </header>
  );
};

export default Header;
