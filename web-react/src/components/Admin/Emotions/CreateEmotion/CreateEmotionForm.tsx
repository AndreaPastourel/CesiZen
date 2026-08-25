import { useEffect, useState } from "react";
import type { ChangeEvent, ComponentProps } from "react";

import styles from "../module.createEmotion.module.css";

import { Message } from "../../../../types/message";
import { TypeEmotion } from "../../../../types/typesEmotion";

import CreateEmotionHeader from "./CreateEmotionHeader";
import CreateEmotionMessage from "./CreateEmotionMessage";
import CreateEmotionFields from "./CreateEmotionFields";
import CreateEmotionAction from "./CreateEmotionAction";

import {
  apiCreateEmotion,
  apiGetAllTypesEmotion,
  apiGetEmotionById,
  apiUpdateEmotion,
} from "../../../../services/emotionApi";

type Props = {
  id_type?: number | null;
  emotionId?: number | null;
};

export default function CreateEmotionForm({
  id_type = null,
  emotionId = null,
}: Readonly<Props>) {
  const isEditMode = emotionId !== null;

  const [typesEmotion, setTypesEmotion] = useState<TypeEmotion[]>([]);
  const [nom, setNom] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [couleur, setCouleur] = useState<string>("#5D7052");

  const [typeEmotionId, setTypeEmotionId] = useState<string>(
    id_type !== null ? String(id_type) : ""
  );

  const [intensiteMin, setIntensiteMin] = useState<string>("1");
  const [intensiteMax, setIntensiteMax] = useState<string>("10");

  const [iconeFile, setIconeFile] = useState<File | null>(null);
  const [iconeActuelle, setIconeActuelle] = useState<string | null>(null);

  const [message, setMessage] = useState<Message>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    async function loadInitialData() {
      setIsLoading(true);
      setMessage(null);

      try {
        const typesResponse = await apiGetAllTypesEmotion();
        setTypesEmotion(typesResponse.data);

        if (isEditMode && emotionId) {
          const emotionResponse = await apiGetEmotionById(emotionId);
          const emotion = emotionResponse.data;

          setNom(emotion.nom);
          setDescription(emotion.description ?? "");
          setCouleur(emotion.couleur ?? "#5D7052");
          setTypeEmotionId(String(emotion.type_emotion?.id ?? ""));
          setIntensiteMin(String(emotion.intensite_min));
          setIntensiteMax(String(emotion.intensite_max));
          setIconeActuelle(emotion.icone ?? null);
          setIconeFile(null);
        }
      } catch (error) {
        const errorMessage =
          error instanceof Error
            ? error.message
            : "Impossible de récupérer les données.";

        setMessage({
          type: "error",
          text: errorMessage,
        });
      } finally {
        setIsLoading(false);
      }
    }

    loadInitialData();
  }, [isEditMode, emotionId]);

  function handleIconeChange(event: ChangeEvent<HTMLInputElement>) {
    const selectedFile = event.target.files?.[0];

    if (!selectedFile) {
      setIconeFile(null);
      return;
    }

    setIconeFile(selectedFile);
  }

  function validateIntensity(min: number, max: number) {
    if (min < 1 || min > 10 || max < 1 || max > 10) {
      return "Les intensités doivent être comprises entre 1 et 10.";
    }

    if (min > max) {
      return "L’intensité minimale ne peut pas être supérieure à l’intensité maximale.";
    }

    return null;
  }

  function resetForm() {
    setNom("");
    setDescription("");
    setCouleur("#5D7052");
    setTypeEmotionId(id_type !== null ? String(id_type) : "");
    setIntensiteMin("1");
    setIntensiteMax("10");
    setIconeFile(null);
    setIconeActuelle(null);
  }

  const handleSubmit: ComponentProps<"form">["onSubmit"] = async (event) => {
    event.preventDefault();

    setMessage(null);

    const cleanNom = nom.trim();
    const cleanDescription = description.trim();
    const cleanCouleur = couleur.trim();

    const cleanTypeId = Number(typeEmotionId);
    const cleanMin = Number(intensiteMin);
    const cleanMax = Number(intensiteMax);

    if (!cleanNom) {
      setMessage({
        type: "error",
        text: "Le nom de l’émotion est obligatoire.",
      });

      return;
    }

    if (!cleanTypeId) {
      setMessage({
        type: "error",
        text: "Le type d’émotion est obligatoire.",
      });

      return;
    }

    const intensityError = validateIntensity(cleanMin, cleanMax);

    if (intensityError) {
      setMessage({
        type: "error",
        text: intensityError,
      });

      return;
    }

    const formData = new FormData();

    formData.append("nom", cleanNom);
    formData.append("description", cleanDescription);
    formData.append("couleur", cleanCouleur);
    formData.append("type_emotion_id", String(cleanTypeId));
    formData.append("intensite_min", String(cleanMin));
    formData.append("intensite_max", String(cleanMax));

    if (iconeFile) {
      formData.append("icone", iconeFile);
    }

    try {
      setIsLoading(true);

      const response =
        isEditMode && emotionId
          ? await apiUpdateEmotion(emotionId, formData)
          : await apiCreateEmotion(formData);

      setMessage({
        type: "success",
        text:
          response.message ||
          (isEditMode
            ? "Émotion modifiée avec succès."
            : "Émotion créée avec succès."),
      });

      if (!isEditMode) {
        resetForm();
      }
    } catch (error) {
      const errorMessage =
        error instanceof Error
          ? error.message
          : isEditMode
            ? "Impossible de modifier l’émotion."
            : "Impossible de créer l’émotion.";

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
      <CreateEmotionHeader isEditMode={isEditMode} />

      <form className={styles.card} onSubmit={handleSubmit}>
        <CreateEmotionMessage message={message} />

        {isLoading && (
          <p className={styles.loadingMessage}>
            Chargement des informations...
          </p>
        )}

        <CreateEmotionFields
          nom={nom}
          setNom={setNom}
          description={description}
          setDescription={setDescription}
          couleur={couleur}
          setCouleur={setCouleur}
          typeEmotionId={typeEmotionId}
          setTypeEmotionId={setTypeEmotionId}
          typesEmotion={typesEmotion}
          intensiteMin={intensiteMin}
          setIntensiteMin={setIntensiteMin}
          intensiteMax={intensiteMax}
          setIntensiteMax={setIntensiteMax}
          handleIconeChange={handleIconeChange}
          iconeFile={iconeFile}
          iconeActuelle={iconeActuelle}
          isLoading={isLoading}
        />

        <CreateEmotionAction
          isLoading={isLoading}
          isEditMode={isEditMode}
        />
      </form>
    </main>
  );
}