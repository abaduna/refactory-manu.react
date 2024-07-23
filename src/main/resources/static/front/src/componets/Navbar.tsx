
import { useState } from "react";
import "../styles/Navbar.css";

function Navbarv2() {


  return (
    <nav>
  <ul>
      <li><a href="/">Menu</a></li>
      <li><a href="/admin">Admin</a></li>
      <li><a href="/admin/ordens"></a></li>
      <li><a href="/admin/aceptados/graficos">Graficos</a></li>
      <li><a href="/admin/ordens">Ordenes</a></li>
      <li><a href="/admin/pedidos">Pedidos</a></li>
      <li><a href="/admin/pedidos/aceptados">Aceptados</a></li>
      </ul>
      </nav>
  );
}

export default Navbarv2;
