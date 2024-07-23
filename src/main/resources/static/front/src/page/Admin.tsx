import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Admin.css";
import { useFetch } from "../hock/useFetch";
import ComponentAdminFood from "../componets/ComponentAdminFood";
import { Menu } from "../types/types";
import FormularioAdmin from "../componets/FormularioAdmin";

function Admin() {
  const [foods, setFoods] = useState([]);
  const [updata, setUpdate] = useState<boolean>(false);

  const { getData } = useFetch();

  useEffect(() => {
    const verificar = () => {
      const token = localStorage.getItem("token");
      if (token == null) {
        //router.push("/login");
      }
    };
    verificar();
    const fetchFoodsData = async () => {
      console.log(`fetchFoodsData`);
      try {
        const response = await getData("api/food");
      if (response) {
        setFoods(response.data);
        console.log(response.data);
      }
      } catch (error) {
        console.log(error);
        
      }
      
    };
    fetchFoodsData();


  }, []);
  return (
    <>
      <FormularioAdmin updata={updata} setUpdate={setUpdate} />
      <div className="fooditems">
        {foods?.length > 0 ? (
          foods?.map((food: Menu) => (
            <ComponentAdminFood
              key={food.id}
              updata={updata}
              setUpdate={setUpdate}
              {...food}
            />
          ))
        ) : (
          <p>Loading foods...</p>
        )}
      </div>
    </>
  );
}

export default Admin;
