import { User } from "../types/users";
import { httpRequest } from "./httpClient";

type LoginPayload = {
  email: string;
  password: string;
};

type AuthResponse = {
  message?: string;
  data?: {
    token?: string;
    user?: unknown;
  };
};

type RegisterResponse = {
  message: string;
  user?: unknown;
};

export async function apiLogin({
  email,
  password,
}: LoginPayload): Promise<AuthResponse> {
  return httpRequest<AuthResponse>({
    method: "POST",
    path: "/login_check",
    body: {
      email: email,
      motDePasse: password,
    },
  });
}

export async function apiRegister(
  payload: Partial<User>
): Promise<RegisterResponse> {
  return httpRequest<RegisterResponse>({
    method: "POST",
    path: "/register",
    body: payload,
  });
}