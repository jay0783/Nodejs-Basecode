import mongoose from "mongoose";
import Locals from "./Locals";
import logger from "../utils/logger";

export default class Database {
  // Initialize your database pool
  public static init(): any {
    const dsn = Locals.config().mongooseUrl;
    // use native ES6 promises instead of mongoose promise library
    (<any>mongoose).Promise = global.Promise;

    const options = {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    };

    mongoose
      .connect(dsn, options as object)
      .then(() => logger.info("mongoDB connected..."))
      .catch((err: { stack: any }) => {
        logger.error("Database starting error: ", err.stack);
        process.exit(1);
      });
  }
}
// Database.init();
