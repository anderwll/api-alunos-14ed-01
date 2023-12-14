import { Request, Response } from "express";
import userService from "../services/user.service";
import authService from "../services/auth.service";
import jwtService from "../services/jwt.service";

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
    };
    const token = jwtService.createToken(payload);

    return res.status(200).send({
      success: true,
      message: "Login efetuado com sucesso",
      data: { token, user: payload },
    });
  }

  public logout(req: Request, res: Response) {
    console.log("logout");

    return res
      .status(200)
      .send({ success: true, message: "Logout efetuado com sucesso" });
  }
}

export default AuthController;
