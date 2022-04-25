export default class SwaggerDefinitions {
  constructor() {}
  definitions = {
    CommonResponse: {
      type: "object",
      properties: {
        message: {
          type: "string",
        },
      },
    },
    UserRegistrationRequest: {
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
    UserEditUserProfileRequest: {
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
    EditUserRequest: {
      type: "object",
      required: ["_id"],
      properties: {
        _id: {
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
            data: {
              type: "string",
            },
          },
        },
      ],
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
    UserDetailsResponse: {
      type: "object",
      allOf: [
        {
          $ref: "#/components/schemas/CommonResponse",
        },
        {
          properties: {
            data: {
              $ref: "#/components/schemas/UserResponseFields",
            },
          },
        },
      ],
    },
    UserResponseList: {
      type: "object",
      allOf: [
        {
          $ref: "#/components/schemas/CommonResponse",
        },
        {
          properties: {
            data: {
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
