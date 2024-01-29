package com.api.rest.william_cell.models.dto;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class ClienteDto {
    
    private String cliente_doc;

    private String cliente_tipo_doc;

    private String primer_nombre;

    private String segundo_nombre;

    private String primer_apellido;

    private String segundo_apellido;
}
