import crypto from "crypto";
import jwt from "jsonwebtoken";

import Helper from "../helpers/commonFunction";
import { ReasonPhrases, StatusCodes } from "../utils/responses/index";

class autorizationController {
  // API Authorization
  async validateApiKey(req: any, res: any, next: any) {
    let access_token = req.get("token");
    let nonce = req.get("nonce");
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
          .status(200)
          .send(
            Helper.responseWithoutData(
              false,
              StatusCodes.BAD_REQUEST,
              ReasonPhrases.BAD_REQUEST
            )
          );
      }
    } catch (err) {
      return res
        .status(200)
        .send(
          Helper.responseWithoutData(
            false,
            StatusCodes.INTERNAL_SERVER_ERROR,
            ReasonPhrases.INTERNAL_SERVER_ERROR
          )
        );
    }
  }

  verifyjwtToken = (req: any, res: any, next: any) => {
    let token = req.headers["authorization"];
    // console.log("==========> token :" + token);
    if (!token) {
      return res
        .status(200)
        .send(
          Helper.responseWithoutData(
            false,
            StatusCodes.BAD_REQUEST,
            ReasonPhrases.BAD_REQUEST
          )
        );
    }
    try {
      // token = token.split(" ")[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRETKEY);
      // console.log("-------->" + JSON.stringify(decoded));

      req.token_payload = decoded;
    } catch (err) {      
      return res
        .status(200)
        .send(
          Helper.responseWithoutData(
            false,
            StatusCodes.UNAUTHORIZED,
            ReasonPhrases.UNAUTHORIZED
          )
        );
    }
    return next();
  };
}

export default new autorizationController();
