import { Document } from "mongoose";

export default interface appInterface extends Document {
  app_version: string[];
}
