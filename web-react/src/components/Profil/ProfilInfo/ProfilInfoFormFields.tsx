import styles from "../module.Profil.module.css";
import ProfilInfoFormImage from "./ProfilInfoFormImage";

type Props= {
    prenom : string,
    nom : string, 
    pseudo: string, 
    email : string, 
    telephone :string, 
    photo_profil : string 


    setPrenom :(value: string) => void,
    setNom : (value: string) => void,
    setPseudo : (value: string) => void,
    setEmail :(value: string) => void,
    setTelephone : (value: string) => void,
    setPhotoProfil :(value: string) => void,
    

    photoPreview: string | null;
    handlePhotoChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    photoFile: File | null;
}

export default function ProfilInfoFormFields({prenom,nom,pseudo,email,telephone,photo_profil,setPrenom,setNom,setPseudo,setEmail,setTelephone,photoPreview,handlePhotoChange,photoFile}:Props){

    return(
        <div className={styles.formGrid}>
        <div className={styles.formGroup}>
          <label htmlFor="prenom">Prénom</label>

          <input
            id="prenom"
            type="text"
            value={prenom}
            onChange={(event) => setPrenom(event.target.value)}
            autoComplete="given-name"
          />
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="nom">Nom</label>

          <input
            id="nom"
            type="text"
            value={nom}
            onChange={(event) => setNom(event.target.value)}
            autoComplete="family-name"
          />
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="pseudo">Pseudo</label>

          <input
            id="pseudo"
            type="text"
            value={pseudo}
            onChange={(event) => setPseudo(event.target.value)}
            autoComplete="username"
            required
          />
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="email">Adresse email</label>

          <input
            id="email"
            type="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            autoComplete="email"
            required
          />
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="telephone">Téléphone</label>

          <input
            id="telephone"
            type="tel"
            value={telephone}
            onChange={(event) => setTelephone(event.target.value)}
            autoComplete="tel"
          />
        </div>

      <ProfilInfoFormImage
        photoPreview={photoPreview}
        prenom={prenom}
        pseudo={pseudo}
        handlePhotoChange={handlePhotoChange}
        photoFile={photoFile}
      />
      </div>
    )
}