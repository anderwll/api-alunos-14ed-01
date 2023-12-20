import { EUserType } from "../../src/enums";
import User from "../../src/models/user.model";
import { prismaMock } from "../config/prisma.mock";

describe("User Model", () => {
  // Sistema em teste
  const createSut = () => {
    return new User("any_login", "any_password", EUserType.T);
  };

  // test ou it
  it("Deve retornar o id do usuário instanciado", () => {
    const sut = createSut();

    const result = sut.getId();

    expect(result).toBeDefined();
    expect(result).toStrictEqual(expect.any(String));
  });

  test("Deve retornar o login do usuário instanciado", () => {
    const sut = createSut();

    const result = sut.getLogin();

    expect(result).toBeDefined();
    expect(result).toBe("any_login");
  });

  test("Deve retornar o type do usuário instanciado", () => {
    const sut = createSut();

    const result = sut.getType();

    expect(result).toBeDefined();
    expect(result).toBe(EUserType.T);
  });

  test("Deve retornar todas as informações do usuário menos a senha", () => {
    const sut = createSut();

    const result = sut.toJson();

    expect(result).toBeDefined();
    expect(result).toHaveProperty("id", expect.any(String));
    expect(result).toHaveProperty("login", "any_login");
    expect(result).toHaveProperty("enable", true);
    expect(result).toHaveProperty("type", EUserType.T);
  });

  test("Deve retornar todas as informações do usuário inclusive a senha", () => {
    const sut = createSut();

    const result = sut.toSave();

    expect(result).toBeDefined();
    expect(result).toStrictEqual({
      id: sut.getId(),
      login: "any_login",
      password: "any_password",
      enable: true,
      type: EUserType.T,
    });
  });
});
