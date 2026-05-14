
import { useEffect, useState } from "react";
import type { ComponentProps } from "react";
import { useNavigate } from "react-router-dom";
import { apiCreateRessource } from "../../../services/ressourcesApi";
import { apiGetAllCategories } from "../../../services/categoriesApi";
import { apiGetAllTypes } from "../../../services/typesRessourcesApi";
import { Message } from "../../../types/message"
import styles from "./module.ressourceCreate.module.css";
import { Categorie } from "../../../types/categories";
import CreateRessourceHeader from "./CreateRessourceHeader";
import CreateRessourceMessage from "./CreateRessourceMessage";
import CreateRessourceLoading from "./CreateRessourceLoading";
import CreateRessourceFields from "./CreateRessourceFields";
import CreateRessourceAction from "./CreateRessourceAction";
import { TypeResources } from "../../../types/types";



export default function CreateRessourceForm() {

  const navigate = useNavigate();

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
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [message, setMessage] = useState<Message>(null);

  
  useEffect(() => {
    loadOptions();
  }, []);


  async function loadOptions() {
    setIsLoading(true);
    setMessage(null);

    try {
    
      const [categoriesResponse, typesResponse] = await Promise.all([
        apiGetAllCategories(),
        apiGetAllTypes(),
      ]);

      setCategories(categoriesResponse.data);

      setTypes(typesResponse.data);
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
   
      setIsLoading(false);
    }
  }

  // generation du slug 
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
    setSlug(generateSlug(value));
  }


  function handleActiveChange(value: boolean) {
    setEstActif(value);

    if (value) {
      setDatePublication(getCurrentDateTimeLocal());
    } else {
      setDatePublication("");
    }
  }



  function handleFileChange(event: React.ChangeEvent<HTMLInputElement>) {
    const selectedFile = event.target.files?.[0];

    if (!selectedFile) {
      setFichier(null);
      return;
    }

    setFichier(selectedFile);
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
    
      setIsLoading(true);

      const response = await apiCreateRessource(formData);

      setMessage({
        type: "success",
        text: response.message || "Ressource créée avec succès.",
      });

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

    } catch (error) {
      const errorMessage =
        error instanceof Error
          ? error.message
          : "Impossible de créer la ressource.";

      setMessage({
        type: "error",
        text: errorMessage,
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className={styles.createPage}>
     
        <CreateRessourceHeader/>

      <form className={styles.card} onSubmit={handleSubmit}>
       
       <CreateRessourceMessage
       message={message}
       />

     <CreateRessourceLoading
     isLoading={isLoading}
     />
        <CreateRessourceFields
        titre={titre}
        handleTitreChange={handleTitreChange}
        slug={slug}
        setSlug={setSlug}
        resume ={resume}
        setResume ={setResume}
        contenuTexte ={contenuTexte}
        setContenuTexte ={setContenuTexte}
        categorieId = {categorieId}
        setCategorieId ={setCategorieId}
        isLoading ={isLoading}
        categories ={categories}
        typeId ={typeId}
        setTypeId ={setTypeId}
        types ={types}
        estActif ={estActif}
        handleActiveChange ={handleActiveChange}
        datePublication ={datePublication}
        handleFileChange ={handleFileChange}
        fichier ={fichier}
        largeurPx ={largeurPx}
        setLargeurPx={setLargeurPx}
        hauteurPx ={hauteurPx}
        setHauteurPx ={setHauteurPx}
        dureeSeconde ={dureeSeconde}
        setDureeSeconde={setDureeSeconde}
        />

        <CreateRessourceAction
        isLoading={isLoading}/>
      </form>
    </main>
  );
}