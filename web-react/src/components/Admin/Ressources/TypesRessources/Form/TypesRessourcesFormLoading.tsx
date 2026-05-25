import styles from "./module.typeRessourcesForm.module.css"
type Props = {
    isLoading: boolean,
    isEditMode : boolean,
}


export default function TypesRessourcesFormLoading({isLoading,isEditMode}:Readonly<Props>){
    
    if(!isLoading && !isEditMode) return null;

    return(
       
          <p className={styles.loadingMessage}>
            Chargement du type de ressource...
          </p>

    )
}