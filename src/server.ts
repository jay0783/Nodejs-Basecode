import express from "express";
import compression from "compression";
import cors from "cors";
import multer from "multer";
import helmet from "helmet";
import swaggerUi from "swagger-ui-express";
import Locals from "./config/Locals";
import logger from "./utils/logger";
import database from "./config/Database";
import apiRouter from "./routes/index";
import "dotenv/config";
import openApiDocumentation from "./utils/swagger/config";
import adminApiDocumentation from "./utils/swagger/admin/config";

/**
 * Server class
 */
class App {
  public express: express.Application;

  constructor() {
    // create Express server
    this.express = express();
    this.connectDb();
    this.mountDotEnv();
    this.listen();
    this.mountMiddlewares();
    this.mountRoutes();
  }

  // private config(): void {
  //   this.app.set("views", express.static(__dirname+ "views"))
  //   this.app.set("view engine", "jade")
  // }
  private connectDb(): void {
    database.init();
  }
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
    this.express.use(cors());
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

    this.express.use((req, res, next) => {
      res.header("Access-Control-Allow-Origin", "*"); // dev only
      res.header("Access-Control-Allow-Methods", "OPTIONS,GET,PUT,POST,DELETE");
      res.header("Access-Control-Allow-Headers", "*");
      next();
    });
  }

  /**
   * Configures routes
   */
  private mountRoutes(): void {
    // this.express.use("/", (req, res) => {
    //   res.status(StatusCodes.BAD_REQUEST).send({ error: `path doesn't exist` });
    // });

    const options = {
      explorer: true,
      swaggerOptions: {
        url: `${process.env.APP_URL}:${process.env.SERVER_PORT}/apiswagger.json`,
        // validatorUrl: null,
      },
    };

    const options2 = {
      explorer: true,
      swaggerOptions: {
        url: `${process.env.APP_URL}:${process.env.SERVER_PORT}/adminswagger.json`,
      },
    };
    // console.log(options);

    this.express.use(
      "/admin-docs",
      swaggerUi.serveFiles(adminApiDocumentation),
      swaggerUi.setup(undefined, options2)
    );

    this.express.use(
      "/api-docs",
      swaggerUi.serveFiles(openApiDocumentation),
      swaggerUi.setup(null, options)
    );

    this.express.get("/apiswagger.json", (req, res) =>
      res.json(openApiDocumentation)
    );
    this.express.get("/adminswagger.json", (req, res) =>
      res.json(adminApiDocumentation)
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
