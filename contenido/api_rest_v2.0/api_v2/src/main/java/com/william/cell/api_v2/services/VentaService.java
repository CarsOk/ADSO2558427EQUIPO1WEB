package com.william.cell.api_v2.services;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.dao.DataAccessException;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.william.cell.api_v2.converters.EntityConverter;
import com.william.cell.api_v2.models.DTO.VentaDTO;
import com.william.cell.api_v2.models.entities.Venta;
import com.william.cell.api_v2.repositories.VentaRepository;
import com.william.cell.api_v2.services.errors.ErrorResponses;

@Service
public class VentaService extends BaseService<Venta, VentaDTO, Long> {

    @Autowired
    private VentaRepository repository;

    @Autowired
    @Qualifier("ventaConverter")
    private EntityConverter<Venta, VentaDTO> converter;

    @Override
    protected JpaRepository<Venta, Long> getRepository() {
        return repository;
    }

    @Override
    protected EntityConverter<Venta, VentaDTO> getEntityConverter() {
        return converter;
    }

    @Transactional(readOnly = true)
    public ResponseEntity<?> getByClienteId(String id) {
        try {

            List<Venta> ventas = repository.findByClienteId(id);

            if (ventas.isEmpty()) {
                return ErrorResponses.notFound();
            }

            return new ResponseEntity<>(ventas, HttpStatus.OK);
        } catch (DataAccessException e) {
            return ErrorResponses.internalServerError(e);
        }
    }

    public ResponseEntity<?> getByFechaVenta(LocalDateTime localDateTime) {
        List<Venta> ventas = repository.findByFechaVenta(localDateTime);

        try {

            if (ventas.isEmpty()) {
                return ErrorResponses.notFound();
            }

            return new ResponseEntity<>(ventas, HttpStatus.OK);

        } catch (DataAccessException e) {
            return ErrorResponses.internalServerError(e);
        }
    }

    public ResponseEntity<?> getByFechaVentaAndClienteId(LocalDateTime fechaVenta, String clienteId) {
        try {
            List<Venta> ventas = repository.findByFechaVentaAndClienteId(fechaVenta, clienteId);

            if (ventas.isEmpty()) {
                return ErrorResponses.notFound();
            }

            return new ResponseEntity<>(ventas, HttpStatus.OK);
        } catch (DataAccessException e) {
            return ErrorResponses.internalServerError(e);
        }
    }
}
