"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import axios from "axios";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

// Updated schema to parse age as a string and convert to number
const formSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  adharNo: z.string().regex(/^\d{12}$/, "Aadhar Number must be exactly 12 digits"),
  panNo: z
    .string()
    .regex(/^[A-Z]{5}\d{4}[A-Z]{1}$/, "PAN Number must follow the correct format (e.g., ABCDE1234F)"),
  age: z.string().refine((val) => {
    const parsed = parseInt(val, 10);
    return !isNaN(parsed) && parsed >= 18;
  }, "Age must be a number and at least 18"),
  marital_status: z.enum(["single", "married"]),
  gender: z.enum(["male", "female", "other"]),
  address: z.string().min(10, "Address must be at least 10 characters"),
});

type FormData = z.infer<typeof formSchema>;

const SimpleForm: React.FC = () => {
  const { register, handleSubmit, formState: { errors } } = useForm<FormData>({
    resolver: zodResolver(formSchema),
  });

  const router = useRouter();

  const onSubmit = async (data: FormData) => {
    try {
      // Convert the age value to a number during submission
      const formData = { 
        ...data, 
        age: parseInt(data.age, 10)  // Convert age to number explicitly
      };

      const response = await axios.post("/api/submitForm", formData);
      console.log("Form submitted successfully:", response.data);

      // Redirect to dashboard after successful form submission
      router.push("/dashboard");
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  return (
    <div className="max-w-lg mx-auto mt-10 p-4 border rounded">
      <h1 className="text-xl font-bold mb-4">User Details Form</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {/* Name Field */}
        <div>
          <label htmlFor="name" className="block font-medium">
            Name
          </label>
          <input
            id="name"
            {...register("name")}
            placeholder="Enter your name"
            className={`w-full p-2 border rounded ${errors.name ? "border-red-500" : "border-gray-300"}`}
          />
          {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>}
        </div>

        {/* Aadhar Number Field */}
        <div>
          <label htmlFor="adharNo" className="block font-medium">
            Aadhar Number
          </label>
          <input
            id="adharNo"
            {...register("adharNo")}
            placeholder="Enter your Aadhar number"
            className={`w-full p-2 border rounded ${errors.adharNo ? "border-red-500" : "border-gray-300"}`}
          />
          {errors.adharNo && <p className="text-red-500 text-sm mt-1">{errors.adharNo.message}</p>}
        </div>

        {/* PAN Number Field */}
        <div>
          <label htmlFor="panNo" className="block font-medium">
            PAN Number
          </label>
          <input
            id="panNo"
            {...register("panNo")}
            placeholder="Enter your PAN number"
            className={`w-full p-2 border rounded ${errors.panNo ? "border-red-500" : "border-gray-300"}`}
          />
          {errors.panNo && <p className="text-red-500 text-sm mt-1">{errors.panNo.message}</p>}
        </div>

        {/* Age Field */}
        <div>
          <label htmlFor="age" className="block font-medium">
            Age
          </label>
          <input
            id="age"
            type="number"
            {...register("age")}
            placeholder="Enter your age"
            className={`w-full p-2 border rounded ${errors.age ? "border-red-500" : "border-gray-300"}`}
          />
          {errors.age && <p className="text-red-500 text-sm mt-1">{errors.age.message}</p>}
        </div>

        {/* Marital Status Field */}
        <div>
          <label htmlFor="marital_status" className="block font-medium">
            Marital Status
          </label>
          <select
            id="marital_status"
            {...register("marital_status")}
            className={`w-full p-2 border rounded ${errors.marital_status ? "border-red-500" : "border-gray-300"}`}
          >
            <option value="single">Single</option>
            <option value="married">Married</option>
          </select>
          {errors.marital_status && (
            <p className="text-red-500 text-sm mt-1">{errors.marital_status.message}</p>
          )}
        </div>

        {/* Gender Field */}
        <div>
          <label htmlFor="gender" className="block font-medium">
            Gender
          </label>
          <select
            id="gender"
            {...register("gender")}
            className={`w-full p-2 border rounded ${errors.gender ? "border-red-500" : "border-gray-300"}`}
          >
            <option value="">Select gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
          </select>
          {errors.gender && <p className="text-red-500 text-sm mt-1">{errors.gender.message}</p>}
        </div>

        {/* Address Field */}
        <div>
          <label htmlFor="address" className="block font-medium">
            Address
          </label>
          <textarea
            id="address"
            {...register("address")}
            placeholder="Enter your address"
            className={`w-full p-2 border rounded ${errors.address ? "border-red-500" : "border-gray-300"}`}
          />
          {errors.address && <p className="text-red-500 text-sm mt-1">{errors.address.message}</p>}
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default SimpleForm;