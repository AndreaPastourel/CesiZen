import { Ressource } from "../types/ressources";
import { httpRequest } from "./httpClient";

type RessourcesResponse = {
  data: Ressource[];
  message: string | null;
};

type RessourceResponse = {
  data: Ressource;
  message: string | null;
};

export async function apiGetAllRessources(): Promise<RessourcesResponse> {
  const rep = await httpRequest<RessourcesResponse>({
    method: "GET",
    path: "/ressources",
  });

  return rep;
}

export async function apiGetRessourceBySlug(
  slug: string
): Promise<RessourceResponse> {
  const rep = await httpRequest<RessourceResponse>({
    method: "GET",
    path: `/ressource/${slug}`,
  });

  return rep;
}

export async function apiCreateRessource(
  formData: FormData
): Promise<RessourceResponse> {
  const rep = await httpRequest<RessourceResponse>({
    method: "POST",
    path: "/ressource",
    body: formData,
  });

  return rep;
}