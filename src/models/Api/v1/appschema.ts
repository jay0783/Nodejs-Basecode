import mongoose from "mongoose";

// Define the User Schema
const appSchema = new mongoose.Schema(
  {
    app_platform: { type: String },
    app_version: { type: String },
    force_updatable: { type: Boolean },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);
export default appSchema;
