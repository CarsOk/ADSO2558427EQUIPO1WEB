package com.api.william_cell.converter;

import org.springframework.stereotype.Component;

import com.api.william_cell.converter.interfaces.EntityConverter;
import com.api.william_cell.models.dto.VentaDto;
import com.api.william_cell.models.entity.Cliente;
import com.api.william_cell.models.entity.Producto;
import com.api.william_cell.models.entity.Venta;

@Component("ventaConverter")
public class VentaConverter implements EntityConverter<Venta, VentaDto> {

    @Override
    public Venta toEntity(VentaDto dto) {

        if (dto == null) {
            return null;
        }

        return Venta.builder()
            .venta_id(dto.getVenta_id())
            .cliente(Cliente.builder().cliente_id(dto.getCliente_id()).build())
            .producto(Producto.builder().product_id(dto.getProducto_id()).build())
            .venta_fecha(dto.getVenta_fecha())
            .venta_cantidad(dto.getVenta_cantidad())
            .venta_total(dto.getVenta_total())
            .build();
    }

    @Override
    public VentaDto toDto(Venta entity) {
        if (entity == null) {
            return null;
        }

        return VentaDto.builder()
            .venta_id(entity.getVenta_id())
            .cliente_id(entity.getCliente().getCliente_id())
            .producto_id(entity.getProducto().getProduct_id())
            .venta_fecha(entity.getVenta_fecha())
            .venta_cantidad(entity.getVenta_cantidad())
            .venta_total(entity.getVenta_total())
            .build();
    }
    
}
