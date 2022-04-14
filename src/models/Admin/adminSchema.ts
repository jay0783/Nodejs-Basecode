import bcryptjs from "bcryptjs";
import mongoose from "../../config/Database";

// Define the User Schema
const AdminSchema = new mongoose.Schema(
  {
    fullname: { type: String },
    email: { type: String },
    password: { type: String },
    adminSocial: [{ type: mongoose.Schema.Types.ObjectId, ref: "adminSocial" }],
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

AdminSchema.pre("save", function () {
  this.password = bcryptjs.hashSync(this.password);
});

export default AdminSchema;
