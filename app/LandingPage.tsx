import { SignInButton } from '@clerk/nextjs';
import { Button } from "@/components/ui/button";

const LandingPage = () => {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-6">
      <header className="w-full max-w-4xl mx-auto flex justify-between items-center py-4">
        <h1 className="text-2xl md:text-3xl font-bold text-green-600">NanoFund</h1>
        <div>
          <SignInButton>
            <Button className="bg-green-800 text-white py-2 px-4 rounded-lg hover:bg-green-600">
              Sign In
            </Button>
          </SignInButton>
        </div>
      </header>

      <main className="flex-1 flex flex-col items-center justify-center text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-800">Empowering Nano-Entrepreneurs</h2>
        <p className="text-base md:text-lg text-gray-600 mb-6 max-w-xl">
          Unlock financial opportunities and grow your business with tailored micro-loans. 
          NanoFund is here to support your entrepreneurial journey.
        </p>
        <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4">
          <SignInButton>
            <Button className="bg-green-800 text-white py-3 px-6 rounded-lg hover:bg-green-600">
              Apply for a Loan
            </Button>
          </SignInButton>
          <Button className="bg-green-800 text-white py-3 px-6 rounded-lg hover:bg-green-600">
            Learn More
          </Button>
        </div>
      </main>

      <footer className="w-full max-w-4xl mx-auto py-6 text-center text-gray-600">
        <p>&copy; 2024 NanoFund. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default LandingPage;
