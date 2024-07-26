package com.menu.comida.services;


import com.menu.comida.DTO.GraficFoods;
import com.menu.comida.Repository.All_ordenesRepository;
import com.menu.comida.Repository.FoodRepository;
import com.menu.comida.Repository.GraficRepository;
import com.menu.comida.models.All_ordenes;
import com.menu.comida.models.Food;
import com.menu.comida.models.Ordenes;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Objects;

@SpringBootApplication
public class GraficImp implements GraficService {

    @Autowired
    private GraficRepository graficRepository;

    @Autowired
    private FoodRepository foodRepository;

    @Autowired
    private All_ordenesRepository all_ordenesRepository;

    @Override
    public int[] getGraficToMoth(String start, String end) {
        int[] diasDelMes = new int[31];
        List<Ordenes> pedisdos = graficRepository.findByMonth(start,end);
        // Formato de fecha para analizar la cadena
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss");
        for (Ordenes item : pedisdos) {
            LocalDateTime fecha = LocalDateTime.parse(item.getDateTime(), formatter);
            int dia = fecha.getDayOfMonth(); // Obtener el día del mes (1-31)
            diasDelMes[dia - 1]++; // Incrementar el contador en la posición correspondiente
        }

        return  diasDelMes;
    }

    @Override
    public HashMap<String, Integer> getAmount(String start, String end) {

        List<Ordenes> pedisdos = graficRepository.findByMonth(start,end);

        List<Food> foods = foodRepository.findAll();
        List<All_ordenes> allFoods = new ArrayList<>();
        List<GraficFoods>  graficFoodsList = new ArrayList<>();

        for (Ordenes orden : pedisdos) {
            List<All_ordenes> productos = all_ordenesRepository.getAllOrdenes(orden.getId_orden());
            allFoods.addAll(productos);

        }
        HashMap<String, Integer> foodCountMap = new HashMap<>();
        for (All_ordenes ordenes: allFoods){
           for(Food food:foods){
               if (Objects.equals(food.getName(), ordenes.getName())) {
                   foodCountMap.put(food.getName(), foodCountMap.getOrDefault(food.getName(), 0) + 1);
               }
           }
        }
        return foodCountMap;
    }

    @Override
    public Integer getTotal(String start, String end) {
        Integer contador = 0;
        List<Ordenes> pedisdos = graficRepository.findByMonth(start,end);
        for (Ordenes item : pedisdos) {
            List<All_ordenes> productos = all_ordenesRepository.getAllOrdenes(item.getId_orden());
            for(All_ordenes pedido: productos){
                contador = contador + Integer.valueOf(pedido.getPrice());
            }
        }
        return contador;
    }
}
