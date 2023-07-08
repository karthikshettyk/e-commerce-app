import { Router } from "express";
import {createOrder,generateRazorPayId,getAllOrders,getMyOrders,updateOrderStatus} from "../controllers/order.controller.js";
import {isLoggedIn,authorize} from "../middilewares/auth.middleware.js";
import authRoles from "../utils/authRoles.js";

const router = Router();

router.post("/createorder",isLoggedIn,createOrder);
router.post("/generateorderid",isLoggedIn,generateRazorPayId);
router.get("/allordersadmin",isLoggedIn,authorize(authRoles.ADMIN),getAllOrders);
router.get("/myorders",isLoggedIn,getMyOrders);
router.put("/updateorderstatus",isLoggedIn,authorize(authRoles.ADMIN),updateOrderStatus);


export default router;