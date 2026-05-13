import { ComponentProps, useState } from "react";
import { Message } from "../../../types/message";
import { apiChangePassword } from "../../../services/profilApi";
import styles from "../module.Profil.module.css";
import ProfilPasswordFormHeader from "./ProfilPasswordFormHeader";
import ProfilMessage from "../ProfilMessage";
import ProfilPasswordFormFiled from "./ProfilPasswordFormFields";
import ProfilPasswordFormAction from "./ProfilPasswordFormAction";



export default function ProfilPasswordForm() {

  const [ancienMotDePasse, setAncienMotDePasse] = useState<string>("");
  const [nouveauMotDePasse, setNouveauMotDePasse] = useState<string>("");
  const [confirmation, setConfirmation] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [message, setMessage] = useState<Message>(null);


  const handleSubmit: ComponentProps<"form">["onSubmit"] = async (event) => {
  

    event.preventDefault();
    setMessage(null);

    const cleanOldPassword = ancienMotDePasse.trim();
    const cleanNewPassword = nouveauMotDePasse.trim();
    const cleanConfirmation = confirmation.trim();

  
    if (!cleanOldPassword || !cleanNewPassword || !cleanConfirmation) {
    
      setMessage({
        type: "error",
        text: "Tous les champs du mot de passe sont obligatoires.",
      });

      return;
    }


    if (cleanNewPassword.length < 6) {
     
      setMessage({
        type: "error",
        text: "Le nouveau mot de passe doit contenir au moins 8 caractères.",
      });

      return;
    }


    if (cleanNewPassword !== cleanConfirmation) {
    
      setMessage({
        type: "error",
        text: "Les nouveaux mots de passe ne correspondent pas.",
      });

      return;
    }

    try {
      setIsLoading(true);

      // On appelle l’API.
      const response = await apiChangePassword({
        ancien_motDePasse: cleanOldPassword,
        nouveau_motDePasse: cleanNewPassword,
      });

      setMessage({
        type: "success",
        text: response.message || "Mot de passe modifié avec succès.",
      });

   
      setAncienMotDePasse("");
      setNouveauMotDePasse("");
      setConfirmation("");
    } catch (error) {
    
      const errorMessage =
        error instanceof Error
          ? error.message
          : "Impossible de modifier le mot de passe.";

   
      setMessage({
        type: "error",
        text: errorMessage,
      });
    } finally {
    
      setIsLoading(false);
    }
  }

  // On affiche le formulaire.
  return (
    <form className={styles.card} onSubmit={handleSubmit}>
      <ProfilPasswordFormHeader/>

      <ProfilMessage
      message={message}/>

      <ProfilPasswordFormFiled
      ancienMotDePasse= {ancienMotDePasse}
      nouveauMotDePasse={nouveauMotDePasse}
      confirmation={confirmation}

      setAncienMotDePasse={setAncienMotDePasse}
      setNouveauMotDePasse={setNouveauMotDePasse}
      setConfirmation={setConfirmation}
      />

      <ProfilPasswordFormAction
      isLoading={isLoading}
      />
     
    </form>
  );
}