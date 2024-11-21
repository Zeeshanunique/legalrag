"use client";

import { ModeToggle } from "@/components/modetoggle";
import { UserButton } from "@clerk/nextjs";
// import Dashboard from "@/app/dashboard/page"; // Import Dashboard
import SimpleForm from "./pages/simpleform";

const HomeContent = () => {
  return (
    <div className="grid min-h-screen w-full">
      <div className="flex flex-col">
        {/* Header Section */}
        <header className="sticky top-0 z-10 flex h-[57px] bg-background items-center gap-1 border-b px-4">
          <h1 className="text-lg md:text-xl font-semibold text-[#32d232]">
            <span className="flex flex-row">Finomeme</span>
          </h1>
          <div className="w-full flex flex-row justify-end gap-2 items-center">
            <ModeToggle />
            {/* User Options */}
            <div className="flex space-x-4 items-center">
              <UserButton afterSignOutUrl="/" />
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main
          className="grid flex-1 gap-4 overflow-auto p-4
          grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
        >
          <div className="lg:col-span-3">
            {/* Integrating the Dashboard Component */}
            <SimpleForm />
          </div>
        </main>
      </div>
    </div>
  );
};

export default HomeContent;
