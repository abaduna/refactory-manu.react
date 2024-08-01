package com.menu.comida.Repository;


import com.menu.comida.models.Ordenes;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import org.springframework.data.domain.Pageable;

import java.util.List;

public interface PurchaseRepository extends JpaRepository<Ordenes, Long> {
//SELECT c FROM User c WHERE c.email = :email AND c.password = :password
    @Query("SELECT o.id_orden FROM Ordenes o ORDER BY o.id DESC LIMIT 1")
    Long getid();

    @Query("SELECT c FROM Ordenes c WHERE c.estados = 'pedido' ORDER BY c.id DESC")
    List<Ordenes> findByestadoPedidos();
    @Query("SELECT c FROM Ordenes c WHERE c.estados = 'aceptado' ORDER BY c.id DESC")
    List<Ordenes> findByestadoAceptados(Pageable pageable);

    @Query("SELECT c FROM Ordenes c WHERE c.id_orden = :id_orden")
    Ordenes findByidOrden(@Param("id_orden") long id_orden);

    @Query("SELECT c FROM Ordenes c WHERE c.dateTime LIKE :serch% AND c.estados = 'aceptado'")
    List<Ordenes> findByidDate(@Param("serch") String serch);
}
