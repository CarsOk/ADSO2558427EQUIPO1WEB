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
    
    private Long product_id;

    private String product_nombre;

    @Builder.Default
    private String product_img = "N/A";

    private Integer product_cant;

    private Integer product_precio;
}
