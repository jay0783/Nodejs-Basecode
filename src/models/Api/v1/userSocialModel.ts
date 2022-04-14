import mongoose from "mongoose";
import socialLogin from "../../../types/socialLogin";
import userSocialSchema from "./userSocialSchema";


const userSocialModel =
  mongoose.model < socialLogin > ("UserSocial", userSocialSchema);
  
export default userSocialModel;
