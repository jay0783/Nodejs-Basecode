import { Document } from "mongoose";

export default interface pageInterface extends Document {
  title: string;
  slug: string;
  content: string;
  status: number;
}
