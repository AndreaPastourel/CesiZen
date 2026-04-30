import { httpRequest } from "./httpClient";

export async function apiLogin({email,password}) {
    return httpRequest({
        method:"POST",
        path:"Login_check",

        body:{
            username:email,
            password : password,
        }
    })
    
}