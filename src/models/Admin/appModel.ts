import mongoose from "mongoose";
import appSchema from "./appschema";
import appInterface from "../../types/appInterface";

const app_setting = mongoose.model<appInterface>("app_setting", appSchema);

export default app_setting;
