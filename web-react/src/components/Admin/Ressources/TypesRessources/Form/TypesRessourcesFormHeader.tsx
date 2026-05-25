import styles from "./module.typeRessourcesForm.module.css"

type Props = {
    isEditMode : boolean
}

export default function TypesRessourcesFormHeader({isEditMode}:Readonly<Props>){

    return(
            <section className={styles.header}>
        <p className={styles.eyebrow}>ADMINISTRATION</p>

        <h1 className={styles.title}>
          {isEditMode
            ? "Modifier un type de ressource"
            : "Ajouter un type de ressource"}
        </h1>

        <p className={styles.subtitle}>
          {isEditMode
            ? "Modifiez les informations du type de ressource sélectionné."
            : "Créez un type permettant de classer les ressources, comme article, vidéo ou document."}
        </p>
      </section>
    )
}