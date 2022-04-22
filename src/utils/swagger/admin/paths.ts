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
          201: {
            description: "return candidate registration successfull status",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/CommonResponse",
                },
              },
            },
          },
          400: {
            description: "Error status for bad user input",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/CommonResponse",
                },
              },
            },
          },
          500: {
            description: "Error status for server error",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/CommonResponse",
                },
              },
            },
          },
          409: {
            description: "Error status for conflict with Request",
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
          400: {
            description: "Error status for bad user input",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/CommonResponse",
                },
              },
            },
          },
          500: {
            description: "Error status for server error",
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
    "/forget-password": {
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
          400: {
            description: "Error status for bad user input",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/CommonResponse",
                },
              },
            },
          },
          500: {
            description: "Error status for server error",
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
    "/check-reset-link/{Authorization}": {
      get: {
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
          },
          {
            $ref: "#/components/parameters/checkResetToken",
          },
        ],

        // requestBody: {
        //   required: true,
        //   content: {
        //     "application/json": {
        //       schema: {
        //         type: "object",
        //         properties: {
        //           Authorization: {
        //             type: "string",
        //           },
        //         },
        //       },
        //     },
        //   },
        // },

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
          400: {
            description: "Error status for bad user input",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/CommonResponse",
                },
              },
            },
          },
          500: {
            description: "Error status for server error",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/CommonResponse",
                },
              },
            },
          },
          401: {
            description: "Error status for server error",
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
    "/reset-password": {
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
          400: {
            description: "Error status for bad user input",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/CommonResponse",
                },
              },
            },
          },
          500: {
            description: "Error status for server error",
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
    "/user-list": {
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
          400: {
            description: "Error status for bad user input",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/CommonResponse",
                },
              },
            },
          },
          500: {
            description: "Error status for server error",
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
    "/get-user/{_id}": {
      get: {
        tags: ["User-options"],
        summary: "Used to get user data for edit-user-profile ",
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
            $ref: "#/components/parameters/getUser",
          },
        ],

        responses: {
          200: {
            description: "return user data ",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/UserDetailsResponse",
                },
              },
            },
          },
          400: {
            description: "Error status for bad user input",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/CommonResponse",
                },
              },
            },
          },
          500: {
            description: "Error status for server error",
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
    "/edit-profile": {
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
          400: {
            description: "Error status for bad user input",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/CommonResponse",
                },
              },
            },
          },
          500: {
            description: "Error status for server error",
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
    "/edit-password": {
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
          400: {
            description: "Error status for bad user input",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/CommonResponse",
                },
              },
            },
          },
          500: {
            description: "Error status for server error",
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
    "/facebook-login": {
      post: {
        tags: ["social-login"],
        summary: "used to login using facebook ",
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
                $ref: "#/components/schemas/facebookLoginRequest",
              },
            },
          },
        },

        responses: {
          200: {
            description: "return the login status with auth token ",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/AdminLoginResponse",
                },
              },
            },
          },
          400: {
            description: "Error status for bad user input",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/CommonResponse",
                },
              },
            },
          },
          500: {
            description: "Error status for server error",
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
    "/google-login": {
      post: {
        tags: ["social-login"],
        summary: "used to login using facebook ",
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
                $ref: "#/components/schemas/facebookLoginRequest",
              },
            },
          },
        },

        responses: {
          200: {
            description: "return the login status with auth token ",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/AdminLoginResponse",
                },
              },
            },
          },
          400: {
            description: "Error status for bad user input",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/CommonResponse",
                },
              },
            },
          },
          500: {
            description: "Error status for server error",
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
