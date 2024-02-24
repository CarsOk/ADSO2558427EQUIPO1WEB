package com.william.cell.api_v2.converters;

import org.springframework.stereotype.Component;

import com.william.cell.api_v2.models.DTO.DetalleVentaDTO;
import com.william.cell.api_v2.models.entities.DetalleVenta;
import com.william.cell.api_v2.models.entities.Producto;
import com.william.cell.api_v2.models.entities.Venta;
/**
 * The {@code DetalleVentaConverter} class is responsible for converting between
 * {@link DetalleVenta} entities and {@link DetalleVentaDTO} Data Transfer Objects (DTOs).
 * This converter is used to transform data to and from the persistence layer and DTOs.
 *
 * <p>
 * Usage Example:
 * <pre>
 * {@code
 * DetalleVentaConverter converter = new DetalleVentaConverter();
 * DetalleVentaDTO dto = converter.toDto(entity);
 * DetalleVenta entity = converter.toEntity(dto);
 * }
 * </pre>
 * </p>
 *
 * @see DetalleVenta
 * @see DetalleVentaDTO
 * @see com.william.cell.api_v2.converters.EntityConverter (Interface reference)
 * @since 2.0
 * @version 2.0
 * @author Emanuel Obredor
 */
@Component("detalleVentaConverter")
public class DetalleVentaConverter implements EntityConverter<DetalleVenta, DetalleVentaDTO> {

    /**
     * Converts a {@link DetalleVentaDTO} to a {@link DetalleVenta} entity.
     *
     * @param dto The Data Transfer Object to be converted.
     * @return A {@link DetalleVenta} entity created from the provided DTO.
     * @since 2.0
     */
    @Override
    public DetalleVenta toEntity(DetalleVentaDTO dto) {

        if (dto == null) {
            return null;
        }

        DetalleVenta detalleVenta = DetalleVenta.builder()
                .detalle_id(dto.getDetalle_id())
                .cantidad(dto.getCantidad())
                .precioUnitario(dto.getPrecioUnitario())
                .subtotal(dto.getSubtotal())
                .producto(Producto.builder().productoId(dto.getProductoId()).build())
                .venta(Venta.builder().venta_id(dto.getVentaId()).build())
                .build();
        return detalleVenta;
    }

    /**
     * Converts a {@link DetalleVenta} entity to a {@link DetalleVentaDTO}.
     *
     * @param entity The entity to be converted.
     * @return A {@link DetalleVentaDTO} created from the provided entity.
     * @since 2.0
     */
    @Override
    public DetalleVentaDTO toDto(DetalleVenta entity) {

        if (entity == null) {
            return null;
        }

        DetalleVentaDTO detalleVentaDTO = DetalleVentaDTO.builder()
                .detalle_id(entity.getDetalle_id())
                .cantidad(entity.getCantidad())
                .precioUnitario(entity.getPrecioUnitario())
                .subtotal(entity.getSubtotal())
                .productoId(entity.getProducto().getProductoId())
                .ventaId(entity.getVenta().getVenta_id())
                .build();

        return detalleVentaDTO;
    }
}
