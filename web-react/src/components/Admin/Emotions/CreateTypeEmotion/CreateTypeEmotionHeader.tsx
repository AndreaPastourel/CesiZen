import styles from "../module.createEmotion.module.css";

export default function CreateTypeEmotionHeader(){
    return(
        <section className={styles.header}>
        <p className={styles.eyebrow}>ADMINISTRATION</p>

        <h1 className={styles.title}>Ajouter un type d’émotion</h1>

        <p className={styles.subtitle}>
          Créez une émotion principale, comme la joie, la peur, la colère ou la
          tristesse.
        </p>
      </section>
    )
}