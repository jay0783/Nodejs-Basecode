import { body, check } from "express-validator";
export default function validate(methodName: String) {
  switch (methodName) {
    case "signup": {
      return [
        body("fullname")
          .notEmpty()
          .withMessage("fullname is required")
          .isLength({ min: 2, max: 30 })
          .withMessage("fullname must be min 3 and max 30 characters long")
          .isAlpha()
          .withMessage("fullname must be in Alphabetic"),

        // body("last_name")
        //   .notEmpty()
        //   .withMessage("Last name is required")
        //   .isLength({ min: 2, max: 30 })
        //   .withMessage("Last Name must be min 3 and max 30 characters long")
        //   .isAlpha()
        //   .withMessage("last Name must be in Alphabetic"),

        body("email")
          .notEmpty()
          .withMessage("Email field is required")
          .isEmail()
          .withMessage("invalid Email")
          .isLength({ min: 8, max: 75 })
          .withMessage("Email length must be min 8 and more than 75"),

        body("mobile")
          .notEmpty()
          .withMessage("Mobile num field is required")
          //@ts-ignore
          .isMobilePhone()
          .withMessage("Mobile num must be in numeric")
          .isLength({ min: 10, max: 15 })
          .withMessage("Mobile num must be 10 characters long"),

        body("password")
          .notEmpty()
          .withMessage("password is required")
          .isLength({ min: 8, max: 15 })
          .withMessage("password must be 8 characters long"),
      ];
    }
    case "adminSignup": {
      return [
        body("fullname")
          .notEmpty()
          .withMessage("fullname is required")
          .isLength({ min: 2, max: 30 })
          .withMessage("fullname must be min 3 and max 30 characters long")
          .isAlpha()
          .withMessage("fullname must be in Alphabetic"),

        // body("last_name")
        //   .notEmpty()
        //   .withMessage("Last name is required")
        //   .isLength({ min: 2, max: 30 })
        //   .withMessage("Last Name must be min 3 and max 30 characters long")
        //   .isAlpha()
        //   .withMessage("last Name must be in Alphabetic"),

        body("email")
          .notEmpty()
          .withMessage("Email field is required")
          .isEmail()
          .withMessage("invalid Email")
          .isLength({ min: 8, max: 75 })
          .withMessage("Email length must be min 8 and more than 75"),

        body("password")
          .notEmpty()
          .withMessage("password is required")
          .isLength({ min: 8, max: 15 })
          .withMessage("password must be 8 characters long"),
      ];
    }
    case "login": {
      return [
        body("email")
          .notEmpty()
          .withMessage("Email field is required")
          .isEmail()
          .withMessage("invalid Email")
          .isLength({ min: 8, max: 75 })
          .withMessage("Email length must be min 8 and more than 75"),

        body("password")
          .notEmpty()
          .withMessage("password is required")
          .isLength({ min: 8, max: 15 })
          .withMessage("password must be 8 characters long"),
      ];
    }
    case "forgetPassword": {
      return [
        body("email")
          .notEmpty()
          .withMessage("Email field is required")
          .isEmail()
          .withMessage("invalid Email")
          .isLength({ min: 8, max: 75 })
          .withMessage("Email length must be min 8 and more than 75"),
      ];
    }
    case "resetPassword": {
      return [
        body("newPassword")
          .notEmpty()
          .withMessage("newPassword is required")
          .isLength({ min: 8, max: 15 })
          .withMessage("newPassword must be 8 characters long"),
        body("ReEnterPassword")
          .notEmpty()
          .withMessage("ReEnterPassword is required")
          .isLength({ min: 8, max: 15 })
          .withMessage("ReEnterPassword must be 8 characters long"),
      ];
    }
    case "editProfile": {
      return [
        body("fullname")
          .notEmpty()
          .withMessage("fullname is required")
          .isLength({ min: 2, max: 30 })
          .withMessage("fullname must be min 3 and max 30 characters long")
          .isAlpha()
          .withMessage("fullname must be in Alphabetic"),

        body("email")
          .notEmpty()
          .withMessage("Email field is required")
          .isEmail()
          .withMessage("invalid Email")
          .isLength({ min: 8, max: 75 })
          .withMessage("Email length must be min 8 and more than 75"),

        body("mobile")
          .notEmpty()
          .withMessage("Mobile num field is required")
          //@ts-ignore
          .isMobilePhone()
          .withMessage("Mobile num must be in numeric")
          .isLength({ min: 10, max: 15 })
          .withMessage("Mobile num must be 10 characters long"),
      ];
    }
    default: {
      return [body("invalid Method")];
    }
  }
}
