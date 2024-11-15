// src/pages/_app.js
import '../styles/globals.css'; 
import { ClerkProvider, RedirectToSignIn, useClerk, useUser } from '@clerk/clerk-react';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

const frontendApi = "https://elegant-thrush-24.clerk.accounts.dev";
const publishableKey = 'pk_test_ZWxlZ2FudC10aHJ1c2gtMjQuY2xlcmsuYWNjb3VudHMuZGV2JA';

function MyApp({ Component, pageProps }) {
  return (
    <ClerkProvider frontendApi={frontendApi} publishableKey={publishableKey}>
      <AuthRedirect>
        <Component {...pageProps} /> 
      </AuthRedirect>
    </ClerkProvider>
  );
}

function AuthRedirect({ children }) {
  const { isSignedIn, isLoaded } = useUser(); // Wait until user state is loaded
  const router = useRouter();

  useEffect(() => {
    if (isLoaded) {
      if (isSignedIn && router.pathname === "/") {
        router.push("/dashboard"); // Redirect to dashboard if signed in
      } else if (!isSignedIn && router.pathname === "/dashboard") {
        router.push("/"); // Redirect to home if not signed in
      }
    }
  }, [isSignedIn, isLoaded, router]);

  // While loading, show a loading spinner or nothing
  if (!isLoaded) {
    return <div className="flex items-center justify-center h-screen">Loading...</div>;
  }

  return <div className="bg-grid bg-blue-500 h-full">{children}</div>;
}

export default MyApp;
