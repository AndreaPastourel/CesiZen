
import styles from "./module.ressourcesList.module.css";

type Props = {
  isLoading: boolean;
};



export default function  RessourcesHeader({isLoading}: Readonly<Props>){

    return(
         <section className={styles.header}>
        <p className={styles.eyebrow}>CESI ZEN</p>

        <h1 className={styles.title}>Ressources</h1>

        <p className={styles.subtitle}>
          Retrouvez les contenus disponibles pour accompagner votre bien-être.
        </p>
        {isLoading && (
          <output className={styles.headerLoading}>
              Chargement des ressources...
          </output>
         )}
      </section>
    )
}