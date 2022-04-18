export default class SwaggerPaths {
  constructor() {}
  paths = {
    "/signup": {
      post: {
        tags: ["Admin"],
        summary: "Used for Admin Registration",
        parameters: [
          {
            $ref: "#/components/parameters/token",
          },
          {
            $ref: "#/components/parameters/nonce",
          },
          {
            $ref: "#/components/parameters/timestamp",
          },
        ],

        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/AdminRegistrationRequest",
              },
            },
          },
        },

        responses: {
          200: {
            description: "return candidate registration status",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/CommonResponse",
                },
              },
            },
          },
        },
      },
    },
    "/login": {
      post: {
        tags: ["Admin"],
        summary: "Used for Admin Login ",
        parameters: [
          {
            $ref: "#/components/parameters/token",
          },
          {
            $ref: "#/components/parameters/nonce",
          },
          {
            $ref: "#/components/parameters/timestamp",
          },
        ],

        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/AdminLoginRequest",
              },
            },
          },
        },

        responses: {
          200: {
            description: "return candidate registration status",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/AdminLoginResponse",
                },
              },
            },
          },
        },
      },
    },
    "/forgetPassword": {
      post: {
        tags: ["Admin"],
        summary: "Used for Admin forget password ",
        parameters: [
          {
            $ref: "#/components/parameters/token",
          },
          {
            $ref: "#/components/parameters/nonce",
          },
          {
            $ref: "#/components/parameters/timestamp",
          },
        ],

        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/AdminForgetPasswordRequest",
              },
            },
          },
        },

        responses: {
          200: {
            description: "return candidate registration status",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/CommonResponse",
                },
              },
            },
          },
        },
      },
    },
    "/checkResetLink": {
      post: {
        tags: ["Admin"],
        summary: "Used for check reset password token is valid or not ",
        parameters: [
          {
            $ref: "#/components/parameters/token",
          },
          {
            $ref: "#/components/parameters/nonce",
          },
          {
            $ref: "#/components/parameters/timestamp",
          }
        ],

        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  Authorization: {
                    type: "string"
                  }
                }
              },
            },
          },
        },

        responses: {
          200: {
            description: "return reset password token is valid or not",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/CommonResponse",
                },
              },
            },
          },
        },
      },
    },
    "/resetPassword": {
      post: {
        tags: ["Admin"],
        summary: "Used for Admin reset password ",
        parameters: [
          {
            $ref: "#/components/parameters/token",
          },
          {
            $ref: "#/components/parameters/nonce",
          },
          {
            $ref: "#/components/parameters/timestamp",
          },
        ],

        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/AdminResetPasswordRequest",
              },
            },
          },
        },

        responses: {
          200: {
            description: "return candidate registration status",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/CommonResponse",
                },
              },
            },
          },
        },
      },
    },
    "/userList": {
      get: {
        tags: ["User-options"],
        summary: "Used to get user list ",
        parameters: [
          {
            $ref: "#/components/parameters/token",
          },
          {
            $ref: "#/components/parameters/nonce",
          },
          {
            $ref: "#/components/parameters/timestamp",
          },
        ],
        responses: {
          200: {
            description: "return user list ",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/UserResponseList",
                },
              },
            },
          },
        },
      },
    },
    "/editProfile": {
      post: {
        tags: ["User-options"],
        summary: "Used for edit user profile ",
        parameters: [
          {
            $ref: "#/components/parameters/token",
          },
          {
            $ref: "#/components/parameters/nonce",
          },
          {
            $ref: "#/components/parameters/timestamp",
          },
        ],

        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/AdminEditUserProfileRequest",
              },
            },
          },
        },

        responses: {
          200: {
            description: "return user profile successfully updated",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/CommonResponse",
                },
              },
            },
          },
        },
      },
    },
    "/editPassword": {
      post: {
        tags: ["Admin"],
        summary: "Used for edit password ",
        security: [
          {
            //@ts-ignore
            apiAuth: [],
          },
        ],
        parameters: [
          {
            $ref: "#/components/parameters/token",
          },
          {
            $ref: "#/components/parameters/nonce",
          },
          {
            $ref: "#/components/parameters/timestamp",
          },
          {
            $ref: "#/components/parameters/authToken",
          },
        ],

        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/AdminEditPasswordRequest",
              },
            },
          },
        },

        responses: {
          200: {
            description: "return user profile successfully updated",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/CommonResponse",
                },
              },
            },
          },
        },
      },
    },
  };
}
