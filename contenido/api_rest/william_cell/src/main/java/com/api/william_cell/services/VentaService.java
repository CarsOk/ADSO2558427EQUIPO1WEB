package com.api.william_cell.services;

import java.util.List;
import java.util.stream.StreamSupport;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.api.william_cell.converter.interfaces.EntityConverter;
import com.api.william_cell.models.dto.VentaDto;
import com.api.william_cell.models.entity.Venta;
import com.api.william_cell.repositories.VentaRepository;

@Service
public class VentaService implements IService<Venta, VentaDto, Long> {

    @Autowired
    @Qualifier("ventaConverter")
    EntityConverter<Venta, VentaDto> converter;

    @Autowired
    VentaRepository ventaRepository;

    @Transactional
    @Override
    public void deleteEntity(Venta entity) {
        ventaRepository.delete(entity);
    }

    @Override
    @Transactional
    public VentaDto saveEntity(Venta entity) {
        return converter.toDto(ventaRepository.save(entity));
    }

    @Override
    public List<VentaDto> findAllEntities() {
        List<Venta> ventas = ventaRepository.findAll();
        return StreamSupport.stream(ventas.spliterator(), false).map(converter::toDto).toList();
    }

    @Override
    public VentaDto findEntityById(Long id) {
        return converter.toDto(ventaRepository.findById(id).orElse(null));
    }
    
}
