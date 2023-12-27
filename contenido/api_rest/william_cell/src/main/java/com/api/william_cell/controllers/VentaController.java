package com.api.william_cell.controllers;

import java.util.List;

import org.springframework.http.ResponseEntity;

import com.api.william_cell.models.dto.VentaDto;
import com.api.william_cell.models.entity.Venta;

public class VentaController implements IController<Venta, VentaDto, Long> {

    @Override
    public VentaDto create(Venta entity) {
        // TODO Auto-generated method stub
        throw new UnsupportedOperationException("Unimplemented method 'create'");
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
