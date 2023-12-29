package com.api.william_cell.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataAccessException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.api.william_cell.controllers.response.ControllerResponses;
import com.api.william_cell.converter.VentaConverter;
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

    @Autowired
    VentaConverter ventaConverter;

    @Override
    @PostMapping("/venta")
    public ResponseEntity<?> create(@RequestBody Venta entity) {
        try {
            ProductoDto productoDto = productService.findEntityById(entity.getProducto().getProduct_id());
            if ((productoDto.getProduct_cant() - entity.getVenta_cantidad()) >= 0) {
                entity.setVenta_total(productoDto.getProduct_precio() * entity.getVenta_cantidad());
                productService.updateProductCant(productoDto.getProduct_cant() - entity.getVenta_cantidad(),
                        productoDto.getProduct_id());
                return new ResponseEntity<>(ventaService.saveEntity(entity), HttpStatus.CREATED);
            }
            return soldOut();
        } catch (DataAccessException e) {
            return internalServerError(e);
        }
    }

    @Override
    @PutMapping("/venta/{id}")
    public ResponseEntity<?> update(@PathVariable(name = "id") Long id, @RequestBody Venta entity) {
        try {
            if (!entity.getVenta_id().equals(id)) {
                return nonModifiableId(entity);
            }
            if (entity != null & entity.getVenta_id().equals(id)) {
                return new ResponseEntity<>(ventaService.saveEntity(entity), HttpStatus.ACCEPTED);
            } else {
                return idNotFound();
            }
        } catch (DataAccessException e) {
            return internalServerError(e);
        } catch (NullPointerException e) {
            return badRequest(e);
        }
    }

    @Override
    public ResponseEntity<?> delete(Long id) {
        try {
            if (ventaService.findEntityById(id) != null) {
                Venta venta = ventaConverter.toEntity(ventaService.findEntityById(id));
                ventaService.deleteEntity(venta);
                return new ResponseEntity<>(successfullyDeleted(), HttpStatus.OK);
            } else {
                return idNotFound();    
            }
        } catch (DataAccessException e) {
            return internalServerError(e);
        }
    }

    @Override
    public ResponseEntity<?> showById(Long id) {
        try {
            if (ventaService.findEntityById(id) != null) {
                return new ResponseEntity<>(ventaService.findEntityById(id), HttpStatus.FOUND);
            } else {
                return idNotFound();
            }
        } catch (DataAccessException e) {
            return internalServerError(e);
        }
    }

    @Override
    public List<VentaDto> findAll() {
        return ventaService.findAllEntities();
    }

}
