import { API_BASE_URL } from "../config/api";

type HttpMethod = "GET" | "POST" | "PUT" | "PATCH" | "DELETE";
type ResponseType = "json" | "blob";

type RequestOptions = {
  method?: HttpMethod;
  path: string;
  body?: unknown;
  responseType?: ResponseType;
};

type ApiError = {
  message?: string;
  error?: string;
  detail?: string;
};

export async function httpRequest<T>({
  method = "GET",
  path,
  body,
  responseType = "json",
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

  const response = await fetch(`${API_BASE_URL}${path}`, {
    method,
    headers,
    credentials: "include",
    body: requestBody,
  });

  if (!response.ok) {
    const text = await response.text();
    let errorData: ApiError | null = null;

    if (text) {
      try {
        errorData = JSON.parse(text) as ApiError;
      } catch {
        errorData = { message: text };
      }
    }

    const message =
      errorData?.message ||
      errorData?.error ||
      errorData?.detail ||
      `Erreur API (${response.status})`;

    throw new Error(message);
  }


  if (responseType === "blob") {
    return (await response.blob()) as T;
  }

  const text = await response.text();
  return (text ? JSON.parse(text) : null) as T;
}