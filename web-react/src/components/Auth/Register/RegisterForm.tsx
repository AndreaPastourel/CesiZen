import { FormEvent, useState } from "react"
import { apiRegister } from "../../../services/authApi";
import styles from "../module.loginStyle.module.css";
import RegisterAction from "./RegisterAction";
import RegisterFields from "./RegisterFields";
import RegisterMessage from "./RegisterMessage";
import RegisterHeader from "./RegisterHeader";

type RegisterMessageState = {
    type : "succes" |"error",
    text : string | null,
}| null


export default function RegisterForm(){

    const [email,setEmail] = useState<string>("");
    const[prenom,setPrenom]= useState<string>("");
    const [nom,setNom]= useState<string>("");
    const [pseudo,setPseudo]= useState<string>("");
    
    const [telephone,setTelephone]= useState<string>("");
    const [motDePasse, setMotDePasse]= useState<string>("");
    const [confirmMotDePasse,setConfirmMotDePasse]= useState<string>("");
    const[photoProfil,setPhotoProfil] = useState<string>("");

    const [isLoading,setLoading]= useState<boolean>(false);
    const [message,setMessage]= useState<RegisterMessageState>(null);


    //trouver autre solution pour eviter fonction deprecier
    async function handleRegister(event : FormEvent <HTMLFormElement>){
            event.preventDefault();
            //nettoyage des variables
            setMessage(null);
            
            const cleanPrenom=prenom.trim();
            const cleanNom= nom.trim();
            const cleanPseudo=pseudo.trim();
            const cleanEmail=email.trim();
            const cleanTelephone = telephone.trim();
            const cleanMotDePasse = motDePasse.trim();
            const cleanConfirmMotDePasse = confirmMotDePasse.trim();
            const cleanPhotoProfil = photoProfil.trim();

            //verife des champs obligatoire 
            if(!cleanPseudo || !cleanEmail|| !cleanMotDePasse|| !cleanConfirmMotDePasse){
                setMessage({
                    type:"error",
                    text:"Le Pseudo,l'email, le mot de passe et la confirmation de mot de passes sont obligatoires."
                });

                return;
            }

            if (cleanMotDePasse.length<6) {
                setMessage({
                    type:"error",
                    text : "Le mot de passe doit contenir au moins 6 caractères"
                });

                return;
            }

            if (cleanMotDePasse!== cleanConfirmMotDePasse){
                setMessage({
                    type:"error",
                    text:"Les mots de passe ne correspondent pas"
                });
                return;

            }


            try{

                setLoading(true);

                await apiRegister({
                    email:cleanEmail,
                    motDePasse:cleanMotDePasse,
                    pseudo:cleanPseudo,
                    prenom : cleanPrenom ||null,
                    nom: cleanNom ||null,
                    telephone: cleanTelephone||null,
                    photo_profil : cleanPhotoProfil ||null,

                })


                setMessage({
                type:"succes",
                text:"Compte créé avec succès ✅",
                  })


                  setPrenom("");
                setNom("");
                setPseudo("");
                setEmail("");
                setTelephone("");
                setPhotoProfil("");
                setMotDePasse("");
                setConfirmMotDePasse("");

            }catch (error){
                const errorMessage = error instanceof Error ? error.message : "Impossible de créer le compte"

                setMessage({
                    type:"error",
                    text:errorMessage,
                  })

            }finally{
                setLoading(false)
            }

    }

     return (
                <form className={styles.loginForm} onSubmit={handleRegister}>
                    <RegisterHeader
                        title ="Inscription"
                        subtitle="Créez votre compte pour accéder à CESI Zen."
                    />

                    <RegisterMessage message={message} />

                    <RegisterFields
                            prenom={prenom}
                            nom={nom}
                            pseudo={pseudo}
                            email={email}
                            telephone={telephone}
                            photoProfil={photoProfil}
                            motDePasse={motDePasse}
                            ConfirmMotDePasse={confirmMotDePasse}
                            setPrenom={setPrenom}
                            setNom={setNom}
                            setPseudo={setPseudo}
                            setEmail={setEmail}
                            setTelephone={setTelephone}
                            setPhotoProfil={setPhotoProfil}
                            setMotDePasse={setMotDePasse}
                            setConfirmMotDePasse={setConfirmMotDePasse}
                        />

                        <RegisterAction isLoading={isLoading} />
                </form>
            )
    
}