import { LoginData, RegisterData } from "../types/auth";
import apiClient from "./api-client";
import {
  MessageResponse,
  TokenResponse,
  UserResponse,
} from "../types/responses";

const login = async (data: LoginData): Promise<TokenResponse> => {
  const response = await apiClient.post("/auth/login", data);
  return response.data;
};

const register = async (data: RegisterData): Promise<MessageResponse> => {
  const response = await apiClient.post("/auth/register", data);
  return response.data;
};

const validate = async (): Promise<UserResponse> => {
  const response = await apiClient.get("/auth/validate");
  return response.data;
};

export default { login, validate, register };
