import * as dotenv from "dotenv";
import jwt from "jsonwebtoken";

dotenv.config();

class JwtService {
  public createToken(paylod: any) {
    return jwt.sign(paylod, String(process.env.JWT_SECRET_KEY), {
      expiresIn: process.env.JWT_EXPIRE_IN,
    });
  }

  public verifyToken(token: string) {
    return jwt.verify(token, String(process.env.JWT_SECRET_KEY));
  }
}

export default new JwtService();
