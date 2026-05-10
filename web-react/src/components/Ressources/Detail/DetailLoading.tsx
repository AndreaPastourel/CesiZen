import styles from "./module.ressourcesDetail.module.css";
type Props = {
  isLoading: boolean;
};



export default function DetailLoading({isLoading}: Readonly<Props>){
    if (!isLoading) return null;


    return (<p className={styles.loadingMessage}>Chargement de la ressource...</p>)
     
        
}