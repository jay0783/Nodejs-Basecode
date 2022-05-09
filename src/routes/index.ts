/**
 * Define all your API routes
 *
 * @author Jay Patel <sameerp.spaceo@gmail.com>
 */

import { Router } from "express";
import userApi from "./Api/v1/userApi";
import adminApi from "./Admin/Admin";

const router = Router();

router.use("/api/v1", userApi);
router.use("/admin", adminApi);

export default router;
