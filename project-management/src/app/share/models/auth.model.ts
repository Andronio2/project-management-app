export interface IUser {
  id: string;
  name: string;
  login: string;
}

export interface ISigninUserDto {
  login: string;
  example: string;
  password: string;
}

export interface ICreateUserDto {
  name: string;
  login: string;
  password: string;
}

export interface IUpdateUserDto {
  id: string;
  name: string;
  password: string;
}

export interface IToken {
  token: string;
}
