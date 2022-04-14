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
router.get(
  "/checkResetLink",
  auth.verifyjwtToken,
  AuthController.checkResetLink
);
router.post(
  "/resetPassword",
  auth.verifyjwtToken,
  validator("resetPassword"),
  AuthController.resetPassword
);

export default router;
