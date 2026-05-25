import { httpRequest } from "@/services/httpClient";
import { User } from "@/types/users";


export type AuthResponse = {
 message?: string | null,
  data: {
    token: string,
    refresh_token?: string,
    user?: User,
};
}

export type RegisterResponse = {
  message: string,
  user: User,
};

type LoginPayload = {
  email: string;
  motDePasse: string;
};


type RefreshTokenResponse = {
  token: string;
  refresh_token?: string;
};

export async function apiLogin(payload: LoginPayload): Promise<AuthResponse> {
  return httpRequest<AuthResponse>({
    method: "POST",
    path: "/login_check",
    body: payload,
    skipAuthRefresh: true,
  });
}

export async function apiRefreshToken(
  refreshToken: string
): Promise<RefreshTokenResponse> {
  return httpRequest<RefreshTokenResponse>({
    method: "POST",
    path: "/token/refresh",
    body: {
      refresh_token: refreshToken,
    },
    skipAuthRefresh: true,
  });
}

export async function apiRegister(payload: {
  nom: string | null;
  prenom: string | null;
  pseudo: string;
  email: string;
  telephone: string | null;
  photo_profil: string | null;
  motDePasse: string;
}): Promise<RegisterResponse> {
  return httpRequest<RegisterResponse>({
    method: "POST",
    path: "/register",
    body: payload,
    skipAuthRefresh: true,
  });
}


