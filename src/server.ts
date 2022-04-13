import express from "express";
import Locals from "./config/Locals";
import compression from "compression";
import logger from "./utils/logger";
import multer from "multer";
import helmet from "helmet";
import apiRouter from "./routes/index";
import swaggerUi from "swagger-ui-express";
import openApiDocumentation from "./utils/swagger/config";

/**
 * Server class
 */
class App {
  public express: express.Application;

  constructor() {
    // create Express server
    this.express = express();

    this.mountDotEnv();
    this.listen();
    // configure the middleware
    this.mountMiddlewares();

    // configure the routes
    this.mountRoutes();
  }

  // private config(): void {
  //   this.app.set("views", express.static(__dirname+ "views"))
  //   this.app.set("view engine", "jade")
  // }

  private mountDotEnv(): void {
    this.express = Locals.init(this.express);
  }
  /**
   * Configures application middleware
   */
  private mountMiddlewares(): void {
    // if (process.env.NODE_ENV === "development") {
    // }
    // for parsing application/json
    this.express.use(
      express.json({
        limit: "1mb",
        // verify(req: any, res, buf, encoding) {
        //   req.rawBody = buf;
        // }
      })
    );

    // for parsing application/x-www-form-urlencoded
    this.express.use(express.urlencoded({ extended: true }));
    this.express.use(helmet());

    // for parsing multipart/form-data
    this.express.use(multer().any());

    // for compression
    this.express.use(compression());
    this.express.use(function (error: Error, req: any, res: any, next: any) {
      if (error instanceof SyntaxError) {
        res.json({
          responseStatus: false,
          responseCode: 500,
          responseMessage: "Invalid Syntax",
        });
      } else {
        next();
      }
    });

    // this.express.use((req, res, next) => {
    //   res.header('Access-Control-Allow-Origin', '*'); // dev only
    //   res.header("Access-Control-Allow-Methods", "OPTIONS,GET,PUT,POST,DELETE");
    //   res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
    // });
  }

  /**
   * Configures routes
   */
  private mountRoutes(): void {
    // this.express.use("/", (req, res) => {
    //   res.status(StatusCodes.BAD_REQUEST).send({ error: `path doesn't exist` });
    // });
    this.express.use(
      "/api-docs",
      swaggerUi.serve,
      swaggerUi.setup(openApiDocumentation)
    );
    this.express.get("/swagger.json", (req, res) =>
      res.json(openApiDocumentation)
    );
    this.express.use("/", apiRouter);
  }

  /**
   * Starts the express server
   */
  public listen(): void {
    const port: number = Locals.config().port;

    // Start the server on the specified port
    this.express
      .listen(port, () => {
        logger.info(`Server is running on ${Locals.config().url as string}`);
      })
      .on("error", (err) => {
        logger.error("Server starting error: ", err);
        process.exit(1);
      });
  }
}

export default new App().express;
