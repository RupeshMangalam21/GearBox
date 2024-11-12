// src/pages/_app.js
import '../styles/globals.css'; // Import global styles if you have them

function MyApp({ Component, pageProps }) {
  return (
    <div>
      <Component {...pageProps} /> {/* This renders each page content */}
    </div>
  );
}

export default MyApp; // Make sure this is the default export
