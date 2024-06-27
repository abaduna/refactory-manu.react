package com.menu.comida.services;

import com.menu.comida.DTO.PutchaseDTO;
import com.menu.comida.models.All_ordenes;
import com.menu.comida.models.Ordenes;

import java.util.List;

public interface PurchaseService {
    List<Ordenes> get();
    List<All_ordenes> getAllOrdenes(Long id_order);
    String deleted(String id);
    String put(PutchaseDTO ordenes, Long id_orden);
    String post(PutchaseDTO ordenes);

}
