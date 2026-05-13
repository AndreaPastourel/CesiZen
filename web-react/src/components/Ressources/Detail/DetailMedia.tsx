
import { formatDuration, formatFileSize } from "../../../config/Format";
import { Ressource } from "../../../types/ressources";
import styles from "./module.ressourcesDetail.module.css";

type Props={
    ressource:Ressource
}

export default function DetailMedia({ressource}:Readonly<Props>){
    if (!ressource.chemin_media) return null ;

    const mediaUrl = ressource.chemin_media
    
    const isVideo = ressource.duree_seconde !== null
    const isImage = ressource.duree_seconde === null &&(ressource.largeur_px !== null || ressource.hauteur_px !== null);
    const isDocument = !isVideo && !isImage;

    const formattedDuration = formatDuration(ressource.duree_seconde);
    const formattedSize = formatFileSize(ressource.taille_fichier_ko);


    return (
     
            <section className={styles.mediaBox}>
      <div className={styles.mediaHeader}>
        <div>
          <p className={styles.mediaTitle}>Média associé</p>

          <p className={styles.fileName}>{ressource.nom_fichier}</p>

          {formattedSize && (
            <p className={styles.mediaInfo}>Taille : {formattedSize}</p>
          )}
        </div>

        <a
          href={mediaUrl}
          target="_blank"
          rel="noreferrer"
          className={styles.mediaLink}
        >
          Ouvrir le fichier
        </a>
      </div>

      {isImage && (
        <div className={styles.imageWrapper}>
          <img
            src={mediaUrl}
            alt={`Illustration de la ressource : ${ressource.titre}`}
            className={styles.mediaImage}
          />

          <p className={styles.mediaInfo}>
            Dimensions : {ressource.largeur_px ?? "?"} ×{" "}
            {ressource.hauteur_px ?? "?"} px
          </p>
        </div>
      )}

      {isVideo && (
        <div className={styles.videoWrapper}>
          <video className={styles.mediaVideo} controls>
            <source src={mediaUrl} />
            Votre navigateur ne peut pas lire cette vidéo.
          </video>

          {formattedDuration && (
            <p className={styles.mediaInfo}>Durée : {formattedDuration}</p>
          )}
        </div>
      )}

      {isDocument && (
        <div className={styles.documentBox}>
          <p className={styles.documentIcon}>DOC</p>

          <div>
            <p className={styles.documentTitle}>Document associé</p>

            <p className={styles.documentText}>
              Ce fichier peut être ouvert dans un nouvel onglet.
              {formattedSize && ` Taille du fichier : ${formattedSize}.`}
            </p>
          </div>
        </div>
      )}
    </section>
    )
}