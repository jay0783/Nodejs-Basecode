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
      required: ["_id", "fullname"],
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
    AdminLoginResponse: {
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
    SearchUserRequest: {
      type: "object",
      required: ["search"],
      properties: {
        name: {
          type: "string",
        },
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
    appInfoResponse: {
      type: "object",
      allOf: [
        {
          $ref: "#/components/schemas/CommonResponse",
        },
        {
          properties: {
            data: {
              $ref: "#/components/schemas/appInfoResponseData",
            },
          },
        },
      ],
    },
    appInfoResponseData: {
      type: "object",
      properties: {
        _id: {
          type: "string",
        },
        app_version: {
          type: "array",
          items: {
            type: "object",
            properties: {
              app_version: {
                type: "string",
              },
              app_platform: {
                type: "string",
              },
              force_updatable: {
                type: "boolean",
              },
            },
          },
        },
      },
    },
    getPageResponse: {
      type: "object",
      allOf: [
        {
          $ref: "#/components/schemas/CommonResponse",
        },
        {
          properties: {
            data: {
              $ref: "#/components/schemas/getPageResponseData",
            },
          },
        },
      ],
    },
    getPageResponseData: {
      type: "object",
      properties: {
        _id: {
          type: "string",
        },
        title: {
          type: "string",
        },
        slug: {
          type: "string",
        },
        content: {
          type: "string",
        },
      },
    },
    editPageRequest: {
      type: "object",
      required: ["title", "slug", "content"],
      properties: {
        _id: {
          type: "string",
        },
        title: {
          type: "string",
        },
        slug: {
          type: "string",
        },
        content: {
          type: "string",
        },
      },
    },
    editAppinfo: {
      $ref: "#/components/schemas/appInfoResponseData",
    },
    logoutAdmin: {
      type: "object",
      properties: {
        _id: {
          type: "string",
        },
      },
    },
  };
}
