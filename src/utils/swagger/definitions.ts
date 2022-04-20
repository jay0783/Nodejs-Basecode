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
    UserLoginResponse: {
      type: "object",
      allOf: [
        {
          $ref: "#/components/schemas/CommonResponse",
        },
        {
          properties: {
            responseData: {
              type: "string",
            },
          },
        },
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
      required: ["Authorization", "newPassword", "ReEnterPassword"],
      properties: {
        Authorization: {
          type: "string",
        },
        newPassword: {
          type: "string",
        },
        ReEnterPassword: {
          type: "string",
        },
      },
    },
    UserEditPasswordRequest: {
      type: "object",
      required: ["oldPassword", "newPassword", "ReEnterPassword"],
      properties: {
        oldPassword: {
          type: "string",
        },
        newPassword: {
          type: "string",
        },
        ReEnterPassword: {
          type: "string",
        },
      },
    },
<<<<<<< HEAD
  };
=======
  }
>>>>>>> f2cba4f542f0da3f19dd9d20bef9b5abf1854b3b
}
