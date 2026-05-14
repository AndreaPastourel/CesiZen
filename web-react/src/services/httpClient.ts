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
    Accept: "application/json, application/ld+json",
  };

  const isFormData = body instanceof FormData;

  if (body && !isFormData) {
    headers["Content-Type"] = "application/json";
  }

  let requestBody: BodyInit | undefined;

  if (body !== undefined && body !== null) {
    requestBody = isFormData ? body : JSON.stringify(body);
  }

  const res = await fetch(`${API_BASE_URL}${path}`, {
    method,
    headers,
    credentials: "include",
    body: requestBody,
  });

  const text = await res.text();

  const data = text ? JSON.parse(text) : null;

  if (!res.ok) {
    const msg =
      data?.message ||
      data?.error ||
      data?.detail ||
      `Erreur API (${res.status})`;

    throw new Error(msg);
  }

  return data as T;
}