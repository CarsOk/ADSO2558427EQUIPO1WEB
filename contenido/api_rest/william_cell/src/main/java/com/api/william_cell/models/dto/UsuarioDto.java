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
public class UsuarioDto {
    
    private Long usuario_id;

    private String usuario_nombre;

    private String usuario_contrasena;

    private Long rol_id;
}
