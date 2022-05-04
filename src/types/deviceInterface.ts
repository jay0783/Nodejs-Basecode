import { Document } from "mongoose";

export default interface deviceInterface extends Document {
  user_id: string;
  device_name: string;
  device_id: string;
  isLoggedIn: boolean;
  device_type: number; //1: android, 2: ios, 3: web
  //   fcm_key: string;
}
