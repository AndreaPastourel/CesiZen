import { useState } from "react";
import type { ComponentProps } from "react";

import styles from "../module.createEmotion.module.css";
import { Message } from '../../../../types/message';
import CreateTypeEmotionHeader from "./CreateTypeEmotionHeader";
import CreateTypeEmotionMessage from "./CreateTypeEmotionMessage";
import CreateTypeEmotionAction from "./CreateTypeEmotionAction";
import { apiCreateTypeEmotion } from "../../../../services/emotionApi";
import CreateTypeEmotionFields from './CreateTypeEmotionFields';


export default function CreateTypeEmotionForm() {


  const [nom, setNom] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [couleur, setCouleur] = useState<string>("#5D7052");
  const [message, setMessage] = useState<Message>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

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

      const response = await apiCreateTypeEmotion({
        nom: cleanNom,
        description: cleanDescription || null,
        couleur: cleanCouleur || null,
      });

      setMessage({
        type: "success",
        text: response.message || "Type d’émotion créé avec succès.",
      });

      setNom("");
      setDescription("");
      setCouleur("#5D7052");
    } catch (error) {
      const errorMessage =
        error instanceof Error
          ? error.message
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
      <CreateTypeEmotionHeader/>

      <form className={styles.card} onSubmit={handleSubmit}>
      
      <CreateTypeEmotionMessage
      message={message}/>

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
        />
      </form>
    </main>
  );
}