import { EUserType } from "../enums";

export interface CreateUserDTO {
  login: string;
  password: string;
  type: EUserType;
}
