import mongoose from "mongoose";

const userSchema = mongoose.Schema(
  {
    firstName: {
      type: String,
      required: [true, "First Name cannot be empty"],
      trim: true,
    },
    lastName: {
      type: String,
      required: [true, "Last Name cannot be empty"],
      trim: true,
    },
    email: {
      type: String,
      required: [true, "Email cannot be empty"],
      unique: true,
    },
    password: {
      type: String,
      required: [true, "Password cannot be empty"],
      trim: true,
    },
    profilePhotoURL: {
      type: String,
      default: "/icons/default-profile-picture.svg",
    },
    country: {
      type: String,
      default: "",
    },
    state: {
      type: String,
      default: "",
    },
    city: {
      type: String,
      default: "",
    },
    mobile: {
      type: String,
      default: "",
    },
    dateOfBirth: {
      type: Date,
      default: null,
    },
    gender: {
      type: String,
      default: null,
    },
    status: {
      type: String,
      enum: ["active", "disabled"],
      default: "active",
    },
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model("User", userSchema);

export default User;
