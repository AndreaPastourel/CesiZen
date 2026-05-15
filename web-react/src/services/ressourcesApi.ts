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


export async function apiUpdateRessourceActive(
  id: number,
  estActif: boolean
): Promise<RessourceResponse> {
  return httpRequest<RessourceResponse>({
    method: "PATCH",
    path: `/ressource/${id}/active`,
    body: {
      est_actif: estActif,
    },
  });
}



export async function apiUpdateRessource(
  id: number,
  formData: FormData
): Promise<RessourceResponse> {
  const response = await httpRequest<RessourceResponse>({
    method: "POST",
    path: `/ressource/${id}`,
    body: formData,
  });

  return response;
}



export async function apiGetRessourceById(
  id: number
): Promise<RessourceResponse> {
  const response = await httpRequest<RessourceResponse>({
    method: "GET",
    path: `/ressource/id/${id}`,
  });

  return response;
}