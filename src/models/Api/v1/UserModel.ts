/**
 * Define User model
 *
 * @author Faiz A. Farooqui <faiz@geekyants.com>
 */

import * as crypto from "crypto";
//import * as bcrypt from 'bcrypt-nodejs';

import UserInterface from "../../../@Types/UserInterface";
import UserSchema from "./UserSchema";
import mongoose from "../../../config/Database";

// Create the model schema & register your custom methods here
export interface UserModel extends UserInterface, mongoose.Document {

}

// Custom Methods

// Compares the user's password with the request password
//  UserSchema.methods.comparePassword = function (_requestPassword, _cb): any {
//      bcrypt.compare(_requestPassword, this.password, (_err, _isMatch) => {
//          return _cb(_err, _isMatch);
//      });
//  };

const User = mongoose.model<UserModel>("User", UserSchema);

export default User;
