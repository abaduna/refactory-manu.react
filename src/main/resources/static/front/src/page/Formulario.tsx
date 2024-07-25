import { useNavigate, useParams } from "react-router-dom";

import { useEffect, useState } from "react";
import  "./../styles/FormAdmin.css";
import { useFetch } from "../hock/useFetch";
import { Verificar } from "../utils/verificacion";

export interface food {
  id?: string;
  price?: number;
  name?: string;
  category?: string;
  description?: string;
  stock?: string;
}
const FormAdmin = () => {
  const { getDataForid, upDateID } = useFetch();
  const [food, setFood] = useState<food>();
  const [successful, setSuccessful] = useState<boolean>(false);
  const [description, setDescription] = useState<string>("");
  const [stock, setStock] = useState<number>(0);
  const { id } = useParams();
  const navigate = useNavigate();
  useEffect(() => {

    Verificar();
    const fetchFoodData = async () => {
      if (id) {
        const response = await getDataForid(id);
        console.log( response)
        if (response) {
          setFood(response.data);
          console.log(response);
          console.log(food);
        }
      }
    };
    if (!localStorage.getItem("token")) {
      navigate('/login');
    }
    fetchFoodData();
  }, []);
  const updateform = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
        if (id) {
         upDateID(id, food as food);   
        }
      

      setSuccessful(true);
      setTimeout(() => {
        setSuccessful(false);
      }, 700);
      // router.push("/admin");
    } catch (error) {
      console.log(error);
    }
  };
  const updateTitle = (newTitle: string) => {
    setFood((prevFood) => ({
      ...prevFood,
      name: newTitle,
    }));
  };
  const updatePrice = (newPrice: string) => {
    setFood((prevFood) => ({
      ...prevFood,
      price: +newPrice,
    }));
  };
  const updateDescription = (newPrice: string) => {
    setFood((prevFood) => ({
      ...prevFood,
      description: newPrice,
    }));
  };
  const updateStock = (newPrice: string) => {
    setFood((prevFood) => ({
      ...prevFood,
      stock: newPrice,
    }));
  };

  return (
    <div>
      {successful && <span>Modificacion exitosa</span>}
      <form onSubmit={updateform} className="formulario">
        {food && (
          <input
            className="input"
            value={food.name}
            onChange={(e) => updateTitle(e.target.value)}
          />
        )}
        {food && (
          <input
            className="input"
            value={food.description}
            onChange={(e) => updateDescription(e.target.value)}
          />
        )}
        {food && (
          <input
            className="input"
            type="number"
            value={food.price}
            onChange={(e) => updatePrice(e.target.value)}
          />
        )}
        {food && (
          <input
          className="input"
            type="number"
            value={food.stock}
            onChange={(e) => updateStock(e.target.value)}
          />
        )}
      
        <button  className="btn" type="submit">Actualizar</button>
      </form>
    </div>
  );
};

export default FormAdmin;
