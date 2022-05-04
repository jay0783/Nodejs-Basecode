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
// router.use(auth.validateApiKey);
router.post("/login", validator("login"), AuthController.login);
router.post("/signup", validator("adminSignup"), AuthController.signup);
router.post("/google-login", AuthController.googleLogin);
router.post("/facebook-login", AuthController.facebookLogin);
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
//=============== below are routes that require authentication ==============//
// router.use(auth.verifyjwtToken);
router.get("/user-list", AuthController.userList);
router.get("/user-count", AuthController.userCount);
router.get("/get-user/:id", AuthController.getUserDetails);
router.post("/search-user", AuthController.searchUser);
router.delete("/delete-user/:id", AuthController.deleteUser);

router.post(
  "/edit-profile",
  validator("editProfile"),
  AuthController.editProfile
);

router.post(
  "/edit-password",
  validator("editPassword"),
  AuthController.editPassword
);

router.get("/settings/app-info", AuthController.getAppinfo);
router.put("/edit-app-info", AuthController.editAppinfo);
router.post("/app-info", AuthController.addAppinfo);

router.get("/get-all-pages", AuthController.getAllPage);
router.get("/get-page/:title", AuthController.getPage);
router.put("/edit-page", AuthController.editPage);

export default router;
