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
    AdminRegistrationRequest: {
      type: "object",
      required: ["first_name", "last_name", "email", "candidate_type"],
      properties: {
        fullname: {
          type: "string",
        },
        email: {
          type: "string",
        },
        password: {
          type: "string",
        },
      },
    },
    AdminEditUserProfileRequest: {
      type: "object",
      required: ["_id", "fullname", "email", "mobile"],
      properties: {
        _id: {
          type: "string",
        },
        fullname: {
          type: "string",
        },
        email: {
          type: "string",
        },
        mobile: {
          type: "string",
        },
      },
    },
    AdminLoginResponse: {
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
    AdminLoginRequest: {
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
    AdminForgetPasswordRequest: {
      type: "object",
      required: ["email"],
      properties: {
        email: {
          type: "string",
        },
      },
    },
    AdminResetPasswordRequest: {
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
    UserResponseList: {
      type: "object",
      allOf: [
        {
          $ref: "#/components/schemas/CommonResponse",
        },
        {
          properties: {
            responseData: {
              type: "array",
              items: {
                $ref: "#/components/schemas/UserResponseFields",
              },
            },
          },
        },
      ],
    },
    UserResponseFields: {
      type: "object",
      properties: {
        _id: {
          type: "string",
        },
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
        createdAt: {
          type: "string",
        },
        updatedAt: {
          type: "string",
        },
      },
    },
    AdminEditPasswordRequest: {
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
    facebookLoginRequest: {
      type: "object",
      required: ["accessToken"],
      properties: {
        accessToken: {
          type: "string",
        },
      },
    },
    googleLoginRequest: {
      type: "object",
      required: ["accessToken"],
      properties: {
        accessToken: {
          type: "string",
        },
      },
    },
  };
}
