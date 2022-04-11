/**
 * Define App Configs
 *
 * @author Sameer
 */
import { Application } from "express";
import "dotenv/config";

export default class Locals 
  /**
   * Makes env configs available for your app
   * throughout the app's runtime
   */
  public static config(): any {
    const url = `${process.env.APP_URL}:${process.env.SERVER_PORT}`;
    const port = process.env.SERVER_PORT || 8080;
    const appSecret = process.env.APP_SECRET || "This is your responsibility!";
    const mongooseUrl = process.env.MONGOOSE_URL;
    const maxUploadLimit = process.env.APP_MAX_UPLOAD_LIMIT || "50mb";
    const maxParameterLimit = process.env.APP_MAX_PARAMETER_LIMIT || "50mb";

    const name = process.env.APP_NAME || "Node Js Demo";
    const description =
      process.env.APP_DESCRIPTION || "Here goes the app description";

    const isCORSEnabled = process.env.CORS_ENABLED || true;
    const jwtExpiresIn = process.env.JWT_EXPIRES_IN || 3;
    const apiPrefix = process.env.API_PREFIX || "api";

    const logDays = process.env.LOG_DAYS || 10;

    return {
      appSecret,
      apiPrefix,
      description,
      isCORSEnabled,
      jwtExpiresIn,
      logDays,
      maxUploadLimit,
      maxParameterLimit,
      mongooseUrl,
      name,
      port,
      url,
    };
  }

  /**
   * Injects your config to the app's locals
   */
  public static init(_express: Application): Application {
    _express.locals.app = this.config();
    return _express;
  }
}
