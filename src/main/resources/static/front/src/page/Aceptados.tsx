
import { useEffect, useState } from "react";
import {ordenes}  from "../types/types"


import { useFetch } from "../hock/useFetch";

import Table from 'react-bootstrap/Table';



function Aceptados() {
    const { getData } = useFetch();
    const [ordenes, serOrdenes] = useState<ordenes[]>([]);
    const [dateSerch,setDateSerch] = useState<string>("null")
  
    useEffect(() => {
      const getDatos = async () => {
        if (dateSerch !== "null") {
          console.error("ejecutado");
          
          const res = await getData(`api/ordenes/aceptados/serch/${dateSerch}`);
        serOrdenes(res?.data);
  
        }else{
          const res = await getData("api/ordenes/aceptados");
        serOrdenes(res?.data);
        }
        
      };
      getDatos();
    }, [dateSerch]);
    const token = localStorage.getItem("token");
    return (
      <>
      
        <h2>Pedidos terminados</h2>
        <input type="date" onChange={e=>setDateSerch(e.target.value)} />
        <Table>
          <thead>
            <tr>
              <th scope="col">Numero de mesa</th>
              <th scope="col">id</th>
              <th scope="col">fecha</th>
            </tr>
          </thead>
          <tbody>
            {ordenes.length > 0 &&
              ordenes.map((orden) => (
                <tr key={orden.id}>
                  
                  <td>{orden.tableNumber} </td>
                  <td> {orden.id_orden}</td>
                  <td> {orden.dateTime}</td>
                </tr>
              ))}
          </tbody>
        </Table >
      </>
    );
}

export default Aceptados