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
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import com.api.william_cell.converter.interfaces.EntityConverter;
import com.api.william_cell.models.dto.ClienteDto;
import com.api.william_cell.models.entity.Cliente;
import com.api.william_cell.services.ClienteService;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

// TODO agregar capturas de error
// TODO agregar documentación

@RestController
@RequestMapping("/api/v1")
public class ClienteController {

    @Autowired
    @Qualifier("clienteService")
    private ClienteService clienteService;

    @Autowired
    @Qualifier("clienteConverter")
    private EntityConverter<Cliente, ClienteDto> converter;

    @PostMapping("/cliente")
    @ResponseStatus(value = HttpStatus.CREATED)
    public ClienteDto create(@RequestBody Cliente cliente) {
        return clienteService.saveEntity(cliente);
    }    

    @PutMapping("/cliente")
    @ResponseStatus(value = HttpStatus.CREATED)
    public ClienteDto update(@RequestBody Cliente cliente) {
        return clienteService.saveEntity(cliente);
    }

    @DeleteMapping("/cliente/{id}")
    public ResponseEntity<?> delete(@PathVariable(name = "id") String id) {
        Map<String, Object> response = new HashMap<>();
        try {
            Cliente clienteDelete = converter.toEntity(clienteService.findEntityById(id));
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
    public ClienteDto showById(@PathVariable(name = "id") String id) {
        return clienteService.findEntityById(id);
    }

    @GetMapping("/clientes")
    public List<ClienteDto> findAll() {
        return clienteService.findAllEntities();
    }
    
    
}
