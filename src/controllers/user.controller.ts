import { Request, Response } from "express";
import { EUserType } from "../enums";
import userService from "../services/user.service";

class UserController {
  public async findAll(req: Request, res: Response) {
    const users = await userService.findAll();

    return res
      .status(200)
      .send({ success: true, message: "Listagem de usuários", data: users });
  }

  public async create(req: Request, res: Response) {
    const { login, password, type } = req.body;

    if (!login || !password) {
      return res
        .status(400)
        .send({ success: false, message: "Preencha todos os campos!" });
    }

    if (typeof login !== "string" || login.length <= 2) {
      return res.status(400).send({
        success: false,
        message: "Login deve ser do tipo string e conter 3 caracteres.",
      });
    }

    if (typeof password !== "string" || password.length <= 2) {
      return res.status(400).send({
        success: false,
        message: "Password deve ser do tipo string e conter 3 caracteres.",
      });
    }

    if (type !== EUserType.F && type !== EUserType.M && type !== EUserType.T) {
      return res.status(400).send({
        success: false,
        message: "Type deve ser do tipo F, M ou T.",
      });
    }

    const newUser = await userService.create({ login, password, type });

    if (!newUser) {
      return res.status(404).send({
        success: false,
        message: "Não foi possível cadastrar usuário.",
      });
    }

    return res.status(201).send({
      success: true,
      message: "Usuário criado com sucesso.",
      data: newUser,
    });
  }
}

export default UserController;
