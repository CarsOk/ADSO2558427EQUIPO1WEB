package com.api.william_cell.models.dto;

import java.util.List;

import com.api.william_cell.models.entity.Usuario;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
@ToString
public class RolDto {
    
    private Long rol_id;

    private String rol_nombre;

}
