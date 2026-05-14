import { Categorie } from "../types/categories";
import { httpRequest } from "./httpClient";

type CategoriesResponse = {
  data: Categorie[];
  message: string | null;
};

export async function apiGetAllCategories(): Promise<CategoriesResponse> {
  return httpRequest<CategoriesResponse>({
    method: "GET",
    path: "/categories-ressources",
  });
}