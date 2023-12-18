import { Request, Response } from "express";
import userService from "../services/user.service";

class UserController {
  public async findAll(req: Request, res: Response) {
    const users = await userService.findAll();

    return res
      .status(200)
      .send({ success: true, message: "Litagem de usuários", data: users });
  }

  public async create(req: Request, res: Response) {
    const { body } = req;

    const newUser = await userService.create(body);

    if (newUser) {
      return res.status(201).send({
        success: true,
        message: "Usuário criado com sucesso.",
        data: newUser.toJson(),
      });
    }

    return res
      .status(404)
      .send({ success: false, message: "Erro ao criar usuário." });
  }
}

export default UserController;
