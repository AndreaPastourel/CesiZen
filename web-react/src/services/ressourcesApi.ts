import { Ressource } from "../types/ressources"
import { httpRequest } from "./httpClient"

type RessourcesResponse = {
    data : Ressource[],
    message : string |null,
}
type RessourceDetailResponse={
    data:Ressource,
    message : string |null,
}

export async function apiGetAllRessources() : Promise<RessourcesResponse> {
    const res = await httpRequest<RessourcesResponse>({
        method:"GET",
        path:"/ressources",
    });

    return res
}


export async function apiGetRessourceBySlug(slug:string) : Promise<RessourceDetailResponse>{
    
    const res = await httpRequest<RessourceDetailResponse>({
        method:"GET",
        path:`/ressource/${slug}` ,
    });

    return res
}