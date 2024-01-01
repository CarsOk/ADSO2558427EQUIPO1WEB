package com.api.william_cell.services;

import java.util.List;
import java.util.stream.StreamSupport;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.api.william_cell.converter.interfaces.EntityConverter;
import com.api.william_cell.models.dto.RolDto;
import com.api.william_cell.models.entity.Rol;
import com.api.william_cell.repositories.RolRepository;

@Service("rolService")
public class RolService implements IService<Rol, RolDto, Long> {

    @Autowired
    RolRepository repository;

    @Autowired
    @Qualifier("rolConverter")
    EntityConverter<Rol, RolDto> rolConverter;

    @Transactional
    @Override
    public void deleteEntity(Rol entity) {
        repository.delete(entity);
    }

    @Transactional
    @Override
    public RolDto saveEntity(Rol entity) {
        return rolConverter.toDto(repository.save(entity));
    }

    @Transactional(readOnly = true)
    @Override
    public List<RolDto> findAllEntities() {
        List<Rol> roles = repository.findAll();
        
        return StreamSupport.stream(roles.spliterator(), false)
            .map(rolConverter::toDto).toList();
    }

    @Transactional(readOnly = true)
    @Override
    public RolDto findEntityById(Long id) {
        return rolConverter.toDto(repository.findById(id).orElse(null));
    }
    
}
