// src/pages/_app.js
import '../styles/globals.css'; 
import { ClerkProvider, useUser } from '@clerk/clerk-react';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import Loader from '../components/Loader'; // Import the Loader component
import { LoadingProvider, useLoading } from '../context/LoadingContext';

const frontendApi = "https://elegant-thrush-24.clerk.accounts.dev";
const publishableKey = 'pk_test_ZWxlZ2FudC10aHJ1c2gtMjQuY2xlcmsuYWNjb3VudHMuZGV2JA';

function MyApp({ Component, pageProps }) {
  return (
    <ClerkProvider frontendApi={frontendApi} publishableKey={publishableKey}>
      <LoadingProvider>
        <AuthRedirect>
          <Component {...pageProps} /> 
        </AuthRedirect>
      </LoadingProvider>
    </ClerkProvider>
  );
}

function AuthRedirect({ children }) {
  const { isSignedIn, isLoaded } = useUser(); // Wait until user state is loaded
  const router = useRouter();
  const { isLoading, setIsLoading } = useLoading(); // Use loading context

  // Manage Clerk authentication redirects
  useEffect(() => {
    if (isLoaded) {
      if (isSignedIn && router.pathname === "/") {
        router.push("/dashboard"); // Redirect to dashboard if signed in
      } else if (!isSignedIn && router.pathname === "/dashboard") {
        router.push("/"); // Redirect to home if not signed in
      }
    }
  }, [isSignedIn, isLoaded, router]);

  // Manage page transition loading state
  useEffect(() => {
    const handleStart = () => setIsLoading(true);
    const handleComplete = () => setIsLoading(false);

    router.events.on("routeChangeStart", handleStart);
    router.events.on("routeChangeComplete", handleComplete);
    router.events.on("routeChangeError", handleComplete);

    return () => {
      router.events.off("routeChangeStart", handleStart);
      router.events.off("routeChangeComplete", handleComplete);
      router.events.off("routeChangeError", handleComplete);
    };
  }, [router, setIsLoading]);

  // Show the Loader component while Clerk or route is loading
  if (!isLoaded || isLoading) {
    return <Loader />; // Show the Loader component while loading
  }

  return <div className="bg-grid bg-blue-500 h-full">{children}</div>;
}

export default MyApp;
