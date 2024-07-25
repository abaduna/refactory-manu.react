import "./../styles/ComponetCarrito.css";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { useFetch } from "../hock/useFetch";
import { carrito } from "../types/types";
import localidades from "../json/localidades.json";
import provincias from "../json/provincias.json";
import { Alert } from "react-bootstrap";
interface ComponetCarritoProps {
  carrito: carrito[];
  setCarrito: Dispatch<SetStateAction<carrito[]>>;
}

function ComponetCarrito({ carrito, setCarrito }: ComponetCarritoProps) {
  const [modal, setModal] = useState<boolean>(false);
  const [phone, setPhone] = useState<number>(0);
  const [address, setAddress] = useState<string>("");
  const [people, setPeople] = useState<string>("");
  const [envio, setEnvio] = useState<boolean>(false);
  const [mesage, setMesage] = useState<boolean>(false);
  const [cityFilter, setCityFilter] = useState([]);
  const [city, setCity] = useState({});
  const [provincia, setSelectedPrivincia] = useState<string>("");
  const { postOrdenes } = useFetch();

  const updata = () => {
    setModal(true);
    console.log("modal", modal);
  };
  const save = () => {
    setMesage(true);
    const fecha = new Date();

    // Obtener los componentes de la fecha
    const año = fecha.getFullYear();
    const mes = String(fecha.getMonth() + 1).padStart(2, "0"); // Los meses empiezan desde 0
    const dia = String(fecha.getDate()).padStart(2, "0");
    const horas = String(fecha.getHours()).padStart(2, "0");
    const minutos = String(fecha.getMinutes()).padStart(2, "0");
    const segundos = String(fecha.getSeconds()).padStart(2, "0");

    // Formatear la fecha en el formato deseado
    const fechaFormateada = `${año}-${mes}-${dia} ${horas}:${minutos}:${segundos}`;
    console.error("carrito", carrito);
    const data = {
      dateTime: fechaFormateada,
      table: "envio",
      phone: phone,
      ordenes: carrito,
      estados: "pedido",
      address: address,
      people,
      provincia,
      city,
    };
    console.log("carrito", carrito);
    postOrdenes(data, "api/ordenes");
    setPhone(0);
    setAddress("");
    setPeople("");
    setSelectedPrivincia("");
    setCity({});
    setTimeout(() => {
      setMesage(false);
    }, 900);
    setTimeout(() => {
    setModal(false)
    }, 1000);

    setCarrito([])
  };
  const handlerEnvio = (envio: string) => {
    if (envio === "No") {
      setEnvio(false);
      const newItems = carrito.filter((item) => item.name !== "envio");
      setCarrito(newItems);
    } else {
      setEnvio(true);
      const envio = {
        name: "envio",
        price: 600,
      };
      setCarrito([...carrito, envio]);
    }
  };
  useEffect(() => {
    let localidadesFiltes = localidades.localidades_censales.filter(
      (localidad) => localidad.provincia.nombre === provincia
    );
    setCityFilter(localidadesFiltes);
  }, [provincia]);
  return (
    <div className="navbar">
      {carrito.length > 0 && (
        <h5>
          Cantidad de elementos comprados <span>{carrito.length}</span>{" "}
        </h5>
      )}
      {carrito.length > 0 && <button onClick={updata}>Finalizar compra</button>}
      {modal && (
        <div className="">
          <Modal.Dialog className="modal">
            <Modal.Body>
              <label>Cual es tu nombre?</label>
              <input
                placeholder="ingresa tu nombre"
                onChange={(e) => setPeople(e.target.value)}
              />
              <br />
              <label>Cual es tu numero?</label>
              <input
                placeholder="ingresa tu telefono"
                onChange={(e) => setPhone(+e.target.value)}
              />
              <br />
              <label>Queres con envio</label>
              <select onChange={(e) => handlerEnvio(e.target.value)}>
                <option>No</option>
                <option>Si</option>
                
              </select>
              {envio && (
                <div>
                  <select
                    onChange={(e) => setSelectedPrivincia(e.target.value)}
                  >
                    <option value="">--Selecciona una provincia--</option>
                    {provincias.provincias.map((province) => (
                      <option key={province.id} value={province.nombre}>
                        {province.nombre}
                      </option>
                    ))}
                  </select>
                  <select onChange={(e) => setCity(e.target.value)}>
                    <option value="">--Selecciona una ciudad--</option>
                    {cityFilter.map((cuidades) => (
                      <option key={cuidades.id} value={cuidades.nombre}>
                        {cuidades.nombre}
                      </option>
                    ))}
                  </select>
                  <br />
                  <input
                    placeholder="ingresa tu direccion"
                    onChange={(e) => setAddress(e.target.value)}
                  />
                </div>
              )}
            </Modal.Body>

            <Modal.Footer>
              <Button variant="secondary" onClick={() => setModal(false)}>
                Cerrar
              </Button>
              <Button variant="primary" onClick={save}>
                {" "}
                Enviar pedido{" "}
              </Button>
              {mesage && <Alert variant="success">Pedido enviado</Alert>}
            </Modal.Footer>
          </Modal.Dialog>
        </div>
      )}
    </div>
  );
}

export default ComponetCarrito;
