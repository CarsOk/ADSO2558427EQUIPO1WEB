package com.api.william_cell.converter;

import org.springframework.stereotype.Component;

import com.api.william_cell.converter.interfaces.EntityConverter;
import com.api.william_cell.models.dto.ProductoDto;
import com.api.william_cell.models.entity.Producto;

@Component("productConverter")
public class ProductConverter implements EntityConverter<Producto, ProductoDto> {

    @Override
    public Producto toEntity(ProductoDto dto) {

        if (dto == null) {
            return null;
        }
        return Producto.builder()
            .product_id(dto.getProduct_id())
            .product_nombre(dto.getProduct_nombre())
            .product_precio(dto.getProduct_precio())
            .product_cant(dto.getProduct_cant())
            .build();
    }

    @Override
    public ProductoDto toDto(Producto entity) {

        if (entity == null) {
            return null;
        }

        return ProductoDto.builder()
            .product_id(entity.getProduct_id())
            .product_nombre(entity.getProduct_nombre())
            .product_cant(entity.getProduct_cant())
            .product_precio(entity.getProduct_precio())
            .build();
    }
    
}
