import { useEffect, useRef, useState } from "react";
import { ordenes, Productos } from "../types/types";

import { useFetch } from "../hock/useFetch";

import Table from "react-bootstrap/Table";
import { Button } from "react-bootstrap";
import { useReactToPrint } from "react-to-print";
import Print from "../componets/print";

function Aceptados() {
  const { getData } = useFetch();
  const [ordenes, serOrdenes] = useState<ordenes[]>([]);
  const [dateSerch, setDateSerch] = useState<string>("null");
  const [orden, setOrden] = useState<ordenes>();
  const [productos, setProductos] = useState<Productos[]>([]);
  useEffect(() => {
    const getDatos = async () => {
      if (dateSerch !== "null") {
        console.error("ejecutado");

        const res = await getData(`api/ordenes/aceptados/serch/${dateSerch}`);
        serOrdenes(res?.data);
      } else {
        const res = await getData("api/ordenes/aceptados");
        serOrdenes(res?.data);
      }
    };
    getDatos();
  }, [dateSerch]);
  useEffect(() => {
    const getPedidos = async () => {
      if (orden) {
        
        const res = await getData(`api/allordenes/${orden.id_orden}`);
        setProductos(res?.data);
        setTimeout(() => {
          handlePrint()
        }, 500);
      }
    };
    getPedidos();
  }, [orden]);

  const componentRef = useRef<HTMLDivElement | null>(null);
  const handlePrint = useReactToPrint({ content: () => componentRef.current });
  return (
    <>
      {orden && (
        <Print
          productos={productos}
          ordenes={orden}
          componentRef={componentRef}
        />
      )}
      <h2>Pedidos terminados</h2>
      <input type="date" onChange={(e) => setDateSerch(e.target.value)} />
      <Table>
        <thead>
          <tr>
            <th scope="col">Numero de mesa</th>
            <th scope="col">id</th>
            <th scope="col">fecha</th>
            <th scope="col"></th>
          </tr>
        </thead>
        <tbody>
          {ordenes.length > 0 &&
            ordenes.map((orden) => (
              <tr key={orden.id}>
                <td>{orden.tableNumber} </td>
                <td> {orden.id_orden}</td>
                <td> {orden.dateTime}</td>
                <td>
                  {" "}
                  <Button onClick={() => setOrden(orden)}>Imprimir</Button>
                </td>
              </tr>
            ))}
        </tbody>
      </Table>
    </>
  );
}

export default Aceptados;
