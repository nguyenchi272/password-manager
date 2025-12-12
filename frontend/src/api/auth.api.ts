import { client } from "./client";

export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  email: string;
  password: string;
}

export const AuthApi = {
  login: async (data: LoginRequest) => {
    return client.post("/auth/login", data);
  },

  register: async (data: RegisterRequest) => {
    return client.post("/auth/register", data);
  },
};
