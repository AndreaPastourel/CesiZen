import { useEffect, useState } from "react";
import type { ChangeEvent, ComponentProps } from "react";

import styles from "./module.ressourceCreate.module.css";

import CreateRessourceHeader from "./CreateRessourceHeader";
import CreateRessourceMessage from "./CreateRessourceMessage";
import CreateRessourceLoading from "./CreateRessourceLoading";
import CreateRessourceFields from "./CreateRessourceFields";
import CreateRessourceAction from "./CreateRessourceAction";

import { Categorie } from "../../../../types/categories";
import { TypeResources } from "../../../../types/types";
import { Message } from "../../../../types/message";

import { apiGetAllCategories } from "../../../../services/categoriesApi";
import { apiGetAllTypes } from "../../../../services/typesRessourcesApi";

import {
  apiCreateRessource,
  apiGetRessourceById,
  apiUpdateRessource,
} from "../../../../services/ressourcesApi";
import { formatDate } from "../../../../config/Format";

type Props = {
  ressourceId?: number;
};

export default function CreateRessourceForm({ ressourceId }: Readonly<Props>) {
  const isEditMode = ressourceId !== undefined;

  const [titre, setTitre] = useState<string>("");
  const [slug, setSlug] = useState<string>("");
  const [resume, setResume] = useState<string>("");
  const [contenuTexte, setContenuTexte] = useState<string>("");

  const [categorieId, setCategorieId] = useState<string>("");
  const [typeId, setTypeId] = useState<string>("");

  const [categories, setCategories] = useState<Categorie[]>([]);
  const [types, setTypes] = useState<TypeResources[]>([]);

  const [estActif, setEstActif] = useState<boolean>(false);
  const [datePublication, setDatePublication] = useState<string>("");

  const [largeurPx, setLargeurPx] = useState<string>("");
  const [hauteurPx, setHauteurPx] = useState<string>("");
  const [dureeSeconde, setDureeSeconde] = useState<string>("");

  const [fichier, setFichier] = useState<File | null>(null);

  const [isLoadingOptions, setIsLoadingOptions] = useState<boolean>(false);
  const [isLoadingRessource, setIsLoadingRessource] = useState<boolean>(false);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const [message, setMessage] = useState<Message>(null);

  const isLoading = isLoadingOptions || isLoadingRessource || isSubmitting;

  useEffect(() => {
    loadInitialData();
  }, [ressourceId]);

  async function loadInitialData() {
    await loadOptions();

    if (isEditMode) {
      await loadRessource();
    }
  }

  async function loadOptions() {
    setIsLoadingOptions(true);
    setMessage(null);

    try {
      const [categoriesResponse, typesResponse] = await Promise.all([
        apiGetAllCategories(),
        apiGetAllTypes(),
      ]);

      setCategories(categoriesResponse.data ?? []);
      setTypes(typesResponse.data ?? []);
    } catch (error) {
      const errorMessage =
        error instanceof Error
          ? error.message
          : "Impossible de récupérer les catégories et les types.";

      setMessage({
        type: "error",
        text: errorMessage,
      });
    } finally {
      setIsLoadingOptions(false);
    }
  }

  async function loadRessource() {
    if (!ressourceId) {
      return;
    }

    setIsLoadingRessource(true);
    setMessage(null);

    try {
      const response = await apiGetRessourceById(ressourceId);

      const ressource = response.data;

      setTitre(ressource.titre);
      setSlug(ressource.slug);
      setResume(ressource.resume);
      setContenuTexte(ressource.contenu_texte ?? "");

      setCategorieId(String(ressource.categorie?.id ?? ""));
      setTypeId(String(ressource.type?.id ?? ""));

      setEstActif(ressource.est_actif);
      setDatePublication(formatDate(ressource.date_publication));

      setLargeurPx(ressource.largeur_px?.toString() ?? "");
      setHauteurPx(ressource.hauteur_px?.toString() ?? "");
      setDureeSeconde(ressource.duree_seconde?.toString() ?? "");

      setFichier(null);
    } catch (error) {
      const errorMessage =
        error instanceof Error
          ? error.message
          : "Impossible de récupérer la ressource à modifier.";

      setMessage({
        type: "error",
        text: errorMessage,
      });
    } finally {
      setIsLoadingRessource(false);
    }
  }

  function generateSlug(value: string) {
    return value
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "");
  }

  function getCurrentDateTimeLocal() {
    const now = new Date();

    const localDate = new Date(now.getTime() - now.getTimezoneOffset() * 60000);

    return localDate.toISOString().slice(0, 16);
  }


  function handleTitreChange(value: string) {
    setTitre(value);

    if (!isEditMode) {
      setSlug(generateSlug(value));
    }
  }

  function handleActiveChange(value: boolean) {
    setEstActif(value);

    if (value) {
      setDatePublication(getCurrentDateTimeLocal());
    } else {
      setDatePublication("");
    }
  }

  function handleFileChange(event: ChangeEvent<HTMLInputElement>) {
    const selectedFile = event.target.files?.[0];

    if (!selectedFile) {
      setFichier(null);
      return;
    }

    setFichier(selectedFile);
  }

  function resetForm() {
    setTitre("");
    setSlug("");
    setResume("");
    setContenuTexte("");
    setCategorieId("");
    setTypeId("");
    setEstActif(false);
    setDatePublication("");
    setLargeurPx("");
    setHauteurPx("");
    setDureeSeconde("");
    setFichier(null);
  }

  const handleSubmit: ComponentProps<"form">["onSubmit"] = async (event) => {
    event.preventDefault();

    setMessage(null);

    const cleanTitre = titre.trim();
    const cleanSlug = slug.trim();
    const cleanResume = resume.trim();
    const cleanContenuTexte = contenuTexte.trim();

    if (!cleanTitre || !cleanSlug || !cleanResume) {
      setMessage({
        type: "error",
        text: "Le titre, le slug et le résumé sont obligatoires.",
      });

      return;
    }

    if (!categorieId || !typeId) {
      setMessage({
        type: "error",
        text: "La catégorie et le type sont obligatoires.",
      });

      return;
    }

    const formData = new FormData();

    formData.append("titre", cleanTitre);
    formData.append("slug", cleanSlug);
    formData.append("resume", cleanResume);
    formData.append("contenu_texte", cleanContenuTexte);
    formData.append("est_actif", estActif ? "1" : "0");
    formData.append("categorie_id", categorieId);
    formData.append("type_id", typeId);

    if (estActif && datePublication) {
      formData.append("date_publication", datePublication);
    }

    if (largeurPx) {
      formData.append("largeur_px", largeurPx);
    }

    if (hauteurPx) {
      formData.append("hauteur_px", hauteurPx);
    }

    if (dureeSeconde) {
      formData.append("duree_seconde", dureeSeconde);
    }

    if (fichier) {
      formData.append("fichier", fichier);
      formData.append("nom_fichier", fichier.name);
      formData.append(
        "taille_fichier_ko",
        Math.ceil(fichier.size / 1024).toString()
      );
    }

    try {
      setIsSubmitting(true);

      const response =
        isEditMode && ressourceId
          ? await apiUpdateRessource(ressourceId, formData)
          : await apiCreateRessource(formData);

      setMessage({
        type: "success",
        text:
          response.message ||
          (isEditMode
            ? "Ressource modifiée avec succès."
            : "Ressource créée avec succès."),
      });

      if (!isEditMode) {
        resetForm();
      }
    } catch (error) {
      let errorMessage = isEditMode
        ? "Impossible de modifier la ressource."
        : "Impossible de créer la ressource.";

      if (error instanceof Error) {
        errorMessage = error.message;
      }

      setMessage({
        type: "error",
        text: errorMessage,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className={styles.createPage}>
      <CreateRessourceHeader />

      <form className={styles.card} onSubmit={handleSubmit}>
        <CreateRessourceMessage message={message} />

        <CreateRessourceLoading isLoading={isLoading} />

        <CreateRessourceFields
          titre={titre}
          handleTitreChange={handleTitreChange}
          slug={slug}
          setSlug={setSlug}
          resume={resume}
          setResume={setResume}
          contenuTexte={contenuTexte}
          setContenuTexte={setContenuTexte}
          categorieId={categorieId}
          setCategorieId={setCategorieId}
          isLoading={isLoading}
          categories={categories}
          typeId={typeId}
          setTypeId={setTypeId}
          types={types}
          estActif={estActif}
          handleActiveChange={handleActiveChange}
          datePublication={datePublication}
          handleFileChange={handleFileChange}
          fichier={fichier}
          largeurPx={largeurPx}
          setLargeurPx={setLargeurPx}
          hauteurPx={hauteurPx}
          setHauteurPx={setHauteurPx}
          dureeSeconde={dureeSeconde}
          setDureeSeconde={setDureeSeconde}
        />

        <CreateRessourceAction isLoading={isLoading} />
      </form>
    </main>
  );
}