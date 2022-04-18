import mongoose from "mongoose";
import adminSocialSchema from "./adminSocialSchema";

const adminSocialModel = mongoose.model("adminSocial", adminSocialSchema);

export default adminSocialModel;
