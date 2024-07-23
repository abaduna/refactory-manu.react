import { ordenes } from "../types/types"
import { Productos } from "../types/types"
import React, { useEffect } from "react"
import  "../styles/toPrint.css"
   
interface ComponentToPrintProps {
    productos:Productos[]
    ordenes:ordenes
  }

  export const ComponentToPrint = React.forwardRef<HTMLDivElement, ComponentToPrintProps>((props, ref) => {
    const {productos,ordenes} = props
  let total = 0  
  for (let i = 0; i < productos.length; i++) {
         total =  total + +productos[i].price
        
    }
    
useEffect(()=>{
    
    
},[productos])
    return (
      <div ref={ref} className="print" >
        
      mesa:  {ordenes.tableNumber}<br/>
      direcion:{ordenes.address}
      <hr></hr>
        {productos.length > 0 && productos.map(producto=>(
            <p key={producto.id}>
                {producto.name}
            </p>
        ))}
        total: {total}
      </div>
    );
})
