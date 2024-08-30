import bcrypt from "bcrypt";
import { config } from "dotenv";
import User from "../models/user.model.mjs";
import jwt from "jsonwebtoken";

config();

const secretKey = process.env.SECRET_KEY;
const saltRounds = parseInt(process.env.NO_OF_SALT_ROUNDS);

export const signinAPI = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
      return next({ statusCode: 404, message: "Invalid email or password" });
    }

    const combinedPassword = password + secretKey;
    const passwordMatched = await bcrypt.compare(
      combinedPassword,
      user.password
    );

    if (!passwordMatched) {
      return next({ statusCode: 401, message: "Invalid email or password" });
    }

    const jwtToken = jwt.sign({ id: user._id }, secretKey, {
      expiresIn: "1day",
      algorithm: "HS512",
    });

    const {password: userPassword, ...restUserInfo} = user._doc;

    res
      .cookie("jwt_token", jwtToken, { httpOnly: true })
      .status(200)
      .json({ message: "Welcome to Housefy", user: restUserInfo });
  } catch (err) {
    console.error("Error in signing in", err);
    return next({ statusCode: 500, message: "Error occurred in signing in" });
  }
};

export const signupAPI = async (req, res, next) => {
  try {
    const { firstName, lastName, email, password } = req.body;
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return next({
        statusCode: 400,
        message: "User already exists with this email",
      });
    }

    const combinedPassword = password + secretKey;
    const hashedPassword = await bcrypt.hash(combinedPassword, saltRounds);

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
