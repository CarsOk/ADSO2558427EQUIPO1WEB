package com.api.william_cell.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.dao.DataAccessException;
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
import com.api.william_cell.models.dto.ClienteDto;
import com.api.william_cell.models.entity.Cliente;
import com.api.william_cell.services.ClienteService;

import java.util.List;

@RestController
public class ClienteController extends ControllerResponses<Cliente>
        implements BaseController<Cliente, ClienteDto, String> {

    @Autowired
    @Qualifier("clienteService")
    private ClienteService clienteService;

    @Autowired
    @Qualifier("clienteConverter")
    private EntityConverter<Cliente, ClienteDto> converter;

    @Override
    @PostMapping("/cliente")
    public ResponseEntity<?> create(@RequestBody Cliente cliente) {
        try {
            return new ResponseEntity<>(clienteService.saveEntity(cliente), HttpStatus.CREATED);
        } catch (DataAccessException e) {
            return internalServerError(e);
        }
    }

    @PutMapping("/cliente")
    public ClienteDto update(@RequestBody Cliente cliente) {
        return clienteService.saveEntity(cliente);
    }

    @Override
    @DeleteMapping("/cliente/{id}")
    public ResponseEntity<?> delete(@PathVariable(name = "id") String id) {
        try {
            Cliente clienteDelete = converter.toEntity(clienteService.findEntityById(id));
            clienteService.deleteEntity(clienteDelete);
            return new ResponseEntity<>(clienteDelete, HttpStatus.NO_CONTENT);
        } catch (DataAccessException e) {
            return internalServerError(e);
        }
    }

    @Override
    @GetMapping("/cliente/{id}")
    public ResponseEntity<?> showById(@PathVariable(name = "id") String id) {
        try {
            if (clienteService.findEntityById(id) != null) {
                return new ResponseEntity<>(clienteService.findEntityById(id), HttpStatus.FOUND);
            }
            return new ResponseEntity<>(idNotFound(), HttpStatus.NOT_FOUND);
        } catch (DataAccessException e) {
            return internalServerError(e);
        }
    }

    @Override
    @GetMapping("/clientes")
    public List<ClienteDto> findAll() {
        return clienteService.findAllEntities();
    }

    @Override
    @PutMapping("/cliente/{id}")
    public ResponseEntity<?> update(@PathVariable(name = "id") String id, @RequestBody Cliente entity) {
        try {
            if (!entity.getCliente_id().equals(id)) {
                return nonModifiableId(entity);
            }

            if (entity != null && entity.getCliente_id().equals(id)) {
                return new ResponseEntity<>(clienteService.saveEntity(entity), HttpStatus.ACCEPTED);
            } else {
                return idNotFound();
            }
        } catch (DataAccessException e) {
            return internalServerError(e);
        } catch(NullPointerException e) {
            return badRequest(e);
        }
    }

}
