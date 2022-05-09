import mongoose from "mongoose";
import pageSchema from "./pageSchema";
import pageInterface from "../../types/pageInterface";

const page = mongoose.model<pageInterface>("page", pageSchema);

export default page;
