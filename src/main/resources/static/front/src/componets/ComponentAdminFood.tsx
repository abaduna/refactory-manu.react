import React, { useState } from "react";
import "../styles/ComponentAdminFood.css";
import { useFetch } from "../hock/useFetch";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
function ComponentAdminFood({
  name,
  price,
  link_img,
  id,
  setUpdate,
  updata,
  category,
  stock,
  description,
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
  console.log("id", id);
  return (
    <>
      {successful && <span>Eliminado con exito</span>}
      <div className="fooditem">
        <form
          onSubmit={(e) => handleDeleteClick(e, id as string)}
          className=""
        >
          <Card>
            <Card.Img variant="top" src={link_img} />
            <Card.Body>
              <Card.Title> {name}</Card.Title>
              <Card.Text>
                <p>
                  {price}-{category}
                  <br />
                  Stock:{stock}
                  <br />
                  {description}
                </p>
              </Card.Text>
              <div className="btndeletdform">
                <button  type="submit" className="btndelet">
                  Eliminar
                </button>
                
              </div>

              <a className="link" href={`admin/formulario/${id}`}>
                actualizar
              </a>
            </Card.Body>
          </Card>
        </form>
      </div>
    </>
  );
}

export default ComponentAdminFood;
