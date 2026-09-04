import { User } from "../types/users";
import { httpRequest } from "./httpClient";

type ProfileResponse = {
    data: User,
    message :string |null,
}


export type UpdateProfilePayload =  {
    nom :string |null, 
    prenom : string |null, 
    email : string, 
    pseudo :string, 
    telephone : string |null, 
    photo_profil : string |null, 
}


export type UpdateProfilResponse = {
    message: string;
    data : User,
}

export type ChangePasswordPayload = {
    ancien_motDePasse : string, 
    nouveau_motDePasse : string,
}


export type ChangePasswordResonse = {
    message : string,
}



export async function apiGetProfile():Promise<ProfileResponse> {
    
    return httpRequest<ProfileResponse>({
        method : "GET",
        path : "/me",
    })  
}



export async function apiUpdateProfile(formData: FormData): Promise<ProfileResponse> {
  return httpRequest<ProfileResponse>({
    method: "POST",
    path: "/me/update",
    body: formData,
  });
}


export async function apiChangePassword(payload : ChangePasswordPayload) : Promise<ChangePasswordResonse>{

    return httpRequest<ChangePasswordResonse> ({
        method:"PATCH",
        path:"/me/password",
        body:payload,
    })   
}

export async function apiExportPersonalData(): Promise<Blob> {
  return httpRequest<Blob>({
    method: "GET",
    path: "/me/export",
    responseType: "blob",
  });
}


export type DeleteAccountPayload = {
  motDePasse: string;
};

export type DeleteAccountResponse = {
  message: string;
  data: null;
};


export async function apiDeleteAccount(
  payload: DeleteAccountPayload
): Promise<DeleteAccountResponse> {
  return httpRequest<DeleteAccountResponse>({
    method: "DELETE",
    path: "/me",
    body: payload,
  });
}