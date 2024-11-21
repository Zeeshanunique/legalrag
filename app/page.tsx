"use client";

import { SignedIn, SignedOut } from "@clerk/nextjs";
import LandingPage from "./LandingPage";
import HomeContent from "./HomeContent";

const Home = () => {
  return (
    <>
      <SignedOut>
        {/* Redirect users to the landing page if not signed in */}
        <LandingPage />
      </SignedOut>
      <SignedIn>
        {/* Display the main application when the user is signed in */}
        <HomeContent />
      </SignedIn>
    </>
  );
};

export default Home;
