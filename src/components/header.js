import React from 'react';
import AudioToggleButton from './AudioToggleButton';

const Header = ({ audioPlaying, handleAudioToggle }) => {
  return (
    <header className="absolute top-0 left-0 w-full z-10">
      <nav className="flex items-center justify-between p-6">
        <div className="text-white text-2xl font-bold">
          AutoDiag AI
        </div>
        <div className="flex items-center space-x-4">
          <a href="#about" className="text-white hover:text-gray-300">
            About
          </a>
          <a href="#services" className="text-white hover:text-gray-300">
            Services
          </a>
          <a href="#contact" className="text-white hover:text-gray-300">
            Contact
          </a>
          {/* Audio Toggle Button */}
          <AudioToggleButton
            audioPlaying={audioPlaying}
            handleAudioToggle={handleAudioToggle}
          />
        </div>
      </nav>
    </header>
  );
};

export default Header;
