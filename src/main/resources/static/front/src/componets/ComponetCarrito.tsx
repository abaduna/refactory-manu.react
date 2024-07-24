
import  "./../styles/ComponetCarrito.css";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { Dispatch, SetStateAction, useState } from "react";
import { useFetch } from "../hock/useFetch";
import { carrito } from "../types/types";
interface ComponetCarritoProps {
  carrito: carrito[];
  setCarrito:Dispatch<SetStateAction<carrito[]>>
}

function ComponetCarrito({ carrito,setCarrito }: ComponetCarritoProps) {
  const [modal, setModal] = useState<boolean>(false);
  const [phone, setPhone] = useState<number>(0);
  const [address, setAddress] = useState<string>("");
  const [people, setPeople] = useState<string>("");
  const [envio,setEnvio] = useState<boolean>(true)
  const { postOrdenes } = useFetch();
  const updata = () => {
    setModal(true);
    console.log('modal', modal)
  };
  const save = () => {
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
      people
    };
    console.log("carrito", carrito);
    postOrdenes(data, "api/ordenes");
  };
  const handlerEnvio=(envio:string)=>{
    
if (envio === "No") {
  setEnvio(false)
  const newItems = carrito.filter(item => item.name !== 'envio');
  setCarrito(newItems);
}else{
  const envio = {
    name:"envio",
    price:600
  }
  setCarrito([...carrito,envio])
}
  }
  return (
    <div className="navbar">
      {carrito.length > 0 && (
        <h5>
          Cantidad de elementos comprados <span>{carrito.length}</span>{" "}
        </h5>
      )}
      {carrito.length > 0 && <button onClick={updata}>Finalizar compra</button>}
      {modal && (
        <div  className=""
       >

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
                <p>Queres con envio</p>
                <select  onChange={(e)=>handlerEnvio(e.target.value)}>
                  <option>Si</option>
                  <option>No</option>
                </select>
              {envio&&<input
                  placeholder="ingresa tu direccion"
                  onChange={(e) => setAddress(e.target.value)}
                />}  

        </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary" onClick={() => setModal(false)}>Cerrar</Button>
          <Button variant="primary" onClick={save}> Enviar pedido </Button>
        </Modal.Footer>
      </Modal.Dialog>

    
        </div>
      )}
    </div>
  );
}

export default ComponetCarrito;
