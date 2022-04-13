/**
 * Define all your API routes
 *
 * @author Sameer <sameerp.spaceo@gmail.com>
 */

import { Router } from "express";

import AuthController from "../../../controllers/Api/v1/AuthController";
import validator from "../../../middlewares/validator";

const router = Router();

router.post("/login", validator("login"), AuthController.login);
router.post("/signup", validator("signup"), AuthController.signup);
router.post(
  "/forgetPassword",
  validator("forgetPassword"),
  AuthController.forgetPassword
);
router.post(
  "/resetPassword/:_id",
  validator("resetPassword"),
  AuthController.resetPassword
);

export default router;
