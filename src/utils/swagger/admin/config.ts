import swPaths from "./paths";
import swDefinitions from "./definitions";
import swParameters from "./parameters";
import Locals from "../../../config/Locals";
const { paths } = new swPaths();
const { definitions } = new swDefinitions();
const { parameters } = new swParameters();

export default {
  openapi: "3.0.0",
  info: {
    title: "Admin API",
    version: "1.0.0",
    description: "Nodejs Basecode ",
    contact: {
      url: `${Locals.config().url}/adminswagger.json`,
    },
  },
  servers: [
    {
      url: `${Locals.config().url}/admin/`,
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
    parameters: parameters,
  },
  paths: paths,
};
