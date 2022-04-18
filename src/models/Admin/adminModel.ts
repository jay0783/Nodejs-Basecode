import * as crypto from "crypto";
//import * as bcrypt from 'bcrypt-nodejs';

import mongoose from "mongoose";
import AdminInterface from "../../types/AdminInterface";
import AdminSchema from "./adminSchema";

// Create the model schema & register your custom methods here
// export interface AdminModel extends AdminInterface, mongoose.Document {}

// Custom Methods

// Compares the user's password with the request password
//  UserSchema.methods.comparePassword = function (_requestPassword, _cb): any {
//      bcrypt.compare(_requestPassword, this.password, (_err, _isMatch) => {
//          return _cb(_err, _isMatch);
//      });
//  };

const User = mongoose.model("Admin", AdminSchema);

export default User;
