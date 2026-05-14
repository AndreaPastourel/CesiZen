import { User } from "@/types/users";
import { httpRequest } from "./httpClient";

type UpdateProfilePayload = {
  nom: string | null;
  prenom: string | null;
  pseudo: string;
  email: string;
  telephone: string | null;
  photo_profil: string | null;
};

type UpdateProfileResponse = {
  message?: string;
  data: User;
};




export async function apiUpdateUser(
  id: number,
  payload: UpdateProfilePayload
): Promise<UpdateProfileResponse> {
 
  return httpRequest<UpdateProfileResponse>({
   method:"PATCH",
        path:"/me",
        body:payload,
  });
}