/**
 * Define all your API routes
 *
 * @author Sameer <sameerp.spaceo@gmail.com>
 */

import { Router } from "express";

import AuthController from "../../controllers/Api/Admin/AuthController";
//  import validator from "../../../middlewares/validator";
import auth from "../../middlewares/auth";

const router = Router();
//  router.use(auth.validateApiKey);
router.post("/login", AuthController.login);
router.post("/signup", AuthController.signup);
router.get("/userList", AuthController.userList);
router.post("/editProfile/:_id", AuthController.editProfile);
router.post("/forgetPassword", AuthController.forgetPassword);
router.post("/resetPassword/:_id", AuthController.resetPassword);

export default router;
