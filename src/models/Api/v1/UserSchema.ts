import mongoose from "../../../config/Database";

// Define the User Schema
const UserSchema = new mongoose.Schema(
  {
    fullname: { type: String },
    email: { type: String},
    mobile: { type: String },
    password: { type: String },
    emailTime: { type: String },
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
    timestamps: true,
  }
);

export default UserSchema;
