import jwt from "jsonwebtoken";
import nodeMailer from "nodemailer";
import logger from "../utils/logger";
class Helper {
  responseWithData(message: String, data: any) {
    return {
      message: message,
      data: data,
    };
  }
  responseWithoutData(message: String) {
    return {
      message: message,
    };
  }

  generate_Token(payload: any) {
    return jwt.sign(
      {
        _id: payload,
      },
      `${process.env.JWT_SECRETKEY}`,
      {
        expiresIn: "1d",
      }
    );
  }
  async sendMail(email: any, subject: any, text: any) {
    return new Promise((resolve, reject) => {
      const transporter = nodeMailer.createTransport({
        service: "gmail",
        auth: {
          user: "smits.spaceo@gmail.com",
          pass: "smit@0103",
        },
      });
      const options = {
        // from: "thapa@gmail.com",
        to: email,
        subject: subject,
        text: text,
      };
      transporter.sendMail(options, (error, result) => {
        if (error) {
          logger.error("Error:", error.message);
          reject(error);
        } else {
          logger.info("Mail sent:", result.response);
          resolve(result.response);
        }
      });
    });
  }

  getOtp() {
    let otp = Math.floor(Math.random() * 1000 + 1000);
    return otp;
  }
}

export default new Helper();
