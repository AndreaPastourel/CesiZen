import { API_BASE_URL } from "../config/api";


export async function httpRequest({
  method = "GET",
  path,
  body,
}) {
  const headers = {
    "Content-Type": "application/json",
    Accept: "application/json",
  };

  // On envoie la requête
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


  return data;
}