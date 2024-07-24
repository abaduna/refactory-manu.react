import { useEffect, useState } from "react";

import "../styles/Moda.css"

import { useFetch } from "../hock/useFetch";
 
interface pedidos {
  id: number;
  id_orden: number;
  name: string;
  price: number;
}
const Modal = ({
  isOpen,
  clouseModal,
  id_orden,
}: {
  isOpen: boolean;
  clouseModal: () => void;
  id_orden: number;
}) => {
  const { getData } = useFetch();
  const [ordenes, setOrdenes] = useState<pedidos[]>([]);
  useEffect(() => {
    const data = async () => {
      const res = await getData(`api/allordenes/${id_orden}`);
      if (res) {
        setOrdenes(res.data);
        console.log("ordenes", ordenes);
      }
    };
    data();
  }, [id_orden]);



  return (
    <>
{isOpen&&<div className="modal">
          <div className="container">
           <button className="btn button" onClick={clouseModal}>X</button>
            <table className="table">
              <thead className="white">
                <tr>
                  <th scope="col">Producto</th>
                  <th scope="col">Precio</th>
                </tr>
              </thead>
              <tbody className="white">
                {ordenes.length > 0 &&
                  ordenes.map((orden) => (
                    <tr key={orden.id}>
                      <td>{orden.name}</td>
                      <td>{orden.price}</td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </div>}
        

        

    </>
    
  );
};

export default Modal;
