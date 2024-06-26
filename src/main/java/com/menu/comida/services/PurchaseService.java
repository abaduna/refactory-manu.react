package com.menu.comida.services;

import com.menu.comida.DTO.PutchaseDTO;
import com.menu.comida.models.All_ordenes;
import com.menu.comida.models.Food;
import com.menu.comida.models.Ordenes;

import java.time.LocalDateTime;
import java.util.List;

public interface PurchaseService {
    List<Ordenes> get();

    String deleted(String id);
    String put(PutchaseDTO ordenes, Long id_orden);
    String post(PutchaseDTO ordenes);
}
