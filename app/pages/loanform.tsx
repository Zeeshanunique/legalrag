"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import axios from "axios";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

// Updated Zod schema to include document uploads
const loanFormSchema = z.object({
  // Existing fields remain the same
  age: z
    .string()
    .refine((val) => {
      const age = parseInt(val);
      return !isNaN(age) && age >= 18 && age <= 100;
    }, "Age must be a valid number between 18 and 100"),
  gender: z.enum(["male", "female", "other"]),
  address: z.string().min(5, "Address must be at least 5 characters"),
  google_review: z
    .string()
    .refine((val) => {
      const review = parseFloat(val);
      return !isNaN(review) && review >= 1 && review <= 5;
    }, "Google review must be between 1 and 5"),
  family_income: z
    .string()
    .refine((val) => {
      const income = parseFloat(val);
      return !isNaN(income) && income > 0;
    }, "Family income must be a positive number"),
  have_vehicle: z.enum(["yes", "no"]),
  electricity_bill: z
    .string()
    .refine((val) => {
      const bill = parseFloat(val);
      return !isNaN(bill) && bill > 0;
    }, "Electricity bill must be a positive number"),
  savings: z
    .string()
    .refine((val) => {
      const savings = parseFloat(val);
      return !isNaN(savings) && savings >= 0;
    }, "Savings must be a valid number"),
  
  // New document upload fields with validation
  aadhar_card: z.instanceof(FileList)
    .refine((files) => files.length > 0, "Aadhar card is required")
    .refine((files) => files[0].size <= 5 * 1024 * 1024, "Aadhar card must be less than 5MB")
    .refine(
      (files) => ['image/jpeg', 'image/png', 'application/pdf'].includes(files[0].type),
      "Aadhar card must be a PDF or image (JPEG/PNG)"
    ),
  pan_card: z.instanceof(FileList)
    .refine((files) => files.length > 0, "PAN card is required")
    .refine((files) => files[0].size <= 5 * 1024 * 1024, "PAN card must be less than 5MB")
    .refine(
      (files) => ['image/jpeg', 'image/png', 'application/pdf'].includes(files[0].type),
      "PAN card must be a PDF or image (JPEG/PNG)"
    ),
  electricity_bill_doc: z.instanceof(FileList)
    .refine((files) => files.length > 0, "Electricity bill document is required")
    .refine((files) => files[0].size <= 5 * 1024 * 1024, "Electricity bill must be less than 5MB")
    .refine(
      (files) => ['image/jpeg', 'image/png', 'application/pdf'].includes(files[0].type),
      "Electricity bill must be a PDF or image (JPEG/PNG)"
    ),
  ledger: z.instanceof(FileList)
    .refine((files) => files.length > 0, "Ledger document is required")
    .refine((files) => files[0].size <= 5 * 1024 * 1024, "Ledger must be less than 5MB")
    .refine(
      (files) => ['image/jpeg', 'image/png', 'application/pdf'].includes(files[0].type),
      "Ledger must be a PDF or image (JPEG/PNG)"
    ),
  transaction_history: z.instanceof(FileList)
    .refine((files) => files.length > 0, "Transaction history is required")
    .refine((files) => files[0].size <= 5 * 1024 * 1024, "Transaction history must be less than 5MB")
    .refine(
      (files) => ['image/jpeg', 'image/png', 'application/pdf'].includes(files[0].type),
      "Transaction history must be a PDF or image (JPEG/PNG)"
    ),
});

// Type for the form data, inferred from the schema
type LoanFormData = z.infer<typeof loanFormSchema>;

// Props interface for LoanForm
interface LoanFormProps {
  onSubmitSuccess?: () => void;
}

// LoanForm component
const LoanForm: React.FC<LoanFormProps> = ({ onSubmitSuccess }) => {
  const router = useRouter();
  const [filePreview, setFilePreview] = useState<{[key: string]: string}>({});

  // Initialize React Hook Form with Zod resolver
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch
  } = useForm<LoanFormData>({
    resolver: zodResolver(loanFormSchema),
  });

  // Handle file preview
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>, fieldName: string) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFilePreview(prev => ({
          ...prev,
          [fieldName]: reader.result as string
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  // Handle form submission
  const onSubmit = async (data: LoanFormData) => {
    try {
      // Create FormData for file uploads
      const formData = new FormData();

      // Add text fields
      formData.append('age', data.age);
      formData.append('gender', data.gender);
      formData.append('address', data.address);
      formData.append('google_review', data.google_review);
      formData.append('family_income', data.family_income);
      formData.append('have_vehicle', data.have_vehicle);
      formData.append('electricity_bill', data.electricity_bill);
      formData.append('savings', data.savings);

      // Add file uploads
      formData.append('aadhar_card', data.aadhar_card[0]);
      formData.append('pan_card', data.pan_card[0]);
      formData.append('electricity_bill_doc', data.electricity_bill_doc[0]);
      formData.append('ledger', data.ledger[0]);
      formData.append('transaction_history', data.transaction_history[0]);

      // Send the form data to the API endpoint
      const response = await axios.post("/api/submitLoanApplication", formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      console.log("Loan application submitted successfully:", response.data);

      // Call the success callback if provided
      if (onSubmitSuccess) {
        onSubmitSuccess();
      }

      // Redirect to the loan status page or dashboard
      router.push("/loan-status");
    } catch (error) {
      console.error("Error submitting loan application:", error);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white p-6 rounded-lg shadow-md w-full max-w-md"
      >
        {/* Existing form fields (age, gender, etc.) remain the same as in the previous version */}
        {/* Age Field */}
        <div className="mb-4">
          <label htmlFor="age" className="block text-sm font-medium text-gray-700">
            Age
          </label>
          <input
            id="age"
            {...register("age")}
            type="text"
            className="w-full p-2 border rounded mt-2"
            placeholder="Enter your age"
          />
          {errors.age && (
            <p className="text-red-500 text-sm mt-1">{errors.age.message}</p>
          )}
        </div>

        {/* Gender Field */}
        <div className="mb-4">
          <label htmlFor="gender" className="block text-sm font-medium text-gray-700">
            Gender
          </label>
          <select
            id="gender"
            {...register("gender")}
            className="w-full p-2 border rounded mt-2"
          >
            <option value="">Select gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
          </select>
          {errors.gender && (
            <p className="text-red-500 text-sm mt-1">{errors.gender.message}</p>
          )}
        </div>

        {/* Address Field */}
        <div className="mb-4">
          <label htmlFor="address" className="block text-sm font-medium text-gray-700">
            Address
          </label>
          <textarea
            id="address"
            {...register("address")}
            className="w-full p-2 border rounded mt-2"
            placeholder="Enter your address"
          ></textarea>
          {errors.address && (
            <p className="text-red-500 text-sm mt-1">{errors.address.message}</p>
          )}
        </div>

        {/* Google Review Field */}
        <div className="mb-4">
          <label htmlFor="google_review" className="block text-sm font-medium text-gray-700">
            Google Review (1-5)
          </label>
          <input
            id="google_review"
            {...register("google_review")}
            type="text"
            className="w-full p-2 border rounded mt-2"
            placeholder="Enter your Google review score"
          />
          {errors.google_review && (
            <p className="text-red-500 text-sm mt-1">{errors.google_review.message}</p>
          )}
        </div>

        {/* Family Income Field */}
        <div className="mb-4">
          <label htmlFor="family_income" className="block text-sm font-medium text-gray-700">
            Family Income
          </label>
          <input
            id="family_income"
            {...register("family_income")}
            type="text"
            className="w-full p-2 border rounded mt-2"
            placeholder="Enter your family income"
          />
          {errors.family_income && (
            <p className="text-red-500 text-sm mt-1">{errors.family_income.message}</p>
          )}
        </div>

        {/* Have Vehicle Field */}
        <div className="mb-4">
          <label htmlFor="have_vehicle" className="block text-sm font-medium text-gray-700">
            Do you own a vehicle?
          </label>
          <select
            id="have_vehicle"
            {...register("have_vehicle")}
            className="w-full p-2 border rounded mt-2"
          >
            <option value="">Select option</option>
            <option value="yes">Yes</option>
            <option value="no">No</option>
          </select>
          {errors.have_vehicle && (
            <p className="text-red-500 text-sm mt-1">{errors.have_vehicle.message}</p>
          )}
        </div>

        {/* Electricity Bill Field */}
        <div className="mb-4">
          <label
            htmlFor="electricity_bill"
            className="block text-sm font-medium text-gray-700"
          >
            Electricity Bill
          </label>
          <input
            id="electricity_bill"
            {...register("electricity_bill")}
            type="text"
            className="w-full p-2 border rounded mt-2"
            placeholder="Enter your electricity bill amount"
          />
          {errors.electricity_bill && (
            <p className="text-red-500 text-sm mt-1">{errors.electricity_bill.message}</p>
          )}
        </div>

        {/* Savings Field */}
        <div className="mb-4">
          <label htmlFor="savings" className="block text-sm font-medium text-gray-700">
            Savings
          </label>
          <input
            id="savings"
            {...register("savings")}
            type="text"
            className="w-full p-2 border rounded mt-2"
            placeholder="Enter your savings amount"
          />
          {errors.savings && (
            <p className="text-red-500 text-sm mt-1">{errors.savings.message}</p>
          )}
        </div>


        
        {/* Document Upload Fields */}
        {/* Aadhar Card Upload */}
        <div className="mb-4">
          <label htmlFor="aadhar_card" className="block text-sm font-medium text-gray-700">
            Aadhar Card (PDF or Image)
          </label>
          <input
            id="aadhar_card"
            type="file"
            {...register("aadhar_card")}
            onChange={(e) => handleFileChange(e, 'aadhar_card')}
            accept=".pdf,.jpg,.jpeg,.png"
            className="w-full p-2 border rounded mt-2"
          />
          {errors.aadhar_card && (
            <p className="text-red-500 text-sm mt-1">{errors.aadhar_card.message}</p>
          )}
          {filePreview.aadhar_card && (
            <div className="mt-2">
              <img 
                src={filePreview.aadhar_card} 
                alt="Aadhar Card Preview" 
                className="h-24 w-auto object-contain"
              />
            </div>
          )}
        </div>

        {/* PAN Card Upload */}
        <div className="mb-4">
          <label htmlFor="pan_card" className="block text-sm font-medium text-gray-700">
            PAN Card (PDF or Image)
          </label>
          <input
            id="pan_card"
            type="file"
            {...register("pan_card")}
            onChange={(e) => handleFileChange(e, 'pan_card')}
            accept=".pdf,.jpg,.jpeg,.png"
            className="w-full p-2 border rounded mt-2"
          />
          {errors.pan_card && (
            <p className="text-red-500 text-sm mt-1">{errors.pan_card.message}</p>
          )}
          {filePreview.pan_card && (
            <div className="mt-2">
              <img 
                src={filePreview.pan_card} 
                alt="PAN Card Preview" 
                className="h-24 w-auto object-contain"
              />
            </div>
          )}
        </div>

        {/* Electricity Bill Upload */}
        <div className="mb-4">
          <label htmlFor="electricity_bill_doc" className="block text-sm font-medium text-gray-700">
            Electricity Bill (PDF or Image)
          </label>
          <input
            id="electricity_bill_doc"
            type="file"
            {...register("electricity_bill_doc")}
            onChange={(e) => handleFileChange(e, 'electricity_bill_doc')}
            accept=".pdf,.jpg,.jpeg,.png"
            className="w-full p-2 border rounded mt-2"
          />
          {errors.electricity_bill_doc && (
            <p className="text-red-500 text-sm mt-1">{errors.electricity_bill_doc.message}</p>
          )}
          {filePreview.electricity_bill_doc && (
            <div className="mt-2">
              <img 
                src={filePreview.electricity_bill_doc} 
                alt="Electricity Bill Preview" 
                className="h-24 w-auto object-contain"
              />
            </div>
          )}
        </div>

        {/* Ledger Upload */}
        <div className="mb-4">
          <label htmlFor="ledger" className="block text-sm font-medium text-gray-700">
            Ledger (PDF or Image)
          </label>
          <input
            id="ledger"
            type="file"
            {...register("ledger")}
            onChange={(e) => handleFileChange(e, 'ledger')}
            accept=".pdf,.jpg,.jpeg,.png"
            className="w-full p-2 border rounded mt-2"
          />
          {errors.ledger && (
            <p className="text-red-500 text-sm mt-1">{errors.ledger.message}</p>
          )}
          {filePreview.ledger && (
            <div className="mt-2">
              <img 
                src={filePreview.ledger} 
                alt="Ledger Preview" 
                className="h-24 w-auto object-contain"
              />
            </div>
          )}
        </div>

        {/* Transaction History Upload */}
        <div className="mb-4">
          <label htmlFor="transaction_history" className="block text-sm font-medium text-gray-700">
            Transaction History (PDF or Image)
          </label>
          <input
            id="transaction_history"
            type="file"
            {...register("transaction_history")}
            onChange={(e) => handleFileChange(e, 'transaction_history')}
            accept=".pdf,.jpg,.jpeg,.png"
            className="w-full p-2 border rounded mt-2"
          />
          {errors.transaction_history && (
            <p className="text-red-500 text-sm mt-1">{errors.transaction_history.message}</p>
          )}
          {filePreview.transaction_history && (
            <div className="mt-2">
              <img 
                src={filePreview.transaction_history} 
                alt="Transaction History Preview" 
                className="h-24 w-auto object-contain"
              />
            </div>
          )}
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600 w-full"
        >
          Submit Loan Application
        </button>
        {/* Link Button */}
        <div className="mb-4">
          <a
            href="https://colab.research.google.com/drive/1ftIg0SSyjMkqsg9621Ag7W8Yo4fflXZM?usp=sharing"
            className="w-full block text-center text-blue-500 p-2 rounded mt-2 border border-blue-500 hover:bg-blue-500 hover:text-white transition-all"
          >
            Google colab
          </a>
        </div>
      </form>
    </div>
  );
};

export default LoanForm;