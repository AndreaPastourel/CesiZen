import { useEffect, useState } from "react";
import type { ComponentProps } from "react";

import styles from "../module.createEmotion.module.css";

import { Message } from "../../../../types/message";

import CreateTypeEmotionHeader from "./CreateTypeEmotionHeader";
import CreateTypeEmotionMessage from "./CreateTypeEmotionMessage";
import CreateTypeEmotionAction from "./CreateTypeEmotionAction";
import CreateTypeEmotionFields from "./CreateTypeEmotionFields";

import {
  apiCreateTypeEmotion,
  apiGetTypeEmotionById,
  apiUpdateTypeEmotion,
} from "../../../../services/emotionApi";

type Props = {
  typeEmotionId?: number | null;
};

export default function CreateTypeEmotionForm({
  typeEmotionId = null,
}: Readonly<Props>) {
  const isEditMode = typeEmotionId !== null;

  const [nom, setNom] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [couleur, setCouleur] = useState<string>("#5D7052");

  const [message, setMessage] = useState<Message>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
  if (!isEditMode || !typeEmotionId) {
    return;
  }

  const currentTypeEmotionId = typeEmotionId;

  async function loadTypeEmotion() {
    setIsLoading(true);
    setMessage(null);

    try {
      const response = await apiGetTypeEmotionById(currentTypeEmotionId);
      const typeEmotion = response.data;

      setNom(typeEmotion.nom);
      setDescription(typeEmotion.description ?? "");
      setCouleur(typeEmotion.couleur ?? "#5D7052");
    } catch (error) {
      const errorMessage =
        error instanceof Error
          ? error.message
          : "Impossible de récupérer le type d’émotion.";

      setMessage({
        type: "error",
        text: errorMessage,
      });
    } finally {
      setIsLoading(false);
    }
  }

  loadTypeEmotion();
}, [isEditMode, typeEmotionId]);

  function resetForm() {
    setNom("");
    setDescription("");
    setCouleur("#5D7052");
  }

  const handleSubmit: ComponentProps<"form">["onSubmit"] = async (event) => {
    event.preventDefault();

    setMessage(null);

    const cleanNom = nom.trim();
    const cleanDescription = description.trim();
    const cleanCouleur = couleur.trim();

    if (!cleanNom) {
      setMessage({
        type: "error",
        text: "Le nom du type d’émotion est obligatoire.",
      });

      return;
    }

    try {
      setIsLoading(true);

      const payload = {
        nom: cleanNom,
        description: cleanDescription || null,
        couleur: cleanCouleur || null,
      };

      const response =
        isEditMode && typeEmotionId
          ? await apiUpdateTypeEmotion(typeEmotionId, payload)
          : await apiCreateTypeEmotion(payload);

      setMessage({
        type: "success",
        text:
          response.message ||
          (isEditMode
            ? "Type d’émotion modifié avec succès."
            : "Type d’émotion créé avec succès."),
      });

      if (!isEditMode) {
        resetForm();
      }
    } catch (error) {
      const errorMessage =
        error instanceof Error
          ? error.message
          : isEditMode
            ? "Impossible de modifier le type d’émotion."
            : "Impossible de créer le type d’émotion.";

      setMessage({
        type: "error",
        text: errorMessage,
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className={styles.formPage}>
      <CreateTypeEmotionHeader isEditMode={isEditMode} />

      <form className={styles.card} onSubmit={handleSubmit}>
        <CreateTypeEmotionMessage message={message} />

        {isLoading && (
          <p className={styles.loadingMessage}>
            Chargement du type d’émotion...
          </p>
        )}

        <CreateTypeEmotionFields
          nom={nom}
          setNom={setNom}
          description={description}
          setDescription={setDescription}
          couleur={couleur}
          setCouleur={setCouleur}
        />

        <CreateTypeEmotionAction
          isLoading={isLoading}
          isEditMode={isEditMode}
        />
      </form>
    </main>
  );
}