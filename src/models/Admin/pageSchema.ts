import mongoose from "mongoose";

// Define the User Schema
const pageSchema = new mongoose.Schema(
  {
    title: { type: String },
    slug: { type: String },
    content: { type: String },
    status: { type: Number, default: 1 }, //1: Active, 0 : InActive
  },
  {
    versionKey: false,
    timestamps: true,
  }
);
export default pageSchema;
