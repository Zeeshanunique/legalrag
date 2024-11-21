import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    adharNo: { type: String, required: true, unique: true },
    panNo: { type: String, required: true, unique: true },
    age: { type: Number, required: true },
    marital_status: { type: String, enum: ["single", "married"], required: true },
    gender: { type: String, enum: ["male", "female", "other"], required: true },
    address: { type: String, required: true },
   
  },
  {
    timestamps: true, // Automatically adds `createdAt` and `updatedAt` fields
  }
);

const User = mongoose.models.User || mongoose.model("User", UserSchema);

export default User;
