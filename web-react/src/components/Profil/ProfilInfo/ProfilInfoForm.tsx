import { ComponentProps, useEffect, useState } from "react";

import { User } from "../../../types/users";
import { Message } from "../../../types/message";

import { apiUpdateProfile } from "../../../services/profilApi";
import { buildPhotoUrl } from "../../../config/Format";

import ProfilFormHeader from "./ProfilInfoFormHeader";
import ProfilMessage from "../ProfilMessage";
import ProfilFormFields from "./ProfilInfoFormFields";
import ProfilFormAction from "./ProfilInfoFormAction";

import styles from "../module.Profil.module.css";

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

  const [photoProfil, setPhotoProfil] = useState<string>(
    user.photo_profil ?? ""
  );

  const [photoFile, setPhotoFile] = useState<File | null>(null);

  const [photoPreview, setPhotoPreview] = useState<string>(
    buildPhotoUrl(user.photo_profil)
  );

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [message, setMessage] = useState<Message>(null);

  useEffect(() => {
    setNom(user.nom ?? "");
    setPrenom(user.prenom ?? "");
    setPseudo(user.pseudo);
    setEmail(user.email);
    setTelephone(user.telephone ?? "");
    setPhotoProfil(user.photo_profil ?? "");
    setPhotoPreview(buildPhotoUrl(user.photo_profil));
    setPhotoFile(null);
  }, [user]);

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

    const formData = new FormData();

    formData.append("nom", nom.trim());
    formData.append("prenom", prenom.trim());
    formData.append("pseudo", cleanPseudo);
    formData.append("email", cleanEmail);
    formData.append("telephone", telephone.trim());

    if (photoProfil) {
      formData.append("photo_profil_actuelle", photoProfil);
    }

    if (photoFile) {
      formData.append("photo_profil", photoFile);
    }

    try {
      setIsLoading(true);

      const response = await apiUpdateProfile(formData);

      onProfileUpdated(response.data);

      setPhotoProfil(response.data.photo_profil ?? "");
      setPhotoPreview(buildPhotoUrl(response.data.photo_profil));
      setPhotoFile(null);

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
  };

  function handlePhotoChange(event: React.ChangeEvent<HTMLInputElement>) {
    const selectedFile = event.target.files?.[0];

    if (!selectedFile) {
      return;
    }

    if (!selectedFile.type.startsWith("image/")) {
      setMessage({
        type: "error",
        text: "Le fichier sélectionné doit être une image.",
      });

      return;
    }

    setPhotoFile(selectedFile);

    const previewUrl = URL.createObjectURL(selectedFile);

    setPhotoPreview(previewUrl);
  }

  return (
    <form className={styles.card} onSubmit={handleSubmit}>
      <ProfilFormHeader />

      <ProfilMessage message={message} />

      <ProfilFormFields
        prenom={prenom}
        nom={nom}
        pseudo={pseudo}
        email={email}
        telephone={telephone}
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

      <ProfilFormAction isLoading={isLoading} />
    </form>
  );
}