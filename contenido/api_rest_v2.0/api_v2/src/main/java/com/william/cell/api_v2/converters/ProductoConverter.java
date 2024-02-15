package com.william.cell.api_v2.converters;

import org.springframework.stereotype.Component;

import com.william.cell.api_v2.models.DTO.ProductoDTO;
import com.william.cell.api_v2.models.entities.Producto;

@Component("productoConverter")
public class ProductoConverter implements EntityConverter<Producto, ProductoDTO> {

    @Override
    public Producto toEntity(ProductoDTO dto) {
        if (dto == null) {
            return null;
        }

        Producto producto = Producto.builder()
                .productoId(dto.getProductoId())
                .nombre(dto.getNombre())
                .stockActual(dto.getStockActual())
                .precio(dto.getPrecio())
                .descripcion(dto.getDescripcion())
                .build();

        return producto;
    }

    @Override
    public ProductoDTO toDto(Producto entity) {

        if (entity == null) {
            return null;
        }

        ProductoDTO productoDTO = ProductoDTO.builder()
                .productoId(entity.getProductoId())
                .nombre(entity.getNombre())
                .stockActual(entity.getStockActual())
                .precio(entity.getPrecio())
                .descripcion(entity.getDescripcion())
                .build();

        return productoDTO;
    }

}
