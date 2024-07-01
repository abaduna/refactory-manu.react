package com.menu.comida.DTO;

import com.menu.comida.models.All_ordenes;
import jakarta.persistence.*;
import lombok.Data;

import java.util.List;

@Data

public class PutchaseDTO {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private  long id;



    private  long id_orden;


    private  String table;


    private String dateTime;

    private List<All_ordenes> ordenes;

    @Data
    public static class ReqLogin {
        private String email;
        private String password;
    }
}
