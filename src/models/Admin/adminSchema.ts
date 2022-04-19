import bcryptjs from "bcryptjs";
import mongoose from "mongoose";
import adminSocial from "./adminSocialModel";
// Define the User Schema
const AdminSchema = new mongoose.Schema(
  {
    fullname: { type: String },
    email: { type: String },
    password: { type: String },
    socialLogin: [{ type: mongoose.Schema.Types.ObjectId, ref: adminSocial }],
    emailTime: { type: String },
  },
  {
    timestamps: true,
  }
);
// AdminSchema.pre("save", function () {
//   this.password = bcryptjs.hashSync(this.password);
// });

export default AdminSchema;
