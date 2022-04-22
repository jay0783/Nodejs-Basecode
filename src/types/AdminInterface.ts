/**
 * Define interface for User Model
 *
 * @author Sameer <sameerp.spaceo@gmail.com>
 */

import { Document } from "mongoose";

export default interface AdminInterface extends Document {
  fullname: string;
  email: string;
  password: string;
  socialLogin?: string[];
  loginType: number; //0 : Normal , 1 : Social
  emailTime: number;
}
