package com.william.cell.api.controllers;

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
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import com.william.cell.api.models.dto.ClienteDto;
import com.william.cell.api.models.entity.Cliente;
import com.william.cell.api.services.repository.DBRepository;

import java.util.HashMap;
import java.util.List;
import java.util.Map;


@RestController
@RequestMapping("/api/v1")
public class ClienteController {

    @Autowired
    @Qualifier("clienteService")
    private DBRepository<Cliente, ClienteDto, String> clienteService;

    @PostMapping("/cliente")
    @ResponseStatus(value = HttpStatus.CREATED)
    public Cliente create(@RequestBody ClienteDto clienteDto) {
        return clienteService.saveEntity(clienteDto);
    }

    @PutMapping("/cliente")
    @ResponseStatus(value = HttpStatus.CREATED)
    public Cliente update(@RequestBody ClienteDto clientedDto) {
        return clienteService.saveEntity(clientedDto);
    }

    @DeleteMapping("/cliente/{id}")
    @ResponseStatus(value = HttpStatus.NO_CONTENT)
    public ResponseEntity<?> delete(@PathVariable(name = "id") String id) {
        Map<String, Object> response = new HashMap<>();
        try {
            Cliente clienteDelete = clienteService.findEntityById(id);
            clienteService.deleteEntity(clienteDelete);
            return new ResponseEntity<>(clienteDelete, HttpStatus.NO_CONTENT);
        } catch (DataAccessException e) {
            response.put("cliente", null);
            response.put("mensaje", e.getMessage());
            return new ResponseEntity<>(response, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping("/cliente/{id}")
    @ResponseStatus(value = HttpStatus.OK)
    public Cliente showById(@PathVariable(name = "id") String id) {
        return clienteService.findEntityById(id);
    }

    @GetMapping("/clientes")
    public List<ClienteDto> findAll() {
        return clienteService.findAllEntities();
    }
    
    
}
