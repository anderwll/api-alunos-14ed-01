import { v4 as createUuid } from "uuid";

class User {
  private _enable: boolean;
  private _id: string;

  constructor(private _login: string, private _password: string) {
    this._enable = true;
    this._id = createUuid();
  }

  public getId() {
    return this._id;
  }

  public getLogin() {
    return this._login;
  }

  public getEnable() {
    return this._enable;
  }

  public toJson() {
    return {
      id: this._id,
      login: this._login,
      enable: this._enable,
    };
  }

  public toSave() {
    return {
      id: this._id,
      login: this._login,
      password: this._password,
      enable: this._enable,
    };
  }
}

export default User;
