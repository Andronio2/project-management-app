export interface IUser {
  id: string;
  name: string;
  login: string;
}

export interface ISigninUserDto {
  login: string;
  password: string;
}

export interface ICreateUserDto {
  name: string;
  login: string;
  password: string;
}

export interface IToken {
  token: string;
}

export interface IJWTDecode {
  userId: string;
  login: string;
  iat: number;
}
