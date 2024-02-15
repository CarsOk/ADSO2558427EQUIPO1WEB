package com.william.cell.api_v2.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Service;

import com.william.cell.api_v2.converters.EntityConverter;
import com.william.cell.api_v2.models.DTO.ProductoDTO;
import com.william.cell.api_v2.models.entities.Producto;
import com.william.cell.api_v2.repositories.ProductoRepository;

@Service("productoService")
public class ProductoService extends BaseService<Producto, ProductoDTO, String> {

    @Autowired
    ProductoRepository productoRepository;

    @Autowired
    @Qualifier("productoConverter")
    EntityConverter<Producto, ProductoDTO> converter;

    @Override
    protected EntityConverter<Producto, ProductoDTO> getEntityConverter() {
        return converter;
    }

    @Override
    protected JpaRepository<Producto, String> getRepository() {
        return productoRepository;
    }

}
