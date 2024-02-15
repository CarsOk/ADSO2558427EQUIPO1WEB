package com.william.cell.api_v2.models.entities;

import java.io.Serializable;

public interface BaseEntity<ID extends Serializable> {
    
    ID obtenerEntityId();

    void asignarEntityId(ID id);
}
