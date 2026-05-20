
import styles from "../module.createEmotion.module.css";

type Props = {
  isEditMode: boolean;
};

export default function CreateTypeEmotionHeader({
  isEditMode,
}: Readonly<Props>) {
  return (
    <section className={styles.header}>
      <p className={styles.eyebrow}>ADMINISTRATION</p>

      <h1 className={styles.title}>
        {isEditMode ? "Modifier un type d’émotion" : "Ajouter un type d’émotion"}
      </h1>

      <p className={styles.subtitle}>
        {isEditMode
          ? "Modifiez les informations du type d’émotion sélectionné."
          : "Créez une émotion principale, comme la joie, la peur, la colère ou la tristesse."}
      </p>
    </section>
  );
}