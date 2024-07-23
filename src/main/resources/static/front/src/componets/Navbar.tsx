import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import "../styles/Navbar.css"
import { Link } from 'react-router-dom';
function Navbarv2() {
  return (
    <Navbar>
    <Container className='navbarvdos'>
      <Navbar.Brand >Menu</Navbar.Brand>
      <Navbar.Toggle/>
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="me-auto">

          {/* <Nav.Link ><Link to="/admin">Admin</Link></Nav.Link>
          <Nav.Link ><Link to="/admin/ordens">Realizar pedido</Link></Nav.Link>
          <Nav.Link ><Link to="/admin/pedidos">Pedidos</Link></Nav.Link>
          <Nav.Link ><Link to="/admin/pedidos/aceptados">Historial</Link></Nav.Link>
          <Nav.Link ><Link to="/admin/pedidos/aceptados/grafico">Grafico</Link></Nav.Link> */}
        </Nav>
      </Navbar.Collapse>
    </Container>
  </Navbar>
  )
}

export default Navbarv2