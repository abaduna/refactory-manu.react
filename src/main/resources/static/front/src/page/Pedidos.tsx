

import { useEffect, useRef, useState } from "react";





import { useReactToPrint } from "react-to-print";
import Modal from "../componets/modal";
import Print from "../componets/print";
import { useFetch } from "../hock/useFetch";
import { Productos,ordenes } from "../types/types";

import { useNavigate } from "react-router-dom";


const Pedidos = () => {
    const { getData ,postOrdenes} = useFetch();
    const [ordenes, setOrdenes] = useState<ordenes[]>([]);
    const [ordene, setOrdene] = useState<ordenes>();
    const [id_orden, setId_orden] = useState<number>(0);
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const navigate = useNavigate();
    const [productos,setProductos] = useState<Productos[]>([])
    const getDatas = async () => {
      const res = await getData(`api/ordenes`);
      if (res) {
        setOrdenes(res.data);
        console.log('res', res)
        console.log('ordenes', ordenes)
      }
    };
    useEffect(() => {
      getDatas();
      if (!localStorage.getItem("token")) {
        navigate('/login');
      }
    }, []);
  
    const seePedido = (id: number) => {
      setId_orden(id);
      setIsOpen(true);
      console.log('isO', isOpen)
    };
    const aceptPediddobtn = (orden: ordenes) => {
      setOrdene(orden)
      const postAceptar = async () => {
        try {
          const res = await getData(`api/allordenes/${orden.id_orden}`);
          setProductos(res?.data)
          console.log('productos', productos)
          await postOrdenes({}, `api/ordenes/aceptados/${orden.id_orden}`);
        } catch (error) {
            console.error(error);
            
        }
      };
      setTimeout(() => {
        handlePrint()
      }, 500);
      
      postAceptar();
      getDatas();
    };
    const aceptPediddo = async (orden: ordenes) => {
      setOrdene(orden)
      const postAceptar = async () => {
        try {
          const res = await getData(`api/allordenes/${orden.id_orden}`);
          setProductos(res?.data)
          console.error('productos', productos)
          let productosStr = "";
          if (res) {
          
            const titulos = productos.map((producto) => producto.name);
            productosStr = titulos.join(",");
            
          }
          getDatas();
          const formattedPhoneNumber = 5493413592493;
          const mensaje = `Hola buen dia tu compra es aceptada\n
    ____________\n
  
  
  ${productosStr}\n
  gracias por comprar
    `;
    const whatsappLink =    `https://api.whatsapp.com/send?phone=${formattedPhoneNumber}&text=${encodeURIComponent(
            mensaje
          )}`;
         await postOrdenes({}, `api/ordenes/aceptados/${orden.id_orden}`);
         window.open(whatsappLink, "_blank");
        } catch (error) {
          console.log("error", error);
        }
      };
  
      setTimeout(() => {
        handlePrint()
      }, 500);
      postAceptar();
    };

    const componentRef = useRef<HTMLDivElement | null>(null);
    const handlePrint = useReactToPrint({content: () => componentRef.current});
    
    return (
      <>
     
      {ordene &&<Print  productos={productos} ordenes={ordene} componentRef={componentRef}/> }
      
        <Modal
          isOpen={isOpen}
          id_orden={id_orden}
          clouseModal={() => setIsOpen(false)}
        ></Modal>
        <h1>pedidos</h1>
  
        <table className="table">
          <thead>
            <tr>
              <th scope="col">Numero de mesa</th>
              <th scope="col">estado</th>
              <th scope="col">Ver pedido</th>
              <th scope="col">Aceptar pedido</th>
            </tr>
          </thead>
          <tbody>
            {ordenes.length > 0 &&
              ordenes.map((orden) => (
                <tr key={orden.id}>
                  <td>{orden.tableNumber} </td>
                  <td> {orden.estados}</td>
                  <td>
                    {" "}
                    <button onClick={() => seePedido(orden.id_orden)}>
                      Ver pedido
                    </button>
                  </td>
                  <td>
                  
                    {orden.tableNumber === "Pedido" && (
                      <button onClick={() => aceptPediddobtn(orden)}>
                        Aceptar
                      </button>
                    )}
                    {orden.tableNumber !== "Pedido" && (
                      <button onClick={() => aceptPediddo(orden)}>
                        Aceptar
                      </button>
                    )}
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </>
    );
}

export default Pedidos