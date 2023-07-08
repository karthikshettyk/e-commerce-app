import { Router } from "express";
import {
  createCoupon,
  readAllCoupon,
  updateCoupon,
  deleteCoupon,
} from "../controllers/coupon.controller.js";

import {isLoggedIn,authorize} from "../middilewares/auth.middleware.js";

import authRoles from "../utils/authRoles.js";

const router = Router();

router.post("/create",isLoggedIn,authorize(authRoles.ADMIN),createCoupon);
router.get("/getcoupons",isLoggedIn,authorize(authRoles.ADMIN), readAllCoupon);
router.put("/updatecoupon",isLoggedIn,authorize(authRoles.ADMIN), updateCoupon);
router.delete("/deletecoupon",isLoggedIn,authorize(authRoles.ADMIN),deleteCoupon);

export default router;
