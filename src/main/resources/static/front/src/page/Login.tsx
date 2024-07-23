



import { useState } from "react";
import "../styles/Login.css"
import { useFetch } from "../hock/useFetch";
import { redirectDocument, useNavigate } from "react-router-dom";

function Login() {
    const [user, setUser] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const { post } = useFetch();
    const navigate = useNavigate();

  
    const sendLogin =async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      await post(user, password, "api/auth/login");
  
    // como hacer para redigir a otra pagina
     //router.push("/admin");
     navigate('/admin')
      
    };
    return (
      <form onSubmit={sendLogin} className="loginForm">
        <div className="inputContainer">
          <input
            placeholder="usuario"
            type="text"
            value={user}
            onChange={(e) => setUser(e.target.value)}
            required
            className="inputField"
          />
        </div>
        <div className="inputContainer">
          <input
            placeholder="contraseña"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            name="password"
            required
            className="inputField"
          />
        </div>
        <button type="submit" className="submitButton">Enviar</button>
      </form>
    );
}

export default Login