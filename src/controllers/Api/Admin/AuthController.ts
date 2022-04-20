/**
 * Define Auth for the API
 *
 * @author Sameer <sameerp.spaceo@gmail.com>
 */
import { Request, Response } from "express";
import * as jwt from "jsonwebtoken";
import { validationResult } from "express-validator";
import bcryptjs from "bcryptjs";
import { OAuth2Client } from "google-auth-library";
import fetch from "node-fetch";
import AdminModel from "../../../models/Admin/adminModel";
import AdminSocialModel from "../../../models/Admin/adminSocialModel";
import UserModel from "../../../models/Api/v1/UserModel";
import Helper from "../../../helpers/commonFunction";
import { ReasonPhrases, StatusCodes } from "../../../utils/responses/index";
const client = new OAuth2Client("407408718192.apps.googleusercontent.com");

export default class AuthController {
  public static async signup(req: Request, res: Response): Promise<any> {
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

  public static async login(req: Request, res: Response): Promise<any> {
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
          //@ts-ignore
          user.email == req.body.email && //@ts-ignore
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

  public static async forgetPassword(
    req: Request,
    res: Response
  ): Promise<any> {
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
      const admin: any = await AdminModel.findOne({
        email: req.body.email,
      });
      // console.log("admin ====> " + admin);
      if (admin) {
        //@ts-ignore

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
                  (err: any, resu: any) => {
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

  public static async checkResetLink(
    req: Request,
    res: Response
  ): Promise<any> {
    try {
      let resetPasswordToken = req.params.resetPasswordToken;
      if (!resetPasswordToken) {
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
        const decoded = jwt.verify(
          resetPasswordToken,
          process.env.JWT_SECRETKEY
        );
        //@ts-ignore
        req.token_payload = decoded;
      }
      //@ts-ignore

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

  public static async resetPassword(req: Request, res: Response): Promise<any> {
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
        //@ts-ignore
        const decoded = jwt.verify(Authorization, process.env.JWT_SECRETKEY);
        //@ts-ignore
        req.token_payload = decoded;
      }
      //@ts-ignore

      const id = req.token_payload._id;

      let admin = await AdminModel.findByIdAndUpdate(
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

  public static async userList(req: Request, res: Response): Promise<any> {
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

  public static async editProfile(req: Request, res: Response): Promise<any> {
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

  public static async editPassword(req: Request, res: Response): Promise<any> {
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
      //@ts-ignore

      const id = req.token_payload._id;

      const admin: any = await AdminModel.findById(id);

      if (admin) {
        //@ts-ignore
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
<<<<<<< HEAD
  
=======

  public static async googleLogin(req: Request, res: Response): Promise<any> {
    try {
      // const token = req.headers["access-token"];
      const token = req.body.accessToken;
      console.log("token =====>>>" + token);
      const ticket = await client.verifyIdToken({
        idToken: token,
      });
      const payload = ticket.getPayload();
      console.log("payload===>>>." + payload);
      const { name, email, sub } = payload;

      //checking if user already exists
      const isExistingUser = await AdminModel.findOne({
        email: email,
      }).populate("socialLogin");
      // console.log("user found ==>" + JSON.stringify(isExistingUser));
      if (isExistingUser) {
        //if user already exists
        if (
          isExistingUser.loginType == 0 && //@ts-ignore
          isExistingUser.socialLogin.length <= 0 //if user exists and user has normally signed up
        ) {
          const socialAccount = await new AdminSocialModel({
            socialId: sub,
            type: 2,
          }).save();
          const updateUser = await AdminModel.findOneAndUpdate(
            { email: email },
            { loginType: 1, $push: { socialLogin: socialAccount._id } },
            { new: true }
          );

          const token = Helper.generate_Token(updateUser._id);
          return res.send(
            Helper.responseWithData(
              true,
              StatusCodes.OK,
              ReasonPhrases.OK,
              token
            )
          );
        } else {
          //when user email is found but the user has social logins in account
          let gId = isExistingUser.socialLogin.find(
            (socialAcc: any) => socialAcc.socialId === sub
          );
          if (gId !== undefined) {
            const token = Helper.generate_Token(isExistingUser._id);
            return res.send(
              Helper.responseWithData(
                true,
                StatusCodes.OK,
                ReasonPhrases.OK,
                token
              )
            );
          } else {
            const socialAccount = await new AdminSocialModel({
              socialId: sub,
              type: 2,
            }).save();

            const updateUser = await AdminModel.findOneAndUpdate(
              { email: email },
              { loginType: 1, $push: { socialLogin: socialAccount._id } },
              { new: true }
            );
            const token = Helper.generate_Token(updateUser._id);
            return res.send(
              Helper.responseWithData(
                true,
                StatusCodes.OK,
                ReasonPhrases.OK,
                token
              )
            );
          }
        }
      } else {
        //no user found with email create new
        const socialAccount = await new AdminSocialModel({
          socialId: sub,
          type: 2,
        }).save();
        const createUser = await new AdminModel({
          fullname: name,
          email: email,
          loginType: 1,
          socialLogin: socialAccount._id,
        }).save();
        const token = Helper.generate_Token(createUser._id);
        return res.send(
          Helper.responseWithData(true, StatusCodes.OK, ReasonPhrases.OK, token)
        );
      }
    } catch (ex) {
      console.log(
        "=============================>>>>>>>>>>>>" +
          JSON.stringify({ message: ex.message })
      );
      return res.send(
        Helper.responseWithoutData(
          true,
          StatusCodes.INTERNAL_SERVER_ERROR,
          ReasonPhrases.INTERNAL_SERVER_ERROR
        )
      );
    }
  }

  public static async facebookLogin(req: Request, res: Response): Promise<any> {
    try {
      // const token = req.headers["access-token"];
      const token = req.body.accessToken;
      const data = await fetch(
        `https://graph.facebook.com/v13.0/me?fields=id,name,email&access_token=${token}`
      );
      const payload = await data.json();
      const { id, name, email } = payload;

      const socialAccount = await AdminSocialModel.findOne({
        socialId: id,
      });
      if (socialAccount) {
        //checking if the facebook id already exists in database
        if (payload.email) {
          //if facebook profile is public and email is available
          const adminWithSocial = await AdminModel.findOne({
            email: payload.email,
          }).populate("socialLogin");
          let fId = adminWithSocial.socialLogin.find(
            (socialAcc: any) => socialAcc.socialId === id
          );
          if (fId !== undefined) {
            const token = Helper.generate_Token(adminWithSocial._id);
            return res.send(
              Helper.responseWithData(
                true,
                StatusCodes.OK,
                ReasonPhrases.OK,
                token
              )
            );
          } else {
            //facebook id exists but email is not available
            // const socialAccount = await new userSocialModel({
            //   socialId: id,
            //   type: 1,
            // }).save();

            const updateUser = await AdminModel.findOneAndUpdate(
              { email: email },
              { loginType: 1, $push: { socialLogin: socialAccount._id } },
              { new: true }
            );
            const token = Helper.generate_Token(updateUser._id);
            return res.send(
              Helper.responseWithData(
                true,
                StatusCodes.OK,
                ReasonPhrases.OK,
                token
              )
            );
          }
        } else {
          //if facebook id is found in the database new entries should be created
          // const socialAccount = await new userSocialModel({
          //   socialId: id,
          //   type: 1,
          // }).save();

          const createUser = await new AdminModel({
            fullname: name,
            loginType: 1,
            socialLogin: socialAccount._id,
          }).save();

          const token = Helper.generate_Token(createUser._id);
          return res.send(
            Helper.responseWithData(
              true,
              StatusCodes.OK,
              ReasonPhrases.OK,
              token
            )
          );
        }
      } else {
        const socialAccount = await new AdminSocialModel({
          socialId: id,
          type: 1,
        }).save();
        const createUser = await new AdminModel({
          fullname: name,
          loginType: 1,
          socialLogin: socialAccount._id,
        }).save();
        const token = Helper.generate_Token(createUser._id);
        return res.send(
          Helper.responseWithData(true, StatusCodes.OK, ReasonPhrases.OK, token)
        );
      }
    } catch (ex) {
      return res.send(
        Helper.responseWithoutData(
          true,
          StatusCodes.INTERNAL_SERVER_ERROR,
          ex.message
        )
      );
    }
  }
>>>>>>> f2cba4f542f0da3f19dd9d20bef9b5abf1854b3b
}
