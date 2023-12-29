package com.api.william_cell.services;

import java.util.List;
import java.util.stream.StreamSupport;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.api.william_cell.converter.interfaces.EntityConverter;
import com.api.william_cell.models.dto.ProductoDto;
import com.api.william_cell.models.entity.Producto;
import com.api.william_cell.repositories.ProductRepository;

@Service("productService")
public class ProductService implements IService<Producto, ProductoDto, String> {

    @Autowired
    @Qualifier("productConverter")
    private EntityConverter<Producto, ProductoDto> productConverter;

    @Autowired
    private ProductRepository productRepository;

    @Transactional
    @Override
    public void deleteEntity(Producto entity) {
        productRepository.delete(entity);
    }

    @Transactional
    @Override
    public ProductoDto saveEntity(Producto entity) {
        return productConverter.toDto(productRepository.save(entity));
    }

    @Transactional(readOnly = true)
    @Override
    public List<ProductoDto> findAllEntities() {
        List<Producto> productos = productRepository.findAll();
        
        return StreamSupport.stream(productos.spliterator(), false)
            .map(productConverter::toDto).toList();
    }

    @Transactional(readOnly = true)
    @Override
    public ProductoDto findEntityById(String id) {
        return productConverter.toDto(productRepository.findById(id).orElse(null));
    }
    
    @Transactional
    public int updateProductCant(Integer n_product_cant, String product_id) {
       return productRepository.updateProductCant(n_product_cant, product_id);
    }

}
