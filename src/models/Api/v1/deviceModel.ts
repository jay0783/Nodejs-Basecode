import mongoose from "mongoose";
import deviceSchema from "./deviceSchema";
import deviceInterface from "../../../types/deviceInterface";

const device = mongoose.model<deviceInterface>("device", deviceSchema);

export default device;
