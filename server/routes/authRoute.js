import express from "express";
import { signIn, signUp, isLoggedIn } from "../controllers/authController.js";

const router = express.Router();

// sign up route

router.post("/sign-up", signUp);

// sign in route

router.post("/sign-in", signIn);

//isLoggedIn
router.get("/isloggedin", isLoggedIn)

export default router;