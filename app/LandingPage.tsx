import { SignInButton } from '@clerk/nextjs';
import { Button } from "@/components/ui/button";

const LandingPage = () => {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-6">
      <header className="w-full max-w-4xl mx-auto flex justify-between items-center py-4">
        <h1 className="text-3xl font-bold text-[#D90013]">Kanoon</h1>
        <div>
          <SignInButton>
            <Button className="bg-secondary text-white py-2 px-4 rounded-lg hover:bg-primary-foreground">
              Sign In
            </Button>
          </SignInButton>
        </div>
      </header>

      <main className="flex-1 flex flex-col items-center justify-center text-center">
        <h2 className="text-4xl font-bold mb-4 text-gray-800">Welcome to Kanoon!</h2>
        <p className="text-lg text-gray-600 mb-6">
          The platform where law and technology intersect. Get solid legal advice and solutions from a community that cares.
        </p>
        <div className="flex space-x-4">
          <SignInButton>
            <Button className="bg-secondary text-white py-3 px-6 rounded-lg hover:bg-primary-foreground">
              Get Started
            </Button>
          </SignInButton>
          <Button className="bg-secondary text-white py-3 px-6 rounded-lg hover:bg-primary-foreground">
            Learn More
          </Button>
        </div>
      </main>

      <footer className="w-full max-w-4xl mx-auto py-6 text-center text-gray-600">
        <p>&copy; 2024 Kanoon. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default LandingPage;
