import swPaths from "./paths";
import swDefinitions from "./definitions";
import Locals from "../../config/Locals";
const { paths } = new swPaths();
const { definitions } = new swDefinitions();
let host = process.env.HOST + ":" + process.env.PORT;

export default {
  openapi: "3.0.0",
  info: {
    title: "SPACE-O MCQ API",
    version: "1.0.0",
    description: "SPACE-O-MCQ PROJECT",
  },
  servers: [
    {
      url: `${Locals.config().url}/api/v1/`,
      description: "SWAGGER_BASE_URL",
    },
  ],
  components: {
    securitySchemes: {
      apiAuth: {
        type: "apiKey",
        in: "header",
        name: "Authorization",
      },
    },
    schemas: definitions,
    // parameters: parameters,
  },
  paths: paths,
};
