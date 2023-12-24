package com.api.william_cell.converter;

import org.springframework.stereotype.Component;

import com.api.william_cell.converter.interfaces.EntityConverter;
import com.api.william_cell.models.dto.ClienteDto;
import com.api.william_cell.models.entity.Cliente;

/**
 * Esta es la clase ClienteConverter <p>
 * Es la encargada de convertir los tipos de datos de las clases {@code Cliente} (Entidad) y {@code ClienteDto} (Repositorio)
 */
@Component("clienteConverter")
public class ClienteConverter implements EntityConverter<Cliente, ClienteDto> {
   
    /**
     * Convierte todos los argumentos de un objeto de tipo ClienteDto a Cliente <p>
     * @return una instancia de ClienteDto ya convertida
     */
    public Cliente toEntity(ClienteDto clienteDto) {
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
