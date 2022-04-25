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
      const validationCheck: any = validationResult(req);

      if (!validationCheck.isEmpty()) {
        return res
          .status(StatusCodes.BAD_REQUEST)
          .send(Helper.responseWithoutData(validationCheck.errors[0].msg));
      }
      const admin = await AdminModel.findOne({
        email: req.body.email,
      });
      if (admin) {
        res
          .status(StatusCodes.CONFLICT)
          .send(Helper.responseWithoutData(ReasonPhrases.CONFLICT));
      } else {
        const newAdmin = new AdminModel(req.body);
        newAdmin.password = bcryptjs.hashSync(newAdmin.password);
        await newAdmin.save();

        if (newAdmin) {
          res
            .status(StatusCodes.CREATED)
            .send(Helper.responseWithoutData(ReasonPhrases.CREATED));
        } else {
          res
            .status(StatusCodes.BAD_REQUEST)
            .send(Helper.responseWithoutData(ReasonPhrases.BAD_REQUEST));
        }
      }
    } catch (err) {
      res
        .status(StatusCodes.INTERNAL_SERVER_ERROR)
        .send(Helper.responseWithoutData(ReasonPhrases.INTERNAL_SERVER_ERROR));
    }
  }

  public static async login(req: Request, res: Response): Promise<any> {
    try {
      const validationCheck: any = validationResult(req);

      if (!validationCheck.isEmpty()) {
        return res
          .status(StatusCodes.BAD_REQUEST)
          .send(Helper.responseWithoutData(validationCheck.errors[0].msg));
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
          res
            .status(StatusCodes.OK)
            .send(Helper.responseWithData(ReasonPhrases.OK, token));
        } else {
          res
            .status(StatusCodes.BAD_REQUEST)
            .send(Helper.responseWithoutData(ReasonPhrases.BAD_REQUEST));
        }
      } else {
        res
          .status(StatusCodes.BAD_REQUEST)
          .send(Helper.responseWithoutData(ReasonPhrases.BAD_REQUEST));
      }
    } catch (ex) {
      res
        .status(StatusCodes.INTERNAL_SERVER_ERROR)
        .send(Helper.responseWithoutData(ReasonPhrases.INTERNAL_SERVER_ERROR));
    }
  }

  public static async forgetPassword(
    req: Request,
    res: Response
  ): Promise<any> {
    try {
      const validationCheck: any = validationResult(req);

      if (!validationCheck.isEmpty()) {
        return res
          .status(StatusCodes.BAD_REQUEST)
          .send(Helper.responseWithoutData(validationCheck.errors[0].msg));
      }
      const admin: any = await AdminModel.findOne({
        email: req.body.email,
      });
      if (admin) {
        if (admin.email === req.body.email) {
          const token = Helper.generate_Token(admin._id);
          let time = new Date().getTime();
          let subject = "Reset Your Password";
          let text = `Dear User,\n You have requested to change the password of your account. \n
  Please click on the link https://localhost:3000/changepassword/${token}\n to reset your password, Please note that this link is valid for 5 minutes`;

          const hasMail = Helper.sendMail(req.body.email, subject, text);
          // if (hasMail) {
          const updateAdmin = await AdminModel.findOneAndUpdate(
            {
              email: req.body.email,
            },
            {
              $set: {
                emailTime: time,
              },
            },
            {
              new: true,
            }
          );

          if (updateAdmin) {
            return res
              .status(StatusCodes.OK)
              .send(Helper.responseWithoutData("Email Sent Successfully"));
          } else {
            return res
              .status(StatusCodes.BAD_REQUEST)
              .send(Helper.responseWithoutData(ReasonPhrases.BAD_REQUEST));
          }
        }
        // } else {
        //   res.send(
        //     Helper.responseWithoutData(
        //       false,
        //       StatusCodes.BAD_REQUEST,
        //       ReasonPhrases.BAD_REQUEST
        //     )
        //   );
        // }
      } else {
        res
          .status(StatusCodes.BAD_REQUEST)
          .send(Helper.responseWithoutData(ReasonPhrases.BAD_REQUEST));
      }
    } catch (error) {
      res
        .status(StatusCodes.INTERNAL_SERVER_ERROR)
        .send(Helper.responseWithoutData(ReasonPhrases.INTERNAL_SERVER_ERROR));
    }
  }

  public static async checkResetLink(
    req: Request,
    res: Response
  ): Promise<any> {
    try {
      let Authorization = req.params.Authorization;
      if (!Authorization) {
        return res
          .status(StatusCodes.BAD_REQUEST)
          .send(Helper.responseWithoutData(ReasonPhrases.BAD_REQUEST));
      } else {
        var decoded: any = jwt.verify(Authorization, process.env.JWT_SECRETKEY);
        let admin = await AdminModel.findById(decoded._id);
        if (admin) {
          let linkTimeDifference = new Date().getTime() - admin.emailTime;
          if (linkTimeDifference < 3 * 60 * 1000) {
            res
              .status(StatusCodes.OK)
              .send(Helper.responseWithoutData(ReasonPhrases.OK));
          } else {
            res
              .status(StatusCodes.UNAUTHORIZED)
              .send(Helper.responseWithoutData(ReasonPhrases.UNAUTHORIZED));
          }
        } else {
          res
            .status(StatusCodes.UNAUTHORIZED)
            .send(Helper.responseWithoutData(ReasonPhrases.UNAUTHORIZED));
        }
      }
    } catch (error) {
      res
        .status(StatusCodes.INTERNAL_SERVER_ERROR)
        .send(Helper.responseWithoutData(ReasonPhrases.INTERNAL_SERVER_ERROR));
    }
  }

  public static async resetPassword(req: Request, res: Response): Promise<any> {
    try {
      const validationCheck: any = validationResult(req);

      if (!validationCheck.isEmpty()) {
        return res
          .status(StatusCodes.BAD_REQUEST)
          .send(Helper.responseWithoutData(validationCheck.errors[0].msg));
      }

      let Authorization = req.body.Authorization;
      if (!Authorization) {
        return res
          .status(StatusCodes.BAD_REQUEST)
          .send(Helper.responseWithoutData(ReasonPhrases.BAD_REQUEST));
      } else {
        var decoded: any = jwt.verify(Authorization, process.env.JWT_SECRETKEY);
        //@ts-ignore
      }
      const hashPass = bcryptjs.hashSync(req.body.newPassword);
      let updateAdmin = await AdminModel.findByIdAndUpdate(
        decoded._id,
        {
          $set: {
            password: hashPass,
          },
        },
        {
          new: true,
        }
      );
      await updateAdmin.save();
      if (updateAdmin) {
        res
          .status(StatusCodes.OK)
          .send(Helper.responseWithoutData(ReasonPhrases.OK));
      } else {
        res
          .status(StatusCodes.BAD_REQUEST)
          .send(Helper.responseWithoutData(ReasonPhrases.BAD_REQUEST));
      }
    } catch (error) {
      res
        .status(StatusCodes.INTERNAL_SERVER_ERROR)
        .send(Helper.responseWithoutData(ReasonPhrases.INTERNAL_SERVER_ERROR));
    }
  }

  public static async userList(req: Request, res: Response): Promise<any> {
    try {
      let admin = await UserModel.find({});
      if (admin) {
        res
          .status(StatusCodes.OK)
          .send(Helper.responseWithData(ReasonPhrases.OK, admin));
      } else {
        res
          .status(StatusCodes.BAD_REQUEST)
          .send(Helper.responseWithoutData(ReasonPhrases.BAD_REQUEST));
      }
    } catch (error) {
      res
        .status(StatusCodes.INTERNAL_SERVER_ERROR)
        .send(Helper.responseWithoutData(ReasonPhrases.INTERNAL_SERVER_ERROR));
    }
  }

  public static async userCount(req: Request, res: Response): Promise<any> {
    try {
      const userCount = await UserModel.count();
      return res
        .status(200)
        .send(Helper.responseWithData(ReasonPhrases.OK, userCount));
    } catch (ex) {
      return res
        .status(StatusCodes.INTERNAL_SERVER_ERROR)
        .send(Helper.responseWithoutData(ReasonPhrases.INTERNAL_SERVER_ERROR));
    }
  }

  public static async getUserDetails(
    req: Request,
    res: Response
  ): Promise<any> {
    try {
      let user = await UserModel.findById(req.params.id);
      console.log(req.params.id);

      if (user) {
        res
          .status(StatusCodes.OK)
          .send(Helper.responseWithData(ReasonPhrases.OK, user));
      } else {
        res
          .status(StatusCodes.BAD_REQUEST)
          .send(Helper.responseWithoutData(ReasonPhrases.BAD_REQUEST));
      }
    } catch (error) {
      res
        .status(StatusCodes.INTERNAL_SERVER_ERROR)
        .send(Helper.responseWithoutData(ReasonPhrases.INTERNAL_SERVER_ERROR));
    }
  }

  public static async editProfile(req: Request, res: Response): Promise<any> {
    try {
      const validationCheck: any = validationResult(req);

      if (!validationCheck.isEmpty()) {
        return res
          .status(StatusCodes.BAD_REQUEST)
          .send(Helper.responseWithoutData(validationCheck.errors[0].msg));
      }

      let admin = await UserModel.findByIdAndUpdate(
        { _id: req.body._id },
        req.body,
        { new: true }
      );
      if (admin) {
        res
          .status(StatusCodes.OK)
          .send(Helper.responseWithoutData(ReasonPhrases.OK));
      } else {
        res
          .status(StatusCodes.BAD_REQUEST)
          .send(Helper.responseWithoutData(ReasonPhrases.BAD_REQUEST));
      }
    } catch (error) {
      res
        .status(StatusCodes.INTERNAL_SERVER_ERROR)
        .send(Helper.responseWithoutData(ReasonPhrases.INTERNAL_SERVER_ERROR));
    }
  }

  public static async editPassword(req: Request, res: Response): Promise<any> {
    try {
      const validationCheck: any = validationResult(req);

      if (!validationCheck.isEmpty()) {
        return res
          .status(StatusCodes.BAD_REQUEST)
          .send(Helper.responseWithoutData(validationCheck.errors[0].msg));
      }

      //@ts-ignore
      const id = req.token_payload._id;

      const admin: any = await AdminModel.findById(id);

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
          res
            .status(StatusCodes.OK)
            .send(Helper.responseWithoutData(ReasonPhrases.OK));
        } else {
          res
            .status(StatusCodes.BAD_REQUEST)
            .send(Helper.responseWithoutData(ReasonPhrases.BAD_REQUEST));
        }
      } else {
        res
          .status(StatusCodes.BAD_REQUEST)
          .send(Helper.responseWithoutData(ReasonPhrases.BAD_REQUEST));
      }
    } catch (error) {
      res
        .status(StatusCodes.INTERNAL_SERVER_ERROR)
        .send(Helper.responseWithoutData(ReasonPhrases.INTERNAL_SERVER_ERROR));
    }
  }

  public static async googleLogin(req: Request, res: Response): Promise<any> {
    try {
      // const token = req.headers["access-token"];
      const token = req.body.accessToken;
      const ticket = await client.verifyIdToken({
        idToken: token,
      });
      const payload = ticket.getPayload();
      const { name, email, sub } = payload;

      //checking if user already exists
      const isExistingUser = await AdminModel.findOne({
        email: email,
      }).populate("socialLogin");
      if (isExistingUser) {
        //if user already exists
        if (
          isExistingUser.loginType == 0 &&
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
          return res
            .status(StatusCodes.OK)
            .send(Helper.responseWithData(ReasonPhrases.OK, token));
        } else {
          //when user email is found but the user has social logins in account
          let gId = isExistingUser.socialLogin.find(
            (socialAcc: any) => socialAcc.socialId === sub
          );
          if (gId !== undefined) {
            const token = Helper.generate_Token(isExistingUser._id);
            return res
              .status(StatusCodes.OK)
              .send(Helper.responseWithData(ReasonPhrases.OK, token));
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
            return res
              .status(StatusCodes.OK)
              .send(Helper.responseWithData(ReasonPhrases.OK, token));
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
        return res
          .status(StatusCodes.OK)
          .send(Helper.responseWithData(ReasonPhrases.OK, token));
      }
    } catch (ex) {
      return res
        .status(StatusCodes.INTERNAL_SERVER_ERROR)
        .send(Helper.responseWithoutData(ReasonPhrases.INTERNAL_SERVER_ERROR));
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
            return res
              .status(StatusCodes.OK)
              .send(Helper.responseWithData(ReasonPhrases.OK, token));
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
            return res
              .status(StatusCodes.OK)
              .send(Helper.responseWithData(ReasonPhrases.OK, token));
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
          return res
            .status(StatusCodes.OK)
            .send(Helper.responseWithData(ReasonPhrases.OK, token));
        }
      } else {
        const socialAcc = await new AdminSocialModel({
          socialId: id,
          type: 1,
        }).save();

        const createAdmin = await new AdminModel({
          fullname: name,
          email: payload.email ? payload.email : "",
          loginType: 1,
          socialLogin: socialAcc._id,
        }).save();

        const token = Helper.generate_Token(createAdmin._id);
        return res
          .status(StatusCodes.OK)
          .send(Helper.responseWithData(ReasonPhrases.OK, token));
      }
    } catch (ex) {
      res
        .status(StatusCodes.INTERNAL_SERVER_ERROR)
        .send(Helper.responseWithoutData(ReasonPhrases.INTERNAL_SERVER_ERROR));
    }
  }
}
