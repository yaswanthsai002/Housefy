import bcrypt from "bcrypt";
import { config } from "dotenv";
import User from "../models/user.model.mjs";

config();

const secretKey = process.env.SECRET_KEY;
const saltRounds = process.env.NO_OF_SALT_ROUNDS;

// @desc SignIn
// @route POST /api/signin
// @access public
export const signinAPI = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await User.find({ email: email });
    if (!user || user.length === 0) {
      return next({ statusCode: 404, message: "No user found" });
    }
    const combinedPassword = password + secretKey;
    const userPassword = user[0].password;
    const passwordMatched = await bcrypt.compare(
      combinedPassword,
      userPassword
    );
    if (!passwordMatched) {
      return next({ statusCode: 401, message: "Invalid Credentials" });
    }
    res.status(200).json({ message: "Welcome to Housefy" });
  } catch (err) {
    console.error("Error in signing in", err);
    return next({ statusCode: 500, message: "Error occurred in signing in" });
  }
};

// @desc SignUp
// @route POST /api/signup
// @access public
export const signupAPI = async (req, res, next) => {
  try {
    const { firstName, lastName, email, password } = req.body;

    const existingUser = await User.find({ email: email });
    if (existingUser && existingUser.length > 0) {
      return next({
        statusCode: 400,
        message: "User already exists with this email",
      });
    }

    const combinedPassword = password + secretKey;
    const hashedPassword = await bcrypt.hash(
      combinedPassword,
      parseInt(saltRounds)
    );

    const newUser = new User({
      firstName,
      lastName,
      email,
      password: hashedPassword,
    });

    await newUser.save();
    res.status(201).json({ message: "User created" });
  } catch (err) {
    console.error("Error in signing up", err);
    return next({ statusCode: 500, message: "Error occurred in signing up" });
  }
};
