package com.api.william_cell.services;

import java.util.List;
import java.util.stream.StreamSupport;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.api.william_cell.converter.interfaces.EntityConverter;
import com.api.william_cell.models.dto.ClienteContactDto;
import com.api.william_cell.models.entity.ClienteContact;
import com.api.william_cell.repositories.ClienteContactRepository;
import com.api.william_cell.services.repository.DBRepository;


@Service("clienteContactService")
public class ClienteContactService implements DBRepository<ClienteContact, ClienteContactDto, Long> {

    @Autowired
    ClienteContactRepository repository;

    @Autowired
    @Qualifier("clienteContactConverter")
    EntityConverter<ClienteContact, ClienteContactDto> converter;

    @Override
    @Transactional
    public ClienteContactDto saveEntity(ClienteContact clienteContact) {
        return converter.toDto(repository.save(clienteContact));
    }

    @Override
    @Transactional(readOnly = true)
    public ClienteContactDto findEntityById(Long id) {
        return converter.toDto(repository.findById(id).orElse(null));
    }

    @Override
    @Transactional
    public void deleteEntity(ClienteContact entity) {
        repository.deleteById(entity.getCliente_contact_id());
    }

    @Override
    @Transactional(readOnly = true)
    public List<ClienteContactDto> findAllEntities() {
        List<ClienteContact> clienteContacts = repository.findAll();

        return StreamSupport.stream(clienteContacts.spliterator(), false)
            .map(converter::toDto).toList();
    }
    
}
