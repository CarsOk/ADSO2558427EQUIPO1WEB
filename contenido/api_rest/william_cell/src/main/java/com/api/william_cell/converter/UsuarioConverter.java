package com.api.william_cell.converter;

import org.springframework.stereotype.Component;

import com.api.william_cell.converter.interfaces.EntityConverter;
import com.api.william_cell.models.dto.UsuarioDto;
import com.api.william_cell.models.entity.Rol;
import com.api.william_cell.models.entity.Usuario;

@Component("usuarioConverter")
public class UsuarioConverter implements EntityConverter<Usuario, UsuarioDto> {

    @Override
    public Usuario toEntity(UsuarioDto dto) {
        if (dto == null) {
            return null;
        }

        return Usuario.builder()
            .usuario_id(dto.getUsuario_id())
            .usuario_nombre(dto.getUsuario_nombre())
            .usuario_contrasena(dto.getUsuario_contrasena())
            .rol(Rol.builder().rol_id(dto.getUsuario_id()).build())
            .build();
    }

    @Override
    public UsuarioDto toDto(Usuario entity) {

        if (entity == null) {
            return null;
        }

        return UsuarioDto.builder()
            .usuario_id(entity.getUsuario_id())
            .usuario_nombre(entity.getUsuario_nombre())
            .usuario_contrasena(entity.getUsuario_contrasena())
            .rol_id(entity.getRol().getRol_id())
            .build();
    }
    
}
