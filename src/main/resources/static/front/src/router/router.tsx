import {
    BrowserRouter as Router,
    Route,
    Routes,
    Navigate,
  } from "react-router-dom";
import Home from "../page/home";
import Admin from "../page/Admin";
import Ordens from "../page/Ordens";
import Pedidos from "../page/Pedidos";
import Aceptados from "../page/Aceptados";
import Login from "../page/Login";
import Graficos from "../page/Graficos";

  const RoutesPrincial =()=>{
    return(
        <Router>
            <Routes>
                <Route path="/" element={<Home/>}/>
                <Route path="/login" element={<Login/>}/>
                <Route path="/admin" element={<Admin/>}/>
                <Route path="/admin/ordens" element={<Ordens/>}/>
                <Route path="/admin/pedidos" element={<Pedidos/>}/>
                <Route path="/admin/pedidos/aceptados" element={<Aceptados/>}/>
                <Route path="/admin/aceptados/graficos" element={<Graficos/>}/>
                <Route
                path="*"
                element={<Navigate to="/login" replace />} />
            </Routes>
        </Router>
    )
  }

  export default RoutesPrincial