package com.william.cell.api.services;
import java.util.List;
import java.util.Optional;
import java.util.stream.StreamSupport;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.william.cell.api.converter.ClienteConverter;
import com.william.cell.api.models.dto.ClienteDto;
import com.william.cell.api.models.entity.Cliente;
import com.william.cell.api.repositories.ApplicationRepository;
import com.william.cell.api.services.repository.DBRepository;
 
@Service("clienteService")
public class ClienteService implements DBRepository<Cliente, ClienteDto, String> {

    @Autowired
    private ClienteConverter clienteConverter;

    @Autowired
    @Qualifier("applicationRepository")
    private ApplicationRepository repository;

    @Override
    @Transactional
    public void deleteEntity(Cliente cliente) {
        repository.delete(cliente);
    }

    @Transactional
    @Override
    public Cliente saveEntity(ClienteDto clientedDto) {
        return repository.save(clienteConverter.toEntity(clientedDto));
    }

    @Transactional(readOnly = true)
    @Override
    public Cliente findEntityById(String id) {
        Optional<Cliente> optionalCliente = repository.findById(id);
        return optionalCliente.orElse(null);
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
