import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const userSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  email: { type: String, unique: true },
  password: String,
});

// Hash password before saving
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

// Compare password method
userSchema.methods.comparePassword = async function (candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password);
};
//generating jwt token 
userSchema.methods.generateToken = function () {
  return jwt.sign(
    { id: this._id, firstName: this.firstName },
    process.env.JWT_SECRET,
    { expiresIn: "24h" }
  );
};

const USER = mongoose.model("USER", userSchema);
export default USER;
