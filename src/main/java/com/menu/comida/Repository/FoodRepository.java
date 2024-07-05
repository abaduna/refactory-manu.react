package com.menu.comida.Repository;

import com.menu.comida.models.Food;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;


public interface FoodRepository extends  JpaRepository<Food, Long> {

    @Query("SELECT c FROM Food c WHERE c.name LIKE %:search%")
    List<Food> findByName(@Param("search") String search);
}
