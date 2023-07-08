 import { Router } from "express";
import {
  signUp,
  signIn,
  logout,
  forgetPassword,
  resetPassword,
  getProfile,
} from "../controllers/auth.controller.js";
import { isLoggedIn } from "../middilewares/auth.middleware.js";

const router = Router();

 router.post("/signup", signUp);
 router.post("/signin", signIn);
 router.get("/logout", logout);
 router.get("/password/forget", forgetPassword);
 router.get("/password/reset/:token", resetPassword);
 router.get("/profile", isLoggedIn, getProfile);

 export default router;
