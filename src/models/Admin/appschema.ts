import mongoose from "mongoose";

// Define the User Schema
const appSchema = new mongoose.Schema(
  {
    app_version: [
      {
        app_platform: String,
        app_version: String,
        force_updatable: Boolean,
      },
    ],
  },
  {
    versionKey: false,
    timestamps: true,
  }
);
export default appSchema;
