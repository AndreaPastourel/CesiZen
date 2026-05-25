import { Dispatch, SetStateAction } from "react";
import styles from "./module.typeRessourcesForm.module.css"

type Props = {
    isLoading: boolean,
    code : string, 
    setCode : Dispatch<SetStateAction<string>>,
    libelle: string, 
    setLibelle : Dispatch<SetStateAction<string>>,
    description : string, 
    setDescription : Dispatch<SetStateAction<string>>,
    couleur : string, 
    setCouleur : Dispatch<SetStateAction<string>>,

}


export default function TypesRessourcesFormFields({isLoading,code,setCode,libelle,setLibelle,description,setDescription,
                                                    couleur,setCouleur,}:Readonly<Props>){

    return(
        <>
         <div className={styles.formGroup}>
          <label htmlFor="code">Code</label>

          <input
            id="code"
            type="text"
            value={code}
            onChange={(event) => setCode(event.target.value)}
            placeholder="Ex : ARTICLE"
            disabled={isLoading}
            required
          />
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="libelle">Libellé</label>

          <input
            id="libelle"
            type="text"
            value={libelle}
            onChange={(event) => setLibelle(event.target.value)}
            placeholder="Ex : Article"
            disabled={isLoading}
          />
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="description">Description</label>

          <textarea
            id="description"
            value={description}
            onChange={(event) => setDescription(event.target.value)}
            placeholder="Description du type de ressource"
            disabled={isLoading}
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
              disabled={isLoading}
            />

            <input
              type="text"
              value={couleur}
              onChange={(event) => setCouleur(event.target.value)}
              placeholder="#5D7052"
              disabled={isLoading}
            />
          </div>
        </div>
        </>
    )
}