import styles from "../module.loginStyle.module.css";



type Props = {
    prenom: string, 
    nom : string,
    pseudo : string, 
    email : string, 
    telephone : string, 
    photoProfil : string, 
    motDePasse : string,
    ConfirmMotDePasse : string,

    setPrenom :(value: string) => void,
    setNom : (value: string) => void,
    setPseudo : (value: string) => void,
    setEmail :(value: string) => void,
    setTelephone : (value: string) => void,
    setPhotoProfil :(value: string) => void,
    setMotDePasse :(value: string) => void,
    setConfirmMotDePasse: (value: string) => void,


}

export default function RegisterFields({
     prenom,
    nom,
    pseudo,
    email,
    telephone,
    photoProfil,
    motDePasse,
    ConfirmMotDePasse,
    setPrenom,
    setNom,
    setPseudo,
    setEmail,
    setTelephone,
    setPhotoProfil,
    setMotDePasse,
    setConfirmMotDePasse,
    } : Readonly<Props>){

        return (
            <>
            <div className={styles.formGroup}>
        <label className={styles.formLabel} htmlFor="prenom">
          Prénom
        </label>

        <input
          className={styles.formInput}
          id="prenom"
          name="prenom"
          type="text"
          value={prenom}
          onChange={(event) => setPrenom(event.target.value)}
          placeholder="Votre prénom"
          autoComplete="given-name"
        />
      </div>

      <div className={styles.formGroup}>
        <label className={styles.formLabel} htmlFor="nom">
          Nom
        </label>

        <input
          className={styles.formInput}
          id="nom"
          name="nom"
          type="text"
          value={nom}
          onChange={(event) => setNom(event.target.value)}
          placeholder="Votre nom"
          autoComplete="family-name"
        />
      </div>

      <div className={styles.formGroup}>
        <label className={styles.formLabel} htmlFor="pseudo">
          Pseudo
        </label>

        <input
          className={styles.formInput}
          id="pseudo"
          name="pseudo"
          type="text"
          value={pseudo}
          onChange={(event) => setPseudo(event.target.value)}
          placeholder="Votre pseudo"
          autoComplete="username"
          required
        />
      </div>

      <div className={styles.formGroup}>
        <label className={styles.formLabel} htmlFor="register-email">
          Adresse email
        </label>

        <input
          className={styles.formInput}
          id="register-email"
          name="email"
          type="email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          placeholder="exemple@email.com"
          autoComplete="email"
          required
        />
      </div>

      <div className={styles.formGroup}>
        <label className={styles.formLabel} htmlFor="telephone">
          Téléphone
        </label>

        <input
          className={styles.formInput}
          id="telephone"
          name="telephone"
          type="tel"
          value={telephone}
          onChange={(event) => setTelephone(event.target.value)}
          placeholder="06 00 00 00 00"
          autoComplete="tel"
        />
      </div>

      <div className={styles.formGroup}>
        <label className={styles.formLabel} htmlFor="photo-profil">
          Photo de profil
        </label>

        <input
          className={styles.formInput}
          id="photo-profil"
          name="photo_profil"
          type="text"
          value={photoProfil}
          onChange={(event) => setPhotoProfil(event.target.value)}
          placeholder="URL ou nom de l’image"
          autoComplete="off"
        />
      </div>

      <div className={styles.formGroup}>
        <label className={styles.formLabel} htmlFor="register-password">
          Mot de passe
        </label>

        <input
          className={styles.formInput}
          id="register-password"
          name="motDePasse"
          type="password"
          value={motDePasse}
          onChange={(event) => setMotDePasse(event.target.value)}
          placeholder="Minimum 8 caractères"
          autoComplete="new-password"
          required
        />
      </div>

      <div className={styles.formGroup}>
        <label className={styles.formLabel} htmlFor="confirm-password">
          Confirmer le mot de passe
        </label>

        <input
          className={styles.formInput}
          id="confirm-password"
          name="confirmPassword"
          type="password"
          value={ConfirmMotDePasse}
          onChange={(event) => setConfirmMotDePasse(event.target.value)}
          placeholder="Confirmez votre mot de passe"
          autoComplete="new-password"
          required
        />
      </div>
    </>
  );
}