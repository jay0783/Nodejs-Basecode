/**
 * Define all your API routes
 *
 * @author Sameer <sameerp.spaceo@gmail.com>
 */

 import { Router } from "express";

 import AuthController from "../../../controllers/Api/v1/AuthController";
 
 const router = Router();
 
 router.post("/login", AuthController.login);
 router.post("/signup", AuthController.signup);
 router.post("/forgetPassword", AuthController.forgetPassword);
 router.post("/resetPassword/:_id", AuthController.resetPassword);
 
 export default router;
 