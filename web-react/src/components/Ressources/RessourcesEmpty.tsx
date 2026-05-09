
import styles from "./module.ressourcesList.module.css";
import { Ressource } from "../../types/ressources";


type Message = {
  type: "success" | "error";
  text: string;
};


type Props ={
    isLoading : boolean,
    ressources : Ressource[],
    message : Message |null,
}

export default function RessourcesEmpty({isLoading,ressources,message}: Readonly<Props>){

        if (!isLoading && ressources.length === 0 && !message) return null;


    return (
    
        <p className={styles.emptyMessage}>
          Aucune ressource disponible pour le moment.
        </p>
    )
}