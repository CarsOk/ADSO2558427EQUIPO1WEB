package com.api.rest.william_cell.converters;

import org.springframework.stereotype.Component;

import com.api.rest.william_cell.models.dto.ClienteDto;
import com.api.rest.william_cell.models.entities.Cliente;
import com.api.rest.william_cell.models.entities.DocTipos;

@Component("clienteConverter")
public class ClienteConverter {

    public ClienteDto toDto(Cliente cliente) {

        if (cliente == null) {
            return null;
        }

        ClienteDto clienteDto = ClienteDto.builder()
            .cliente_doc(cliente.getCliente_doc())
            .cliente_tipo_doc(cliente.getDocTipos().getTipo())
            .primer_nombre(cliente.getPrimer_nombre())
            .segundo_nombre(cliente.getSegundo_nombre())
            .primer_apellido(cliente.getPrimer_apellido())
            .segundo_apellido(cliente.getPrimer_apellido())
            .build();

        return clienteDto;
    }

    public Cliente toEntity(ClienteDto clienteDto) {
        if (clienteDto == null) {
            return null;
        }

        Cliente cliente = Cliente.builder()
            .cliente_doc(clienteDto.getCliente_doc())
            .primer_nombre(clienteDto.getPrimer_nombre())
            .segundo_nombre(clienteDto.getSegundo_nombre())
            .primer_apellido(clienteDto.getPrimer_apellido())
            .segundo_apellido(clienteDto.getSegundo_apellido())
            .docTipos(DocTipos.builder().tipo(clienteDto.getCliente_tipo_doc()).build())
            .build();

        return cliente;    
    }

}
