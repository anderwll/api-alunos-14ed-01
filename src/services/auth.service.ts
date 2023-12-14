import { compare } from "bcrypt";

class AuthService {
  public async comparePassword(password: string, hash: string) {
    return await compare(password, hash);
  }
}

export default new AuthService();
