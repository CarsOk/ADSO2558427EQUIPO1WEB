package com.api.william_cell.controllers;

import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.api.william_cell.converter.interfaces.EntityConverter;
import com.api.william_cell.models.dto.ProductoDto;
import com.api.william_cell.models.entity.Producto;
import com.api.william_cell.services.ProductService;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.GetMapping;

@RestController
@RequestMapping("/api/v1")
public class ProductoController implements IController<Producto, ProductoDto, Long>{

    private Map<String, Object> response = new LinkedHashMap<>();

    @Autowired
    ProductService productService;

    @Autowired
    @Qualifier("productConverter")
    EntityConverter<Producto, ProductoDto> converter;

    @PostMapping("/producto")
    public ProductoDto create(@RequestBody Producto producto) {
        return productService.saveEntity(producto);
    }

    @PutMapping("/producto/{id}")
    public ResponseEntity<?> update(@PathVariable(name = "id") Long id, @RequestBody Producto producto) {
        response.clear();
        try {

            if (!producto.getProduct_id().equals(id)) {
                response.put("mensaje", "El id del producto no se puede modificar");
                response.put("detalles", "El identicador de cada producto es único y no se puede modificar." +
                            " Intente agregar el mismo id de producto en el valor de la llave 'product_id' o elimine este producto y creelo nuevamente.");
                return new ResponseEntity<>(response, HttpStatus.BAD_REQUEST);
            }

            if (producto != null && producto.getProduct_id().equals(id)) {
                producto.setProduct_id(id);
                ProductoDto productoDto = productService.saveEntity(producto);
                return new ResponseEntity<>(productoDto, HttpStatus.OK);
            } else {
                response.put("mensaje", "Producto no encontrado");
                return new ResponseEntity<>(response, HttpStatus.NOT_FOUND);
            }

        } catch (DataIntegrityViolationException e) {
            response.put("mensaje", e.getMessage());
            return new ResponseEntity<>(response, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @DeleteMapping("producto/{id}")
    public ResponseEntity<?> delete(@PathVariable(name = "id") Long id) {
        response.clear();
        try {
            ProductoDto productodDto = productService.findEntityById(id);
            if (productodDto != null) {
                productService.deleteEntity(converter.toEntity(productodDto));
                response.put("mensaje", "Producto eliminado correctamente");
                return new ResponseEntity<>(response, HttpStatus.OK);
            } else {
                response.put("mensaje", "Producto no encontrado");
                response.put("detalles", "Id inexistente o invalido");
                return new ResponseEntity<>(response, HttpStatus.NOT_FOUND);
            }
        } catch (DataIntegrityViolationException e) {
            response.put("mensaje", e.getMessage());
            return new ResponseEntity<>(response, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping("/producto/{id}")
    public ResponseEntity<?> showById(@PathVariable(name = "id") Long id) {
        response.clear();
        try {
            ProductoDto productoDto = productService.findEntityById(id);
            if (productoDto != null) {
                return new ResponseEntity<>(productoDto, HttpStatus.FOUND);
            } else {
                response.put("mensaje", "No se pudo encontrar el producto.");
                return new ResponseEntity<>(response, HttpStatus.NOT_FOUND);
            }
        } catch (DataIntegrityViolationException e) {
            response.put("mensaje", e.getMessage());
            return new ResponseEntity<>(response, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping("/productos")
    public List<ProductoDto> findAll() {
        return productService.findAllEntities();
    }
    
    
}
