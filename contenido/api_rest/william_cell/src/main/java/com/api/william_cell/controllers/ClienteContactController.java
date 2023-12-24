package com.api.william_cell.controllers;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.api.william_cell.models.dto.ClienteContactDto;
import com.api.william_cell.models.entity.Cliente;
import com.api.william_cell.models.entity.ClienteContact;
import com.api.william_cell.services.repository.DBRepository;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.PathVariable;


@RestController
@RequestMapping("/api/v1")
public class ClienteContactController {
    
    @Autowired
    @Qualifier("clienteContactService")
    DBRepository<ClienteContact, ClienteContactDto, Long> clienteContactService;

    @PostMapping("/cliente/contact")
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
    

    
}
