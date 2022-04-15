/**
 * Define Auth for the API
 *
 * @author Sameer <sameerp.spaceo@gmail.com>
 */
import BaseController from "./BaseController";
import * as jwt from "jsonwebtoken";
import { validationResult } from "express-validator";
import bcryptjs from "bcryptjs";

import UserModel from "../../../models/Api/v1/UserModel";
import Helper from "../../../helpers/commonFunction";
import { ReasonPhrases, StatusCodes } from "../../../utils/responses/index";

export default class AuthController extends BaseController {
  public static async signup(req: any, res: any): Promise<any> {
    try {
      const validationCheck = validationResult(req);

      if (!validationCheck.isEmpty()) {
        return res.status(200).send(
          Helper.responseWithoutData(
            false,
            StatusCodes.BAD_REQUEST,
            //@ts-ignore
            validationCheck.errors[0].msg
          )
        );
      }
      const user = await UserModel.findOne({
        email: req.body.email,
      });
      if (user) {
        res.send(
          Helper.responseWithoutData(
            false,
            StatusCodes.CONFLICT,
            "EmailID is already Exist"
          )
        );
      } else {
        const newUser = await new UserModel(req.body).save();

        if (newUser) {
          res.send(
            Helper.responseWithoutData(
              true,
              StatusCodes.CREATED,
              "Signup Successfull"
            )
          );
        } else {
          res.send(
            Helper.responseWithoutData(
              false,
              StatusCodes.BAD_REQUEST,
              ReasonPhrases.BAD_REQUEST
            )
          );
        }
      }
    } catch (err) {
      res.send(
        Helper.responseWithoutData(
          false,
          StatusCodes.INTERNAL_SERVER_ERROR,
          ReasonPhrases.INTERNAL_SERVER_ERROR
        )
      );
    }
  }

  public static async login(req: any, res: any): Promise<any> {
    try {
      const validationCheck = validationResult(req);

      if (!validationCheck.isEmpty()) {
        return res.status(200).send(
          Helper.responseWithoutData(
            false,
            StatusCodes.BAD_REQUEST,
            //@ts-ignore
            validationCheck.errors[0].msg
          )
        );
      }
      const user = await UserModel.findOne({
        email: req.body.email,
      });
      if (user) {
        if (
          user.email == req.body.email &&
          bcryptjs.compareSync(req.body.password, user.password)
        ) {
          const token = Helper.generate_Token(user._id);
          res.send(
            Helper.responseWithData(
              true,
              StatusCodes.OK,
              ReasonPhrases.OK,
              token
            )
          );
        } else {
          res.send(
            Helper.responseWithoutData(
              false,
              StatusCodes.BAD_REQUEST,
              "Invalid Credentials"
            )
          );
        }
      }else{
        res.send(
          Helper.responseWithoutData(
            false,
            StatusCodes.BAD_REQUEST,
            "Invalid Credentials"
          )
        );
      }
    } catch {
      res.send(
        Helper.responseWithoutData(
          false,
          StatusCodes.INTERNAL_SERVER_ERROR,
          ReasonPhrases.INTERNAL_SERVER_ERROR
        )
      );
    }
  }

  public static async forgetPassword(req: any, res: any): Promise<any> {
    try {
      const validationCheck = validationResult(req);

      if (!validationCheck.isEmpty()) {
        return res.status(200).send(
          Helper.responseWithoutData(
            false,
            StatusCodes.BAD_REQUEST,
            //@ts-ignore
            validationCheck.errors[0].msg
          )
        );
      }
      const user = await UserModel.findOne({
        email: req.body.email,
      });
      // console.log("user ====> " + user);
      if (user) {
        if (user.email === req.body.email) {
          // console.log(user.email);
          req.body.time = new Date().getTime();
          let subject = "Reset Your Password";
          let text = `Dear User, Please verify your account by This link \n
        either this email link http://localhost:4040/api/resetPassword/${user._id}\n This link will expires in 5 minutes`;
          Helper.sendMail(
            req.body.email,
            subject,
            text,
            (error: any, result: any) => {
              if (error) {
                return res.send(
                  Helper.responseWithoutData(
                    false,
                    StatusCodes.INTERNAL_SERVER_ERROR,
                    ReasonPhrases.INTERNAL_SERVER_ERROR
                  )
                );;
              } else {
                UserModel.findOneAndUpdate(
                  {
                    email: req.body.email,
                  },
                  {
                    $set: {
                      emailTime: req.body.time,
                    },
                  },
                  {
                    new: true,
                  },
                  (err, resu) => {
                    if (err) {
                      return res.send(
                        Helper.responseWithoutData(
                          false,
                          StatusCodes.BAD_REQUEST,
                          ReasonPhrases.BAD_REQUEST
                        )
                      );
                    } else {
                      return res.send(
                        Helper.responseWithoutData(
                          true,
                          StatusCodes.OK,
                          "Email Sent Successfully"
                        )
                      );
                    }
                  }
                );
              }
            }
          );
        } else {
          res.send(
            Helper.responseWithoutData(
              false,
              StatusCodes.BAD_REQUEST,
              "Invalid Credentials"
            )
          );
        }
      } else {
        return res.send(
          Helper.responseWithoutData(
            false,
            StatusCodes.BAD_REQUEST,
            "EmailID is not Registered"
          )
        );
      }
    } catch (error) {
      res.send(
        Helper.responseWithoutData(
          false,
          StatusCodes.INTERNAL_SERVER_ERROR,
          ReasonPhrases.INTERNAL_SERVER_ERROR
        )
      );
    }
  }

  public static async resetPassword(req: any, res: any): Promise<any> {
    try {
      const validationCheck = validationResult(req);

      if (!validationCheck.isEmpty()) {
        return res.status(200).send(
          Helper.responseWithoutData(
            false,
            StatusCodes.BAD_REQUEST,
            //@ts-ignore
            validationCheck.errors[0].msg
          )
        );
      }

      const id = req.token_payload._id;
      let user = await UserModel.findOne(id);
      if (user) {
        //@ts-ignore
        let linkTimeDifference = new Date().getTime() - user.emailTime;
        if (linkTimeDifference < 3 * 60 * 1000) {
          if (req.body.newPassword === req.body.ReEnterPassword) {
            await UserModel.findOneAndUpdate(
              {
                _id: req.token_payload._id,
              },
              {
                $set: {
                  password: req.body.newPassword,
                },
              },
              {
                new: true,
              }
            );
            res.send(
              Helper.responseWithoutData(
                true,
                StatusCodes.OK,
                "Password Updated Successfully"
              )
            );
          }
        } else {
          return res.send(
            Helper.responseWithoutData(
              false,
              StatusCodes.FORBIDDEN,
              ReasonPhrases.FORBIDDEN
            )
          );
        }
      }else{
        return res.send(
          Helper.responseWithoutData(
            false,
            StatusCodes.BAD_REQUEST,
            "User Not Found"
          )
        );
      }
    } catch (error) {
      res.send(
        Helper.responseWithoutData(
          false,
          StatusCodes.INTERNAL_SERVER_ERROR,
          ReasonPhrases.INTERNAL_SERVER_ERROR
        )
      );
    }
  }
}
