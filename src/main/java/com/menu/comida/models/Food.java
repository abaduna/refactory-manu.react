package com.menu.comida.models;


import jakarta.persistence.*;
import lombok.Data;

@Data
@Entity
@Table(name ="food")
public class Food {
    @Id
    @Column(name = "id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private  long id;

    @Column(name ="name")
    private  String name;

    @Column(name = "category")
    private String category;

    @Column(name = "static/picture")
    private String link_img;

    @Column(name = "description")
    private String description;

    @Column(name = "price")
    private Integer price;

    @Column(name = "stock")
    private Integer stock;
}
