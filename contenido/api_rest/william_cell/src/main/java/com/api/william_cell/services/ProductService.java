package com.api.william_cell.services;

import java.util.List;
import java.util.stream.StreamSupport;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Service;

import com.api.william_cell.converter.interfaces.EntityConverter;
import com.api.william_cell.models.dto.ProductoDto;
import com.api.william_cell.models.entity.Producto;
import com.api.william_cell.repositories.ProductRepository;

@Service("productService")
public class ProductService implements IService<Producto, ProductoDto, Long> {

    @Autowired
    @Qualifier("productConverter")
    private EntityConverter<Producto, ProductoDto> productConverter;

    @Autowired
    private ProductRepository productRepository;

    @Override
    public void deleteEntity(Producto entity) {
        productRepository.delete(entity);
    }

    @Override
    public ProductoDto saveEntity(Producto entity) {
        return productConverter.toDto(productRepository.save(entity));
    }

    @Override
    public List<ProductoDto> findAllEntities() {
        List<Producto> productos = productRepository.findAll();
        
        return StreamSupport.stream(productos.spliterator(), false)
            .map(productConverter::toDto).toList();
    }

    @Override
    public ProductoDto findEntityById(Long id) {
        return productConverter.toDto(productRepository.findById(id).orElse(null));
    }
    
}
