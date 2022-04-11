export default class SwaggerDefinitions {
  constructor() {}
  definitions = {
    UserSignupReqModel: {
      properties: {
        vFullName: {
          type: "string",
        },
        vEmail: {
          type: "string",
        },
        vPassword: {
          type: "string",
        },
        vPhoneCode: {
          type: "string",
        },
        vPhone: {
          type: "string",
        },
        vdevice_Token: {
          type: "string",
        },
      },
    },
    UserResModel: {
      properties: {
        code: {
          type: "integer",
        },
        message: {
          type: "string",
        },
        data: {
          type: "object",
          $ref: "#/definitions/UserResModelData",
        },
      },
    },
    UserResModelData: {
      properties: {
        userId: {
          type: "string",
        },
        vFullName: {
          type: "string",
        },
        vEmail: {
          type: "string",
        },
        vPhoneCode: {
          type: "string",
        },
        vPhone: {
          type: "string",
        },
        vProfilePic: {
          type: "string",
        },
        bisPhoneVerified: {
          type: "boolean",
        },
        bisEmailVerified: {
          type: "boolean",
        },
        vAccess_token: {
          type: "string",
        },
      },
    },
    UserLoginReqModel: {
      properties: {
        vEmail: {
          type: "string",
        },
        vPassword: {
          type: "string",
        },
        vdevice_Token: {
          type: "string",
        },
      },
    },
    VerifyOtpReqModel: {
      properties: {
        iEmailOtp: {
          type: "integer",
        },
        vEmail: {
          type: "string",
        },
      },
    },
    ResendOtpReqModel: {
      properties: {
        vEmail: {
          type: "string",
        },
      },
    },
    UserForgotPasswordReqModel: {
      properties: {
        vEmail: {
          type: "string",
        },
      },
    },
    ChangePasswordReqModel: {
      properties: {
        oldPassword: {
          type: "string",
        },
        newPassword: {
          type: "string",
        },
        cnfPassword: {
          type: "string",
        },
      },
    },
    ProfileResModel: {
      properties: {
        code: {
          type: "integer",
        },
        message: {
          type: "string",
        },
        data: {
          type: "object",
          $ref: "#/definitions/ProfileResModelData",
        },
      },
    },
    ProfileResModelData: {
      properties: {
        userId: {
          type: "string",
        },
        vFullName: {
          type: "string",
        },
        vProfilePic: {
          type: "string",
        },
        vEmail: {
          type: "string",
        },
      },
    },
    UpdateProfileReqModel: {
      properties: {
        vFullName: {
          type: "string",
        },
        vEmail: {
          type: "string",
        },
        vPhoneCode: {
          type: "string",
        },
        vPhone: {
          type: "string",
        },
        vProfilePic: {
          type: "string",
        },
      },
    },
    FbUserSignupReqModel: {
      properties: {
        token: {
          type: "string",
        },
        vdevice_Token: {
          type: "string",
        },
      },
    },
    GoogleUserSignupReqModel: {
      properties: {
        token: {
          type: "string",
        },
        vdevice_Token: {
          type: "string",
        },
      },
    },
    GetStaticContentsResModel: {
      properties: {
        code: {
          type: "integer",
        },
        message: {
          type: "string",
        },
        data: {
          type: "object",
          $ref: "#/definitions/GetStaticContentsResModelData",
        },
      },
    },
    GetStaticContentsResModelData: {
      properties: {
        _id: {
          type: "string",
        },
        vTitle: {
          type: "string",
        },
        vSlug: {
          type: "string",
        },
        txContent: {
          type: "string",
        },
        tiIsActive: {
          type: "number",
        },
        tiIsDeleted: {
          type: "number",
        },
        updatedAt: {
          type: "string",
        },
        createdAt: {
          type: "string",
        },
      },
    },
    NotificationsModel: {
      properties: {
        code: {
          type: "integer",
        },
        message: {
          type: "string",
        },
        data: {
          type: "array",
          items: {
            type: "object",
            $ref: "#/definitions/NotificationsModelData",
          },
        },
        totalCount: {
          type: "integer",
        },
      },
    },
    NotificationsModelData: {
      properties: {
        notificationId: {
          type: "string",
        },
        iItemId: {
          type: "string",
        },
        bIsread: {
          type: "boolean",
        },
        vTitle: {
          type: "string",
        },
        vMessage: {
          type: "string",
        },
        createdAt: {
          type: "string",
        },
      },
    },
    SetNotificationFlagReqModel: {
      properties: {
        flagId: {
          type: "integer",
        },
        tiIsActive: {
          type: "string",
        },
      },
    },
    NotificationFlagsResModel: {
      properties: {
        code: {
          type: "integer",
        },
        message: {
          type: "string",
        },
        data: {
          type: "object",
          $ref: "#/definitions/NotificationFlagsResModelData",
        },
      },
    },
    NotificationFlagsResModelData: {
      properties: {
        bPush: {
          type: "boolean",
        },
        bSms: {
          type: "boolean",
        },
        bEmail: {
          type: "boolean",
        },
      },
    },
  };
}
