import jwt from "jsonwebtoken";
import nodeMailer from "nodemailer";
import logger from "../utils/logger";
class Helper {
  responseWithData(
    responseStatus: Boolean,
    responseCode: Number,
    responseMessage: String,
    responseData: any
  ) {
    return {
      responseStatus: responseStatus,
      responseCode: responseCode,
      responseMessage: responseMessage,
      responseData: responseData,
    };
  }
  responseWithoutData(
    responseStatus: Boolean,
    responseCode: Number,
    responseMessage: String
  ) {
    return {
      responseStatus: responseStatus,
      responseCode: responseCode,
      responseMessage: responseMessage,
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
  sendMail(email: any, subject: any, text: any, cb: any) {
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
        cb(error, null);
      } else {
        logger.info("Mail sent:", result.response);
        cb(null, result.response);
      }
    });
  }
  getOtp() {
    let otp = Math.floor(Math.random() * 1000 + 1000);
    return otp;
  }
}

export default new Helper();
