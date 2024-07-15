package com.menu.comida.services;

import com.menu.comida.DTO.PutchaseDTO;
import com.menu.comida.Repository.All_ordenesRepository;
import com.menu.comida.Repository.PurchaseRepository;
import com.menu.comida.models.All_ordenes;
import com.menu.comida.models.Food;
import com.menu.comida.models.Ordenes;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;


@SpringBootApplication
public class PurchaseServiceImp implements PurchaseService{

    @Autowired
    private PurchaseRepository purchaseRepository;

    @Autowired
    private All_ordenesRepository all_ordenesRepository;

    @Override
    public List<Ordenes> get() {

        return purchaseRepository.findByestadoPedidos();
    }
    public List<Ordenes> getAceptados() {

        return purchaseRepository.findByestadoAceptados();
    }

    @Override
    public String postAceptados(Long id_order) {
        try{

            Ordenes ordness =  purchaseRepository.findByidOrden(id_order);

            ordness.setId_orden(id_order);
            ordness.setEstados("aceptado");

            purchaseRepository.save(ordness);
            return "successfully postAceptados";
        }catch (Exception e){
            System.out.println(e);
            return "error";
        }

    }

    @Override
    public List<All_ordenes> getAllOrdenes(Long id_order) {
        return all_ordenesRepository.getAllOrdenes(id_order);
    }


    @Override
    public String deleted(String id) {
        try{
            purchaseRepository.deleteById(Long.parseLong(id));
            return "deleted successfully";
        }catch (Exception e){
            System.out.println(e);
            return "Error";
        }

    }

    @Override
    public String put(PutchaseDTO ordenes, Long id_orden) {
        try {
            Ordenes ord1 = new Ordenes();
            System.out.println("serImpl " + ordenes.getDateTime());
            ord1.setDateTime(ordenes.getDateTime());
            ord1.setId_orden(id_orden);
            ord1.setTableNumber(ordenes.getTable());
            ordenes.getOrdenes().forEach(orden -> {
                All_ordenes all_ordenes = new All_ordenes();
                all_ordenes.setProduct(orden.getProduct());
                all_ordenes.setId_orden(id_orden);
                all_ordenes.setPrice(orden.getPrice());
                all_ordenesRepository.save(all_ordenes);

            });
            purchaseRepository.save(ord1);
            return "Successfully put";

        }catch (Exception e){
            System.out.println(e);
            return "Error";
        }
    }
    @Override
    public Long prueva(){
       return purchaseRepository.getid();
    }

    @Override
    public List<Ordenes> getAceptadosSerch(String serch) {
        String date =  serch;
        return purchaseRepository.findByidDate(date);
    }

    @Override
    public String post(PutchaseDTO ordenes) {
        try {
            Ordenes ord1 = new Ordenes();
            ord1.setDateTime(ordenes.getDateTime());
            ord1.setPhone(ordenes.getPhone());
          long id_orden = purchaseRepository.getid() + 1;
            ord1.setId_orden(id_orden);
            ord1.setTableNumber(ordenes.getTable());
            ord1.setEstados(ordenes.getEstados());
            ordenes.getOrdenes().forEach(orden -> {
                All_ordenes all_ordenes = new All_ordenes();
                all_ordenes.setProduct(orden.getProduct());
                all_ordenes.setId_orden(id_orden);
                System.out.println("getId_orden "+all_ordenes.getId_orden());
                all_ordenes.setPrice(orden.getPrice());
                System.out.println(all_ordenes);
                all_ordenesRepository.save(all_ordenes);

            });
            purchaseRepository.save(ord1);
            return "Successfully post";

        }catch (Exception e){
            System.out.println(e);
            return "Error " + e;
        }
    }


}
