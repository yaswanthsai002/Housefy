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
    proflePhotoURL: {
      type: String,
      default: "/images/default_profile_picture.jpg",
    },
    // age: {
    //   type: Number,
    //   min: 1,
    //   max: 100,
    //   required: [true, "Age is required"],
    //   default: () => Math.floor(Math.random() * 100),
    // },
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model("User", userSchema);

export default User;
