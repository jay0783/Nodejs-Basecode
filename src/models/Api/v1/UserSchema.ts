import bcryptjs from "bcryptjs";
import mongoose from "mongoose";
import userSocialModel from "./userSocialModel";

// Define the User Schema
const UserSchema = new mongoose.Schema(
  {
    fullname: { type: String },
    email: { type: String },
    mobile: { type: String },
    password: { type: String },
    socialLogin: [
      { type: mongoose.Schema.Types.ObjectId, ref: userSocialModel },
    ],
    loginType: { type: Number, default: 0 }, //0 : Normal , 1 : Social
    emailTime: { type: String, default: null },
    // passwordResetToken: { type: String },
    // passwordResetExpires: Date,

    // facebook: { type: String },
    // twitter: { type: String },
    // google: { type: String },
    // github: { type: String },
    // instagram: { type: String },
    // linkedin: { type: String },
    // steam: { type: String },
    // tokens: Array,

    // gender: { type: String },
    // geolocation: { type: String },
    // website: { type: String },
    // picture: { type: String },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

// UserSchema.pre("save", function () {
//   this.password = bcryptjs.hashSync(this.password);
// });

export default UserSchema;
