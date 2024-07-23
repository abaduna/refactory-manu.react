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
  console.log("id_orden", id_orden);
  if (isOpen) {
    return;
  }

  return (
    <div className="modal">
      <div className="container">
    {/* <FontAwesomeIcon
          icon={faXmark}
          onClick={clouseModal}
          className={styles.btnClose}
        /> */}
        <table className="table" >
        <thead className="white">
          <tr>
            <th scope="col">Producto</th>
            <th scope="col">Precio</th>
          </tr>
        </thead>
        <tbody className="white">
          {ordenes.length > 0 &&
            ordenes.map((ordenes) => (
              <tr key={ordenes.id}>
                <td>{ordenes.name}</td>
                <td>{ordenes.price}</td>
              </tr>
            ))}
        </tbody>
      </table>
      </div>
      
    </div>
  );
};

export default Modal;
