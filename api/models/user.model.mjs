import mongoose from "mongoose";

const userSchema = mongoose.Schema(
  {
    first_name: {
      type: String,
      required: [true, "First Name cannot be empty"],
      trim: true,
    },
    last_name: {
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
    age: {
      type: Number,
      min: 1,
      max: 100,
      required: [true, "Age is required"],
    },
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model("User", userSchema);

export default User;
