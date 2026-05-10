
import { Ressource } from "../../../types/ressources";
import styles from "./module.ressourcesDetail.module.css";

type Props={
    ressource:Ressource
}

export default function DetailText({ressource}:Readonly<Props>){
    if (!ressource.contenu_texte) return null;

    return (
        <section className={styles.contentSection}>
            <h2>Contenu</h2>
              <p>{ressource.contenu_texte}</p>
        </section>
            )

    
}