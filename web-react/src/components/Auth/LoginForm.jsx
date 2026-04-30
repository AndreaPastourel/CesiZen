import { useState } from "react";
import LoginHeader from "./LoginHeader";
import LoginMessage from "./LoginMessage";
import LoginFields from "./LoginFields";
import LoginAction from "./LoginAction";
import "./module.loginStyle.css"
import { apiLogin } from "../../services/authApi";





export default function LoginForm(){

    const [email,setEmail]= useState("");
    const [password,setPassword]= useState("");
    const [message, setMessage]=useState("");
    const [isLoading,setLoading]=useState(false);


    async function handleLogin(event){
        event.preventDefault();

        setMessage(null);
        const cleanEmail= email.trim();
        const cleanPassword= password.trim();

        if (!cleanEmail || !cleanPassword){
            setMessage({
                type : "error",
                text:"Email ou mot de passe obligatoire"
            })
            return;
        }

        try{
            setLoading(true);
            
            const result = await apiLogin(cleanEmail,cleanPassword);
            
            //stockage du token

            console.log("Utilisateur connecté",result);
        }catch (error){
            setMessage({
                type:"error",
                text:error.message ||"Impossible de se connecter, Erreur API"

            })
        }finally{
            setLoading(false);
        }

    }


    return(
        <form className="login-form" onSubmit={handleLogin}>
            <LoginHeader 
                title="Connexion"
                subtitle= "Accéder à votre compte CESI Zen"
            />

            <LoginMessage
                message= {message}
            />

            <LoginFields 
                email={email}
                password={password}
                setEmail={setEmail}
                setPassword={setPassword}
            />


            <LoginAction 
                loading={isLoading}
             />


        </form>



    )





}