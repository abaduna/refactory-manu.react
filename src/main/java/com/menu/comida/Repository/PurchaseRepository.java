package com.menu.comida.Repository;

import com.menu.comida.models.Food;
import com.menu.comida.models.Ordenes;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PurchaseRepository extends JpaRepository<Ordenes, Long> {
}
