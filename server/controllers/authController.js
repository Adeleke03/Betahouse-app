import USER from "../models/userModel.js";
import crypto from "crypto";

// sign up

export const signUp = async (req, res) => {
  const { email, password, firstName, lastName, cPassword } = req.body;
  if (!email || !password || !firstName || !lastName || !cPassword) {
    res.status(400).json({
      success: false,
      errMsg: "all fields are required for registration",
    });
    return;
  }

  if (password !== cPassword) {
    res.status(400).json({ success: false, errMsg: "password do not match" });
    return;
  }
  
  if (password.length < 8) {
    res
    .status(400)
    .json({ success: false, errMsg: "min password length must be 8 chrs" });
    return;
  }

  try {
    const existingEmail = await USER.findOne({ email });
    if (existingEmail) {
      res.status(400).json({ success: false, errMsg: "Email already exists" });
      return;
    }
    
    const user = await USER.create({ ...req.body });
    res
    .status(201)
    .json({ success: true, message: "registration successful", user });
  } catch (error) {
    res.status(500).json(error.message);
  }
};

// sign in
export const signIn = async (req, res) => {
  const { email, password } = req.body;
  try {
    if (!email || !password) {
      return res.status(400).json({ success: false, errMsg: "All fields are required to sign in" });
    }

    const user = await USER.findOne({ email });
    if (!user) {
      return res.status(404).json({ success: false, errMsg: "User not found" });
    }

    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(401).json({ success: false, errMsg: "Email or password is incorrect" });
    }

    res.status(200).json({ success: true, message: "Login successful", user });
  } catch (error) {
    res.status(500).json({ success: false, errMsg: error.message });
  }
};
