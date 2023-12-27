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


@Service("clienteContactService")
public class ClienteContactService implements IService<ClienteContact, ClienteContactDto, Long> {

    @Autowired
    @Qualifier("clienteContactRepository")
    ClienteContactRepository repository;

    @Autowired
    @Qualifier("clienteContactConverter")
    EntityConverter<ClienteContact, ClienteContactDto> converter;

    @Transactional
    public ClienteContactDto saveEntity(ClienteContact clienteContact) {
        return converter.toDto(repository.save(clienteContact));
    }

    @Transactional(readOnly = true)
    public ClienteContactDto findEntityById(Long id) {
        return converter.toDto(repository.findById(id).orElse(null));
    }

    @Transactional
    public void deleteEntity(ClienteContact entity) {
        repository.deleteById(entity.getCliente_contact_id());
    }

    @Transactional(readOnly = true)
    public List<ClienteContactDto> findAllEntities() {
        List<ClienteContact> clienteContacts = repository.findAll();

        return StreamSupport.stream(clienteContacts.spliterator(), false)
            .map(converter::toDto).toList();
    }
    
    @Transactional(readOnly = true)
    public ClienteContactDto findByClienteId(String id) {
        List<ClienteContact> clienteContacts = repository.findByClienteId(id);

        return StreamSupport.stream(clienteContacts.spliterator(), false)
            .map(converter::toDto).findFirst().orElse(null);
    }
}
