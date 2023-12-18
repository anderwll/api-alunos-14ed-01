import repository from "../database/prisma.databe";
import User from "../models/user.model";
import bcrypt from "bcrypt";

class UserService {
  public async findAll(): Promise<any> {
    const data = await repository.user.findMany();

    return data;
  }

  public async create(data: any) {
    const passwordHash = await bcrypt.hash(data.password, 10);

    const newUser = new User(data.login, passwordHash);

    const createUser = await repository.user.create({
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
