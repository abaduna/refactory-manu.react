
import Navbarv2 from "./componets/Navbar";
import RoutesPrincial from "./router/router";

function App() {
 
  const token = localStorage.getItem("token")
  return (
    <div>
     {token &&<Navbarv2/>} 
      <RoutesPrincial/>
    </div>
      
  )
     
      
}

export default App
