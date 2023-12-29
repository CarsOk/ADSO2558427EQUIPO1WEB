package com.api.william_cell.controllers;

import org.springframework.web.bind.annotation.RestController;

import com.api.william_cell.controllers.errors.ControllerResponses;
import com.api.william_cell.models.dto.ClienteContactDto;
import com.api.william_cell.models.entity.Cliente;
import com.api.william_cell.models.entity.ClienteContact;
import com.api.william_cell.services.ClienteContactService;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.dao.DataAccessException;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.PathVariable;


@RestController
public class ClienteContactController extends ControllerResponses<ClienteContact> implements BaseController<ClienteContact, ClienteContactDto, Long> {

    @Autowired
    @Qualifier("clienteContactService")
    ClienteContactService clienteContactService;

    @PostMapping("/contact")
    @Override
    public ResponseEntity<?> create(@RequestBody ClienteContact cliente) {
        try {
            return new ResponseEntity<>(clienteContactService.saveEntity(cliente), HttpStatus.CREATED);
        } catch (DataIntegrityViolationException e) {
            return nonModifiableId(cliente);
        }
    }

    @PutMapping("/contact/{cliente_id}")
    public ResponseEntity<?> updateByClienteId(@PathVariable(name = "cliente_id") String id, @RequestBody ClienteContact clienteContact) {
        if (!clienteContact.getCliente().getCliente_id().equals(id)) {
            return nonModifiableId(clienteContact);
        }

        if (clienteContact != null && clienteContact.getCliente().getCliente_id().equals(id)) {
            clienteContact.setCliente(Cliente.builder().cliente_id(id).build());
            return new ResponseEntity<>(clienteContactService.saveEntity(clienteContact), HttpStatus.OK);
        } else {
            return idNotFound();
        }
    }

    @GetMapping("/contacts")
    @Override
    public List<ClienteContactDto> findAll() {
        return clienteContactService.findAllEntities();
    }

    @GetMapping("/contact/{id}")
    public ResponseEntity<?> findByClienteId(@PathVariable(name = "id") String id) {
        response.clear();
        try {
            ClienteContactDto clienteContact = clienteContactService.findByClienteId(id);
            if (clienteContact != null) {
                return new ResponseEntity<>(clienteContact, HttpStatus.OK);
            } else {
               
                return new ResponseEntity<>(response, HttpStatus.NOT_FOUND);
            }
        } catch (DataAccessException e) {
            return internalServerError(e);
        }
    }
    
}
