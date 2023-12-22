import { User } from "@prisma/client";
import UserService from "../../src/services/user.service";
import { prismaMock } from "../config/prisma.mock";
import { CreateUserDTO } from "../../src/dtos";
import bcrypt from 'bcrypt'
import { EUserType } from "../../src/enums";

describe("User Service", () => {
  const createSut = () => {
    return UserService;
  };

  describe("FindAll", () => {
    it("Deve retornar lista vazia", async () => {
      const sut = createSut();

      prismaMock.user.findMany.mockResolvedValue([]);

      const result = await sut.findAll();

      expect(result).toHaveLength(0);
      expect(result).toStrictEqual([]);
    });

    it("Deve retornar uma lista contendo um usuário", async () => {
      const sut = createSut();

      prismaMock.user.findMany.mockResolvedValue([
        {
          id: "any_uuid",
          login: "any_login",
          password: "any_password",
          type: EUserType.T,
          enable: true,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ]);

      const result = await sut.findAll();
      console.log(result);

      expect(result).toHaveLength(1);
      result.forEach((user) => {
        expect(user).toHaveProperty("id", "any_uuid");
        expect(user).toHaveProperty("login", "any_login");
        expect(user).toHaveProperty("password", "any_password");
        expect(user).toHaveProperty("type", EUserType.T);
        expect(user).toHaveProperty("enable", true);
        expect(user).toHaveProperty("createdAt");
        expect(user).toHaveProperty("updatedAt");
      });
    });
  });

  describe("Create", () => {
    it("Deve retornar null quando já houver um usuário cadastrado com o login passado", async () => {
      const sut = createSut()

      prismaMock.user.findUnique.mockResolvedValue({} as User)

      const result = await sut.create({} as CreateUserDTO)

      expect(result).toBeNull()
    })
    it("Deve retornar o usuário criado caso não exista um login igual cadastrado no banco", async () => {
      const sut = createSut()

      prismaMock.user.findUnique.mockResolvedValue(null)
      const mockBcrypt = jest.fn().mockReturnValue("")

      bcrypt.hash = mockBcrypt

      prismaMock.user.create.mockResolvedValue({} as User)

      const result = await sut.create({
        login: "anyLogin",
        password: "anyPassword",
        type: EUserType.M
      })

      expect(result).toHaveProperty("id", expect.any(String))
      expect(result).toHaveProperty("login", "anyLogin")
      expect(result).toHaveProperty("type", EUserType.M)
      expect(result).toHaveProperty("enable", true)
    })
  })
});
