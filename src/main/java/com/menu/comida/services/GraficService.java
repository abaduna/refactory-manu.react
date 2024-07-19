package com.menu.comida.services;

import com.menu.comida.DTO.GraficFoods;
import com.menu.comida.models.Ordenes;


import java.util.HashMap;
import java.util.List;

public interface GraficService {
     int[]  getGraficToMoth(String start,String end);
    HashMap<String, Integer> getAmount(String start, String end);
}
