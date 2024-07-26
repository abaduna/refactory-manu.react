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

    @Column(name ="phone")

    private Long phone;
    @Column(name ="address")
    private String address;

    @Column(name ="provincia")
    private String provincia;

    @Column(name ="city")
    private String city;

    @Column(name ="people")
    private String people;
}
