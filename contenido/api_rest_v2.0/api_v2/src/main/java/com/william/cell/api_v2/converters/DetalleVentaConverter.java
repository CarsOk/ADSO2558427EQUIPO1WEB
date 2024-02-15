package com.william.cell.api_v2.converters;

import org.springframework.stereotype.Component;

import com.william.cell.api_v2.models.DTO.DetalleVentaDTO;
import com.william.cell.api_v2.models.entities.DetalleVenta;
import com.william.cell.api_v2.models.entities.Producto;
import com.william.cell.api_v2.models.entities.Venta;

@Component("detalleVentaConverter")
public class DetalleVentaConverter implements EntityConverter<DetalleVenta, DetalleVentaDTO> {

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
