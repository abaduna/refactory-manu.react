package com.menu.comida.Controller;

import com.menu.comida.DTO.GraficFoods;
import com.menu.comida.models.Ordenes;
import com.menu.comida.services.GraficService;
import com.menu.comida.services.PurchaseService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;

@RestController
@CrossOrigin(origins = "*")
public class GraficController {

    @Autowired
    private GraficService graficService;
    @GetMapping("api/grafic/moth/")
    public int[] getGraficToMoth( @RequestParam String start,  @RequestParam String end){
            return  graficService.getGraficToMoth(start,end);
    }
    @GetMapping("api/amount")
    public HashMap<String, Integer> getAmount(@RequestParam String start, @RequestParam String end){
        return  graficService.getAmount(start,end);
    }
}
