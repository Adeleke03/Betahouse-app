import USER from "../models/userModel.js";
import jwt from "jsonwebtoken";
import crypto from "crypto"; // Not used currently, you can remove if unnecessary

// SIGN UP
export const signUp = async (req, res) => {
  const { email, password, firstName, lastName, cPassword } = req.body;

  if (!email || !password || !firstName || !lastName || !cPassword) {
    return res.status(400).json({
      success: false,
      errMsg: "All fields are required for registration",
    });
  }

  if (password !== cPassword) {
    return res
      .status(400)
      .json({ success: false, errMsg: "Passwords do not match" });
  }

  if (password.length < 8) {
    return res
      .status(400)
      .json({ success: false, errMsg: "Password must be at least 8 characters" });
  }

  try {
    const existingEmail = await USER.findOne({ email });
    if (existingEmail) {
      return res
        .status(400)
        .json({ success: false, errMsg: "Email already exists" });
    }

    const user = await USER.create({ email, password, firstName, lastName });

    const token = user.generateToken();

    res.status(201).json({
      success: true,
      message: "Registration successful",
      user: {
        id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        token,
      },
    });
  } catch (error) {
    res.status(500).json({ success: false, errMsg: error.message });
  }
};

// SIGN IN
export const signIn = async (req, res) => {
  const { email, password } = req.body;

  try {
    if (!email || !password) {
      return res
        .status(400)
        .json({ success: false, errMsg: "All fields are required to sign in" });
    }

    const user = await USER.findOne({ email });
    if (!user) {
      return res
        .status(404)
        .json({ success: false, errMsg: "User not found" });
    }

    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res
        .status(401)
        .json({ success: false, errMsg: "Email or password is incorrect" });
    }

    const token = user.generateToken();

    res.status(200).json({
      success: true,
      message: "Login successful",
      user: {
        id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        token,
      },
    });
  } catch (error) {
    res.status(500).json({ success: false, errMsg: error.message });
  }
};

// IS LOGGED IN
export const isLoggedIn = async (req, res) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader?.startsWith("Bearer")) {
      return res
        .status(401)
        .json({ success: false, errMsg: "Unauthorized: No token provided" });
    }

    const token = authHeader.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const user = await USER.findById(decoded.id).select("firstName email");

    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    res.status(200).json({
      success: true,
      user,
    });
  } catch (error) {
    res.status(401).json({ success: false, message: "Invalid token" });
  }
};
