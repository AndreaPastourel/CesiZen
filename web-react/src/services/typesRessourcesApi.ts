
import { TypeResources } from "../types/types";
import { httpRequest } from "./httpClient";

type TypesResponse = {
  data: TypeResources[];
  message: string | null;
};

export async function apiGetAllTypes(): Promise<TypesResponse> {
  return httpRequest<TypesResponse>({
    method: "GET",
    path: "/types-ressources",
  });
}