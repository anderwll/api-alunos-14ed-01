import { v4 as createUuid } from "uuid";
import { EUserType } from "../enums";

class User {
  private _enable: boolean;
  private _id: string;

  constructor(
    private _login: string,
    private _password: string,
    private _type: EUserType
  ) {
    this._enable = true;
    this._id = createUuid(); // v4
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

  public getType() {
    return this._type;
  }

  public toJson() {
    return {
      id: this._id,
      login: this._login,
      enable: this._enable,
      type: this._type,
    };
  }

  public toSave() {
    return {
      id: this._id,
      login: this._login,
      password: this._password,
      enable: this._enable,
      type: this._type,
    };
  }
}

export default User;
