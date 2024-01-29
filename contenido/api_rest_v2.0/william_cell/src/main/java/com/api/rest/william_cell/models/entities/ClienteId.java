package com.api.rest.william_cell.models.entities;

import java.io.Serializable;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class ClienteId implements Serializable {

    private String cliente_doc;
    private Integer cliente_tipo;

}
