import mongoose from "mongoose";

const userSocialSchema: mongoose.Schema = new mongoose.Schema(
  {
    socialId: { type: String, required: true },
    type: { type: Number, required: true }, // 1: facebook , 2: Google
    // userId :{ type: mongoose.Schema.Types.ObjectId, ref: "User" }
  },
  { timestamps: true }
);

export default userSocialSchema;
