package com.william.cell.api_v2.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Service;

import com.william.cell.api_v2.converters.EntityConverter;
import com.william.cell.api_v2.models.DTO.ClienteDTO;
import com.william.cell.api_v2.models.entities.Cliente;
import com.william.cell.api_v2.repositories.ClienteRepository;

@Service
public class ClienteService extends BaseService<Cliente, ClienteDTO, String> {

    @Autowired
    ClienteRepository clienteRepository;

    @Autowired
    @Qualifier("clienteConverter")
    EntityConverter<Cliente, ClienteDTO> converter;

    @Override
    protected EntityConverter<Cliente, ClienteDTO> getEntityConverter() {
        return converter;
    }

    @Override
    protected JpaRepository<Cliente, String> getRepository() {
        return clienteRepository;
    }
    
}
