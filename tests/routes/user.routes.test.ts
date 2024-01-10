import request from "supertest";
import repository from "../../src/database/prisma.databe";
import { createServer } from "../../src/express.server";
import jwtService from "../../src/services/jwt.service";

const makeToken = () => {
  const payload = {
    id: "any_id",
    enable: true,
    login: "any_login",
    type: "any_type",
  };

  const token = jwtService.createToken(payload);
  return token;
};

describe("User Routes", () => {
  const server = createServer();

  // antes de cada it ou test
  beforeEach(async () => {
    await repository.user.deleteMany();
    await repository.assessment.deleteMany();

    console.log("🔥 EXECUTOU O DELETE DOS DADOS NO BD 🔥");
  });

  // depois de todos os it ou test
  afterAll(async () => {
    await repository.user.deleteMany();
    await repository.assessment.deleteMany();
  });

  describe("List All - GET", () => {
    it("Deve retornar não autorizado quando não for infomado token.", async () => {
      const response = await request(server).get("/users");

      expect(response.status).toBe(401);
      expect(response.body).toHaveProperty("success", false);
      expect(response.body).toHaveProperty(
        "message",
        "Verifique login ou senha"
      );
    });

    it("Deve retornar não autorizado quando for infomado um token inválido.", async () => {
      const response = await request(server)
        .get("/users")
        .set("Authorization", "any_token"); // HEADERS

      expect(response.status).toBe(401);
      expect(response.body).toHaveProperty("success", false);
      expect(response.body).toHaveProperty(
        "message",
        "Verifique login ou senha"
      );
    });

    it("Deve retornar uma lista vazia quando não houver usuários cadastrados no banco.", async () => {
      const token = makeToken();

      const response = await request(server)
        .get("/users")
        .set("Authorization", `Bearer ${token}`);

      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty("success", true);
      expect(response.body).toHaveProperty("message", "Listagem de usuários");
      expect(response.body).toHaveProperty("data", []);
      expect(response.body.data).toHaveLength(0);
    });

    it("Deve retornar uma lista contendo um usuário quando houver cadastrado no banco.", async () => {
      const token = makeToken();

      // CRIANDO O CENÁRIO NECESSÁRIO PARA O TESTE
      await repository.user.create({
        data: { login: "any_login", password: "any_password" },
      });

      const response = await request(server)
        .get("/users")
        .set("Authorization", `Bearer ${token}`); // CHAMA O LIST

      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty("success", true);
      expect(response.body).toHaveProperty("message", "Listagem de usuários");
      expect(response.body).toHaveProperty("data"); // [{id:....}]
      expect(response.body.data).toHaveLength(1);
    });
  });

  describe("Create - POST", () => {});
});

// QUANDO MOCKAR - TESTES UNITARIOS (SERVICE, MODEL)
// QUANDO NÃO MOCKAR - TESTE INTEGRAÇÃO - (CONTROLLER, ROUTES)
