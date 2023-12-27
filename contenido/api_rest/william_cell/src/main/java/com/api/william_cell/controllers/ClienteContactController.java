package com.api.william_cell.controllers;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.api.william_cell.models.dto.ClienteContactDto;
import com.api.william_cell.models.entity.Cliente;
import com.api.william_cell.models.entity.ClienteContact;
import com.api.william_cell.services.ClienteContactService;

import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.dao.DataAccessException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.PathVariable;


@RestController
@RequestMapping("/api/v1")
public class ClienteContactController {

    private Map<String, Object> response = new LinkedHashMap<>();
    
    @Autowired
    @Qualifier("clienteContactService")
    ClienteContactService clienteContactService;

    @PostMapping("/contact")
    public ClienteContactDto create(@RequestBody ClienteContact cliente) {
        return clienteContactService.saveEntity(cliente);
    }

    @PutMapping("/contact/{cliente_id}")
    public ClienteContactDto update(@PathVariable(name = "cliente_id") String id, @RequestBody ClienteContact clienteContact) {
        clienteContact.setCliente(Cliente.builder().cliente_id(id).build());
        return clienteContactService.saveEntity(clienteContact);
    }

    @GetMapping("/contacts")
    public List<ClienteContactDto> getAll() {
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
                response.put("mensaje", "Cliente no encontrado");
                response.put("detalles", "El cliente con idenficación " + id + "no fue encontrado");
                return new ResponseEntity<>(response, HttpStatus.NOT_FOUND);
            }
        } catch (DataAccessException e) {
            response.put("mensaje", e.getMessage());
            return new ResponseEntity<>(response, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    
    
}
