/**
 * Define all your API routes
 *
 * @author Sameer <sameerp.spaceo@gmail.com>
 */

 import { Router } from "express";
 import userApi from "./Api/v1/userApi"
 
 const router = Router();
 
 router.use("/api", userApi);

 
 export default router;
 