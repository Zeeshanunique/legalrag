"use client";

import React, { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import LoanForm from "../pages/loanform"; // Import LoanForm
import { ModeToggle } from "@/components/modetoggle";
import { UserButton } from "@clerk/nextjs";

const Dashboard: React.FC = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  return (
    <div className="flex flex-col min-h-screen">
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
      <main className="flex flex-1 items-center justify-center p-4 bg-gray-100 dark:bg-gray-900">
        <div className="flex flex-col items-center w-full max-w-2xl bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
          <h1 className="text-4xl font-bold text-blue-600 dark:text-blue-400 mb-6">
            Welcome to the Dashboard
          </h1>
          <p className="text-lg text-gray-700 dark:text-gray-300 mb-6">
            Your form has been submitted successfully!
          </p>

          {/* Loan Approval Card */}
          <div className="bg-gray-100 dark:bg-gray-900 p-6 rounded-lg shadow-md w-full">
            <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-4">
              Check Your Loan Approval Status
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              You can check your loan approval status. Fill in the required details to proceed with the loan process.
            </p>

            {/* Dialog Trigger */}
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
              <DialogTrigger asChild>
                <button
                  className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600 w-full 
                  dark:bg-blue-600 dark:hover:bg-blue-700"
                >
                  Fill Loan Details
                </button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[625px] max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                  <DialogTitle className="text-2xl text-blue-600 dark:text-blue-400">
                    Loan Application Form
                  </DialogTitle>
                </DialogHeader>
                <LoanForm onSubmitSuccess={() => setIsDialogOpen(false)} />
              </DialogContent>
            </Dialog>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
