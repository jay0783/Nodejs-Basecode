/**
 * Define all your API routes
 *
 * @author Sameer <sameerp.spaceo@gmail.com>
 */

import { Router } from "express";

import AuthController from "../../../controllers/Api/v1/AuthController";

const router = Router();

//router.get('/', HomeController.index);

router.post("/auth/login", AuthController.login);
//router.post('/auth/register', RegisterController.perform);
//router.post('/auth/refresh-token', expressJwt({ secret: Locals.config().appSecret }), RefreshTokenController.perform);

export default router;
