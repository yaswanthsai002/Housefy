import User from "../models/user.model.mjs";
import bcrypt from "bcrypt";

const secretKey = process.env.SECRET_KEY;
const saltRounds = process.env.SALT_ROUNDS;

export const updateUser = async (req, res, next) => {
  if (req.user.id !== req.params.id) {
    return next({ status: 401, message: "Unauthorized User" });
  }

  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return next({ status: 404, message: "No User Found" });
    }

    const {
      firstName,
      lastName,
      dateOfBirth,
      mobile,
      gender,
      country,
      state,
      city,
      profilePhotoURL,
      email,
      password,
    } = req.body;

    const updates = {
      firstName: firstName || user.firstName,
      lastName: lastName || user.lastName,
      dateOfBirth: dateOfBirth || user.dateOfBirth,
      mobile: mobile || user.mobile,
      gender: gender || user.gender,
      country: country || user.country,
      state: state || user.state,
      city: city || user.city,
      profilePhotoURL: profilePhotoURL || user.profilePhotoURL,
      email: email || user.email,
      password: password
        ? await bcrypt.hash(password + secretKey, saltRounds)
        : user.password,
    };

    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      { $set: updates },
      { new: true }
    );

    if (!updatedUser) {
      return next({ status: 404, message: "User not found" });
    }

    const {
      password: _,
      __v,
      createdAt,
      updatedAt,
      ...userData
    } = updatedUser._doc;
    return res.status(200).json({ message: "User Updated", user: userData });
  } catch (err) {
    console.error("Error occurred while updating user:", err);
    return next({ status: 500, message: "Error occurred while updating user" });
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

    const isPasswordMatch = await bcrypt.compare(
      password + secretKey,
      user.password
    );
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
