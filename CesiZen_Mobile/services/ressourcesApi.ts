
import { Ressource } from "@/types/ressources";
import { httpRequest } from "./httpClient";

type RessourcesResponse = {
    data : Ressource[],
    message : string |null,
}
type RessourceDetailResponse={
    data:Ressource,
    message : string |null,
}

export async function apiGetAllRessources(): Promise<RessourcesResponse> {
  return httpRequest<RessourcesResponse>({
    method: "GET",
    path: "/ressources",
    skipAuthRefresh: true,
  });
}

export async function apiGetRessourceById(id:number) : Promise<RessourceDetailResponse>{
    
    const res = await httpRequest<RessourceDetailResponse>({
        method:"GET",
        path:`/ressource/id/${id}` ,
        skipAuthRefresh: true,
    });

    return res
}