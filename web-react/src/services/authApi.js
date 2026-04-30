import { httpRequest } from "./httpClient";

export async function apiLogin({email,password}) {
    return httpRequest({
        method:"POST",
        path:"login_check",

        body:{
            email:email,
            motDePasse : password,
        }
    })
    
}