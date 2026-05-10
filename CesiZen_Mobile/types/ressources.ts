import { Categorie } from "./categories"
import { Type } from "./types"
import { User } from "./users"

export type Ressource= {

    id: number,
    titre: string, 
    slug : string,
    resume : string, 
    contenu_texte: string |null, 
    chemin_media : string |null,
    nom_fichier : string |null,
    taille_fichier_ko : number |null,
    duree_seconde : number |null,
    largeur_px:number|null,
    hauteur_px : number |null,
    est_actif : boolean,
    date_publication : string |null,
    created_at : string |null,
    updated_at : string |null,

    auteur: User,
    categorie : Categorie,
    type : Type,



}