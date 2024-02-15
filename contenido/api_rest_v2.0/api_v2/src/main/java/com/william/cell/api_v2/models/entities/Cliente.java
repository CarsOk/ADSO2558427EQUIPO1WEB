package com.william.cell.api_v2.models.entities;

import java.io.Serializable;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Entity
@Table(name = "clientes")
@EqualsAndHashCode(callSuper = false, onlyExplicitlyIncluded = true)
public class Cliente implements BaseEntity<String>, Serializable {

    @Id
    @Column(name = "cliente_id", length = 100, nullable = false)
    @EqualsAndHashCode.Include
    private String clienteId;
    
    @Column(length = 60, nullable = false)
    private String nombre;
    
    @Column(length = 10, nullable = true)
    private String numeroCelular;

    @Override
    public String obtenerEntityId() {
        return clienteId;
    }

    @Override
    public void asignarEntityId(String id) {
        this.clienteId = id;
    }

    
}

