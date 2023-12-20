import { EUserType } from "@prisma/client";
import UserService from "../../src/services/user.service";
import { prismaMock } from "../config/prisma.mock";
import { v4 as createUuid } from "uuid";

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
});
