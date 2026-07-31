import api from "@/lib/axios";
import { API } from "@/constants/api";

import type {
  User,
  LoginResponse,
  RegisterResponse,
} from "../types/auth";

import { LoginSchema } from "../validation/login.schema";
import { RegisterSchema } from "../validation/register.schema";

export const login = async (
  data: LoginSchema
): Promise<LoginResponse> => {
  const response = await api.post(
    API.AUTH.LOGIN,
    data
  );

  return response.data;
};

export const register = async (
  data: RegisterSchema
): Promise<RegisterResponse> => {
  const response = await api.post(
    API.AUTH.REGISTER,
    data
  );

  return response.data;
};
export const getCurrentUser = async (): Promise<User> => {
  const response = await api.get(
    API.AUTH.ME
  );

  return response.data;
};

export const logout = async () => {
  const response = await api.post(
    API.AUTH.LOGOUT
  );

  return response.data;
};