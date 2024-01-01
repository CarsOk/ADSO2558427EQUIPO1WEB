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
import com.api.william_cell.models.dto.UsuarioDto;
import com.api.william_cell.models.entity.Usuario;
import com.api.william_cell.services.UsuarioService;

@RestController
public class UsuarioController extends ControllerResponses<Usuario>
        implements BaseController<Usuario, UsuarioDto, Long> {

    @Autowired
    UsuarioService service;

    @Autowired
    @Qualifier("usuarioConverter")
    EntityConverter<Usuario, UsuarioDto> converter;

    @Override
    @PostMapping("/usuario")
    public ResponseEntity<?> create(@RequestBody Usuario entity) {
        try {
            return new ResponseEntity<>(service.saveEntity(entity), HttpStatus.CREATED);
        } catch (DataAccessException e) {
            return internalServerError(e);
        }
    }

    @Override
    @DeleteMapping("/usuario/{id}")
    public ResponseEntity<?> delete(@PathVariable(name = "id") Long id) {
        try {
            UsuarioDto usuarioDto = service.findEntityById(id);
            if (usuarioDto != null) {
                service.deleteEntity(converter.toEntity(usuarioDto));
                return successfullyDeleted();
            } else {
                return idNotFound();
            }
        } catch (DataIntegrityViolationException e) {
            return internalServerError(e);
        }
    }

    @Override
    @GetMapping("/usuarios")
    public List<UsuarioDto> findAll() {
        return service.findAllEntities();
    }

    @Override
    @GetMapping("/usuario/{id}")
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
    @PutMapping("/usuario/{id}")
    public ResponseEntity<?> update(@PathVariable(name = "id") Long id, @RequestBody Usuario entity) {
        try {
            if (!entity.getUsuario_id().equals(id)) {
                return nonModifiableId(entity);
            }

            if (entity != null && entity.getUsuario_id().equals(id)) {
                entity.setUsuario_id(id);
                UsuarioDto usuarioDto = service.saveEntity(entity);
                return new ResponseEntity<>(usuarioDto, HttpStatus.OK);
            } else {
                return idNotFound();
            }

        } catch (DataIntegrityViolationException e) {
            return internalServerError(e);
        }
    }

}
