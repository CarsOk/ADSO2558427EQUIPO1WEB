package com.api.rest.william_cell.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.api.rest.william_cell.converters.ClienteConverter;
import com.api.rest.william_cell.models.dto.ClienteDto;
import com.api.rest.william_cell.models.entities.Cliente;
import com.api.rest.william_cell.models.entities.DocTipos;
import com.api.rest.william_cell.repositories.ClienteRepository;

@Service
public class ClienteService {
    
    @Autowired
    ClienteRepository clienteRepository;

    @Autowired
    ClienteConverter clienteConverter;

    @Autowired
    DocsTiposService docsTiposService;

    public ResponseEntity<?> save(ClienteDto clienteDto) {

        Cliente cliente = clienteConverter.toEntity(clienteDto);

        cliente.getDocTipos()
        
        return new ResponseEntity<>(clienteRepository.save(cliente), HttpStatus.CREATED);
    }

    public List<Cliente> getAll() {
        return clienteRepository.findAll();
    }
}
