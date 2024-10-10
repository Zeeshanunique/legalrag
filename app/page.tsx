"use client";

import { ClerkProvider, SignedIn, SignedOut } from "@clerk/nextjs";
import LandingPage from "./LandingPage";
import HomeContent from "./HomeContent";
// Unauthenticated landing page

const Home = () => {
  return (
    <ClerkProvider>
      <SignedOut>
        {/* Redirect users to the landing page if not signed in */}
        <LandingPage />
      </SignedOut>
      <SignedIn>
        {/* Display the main application when the user is signed in */}
        <HomeContent />
      </SignedIn>
    </ClerkProvider>
  );
};

export default Home;
