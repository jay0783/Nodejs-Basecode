import mongoose from "mongoose";
import adminSocialSchema from "./adminSocialSchema";
import socialLogin from "../../types/socialLogin";

const adminSocialModel = mongoose.model<socialLogin>(
  "adminSocial",
  adminSocialSchema
);

export default adminSocialModel;
