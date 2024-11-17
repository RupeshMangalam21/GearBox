// src/components/Loader.js

const Loader = () => {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-black dark:bg-black dark:bg-grid-small-white/[0.2] bg-grid-small-white/[0.2] bg-opacity-80 z-50">
        {/* Loader animation (can be a spinner or custom animation) */}
        <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  };
  
  export default Loader;
  