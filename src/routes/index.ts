import express from "express";
import apiV1 from "./Api/v1/Api";
import admin from "./Admin/Admin";
const route = express.Router();

/**
 * Candidate Api routing
 */

route.use("/api/v1/", apiV1);
route.use("/admin", admin);
export default route;
