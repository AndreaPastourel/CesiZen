import { User } from "../../../types/users";
import { Message } from "../../../types/message";
import { ComponentProps, FormEvent, useState } from "react";
import { apiUpdateProfile } from "../../../services/profilApi";
import ProfilFormHeader from "./ProfilInfoFormHeader";
import styles from "../module.Profil.module.css";
import ProfilMessage from "../ProfilMessage";
import ProfilFormFields from "./ProfilInfoFormFields";
import ProfilFormAction from "./ProfilInfoFormAction";

type Props = {
  user: User;
  onProfileUpdated: (user: User) => void;
};




export default function ProfileInfoForm({
  user,
  onProfileUpdated,
}: Readonly<Props>) {
 
  const [nom, setNom] = useState<string>(user.nom ?? "");
  const [prenom, setPrenom] = useState<string>(user.prenom ?? "");
  const [pseudo, setPseudo] = useState<string>(user.pseudo);
  const [email, setEmail] = useState<string>(user.email);
  const [telephone, setTelephone] = useState<string>(user.telephone ?? "");

  const [photoProfil, setPhotoProfil] = useState<string>( user.photo_profil ?? "" );
  const [photoFile, setPhotoFile] = useState<File | null>(null);
  const [photoPreview, setPhotoPreview] = useState<string>(user.photo_profil ?? "");

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [message, setMessage] = useState<Message>(null);


  const handleSubmit: ComponentProps<"form">["onSubmit"] = async (event) => {

    event.preventDefault();


    setMessage(null);

    const cleanPseudo = pseudo.trim();
    const cleanEmail = email.trim();


    if (!cleanPseudo || !cleanEmail) {
      setMessage({
        type: "error",
        text: "Le pseudo et l’email sont obligatoires.",
      });

      return;
    }

    try {
   
      setIsLoading(true);

      const response = await apiUpdateProfile({
        nom: nom.trim() || null,
        prenom: prenom.trim() || null,
        pseudo: cleanPseudo,
        email: cleanEmail,
        telephone: telephone.trim() || null,
        photo_profil: photoProfil.trim() || null,
      });

      
      onProfileUpdated(response.data);

      setMessage({
        type: "success",
        text: response.message || "Profil mis à jour avec succès.",
      });
    } catch (error) {
     
      const errorMessage =
        error instanceof Error
          ? error.message
          : "Impossible de mettre à jour le profil.";

      
      setMessage({
        type: "error",
        text: errorMessage,
      });
    } finally {
      
      setIsLoading(false);
    }
  }


  function handlePhotoChange(event: React.ChangeEvent<HTMLInputElement>){
    const selectedFile = event.target.files?.[0];
    if(!selectedFile){
      return;
    }

    if(!selectedFile.type.startsWith("image/")){
      setMessage({
        type:"error",
        text:"Le fichier sélectionné doit être une image."
      })
      return;
    }

    setPhotoFile(selectedFile);

    const previewUrl= URL.createObjectURL(selectedFile);
    setPhotoPreview(previewUrl);
    setPhotoProfil(selectedFile.name);
  }


  // On affiche le formulaire.
  return (
    <form className={styles.card} onSubmit={handleSubmit}>
        <ProfilFormHeader/>

      <ProfilMessage 
      message={message}
      />

      <ProfilFormFields 
      prenom={prenom}
      nom={nom}
      pseudo= {pseudo}
      email={email}
      telephone={telephone}
      photo_profil={photoProfil}
      
      setPrenom={setPrenom}
      setNom={setNom}
      setPseudo={setPseudo}
      setEmail={setEmail}
      setTelephone={setTelephone}
      setPhotoProfil={setPhotoProfil}

      photoPreview={photoPreview}
      handlePhotoChange={handlePhotoChange}
      photoFile={photoFile}
      />

     <ProfilFormAction
     isLoading={isLoading}
     />
    </form>
  );
}