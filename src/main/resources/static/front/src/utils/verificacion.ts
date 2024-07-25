import { useNavigate } from "react-router-dom";


export const Verificar=()=>{
    
    const token = localStorage.getItem("token")
    if (!token ) {
        console.log(token);
        return false
        
    }else{
        return true
    }
}