package com.william.cell.api_v2.converters;

import org.springframework.stereotype.Component;

import com.william.cell.api_v2.models.DTO.VentaDTO;
import com.william.cell.api_v2.models.entities.Cliente;
import com.william.cell.api_v2.models.entities.Venta;

@Component("ventaConverter")
public class VentaConverter implements EntityConverter<Venta, VentaDTO> {

    @Override
    public Venta toEntity(VentaDTO dto) {
        if (dto == null) {
            return null;
        }

        return Venta.builder()
            .venta_id(dto.getVenta_id())
            .descuento(dto.getDescuento())
            .metodoPago(dto.getMetodoPago())
            .totalVenta(dto.getTotalVenta())
            .fechaVenta(dto.getFechaVenta())
            .cliente(Cliente.builder().clienteId(dto.getClienteId()).build())
            .build();
    }

    @Override
    public VentaDTO toDto(Venta entity) {
        
        if (entity == null) {
            return null;
        }

        return VentaDTO.builder()
            .clienteId(entity.getCliente().getClienteId())
            .descuento(entity.getDescuento())
            .fechaVenta(entity.getFechaVenta())
            .metodoPago(entity.getMetodoPago())
            .totalVenta(entity.getTotalVenta())
            .venta_id(entity.getVenta_id())
            .build();
    }
    
}
