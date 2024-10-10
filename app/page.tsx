"use client";

import { Button } from "@/components/ui/button";
import { Drawer, DrawerContent, DrawerTrigger } from "@/components/ui/drawer";
import { Settings } from "lucide-react";
import { ModeToggle } from "@/components/modetoggle";
import { useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import ReportComponent from "@/components/ReportComponent";
import ChatComponent from "@/components/chatcomponent";
import { ClerkProvider, SignInButton, SignedIn, SignedOut, UserButton } from '@clerk/nextjs';

const Home = () => {
  const { toast } = useToast();
  const [reportData, setreportData] = useState("");

  const onReportConfirmation = (data: string) => {
    setreportData(data);
    toast({
      description: "Updated!"
    });
  };

  return (
    <ClerkProvider>
      <div className="grid h-screen w-full">
        <div className="flex flex-col">
          <header className="sticky top-0 z-10 flex h-[57px] bg-background items-center gap-1 border-b px-4">
            <h1 className="text-xl font-semibold text-[#D90013]">
              <span className="flex flex-row">Kanoon!</span>
            </h1>
            <div className="w-full flex flex-row justify-end gap-2">
              <ModeToggle />
              <Drawer>
                <DrawerTrigger asChild>
                  <Button variant="ghost" size="icon" className="md:hidden">
                    <Settings />
                    <span className="sr-only">Settings</span>
                  </Button>
                </DrawerTrigger>
                <DrawerContent className="max-h-[80vh]">
                  <ReportComponent onReportConfirmation={onReportConfirmation} />
                </DrawerContent>
              </Drawer>

              {/* Sign In/Sign Out buttons */}
              <div className="flex space-x-4">
                <SignedOut>
                  <SignInButton>
                    <button className="auth-button bg-primary text-primary-foreground py-2 px-4 rounded-md hover:bg-primary-foreground hover:text-primary focus:ring focus:ring-primary-foreground transition">
                      Sign In
                    </button>
                  </SignInButton>
                </SignedOut>
                <SignedIn>
                  <UserButton>
                    <button className="auth-button bg-secondary text-secondary-foreground py-2 px-4 rounded-md hover:bg-secondary-foreground hover:text-secondary focus:ring focus:ring-secondary-foreground transition">
                      Sign Out
                    </button>
                  </UserButton>
                </SignedIn>
              </div>
            </div>
          </header>

          <main
            className="grid flex-1 gap-4 overflow-auto p-4
            md:grid-cols-2
            lg:grid-cols-3"
          >
            <div className="hidden md:flex flex-col">
              <ReportComponent onReportConfirmation={onReportConfirmation} />
            </div>
            <div className="lg:col-span-2">
              <ChatComponent reportData={reportData} />
            </div>
          </main>
        </div>
      </div>
    </ClerkProvider>
  );
};

export default Home;
