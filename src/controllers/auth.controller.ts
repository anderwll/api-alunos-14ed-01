import { Request, Response } from "express";
import authService from "../services/auth.service";
import jwtService from "../services/jwt.service";
import userService from "../services/user.service";

class AuthController {
  public async login(req: Request, res: Response) {
    const data = req.body;

    const user = await userService.findByLogin(data.login);

    if (!user) {
      return res
        .status(401)
        .send({ success: false, message: "Verifique login ou senha" });
    }

    const checkPassword = await authService.comparePassword(
      data.password,
      user.password
    );

    if (!checkPassword) {
      return res
        .status(401)
        .send({ success: false, message: "Verifique login ou senha" });
    }

    const payload = {
      id: user.id,
      enable: user.enable,
      login: user.login,
      type: user.type,
    };

    const token = jwtService.createToken(payload);

    return res.status(200).send({
      success: true,
      message: "Login efetuado com sucesso",
      data: { user: payload, token },
    });
  }
}

export default AuthController;
