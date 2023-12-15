import { compare } from "bcrypt";

class AuthService {
  /**
   * Metodo responsavel por comparar a senha conforme o hash da app.
   *
   * @remarks
   * Sempre deve ser passado a senha e o hash
   *
   * @param password - Senha
   * @param hash - Hash gerado
   * @returns Retorna um valor booleano
   *
   */
  public async comparePassword(password: string, hash: string) {
    return await compare(password, hash);
  }
}

export default new AuthService();
