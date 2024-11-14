// src/pages/_app.js
import '../styles/globals.css'; 

function MyApp({ Component, pageProps }) {
  return (
    <div className='bg-grid bg-blue-500 min-h-screen'>
      <Component {...pageProps} /> {/* This renders each page content */}
    </div>
  );
}

export default MyApp; 
