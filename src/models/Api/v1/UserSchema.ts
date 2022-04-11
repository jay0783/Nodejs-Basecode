import mongoose from "../../../config/Database";

// Define the User Schema
const UserSchema = new mongoose.Schema(
  {
    email: { type: String, unique: true },
    password: { type: String },
    passwordResetToken: { type: String },
    passwordResetExpires: Date,

    facebook: { type: String },
    twitter: { type: String },
    google: { type: String },
    github: { type: String },
    instagram: { type: String },
    linkedin: { type: String },
    steam: { type: String },
    tokens: Array,

    fullname: { type: String },
    gender: { type: String },
    geolocation: { type: String },
    website: { type: String },
    picture: { type: String },
  },
  {
    timestamps: true,
  }
);

export default UserSchema;
