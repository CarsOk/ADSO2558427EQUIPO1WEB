package com.api.william_cell.models.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

@ToString
@Builder
@Data
@AllArgsConstructor
@NoArgsConstructor
public class ClienteDto {

    private String cliente_id;

    private String primer_nombre;

    @Builder.Default
    private String segundo_nombre = "N/A";

    private String primer_apellido;

    private String segundo_apellido;
}
