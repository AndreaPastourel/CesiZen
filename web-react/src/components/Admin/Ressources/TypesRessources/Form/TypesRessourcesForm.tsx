import { useEffect, useState } from "react";
import type { ComponentProps } from "react";

import styles from "./module.typeRessourcesForm.module.css"
import { Message } from "../../../../../types/message";
import { apiCreateTypeRessource, apiGetTypeRessourceById, apiUpdateTypeRessource } from "../../../../../services/typesRessourcesApi";
import TypesRessourcesFormHeader from "./TypesRessourcesFormHeader";
import TypesRessourcesFormMessage from "./TypesRessourcesFormMessage";
import TypesRessourcesFormLoading from "./TypesRessourcesFormLoading";
import TypesRessourcesFormFields from "./TypesRessourcesFormFields";
import TypesRessourcesFormAction from "./TypesRessourcesFormAction";

type Props = {
  typeRessourceId?: number | null
};

export default function TypeRessourceForm({ typeRessourceId = null,}: Readonly<Props>) {
 
    const isEditMode = typeRessourceId !== null;
 
  const [code, setCode] = useState<string>("");
  const [libelle, setLibelle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [couleur, setCouleur] = useState<string>("#5D7052");
  const [message, setMessage] = useState<Message>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);


  useEffect(() => {
    if (isEditMode) {
      loadTypeRessource();
    }
  }, [typeRessourceId]);

  async function loadTypeRessource() {
    if (!typeRessourceId) {
      return;
    }

    setIsLoading(true);
    setMessage(null);

    try {
      const response = await apiGetTypeRessourceById(typeRessourceId);

      const typeRessource = response.data;

      setCode(typeRessource.code ?? "");
      setLibelle(typeRessource.libelle ?? "");
      setDescription(typeRessource.description ?? "");
      setCouleur(typeRessource.couleur ?? "#5D7052");
    } catch (error) {
      const errorMessage =
        error instanceof Error
          ? error.message
          : "Impossible de récupérer le type de ressource.";

      setMessage({
        type: "error",
        text: errorMessage,
      });
    } finally {
      setIsLoading(false);
    }
  }

  function resetForm() {
    setCode("");
    setLibelle("");
    setDescription("");
    setCouleur("#5D7052");
  }


  const handleSubmit: ComponentProps<"form">["onSubmit"] = async (event) => {
    event.preventDefault();

    setMessage(null);

    const cleanCode = code.trim();
    const cleanLibelle = libelle.trim();
    const cleanDescription = description.trim();
    const cleanCouleur = couleur.trim();

    if (!cleanCode) {
      setMessage({
        type: "error",
        text: "Le code du type de ressource est obligatoire.",
      });

      return;
    }

    const payload = {
      code: cleanCode,
      libelle: cleanLibelle || null,
      description: cleanDescription || null,
      couleur: cleanCouleur || null,
    };

    try {
      setIsLoading(true);

      const response =
        isEditMode && typeRessourceId
          ? await apiUpdateTypeRessource(typeRessourceId, payload)
          : await apiCreateTypeRessource(payload);

      setMessage({
        type: "success",
        text:
          response.message ||
          (isEditMode
            ? "Type de ressource modifié avec succès."
            : "Type de ressource créé avec succès."),
      });

      if (!isEditMode) {
        resetForm();
      }
    } catch (error) {
      const defaultErrorMessage = isEditMode
        ? "Impossible de modifier le type de ressource."
        : "Impossible de créer le type de ressource.";

      const errorMessage =
        error instanceof Error
          ? error.message
          : defaultErrorMessage;

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
  
  <TypesRessourcesFormHeader
  isEditMode= {isEditMode} />

      <form className={styles.card} onSubmit={handleSubmit}>
        
            <TypesRessourcesFormMessage
            message={message}
            />

        <TypesRessourcesFormLoading
        isEditMode={isEditMode}
        isLoading={isLoading}
        />

       <TypesRessourcesFormFields
       isLoading={isLoading}
       code={code}
       setCode={setCode}
       libelle={libelle}
       setLibelle={setLibelle}
       couleur={couleur}
       setCouleur={setCouleur}
       description={description}
       setDescription={setDescription}

       />

      <TypesRessourcesFormAction
      isEditMode={isEditMode}
      isLoading={isLoading}
      />
      </form>
    </main>
  );
}