import { useState } from "react";

import { apiExportPersonalData } from "../../services/profilApi";
import styles from "./module.Profil.module.css";

export default function ProfilDataExport() {
  const [isExporting, setIsExporting] = useState(false);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  async function handleExport() {
    setIsExporting(true);
    setSuccessMessage(null);
    setErrorMessage(null);

    try {
      const exportFile = await apiExportPersonalData();

    //   adresse temporaire pour stocker le blob dans le navigateur
      const downloadUrl = URL.createObjectURL(exportFile);
      const downloadLink = document.createElement("a");

      downloadLink.href = downloadUrl;
      downloadLink.download =
        `cesizen-donnees-personnelles-${new Date()
          .toISOString()
          .slice(0, 10)}.json`;

      document.body.appendChild(downloadLink);
      downloadLink.click();
      downloadLink.remove();

      
      window.setTimeout(() => {
        URL.revokeObjectURL(downloadUrl);
      }, 0);

      setSuccessMessage("Tes données personnelles ont bien été téléchargées.");
    } catch (error) {
      setErrorMessage(
        error instanceof Error
          ? error.message
          : "Le téléchargement de tes données a échoué."
      );
    } finally {
      setIsExporting(false);
    }
  }

  return (
    <section className={`${styles.card} ${styles.dataCard}`}>
      <div className={styles.dataCardContent}>
        <p className={styles.dataEyebrow}>MES DONNÉES</p>

        <h2>Exporter mes données personnelles</h2>

        <p>
          Télécharge une copie de ton profil et de ton journal émotionnel
          dans un fichier JSON.
        </p>
      </div>

      <div className={styles.dataCardAction}>
        <button
          type="button"
          className={styles.primaryButton}
          onClick={handleExport}
          disabled={isExporting}
          aria-busy={isExporting}
        >
          {isExporting
            ? "Préparation de l’export…"
            : "Télécharger mes données"}
        </button>

        {successMessage && (
          <output className={styles.dataSuccessMessage}>
            {successMessage}
          </output>
        )}

        {errorMessage && (
          <p className={styles.dataErrorMessage} role="alert">
            {errorMessage}
          </p>
        )}
      </div>
    </section>
  );
}