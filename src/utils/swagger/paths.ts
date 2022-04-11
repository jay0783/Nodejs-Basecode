export default class SwaggerPaths {
    constructor() {}
    paths = {
        "/signup": {
            post: {
                tags: ["User"],
                summary: "User Signup",
                description: "User Signup",
                produces: ["application/json"],
                consumes: ["application/json"],
                parameters: [
                  {
                    name: "token",
                    description: "Api token",
                    in: "header",
                    required: true,
                    type: "string"
                  },
                  {
                    name: "nonce",
                    description: "random number used to generate token",
                    in: "header",
                    required: true,
                    type: "string"
                  },
                  {
                    name: "timestamp",
                    description: "timestamp used to generate token",
                    in: "header",
                    required: true,
                    type: "string"
                  },
                  {
                    name: "UserSignupRequestModel",
                    description: "New user signup",
                    in: "body",
                    required: true,
                    schema: {
                      required: [
                        "vFullName",
                        "vEmail",
                        "vPassword",
                        "vPhoneCode",
                        "vPhone",
                        "vdevice_Token"
                      ],
                      "$ref": "#/definitions/UserSignupReqModel"
                    }
                  }
                ],
                responses: {
                  "200": {
                    description: "Return user details",
                    schema: {
                      $ref: "#/definitions/UserResModel"
                    }
                  }
                }
            }
        },
        "/login": {
            post: {
              tags: ["User"],
              summary: "User Login",
              description: "User Login",
              produces: ["application/json"],
              consumes: ["application/json"],
              parameters: [
                {
                  name: "token",
                  description: "Api token",
                  in: "header",
                  required: true,
                  type: "string"
                },
                {
                  name: "nonce",
                  description: "random number used to generate token",
                  in: "header",
                  required: true,
                  type: "string"
                },
                {
                  name: "timestamp",
                  description: "timestamp used to generate token",
                  in: "header",
                  required: true,
                  type: "string"
                },
                {
                  name: "UserLoginRequestModel",
                  description: "User Login",
                  in: "body",
                  required: true,
                  schema: {
                    required: [
                      "vEmail",
                      "vPassword",
                      "vdevice_Token"
                    ],
                    "$ref": "#/definitions/UserLoginReqModel"
                  }
                }
              ],
              responses: {
                "200": {
                  description: "Return user details",
                  schema: {
                    $ref: "#/definitions/UserResModel"
                  }
                }
              }
            }
        },
        "/logout": {
            put: {
              tags: ["User"],
              summary: "User Logout",
              description: "User Logout",
              produces: ["application/json"],
              consumes: ["application/json"],
              parameters: [
                {
                  name: "token",
                  description: "Api token",
                  in: "header",
                  required: true,
                  type: "string"
                },
                {
                  name: "nonce",
                  description: "random number used to generate token",
                  in: "header",
                  required: true,
                  type: "string"
                },
                {
                  name: "timestamp",
                  description: "timestamp used to generate token",
                  in: "header",
                  required: true,
                  type: "string"
                },
                {
                  name: "Authorization",
                  description: "Authorization token",
                  in: "header",
                  required: true,
                  type: "string"
                }
              ],
              responses: {
                "200": {
                  description: "User Logout",
                  schema: {
                    $ref: "#/definitions/AnswersResModel"
                  }
                }
              }
            }
        },
        "/verifyOtp": {
            put: {
              tags: ["User"],
              summary: "Verify OTP",
              description: "Verify OTP",
              produces: ["application/json"],
              consumes: ["application/json"],
              parameters: [
                {
                  name: "token",
                  description: "Api token",
                  in: "header",
                  required: true,
                  type: "string"
                },
                {
                  name: "nonce",
                  description: "random number used to generate token",
                  in: "header",
                  required: true,
                  type: "string"
                },
                {
                  name: "timestamp",
                  description: "timestamp used to generate token",
                  in: "header",
                  required: true,
                  type: "string"
                },
                {
                  name: "VerifyOtpRequestModel",
                  description: "Verify OTP",
                  in: "body",
                  required: true,
                  schema: {
                    "$ref": "#/definitions/VerifyOtpReqModel"
                  }
                }
              ],
              responses: {
                "200": {
                  description: "Send confirmation of otp verification",
                  schema: {
                    $ref: "#/definitions/UserResModel"
                  }
                }
              }
            }
        },
        "/resendOtp": {
            put: {
              tags: ["User"],
              summary: "Resend OTP",
              description: "Resend OTP",
              produces: ["application/json"],
              consumes: ["application/json"],
              parameters: [
                {
                  name: "token",
                  description: "Api token",
                  in: "header",
                  required: true,
                  type: "string"
                },
                {
                  name: "nonce",
                  description: "random number used to generate token",
                  in: "header",
                  required: true,
                  type: "string"
                },
                {
                  name: "timestamp",
                  description: "timestamp used to generate token",
                  in: "header",
                  required: true,
                  type: "string"
                },
                {
                  name: "ResendOtpRequestModel",
                  description: "Resend OTP",
                  in: "body",
                  required: true,
                  schema: {
                    "$ref": "#/definitions/ResendOtpReqModel"
                  }
                }
              ],
              responses: {
                "200": {
                  description: "Send confirmation of otp verification",
                  schema: {
                    $ref: "#/definitions/AnswersResModel"
                  }
                }
              }
            }
        },
        "/ForgotPassword": {
            put: {
              tags: ["User"],
              summary: "Forgot Password",
              description: "Forgot Password",
              produces: ["application/json"],
              consumes: ["application/json"],
              parameters: [
                {
                  name: "token",
                  description: "Api token",
                  in: "header",
                  required: true,
                  type: "string"
                },
                {
                  name: "nonce",
                  description: "random number used to generate token",
                  in: "header",
                  required: true,
                  type: "string"
                },
                {
                  name: "timestamp",
                  description: "timestamp used to generate token",
                  in: "header",
                  required: true,
                  type: "string"
                },
                {
                  name: "UserForgotPasswordRequestModel",
                  description: "Forgot Password",
                  in: "body",
                  required: true,
                  schema: {
                    required: [
                      "email"
                    ],
                    "$ref": "#/definitions/UserForgotPasswordReqModel"
                  }
                }
              ],
              responses: {
                "200": {
                  description: "Return password token",
                  schema: {
                    $ref: "#/definitions/AnswersResModel"
                  }
                }
              }
            }
        },
        "/changePassword": {
            put: {
              tags: ["User"],
              summary: "Change Password",
              description: "Change Password",
              produces: ["application/json"],
              consumes: ["application/json"],
              parameters: [
                {
                  name: "token",
                  description: "Api token",
                  in: "header",
                  required: true,
                  type: "string"
                },
                {
                  name: "nonce",
                  description: "random number used to generate token",
                  in: "header",
                  required: true,
                  type: "string"
                },
                {
                  name: "timestamp",
                  description: "timestamp used to generate token",
                  in: "header",
                  required: true,
                  type: "string"
                },
                {
                  name: "Authorization",
                  description: "Authorization token",
                  in: "header",
                  required: true,
                  type: "string"
                },
                {
                  name: "ChangePasswordRequestModel",
                  description: "Change Password",
                  in: "body",
                  required: true,
                  schema: {
                    required: [
                      "oldPassword",
                      "newPassword",
                      "cnfPassword"
                    ],
                    "$ref": "#/definitions/ChangePasswordReqModel"
                  }
                }
              ],
              responses: {
                "200": {
                  description: "Change Password",
                  schema: {
                    $ref: "#/definitions/AnswersResModel"
                  }
                }
              }
            }
        },
        "/profile": {
            get: {
              tags: ["User"],
              summary: "Get user profile",
              description: "Get user profile",
              produces: ["application/json"],
              consumes: ["application/json"],
              parameters: [
                {
                  name: "token",
                  description: "Api token",
                  in: "header",
                  required: true,
                  type: "string"
                },
                {
                  name: "nonce",
                  description: "random number used to generate token",
                  in: "header",
                  required: true,
                  type: "string"
                },
                {
                  name: "timestamp",
                  description: "timestamp used to generate token",
                  in: "header",
                  required: true,
                  type: "string"
                },
                {
                  name: "Authorization",
                  description: "Authorization token",
                  in: "header",
                  required: true,
                  type: "string"
                }
              ],
              responses: {
                "200": {
                  description: "Get user profile",
                  schema: {
                    $ref: "#/definitions/ProfileResModel"
                  }
                }
              }
            }
        },
        "/setProfile": {
            put: {
                tags: ["User"],
                summary: "Update Profile",
                description: "Update Profile",
                produces: ["application/json"],
                consumes: ["application/json"],
                parameters: [
                  {
                    name: "token",
                    description: "Api token",
                    in: "header",
                    required: true,
                    type: "string"
                  },
                  {
                    name: "nonce",
                    description: "random number used to generate token",
                    in: "header",
                    required: true,
                    type: "string"
                  },
                  {
                    name: "timestamp",
                    description: "timestamp used to generate token",
                    in: "header",
                    required: true,
                    type: "string"
                  },
                  {
                    name: "Authorization",
                    description: "Authorization token",
                    in: "header",
                    required: true,
                    type: "string"
                  },
                  {
                    name: "UpdateProfileRequestModel",
                    description: "Update Profile",
                    in: "body",
                    required: true,
                    schema: {
                      required: [
                        "vFullName",
                        "vPhone",
                        "vProfilePic"
                      ],
                      "$ref": "#/definitions/UpdateProfileReqModel"
                    }
                  }
                ],
                responses: {
                  "200": {
                    description: "Update Profile",
                    schema: {
                      $ref: "#/definitions/UserResModel"
                    }
                  }
                }
            }
        },
        "/facebook/signup": {
            post: {
              tags: ["User"],
              summary: "Facebook User Signup",
              description: "Facebook User Signup",
              produces: ["application/json"],
              consumes: ["application/json"],
              parameters: [
                {
                  name: "token",
                  description: "Api token",
                  in: "header",
                  required: true,
                  type: "string"
                },
                {
                  name: "nonce",
                  description: "random number used to generate token",
                  in: "header",
                  required: true,
                  type: "string"
                },
                {
                  name: "timestamp",
                  description: "timestamp used to generate token",
                  in: "header",
                  required: true,
                  type: "string"
                },
                {
                  name: "FbUserSignupRequestModel",
                  description: "Facebook User Signup",
                  in: "body",
                  required: true,
                  schema: {
                    required: [
                      "token",
                      "vdevice_Token"
                    ],
                    "$ref": "#/definitions/FbUserSignupReqModel"
                  }
                }
              ],
              responses: {
                "200": {
                  description: "Return user details",
                  schema: {
                    $ref: "#/definitions/UserResModel"
                  }
                }
              }
            }
        },
        "/google/signup": {
          post: {
            tags: ["User"],
            summary: "Google User Signup",
            description: "Google User Signup",
            produces: ["application/json"],
            consumes: ["application/json"],
            parameters: [
              {
                name: "token",
                description: "Api token",
                in: "header",
                required: true,
                type: "string"
              },
              {
                name: "nonce",
                description: "random number used to generate token",
                in: "header",
                required: true,
                type: "string"
              },
              {
                name: "timestamp",
                description: "timestamp used to generate token",
                in: "header",
                required: true,
                type: "string"
              },
              {
                name: "GoogleUserSignupRequestModel",
                description: "Google User Signup",
                in: "body",
                required: true,
                schema: {
                  required: [
                    "token",
                    "vdevice_Token"
                  ],
                  "$ref": "#/definitions/GoogleUserSignupReqModel"
                }
              }
            ],
            responses: {
              "200": {
                description: "Return user details",
                schema: {
                  $ref: "#/definitions/UserResModel"
                }
              }
            }
          }
        },
        "/cmsPage/{vTitle}": {
          get: {
            tags: ["Static Contents"],
            summary: "Get Static Contents",
            description: "Get Static Contents",
            produces: ["application/json"],
            consumes: ["application/json"],
            parameters: [
              {
                name: "token",
                description: "Api token",
                in: "header",
                required: true,
                type: "string"
              },
              {
                name: "nonce",
                description: "random number used to generate token",
                in: "header",
                required: true,
                type: "string"
              },
              {
                name: "timestamp",
                description: "timestamp used to generate token",
                in: "header",
                required: true,
                type: "string"
              },
              {
                name: "Title",
                description: "requested Title Like (privacy, terms) etc.",
                in: "path",
                required: true,
                type: "string"
              }
            ],
            responses: {
              "200": {
                description: "Get Static Contents",
                schema: {
                  $ref: "#/definitions/GetStaticContentsResModel"
                }
              }
            }
          }
        },
        "/notifications": {
          get: {
            tags: ["Notification"],
            summary: "Get Notification",
            description: "Get Notification",
            produces: ["application/json"],
            consumes: ["application/json"],
            parameters: [
              {
                name: "token",
                description: "Api token",
                in: "header",
                required: true,
                type: "string"
              },
              {
                name: "nonce",
                description: "random number used to generate token",
                in: "header",
                required: true,
                type: "string"
              },
              {
                name: "timestamp",
                description: "timestamp used to generate token",
                in: "header",
                required: true,
                type: "string"
              },
              {
                name: "Authorization",
                description: "Authorization token",
                in: "header",
                required: true,
                type: "string"
              }
            ],
            responses: {
              "200": {
                description: "Get Notifications",
                schema: {
                  $ref: "#/definitions/NotificationsModel"
                }
              }
            }
          }
        },
        "/notificationFlags": {
          put: {
            tags: ["Notification"],
            summary: "Set user notification flags",
            description: "Set user notification flags",
            produces: ["application/json"],
            consumes: ["application/json"],
            parameters: [
              {
                name: "token",
                description: "Api token",
                in: "header",
                required: true,
                type: "string"
              },
              {
                name: "nonce",
                description: "random number used to generate token",
                in: "header",
                required: true,
                type: "string"
              },
              {
                name: "timestamp",
                description: "timestamp used to generate token",
                in: "header",
                required: true,
                type: "string"
              },
              {
                name: "Authorization",
                description: "Authorization token",
                in: "header",
                required: true,
                type: "string"
              },
              {
                name: "SetNotificationFlagRequestModel",
                description: "Set user notification flags",
                in: "body",
                required: true,
                schema: {
                  required: [
                    "flagId"
                  ],
                  "$ref": "#/definitions/SetNotificationFlagReqModel"
                }
              }
            ],
            responses: {
              "200": {
                description: "Set user notification flags",
                schema: {
                  $ref: "#/definitions/AnswersResModel"
                }
              }
            }
          },
          get: {
            tags: ["Notification"],
            summary: "Get user notification flags",
            description: "Get user notification flags",
            produces: ["application/json"],
            consumes: ["application/json"],
            parameters: [
              {
                name: "token",
                description: "Api token",
                in: "header",
                required: true,
                type: "string"
              },
              {
                name: "nonce",
                description: "random number used to generate token",
                in: "header",
                required: true,
                type: "string"
              },
              {
                name: "timestamp",
                description: "timestamp used to generate token",
                in: "header",
                required: true,
                type: "string"
              },
              {
                name: "Authorization",
                description: "Authorization token",
                in: "header",
                required: true,
                type: "string"
              }
            ],
            responses: {
              "200": {
                description: "Get user notification flags",
                schema: {
                  $ref: "#/definitions/NotificationFlagsResModel"
                }
              }
            }
          }
        },

    }
}