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
      res.status(404);
      return next(new Error("No user found"));
    }
    const combinedPassword = password + secretKey;
    const userPassword = user[0].password;
    const passwordMatched = await bcrypt.compare(
      combinedPassword,
      userPassword
    );
    if (!passwordMatched) {
      res.status(401);
      return next(new Error("Invalid Credentials"));
    }
    res.status(200).json({ message: "Welcome to Housefy" });
  } catch (err) {
    console.error("Error in signing in", err);
    res.status(500);
    return next(new Error("Error occurred in signing in"));
  }
};

// @desc SignUp
// @route POST /api/signup
// @access public
export const signupAPI = async (req, res, next) => {
  try {
    const { first_name, last_name, email, password, age } = req.body;

    // Check if the user already exists
    const existingUser = await User.find({ email: email });
    if (existingUser && existingUser.length > 0) {
      res.status(400);
      return next(new Error("User already exists with this email"));
    }

    const combinedPassword = password + secretKey;
    const hashedPassword = await bcrypt.hash(
      combinedPassword,
      parseInt(saltRounds)
    );

    const newUser = new User({
      first_name,
      last_name,
      email,
      password: hashedPassword,
      age,
    });

    await newUser.save();
    res.status(201).json({ message: "User created" });
  } catch (err) {
    console.error("Error in signing up", err);
    res.status(500);
    return next(new Error("Error occurred in signing up"));
  }
};
