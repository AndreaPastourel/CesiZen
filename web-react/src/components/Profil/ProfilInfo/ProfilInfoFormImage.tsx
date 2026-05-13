
import styles from "../module.Profil.module.css";
import type React from "react";


type Props = {
  photoPreview: string | null;
  prenom: string;
  pseudo: string;
  handlePhotoChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  photoFile: File | null;
};

export default function ProfilInfoFormImage({photoPreview,prenom,pseudo,handlePhotoChange,photoFile}:Props){

    return(

<div className={styles.photoSection}>
  <div className={styles.photoPreviewBox}>
    {photoPreview ? (
      <img
        src={photoPreview}
        alt="Aperçu de la photo de profil"
        className={styles.photoPreview}
      />
    ) : (
      <div className={styles.photoPlaceholder}>
        {prenom?.charAt(0) || pseudo?.charAt(0) || "?"}
      </div>
    )}
  </div>

  <div className={styles.photoActions}>
    <label className={styles.photoLabel} htmlFor="photoProfil">
      Photo de profil
    </label>

    <p className={styles.photoHelp}>
      Choisissez une image depuis votre ordinateur.
    </p>

    <input
      id="photoProfil"
      type="file"
      accept="image/*"
      onChange={handlePhotoChange}
      className={styles.fileInput}
    />

    {photoFile && (
      <p className={styles.selectedFile}>
        Image sélectionnée : {photoFile.name}
      </p>
    )}
  </div>
</div>
    )
}

