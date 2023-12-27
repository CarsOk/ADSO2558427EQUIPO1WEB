package com.api.william_cell.services;

import java.util.List;
import java.util.stream.StreamSupport;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.api.william_cell.converter.interfaces.EntityConverter;
import com.api.william_cell.models.dto.ClienteDto;
import com.api.william_cell.models.entity.Cliente;
import com.api.william_cell.repositories.ClienteRepository;

 
@Service("clienteService")
public class ClienteService implements IService<Cliente, ClienteDto, String>{

    @Autowired
    @Qualifier("clienteConverter")
    private EntityConverter<Cliente, ClienteDto> clienteConverter;

    @Autowired
    private ClienteRepository repository;

    @Transactional
    public void deleteEntity(Cliente cliente) {
        repository.delete(cliente);
    }

    @Transactional
    public ClienteDto saveEntity(Cliente cliente) {
        return clienteConverter.toDto(repository.save(cliente));
    }

    @Transactional(readOnly = true)
    public ClienteDto findEntityById(String id) {
        return clienteConverter.toDto(repository.findById(id).orElse(null));
    }

    @Transactional(readOnly = true)
    public List<ClienteDto> findAllEntities() {
       List<Cliente> clientes = repository.findAll();

        return StreamSupport.stream(clientes.spliterator(), false)
            .map(clienteConverter::toDto)
            .toList();
    }
}
