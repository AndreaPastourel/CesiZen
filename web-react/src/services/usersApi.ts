import { User } from "../types/users";
import { httpRequest } from "./httpClient";

type UsersResponse = {
  data: User[],
  message: string | null,
};

type UserResponse = {
  data: User,
  message: string | null,
};


export async function apiGetAdminUsers(): Promise<UsersResponse> {
  return httpRequest<UsersResponse>({
    method: "GET",
    path: "/utilisateurs",
  });
}


export async function apiUpdateUserActive(id: number,estActif: boolean): Promise<UserResponse> {
  return httpRequest<UserResponse>({
    method: "PATCH",
    path: `/utilisateur/${id}/active`,
    body: {
      est_actif: estActif,
    },
  });
}

export async function apiUpdateUserRole(id: number,roleCode: "ROLE_USER" | "ROLE_ADMIN"): Promise<UserResponse> {
  return httpRequest<UserResponse>({
    method: "PATCH",
    path: `/utilisateur/${id}/role`,
    body: {
      role: roleCode,
    },
  });
}