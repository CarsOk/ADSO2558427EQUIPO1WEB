package com.api.william_cell.models.dto;

import java.time.LocalDateTime;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

@Data
@ToString
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class VentaDto {

    private Long venta_id;

    private String cliente_id;
    
    private Long producto_id;

    private Integer venta_cantidad;
    
    private LocalDateTime venta_fecha;

    private String venta_detalles;
}
