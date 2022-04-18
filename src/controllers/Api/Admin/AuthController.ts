/**
 * Define Auth for the API
 *
 * @author Sameer <sameerp.spaceo@gmail.com>
 */
import * as jwt from "jsonwebtoken";
import { validationResult } from "express-validator";
import bcryptjs from "bcryptjs";

import AdminModel from "../../../models/Admin/adminModel";
import UserModel from "../../../models/Api/v1/UserModel";
import Helper from "../../../helpers/commonFunction";
import { ReasonPhrases, StatusCodes } from "../../../utils/responses/index";

export default class AuthController {
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
      const admin = await AdminModel.findOne({
        email: req.body.email,
      });
      if (admin) {
        res.send(
          Helper.responseWithoutData(
            false,
            StatusCodes.CONFLICT,
            ReasonPhrases.CONFLICT
          )
        );
      } else {
        const newAdmin = await new AdminModel(req.body).save();

        if (newAdmin) {
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
      const user = await AdminModel.findOne({
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
      } else {
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
      const admin = await AdminModel.findOne({
        email: req.body.email,
      });
      // console.log("admin ====> " + admin);
      if (admin) {
        if (admin.email === req.body.email) {
          // console.log(admin.email);
          const token = Helper.generate_Token(admin._id);
          req.body.time = new Date().getTime();
          let subject = "Reset Your Password";
          let text = `Dear User, Please verify your account by This link \n
        either this email link https://localhost:3000/changepassword/${token}\n This link will expires in 5 minutes`;
          Helper.sendMail(
            req.body.email,
            subject,
            text,
            (error: any, result: any) => {
              if (error) {
                return error;
              } else {
                AdminModel.findOneAndUpdate(
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
              ReasonPhrases.BAD_REQUEST
            )
          );
        }
      } else {
        return res.send(
          Helper.responseWithoutData(
            false,
            StatusCodes.BAD_REQUEST,
            ReasonPhrases.BAD_REQUEST
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

  public static async checkResetLink(req: any, res: any): Promise<any> {
    try {
      let Authorization = req.body.Authorization;
      if (!Authorization) {
        return res
          .status(200)
          .send(
            Helper.responseWithoutData(
              false,
              StatusCodes.BAD_REQUEST,
              ReasonPhrases.BAD_REQUEST
            )
          );
      } else {
        const decoded = jwt.verify(Authorization, process.env.JWT_SECRETKEY);
        req.token_payload = decoded;
      }

      const id = req.token_payload._id;


        let admin = await AdminModel.findById(id);
        if (admin) {
          //@ts-ignore
          let linkTimeDifference = new Date().getTime() - admin.emailTime;
          if (linkTimeDifference < 3 * 60 * 1000) {
            res.send(
              Helper.responseWithoutData(true, StatusCodes.OK, ReasonPhrases.OK)
            );
          } else {
            res.send(
              Helper.responseWithoutData(
                false,
                StatusCodes.UNAUTHORIZED,
                ReasonPhrases.UNAUTHORIZED
              )
            );
          }
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

      let Authorization = req.body.Authorization;
      if (!Authorization) {
        return res
          .status(200)
          .send(
            Helper.responseWithoutData(
              false,
              StatusCodes.BAD_REQUEST,
              ReasonPhrases.BAD_REQUEST
            )
          );
      } else {
        const decoded = jwt.verify(Authorization, process.env.JWT_SECRETKEY);
        req.token_payload = decoded;
      }

      const id = req.token_payload._id;

      let admin = await AdminModel.findByIdAndUpdate(
        id,
        {
          $set: {
            password: req.body.newPassword,
          },
        },
        {
          new: true,
        }
      );
      admin.save();
      if (admin) {
        res.send(
          Helper.responseWithoutData(
            true,
            StatusCodes.OK,
            "Password Updated Successfully"
          )
        );
      } else {
        return res.send(
          Helper.responseWithoutData(
            false,
            StatusCodes.BAD_REQUEST,
            ReasonPhrases.BAD_REQUEST
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

  public static async userList(req: any, res: any): Promise<any> {
    try {
      let admin = await UserModel.find({});
      if (admin) {
        res.send(
          Helper.responseWithData(true, StatusCodes.OK, ReasonPhrases.OK, admin)
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

  public static async editProfile(req: any, res: any): Promise<any> {
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

      let admin = await UserModel.findByIdAndUpdate(
        { _id: req.body._id },
        req.body,
        { new: true }
      );
      if (admin) {
        res.send(
          Helper.responseWithoutData(true, StatusCodes.OK, ReasonPhrases.OK)
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

  public static async editPassword(req: any, res: any): Promise<any> {
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

      console.log(req.body);
      const id = req.token_payload._id;
      
      const admin = await AdminModel.findById(id);
      
      if (admin) {
        if (bcryptjs.compareSync(req.body.oldPassword, admin.password)) {
         await AdminModel.findByIdAndUpdate(
            id,
            {
              $set: {
                password: bcryptjs.hashSync(req.body.newPassword),
              },
            },
            {
              new: true,
            }
          );
          res.send(
            Helper.responseWithoutData(true, StatusCodes.OK, ReasonPhrases.OK)
          );
        } else {
          res.send(
            Helper.responseWithoutData(
              true,
              StatusCodes.BAD_REQUEST,
              "Invalid Current Password"
            )
          );
        }
      } else {
        res.send(
          Helper.responseWithoutData(
            false,
            StatusCodes.BAD_REQUEST,
            ReasonPhrases.BAD_REQUEST
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
