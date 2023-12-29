package com.api.william_cell.models.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

@Data
@ToString
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class ProductoDto {
    
    private String product_id;

    private String product_nombre;

    private Integer product_cant;

    private Long product_precio;
}
