import crypto from "crypto";
import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";
import Helper from "../helpers/commonFunction";
import { ReasonPhrases, StatusCodes } from "../utils/responses/index";

class autorizationController {
  // API Authorization
  async validateApiKey(req: Request, res: Response, next: NextFunction) {
    let access_token: string = req.get("token");
    let nonce: string = req.get("nonce");
    let timestamp = req.get("timestamp");
    let hash_str =
      "nonce=" +
      nonce +
      "&timestamp=" +
      timestamp +
      "|" +
      process.env.APISECRETKEY;
    try {
      const hmac1 = crypto
        .createHmac(process.env.HASHKEY, process.env.APIPRIVATEKEY)
        .update(hash_str)
        .digest("hex");

      if (access_token === hmac1) {
        return next();
      } else {
        return res
          .status(StatusCodes.BAD_REQUEST)
          .send(Helper.responseWithoutData(ReasonPhrases.BAD_REQUEST));
      }
    } catch (err) {
      return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(
        Helper.responseWithoutData(
          ReasonPhrases.INTERNAL_SERVER_ERROR
          // err.message
        )
      );
    }
  }

  verifyjwtToken = (req: Request, res: Response, next: NextFunction) => {
    let token = req.headers["authorization"];
    // console.log("==========> token :" + token);
    if (!token) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .send(Helper.responseWithoutData(ReasonPhrases.BAD_REQUEST));
    }
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRETKEY);
      //@ts-ignore
      req.token_payload = decoded;
    } catch (err) {
      return res
        .status(StatusCodes.UNAUTHORIZED)
        .send(Helper.responseWithoutData(ReasonPhrases.UNAUTHORIZED));
    }
    return next();
  };
}

export default new autorizationController();
