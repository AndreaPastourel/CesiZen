
import { TypeResources } from "../types/types";
import { httpRequest } from "./httpClient";

type TypesResponse = {
  data: TypeResources[],
  message: string | null,
};

type TypeResponse = {
  data: TypeResources,
  message: string | null,
};

export type TypeRessourcePayload = {
  code: string,
  libelle: string | null,
  description: string | null,
  couleur: string | null,
};

export async function apiGetAllTypes(): Promise<TypesResponse> {
  return httpRequest<TypesResponse>({
    method: "GET",
    path: "/types-ressources",
  });
}



export async function apiGetTypeRessourceById(
  id: number
): Promise<TypeResponse> {
  const response = await httpRequest<TypeResponse>({
    method: "GET",
    path: `/types-ressources/${id}`,
  });

  return response;
}


export async function apiCreateTypeRessource(
  payload: TypeRessourcePayload
): Promise<TypeResponse> {
  return httpRequest<TypeResponse>({
    method: "POST",
    path: "/types-ressources",
    body: payload,
  });
}

export async function apiUpdateTypeRessource(
  id: number,
  payload: TypeRessourcePayload
): Promise<TypeResponse> {
  return httpRequest<TypeResponse>({
    method: "PATCH",
    path: `/types-ressources/${id}`,
    body: payload,
  });
}