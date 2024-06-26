package com.menu.comida.Controller;


import com.menu.comida.DTO.PutchaseDTO;
import com.menu.comida.models.Food;
import com.menu.comida.models.Ordenes;
import com.menu.comida.services.PurchaseService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

@RestController
@CrossOrigin(origins = "*")
public class PutchaseFoodsControllers {
    @Autowired
    private PurchaseService purchaseService;


    @GetMapping("api/ordenes")
    public List<Ordenes> get(){
        return purchaseService.get();
    }

    @DeleteMapping("api/ordenes/{id}")
    public String removeCustomers(@PathVariable String id){
        return purchaseService.deleted(id);
    }

    @PutMapping("api/ordenes/{id}")
    public String put(@PathVariable Long id_orden,@RequestBody PutchaseDTO ordenes){
        return purchaseService.put(ordenes,id_orden);
    }
    @PostMapping("/api/ordenes")
    public String handleFileUpload(@RequestBody PutchaseDTO ordenes)  {
        System.out.println("putController " + ordenes.getDateTime());
        return purchaseService.post(ordenes);
    }

}
