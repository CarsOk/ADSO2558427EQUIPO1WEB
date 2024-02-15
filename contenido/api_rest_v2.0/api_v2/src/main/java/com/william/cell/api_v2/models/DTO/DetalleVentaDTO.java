package com.william.cell.api_v2.models.DTO;


import java.math.BigDecimal;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class DetalleVentaDTO {

    private Long detalle_id;

    private Long ventaId;

    private String productoId;

    private Integer cantidad;

    private BigDecimal precioUnitario;

    private BigDecimal subtotal;
}
