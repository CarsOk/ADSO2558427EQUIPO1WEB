package com.api.william_cell.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.dao.DataAccessException;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.api.william_cell.controllers.response.ControllerResponses;
import com.api.william_cell.converter.interfaces.EntityConverter;
import com.api.william_cell.models.dto.RolDto;
import com.api.william_cell.models.entity.Rol;
import com.api.william_cell.services.RolService;

@RestController
public class RolController extends ControllerResponses<Rol> implements BaseController<Rol, RolDto, Long> {

    @Autowired
    RolService service;

    @Autowired
    @Qualifier("rolConverter")
    EntityConverter<Rol, RolDto> rolConverter;

    @Override
    @PostMapping("/rol")
    public ResponseEntity<?> create(@RequestBody Rol entity) {
        try {
            return new ResponseEntity<>(service.saveEntity(entity), HttpStatus.CREATED);
        } catch (DataAccessException e) {
            return internalServerError(e);
        }
    }

    @Override
    @DeleteMapping("/rol/{id}")
    public ResponseEntity<?> delete(@PathVariable(name = "id") Long id) {
        try {
            RolDto rolDto = service.findEntityById(id);
            if (rolDto != null) {
                service.deleteEntity(rolConverter.toEntity(rolDto));
                return successfullyDeleted();
            } else {
                return idNotFound();
            }
        } catch (DataIntegrityViolationException e) {
            return internalServerError(e);
        }
    }

    @Override
    @GetMapping("/roles")
    public List<RolDto> findAll() {
        return service.findAllEntities();
    }

    @Override
    @GetMapping("/rol/{id}")
    public ResponseEntity<?> showById(@PathVariable(name = "id") Long id) {
        try {
            if (service.findEntityById(id) != null) {
                return new ResponseEntity<>(service.findEntityById(id), HttpStatus.OK);
            } else {
                return idNotFound();
            }
        } catch (DataAccessException e) {
            return internalServerError(e);
        }
    }

    @Override
    @PutMapping("/rol/{id}")
    public ResponseEntity<?> update(@PathVariable(name = "id") Long id, @RequestBody Rol entity) {
        try {
            if (!entity.getRol_id().equals(id)) {
                return nonModifiableId(entity);
            }

            if (entity != null && entity.getRol_id().equals(id)) {
                entity.setRol_id(id);
                RolDto rolDto = service.saveEntity(entity);
                return new ResponseEntity<>(rolDto, HttpStatus.OK);
            } else {
                return idNotFound();
            }

        } catch (DataIntegrityViolationException e) {
            return internalServerError(e);
        }
    }
    
}
