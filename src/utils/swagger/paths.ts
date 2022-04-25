export default class SwaggerPaths {
  constructor() {}
  paths = {
    "/signup": {
      post: {
        tags: ["User"],
        summary: "Used for User Registration",
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
                $ref: "#/components/schemas/UserRegistrationRequest",
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
        tags: ["User"],
        summary: "Used for User Login ",
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
                $ref: "#/components/schemas/UserLoginRequest",
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
                  $ref: "#/components/schemas/UserLoginResponse",
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
        tags: ["User"],
        summary: "Used for User forget password ",
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
                $ref: "#/components/schemas/UserForgetPasswordRequest",
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
        tags: ["User"],
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
        tags: ["User"],
        summary: "Used for User reset password ",
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
                $ref: "#/components/schemas/UserResetPasswordRequest",
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
    // "/user-list": {
    //   get: {
    //     tags: ["User-options"],
    //     summary: "Used to get user list ",
    //     security: [
    //       {
    //         //@ts-ignore
    //         apiAuth: [],
    //       },
    //     ],
    //     parameters: [
    //       {
    //         $ref: "#/components/parameters/token",
    //       },
    //       {
    //         $ref: "#/components/parameters/nonce",
    //       },
    //       {
    //         $ref: "#/components/parameters/timestamp",
    //       },
    //       {
    //         $ref: "#/components/parameters/authToken",
    //       },
    //     ],
    //     responses: {
    //       200: {
    //         description: "return user list ",
    //         content: {
    //           "application/json": {
    //             schema: {
    //               $ref: "#/components/schemas/UserResponseList",
    //             },
    //           },
    //         },
    //       },
    //       400: {
    //         description: "Error status for bad user input",
    //         content: {
    //           "application/json": {
    //             schema: {
    //               $ref: "#/components/schemas/CommonResponse",
    //             },
    //           },
    //         },
    //       },
    //       401: {
    //         description: "Error status for Unauthorized access",
    //         content: {
    //           "application/json": {
    //             schema: {
    //               $ref: "#/components/schemas/CommonResponse",
    //             },
    //           },
    //         },
    //       },
    //       500: {
    //         description: "Error status for server error",
    //         content: {
    //           "application/json": {
    //             schema: {
    //               $ref: "#/components/schemas/CommonResponse",
    //             },
    //           },
    //         },
    //       },
    //     },
    //   },
    // },
    // "/get-user/{id}": {
    //   get: {
    //     tags: ["User-options"],
    //     summary: "Used to get user data for edit-user-profile ",
    //     security: [
    //       {
    //         //@ts-ignore
    //         apiAuth: [],
    //       },
    //     ],
    //     parameters: [
    //       {
    //         $ref: "#/components/parameters/token",
    //       },
    //       {
    //         $ref: "#/components/parameters/nonce",
    //       },
    //       {
    //         $ref: "#/components/parameters/timestamp",
    //       },
    //       {
    //         $ref: "#/components/parameters/authToken",
    //       },
    //       {
    //         $ref: "#/components/parameters/getUser",
    //       },
    //     ],

    //     responses: {
    //       200: {
    //         description: "return user data ",
    //         content: {
    //           "application/json": {
    //             schema: {
    //               $ref: "#/components/schemas/UserDetailsResponse",
    //             },
    //           },
    //         },
    //       },
    //       400: {
    //         description: "Error status for bad user input",
    //         content: {
    //           "application/json": {
    //             schema: {
    //               $ref: "#/components/schemas/CommonResponse",
    //             },
    //           },
    //         },
    //       },
    //       401: {
    //         description: "Error status for Unauthorized access",
    //         content: {
    //           "application/json": {
    //             schema: {
    //               $ref: "#/components/schemas/CommonResponse",
    //             },
    //           },
    //         },
    //       },
    //       500: {
    //         description: "Error status for server error",
    //         content: {
    //           "application/json": {
    //             schema: {
    //               $ref: "#/components/schemas/CommonResponse",
    //             },
    //           },
    //         },
    //       },
    //     },
    //   },
    // },
    "/edit-profile": {
      post: {
        tags: ["User"],
        summary: "Used for edit user profile ",
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
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/UserEditUserProfileRequest",
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
          401: {
            description: "Error status for Unauthorized access",
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
        tags: ["User"],
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
                $ref: "#/components/schemas/UserEditPasswordRequest",
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
          401: {
            description: "Error status for Unauthorized access",
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
                  $ref: "#/components/schemas/UserLoginResponse",
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
                  $ref: "#/components/schemas/UserLoginResponse",
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
