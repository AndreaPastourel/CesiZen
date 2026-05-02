import { API_BASE_URL } from "../config/api";

type HttpMethod = "GET" | "POST" | "PUT" | "PATCH" | "DELETE";

type RequestOptions = {
  method?: HttpMethod;
  path: string;
  body?: unknown;
};

export async function httpRequest<T>({
  method = "GET",
  path,
  body,
}: RequestOptions): Promise<T> {
  const headers: HeadersInit = {
    "Content-Type": "application/json",
    Accept: "application/json",
  };

  const res = await fetch(`${API_BASE_URL}${path}`, {
    method,
    headers,
    credentials: "include",
    body: body ? JSON.stringify(body) : undefined,
  });

  const text = await res.text();

  const data = text ? JSON.parse(text) : null;

  if (!res.ok) {
    const msg =
      data?.message ||
      data?.error ||
      `Erreur API (${res.status})`;

    throw new Error(msg);
  }

  return data as T;
}