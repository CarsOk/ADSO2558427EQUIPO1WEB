package com.william.cell.api_v2.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.william.cell.api_v2.controllers.interfaces.BaseController;
import com.william.cell.api_v2.models.DTO.DetalleVentaDTO;
import com.william.cell.api_v2.models.entities.DetalleVenta;
import com.william.cell.api_v2.services.DetalleVentaService;

@RestController
@RequestMapping("/api/v2/detalleVenta")
public class DetalleVentaController extends BaseController<DetalleVenta, DetalleVentaDTO, Long> {
    
    @Autowired
    private DetalleVentaService detalleVentaService;

    @GetMapping("/findByVenta/{id}")
    public ResponseEntity<?> getVentaId(@PathVariable("id") Long id) {
        return detalleVentaService.getByVentaId(id);
    }
}
