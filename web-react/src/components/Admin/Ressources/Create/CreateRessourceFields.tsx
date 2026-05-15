import type { ChangeEvent, Dispatch, SetStateAction } from "react";

import styles from "./module.ressourceCreate.module.css";
import { Categorie } from "../../../../types/categories";
import { TypeResources } from "../../../../types/types";

type Props = {
  titre: string;
  handleTitreChange: (value: string) => void;

  slug: string;
  setSlug: Dispatch<SetStateAction<string>>;

  resume: string;
  setResume: Dispatch<SetStateAction<string>>;

  contenuTexte: string;
  setContenuTexte: Dispatch<SetStateAction<string>>;

  categorieId: string;
  setCategorieId: Dispatch<SetStateAction<string>>;
  categories?: Categorie[];

  typeId: string;
  setTypeId: Dispatch<SetStateAction<string>>;
  types?: TypeResources[];

  estActif: boolean;
  handleActiveChange: (value: boolean) => void;

  datePublication: string;

  handleFileChange: (event: ChangeEvent<HTMLInputElement>) => void;
  fichier: File | null;

  largeurPx: string;
  setLargeurPx: Dispatch<SetStateAction<string>>;

  hauteurPx: string;
  setHauteurPx: Dispatch<SetStateAction<string>>;

  dureeSeconde: string;
  setDureeSeconde: Dispatch<SetStateAction<string>>;

  isLoading: boolean;
};

export default function CreateRessourceFields({
  titre,
  handleTitreChange,
  slug,
  setSlug,
  resume,
  setResume,
  contenuTexte,
  setContenuTexte,
  categorieId,
  setCategorieId,
  isLoading,
  categories = [],
  typeId,
  setTypeId,
  types = [],
  estActif,
  handleActiveChange,
  datePublication,
  handleFileChange,
  fichier,
  largeurPx,
  setLargeurPx,
  hauteurPx,
  setHauteurPx,
  dureeSeconde,
  setDureeSeconde,
}: Readonly<Props>) {
  return (
    <div className={styles.formGrid}>
      <div className={`${styles.formGroup} ${styles.fullWidth}`}>
        <label htmlFor="titre">Titre</label>

        <input
          id="titre"
          type="text"
          value={titre}
          onChange={(event) => handleTitreChange(event.target.value)}
          placeholder="Ex : Méditation guidée"
          required
        />
      </div>

      <div className={`${styles.formGroup} ${styles.fullWidth}`}>
        <label htmlFor="slug">Slug</label>

        <input
          id="slug"
          type="text"
          value={slug}
          onChange={(event) => setSlug(event.target.value)}
          placeholder="meditation-guidee"
          required
        />
      </div>

      <div className={`${styles.formGroup} ${styles.fullWidth}`}>
        <label htmlFor="resume">Résumé</label>

        <textarea
          id="resume"
          value={resume}
          onChange={(event) => setResume(event.target.value)}
          placeholder="Résumé court de la ressource"
          required
        />
      </div>

      <div className={`${styles.formGroup} ${styles.fullWidth}`}>
        <label htmlFor="contenuTexte">Contenu texte</label>

        <textarea
          id="contenuTexte"
          value={contenuTexte}
          onChange={(event) => setContenuTexte(event.target.value)}
          placeholder="Contenu détaillé de la ressource"
        />
      </div>

      <div className={styles.formGroup}>
        <label htmlFor="categorieId">Catégorie</label>

        <select
          id="categorieId"
          value={categorieId}
          onChange={(event) => setCategorieId(event.target.value)}
          required
          disabled={isLoading}
        >
          <option value="">
            {isLoading
              ? "Chargement des catégories..."
              : "Sélectionner une catégorie"}
          </option>

          {categories.map((categorie) => (
            <option key={categorie.id} value={String(categorie.id)}>
              {categorie.nom}
            </option>
          ))}
        </select>
      </div>

      <div className={styles.formGroup}>
        <label htmlFor="typeId">Type</label>

        <select
          id="typeId"
          value={typeId}
          onChange={(event) => setTypeId(event.target.value)}
          required
          disabled={isLoading}
        >
          <option value="">
            {isLoading ? "Chargement des types..." : "Sélectionner un type"}
          </option>

          {types.map((type) => (
            <option key={type.id} value={String(type.id)}>
              {type.libelle ?? type.code}
            </option>
          ))}
        </select>
      </div>

      <div className={styles.checkboxGroup}>
        <input
          id="estActif"
          type="checkbox"
          checked={estActif}
          onChange={(event) => handleActiveChange(event.target.checked)}
        />

        <label htmlFor="estActif">Ressource active</label>
      </div>

      {estActif && (
        <div className={styles.formGroup}>
          <label htmlFor="datePublication">Date de publication</label>

          <input
            id="datePublication"
            type="datetime-local"
            value={datePublication}
            readOnly
          />
        </div>
      )}

      <div className={styles.formGroup}>
        <label htmlFor="fichier">Fichier</label>

        <input id="fichier" type="file" onChange={handleFileChange} />

        {fichier && (
          <p className={styles.fileInfo}>
            {fichier.name} — {Math.ceil(fichier.size / 1024)} Ko
          </p>
        )}
      </div>

      <div className={styles.formGroup}>
        <label htmlFor="largeurPx">Largeur image en px</label>

        <input
          id="largeurPx"
          type="number"
          value={largeurPx}
          onChange={(event) => setLargeurPx(event.target.value)}
          placeholder="Ex : 1200"
        />
      </div>

      <div className={styles.formGroup}>
        <label htmlFor="hauteurPx">Hauteur image en px</label>

        <input
          id="hauteurPx"
          type="number"
          value={hauteurPx}
          onChange={(event) => setHauteurPx(event.target.value)}
          placeholder="Ex : 800"
        />
      </div>

      <div className={styles.formGroup}>
        <label htmlFor="dureeSeconde">Durée vidéo en secondes</label>

        <input
          id="dureeSeconde"
          type="number"
          value={dureeSeconde}
          onChange={(event) => setDureeSeconde(event.target.value)}
          placeholder="Ex : 180"
        />
      </div>
    </div>
  );
}