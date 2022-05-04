import mongoose from "mongoose";
import userSocialModel from "./userSocialModel";

// Define the User Schema
const UserSchema = new mongoose.Schema(
  {
    fullname: { type: String },
    email: { type: String },
    mobile: { type: Number },
    password: { type: String },
    socialLogin: [
      { type: mongoose.Schema.Types.ObjectId, ref: userSocialModel },
    ],
    loginType: { type: Number, default: 0 }, //0 : Normal , 1 : Social
    emailTime: { type: Number, default: null },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);
export default UserSchema;
