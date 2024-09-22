import bcrypt from "bcrypt";
import { config } from "dotenv";
import User from "../models/user.model.mjs";
import jwt from "jsonwebtoken";

config();

const secretKey = process.env.SECRET_KEY;
const saltRounds = parseInt(process.env.NO_OF_SALT_ROUNDS);

export const signInAPI = async (req, res, next) => {
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

    const { password: userPassword, ...restUserInfo } = user._doc;

    res
      .cookie("jwt_token", jwtToken, {
        httpOnly: true,
        secure: true,
        sameSite: "Strict",
      })
      .status(200)
      .json({ message: "Welcome to Housefy", user: restUserInfo });
  } catch (err) {
    console.error("Error in signing in", err);
    return next({ statusCode: 500, message: "Error occurred in signing in" });
  }
};

export const signUpAPI = async (req, res, next) => {
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

export const googleSignInAPI = async (req, res, next) => {
  try {
    const { name, email, photoURL } = req.body;
    const user = await User.findOne({ email });
    if (user) {
      const jwtToken = jwt.sign({ id: user._id }, secretKey, {
        expiresIn: "1day",
        algorithm: "HS512",
      });
      const { password: userPassword, ...restUserInfo } = user._doc;
      res
        .cookie("jwt_token", jwtToken, { httpOnly: true })
        .status(200)
        .json({ message: "Welcome to Housefy", user: restUserInfo });
    } else {
      const splitNames = name.split(" ");
      let firstName;
      let lastName;
      if (splitNames.length > 0) {
        [firstName, lastName] = splitNames;
      } else {
        firstName = lastName = splitNames;
      }
      const generatedPassword =
        Math.random().toString(36).slice(-8) +
        Math.random().toString(36).slice(-8);
      const combinedPassword = generatedPassword + secretKey;
      const hashedPassword = await bcrypt.hash(combinedPassword, saltRounds);
      const newUser = User({
        firstName,
        lastName,
        email,
        password: hashedPassword,
        profilePhotoURL: photoURL,
      });
      await newUser.save();
      const jwtToken = jwt.sign({ id: newUser._id }, secretKey, {
        expiresIn: "1day",
        algorithm: "HS512",
      });
      const { password: userPassword, ...restUserInfo } = newUser._doc;
      res
        .cookie("jwt_token", jwtToken, { httpOnly: true })
        .status(200)
        .json({ message: "Welcome to Housefy", user: restUserInfo });
    }
  } catch (error) {
    console.error("Error in google signin", error);
    return next({
      statusCode: 500,
      message: "Error occurred in google signin",
    });
  }
};

export const validateSessionAPI = async (req, res, next) => {
  const token = req.cookies?.jwt_token;

  if (!token) {
    return next({ status: 401, message: "Unauthorized User", isValid: false });
  }

  try {
    const decoded = jwt.verify(token, secretKey);
    return res.json({ status: 200, isValid: true });
  } catch (error) {
    console.error("Token verification error:", error);
    return next({
      status: error.name === "TokenExpiredError" ? 401 : 500,
      message: error.message,
      isValid: false,
    });
  }
};
