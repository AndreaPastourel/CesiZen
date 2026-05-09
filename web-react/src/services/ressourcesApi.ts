import { Ressource } from "../types/ressources"
import { httpRequest } from "./httpClient"

type RessourcesResponse = {
    data : Ressource[],
    message : string |null,
}

export async function apiGetAllRessources() : Promise<RessourcesResponse> {
    const rep = await httpRequest<RessourcesResponse>({
        method:"GET",
        path:"/ressources",
    });

    return rep
}