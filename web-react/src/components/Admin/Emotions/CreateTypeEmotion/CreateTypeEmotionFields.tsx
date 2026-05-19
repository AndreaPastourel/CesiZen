import { Dispatch, SetStateAction } from "react";
import styles from "../module.createEmotion.module.css";

type Props={
    nom : string ,
    setNom :Dispatch<SetStateAction<string>>,
    description : string,
    setDescription : Dispatch<SetStateAction<string>>,
    couleur : string, 
    setCouleur : Dispatch<SetStateAction<string>>,

}


export default function CreateTypeEmotionFields({nom,setNom,description,setDescription,couleur,setCouleur}:Readonly<Props>){

    return(
        <>
        <div className={styles.formGroup}>
          <label htmlFor="nom">Nom</label>

          <input
            id="nom"
            type="text"
            value={nom}
            onChange={(event) => setNom(event.target.value)}
            placeholder="Ex : Joie"
            required
          />
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="description">Description</label>

          <textarea
            id="description"
            value={description}
            onChange={(event) => setDescription(event.target.value)}
            placeholder="Description du type d’émotion"
          />
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="couleur">Couleur</label>

          <div className={styles.colorRow}>
            <input
              id="couleur"
              type="color"
              value={couleur}
              onChange={(event) => setCouleur(event.target.value)}
            />

            <input
              type="text"
              value={couleur}
              onChange={(event) => setCouleur(event.target.value)}
              placeholder="#5D7052"
            />
          </div>
        </div>

        </>
    )
}