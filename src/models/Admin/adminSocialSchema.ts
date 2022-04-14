import mongoose from "mongoose";
const userSocialSchema = new mongoose.Schema(
  {
    socialId: { type: String, required: true },

    type: { type: Number, required: true },
  },
  { timestamps: true }
);
