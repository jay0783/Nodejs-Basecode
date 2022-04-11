/**
 * Define Auth for the API
 *
 * @author Sameer <sameerp.spaceo@gmail.com>
 */
import BaseController from "./BaseController";
import * as jwt from "jsonwebtoken";

import UserModel from "../../../models/Api/v1/UserModel";
import commonFunction from "../../../helpers/commonFunction";

export default class AuthController extends BaseController {
  public static async signup(req: any, res: any): Promise<any> {
    // console.log("call");
    // req.assert("email", "E-mail cannot be blank").notEmpty();
    // req.assert("email", "E-mail is not valid").isEmail();
    // req.assert("password", "Password cannot be blank").notEmpty();
    // req
    //   .assert("password", "Password length must be atleast 8 characters")
    //   .isLength({ min: 8 });
    // req.sanitize("email").normalizeEmail({ gmail_remove_dots: false });

    // const errors = req.validationErrors();
    // if (errors) {
    //   return res.json({
    //     errors,
    //   });
    // }

    try {
      console.log(req.body);

      const user = await new UserModel(req.body).save();
      res.send(user);
    } catch (err) {
      res.status(500).send(err.message);
    }
  }
  public static async login(req: any, res: any): Promise<any> {
    try {
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
    console.log(req.body);

    try {
      const user = await UserModel.findOne({
        email: req.body.email,
      });
      console.log("user ====> " + user);
      if (user) {
        if (user.email === req.body.email) {
          console.log(user.email);
          req.body.time = new Date().getTime();
          let subject = "Reset Your Password";
          let text = `Dear User, Please verify your account by This link \n
        either this email link http://localhost:4040/resetPassword/${user._id}\n This link will expires in 5 minutes`;
          commonFunction.sendMail(
            req.body.email,
            subject,
            text,
            (error: any, result: any) => {
              if (error) {
                return error;
              } else {
                console.log(req.body.email);
                console.log(req.body.time);
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
    console.log(req.body);

    try {
      let user = await UserModel.findOne({
        _id: req.params._id,
      });
      if (user) {
        console.log("user========>", user);
        //@ts-ignore
        let linkTimeDifference = new Date().getTime() - user.emailTime;
        if (linkTimeDifference < 3 * 60 * 1000) {
          if (req.body.newPassword === req.body.ReEnterPassword) {
            await UserModel.findOneAndUpdate({
              _id: req.params._id,
            }, {
              $set: {
                password: req.body.newPassword,
              },
            }, {
              new: true,
            });
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
