import React from 'react';
import { FaVolumeUp, FaVolumeMute } from "react-icons/fa";

const AudioToggleButton = ({ audioPlaying, handleAudioToggle }) => {
  return (
    <button 
      onClick={handleAudioToggle}
      className="p-2 bg-yellow-500 bg-opacity-50 text-white rounded-full hover:bg-opacity-75 transition"
    >
      {audioPlaying ? <FaVolumeUp /> : <FaVolumeMute />}
    </button>
  );
};

export default AudioToggleButton;
