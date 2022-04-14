import mongoose from "mongoose";

const userSocialSchema: mongoose.Schema = new mongoose.Schema(
  {
    socialId: { type: String, required: true },
    type: { type: Number, required: true },
  },
  { timestamps: true }
);

export default userSocialSchema;
