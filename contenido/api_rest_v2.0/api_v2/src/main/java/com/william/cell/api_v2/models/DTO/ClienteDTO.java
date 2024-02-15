package com.william.cell.api_v2.models.DTO;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class ClienteDTO {
    
    private String clienteId;

    private String nombre;
    
    private String numeroCelular;
}
