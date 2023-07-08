import { Router } from "express";
import {createCollection,readCollection,updateCollection,deleteCollection} from "../controllers/collection.controller.js";
import {isLoggedIn,authorize} from "../middilewares/auth.middleware.js";
import authRoles from "../utils/authRoles.js";


const router = Router();

router.post("/create",isLoggedIn,authorize(authRoles.ADMIN),createCollection);
router.get("/getcollection",isLoggedIn,authorize(authRoles.ADMIN),readCollection);
router.put("/updatecollection",isLoggedIn,authorize(authRoles.ADMIN),updateCollection);
router.delete("/deletecollection",isLoggedIn,authorize(authRoles.ADMIN),deleteCollection);

export default router;