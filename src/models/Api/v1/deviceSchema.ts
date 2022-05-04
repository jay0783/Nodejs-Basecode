import mongoose from "mongoose";
import UserModel from "./UserModel";

// Define the User Schema
const deviceSchema = new mongoose.Schema(
  {
    user_id: { type: mongoose.Schema.Types.ObjectId, ref: UserModel },
    device_name: { type: String },
    device_id: { type: String },
    device_type: { type: Number }, //1: android, 2: ios, 3: web
    isLoggedIn: { type: Number, default: 0 }, // 0 : false, 1 : true
    // fcm_key: { type: String },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);
export default deviceSchema;
