/**
 * Define Auth for the API
 *
 * @author Sameer <sameerp.spaceo@gmail.com>
 */
import BaseController from "./BaseController";
import * as jwt from "jsonwebtoken";
import { validationResult } from "express-validator";

import UserModel from "../../../models/Api/v1/UserModel";
import Helper from "../../../helpers/commonFunction";
import { ReasonPhrases, StatusCodes } from "../../../utils/status-code/index";

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
      const user = await new UserModel(req.body).save();
      if (user) {
        res.send(
          Helper.responseWithoutData(
            true,
            StatusCodes.CREATED,
            ReasonPhrases.CREATED
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
      res.json({
        message: "User Login Successfully",
      });
    } catch {
      res.status(400).send("error");
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
                return error;
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
                      return err;
                    } else {
                      return res.send({
                        message: "Email Sent",
                      });
                    }
                  }
                );
              }
            }
          );
        } else {
          res.send("Invalid Email");
        }
      } else {
        return res.send("cannot find email");
      }
    } catch (error) {
      res.send(error.message);
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
      let user = await UserModel.findOne({
        _id: req.params._id,
      });
      if (user) {
        //@ts-ignore
        let linkTimeDifference = new Date().getTime() - user.emailTime;
        if (linkTimeDifference < 3 * 60 * 1000) {
          if (req.body.newPassword === req.body.ReEnterPassword) {
            await UserModel.findOneAndUpdate(
              {
                _id: req.params._id,
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
            res.send("Password Successsfully Updated...");
          }
        } else {
          return res.send("Expired");
        }
      }
    } catch (error) {
      res.send("Internal Server Error");
    }
  }
}
