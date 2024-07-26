package com.menu.comida.services;

import com.menu.comida.Repository.FoodRepository;
import com.menu.comida.models.Food;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

@SpringBootApplication
public class FoodServicesImp implements Foodservices{

    @Autowired
    private FoodRepository repository;
    @Override
    public List<Food> get() {
        return repository.findByStack();
    }

    @Override
    public List<Food> getStock() {
        return repository.findAll();
    }

    @Override
    public Food getByid(String id) {

        Optional<Food> optional  =   repository.findById(Long.parseLong(id));
        if (optional.isPresent()) {
            return optional.get();
        }
        return null;
    }

    @Override
    public String deleted(String id) {
        try {
            repository.deleteById(Long.parseLong(id));
            return  "successfully deleted";
        }catch (Exception  e){

            System.out.println(e);
            return "Error";
        }

    }


    @Override
    public String put(Food food, String id) {
        try {
            food.setId(Long.parseLong(id));
            repository.save(food);
            return  "successfully put";
        }catch (Exception  e){

            System.out.println(e);
            return "Error";
        }
    }
    private final String UPLOAD_DIR = "src/main/resources/picture";
    @Override
    public String  uploadFile(MultipartFile file,String category,String name,  String description, String price,Integer stock) {
        Food food = new Food();
        food.setCategory(category);
        food.setName(name);
        food.setDescription(description);
        food.setPrice(Integer.valueOf(price));
        food.setStock(stock);
        try {
            String fileName = UUID.randomUUID().toString();
            byte[] bytes = file.getBytes();
            String fileOriginalName = file.getOriginalFilename();


            long maxFileSize = 50*1024*1024;

            if (!fileOriginalName.endsWith(".jpg") &&!fileOriginalName.endsWith(".png") && !fileOriginalName.endsWith(".jpeg")) {
                return "only jpg,jpeg y png files are alloerd";
            }
            String fileExtension = fileOriginalName.substring(fileOriginalName.lastIndexOf("."));
            String newFileName = fileName + fileExtension;
            File folder = new File("src/main/resources/picture");
            if (!folder.exists()) {
                folder.mkdirs();
            }
            Path path = Paths.get("src/main/resources/static/picture/"+ newFileName);
            food.setLink_img("http://localhost:8080/picture/" + newFileName);
            Files.write(path,bytes);
            repository.save(food);
            return  "successfully post";
        }catch (Exception  e){

            System.out.println(e);
            return "Error";
        }
    }

    @Override
    public String updateStock(String id,Integer stock) {
        try {
            Optional<Food> food = repository.findById(Long.parseLong(id));
            if (food.isPresent()) {
                food.get().setStock(stock);
                repository.save(food.get());
                return "update sucefully";
            }
            return "error";
        } catch (Exception e) {
            System.out.println(e);
            return "error";
        }
    }

    @Override
    public List<Food> getSerch(String serch) {
        return repository.findByName(serch);
    }

}
