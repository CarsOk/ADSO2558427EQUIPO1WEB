package com.william.cell.api_v2.models.DTO;

import java.math.BigDecimal;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Builder
@Data
@AllArgsConstructor
@NoArgsConstructor
public class ProductoDTO {

    private String productoId;

    private String nombre;
    
    private String descripcion;
    
    private BigDecimal precio;
    
    private int stockActual;
}
