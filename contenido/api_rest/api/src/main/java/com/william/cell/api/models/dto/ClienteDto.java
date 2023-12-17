package com.william.cell.api.models.dto;

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

    private String infoClienteId;

    private String primerNombre;

    @Builder.Default
    private String segundoNombre = "N/A";

    private String primerApellido;

    @Builder.Default
    private String segundoApellido = "N/A";

}
