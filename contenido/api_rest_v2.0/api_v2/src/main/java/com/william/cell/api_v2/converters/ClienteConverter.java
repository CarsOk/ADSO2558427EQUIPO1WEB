package com.william.cell.api_v2.converters;

import org.springframework.stereotype.Component;

import com.william.cell.api_v2.models.DTO.ClienteDTO;
import com.william.cell.api_v2.models.entities.Cliente;

@Component("clienteConverter")
public class ClienteConverter implements EntityConverter<Cliente, ClienteDTO> {

    @Override
    public Cliente toEntity(ClienteDTO dto) {
        if (dto == null) {
            return null;
        }

        Cliente cliente = Cliente.builder()
            .clienteId(dto.getClienteId())
            .nombre(dto.getNombre())
            .numeroCelular(dto.getNumeroCelular())
            .build();

        return cliente;
    }

    @Override
    public ClienteDTO toDto(Cliente entity) {
        
        if (entity == null) {
            return null;
        }

        ClienteDTO clienteDTO = ClienteDTO.builder()
            .clienteId(entity.obtenerEntityId())
            .nombre(entity.getNombre())
            .numeroCelular(entity.getNumeroCelular())
            .build();
        
        return clienteDTO;
    }
    
}
