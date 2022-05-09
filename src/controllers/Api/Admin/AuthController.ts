/**
 * Define Auth for the API
 *
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
import appModel from "../../../models/Admin/appModel";
import deviceModel from "../../../models/Api/v1/deviceModel";
import pageModel from "../../../models/Admin/pageModel";
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
          .send(Helper.responseWithoutData(ReasonPhrases.EMAIL_EXISTS));
      } else {
        const newAdmin = new AdminModel(req.body);
        newAdmin.password = bcryptjs.hashSync(newAdmin.password);
        await newAdmin.save();

        if (newAdmin) {
          // const { device_id, device_name, fcm_key } = req.body;
          // const admin_device = await new deviceModel({
          //   user_id: newAdmin._id,
          //   device_name: device_name,
          //   device_id: device_id,
          //   fcm_key: fcm_key ? fcm_key : null,
          // }).save();
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
          // const { device_id, device_name, fcm_key } = req.body;
          // const admin_device = await new deviceModel({
          //   user_id: user._id,
          //   device_name: device_name,
          //   device_id: device_id,
          //   isLoggedIn: true,
          // }).save();

          const token = Helper.generate_Token(user._id);
          res
            .status(StatusCodes.OK)
            .send(Helper.responseWithData(ReasonPhrases.OK, token));
        } else {
          res
            .status(StatusCodes.BAD_REQUEST)
            .send(Helper.responseWithoutData(ReasonPhrases.PASSWORD_INCORRECT));
        }
      } else {
        res
          .status(StatusCodes.BAD_REQUEST)
          .send(Helper.responseWithoutData(ReasonPhrases.NOT_FOUND));
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
              .send(Helper.responseWithoutData(ReasonPhrases.EMAIL_INCORRECT));
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
          .send(Helper.responseWithoutData(ReasonPhrases.EMAIL_INCORRECT));
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
          .send(Helper.responseWithoutData(ReasonPhrases.NO_TOKEN));
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
            .status(StatusCodes.BAD_REQUEST)
            .send(Helper.responseWithoutData(ReasonPhrases.NOT_FOUND));
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
          .send(Helper.responseWithoutData(ReasonPhrases.NO_TOKEN));
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
      let users = await UserModel.find({});
      if (users) {
        res
          .status(StatusCodes.OK)
          .send(Helper.responseWithData(ReasonPhrases.OK, users));
      } else {
        res
          .status(StatusCodes.NOT_FOUND)
          .send(Helper.responseWithoutData(ReasonPhrases.NOT_FOUND));
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
      let user = await UserModel.findById(req.params.id).select(
        "-emailTime -createdAt -updatedAt -socialLogin"
      );
      if (user) {
        res
          .status(StatusCodes.OK)
          .send(Helper.responseWithData(ReasonPhrases.OK, user));
      } else {
        res
          .status(StatusCodes.BAD_REQUEST)
          .send(Helper.responseWithoutData(ReasonPhrases.INCORRECT_PARAMS));
      }
    } catch (error) {
      res
        .status(StatusCodes.INTERNAL_SERVER_ERROR)
        .send(Helper.responseWithoutData(ReasonPhrases.INTERNAL_SERVER_ERROR));
    }
  }

  public static async deleteUser(req: Request, res: Response): Promise<any> {
    try {
      let user = await UserModel.findByIdAndDelete(req.params.id);
      if (user) {
        res
          .status(StatusCodes.OK)
          .send(Helper.responseWithoutData(ReasonPhrases.OK));
      } else {
        res
          .status(StatusCodes.BAD_REQUEST)
          .send(Helper.responseWithoutData(ReasonPhrases.INCORRECT_PARAMS));
      }
    } catch (error) {
      res
        .status(StatusCodes.INTERNAL_SERVER_ERROR)
        .send(Helper.responseWithoutData(ReasonPhrases.INTERNAL_SERVER_ERROR));
    }
  }

  public static async searchUser(req: Request, res: Response) {
    try {
      // const search = req.body.search;
      console.log(req.body.name, req.body.email);

      let query;
      req.body.name !== ""
        ? (query = {
            fullname: new RegExp(".*" + req.body.name + ".*", "i"),
          })
        : (query = {
            email: new RegExp(".*" + req.body.email + ".*", "i"),
          });

      if (req.body.name !== "" && req.body.email !== "") {
        query = {
          fullname: new RegExp(".*" + req.body.name + ".*", "i"),
          email: new RegExp(".*" + req.body.email + ".*", "i"),
        };
      }
      console.log("Query =======>>>" + query.email);
      const user = await UserModel.find(query);

      // console.log(user);
      if (user) {
        res
          .status(StatusCodes.OK)
          .send(Helper.responseWithData(ReasonPhrases.OK, user));
      } else {
        res
          .status(StatusCodes.BAD_REQUEST)
          .send(Helper.responseWithoutData(ReasonPhrases.NOT_FOUND));
      }
    } catch (ex) {
      // ReasonPhrases.INTERNAL_SERVER_ERROR
      res
        .status(StatusCodes.INTERNAL_SERVER_ERROR)
        .send(Helper.responseWithoutData(ex.message));
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
          .send(Helper.responseWithoutData(ReasonPhrases.INCORRECT_PARAMS));
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
            .send(
              Helper.responseWithoutData(ReasonPhrases.OLD_PASSWORD_INCORRECT)
            );
        }
      } else {
        res
          .status(StatusCodes.BAD_REQUEST)
          // .send(Helper.responseWithoutData(ReasonPhrases.BAD_REQUEST))
          .send(Helper.responseWithoutData(ReasonPhrases.NOT_FOUND));
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
          // const { device_id, device_name} = req.body;
          // const admin_device = await new deviceModel({
          //   user_id: updateUser._id,
          //   device_name: device_name,
          //   device_id: device_id,
          //   isLoggedIn: true,
          // }).save();

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
            // const { device_id, device_name} = req.body;
            // const admin_device = await new deviceModel({
            //   user_id: isExistingUser._id,
            //   device_name: device_name,
            //   device_id: device_id,
            //   isLoggedIn: true,
            // }).save();
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

            // const { device_id, device_name} = req.body;
            // const admin_device = await new deviceModel({
            //   user_id: isExistingUser._id,
            //   device_name: device_name,
            //   device_id: device_id,
            //   isLoggedIn: true,
            // }).save();
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
        // const { device_id, device_name} = req.body;
        // const admin_device = await new deviceModel({
        //   user_id: createUser._id,
        //   device_name: device_name,
        //   device_id: device_id,
        //   isLoggedIn: true,
        // }).save();
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
            // const { device_id, device_name} = req.body;
            // const admin_device = await new deviceModel({
            //   user_id: adminWithSocial._id,
            //   device_name: device_name,
            //   device_id: device_id,
            //   isLoggedIn: true,
            // }).save();
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
            // const { device_id, device_name} = req.body;
            // const admin_device = await new deviceModel({
            //   user_id: updateUser._id,
            //   device_name: device_name,
            //   device_id: device_id,
            //   isLoggedIn: true,
            // }).save();
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
          // const { device_id, device_name} = req.body;
          // const admin_device = await new deviceModel({
          //   user_id: createUser._id,
          //   device_name: device_name,
          //   device_id: device_id,
          //   isLoggedIn: true,
          // }).save();
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

  public static async getAppinfo(req: Request, res: Response): Promise<any> {
    try {
      const appInfo = await appModel.find({}).select("-createdAt -updatedAt");
      if (appInfo) {
        res
          .status(StatusCodes.OK)
          .send(Helper.responseWithData(ReasonPhrases.OK, appInfo));
      } else {
        res
          .status(StatusCodes.NOT_FOUND)
          .send(Helper.responseWithoutData(ReasonPhrases.NOT_FOUND));
      }
    } catch (err) {
      res
        .status(StatusCodes.INTERNAL_SERVER_ERROR)
        .send(Helper.responseWithoutData(ReasonPhrases.INTERNAL_SERVER_ERROR));
      // console.log(err.message);
    }
  }

  public static async editAppinfo(req: Request, res: Response): Promise<any> {
    try {
      let appInfo = await appModel.findByIdAndUpdate(
        { _id: req.body._id },
        req.body,
        { new: true }
      );
      if (appInfo) {
        res
          .status(StatusCodes.OK)
          .send(Helper.responseWithoutData(ReasonPhrases.OK));
      } else {
        res
          .status(StatusCodes.BAD_REQUEST)
          .send(Helper.responseWithoutData(ReasonPhrases.INCORRECT_PARAMS));
      }
    } catch (error) {
      res
        .status(StatusCodes.INTERNAL_SERVER_ERROR)
        .send(Helper.responseWithoutData(ReasonPhrases.INTERNAL_SERVER_ERROR));
    }
  }

  public static async addAppinfo(req: Request, res: Response): Promise<any> {
    const addInfo = await new appModel(req.body).save();
    if (addInfo) {
      res
        .status(StatusCodes.OK)
        .send(Helper.responseWithoutData(ReasonPhrases.OK));
    } else {
      res
        .status(StatusCodes.BAD_REQUEST)
        .send(Helper.responseWithoutData("Enter correct details"));
    }
  }
  public static async getAllPage(req: Request, res: Response): Promise<any> {
    try {
      const page = await pageModel.find({});
      if (page) {
        res
          .status(StatusCodes.OK)
          .send(Helper.responseWithData(ReasonPhrases.OK, page));
      } else {
        res
          .status(StatusCodes.NOT_FOUND)
          .send(Helper.responseWithoutData(ReasonPhrases.NOT_FOUND));
      }
    } catch (err) {
      res
        .status(StatusCodes.INTERNAL_SERVER_ERROR)
        .send(Helper.responseWithoutData(ReasonPhrases.INTERNAL_SERVER_ERROR));
      // console.log(err.message);
    }
  }
  public static async getPage(req: Request, res: Response): Promise<any> {
    try {
      const page = await pageModel
        .findOne({ title: req.params.title })
        .select("-createdAt -updatedAt");
      if (page) {
        res
          .status(StatusCodes.OK)
          .send(Helper.responseWithData(ReasonPhrases.OK, page));
      } else {
        res
          .status(StatusCodes.NOT_FOUND)
          .send(Helper.responseWithoutData(ReasonPhrases.NOT_FOUND));
      }
    } catch (err) {
      res
        .status(StatusCodes.INTERNAL_SERVER_ERROR)
        .send(Helper.responseWithoutData(ReasonPhrases.INTERNAL_SERVER_ERROR));
      // console.log(err.message);
    }
  }

  public static async logout(req: Request, res: Response): Promise<any> {
    try {
      const logout = await deviceModel.deleteOne({ user_id: req.body._id });
      if (logout) {
        res
          .status(StatusCodes.OK)
          .send(Helper.responseWithoutData("Logged out Successfully"));
      }
    } catch (ex) {
      res
        .status(StatusCodes.INTERNAL_SERVER_ERROR)
        .send(Helper.responseWithoutData(ReasonPhrases.INTERNAL_SERVER_ERROR));
    }
  }

  public static async editPage(req: Request, res: Response): Promise<any> {
    try {
      let page = await pageModel.findByIdAndUpdate(
        { _id: req.body._id },
        req.body,
        { new: true }
      );
      if (page) {
        res
          .status(StatusCodes.OK)
          .send(Helper.responseWithoutData(ReasonPhrases.OK));
      } else {
        res
          .status(StatusCodes.BAD_REQUEST)
          .send(Helper.responseWithoutData(ReasonPhrases.INCORRECT_PARAMS));
      }
    } catch (error) {
      res
        .status(StatusCodes.INTERNAL_SERVER_ERROR)
        .send(Helper.responseWithoutData(ReasonPhrases.INTERNAL_SERVER_ERROR));
    }
  }
}
