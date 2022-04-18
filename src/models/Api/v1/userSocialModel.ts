import mongoose from "mongoose";
import userSocialSchema from "./userSocialSchema";

const userSocialModel = mongoose.model("usersocial", userSocialSchema);

export default userSocialModel;
