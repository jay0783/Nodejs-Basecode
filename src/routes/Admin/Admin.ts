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
router.post("/google-login", AuthController.googleLogin);
router.post("/facebook-login", AuthController.facebookLogin);
router.get("/user-list", AuthController.userList);
router.get("/user-count", AuthController.userCount);
router.post(
  "/edit-profile",
  validator("editProfile"),
  AuthController.editProfile
);
router.post(
  "/forget-password",
  validator("forgetPassword"),
  AuthController.forgetPassword
);
router.get("/check-reset-link/:Authorization", AuthController.checkResetLink);
router.post(
  "/reset-password",
  validator("resetPassword"),
  AuthController.resetPassword
);
router.post(
  "/edit-password",
  validator("editPassword"),
  auth.verifyjwtToken,
  AuthController.editPassword
);

export default router;
