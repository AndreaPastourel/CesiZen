import styles from "../module.createEmotion.module.css";

type Props = {
  isEditMode: boolean,
};

export default function CreateEmotionHeader({isEditMode,}: Readonly<Props>) {
  return (
    <section className={styles.header}>
      <p className={styles.eyebrow}>ADMINISTRATION</p>

      <h1 className={styles.title}>
        {isEditMode ? "Modifier une émotion" : "Ajouter une émotion"}
      </h1>

      <p className={styles.subtitle}>
        {isEditMode
          ? "Modifiez les informations de l’émotion secondaire sélectionnée."
          : "Créez une émotion secondaire associée à un type d’émotion et à une intensité de 1 à 10."}
      </p>
    </section>
  );
}