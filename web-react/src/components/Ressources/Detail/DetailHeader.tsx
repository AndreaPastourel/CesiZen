import { Ressource } from "../../../types/ressources";
import styles from "./module.ressourcesDetail.module.css";

type Props={
    ressource:Ressource
}

export default function DetailHeader({ressource}:Readonly<Props>){
    return(
        <div className={styles.header}>
            <p className={styles.eyebrow}>CESI ZEN</p>
            <h1 className={styles.title}>{ressource.titre}</h1>
            <p className={styles.resume}>{ressource.resume}</p>
          </div>
    )
}