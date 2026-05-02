import { User } from "../types/users";
import { httpRequest } from "./httpClient";

type LoginPayload = {
  email: string,
  password: string,
};

type AuthResponse = {
  message?: string,
  data?: {
    token?: string,
    user?: unknown,
  },
};


export type RegisterPayload = {
  email: string,
  motDePasse: string,
  nom?: string | null,
  prenom?: string | null,
  pseudo: string ,
  telephone?: string | null,
  photo_profil?: string |null,
};


type RegisterResponse = {
  message: string,
  user?: unknown,
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
  payload: RegisterPayload
): Promise<RegisterResponse> {
  return httpRequest<RegisterResponse>({
    method: "POST",
    path: "/register",
    body: payload,
  });
}