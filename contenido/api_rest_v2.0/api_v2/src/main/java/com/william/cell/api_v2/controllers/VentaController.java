package com.william.cell.api_v2.controllers;

import java.time.LocalDateTime;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.william.cell.api_v2.controllers.interfaces.BaseController;
import com.william.cell.api_v2.models.DTO.VentaDTO;
import com.william.cell.api_v2.models.entities.Venta;
import com.william.cell.api_v2.services.VentaService;

@RestController
@RequestMapping("/api/v2/venta")
public class VentaController extends BaseController<Venta, VentaDTO, Long>{
    
    @Autowired
    private VentaService ventaService;

    @GetMapping("/find/clienteId/{id}")
    public ResponseEntity<?> getVentaByClienteId(@PathVariable(name = "id") String id) {
        return ventaService.getByClienteId(id); 
    }

    @GetMapping("/find")
    public ResponseEntity<?> getVentaByFecha(@RequestParam(name = "fecha", required = true) LocalDateTime fecha) {
        return ventaService.getByFechaVenta(fecha);
    }
}   
