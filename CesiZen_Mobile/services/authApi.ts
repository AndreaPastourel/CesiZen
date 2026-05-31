import { API_BASE_URL } from "@/config/api";
import { httpRequest } from "@/services/httpClient";
import { User } from "@/types/users";

export type AuthResponse = {
  message?: string | null;
  data: {
    token: string;
    refresh_token?: string;
    user?: User;
  };
};

export type RegisterPayload = {
  nom: string | null;
  prenom: string | null;
  pseudo: string;
  email: string;
  telephone: string | null;
  photo_profil: string | null;
  motDePasse: string;
};

export type RegisterResponse = {
  message: string;
  user: User;
};

type LoginPayload = {
  email: string;
  motDePasse: string;
};

type RefreshTokenResponse = {
  token: string;
  refresh_token?: string;
};

function isLocalImageUri(uri: string | null) {
  if (!uri) {
    return false;
  }

  return uri.startsWith("file://") || uri.startsWith("content://");
}

function createImageFileFromUri(uri: string) {
  const fileName = uri.split("/").pop() || "photo-profil.jpg";

  const extension = fileName.split(".").pop()?.toLowerCase();

  const mimeType =
    extension === "png"
      ? "image/png"
      : extension === "webp"
        ? "image/webp"
        : "image/jpeg";

  return {
    uri,
    name: fileName,
    type: mimeType,
  } as any;
}

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

export async function apiRegister(
  payload: RegisterPayload
): Promise<RegisterResponse> {
  const formData = new FormData();

  formData.append("nom", payload.nom ?? "");
  formData.append("prenom", payload.prenom ?? "");
  formData.append("pseudo", payload.pseudo);
  formData.append("email", payload.email);
  formData.append("telephone", payload.telephone ?? "");
  formData.append("motDePasse", payload.motDePasse);

  if (isLocalImageUri(payload.photo_profil)) {
    formData.append(
      "photo_profil",
      createImageFileFromUri(payload.photo_profil as string)
    );
  }

  const response = await fetch(`${API_BASE_URL}/register`, {
    method: "POST",
    headers: {
      Accept: "application/json",
    },
    body: formData,
  });

  const text = await response.text();

  let data: any = null;

  try {
    data = text ? JSON.parse(text) : null;
  } catch {
    throw new Error("Réponse API invalide.");
  }

  if (!response.ok) {
    throw new Error(data?.message || "Impossible de créer le compte.");
  }

  return data as RegisterResponse;
}