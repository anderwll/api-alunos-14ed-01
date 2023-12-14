import jwt from "jsonwebtoken";
import * as dotenv from "dotenv";

dotenv.config();

class JwtService {
  public createToken(paylod: any) {
    return jwt.sign(paylod, process.env.AUTH_SECRET || "");
  }

  public verifyToken(token: string) {
    return jwt.verify(token, process.env.AUTH_SECRET || "");
  }
}

export default new JwtService();
