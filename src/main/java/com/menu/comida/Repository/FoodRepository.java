package com.menu.comida.Repository;

import com.menu.comida.models.Food;
import org.springframework.data.jpa.repository.JpaRepository;

public interface FoodRepository extends  JpaRepository<Food, Long> {
}
