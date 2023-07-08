import { Router } from "express";
import {createProduct,getAllProducts,getProductById,updateProductById,deleteProductById} from "../controllers/product.controller.js";
import {isLoggedIn,authorize} from "../middilewares/auth.middleware.js";
import authRoles from "../utils/authRoles.js";

const router = Router();

router.post("/addproduct",isLoggedIn,authorize(authRoles.ADMIN),createProduct);
router.post("/getallproducts",isLoggedIn,getAllProducts);
router.get("/getproduct",isLoggedIn,getProductById);
router.put("/updateproduct",isLoggedIn,authorize(authRoles.ADMIN),updateProductById);
router.delete("/deleteproduct",isLoggedIn,authorize(authRoles.ADMIN),deleteProductById);

export default router;