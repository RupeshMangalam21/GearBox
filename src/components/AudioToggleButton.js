// src/components/AudioToggleButton.js
import { FaVolumeUp, FaVolumeMute } from "react-icons/fa";  // Import icons for volume control

const AudioToggleButton = ({ audioPlaying, handleAudioToggle }) => {
  return (
    <button 
      onClick={handleAudioToggle}
      style={{
        position: 'absolute',
        top: '20px',
        right: '20px',
        padding: '10px',
        paddingBottom: '6px',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        color: 'white',
        border: 'none',
        borderRadius: '5px',
        cursor: 'pointer',
        zIndex: 10
      }}
    >
      {audioPlaying ? <FaVolumeUp /> : <FaVolumeMute />}
    </button>
  );
};

export default AudioToggleButton;
