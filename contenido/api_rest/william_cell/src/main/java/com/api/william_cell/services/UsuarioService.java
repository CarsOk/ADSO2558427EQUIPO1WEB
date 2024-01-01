package com.api.william_cell.services;

import java.util.List;
import java.util.stream.StreamSupport;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Service;

import com.api.william_cell.converter.interfaces.EntityConverter;
import com.api.william_cell.models.dto.UsuarioDto;
import com.api.william_cell.models.entity.Usuario;
import com.api.william_cell.repositories.UsuarioRepository;

@Service("usuarioService")
public class UsuarioService implements IService<Usuario, UsuarioDto, Long> {

    @Autowired
    UsuarioRepository repository;

    @Autowired
    @Qualifier("usuarioConverter")
    EntityConverter<Usuario, UsuarioDto> usuarioConverter;

    @Override
    public void deleteEntity(Usuario entity) {
        repository.delete(entity);
    }

    @Override
    public UsuarioDto saveEntity(Usuario entity) {
        return usuarioConverter.toDto(repository.save(entity));
    }

    @Override
    public List<UsuarioDto> findAllEntities() {
        List<Usuario> usuarios = repository.findAll();

        return StreamSupport.stream(usuarios.spliterator(), false)
            .map(usuarioConverter::toDto).toList();
    }

    @Override
    public UsuarioDto findEntityById(Long id) {
        return usuarioConverter.toDto(repository.findById(id).orElse(null));
    }
    
}
