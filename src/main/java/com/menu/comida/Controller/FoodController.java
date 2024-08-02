package com.menu.comida.Controller;

import com.menu.comida.models.Food;
import com.menu.comida.services.Foodservices;
import org.apache.commons.io.IOUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

import java.io.File;
import java.io.IOException;
import java.io.InputStream;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;

@RestController
@CrossOrigin(origins = "*")
public class FoodController {

    @Autowired
    private Foodservices foodservices;

    private final Path root = Paths.get("src/main/resources/picture");

    @GetMapping("api/food")
    public List<Food> get() {
        return foodservices.get();
    }

    @GetMapping("api/food/stock")
    public List<Food> getStack() {
        return foodservices.getStock();
    }

    @GetMapping("api/food/serch/{serch}")
    public List<Food> get(@PathVariable String serch) {
        return foodservices.getSerch(serch);
    }

    @DeleteMapping("api/food/{id}")
    public String removeCustomers(@PathVariable String id) {
        return foodservices.deleted(id);
    }

    @GetMapping("api/food/{id}")
    public Food GetCustomers(@PathVariable String id) {
        return foodservices.getByid(id);
    }

    @PutMapping("api/food/{id}")
    public String put(@PathVariable String id, @RequestBody Food food) {
        return foodservices.put(food, id);
    }

    @PostMapping("/api/food")
    public String handleFileUpload(@RequestParam("file") MultipartFile file, @RequestParam("category") String category,
                                   @RequestParam("name") String name, @RequestParam("description") String description,
                                   @RequestParam("price") String price, @RequestParam("stock") Integer stock)
            throws IOException {

        return foodservices.uploadFile(file, category, name, description, price, stock);
    }

    @GetMapping(value = "/api/food/image/{filename}", produces = MediaType.IMAGE_JPEG_VALUE)
    public @ResponseBody byte[] getImage(@PathVariable String filename) throws IOException {
        InputStream in = Files.newInputStream(this.root.resolve(filename));
        return IOUtils.toByteArray(in);
    }
}
