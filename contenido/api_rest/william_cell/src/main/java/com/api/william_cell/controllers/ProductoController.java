package com.api.william_cell.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.dao.DataAccessException;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.api.william_cell.controllers.response.ControllerResponses;
import com.api.william_cell.converter.interfaces.EntityConverter;
import com.api.william_cell.models.dto.ProductoDto;
import com.api.william_cell.models.entity.Producto;
import com.api.william_cell.services.ProductService;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.GetMapping;

@RestController
public class ProductoController extends ControllerResponses<Producto>
        implements BaseController<Producto, ProductoDto, String> {

    @Autowired
    ProductService productService;

    @Autowired
    @Qualifier("productConverter")
    EntityConverter<Producto, ProductoDto> converter;

    @Override
    @PostMapping("/producto")
    public ResponseEntity<?> create(@RequestBody Producto producto) {
        try {
            return new ResponseEntity<>(productService.saveEntity(producto), HttpStatus.CREATED);
        } catch (DataAccessException e) {
            return internalServerError(e);
        }
    }

    @Override
    @PutMapping("/producto/{id}")
    public ResponseEntity<?> update(@PathVariable(name = "id") String id, @RequestBody Producto producto) {
        try {
            if (!producto.getProduct_id().equals(id)) {
                return nonModifiableId(producto);
            }

            if (producto != null && producto.getProduct_id().equals(id)) {
                producto.setProduct_id(id);
                ProductoDto productoDto = productService.saveEntity(producto);
                return new ResponseEntity<>(productoDto, HttpStatus.OK);
            } else {
                return idNotFound();
            }

        } catch (DataIntegrityViolationException e) {
            return internalServerError(e);
        }
    }

    @Override
    @DeleteMapping("producto/{id}")
    public ResponseEntity<?> delete(@PathVariable(name = "id") String id) {
        try {
            ProductoDto productodDto = productService.findEntityById(id);
            if (productodDto != null) {
                productService.deleteEntity(converter.toEntity(productodDto));
                return successfullyDeleted();
            } else {
                return idNotFound();
            }
        } catch (DataIntegrityViolationException e) {
            return internalServerError(e);
        }
    }

    @Override
    @GetMapping("/producto/{id}")
    public ResponseEntity<?> showById(@PathVariable(name = "id") String id) {
        try {
            ProductoDto productoDto = productService.findEntityById(id);
            if (productoDto != null) {
                return new ResponseEntity<>(productoDto, HttpStatus.FOUND);
            } else {
                return idNotFound();
            }
        } catch (DataIntegrityViolationException e) {
            return internalServerError(e);
        }
    }

    @Override
    @GetMapping("/productos")
    public List<ProductoDto> findAll() {
        return productService.findAllEntities();
    }

}
