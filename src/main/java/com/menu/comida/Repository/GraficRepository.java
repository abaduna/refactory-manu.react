package com.menu.comida.Repository;

import com.menu.comida.models.Ordenes;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface GraficRepository  extends JpaRepository<Ordenes, Long> {

    @Query("FROM Ordenes o WHERE o.dateTime BETWEEN :start AND :end")
    List<Ordenes> findByMonth(@Param("start") String start, @Param("end") String endDate);


}
