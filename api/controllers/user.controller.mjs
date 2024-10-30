import User from "../models/user.model.mjs";
import bcrypt from "bcrypt";

const secretKey = process.env.SECRET_KEY;

export const updateUser = async (req, res, next) => {
  if (req.user.id !== req.params.id) {
    return next({ status: 401, message: "Unauthorized User" });
  }
  try {
    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      {
        $set: {
          firstName: req.body.firstName,
          lastName: req.body.lastName,
          dateOfBirth: req.body.dateOfBirth,
          mobile: req.body.mobile,
          gender: req.body.gender,
          country: req.body.country,
          state: req.body.state,
          city: req.body.city,
          profilePhotoURL: req.body.profilePhotoURL,
          email: req.body.email,
        },
      },
      { new: true }
    );
    const { password: updatedUserPassword, __v, ...rest } = updatedUser._doc;
    return res.status(200).json({ message: "Updated User", user: rest });
  } catch (err) {
    console.error("Error occurred in updating user", err);
    return next({
      statusCode: 500,
      message: "Error occurred in updating user",
    });
  }
};

export const deleteUser = async (req, res, next) => {
  const { id } = req.params;
  const { email, password } = req.body;

  if (req.user.id !== id) {
    return next({ status: 401, message: "Unauthorized User" });
  }

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return next({ statusCode: 404, message: "Invalid email or password" });
    }

    const passwordMatched = await bcrypt.compare(
      password + secretKey,
      user.password
    );
    if (!passwordMatched) {
      return next({ statusCode: 401, message: "Invalid email or password" });
    }

    const deletionResult = await User.deleteOne({ _id: id });
    if (!deletionResult.deletedCount) {
      return next({ statusCode: 404, message: "No user found with that ID" });
    }

    return res
      .status(200)
      .json({ message: "User account deleted successfully" });
  } catch (err) {
    console.error("Error occurred in deleting user", err);
    return next({
      statusCode: 500,
      message: "Error occurred in deleting user",
    });
  }
};

export const disableUser = async (req, res, next) => {
  const { id } = req.params;
  const { email, password } = req.body;

  if (req.user.id !== id) {
    return next({ status: 401, message: "Unauthorized user" });
  }

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return next({ status: 404, message: "User not found" });
    }

    const isPasswordMatch = await bcrypt.compare(password, user.password);
    if (!isPasswordMatch) {
      return next({ status: 401, message: "Invalid email or password" });
    }

    await User.findByIdAndUpdate(id, { status: "disabled" }, { new: true });

    return res
      .status(200)
      .json({ message: "User account disabled successfully" });
  } catch (error) {
    console.error("Error occurred in disabling user:", error);
    return next({
      status: 500,
      message: "Error occurred while disabling the user account",
    });
  }
};
