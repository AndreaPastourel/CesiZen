import { Link } from "react-router-dom";
import styles from "./module.EmotionList.module.css";



export default function EmotionListHeader(){

    return( <section className={styles.header}>
        <div>
          <p className={styles.eyebrow}>ADMINISTRATION</p>

          <h1 className={styles.title}>Gestion des émotions</h1>

          <p className={styles.subtitle}>
            Consultez les émotions principales et leurs émotions secondaires
            associées aux intensités de 1 à 10.
          </p>
        </div>

        <div className={styles.headerActions}>
          <Link to="/admin/emotions/types/create" className={styles.addButton}>
            Ajouter un type
          </Link>

          <Link to="/admin/emotions/create" className={styles.secondaryButton}>
            Ajouter une émotion
          </Link>
        </div>
      </section>)
}