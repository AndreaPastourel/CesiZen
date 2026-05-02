import { Role } from "./roles";

export type User= {
  id: number,
  nom: string|null,
  prenom: string|null,
  pseudo: string,
  email: string,
  telephone: string | null,
  photo_profil: string | null,
  est_actif : boolean,
  role: Role,

  motDePasse? : string, 
  plainPassword? :string,
}