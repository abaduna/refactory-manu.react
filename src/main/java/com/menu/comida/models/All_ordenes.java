package com.menu.comida.models;


import jakarta.persistence.*;
import lombok.Data;

@Data
@Entity
@Table(name ="all_ordenes")
public class All_ordenes {

    @Id
    @Column(name = "id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private  long id;

    @Column(name ="id_orden")
    private  long id_orden;

    @Column(name ="product")
    private  String product;

    @Column(name ="price")
    private  String price;
}
