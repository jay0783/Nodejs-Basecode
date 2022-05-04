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
    "/search-user": {
      post: {
        tags: ["User-options"],
        summary: "Used to search user",
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
                $ref: "#/components/schemas/SearchUserRequest",
              },
            },
          },
        },
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
    "/get-user/{id}": {
      get: {
        tags: ["User-options"],
        summary: "Used to get user data for edit-user-profile ",
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
    // "/get-page/{title}": {
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
    "/delete-user/{id}": {
      delete: {
        tags: ["User-options"],
        summary: "Used to delete user from db",
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
          {
            $ref: "#/components/parameters/deleteUser",
          },
        ],

        responses: {
          200: {
            description: "return user data ",
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
    "/edit-profile": {
      post: {
        tags: ["User-options"],
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
    "/settings/app-info": {
      get: {
        tags: ["General Information"],
        summary: "Used to get app Information",
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
            $ref: "#/components/parameters/language",
          },
        ],

        responses: {
          200: {
            description: "return the apps version with platform",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/appInfoResponse",
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
    "/settings/edit-app-info": {
      put: {
        tags: ["General Information"],
        summary: "Used to edit app Information",
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
          {
            $ref: "#/components/parameters/language",
          },
        ],
        requestBody: {
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/editAppinfo",
              },
            },
          },
        },
        responses: {
          200: {
            description: "return the status of update",
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
    "/get-page/{title}": {
      get: {
        tags: ["CMS"],
        summary: "Used to get cms pages ",
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
          {
            $ref: "#/components/parameters/getPage",
          },
        ],

        responses: {
          200: {
            description: "return user data ",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/getPageResponse",
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
    "/edit-page": {
      put: {
        tags: ["CMS"],
        summary: "Used to edit CMS page ",
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
                $ref: "#/components/schemas/editPageRequest",
              },
            },
          },
        },

        responses: {
          200: {
            description: "return page update status",
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
    "/logout": {
      delete: {
        tags: ["Admin"],
        summary: "Used to logout",
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
                $ref: "#/components/schemas/logoutAdmin",
              },
            },
          },
        },

        responses: {
          200: {
            description: "return user logout status",
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
  };
}
