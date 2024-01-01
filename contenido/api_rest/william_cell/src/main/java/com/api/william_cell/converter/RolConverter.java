package com.api.william_cell.converter;

import java.util.ArrayList;
import java.util.List;

import org.springframework.stereotype.Component;

import com.api.william_cell.converter.interfaces.EntityConverter;
import com.api.william_cell.models.dto.RolDto;
import com.api.william_cell.models.entity.Rol;
import com.api.william_cell.models.entity.Usuario;

@Component("rolConverter")
public class RolConverter implements EntityConverter<Rol, RolDto> {

    @Override
    public Rol toEntity(RolDto dto) {
        if (dto == null) {
            return null;
        }

        List<Usuario> usuarios = new ArrayList<>();


        return Rol.builder()
            .rol_id(dto.getRol_id())
            .rol_nombre(dto.getRol_nombre())
            .usuarios(usuarios)
            .build();
    }

    @Override
    public RolDto toDto(Rol entity) {
        if (entity == null) {
            return null;
        }


        return RolDto.builder()
            .rol_id(entity.getRol_id())
            .rol_nombre(entity.getRol_nombre())
            .build();
    }
    
}
