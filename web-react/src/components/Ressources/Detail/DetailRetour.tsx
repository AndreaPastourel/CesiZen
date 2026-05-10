
import { Link } from "react-router-dom";
import styles from "./module.ressourcesDetail.module.css";

export default function DetailRetour(){

    return (
         <Link to="/ressources" className={styles.backLink}>← Retour aux ressources </Link>
    )
}