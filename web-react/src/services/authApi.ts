import { User } from "../types/users";
import { httpRequest } from "./httpClient";

type LoginPayload = {
  email: string,
  password: string,
};

type AuthResponse = {
  message?: string,
  data?: {
    token?: string,
    user?: User,
  },
};


export type RegisterPayload = {
  email: string,
  motDePasse: string,
  nom?: string | null,
  prenom?: string | null,
  pseudo: string ,
  telephone?: string | null,
  photo_profil?: string | null,
};


type RegisterResponse = {
  message: string,
  user?: User,
};




type LogoutResponse = {
  message: string;
};

export async function apiLogin({
  email,
  password,
}: LoginPayload): Promise<AuthResponse> {
  return httpRequest<AuthResponse>({
    method: "POST",
    path: "/login_check",
    body: {
      email: email,
      motDePasse: password,
    },
  });
}

export async function apiRegister(
  payload: RegisterPayload
): Promise<RegisterResponse> {
  return httpRequest<RegisterResponse>({
    method: "POST",
    path: "/register",
    body: payload,
  });
}


export async function apiLogOut():Promise<LogoutResponse>{
  return httpRequest<LogoutResponse>({
      method: "POST",
      path: "/logout",
  })

}



async function checkAdminAccess() {
  try {
    const response = await apiGetProfile();

    const connectedUser = response.data;

    console.log("Utilisateur connecté :", connectedUser);
    console.log("Rôle utilisateur :", connectedUser.role);

    const isAdmin =
      connectedUser.role?.code === "ROLE_ADMIN" ||
      connectedUser.role?.code === "ROLE_SUPER_ADMIN";

    console.log("Est admin ?", isAdmin);

    if (!isAdmin) {
      setRedirectTo("/ressources");
      return;
    }

    setUser(connectedUser);
  } catch (error) {
    console.log("Erreur vérification admin :", error);
    setRedirectTo("/login");
  } finally {
    setIsLoading(false);
  }
}