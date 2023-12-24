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
import com.api.william_cell.services.repository.DBRepository;

 
@Service("clienteService")
public class ClienteService implements DBRepository<Cliente, ClienteDto, String> {

    @Autowired
    @Qualifier("clienteConverter")
    private EntityConverter<Cliente, ClienteDto> clienteConverter;

    @Autowired
    private ClienteRepository repository;

    @Override
    @Transactional
    public void deleteEntity(Cliente cliente) {
        repository.delete(cliente);
    }

    @Transactional
    @Override
    public ClienteDto saveEntity(Cliente cliente) {
        return clienteConverter.toDto(repository.save(cliente));
    }

    @Transactional(readOnly = true)
    @Override
    public ClienteDto findEntityById(String id) {
        return clienteConverter.toDto(repository.findById(id).orElse(null));
    }

    @Transactional(readOnly = true)
    @Override
    public List<ClienteDto> findAllEntities() {
       Iterable<Cliente> clientes = repository.findAll();

        return StreamSupport.stream(clientes.spliterator(), false)
            .map(clienteConverter::toDto)
            .toList();
    }
}
