import React from 'react';
import { useClerk, useUser } from '@clerk/clerk-react';

const Header = () => {
  const { signOut } = useClerk();
  const { isSignedIn } = useUser();

  return (
    <header className="w-full bg-black dark:bg-black dark:bg-grid-small-white/[0.2] bg-grid-small-white/[0.2]">
      <nav className="flex flex-wrap items-center justify-between w-full max-w-7xl mx-auto px-4 md:px-8 py-4">
        {/* Logo / Title */}
        <div className="text-xl sm:text-2xl md:text-3xl font-bold font-['Roboto Condensed'] text-white hover:text-cobalt-blue transition-colors cursor-pointer">
          GearBox
        </div>

        {/* Hamburger Menu for Mobile */}
        <div className="block lg:hidden">
          <button
            id="menu-toggle"
            aria-label="Toggle Navigation"
            className="text-white focus:outline-none focus:ring-2 focus:ring-cobalt-blue"
          >
            <svg
              className="w-6 h-6"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
        </div>

        {/* Navigation Links */}
        <div
          id="menu"
          className="hidden lg:flex items-center space-x-6 text-white mt-4 lg:mt-0 w-full lg:w-auto lg:space-x-8"
        >
          <a
            href="#about"
            className="block lg:inline-block text-lg md:text-xl font-medium transition-colors hover:text-electric-blue"
          >
            About
          </a>
          <a
            href="#services"
            className="block lg:inline-block text-lg md:text-xl font-medium transition-colors hover:text-electric-blue"
          >
            Services
          </a>
          <a
            href="#contact"
            className="block lg:inline-block text-lg md:text-xl font-medium transition-colors hover:text-electric-blue"
          >
            Contact
          </a>
        </div>

        {/* Logout Button */}
        {isSignedIn && (
          <div className="mt-4 lg:mt-0">
            <button
              onClick={signOut}
              className="px-4 sm:px-6 py-2 sm:py-3 bg-yellow-600 text-white text-sm sm:text-base rounded-full hover:bg-yellow-700 transition"
            >
              Log Out
            </button>
          </div>
        )}
      </nav>
    </header>
  );
};

export default Header;
