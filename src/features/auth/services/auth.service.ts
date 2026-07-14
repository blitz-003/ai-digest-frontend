import api from "@/lib/axios";
import { API } from "@/constants/api";
import type {
  AuthResponse,
  RegisterRequest,
  User,
} from "../types/auth";

import { LoginSchema } from "../validation/login.schema";
import { LoginResponse } from "../types/auth";

export const login = async (
  data: LoginSchema
): Promise<LoginResponse> => {
  const response = await api.post("/auth/login", data);
  return response.data;
};

export const register = async (
  data: RegisterRequest
): Promise<AuthResponse> => {
  const response = await api.post(API.AUTH.REGISTER, data);
  return response.data;
};

export const getCurrentUser = async (): Promise<User> => {
  const response = await api.get(API.AUTH.ME);
  return response.data;
};