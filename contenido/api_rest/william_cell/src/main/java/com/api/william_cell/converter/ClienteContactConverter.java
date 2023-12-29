package com.api.william_cell.converter;

import org.springframework.stereotype.Component;

import com.api.william_cell.converter.interfaces.EntityConverter;
import com.api.william_cell.models.dto.ClienteContactDto;
import com.api.william_cell.models.entity.Cliente;
import com.api.william_cell.models.entity.ClienteContact;

@Component("clienteContactConverter")
public class ClienteContactConverter implements EntityConverter<ClienteContact, ClienteContactDto> {

    @Override
    public ClienteContact toEntity(ClienteContactDto dto) {
        return ClienteContact.builder()
            .cliente_contact_id(dto.getCliente_contact_id())
            .cliente_contact_correo(dto.getCliente_contact_correo())
            .cliente_contact_cel(dto.getCliente_contact_cel())
            .cliente(Cliente.builder().cliente_id(dto.getCliente_id()).build())
            .build();
    }

    @Override
    public ClienteContactDto toDto(ClienteContact entity) {
        return ClienteContactDto.builder()
            .cliente_contact_id(entity.getCliente_contact_id())
            .cliente_contact_correo(entity.getCliente_contact_correo())
            .cliente_contact_cel(entity.getCliente_contact_cel())
            .cliente_id(entity.getCliente().getCliente_id())
            .build();
    }
    
}
