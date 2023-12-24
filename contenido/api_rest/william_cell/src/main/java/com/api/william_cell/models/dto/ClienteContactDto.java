package com.api.william_cell.models.dto;


import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

@Data
@ToString
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class ClienteContactDto {
    
    private Long cliente_contact_id;
    private String cliente_contact_correo;
    private String cliente_contact_cel;
    private String cliente_id;
}
