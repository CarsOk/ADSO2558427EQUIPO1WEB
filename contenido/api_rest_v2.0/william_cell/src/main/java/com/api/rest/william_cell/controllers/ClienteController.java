package com.api.rest.william_cell.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.api.rest.william_cell.models.dto.ClienteDto;
import com.api.rest.william_cell.models.entities.Cliente;
import com.api.rest.william_cell.services.ClienteService;
import org.springframework.web.bind.annotation.GetMapping;

@RestController
@RequestMapping("/api/v2")
public class ClienteController {
    
    @Autowired
    ClienteService clienteService;

    // @PostMapping("/new/cliente")
    // public ResponseEntity<?> newCliente(@RequestBody ClienteDto cliente) {
    //     return clienteService.save(cliente);
    // }

    @GetMapping("/clientes")
    public List<Cliente> getMethodName() {
        return clienteService.getAll();
    }
    
}
