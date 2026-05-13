import styles from "../module.Profil.module.css";


type Props={
    ancienMotDePasse: string, 
    nouveauMotDePasse : string, 
    confirmation:string,

    setAncienMotDePasse :(value: string) => void,
    setNouveauMotDePasse: (value: string) => void,
    setConfirmation : (value: string) => void,
}


export default function ProfilPasswordFormFiled({ancienMotDePasse,nouveauMotDePasse,confirmation,setAncienMotDePasse,setNouveauMotDePasse,setConfirmation}:Props){

    return(   
        <>
    <div className={styles.formGroup}>
        <label htmlFor="ancienMotDePasse">Mot de passe actuel</label>

        <input
          id="ancienMotDePasse"
          type="password"
          value={ancienMotDePasse}
          onChange={(event) => setAncienMotDePasse(event.target.value)}
          autoComplete="current-password"
          required
        />
      </div>

      <div className={styles.formGroup}>
        <label htmlFor="nouveauMotDePasse">Nouveau mot de passe</label>

        <input
          id="nouveauMotDePasse"
          type="password"
          value={nouveauMotDePasse}
          onChange={(event) => setNouveauMotDePasse(event.target.value)}
          autoComplete="new-password"
          required
        />
      </div>

      <div className={styles.formGroup}>
        <label htmlFor="confirmation">Confirmer le nouveau mot de passe</label>

        <input
          id="confirmation"
          type="password"
          value={confirmation}
          onChange={(event) => setConfirmation(event.target.value)}
          autoComplete="new-password"
          required
        />
      </div>
      </>
      )
}