package com.william.cell.api_v2.models.DTO;

import java.math.BigDecimal;
import java.time.LocalDateTime;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Builder
@Data
@NoArgsConstructor
@AllArgsConstructor
public class VentaDTO {

    private Long venta_id;

    @Builder.Default
    private LocalDateTime fechaVenta = LocalDateTime.now();

    private String clienteId;

    private BigDecimal totalVenta;
    
    private BigDecimal descuento;
    
    private String metodoPago;
}
