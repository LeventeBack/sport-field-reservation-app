import { User, Token } from "./auth";

export type MessageResponse = {
  message: string;
};

export type DataResponse<T> = {
  data: T;
};

export type TokenResponse = {
  token: Token;
};

export type UserResponse = {
  user: User;
};
