import { Document } from "mongoose";

export default interface appInterface extends Document {
  app_platform: string;
  app_version: string;
  force_updatable: boolean;
}
