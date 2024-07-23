import { Menu } from "../types/types";
import "../styles/ComponetFood.css";

import Card from 'react-bootstrap/Card';

const ComponetFood = ({
  name,
  price,
  link_img,
  category,
  setCarrito = any,
  removeProduct = any,
}: Menu) => {
  const product = {
    name,
    price,
  };
  console.log(link_img);
  return (
    <>
    <Card style={{ width: '18rem' }}>
      <Card.Img variant="top" src={link_img} alt={name}  />
      <Card.Body>
        <Card.Title>{name} </Card.Title>
        <Card.Text>
        <span className="price">{price}$</span>
        </Card.Text>
        <button
            onClick={() => setCarrito((prev) => [...prev, product])}
            className="addButton"
          >
            Agregar
          </button>
          <button
            onClick={() => removeProduct(product)}
            className="removeButton"
          >
            Quitar
          </button>
      </Card.Body>
    </Card>
    
    </>
  );
};

export default ComponetFood;
