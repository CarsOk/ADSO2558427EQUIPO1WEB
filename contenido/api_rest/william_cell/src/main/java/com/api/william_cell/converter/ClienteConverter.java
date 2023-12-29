package com.api.william_cell.converter;

import org.springframework.stereotype.Component;

import com.api.william_cell.converter.interfaces.EntityConverter;
import com.api.william_cell.models.dto.ClienteDto;
import com.api.william_cell.models.entity.Cliente;

@Component("clienteConverter")
public class ClienteConverter implements EntityConverter<Cliente, ClienteDto> {

    public Cliente toEntity(ClienteDto clienteDto) {
        if (clienteDto == null) {
            return null;
        }

        Cliente cliente = Cliente.builder()
                            .cliente_id(clienteDto.getCliente_id())
                            .primer_nombre(clienteDto.getPrimer_nombre())
                            .segundo_nombre(clienteDto.getSegundo_nombre())
                            .primer_apellido(clienteDto.getPrimer_apellido())
                            .segundo_apellido(clienteDto.getSegundo_apellido())
                            .build();
        return cliente;

    }
     
    @Override
    public ClienteDto toDto(Cliente cliente) {

        if (cliente == null) {
            return null;
        }

        ClienteDto clienteDto = ClienteDto.builder()
                            .cliente_id(cliente.getCliente_id())
                            .primer_nombre(cliente.getPrimer_nombre())
                            .segundo_nombre(cliente.getSegundo_nombre())
                            .primer_apellido(cliente.getPrimer_apellido())
                            .segundo_apellido(cliente.getSegundo_apellido())
                            .build();
        return clienteDto;
    }

}
