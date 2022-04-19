import swPaths from "./paths";
import swDefinitions from "./definitions";
import swParameters from "./parameters";
import Locals from "../../config/Locals";
const { paths } = new swPaths();
const { definitions } = new swDefinitions();
const { parameters } = new swParameters();

export default {
  openapi: "3.0.0",
  info: {
    title: "Nodejs Basecode",
    version: "1.0.0",
    description: "Nodejs Basecode",
  },
  servers: [
    {
      url: `${Locals.config().url}/api/v1/`,
      description: "SWAGGER_BASE_URL",
    },
  ],
  schemes: ["http"],
  components: {
    securitySchemes: {
      apiAuth: {
        type: "apiKey",
        in: "header",
        name: "Authorization",
      },
    },
    schemas: definitions,
    parameters: parameters,
  },
  paths: paths,
};
