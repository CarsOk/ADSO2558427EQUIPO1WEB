package com.william.cell.api.converter;

import org.springframework.stereotype.Component;

import com.william.cell.api.converter.interfaces.EntityConverter;
import com.william.cell.api.models.dto.ClienteDto;
import com.william.cell.api.models.entity.Cliente;

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
                            .infoClienteId(clienteDto.getInfoClienteId())
                            .primerNombre(clienteDto.getPrimerNombre())
                            .segundoNombre(clienteDto.getSegundoNombre())
                            .primerApellido(clienteDto.getPrimerApellido())
                            .segundoApellido(clienteDto.getSegundoApellido())
                            .build();
        return cliente;

    }
     
    @Override
    public ClienteDto toDto(Cliente cliente) {
        ClienteDto clienteDto = ClienteDto.builder()
                            .infoClienteId(cliente.getInfoClienteId())
                            .primerNombre(cliente.getPrimerNombre())
                            .segundoNombre(cliente.getSegundoNombre())
                            .primerApellido(cliente.getPrimerApellido())
                            .segundoApellido(cliente.getSegundoApellido())
                            .build();
        return clienteDto;
    }

}
