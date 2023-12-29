package com.api.william_cell.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataAccessException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.api.william_cell.controllers.errors.ControllerResponses;
import com.api.william_cell.models.dto.ProductoDto;
import com.api.william_cell.models.dto.VentaDto;
import com.api.william_cell.models.entity.Venta;
import com.api.william_cell.services.ProductService;
import com.api.william_cell.services.VentaService;

@RestController
public class VentaController extends ControllerResponses<Venta> implements BaseController<Venta, VentaDto, Long> {

    @Autowired
    VentaService ventaService;

    @Autowired
    ProductService productService;

    @Override
    @PostMapping("/venta")
    public ResponseEntity<?> create(@RequestBody Venta entity) {
        try {
            ProductoDto productoDto = productService.findEntityById(entity.getProducto().getProduct_id());
            if ((productoDto.getProduct_cant() - entity.getVenta_cantidad()) >= 0) {
                entity.setVenta_total(productoDto.getProduct_precio() * entity.getVenta_cantidad());
                productService.updateProductCant(productoDto.getProduct_cant() - entity.getVenta_cantidad(), productoDto.getProduct_id());
                return new ResponseEntity<>(ventaService.saveEntity(entity), HttpStatus.CREATED);
            } 
            response.put("mensaje", "Producto agotado");
            return new ResponseEntity<>(response, HttpStatus.BAD_REQUEST);
        } catch (DataAccessException e) {
            response.put("mensaje", e.getMessage());
            return new ResponseEntity<>(response, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @Override
    public ResponseEntity<?> update(Long id, Venta entity) {
        // TODO Auto-generated method stub
        throw new UnsupportedOperationException("Unimplemented method 'update'");
    }

    @Override
    public ResponseEntity<?> delete(Long id) {
        // TODO Auto-generated method stub
        throw new UnsupportedOperationException("Unimplemented method 'delete'");
    }

    @Override
    public ResponseEntity<?> showById(Long id) {
        // TODO Auto-generated method stub
        throw new UnsupportedOperationException("Unimplemented method 'showById'");
    }

    @Override
    public List<VentaDto> findAll() {
        // TODO Auto-generated method stub
        throw new UnsupportedOperationException("Unimplemented method 'findAll'");
    }
    
}
