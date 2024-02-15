package com.william.cell.api_v2.services;

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
import com.william.cell.api_v2.models.DTO.DetalleVentaDTO;
import com.william.cell.api_v2.models.entities.DetalleVenta;
import com.william.cell.api_v2.repositories.DetalleVentaRepository;
import com.william.cell.api_v2.services.errors.ErrorResponses;

@Service
public class DetalleVentaService extends BaseService<DetalleVenta, DetalleVentaDTO, Long> {

    @Autowired
    private DetalleVentaRepository detalleVentaRepository;

    @Autowired
    @Qualifier("detalleVentaConverter")
    private EntityConverter<DetalleVenta, DetalleVentaDTO> detalleVentaConverter;

    @Override
    protected EntityConverter<DetalleVenta, DetalleVentaDTO> getEntityConverter() {
        return detalleVentaConverter;
    }

    @Override
    protected JpaRepository<DetalleVenta, Long> getRepository() {
        return detalleVentaRepository;
    }

    @Transactional(readOnly = true)
    public ResponseEntity<?> getByVentaId(Long ventaId) {
        try {
            List<DetalleVenta> detalleVenta = detalleVentaRepository.findByVentaId(ventaId);
            return new ResponseEntity<>(detalleVenta, HttpStatus.OK);
        } catch (DataAccessException e) {
            return ErrorResponses.internalServerError(e);
        }
    }

}
