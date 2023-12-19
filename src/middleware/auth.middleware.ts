import { NextFunction, Request, Response } from "express";
import jwtService from "../services/jwt.service";

class AuthMiddleware {
  public async checkUser(req: Request, res: Response, next: NextFunction) {
    try {
      const authorization = req.headers.authorization;

      if (!authorization) {
        return res
          .status(401)
          .send({ success: false, message: "Verifique login ou senha" });
      }

      const token = authorization.split(" ")[1];

      const verify = jwtService.verifyToken(token);

      req.authUser = verify as {
        id: string;
        enable: boolean;
        login: string;
        type: string;
        iat: number;
      };

      next();
    } catch (error) {
      return res
        .status(401)
        .send({ success: false, message: "Verifique login ou senha", error });
    }
  }
}

export default AuthMiddleware;
