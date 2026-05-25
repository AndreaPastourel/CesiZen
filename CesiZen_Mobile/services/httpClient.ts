import { API_BASE_URL } from "@/config/api";
import { router } from "expo-router";
import {
  getAccessToken,
  getRefreshToken,
  saveAccessToken,
  saveRefreshToken,
  clearAuthTokens,
} from "./authStorage";
import { removeCurrentUser } from "./userStorage";

type HttpMethod = "GET" | "POST" | "PATCH" | "PUT" | "DELETE";

type HttpRequestOptions = {
  method: HttpMethod;
  path: string;
  body?: unknown;
  skipAuthRefresh?: boolean;
};

async function refreshAccessToken() {
  const refreshToken = await getRefreshToken();

  if (!refreshToken) {
    return null;
  }

  const response = await fetch(`${API_BASE_URL}/token/refresh`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      refresh_token: refreshToken,
    }),
  });

  const text = await response.text();

  let data: any = null;

  try {
    data = text ? JSON.parse(text) : null;
  } catch {
    return null;
  }

  if (!response.ok || !data?.token) {
    return null;
  }

  await saveAccessToken(data.token);

  if (data.refresh_token) {
    await saveRefreshToken(data.refresh_token);
  }

  return data.token as string;
}

async function logoutAfterExpiredSession() {
  await clearAuthTokens();
  await removeCurrentUser();

  router.replace("/login");
}

export async function httpRequest<T>({
  method,
  path,
  body,
  skipAuthRefresh = false,
}: HttpRequestOptions): Promise<T> {
  const token = await getAccessToken();

  async function sendRequest(accessToken: string | null) {
    return fetch(`${API_BASE_URL}${path}`, {
      method,
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        ...(accessToken ? { Authorization: `Bearer ${accessToken}` } : {}),
      },
      body: body ? JSON.stringify(body) : undefined,
    });
  }

  let response = await sendRequest(token);

  if (response.status === 401 && !skipAuthRefresh) {
    const newToken = await refreshAccessToken();

    if (newToken) {
      response = await sendRequest(newToken);
    } else {
      await logoutAfterExpiredSession();

      throw new Error("Votre session a expiré. Veuillez vous reconnecter.");
    }
  }

  const text = await response.text();

  let data: any = null;

  try {
    data = text ? JSON.parse(text) : null;
  } catch {
    throw new Error("Réponse API invalide.");
  }

  if (!response.ok) {
    throw new Error(data?.message || "Une erreur est survenue.");
  }

  return data as T;
}