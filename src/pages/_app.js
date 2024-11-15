// src/pages/_app.js
import '../styles/globals.css'; 
import { ClerkProvider, RedirectToSignIn, useClerk, useUser } from '@clerk/clerk-react';
import { useRouter } from 'next/router';

const frontendApi = "https://elegant-thrush-24.clerk.accounts.dev";
const publishableKey = 'pk_test_ZWxlZ2FudC10aHJ1c2gtMjQuY2xlcmsuYWNjb3VudHMuZGV2JA';

function MyApp({ Component, pageProps }) {
  return (
    <ClerkProvider frontendApi={frontendApi} publishableKey={publishableKey}>
      <AppContent>
        <Component {...pageProps} /> 
      </AppContent>
    </ClerkProvider>
  );
}

function AppContent({ children }) {
  const { isSignedIn } = useUser();
  const router = useRouter();

  // Redirect user to dashboard if signed in
  if (isSignedIn && router.pathname === "/") {
    router.push("/dashboard");
  }

  return (
    <div className='bg-grid bg-blue-500 h-full'>
      {children}
    </div>
  );
}

export default MyApp;
