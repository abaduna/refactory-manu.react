package com.menu.comida.Repository;

import com.menu.comida.models.All_ordenes;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.data.jpa.repository.Query;
import java.util.List;

public interface All_ordenesRepository extends JpaRepository<All_ordenes, Long> {

    @Query("SELECT c FROM All_ordenes c WHERE c.id_orden = :id_order")
     List<All_ordenes> getAllOrdenes(@Param("id_order") Long id_order);


}
