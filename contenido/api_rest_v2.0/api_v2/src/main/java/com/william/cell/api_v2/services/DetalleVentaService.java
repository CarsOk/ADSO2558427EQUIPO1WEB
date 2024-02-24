package com.william.cell.api_v2.services;

import java.math.BigDecimal;
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
import com.william.cell.api_v2.models.DTO.ProductoDTO;
import com.william.cell.api_v2.models.entities.DetalleVenta;
import com.william.cell.api_v2.models.entities.Producto;
import com.william.cell.api_v2.repositories.DetalleVentaRepository;
import com.william.cell.api_v2.services.errors.ErrorResponses;

@Service
public class DetalleVentaService extends BaseService<DetalleVenta, DetalleVentaDTO, Long> {

    @Autowired
    private ProductoService productoService;

    @Autowired
    @Qualifier("productoConverter")
    private EntityConverter<Producto, ProductoDTO> productoConverter;

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

    @Override
    public ResponseEntity<?> postEntity(DetalleVentaDTO dto) {
        try {
            Producto producto = (Producto) productoService.getById(dto.getProductoId()).getBody();

            if (producto.getStockActual() <= 0) {
                return ErrorResponses.soldOut();
            }

            int ventaCantidad = dto.getCantidad();
            BigDecimal productoPrecio = producto.getPrecio();

            dto.setPrecioUnitario(productoPrecio);
            dto.setSubtotal(productoPrecio.multiply(new BigDecimal(ventaCantidad)));

            producto.setStockActual(producto.getStockActual() - ventaCantidad);

            productoService.updateEntity(producto.getProductoId(), productoConverter.toDto(producto));

        } catch (DataAccessException e) {
            return ErrorResponses.internalServerError(e);
        }
        return super.postEntity(dto);
    }

}
