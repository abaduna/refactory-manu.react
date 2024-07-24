import { useEffect, useState } from "react";

import { Menu } from "./../types/types";

import { Suspense } from "react";
import ComponetCarrito from "../componets/ComponetCarrito";
import { useFetch } from "../hock/useFetch";
import ComponetFood from "../componets/ComponetFood";
import "../styles/Home.css";
import NavbarLogin from "../componets/NavbarLogin";
import { Button } from "react-bootstrap";

function App() {
  const [serch, setSerch] = useState<string>("");
  const [foods, setFoods] = useState<Menu[]>([]);
  const [endpoint, setEndpoint] = useState<string>("api/food/serch/");

  const [bottle, setBottle] = useState<Menu[]>([]);
  const [show, setShow] = useState<boolean>(false);
  const [carrito, setCarrito] = useState<Menu[]>([]);
  const { getData } = useFetch();
  useEffect(() => {
    const getDataFoods = async () => {
      try {
        const foods = await getData(endpoint);
        if (typeof foods !== "undefined") {
          setFoods(foods.data);
          console.log(foods.data);
        } else {
          console.log(`undefind`);
        }
      } catch (error) {
        console.error("Error al obtener datos:", error);
      }
    };

    getDataFoods();
  }, [endpoint]);

  console.log("carrito", carrito);

  const handleSerchClick = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setShow(true);
    setEndpoint(`api/food/serch/${serch}`);
  };
  const sendCategory = async () => {
      const bottle = await getData("api/food");
      if (typeof bottle !== "undefined") {
        setBottle(bottle.data);
        console.error(bottle.data);
      } else {
        console.log(`undefind`);
      }
    };
  useEffect(() => {
    
    sendCategory();
  }, []);
  const removeProduct = (product: Menu) => {
    setCarrito((prev: Menu[]) =>
      prev.filter((item: Menu) => item.name !== product.name)
    );
  };

  return (
    <div>
      <NavbarLogin />
      <form className="formContainerSerch" onSubmit={handleSerchClick}>
        <input
          placeholder="buscar"
          onChange={(e) => setSerch(e.target.value)}
          value={serch}
          className="searchInput"
        />
        <div className="containerBtn">
          <button className="searchButton" type="submit">
            Buscar
          </button>
        </div>
      </form>

      <ComponetCarrito carrito={carrito} setCarrito={setCarrito}/>
      {show ? (
        <>
        <Button onClick={()=>setShow(!show)}>Cancerlar busqueda</Button>
          <div className="fooditem">
            {foods.length > 0 &&
              foods?.map((food) => (
                <Suspense key={food.id} fallback={<h1>Cargando...</h1>}>
                  <ComponetFood
                    setCarrito={setCarrito}
                    removeProduct={removeProduct}
                    {...food}
                  ></ComponetFood>
                </Suspense>
              ))}
          </div>
        </>
      ) : (
        <>
          {/* <p className={styles.categoryBottle}>Botellas</p> */}
          <div className="fooditem">
            {bottle.length > 0 &&
              bottle?.map((food: Menu) => (
                <Suspense key={food.id} fallback={<>Cargando...</>}>
                  <ComponetFood
                    setCarrito={setCarrito}
                    removeProduct={removeProduct}
                    {...food}
                  ></ComponetFood>
                </Suspense>
              ))}
          </div>
        </>
      )}
    </div>
  );
}

export default App;
