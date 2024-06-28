package com.menu.comida.services;

import com.menu.comida.models.Food;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.multipart.MultipartFile;

import java.io.InputStream;
import java.util.List;
import java.util.Optional;

public interface Foodservices {
     List<Food> get();
     Food getByid(String id);
     String deleted(String id);
     String put(Food food,String id);
     String uploadFile(MultipartFile file, String category,String name,  String description, String price,Integer stock);
     String updateStock(String id,Integer stock);
}
