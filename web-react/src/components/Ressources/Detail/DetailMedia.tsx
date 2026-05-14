import { API_BASE_URL } from "../../../config/api";
import { formatDuration, formatFileSize } from "../../../config/Format";
import { Ressource } from "../../../types/ressources";
import styles from "./module.ressourcesDetail.module.css";

type Props = {
  ressource: Ressource;
};

export default function DetailMedia({ ressource }: Readonly<Props>) {

  if (!ressource.chemin_media) return null;

  const backendBaseUrl = API_BASE_URL.replace(/\/api\/?$/, "").replace(/\/$/, "");

  // On construit l’URL complète du média.
  const mediaPath = ressource.chemin_media.startsWith("/")
    ? ressource.chemin_media
    : `/${ressource.chemin_media}`;
  const mediaUrl = ressource.chemin_media.startsWith("http")
    ? ressource.chemin_media
    : `${backendBaseUrl}${mediaPath}`;

  const fileName = ressource.nom_fichier ?? "Fichier associé";


  const isVideo = ressource.duree_seconde !== null;

  const isImage =
    !isVideo &&
    (ressource.largeur_px !== null || ressource.hauteur_px !== null);


  const isDocument = !isVideo && !isImage;
  const formattedDuration = formatDuration(ressource.duree_seconde);
  const formattedSize = formatFileSize(ressource.taille_fichier_ko);

  const imageAspectRatio =
    ressource.largeur_px && ressource.hauteur_px
      ? `${ressource.largeur_px} / ${ressource.hauteur_px}`
      : "auto";

  return (
    <section className={styles.mediaBox}>
      <div className={styles.mediaHeader}>
        <div>
          <p className={styles.mediaTitle}>Média associé</p>

          <p className={styles.fileName}>{fileName}</p>

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
        <div
          className={styles.imageWrapper}
          style={{ aspectRatio: imageAspectRatio }}
        >
          <img
            src={mediaUrl}
            alt={`Illustration de la ressource : ${ressource.titre}`}
            className={styles.mediaImage}
          />
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
  );
}