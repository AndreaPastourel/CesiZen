import type { ChangeEvent, Dispatch, SetStateAction } from "react";
import styles from "../module.createEmotion.module.css";
import { TypeEmotion } from "../../../../types/typesEmotion";

type Props = {
  nom: string,
  setNom: Dispatch<SetStateAction<string>>,
  description: string;
  setDescription: Dispatch<SetStateAction<string>>,
  couleur: string,
  setCouleur: Dispatch<SetStateAction<string>>,
  typeEmotionId: string,
  setTypeEmotionId: Dispatch<SetStateAction<string>>,
  isLoading: boolean,
  typesEmotion: TypeEmotion[],
  intensiteMin: string,
  setIntensiteMin: Dispatch<SetStateAction<string>>,
  intensiteMax: string,
  setIntensiteMax: Dispatch<SetStateAction<string>>,
  handleIconeChange: (event: ChangeEvent<HTMLInputElement>) => void,
  iconeFile: File | null,
  iconeActuelle?: string | null,
};

export default function CreateEmotionFields({ nom, setNom,description,setDescription,couleur,setCouleur,typeEmotionId,setTypeEmotionId,
                                        isLoading,typesEmotion,intensiteMin,setIntensiteMin,intensiteMax,setIntensiteMax,handleIconeChange,
                                        iconeFile,iconeActuelle = null,}: Readonly<Props>) {
  return (
    <>
      <div className={styles.formGroup}>
        <label htmlFor="nom">Nom</label>

        <input
          id="nom"
          type="text"
          value={nom}
          onChange={(event) => setNom(event.target.value)}
          placeholder="Ex : Sérénité"
          required
          disabled={isLoading}
        />
      </div>

      <div className={styles.formGroup}>
        <label htmlFor="typeEmotion">Type d’émotion</label>

        <select
          id="typeEmotion"
          value={typeEmotionId}
          onChange={(event) => setTypeEmotionId(event.target.value)}
          disabled={isLoading}
          required
        >
          <option value="">
            {isLoading ? "Chargement..." : "Sélectionner un type"}
          </option>

          {typesEmotion.map((typeEmotion) => (
            <option key={typeEmotion.id} value={String(typeEmotion.id)}>
              {typeEmotion.nom}
            </option>
          ))}
        </select>
      </div>

      <div className={styles.formGridTwo}>
        <div className={styles.formGroup}>
          <label htmlFor="intensiteMin">Intensité min</label>

          <input
            id="intensiteMin"
            type="number"
            min="1"
            max="10"
            value={intensiteMin}
            onChange={(event) => setIntensiteMin(event.target.value)}
            required
            disabled={isLoading}
          />
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="intensiteMax">Intensité max</label>

          <input
            id="intensiteMax"
            type="number"
            min="1"
            max="10"
            value={intensiteMax}
            onChange={(event) => setIntensiteMax(event.target.value)}
            required
            disabled={isLoading}
          />
        </div>
      </div>

      <div className={styles.formGroup}>
        <label htmlFor="description">Description</label>

        <textarea
          id="description"
          value={description}
          onChange={(event) => setDescription(event.target.value)}
          placeholder="Description de l’émotion"
          disabled={isLoading}
        />
      </div>

      <div className={styles.formGroup}>
        <label htmlFor="icone">Icône</label>

        <input
          id="icone"
          type="file"
          accept="image/*"
          onChange={handleIconeChange}
          disabled={isLoading}
        />

        {iconeFile && (
          <p className={styles.fileInfo}>
            Nouveau fichier sélectionné : {iconeFile.name}
          </p>
        )}

        {!iconeFile && iconeActuelle && (
          <p className={styles.fileInfo}>
            Icône actuelle : {iconeActuelle}
          </p>
        )}
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
  );
}