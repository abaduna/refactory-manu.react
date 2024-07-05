package com.menu.comida.models;

import jakarta.persistence.*;
import lombok.Data;



@Data
@Entity
@Table(name ="ordenesdecomida")
public class Ordenes {


    @Id
    @Column(name = "id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private  long id;


    @Column(name ="id_orden")
    private  long id_orden;

    @Column(name ="table_number")
    private  String tableNumber;

    @Column(name ="date")
    private String dateTime;


    @Column(name ="estado")
    private String estados;
}
