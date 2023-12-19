import bcrypt from "bcrypt";
import repository from "../database/prisma.databe";
import { CreateUserDTO } from "../dtos";
import User from "../models/user.model";

class UserService {
  public async findAll(): Promise<any> {
    const data = await repository.user.findMany();

    return data;
  }

  public async create(data: CreateUserDTO) {
    const userExist = await repository.user.findUnique({
      where: { login: data.login },
    });

    if (userExist) {
      return null;
    }

    const passwordHash = await bcrypt.hash(
      data.password,
      Number(process.env.BCRYPT_SALT)
    );

    const newUser = new User(data.login, passwordHash);

    await repository.user.create({
      data: newUser.toSave(),
    });

    return newUser;
  }

  public async findByLogin(login: string) {
    const user = repository.user.findUnique({ where: { login } });

    return user;
  }
}

export default new UserService();
