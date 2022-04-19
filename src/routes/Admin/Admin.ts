/**
 * Define all your API routes
 *
 * @author Sameer <sameerp.spaceo@gmail.com>
 */

import { Router } from "express";

import AuthController from "../../controllers/Api/Admin/AuthController";
import validator from "../../middlewares/validator";
import auth from "../../middlewares/auth";

const router = Router();
router.use(auth.validateApiKey);
router.post("/login", validator("login"), AuthController.login);
router.post("/signup", validator("adminSignup"), AuthController.signup);
router.get("/userList", AuthController.userList);
router.post(
  "/editProfile",
  validator("editProfile"),
  AuthController.editProfile
);
router.post(
  "/forgetPassword",
  validator("forgetPassword"),
  AuthController.forgetPassword
);
router.post("/checkResetLink", AuthController.checkResetLink);
router.post(
  "/resetPassword",
  validator("resetPassword"),
  AuthController.resetPassword
);
router.post(
  "/editPassword",
  validator("editPassword"),
  auth.verifyjwtToken,
  AuthController.editPassword
);

export default router;
