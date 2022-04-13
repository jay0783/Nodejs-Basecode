export default class SwaggerDefinitions {
  constructor() {}
  definitions = {
    CommonResponse: {
      type: "object",
      properties: {
        responseStatus: {
          type: "boolean",
        },
        responseCode: {
          type: "integer",
        },

        responseMessage: {
          type: "string",
        },
      },
    },
    UserRegistrationRequest: {
      type: "object",
      required: [
        "first_name",
        "last_name",
        "email",
        "mobile",
        "candidate_type",
      ],
      properties: {
        fullname: {
          type: "string",
        },
        email: {
          type: "string",
        },
        mobile: {
          type: "string",
        },
        password: {
          type: "string",
        },
      },
    },
    UserRegistrationResponse: {
      type: "object",
      allOf: [
        {
          $ref: "#/components/schemas/CommonResponse",
        },
        // {
        //   properties: {
        //     responseData: {
        //       type: "object",
        //       $ref: "#/components/schemas/RegistrationResponseFields",
        //     },
        //   },
        // },
      ],
    },
    RegistrationResponseFields: {
      type: "object",
      properties: {
        access_token: {
          type: "string",
        },
      },
    },
    UserLoginRequest: {
      type: "object",
      required: ["email", "password"],
      properties: {
        email: {
          type: "string",
        },
        password: {
          type: "string",
        },
      },
    },
    UserForgetPasswordRequest: {
      type: "object",
      required: ["email"],
      properties: {
        email: {
          type: "string",
        },
      },
    },
    UserResetPasswordRequest: {
      type: "object",
      required: ["newPassword", "ReEnterPassword"],
      properties: {
        newPassword: {
          type: "string",
        },
        ReEnterPassword: {
          type: "string",
        },
      },
    },
  };
}
