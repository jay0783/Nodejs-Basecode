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
    AdminRegistrationResponse: {
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
  };
}
