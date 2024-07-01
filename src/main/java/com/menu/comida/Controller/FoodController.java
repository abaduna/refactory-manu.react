package com.menu.comida.Controller;

import com.menu.comida.models.Food;
import com.menu.comida.services.Foodservices;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.http.MediaType;


import java.io.IOException;
import java.util.List;




@RestController
@CrossOrigin(origins = "*")
public class FoodController {

    @Autowired
    private Foodservices foodservices;



    @GetMapping("api/food")
    public List<Food> get(){
       return foodservices.get();
    }
    @GetMapping("api/food/{id}")

    public Food get(@PathVariable String id){
        return foodservices.getByid(id);
    }
    @DeleteMapping("api/food/{id}")
    public String removeCustomers(@PathVariable String id){
       return foodservices.deleted(id);
    }

    @PutMapping("api/food/{id}")
    public String put(@PathVariable String id,@RequestBody Food food){
       return foodservices.put(food,id);
    }
    @PostMapping("/api/food")
    public String handleFileUpload(@RequestParam("file") MultipartFile file,@RequestParam("category") String category,
                                   @RequestParam("name") String name,@RequestParam("description") String description,
                                   @RequestParam("price") String price,@RequestParam("stock") Integer stock)
            throws IOException {
       return foodservices.uploadFile(file,category, name,description,price,stock);
    }


}
