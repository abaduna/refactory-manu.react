



import React, { useState } from "react";
import  "../styles/ComponentAdminFood.css"
import { useFetch } from "../hock/useFetch";
function ComponentAdminFood({
  name,
  price,
  link_img,
  id,
  setUpdate,
  updata,
  category,
  stock,
  description
}: any) {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const { deletID } = useFetch();
  const [successful, setSuccessful] = useState<boolean>(false);
  const handleDeleteClick = (
    e: React.FormEvent<HTMLFormElement>,
    id: string
  ) => {
    e.preventDefault();
    console.log(`deletID`);

    deletID(id);

    setUpdate(!updata);
    setSuccessful(true);
    setTimeout(() => {
      setSuccessful(false);
    }, 500);
  };
  return (
    <>
      {successful && <span>Eliminado con exito</span>}
      <div className="fooditem">
        <form onSubmit={(e) => handleDeleteClick(e, id as string)} className="formularinputFood">
        <h1>{name}</h1>
        <p>
          {price}-{category}<br/>
          Stock:{stock}<br/>
          {description}
        </p>
        <img src={link_img} />
        <div className="btndeletdform">
         <button  className="btndelet" type="submit">Eliminar</button> 
        </div>
        
        {/* <Link  className="link" hrtoef={`/admin/formulario/${id}`}>Actualizar</Link> */}
      </form>
      </div>
      
    </>
  );
}

export default ComponentAdminFood;
